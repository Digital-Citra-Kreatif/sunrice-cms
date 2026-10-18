<?php

declare(strict_types=1);

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Mcp\Request as McpRequest;
use Laravel\Mcp\Response as McpResponse;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Testing\TestListResponse;
use Spatie\Permission\Models\Permission;
use Sunrice\Mcp\SunriceServer;
use Sunrice\Mcp\Tools\SunriceTool;
use Sunrice\Models\ApiToken;
use Sunrice\Permissions\PermissionRegistry;
use Sunrice\Permissions\SyncPermissions;
use Sunrice\Resources\Action;
use Sunrice\Resources\ActionFailed;
use Sunrice\Sunrice;
use Workbench\App\Models\Product;
use Workbench\App\Models\User;
use Workbench\App\Sunrice\ProductResource;

use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\postJson;

#[Description('Refund an order.')]
class RefundOrderTool extends SunriceTool
{
    protected string $name = 'refund_order';

    public function handle(McpRequest $request): McpResponse
    {
        return $this->json(['refunded' => $request->get('order'), 'by' => $request->user()?->email]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['order' => $schema->integer()->required()];
    }
}

class ActionProductResource extends ProductResource
{
    public static function actions(): array
    {
        return [
            Action::make('deactivate')
                ->label('Take off sale')
                ->confirm('Take this product off sale?')
                ->visible(fn (Product $product) => (bool) $product->active)
                ->handle(function (Product $product) {
                    $product->update(['active' => false]);

                    return "{$product->title} is off sale.";
                })
                ->bulk(),
            Action::make('reprice')
                ->handle(fn (Product $product) => $product->price > 1000
                    ? throw new ActionFailed("{$product->title} is too expensive to reprice.")
                    : $product->update(['price' => $product->price + 1]))
                ->bulk(),
            Action::make('archive')
                ->ability('delete')
                ->destructive()
                ->handle(fn (Product $product) => $product->delete()),
            Action::make('pdf')
                ->label('Download PDF')
                ->url(fn (Product $product) => "/pdf/products/{$product->id}"),
            Action::make('owner_only')
                ->authorize(fn ($user) => $user?->email === 'owner@example.com')
                ->handle(fn () => 'ran'),
        ];
    }
}

class PermissiveProductPolicy
{
    public function viewAny(): bool
    {
        return true;
    }

    public function update(): bool
    {
        return true;
    }

    public function delete(): bool
    {
        return true;
    }
}

function product(string $title, bool $active = true, float $price = 10): Product
{
    return Product::query()->create(['title' => $title, 'sku' => strtoupper(substr($title, 0, 3)).random_int(100, 999), 'price' => $price, 'active' => $active]);
}

beforeEach(function () {
    app(Sunrice::class)->registerResource(ActionProductResource::class);
    app(SyncPermissions::class)->handle();
});

it('shows the record actions the user may run, and runs them', function () {
    actingAsSuperAdmin();
    $product = product('Kettle');

    get("/cms/resources/products/{$product->id}/edit")->assertInertia(fn (Assert $page) => $page
        ->where('actions.0', ['key' => 'deactivate', 'label' => 'Take off sale', 'confirm' => 'Take this product off sale?', 'destructive' => false, 'url' => null, 'new_tab' => false])
        ->where('actions.2.destructive', true)
        ->where('actions.3', ['key' => 'pdf', 'label' => 'Download PDF', 'confirm' => null, 'destructive' => false, 'url' => "/pdf/products/{$product->id}", 'new_tab' => true])
        ->has('actions', 4)); // owner_only is hidden from this user

    post("/cms/resources/products/{$product->id}/actions/deactivate")
        ->assertRedirect()
        ->assertSessionHas('success', 'Kettle is off sale.');
    expect($product->refresh()->active)->toBeFalse();

    // Now hidden for this record, and refused if posted anyway.
    get("/cms/resources/products/{$product->id}/edit")->assertInertia(fn (Assert $page) => $page->where('actions.0.key', 'reprice'));
    post("/cms/resources/products/{$product->id}/actions/deactivate")->assertSessionHas('error');

    // A handler without a message gets a default one.
    post("/cms/resources/products/{$product->id}/actions/reprice")->assertSessionHas('success', 'Reprice: done.');
    expect((float) $product->refresh()->price)->toBe(11.0);
});

it('shows a failed action\'s message as an error', function () {
    actingAsSuperAdmin();
    $product = product('Oven', price: 5000);

    post("/cms/resources/products/{$product->id}/actions/reprice")
        ->assertSessionHas('error', 'Oven is too expensive to reprice.');
    expect((float) $product->refresh()->price)->toBe(5000.0);
});

it('refuses unknown, link-only and unauthorized actions', function () {
    actingAsSuperAdmin();
    $product = product('Toaster');

    post("/cms/resources/products/{$product->id}/actions/nope")->assertNotFound();
    post("/cms/resources/products/{$product->id}/actions/pdf")->assertNotFound();
    post("/cms/resources/products/{$product->id}/actions/owner_only")->assertForbidden();
});

it('needs the resource permission an action names', function () {
    // The workbench's ProductPolicy (found by name) refuses edits; allow them here.
    Gate::policy(Product::class, PermissiveProductPolicy::class);
    $user = User::query()->create(['name' => 'Editor', 'email' => 'editor@example.com', 'password' => 'x']);
    $user->givePermissionTo(['sunrice.access-admin', 'sunrice.resources.products.view', 'sunrice.resources.products.edit']);
    $this->actingAs($user);
    $product = product('Blender');

    get("/cms/resources/products/{$product->id}/edit")->assertInertia(fn (Assert $page) => $page
        ->where('actions', fn ($actions) => collect($actions)->pluck('key')->all() === ['deactivate', 'reprice', 'pdf']));

    post("/cms/resources/products/{$product->id}/actions/archive")->assertForbidden(); // needs delete
    expect(Product::query()->find($product->id))->not->toBeNull();

    // Bulk actions: listed when the user has the action's permission.
    get('/cms/resources/products')->assertInertia(fn (Assert $page) => $page
        ->where('bulkActions', fn ($actions) => collect($actions)->pluck('key')->all() === ['deactivate', 'reprice']));
});

it('runs bulk actions on the selected records, skipping ones they don\'t apply to', function () {
    actingAsSuperAdmin();
    $a = product('Fan');
    $b = product('Lamp');
    $c = product('Rug', active: false);

    post('/cms/resources/products/bulk', ['action' => 'deactivate', 'ids' => [$a->id, $b->id, $c->id]])
        ->assertSessionHas('success', 'Take off sale: 2 products. 1 skipped (not available for it).');
    expect($a->refresh()->active)->toBeFalse()->and($b->refresh()->active)->toBeFalse();

    $pricey = product('Sofa', price: 9000);
    post('/cms/resources/products/bulk', ['action' => 'reprice', 'ids' => [$a->id, $pricey->id]])
        ->assertSessionHas('error', 'Reprice: 1 product. 1 failed: Sofa is too expensive to reprice.');

    post('/cms/resources/products/bulk', ['action' => 'archive', 'ids' => [$a->id]])->assertNotFound(); // not a bulk action
    post('/cms/resources/products/bulk', ['action' => 'delete', 'ids' => [$a->id]])->assertSessionHas('success');
    expect(Product::query()->find($a->id))->toBeNull();
});

it('checks action keys', function () {
    Action::make('Mark Paid');
})->throws(InvalidArgumentException::class);

it('adds package routes inside the admin, signed in and with Inertia', function () {
    app(Sunrice::class)->adminRoutes(function () {
        Route::get('commerce/orders', fn () => inertia('Commerce/Orders/Index', ['orders' => [['id' => 1]]]))->name('commerce.orders.index');
    });
    Route::getRoutes()->refreshNameLookups();

    expect(route('sunrice.admin.commerce.orders.index', absolute: false))->toBe('/cms/commerce/orders');

    get('/cms/commerce/orders')->assertRedirect('/cms/login');

    $outsider = User::query()->create(['name' => 'Customer', 'email' => 'customer@example.com', 'password' => 'x']);
    $this->actingAs($outsider);
    get('/cms/commerce/orders')->assertForbidden();

    actingAsSuperAdmin();
    get('/cms/commerce/orders')->assertInertia(fn (Assert $page) => $page
        ->component('Commerce/Orders/Index', shouldExist: false)
        ->where('orders.0.id', 1)
        ->has('adminPath')); // shared admin props, like core pages
});

it('registers package permissions for roles', function () {
    $sunrice = app(Sunrice::class);
    $sunrice->registerPermission('commerce.orders.refund', 'Refund orders', 'Commerce');

    $registry = app(PermissionRegistry::class);
    expect(collect($registry->grouped())->firstWhere('group', 'Commerce'))
        ->toBe(['group' => 'Commerce', 'permissions' => [['name' => 'commerce.orders.refund', 'label' => 'Refund orders']]]);

    app(SyncPermissions::class)->handle();
    expect(Permission::query()->where('name', 'commerce.orders.refund')->exists())->toBeTrue();

    // A second sync finds it there: one runs whenever a collection, a taxonomy or a form is saved.
    expect(app(SyncPermissions::class)->handle()['created'])->toBe(0)
        ->and(Permission::query()->where('name', 'commerce.orders.refund')->count())->toBe(1);

    // A sync without the registration (package removed) leaves it alone: only sunrice.* names are cleaned up.
    $fresh = new Sunrice;
    app()->instance(Sunrice::class, $fresh);
    app(SyncPermissions::class)->handle();
    expect(Permission::query()->where('name', 'commerce.orders.refund')->exists())->toBeTrue();
});

it('adds a package\'s tool to the MCP server, run as the token\'s user', function () {
    app(Sunrice::class)->registerMcpTool(RefundOrderTool::class);
    app(Sunrice::class)->registerMcpTool(RefundOrderTool::class);
    $admin = actingAsSuperAdmin();

    // Listed after Sunrice's own, once.
    $names = array_column((new ReflectionProperty(TestListResponse::class, 'items'))->getValue(SunriceServer::actingAs($admin)->tools()), 'name');
    expect(array_count_values($names)['refund_order'] ?? 0)->toBe(1)
        ->and($names)->toContain('get_site_info')
        ->and(array_search('refund_order', $names, true))->toBeGreaterThan(array_search('get_site_info', $names, true));

    SunriceServer::actingAs($admin)->tool(RefundOrderTool::class, ['order' => 7])
        ->assertOk()
        ->assertSee(['refunded', $admin->email]);
});

it('adds package instructions to the MCP server\'s', function () {
    app(Sunrice::class)->addMcpInstructions("## Shop\n\nCall list_orders before refund_order.");
    app(Sunrice::class)->addMcpInstructions('Prices are in IDR.');
    $admin = actingAsSuperAdmin();
    [, $plain] = ApiToken::issue($admin->id, 'Test');

    $instructions = postJson('/mcp', [
        'jsonrpc' => '2.0', 'id' => 1, 'method' => 'initialize',
        'params' => ['protocolVersion' => '2025-06-18', 'capabilities' => (object) [], 'clientInfo' => ['name' => 'test', 'version' => '1']],
    ], ['Authorization' => "Bearer {$plain}"])->assertOk()->json('result.instructions');

    expect($instructions)->toStartWith('Manage a website built with Sunrice CMS')
        ->and($instructions)->toEndWith("Read the developer docs\" permission).\n\n## Shop\n\nCall list_orders before refund_order.\n\nPrices are in IDR.");
});

it('takes only MCP tools for MCP tools', function () {
    app(Sunrice::class)->registerMcpTool(User::class);
})->throws(InvalidArgumentException::class, 'has to extend');

it('keeps the sunrice. prefix for Sunrice\'s own permissions', function () {
    app(Sunrice::class)->registerPermission('sunrice.commerce.refund', 'Refund');
})->throws(InvalidArgumentException::class);
