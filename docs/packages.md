# Writing a package

Bigger features (a shop, bookings, memberships) belong in their own
Composer package, not in Sunrice itself or in each site. The package
brings its own tables, models, admin screens and routes, and plugs into
Sunrice's admin: sidebar, roles, list tables and the editor's look.
Installing it is `composer require` plus `php artisan migrate`; removing
it leaves Sunrice as it was.

This guide uses a commerce package (`acme/sunrice-commerce`) as the example.

## Layout

```
acme/sunrice-commerce
├── composer.json            requires sunrice/cms; auto-discovers the provider
├── config/commerce.php      gateway keys from .env
├── database/migrations/     commerce_orders, commerce_payments, …
├── resources/views/         checkout, invoice PDF
├── dist/admin.js            prebuilt admin pages (see below)
└── src/
    ├── CommerceServiceProvider.php
    ├── Models/  Resources/  Http/Controllers/  Mail/
```

```json
{
    "name": "acme/sunrice-commerce",
    "require": { "sunrice/cms": "^1.0" },
    "autoload": { "psr-4": { "Acme\\Commerce\\": "src/" } },
    "extra": { "laravel": { "providers": ["Acme\\Commerce\\CommerceServiceProvider"] } }
}
```

Use only Sunrice's public API: the `Sunrice` facade, `Resource` and
`Action`, events, Blade components, config and `window.Sunrice` in the
admin. Then your package keeps working when Sunrice's internals change.

## The service provider

```php
namespace Acme\Commerce;

use Acme\Commerce\Http\Controllers\OrderController;
use Acme\Commerce\Resources\OrderResource;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Sunrice\Facades\Sunrice;

class CommerceServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/commerce.php', 'commerce');
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'commerce');
        $this->publishes([__DIR__.'/../dist' => public_path('vendor/commerce')], 'commerce-assets');

        // Roles can be given these in Users → Roles.
        Sunrice::registerPermission('commerce.orders.view', 'View orders', 'Commerce');
        Sunrice::registerPermission('commerce.orders.refund', 'Refund orders', 'Commerce');

        // A tool for AI agents, beside Sunrice's own (see Tools for AI agents).
        Sunrice::registerMcpTool(RefundOrder::class);

        // A list + editor for a table, with actions (see Model resources).
        Sunrice::registerResource(OrderResource::class);

        // Your own admin screens.
        Sunrice::adminRoutes(function () {
            Route::get('commerce/orders/{order}', [OrderController::class, 'show'])->name('commerce.orders.show');
            Route::post('commerce/orders/{order}/refund', [OrderController::class, 'refund'])->name('commerce.orders.refund');
        });
        Sunrice::registerAdminScript('vendor/commerce/admin.js');

        // A sidebar group of its own.
        Sunrice::addNavigationItem('Sales report', 'commerce/report', 'chart-column', group: 'Shop', can: 'commerce.orders.view');

        // Public routes (checkout, payment webhooks) are ordinary Laravel
        // routes; they take priority over Sunrice's pages.
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
    }
}
```

After installing, run `php artisan migrate` and
`php artisan sunrice:sync-permissions`. The sync creates the new
permissions; Super Admins have them all already.

## Permissions

`Sunrice::registerPermission($name, $label, $group)` adds a permission to
the role editor, under its group. Use your own prefix
(`commerce.orders.refund`). Names starting with `sunrice.` are refused,
because Sunrice cleans up `sunrice.*` permissions it doesn't know about.
Check them as usual: `$user->can('commerce.orders.refund')`,
`Gate::authorize(...)`, or the `can` argument of `addNavigationItem()`.

Resources get their own permissions automatically
(`sunrice.resources.{key}.view|create|edit|delete|export`).

## Tools for AI agents

`Sunrice::registerMcpTool($class)` adds a tool to the [MCP server](ai-agents.md)
agents connect to, listed after Sunrice's own. Extend
`Sunrice\Mcp\Tools\SunriceTool`:

```php
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Mcp\Tools\SunriceTool;

#[Description('Refund an order. Ask the user before refunding.')]
class RefundOrder extends SunriceTool
{
    protected string $name = 'refund_order';

    public function handle(Request $request): Response
    {
        $args = $request->validate(['order' => ['required', 'integer']]);
        $this->authorize('commerce.orders.refund');
        // ...

        return $this->json(['refunded' => $args['order']]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['order' => $schema->integer()->description('The order\'s id.')->required()];
    }
}
```

The tool runs as the user who owns the access token, and what it changes
is in the activity log with source "ai" like any other tool's. It checks
what that user may do itself: `$this->authorize()` throws when they may
not. The description is what the agent reads to decide when to call it,
so say what the tool does and when not to use it.

## Lists and editors: resources and actions

For a table you mainly list, filter and edit, register a
[resource](resources.md). It gives you the admin's list table (search,
filters, sorting, per-page, export, bulk actions) and an editor with any
field type. Buttons such as "Mark as paid" or "Send invoice" are
[actions](resources.md#actions):

```php
public static function actions(): array
{
    return [
        Action::make('mark_paid')->label('Mark as paid')
            ->visible(fn (Order $order) => $order->status === 'pending')
            ->handle(fn (Order $order) => $order->markPaid())
            ->bulk(),
        Action::make('invoice')->label('Download invoice')
            ->url(fn (Order $order) => route('commerce.invoices.pdf', $order)),
    ];
}
```

## Your own admin pages

When a resource's list and form aren't enough (an order with its items
and payment history, a sales report), add a page:

1. **A route** inside the admin, with `Sunrice::adminRoutes()`. Its routes
   are under the admin address (`/cms/commerce/orders/12`), named
   `sunrice.admin.…`, signed in, and set up for Inertia, like Sunrice's
   own. Check your permission in the controller:

   ```php
   class OrderController
   {
       public function show(Order $order)
       {
           Gate::authorize('commerce.orders.view');

           return Inertia::render('Commerce/Orders/Show', [
               'order' => $order->load('items', 'payments'),
               'canRefund' => request()->user()->can('commerce.orders.refund'),
           ]);
       }

       public function refund(Order $order)
       {
           Gate::authorize('commerce.orders.refund');
           $order->refund();

           return back()->with('success', 'Refunded.'); // shown as a toast
       }
   }
   ```

2. **A page component** with that name, registered by your admin script:

   ```jsx
   // resources/js/admin.jsx → dist/admin.js
   const { React, registerPage, ui, components, inertia, adminUrl, useBreadcrumbs } = window.Sunrice;

   function OrderShow({ order, canRefund }) {
       useBreadcrumbs([{ label: 'Orders', href: adminUrl('resources/orders') }, { label: `#${order.number}` }]);

       return (
           <components.CollapsibleCard title={`Order #${order.number}`}>
               <ui.Table>
                   <ui.TableBody>
                       {order.items.map((item) => (
                           <ui.TableRow key={item.id}>
                               <ui.TableCell>{item.name}</ui.TableCell>
                               <ui.TableCell>{item.quantity}</ui.TableCell>
                           </ui.TableRow>
                       ))}
                   </ui.TableBody>
               </ui.Table>
               {canRefund && (
                   <ui.Button variant="destructive" onClick={() => inertia.router.post(adminUrl(`commerce/orders/${order.id}/refund`))}>
                       Refund
                   </ui.Button>
               )}
           </components.CollapsibleCard>
       );
   }

   registerPage('Commerce/Orders/Show', OrderShow);
   ```

The page gets the admin layout (sidebar, header, toasts for `success` and
`error` flashes). Set `OrderShow.layout = null` for a page without it.
Pages registered by admin scripts load on the first visit too: the admin
waits for its scripts before showing a package's page.

### What `window.Sunrice` offers

| | |
| --- | --- |
| `React`, `ReactDOM` | The admin's own copies. Always use these: a second React breaks hooks. |
| `registerPage(name, Component)` | A page for `Inertia::render(name)`. |
| `registerField(type, Component)` | An editor control for a [custom field type](custom-fields.md). |
| `inertia` | `router`, `Link`, `Head`, `usePage`, `useForm` from the admin's Inertia. |
| `adminUrl(path)` | `'commerce/orders'` → `'/cms/commerce/orders'`, with the site's admin path. |
| `useBreadcrumbs(crumbs)` | The header's trail, for pages the sidebar doesn't list. |
| `ui` | `Button`, `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`, `Badge`, `Card*`, `Dialog*`, `Select*`, `Table*`, `Tabs*`. |
| `components` | `DataTable` (the list table), `FieldRenderer` (fields of any type), `CollapsibleCard`, `InputError`, `SettingsTabs` (the Settings page's tab bar, see [Settings tabs](extending.md#settings-tabs)). |
| `fetchJson(url, init)` | `fetch` with the CSRF token, returning JSON. |
| `toast` | `toast.success('…')`, `toast.error('…')`. |
| `version` | The API version (2). |

### Building the script

Bundle your JSX into one ES module, with React taken from
`window.Sunrice` instead of bundled. With esbuild:

```bash
npx esbuild resources/js/admin.jsx --bundle --format=esm --outfile=dist/admin.js \
  --jsx-factory=Sunrice.React.createElement --jsx-fragment=Sunrice.React.Fragment --external:react
```

Don't import `react` or `@inertiajs/react` yourself: take them from
`window.Sunrice`. Commit `dist/admin.js`; the site publishes it with
`php artisan vendor:publish --tag=commerce-assets`.

The admin's stylesheet only has the classes Sunrice itself uses. Prefer
the `ui` and `components` building blocks; for anything else, ship a
stylesheet (`Sunrice::registerAdminStyle()`).

## The site side

- **Content you want to manage like pages** (products, courses) can be a
  normal collection with its own blueprint. Then it gets SEO, translations,
  revisions, URLs and the `<x-sunrice::entries>` / `<x-sunrice::entry-filter>`
  components. Keep data that changes on its own (stock, orders) in your tables.
- **Your own pages** (cart, checkout, account) are ordinary routes and Blade
  views. They can use the site's layout, `<x-sunrice::seo :title="…" :description="…" />`,
  menus and `<x-sunrice::form>`.
- **Settings an editor changes** (shop name, bank details) fit in a
  [global set](content-modeling.md); `.env` holds secrets such as
  gateway keys.
- **Events**: listen to `Sunrice\Events\EntryPublished`, `ContentChanged`
  and the others like any Laravel event.

## Testing

Test the package with Orchestra Testbench and Pest, loading Sunrice's
provider and yours. `Sunrice::adminRoutes()` routes can be called like any
route (`$this->get('/cms/commerce/orders/1')`), and
`assertInertia(fn ($page) => $page->component('Commerce/Orders/Show', shouldExist: false))`
checks the page name without looking for a file in Sunrice's bundle.
