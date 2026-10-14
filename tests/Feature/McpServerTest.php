<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Storage;
use Laravel\Mcp\Server\Testing\TestResponse;
use Spatie\Permission\Models\Role;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Mcp\SunriceServer;
use Sunrice\Mcp\Tools;
use Sunrice\Models\ApiToken;
use Sunrice\Models\Asset;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Entry;
use Sunrice\Models\Form;
use Sunrice\Models\FormSubmission;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Permissions\SyncPermissions;
use Sunrice\Support\Locales;
use Workbench\App\Models\User;

use function Pest\Laravel\postJson;

/** The JSON a tool returned (or its error text under "error"). */
function mcpResult(TestResponse $response): array
{
    $property = new ReflectionProperty(TestResponse::class, 'response');
    $result = $property->getValue($response)->toArray()['result'] ?? [];
    $text = (string) ($result['content'][0]['text'] ?? '');
    if ($result['isError'] ?? false) {
        return ['error' => $text];
    }

    return json_decode($text, true) ?? ['text' => $text];
}

beforeEach(function () {
    $this->admin = actingAsSuperAdmin();
    $this->pages = createCollection('pages', ['route' => '/{slug}', 'hierarchical' => true]);
    RouteMatcher::flush();
});

it('describes the site', function () {
    $info = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\GetSiteInfo::class));

    expect($info['languages']['main'])->toBe('id')
        ->and(collect($info['collections'])->pluck('handle')->all())->toContain('pages')
        ->and($info['field_types'])->toContain('rich_text')
        ->and($info['user']['super_admin'])->toBeTrue();
});

it('creates, edits, translates and publishes entries', function () {
    $created = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\CreateEntry::class, [
        'collection' => 'pages', 'title' => 'About us', 'data' => ['body' => 'Hello'], 'seo' => ['description' => 'Who we are'],
    ]));
    expect($created['status'])->toBe('draft')->and($created['translations']['id']['draft']['data']['body'])->toBe('Hello');
    $id = $created['id'];

    // Partial edit keeps the rest of the draft.
    $updated = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\UpdateEntry::class, ['id' => $id, 'title' => 'About', 'publish' => true]));
    expect($updated['status'])->toBe('published')
        ->and($updated['translations']['id']['title'])->toBe('About')
        ->and($updated['translations']['id']['data']['body'])->toBe('Hello')
        ->and($updated['translations']['id']['seo']['description'])->toBe('Who we are');

    $english = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\UpdateEntry::class, ['id' => $id, 'locale' => 'en', 'title' => 'About (EN)', 'slug' => 'about-en', 'publish' => true]));
    expect($english['translations']['en']['ready'])->toBeTrue()
        ->and($english['translations']['en']['url'])->toBe('/en/about-en');

    // Only the date of a published entry (backdating an article).
    $dated = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\UpdateEntry::class, ['id' => $id, 'published_at' => '2024-01-15 09:00:00']));
    expect($dated['published_at'])->toStartWith('2024-01-15');

    $child = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\CreateEntry::class, ['collection' => 'pages', 'title' => 'Team', 'parent_id' => $id, 'publish' => true]));
    expect($child['parent_id'])->toBe($id);

    $list = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ListEntries::class, ['collection' => 'pages', 'search' => 'Team']));
    expect($list['total'])->toBe(1)->and($list['entries'][0]['url'])->toEndWith('/team');

    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ManageEntry::class, ['id' => $child['id'], 'action' => 'trash']));
    expect(Entry::query()->find($child['id']))->toBeNull();
    expect(mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ManageEntry::class, ['id' => $child['id'], 'action' => 'delete'])))->toHaveKey('deleted');
});

it('reports validation errors instead of saving', function () {
    $response = SunriceServer::actingAs($this->admin)->tool(Tools\CreateEntry::class, ['collection' => 'pages']);

    $response->assertHasErrors();
});

it('builds structure: blueprints, collections, taxonomies, terms, globals and menus', function () {
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveBlueprint::class, ['handle' => 'product', 'title' => 'Product', 'fields' => [
        ['handle' => 'price', 'type' => 'number', 'label' => 'Price'],
    ]]));
    $collection = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveCollection::class, [
        'handle' => 'products', 'title' => 'Products', 'blueprint' => 'product', 'settings' => ['route' => 'shop', 'has_archive' => true],
    ]));
    expect($collection['entry_url_pattern'])->toBe('/shop/{slug}')->and($collection['blueprint'])->toBe('product');

    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveTaxonomy::class, ['handle' => 'brands', 'title' => 'Brands', 'collections' => ['products']]));
    $term = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveTerm::class, ['taxonomy' => 'brands', 'translations' => ['id' => ['name' => 'Acme']]]));
    expect($term['translations']['id']['slug'])->toBe('acme');
    $renamed = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveTerm::class, ['id' => $term['id'], 'translations' => ['en' => ['name' => 'Acme EN']]]));
    expect($renamed['translations'])->toHaveKeys(['id', 'en']);

    $blueprint = Blueprint::query()->where('handle', 'product')->first();
    $global = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveGlobal::class, ['handle' => 'shop', 'blueprint' => 'product', 'values' => ['price' => 3]]));
    expect($global['created'])->toBeTrue()->and($global['values']['price'])->toBe(3);

    $page = createEntry($this->pages, 'Home');
    $menu = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveMenu::class, ['handle' => 'main', 'title' => 'Main', 'item' => ['type' => 'entry', 'target_id' => $page->id]]));
    expect($menu['items'])->toHaveCount(1);
    $itemId = $menu['items'][0]['id'];
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveMenu::class, ['handle' => 'main', 'item' => ['id' => $itemId, 'labels' => ['id' => 'Beranda']]]));
    expect(Menu::query()->first()->items()->first()->labels)->toBe(['id' => 'Beranda']);

    $deleted = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\DeleteStructure::class, ['type' => 'taxonomy', 'handle' => 'brands']));
    expect($deleted['deleted'])->toBeTrue()->and(Taxonomy::query()->where('handle', 'brands')->exists())->toBeFalse();
    expect($blueprint)->not->toBeNull();
});

it('audits SEO', function () {
    foreach (['Hi', 'Hey'] as $title) {
        createEntry($this->pages, $title)->translations()->first()->update(['seo' => ['title' => 'Same title']]);
    }

    $audit = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SeoAudit::class, ['locale' => 'id']));

    expect($audit['checked_entries'])->toBe(2)
        ->and($audit['issues'][0]['issues'])->toContain('No meta description.')
        ->and(collect($audit['duplicates'])->pluck('kind')->all())->toContain('meta title');
});

it('guides, writes and renders templates', function () {
    $guide = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\GetTemplateGuide::class));
    expect($guide['guide'])->toContain('first existing view wins')
        ->and($guide['current_template_map']['collections']['pages']['entry_page']['candidates'][0]['view'])->toBe('sunrice.pages.show')
        ->and($guide['can_write_templates'])->toBeTrue();

    $starter = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ReadTemplate::class, ['source' => 'starter', 'path' => 'layouts/app.blade.php']));
    expect($starter['content'])->toContain('<x-sunrice::seo');

    $bad = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\WriteTemplate::class, ['path' => 'pages/show.blade.php', 'content' => '@if($x) <p>']));
    expect($bad['error'])->toContain('syntax error');
    expect(mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\WriteTemplate::class, ['path' => '../evil.php', 'content' => 'x'])))->toHaveKey('error');

    $written = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\WriteTemplate::class, ['path' => 'pages/show.blade.php', 'content' => '<h1>Custom: {{ $entry->title }}</h1>']));
    expect($written['view'])->toBe('sunrice.pages.show');

    $entry = createEntry($this->pages, 'Hello there');
    $page = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\RenderPage::class, ['path' => '/'.$entry->translations()->first()->slug]));
    expect($page['status'])->toBe(200)->and($page['html'])->toContain('Custom: Hello there');

    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\WriteTemplate::class, ['path' => 'pages/show.blade.php', 'delete' => true]));
    expect(is_file(resource_path('views/sunrice/pages/show.blade.php')))->toBeFalse();
})->after(fn () => File::deleteDirectory(resource_path('views/sunrice/pages')));

it('keeps template writing and commands to those allowed', function () {
    app(SyncPermissions::class)->handle();
    $editor = User::query()->create(['name' => 'Ed', 'email' => 'ed@example.com', 'password' => bcrypt('x')]);
    $role = Role::findOrCreate('Agent', config('sunrice.auth.guard', 'web'));
    $role->givePermissionTo(['sunrice.ai-access', 'sunrice.access-admin']);
    $editor->assignRole($role);

    expect(mcpResult(SunriceServer::actingAs($editor)->tool(Tools\WriteTemplate::class, ['path' => 'x.blade.php', 'content' => 'x'])))->toHaveKey('error')
        ->and(mcpResult(SunriceServer::actingAs($editor)->tool(Tools\RunCommand::class, ['command' => 'cache:clear'])))->toHaveKey('error')
        ->and(mcpResult(SunriceServer::actingAs($editor)->tool(Tools\CreateEntry::class, ['collection' => 'pages', 'title' => 'Nope'])))->toHaveKey('error');

    expect(mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\RunCommand::class, ['command' => 'migrate:fresh']))['error'])->toContain('allowed commands');
    expect(mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\RunCommand::class, ['command' => 'view:clear']))['exit_code'])->toBe(0);
});

it('serves the HTTP endpoint only with a valid token', function () {
    $initialize = ['jsonrpc' => '2.0', 'id' => 1, 'method' => 'initialize', 'params' => ['protocolVersion' => '2025-06-18', 'capabilities' => (object) [], 'clientInfo' => ['name' => 'test', 'version' => '1']]];

    postJson('/mcp', $initialize)->assertUnauthorized();
    postJson('/mcp', $initialize, ['Authorization' => 'Bearer sr_wrong'])->assertUnauthorized();

    [, $plain] = ApiToken::issue($this->admin->id, 'Test');
    postJson('/mcp', $initialize, ['Authorization' => "Bearer {$plain}"])->assertOk()->assertJsonPath('result.serverInfo.name', 'Sunrice CMS');
    $tools = postJson('/mcp', ['jsonrpc' => '2.0', 'id' => 2, 'method' => 'tools/list'], ['Authorization' => "Bearer {$plain}"])->assertOk()->json('result.tools');
    expect(collect($tools)->pluck('name')->all())->toContain('get_site_info', 'update_entry', 'write_template');

    $call = postJson('/mcp', ['jsonrpc' => '2.0', 'id' => 3, 'method' => 'tools/call', 'params' => ['name' => 'get_site_info', 'arguments' => (object) []]], ['Authorization' => "Bearer {$plain}"])->assertOk();
    expect(json_decode($call->json('result.content.0.text'), true)['user']['email'])->toBe('admin@example.com');
});

it('manages tokens in the admin and from the command line', function () {
    \Pest\Laravel\post('/cms/ai-access', ['name' => 'Laptop'])->assertSessionHas('sunrice_new_token');
    $token = ApiToken::query()->firstOrFail();
    expect($token->token)->toHaveLength(64);

    \Pest\Laravel\get('/cms/ai-access')->assertOk();
    \Pest\Laravel\delete("/cms/ai-access/{$token->id}");
    expect(ApiToken::query()->count())->toBe(0);

    \Pest\Laravel\artisan('sunrice:mcp-token', ['email' => 'admin@example.com', '--name' => 'CLI'])->assertSuccessful();
    expect(ApiToken::query()->where('name', 'CLI')->exists())->toBeTrue();
});

it('builds and fills a listing page', function () {
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveBlueprint::class, ['handle' => 'blog_listing', 'fields' => [
        ['handle' => 'tagline', 'type' => 'text', 'label' => 'Tagline', 'translatable' => true],
        ['handle' => 'columns', 'type' => 'number', 'label' => 'Columns'],
    ]]));
    $collection = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveCollection::class, [
        'handle' => 'posts', 'archive_blueprint' => 'blog_listing', 'settings' => ['has_archive' => true, 'archive_route' => 'blog'],
    ]));
    expect($collection['settings']['archive_blueprint_id'])->toBe(Blueprint::query()->where('handle', 'blog_listing')->value('id'));

    $saved = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveListing::class, [
        'collection' => 'posts', 'title' => 'Blog', 'intro' => 'News from us.', 'data' => ['tagline' => 'Fresh', 'columns' => 3], 'seo' => ['description' => 'All posts'],
    ]));
    expect($saved['saved'])->toBeTrue()->and($saved['listing_blueprint'])->toBe('blog_listing');

    // Only the keys sent change; another language keeps the shared fields.
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveListing::class, ['collection' => 'posts', 'data' => ['columns' => 4]]));
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveListing::class, ['collection' => 'posts', 'locale' => 'en', 'title' => 'Blog EN', 'data' => ['tagline' => 'New']]));

    $listing = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\GetListing::class, ['collection' => 'posts']));
    expect($listing['languages']['id'])->toMatchArray(['title' => 'Blog', 'intro' => 'News from us.', 'data' => ['tagline' => 'Fresh', 'columns' => 4], 'seo' => ['description' => 'All posts']])
        ->and($listing['languages']['en']['title'])->toBe('Blog EN')
        ->and($listing['languages']['en']['data'])->toEqual(['tagline' => 'New', 'columns' => 4])
        ->and($listing['languages']['id']['url'])->toEndWith('/blog');

    // Removing the listing blueprint by handle.
    $cleared = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveCollection::class, ['handle' => 'posts', 'archive_blueprint' => '']));
    expect($cleared['settings'])->not->toHaveKey('archive_blueprint_id')->and($cleared['settings']['has_archive'])->toBeTrue();

    $nobody = User::query()->create(['name' => 'Nobody', 'email' => 'nobody@example.com', 'password' => bcrypt('x')]);
    expect(mcpResult(SunriceServer::actingAs($nobody)->tool(Tools\SaveListing::class, ['collection' => 'posts', 'title' => 'Hacked'])))->toHaveKey('error')
        ->and(mcpResult(SunriceServer::actingAs($nobody)->tool(Tools\GetListing::class, ['collection' => 'posts'])))->toHaveKey('error');
});

it('reorders entries, terms and menu items', function () {
    $a = createEntry($this->pages, 'A');
    $b = createEntry($this->pages, 'B');
    $c = createEntry($this->pages, 'C');
    collect([$a, $b, $c])->each(fn (Entry $e, int $i) => $e->update(['sort_order' => $i + 1]));

    // Only C and A are listed: they swap, B keeps its place.
    $result = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\Reorder::class, ['type' => 'entries', 'in' => 'pages', 'ids' => [$c->id, $a->id]]));
    expect($result['order'])->toBe([$c->id, $b->id, $a->id])
        ->and(Entry::query()->orderBy('sort_order')->pluck('id')->all())->toBe([$c->id, $b->id, $a->id]);

    $topics = Taxonomy::factory()->create(['handle' => 'topics']);
    $one = Term::factory()->create(['taxonomy_id' => $topics->id, 'sort_order' => 1]);
    $two = Term::factory()->create(['taxonomy_id' => $topics->id, 'sort_order' => 2]);
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\Reorder::class, ['type' => 'terms', 'in' => 'topics', 'ids' => [$two->id, $one->id]]));
    expect($two->fresh()->sort_order)->toBeLessThan($one->fresh()->sort_order);

    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveMenu::class, ['handle' => 'main', 'item' => ['type' => 'url', 'url' => '/x', 'labels' => ['id' => 'X']]]));
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveMenu::class, ['handle' => 'main', 'item' => ['type' => 'url', 'url' => '/y', 'labels' => ['id' => 'Y']]]));
    $items = Menu::query()->first()->items()->orderBy('sort_order')->pluck('id')->all();
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\Reorder::class, ['type' => 'menu_items', 'in' => 'main', 'ids' => array_reverse($items)]));
    expect(Menu::query()->first()->items()->orderBy('sort_order')->pluck('id')->all())->toBe(array_reverse($items));

    expect(mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\Reorder::class, ['type' => 'entries', 'in' => 'pages', 'ids' => [999999]])))->toHaveKey('error');
});

it('lists, shows and restores entry revisions', function () {
    $entry = createEntry($this->pages, 'First');
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\UpdateEntry::class, ['id' => $entry->id, 'title' => 'Second', 'publish' => true]));
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\UpdateEntry::class, ['id' => $entry->id, 'title' => 'Third', 'publish' => true]));

    $list = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\EntryRevisions::class, ['entry_id' => $entry->id]));
    expect($list['revisions'])->not->toBeEmpty()->and($list['revisions'][0]['title'])->toBe('Third');
    $older = collect($list['revisions'])->firstWhere('title', 'Second');

    $shown = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\EntryRevisions::class, ['action' => 'show', 'revision_id' => $older['id']]));
    expect($shown['content']['title'])->toBe('Second');

    $restored = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\EntryRevisions::class, ['action' => 'restore', 'revision_id' => $older['id']]));
    expect($restored['draft']['title'])->toBe('Second')
        ->and($entry->translations()->where('locale', 'id')->first()->title)->toBe('Third'); // live untouched
});

it('organises assets and deletes form submissions', function () {
    Storage::fake('public');
    $asset = Asset::factory()->create(['title' => 'Logo']);

    $folder = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ManageAsset::class, ['action' => 'create_folder', 'name' => 'Brand']));
    $moved = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ManageAsset::class, ['action' => 'move', 'id' => $asset->id, 'folder_id' => $folder['folder']['id']]));
    expect($moved['folder'])->toBe('Brand')->and($asset->fresh()->folder_id)->toBe($folder['folder']['id']);
    expect(mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ManageAsset::class, ['action' => 'folders']))['folders'][0]['name'])->toBe('Brand');

    expect(mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ManageAsset::class, ['action' => 'delete', 'id' => $asset->id])))->toHaveKey('error');
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ManageAsset::class, ['action' => 'trash', 'id' => $asset->id]));
    expect($asset->fresh()->trashed())->toBeTrue();
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\ManageAsset::class, ['action' => 'restore', 'id' => $asset->id]));
    expect($asset->fresh()->trashed())->toBeFalse();

    $form = Form::factory()->create(['handle' => 'contact']);
    $keep = FormSubmission::create(['form_id' => $form->id, 'data' => ['message' => 'Keep']]);
    $spam = FormSubmission::create(['form_id' => $form->id, 'data' => ['message' => 'Spam']]);
    $result = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\DeleteSubmissions::class, ['form' => 'contact', 'ids' => [$spam->id, 424242]]));
    expect($result)->toBe(['deleted' => [$spam->id], 'not_found' => [424242]])
        ->and(FormSubmission::query()->pluck('id')->all())->toBe([$keep->id]);
});

it('changes a global set and merges SEO settings key by key', function () {
    $blueprint = Blueprint::factory()->create(['handle' => 'contact_info']);
    $other = Blueprint::factory()->create(['handle' => 'footer']);
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveGlobal::class, ['handle' => 'contact', 'blueprint' => 'contact_info']));
    $saved = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveGlobal::class, ['handle' => 'contact', 'title' => 'Contact details', 'blueprint' => 'footer']));
    expect($saved['saved'])->toBeTrue();
    $set = GlobalSet::query()->where('handle', 'contact')->first();
    expect($set->title)->toBe('Contact details')->and($set->blueprint_id)->toBe($other->id);

    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveCollection::class, ['handle' => 'pages', 'settings' => ['seo' => ['description' => 'Our pages']]]));
    $collection = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveCollection::class, ['handle' => 'pages', 'settings' => ['seo' => ['title_field' => 'headline']]]));
    expect($collection['settings']['seo'])->toEqual(['description' => 'Our pages', 'title_field' => 'headline']);
    $collection = mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveCollection::class, ['handle' => 'pages', 'settings' => ['seo' => ['title_field' => '']]]));
    expect($collection['settings']['seo'])->toEqual(['description' => 'Our pages']);
});

it('translates collection and taxonomy names through their settings', function () {
    $other = collect(Locales::available())->first(fn (string $l) => ! Locales::isMain($l));

    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveCollection::class, [
        'handle' => 'pages', 'settings' => ['titles' => [$other => 'Translated pages']],
    ]));
    mcpResult(SunriceServer::actingAs($this->admin)->tool(Tools\SaveTaxonomy::class, [
        'handle' => 'topics', 'title' => 'Topics', 'settings' => ['titles' => [$other => 'Translated topics']],
    ]));

    expect($this->pages->fresh()->titleIn($other))->toBe('Translated pages')
        ->and(Taxonomy::query()->where('handle', 'topics')->first()->titleIn($other))->toBe('Translated topics');
});
