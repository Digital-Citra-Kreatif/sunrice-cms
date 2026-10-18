# Extending the admin

Everything here goes in your app, usually in the `boot()` method of
`app/Providers/AppServiceProvider.php`. Nothing in `vendor/` needs to change,
so updating Sunrice keeps your additions.

```php
use Sunrice\Facades\Sunrice;

public function boot(): void
{
    Sunrice::addNavigationItem('Reports', '/reports', 'chart-column');
    Sunrice::registerField(\App\Sunrice\RatingField::class);
    Sunrice::registerResource(\App\Sunrice\ProductResource::class);
}
```

## Sidebar navigation

### Add a link

```php
Sunrice::addNavigationItem(
    label: 'Reports',
    href: '/reports',              // where it goes (see below)
    icon: 'chart-column',          // a sidebar icon name (list below)
    group: 'Tools',                // an existing group or a new one
    can: 'view-reports',           // who sees it (optional)
);
```

- **`href`**
  - A path inside the admin, such as `resources/products` or `settings`,
    opens in the admin like the built-in pages and is highlighted while
    you're on it.
  - An address of its own, such as `/reports`, `/horizon` or
    `https://analytics.example.com`, opens as a normal page. Use this for
    pages your app serves with its own routes and layout.
- **`group`**
  - Built-in groups: `Content`, `Taxonomies`, `Structure`, `Resources`,
    `Manage`. A link given one of these is added at the end of that group.
  - Any other name creates a new group, placed just before `Manage`.
- **`can`**
  - An ability or permission name, checked with `$user->can(...)`. That
    covers Gates, policies and spatie permissions.
  - Or a callable: `fn ($user) => $user->is_staff`.
  - Leave it out to show the link to everyone who can open the admin.
  - Super admins pass every ability check, so they see every link.

### Change the whole sidebar

For anything else, such as renaming, reordering or hiding a built-in item,
register a hook. It receives the groups as built for the current user and
returns the groups to show:

```php
Sunrice::navigationUsing(function (array $groups, $user): array {
    // Hide Fieldsets for everyone but super admins.
    foreach ($groups as &$group) {
        $group['items'] = array_values(array_filter(
            $group['items'],
            fn ($item) => $item['href'] !== 'structure/fieldsets' || $user->hasRole(config('sunrice.super_admin_role')),
        ));
    }

    // Put a "Shop" group first.
    array_unshift($groups, ['label' => 'Shop', 'items' => [
        ['label' => 'Orders', 'href' => 'resources/orders', 'icon' => 'package'],
    ]]);

    return $groups;
});
```

A group is `['label' => …, 'items' => [...]]`, and an item is
`['label' => …, 'href' => …, 'icon' => …]`. Groups left without items are
not shown. Hooks run in the order they are registered, after the links
added with `addNavigationItem()`.

### Icons

`blocks`, `book-open`, `bot`, `briefcase`, `calendar`, `chart-column`,
`clipboard-list`, `credit-card`, `database`, `external-link`, `file-text`,
`folder`, `globe`, `home`, `image`, `inbox`, `layout-grid`,
`layout-template`, `library`, `link`, `list-tree`, `mail`, `map-pin`,
`megaphone`, `newspaper`, `package`, `settings`, `shield`, `shopping-bag`,
`shopping-cart`, `star`, `tags`, `users`, `wrench`.

An unknown name shows a small dot. Collections use the same names in their
**Icon** setting.

## Settings tabs

The Settings page has General and SEO tabs. A package or app can add its
own tab for a settings screen it serves (with `Sunrice::adminRoutes()` and
a page registered by an admin script):

```php
Sunrice::addSettingsTab(
    key: 'store',                  // unique; General and SEO are "general" and "seo"
    label: 'Store',
    href: 'commerce/settings',     // a path inside the admin
    can: 'commerce.settings.view', // who sees it (optional): ability name or callable
);
```

- The tab shows after the built-in ones, for users who pass `can`. General
  and SEO need `sunrice.settings.edit`.
- The sidebar's **Settings** link opens the first tab the user may see, so
  someone who may only change the store settings still finds them.
- Show the same tab bar on your page, with your tab current:

  ```jsx
  const { components } = window.Sunrice;
  <components.SettingsTabs current="store" />
  ```

  It reads the tabs from the page's shared `settingsTabs` prop, and hides
  itself when the user can see only one tab.

## Dashboard cards

A package or app can add cards to the dashboard, below Sunrice's own:

```php
Sunrice::addDashboardCard(
    name: 'commerce-sales',              // unique; the admin script uses the same name
    props: fn () => ['total' => Order::query()->whereToday()->sum('total')],
    can: 'commerce.orders.view',         // who sees it (optional): ability name or callable
    position: 20,                        // order among the cards, lowest first (default 100)
);
```

In an admin script, register the card's component under that name. It
receives the props the callback returned:

```jsx
window.Sunrice.registerDashboardCard('commerce-sales', ({ total }) => (
    <window.Sunrice.components.CollapsibleCard title="Sales today" storageKey="dashboard:commerce-sales">
        {total}
    </window.Sunrice.components.CollapsibleCard>
));
```

- The props are a deferred Inertia prop: the dashboard shows first, with a
  placeholder, and the callbacks run in a second request. Slow queries
  don't hold up the page, and callbacks of cards a user may not see never
  run.
- `can` works like `addNavigationItem()`'s: a permission name, or a
  callable receiving the user and returning a bool. Null shows the card to
  everyone who can open the admin.
- A card with no registered component shows nothing.

## Accounts that aren't staff

Users (Manage → Users) lists every account of the user model, paged, with
search and a role filter. A package whose accounts aren't staff, such as a
shop's customers, can leave them out:

```php
use Illuminate\Database\Eloquent\Builder;

Sunrice::usersQueryUsing(fn (Builder $query) => $query->whereDoesntHave(
    'roles', fn (Builder $roles) => $roles->where('name', 'Customer'),
));
```

The scope applies to the Users list and to the user pickers ("move their
content to" when deleting a user). Hidden accounts can still be opened
by their address (`/cms/users/{id}/edit`), so the package can link to
them. `Sunrice::usersQuery()` returns the scoped query for your own
screens.

## Pages inside the admin: resources

To manage one of your own Eloquent models in the admin, register a
resource. You get a list with search, filters and export, plus create and
edit forms and permissions, and it appears in the sidebar under
**Resources**. See [Model resources](resources.md).

For screens of your own (an order with its items, a report), add routes
with `Sunrice::adminRoutes()` and register their React page with
`window.Sunrice.registerPage()`. See [Writing a package](packages.md).

## New field types

Field types defined in your app appear in the blueprint and fieldset
builders' **Add field** list, next to the built-in ones.

1. Create the class, e.g. `app/Sunrice/RatingField.php`:

   ```php
   namespace App\Sunrice;

   use Sunrice\Fields\CustomField;

   class RatingField extends CustomField
   {
       public static function type(): string { return 'rating'; }
       public static function baseType(): string { return 'number'; }   // edited with the number input
       public static function config(): array { return ['min' => 1, 'max' => 5]; }
       public static function extraRules(): array { return ['integer', 'between:1,5']; }
   }
   ```

2. Register it in `AppServiceProvider::boot()`:

   ```php
   Sunrice::registerField(\App\Sunrice\RatingField::class);
   ```

3. Add it to a blueprint under **Manage → Blueprints**, and read it in
   templates like any field: `$entry->get('rating')`.

That covers fields that reuse a built-in control. If you need a new kind of
input, such as a star widget, a colour wheel or a map, you also need a
small admin script, registered with `Sunrice::registerAdminScript()`. See
[Custom field types](custom-fields.md) for both kinds, validation, stored
shape and template values.

## Admin scripts and styles

```php
Sunrice::registerAdminScript('js/sunrice-admin.js');   // public/js/…, or a full URL
Sunrice::registerAdminStyle('css/sunrice-admin.css');
```

They are loaded on every admin page, after Sunrice's own assets. Use them
for custom field controls or small style changes. To change the admin's
name, logo, font and accent color, use **Settings → Branding**; no CSS is
needed for that.
