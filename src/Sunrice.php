<?php

declare(strict_types=1);

namespace Sunrice;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use InvalidArgumentException;
use Laravel\Mcp\Server\Tool;
use Sunrice\Fields\FieldRegistry;
use Sunrice\Frontend\GlobalsRepository;
use Sunrice\Frontend\MenuBuilder;
use Sunrice\Frontend\MenuNode;
use Sunrice\Frontend\TemplateContext;
use Sunrice\Http\Middleware\Authenticate;
use Sunrice\Http\Middleware\EnsureCanAccessAdmin;
use Sunrice\Http\Middleware\HandleSunriceInertiaRequests;
use Sunrice\Query\EntryQuery;

/**
 * The Sunrice registration API. Developers use this facade from their
 * service providers to register custom fields, model resources and
 * template selection hooks, and from Blade/templates to fetch content.
 */
class Sunrice
{
    /** @var array<int, callable> */
    protected array $templateHooks = [];

    /** @var array<int, callable> */
    protected array $bodyClassHooks = [];

    /** @var array<string, class-string> */
    protected array $resources = [];

    /** @var array<int, string> */
    protected array $adminScripts = [];

    /** @var array<int, string> */
    protected array $adminStyles = [];

    /** @var array<int, array{label: string, href: string, icon: string, group: string, can: string|callable|null}> */
    protected array $navigationItems = [];

    /** @var array<int, callable> */
    protected array $navigationHooks = [];

    /** @var array<string, array{name: string, label: string, group: string}> */
    protected array $permissions = [];

    /** @var array<int, class-string> */
    protected array $mcpTools = [];

    /** @var array<string, array{key: string, label: string, href: string, can: string|callable|null}> */
    protected array $settingsTabs = [];

    /** @var array<int, callable> */
    protected array $userScopes = [];

    /** @var array<string, array{name: string, props: Closure, can: string|callable|null, position: int}> */
    protected array $dashboardCards = [];

    /** @var array<int, string> */
    protected array $mcpInstructions = [];

    /** @var array<int, callable> */
    protected array $pageCacheHooks = [];

    public function version(): string
    {
        return '1.0.0';
    }

    public function fields(): FieldRegistry
    {
        return app(FieldRegistry::class);
    }

    /**
     * Register a custom field type. The class must extend
     * Sunrice\Fields\FieldType (built-in types) or
     * Sunrice\Fields\CustomField (developer compositions).
     *
     * @param  class-string  $class
     */
    public function registerField(string $class): void
    {
        $this->fields()->register($class);
    }

    /**
     * Load a JavaScript file in the admin, after its own bundle: the place
     * to register React components for custom field types with
     * `window.Sunrice.registerField()`. A path ("js/fields.js") is served
     * through asset(); full URLs are used as they are.
     */
    public function registerAdminScript(string $url): void
    {
        $this->adminScripts[] = $url;
    }

    /** Load a stylesheet in the admin (e.g. for custom field components). */
    public function registerAdminStyle(string $url): void
    {
        $this->adminStyles[] = $url;
    }

    /**
     * Admin scripts from config `sunrice.admin.scripts` and
     * registerAdminScript(), as URLs.
     *
     * @return array<int, string>
     */
    public function adminScripts(): array
    {
        return static::assetUrls([...(array) config('sunrice.admin.scripts', []), ...$this->adminScripts]);
    }

    /**
     * @return array<int, string>
     */
    public function adminStyles(): array
    {
        return static::assetUrls([...(array) config('sunrice.admin.styles', []), ...$this->adminStyles]);
    }

    /**
     * @param  array<mixed>  $paths
     * @return array<int, string>
     */
    protected static function assetUrls(array $paths): array
    {
        $urls = [];
        foreach ($paths as $path) {
            if (! is_string($path) || trim($path) === '') {
                continue;
            }
            $urls[] = preg_match('#^(https?:)?//#i', $path) === 1 ? $path : asset(ltrim($path, '/'));
        }

        return array_values(array_unique($urls));
    }

    /**
     * Middleware of the admin's routes: the web group, any extra
     * (`sunrice.admin.middleware`) and the Inertia setup; signed-in routes
     * add the admin guard and the access-admin check.
     *
     * @return array<int, mixed>
     */
    public function adminMiddleware(bool $authenticated = true): array
    {
        return array_merge(
            ['web'],
            (array) config('sunrice.admin.middleware', []),
            [HandleSunriceInertiaRequests::class],
            $authenticated ? [Authenticate::class, EnsureCanAccessAdmin::class] : [],
        );
    }

    /**
     * Add routes inside the admin, for a package's own screens: they get
     * the admin's address prefix ({admin}/…), route names
     * (`sunrice.admin.…`), sign-in and Inertia setup, so a controller can
     * `Inertia::render()` a page registered with
     * `window.Sunrice.registerPage()`. Call it from a service provider's
     * boot(); check permissions in the controller.
     *
     *     Sunrice::adminRoutes(function () {
     *         Route::get('commerce/orders/{order}', [OrderController::class, 'show'])->name('commerce.orders.show');
     *     });
     */
    public function adminRoutes(Closure $routes): void
    {
        Route::middleware($this->adminMiddleware())
            ->prefix(config('sunrice.admin.path', 'cms'))
            ->name('sunrice.admin.')
            ->group($routes);
    }

    /**
     * Register a permission of your own, so roles can be given it in the
     * admin (Users → Roles) and `sunrice:sync-permissions` creates it.
     * Use your own prefix ("commerce.orders.refund"): names starting with
     * "sunrice." belong to Sunrice.
     */
    public function registerPermission(string $name, string $label, string $group = 'Other'): void
    {
        if (str_starts_with($name, 'sunrice.')) {
            throw new InvalidArgumentException("Permission \"{$name}\": use your own prefix; \"sunrice.\" names belong to Sunrice.");
        }
        $this->permissions[$name] = ['name' => $name, 'label' => $label, 'group' => $group];
    }

    /**
     * Permissions registered with registerPermission().
     *
     * @return array<int, array{name: string, label: string, group: string}>
     */
    public function permissions(): array
    {
        return array_values($this->permissions);
    }

    /**
     * Add a tool to the MCP server AI agents connect to, beside Sunrice's
     * own. The class extends `Sunrice\Mcp\Tools\SunriceTool` (or laravel/mcp's
     * `Tool`): it runs as the token's user, and checks what that user may do
     * itself, with `$this->authorize()` or `$request->user()->can()`.
     *
     * @param  class-string  $class
     */
    public function registerMcpTool(string $class): void
    {
        if (class_exists(Tool::class) && ! is_subclass_of($class, Tool::class)) {
            throw new InvalidArgumentException("MCP tool \"{$class}\" has to extend Laravel\\Mcp\\Server\\Tool: Sunrice\\Mcp\\Tools\\SunriceTool does.");
        }
        if (! in_array($class, $this->mcpTools, true)) {
            $this->mcpTools[] = $class;
        }
    }

    /**
     * Tools registered with registerMcpTool().
     *
     * @return array<int, class-string>
     */
    public function mcpTools(): array
    {
        return $this->mcpTools;
    }

    /**
     * Add text to the MCP server's instructions, which agents read when
     * they connect: how to use a package's tools, what to ask first.
     * Each text is added as its own section, after Sunrice's own.
     */
    public function addMcpInstructions(string $markdown): void
    {
        $markdown = trim($markdown);
        if ($markdown !== '' && ! in_array($markdown, $this->mcpInstructions, true)) {
            $this->mcpInstructions[] = $markdown;
        }
    }

    /**
     * Texts added with addMcpInstructions().
     *
     * @return array<int, string>
     */
    public function mcpInstructions(): array
    {
        return $this->mcpInstructions;
    }

    /**
     * Add a card to the admin dashboard, below Sunrice's own. The admin
     * script registers its component with
     * `window.Sunrice.registerDashboardCard($name, Component)`.
     *
     * - $props: returns the card's props; it runs after the page has
     *   loaded (a deferred prop), so slow queries don't hold the dashboard.
     * - $can: who sees it, like addNavigationItem(). Null shows it to
     *   everyone who can open the admin.
     * - $position: cards are ordered by it, lowest first.
     */
    public function addDashboardCard(string $name, Closure $props, string|callable|null $can = null, int $position = 100): void
    {
        $this->dashboardCards[$name] = ['name' => $name, 'props' => $props, 'can' => $can, 'position' => $position];
    }

    /**
     * The dashboard cards this user may see, ordered by position.
     *
     * @return array<int, array{name: string, props: Closure, can: string|callable|null, position: int}>
     */
    public function dashboardCards(mixed $user): array
    {
        if ($user === null) {
            return [];
        }

        $cards = array_values(array_filter($this->dashboardCards, fn (array $card) => static::allows($card['can'], $user)));
        // Stable: equal positions keep registration order.
        usort($cards, fn (array $a, array $b) => $a['position'] <=> $b['position']);

        return $cards;
    }

    /**
     * Decide which pages the full-page cache (`sunrice.cache.full_page`)
     * keeps. The callback receives (Request $request, ?TemplateContext $page),
     * after the page has been rendered, and returns false to leave it out
     * of the cache (a cart, a page showing prices for the visitor). A page
     * is cached only when every callback returns true.
     */
    public function cachePageUsing(callable $decide): void
    {
        $this->pageCacheHooks[] = $decide;
    }

    /**
     * Whether every cachePageUsing() callback lets this request's page be cached.
     */
    public function shouldCachePage(Request $request): bool
    {
        $page = $request->attributes->get('sunrice.page');
        $page = $page instanceof TemplateContext ? $page : null;
        foreach ($this->pageCacheHooks as $decide) {
            if (! $decide($request, $page)) {
                return false;
            }
        }

        return true;
    }

    /** A $can of addNavigationItem() and friends: null, a permission name or a callable. */
    protected static function allows(string|callable|null $can, mixed $user): bool
    {
        return match (true) {
            $can === null => true,
            is_string($can) => (bool) $user->can($can),
            default => (bool) $can($user),
        };
    }

    /**
     * Register an existing Eloquent model for CMS management.
     *
     * @param  class-string<Resources\Resource>  $class
     */
    public function registerResource(string $class): void
    {
        $this->resources[$class::key()] = $class;
    }

    /**
     * @return array<string, class-string>
     */
    public function resources(): array
    {
        return $this->resources;
    }

    /**
     * @param  class-string|null  $key
     * @return class-string|null
     */
    public function resource(?string $key): ?string
    {
        return $key === null ? null : ($this->resources[$key] ?? null);
    }

    /**
     * Register a template selection hook. Hooks run in registration order
     * after normal template resolution; each receives
     * (string $view, TemplateContext $context) and returns a view name or null.
     */
    public function resolveTemplateUsing(callable $hook): void
    {
        $this->templateHooks[] = $hook;
    }

    /**
     * @return array<int, callable>
     */
    public function templateHooks(): array
    {
        return $this->templateHooks;
    }

    /**
     * Add a link to the admin sidebar.
     *
     * - $href: a path inside the admin ("resources/products", "reports")
     *   or an address of its own ("/reports", "https://…"), opened as a
     *   normal page.
     * - $icon: a sidebar icon name (see the docs for the list).
     * - $group: an existing group ("Content", "Structure", "Manage"…) or
     *   a new one, shown before "Manage".
     * - $can: who sees it: an ability/permission name, or a callable
     *   receiving the user and returning a bool. Null shows it to everyone
     *   who can open the admin.
     */
    public function addNavigationItem(string $label, string $href, string $icon = 'circle', string $group = 'Tools', string|callable|null $can = null): void
    {
        $this->navigationItems[] = ['label' => $label, 'href' => $href, 'icon' => $icon, 'group' => $group, 'can' => $can];
    }

    /**
     * @return array<int, array{label: string, href: string, icon: string, group: string, can: string|callable|null}>
     */
    public function navigationItems(): array
    {
        return $this->navigationItems;
    }

    /**
     * Add a tab to the Settings page, next to General and SEO, for a
     * package's own settings screen.
     *
     * - $key: a unique name ("store"); pages pass it to the SettingsTabs
     *   component as `current`.
     * - $href: a path inside the admin ("commerce/settings").
     * - $can: who sees it, like addNavigationItem(). Null shows it to
     *   everyone who can open the admin.
     */
    public function addSettingsTab(string $key, string $label, string $href, string|callable|null $can = null): void
    {
        if (in_array($key, ['general', 'seo'], true)) {
            throw new InvalidArgumentException("Settings tab \"{$key}\" is built in: use another key.");
        }
        $this->settingsTabs[$key] = ['key' => $key, 'label' => $label, 'href' => $href, 'can' => $can];
    }

    /**
     * The Settings tabs this user may open: the built-in General and SEO
     * tabs (with sunrice.settings.edit), then the registered ones.
     *
     * @return array<int, array{key: string, label: string, href: string}>
     */
    public function settingsTabs(mixed $user): array
    {
        if ($user === null) {
            return [];
        }

        $tabs = [];
        if ($user->can('sunrice.settings.edit')) {
            $tabs[] = ['key' => 'general', 'label' => 'General', 'href' => 'settings'];
            $tabs[] = ['key' => 'seo', 'label' => 'SEO', 'href' => 'settings/seo'];
        }
        foreach ($this->settingsTabs as $tab) {
            if (static::allows($tab['can'], $user)) {
                $tabs[] = ['key' => $tab['key'], 'label' => $tab['label'], 'href' => $tab['href']];
            }
        }

        return $tabs;
    }

    /**
     * Create the structure a package or starter kit needs — fieldsets,
     * blueprints, taxonomies, collections, globals, forms, draft entries
     * and menus — by handle. Safe to run again: matching items are left
     * alone, differing ones are reported and only overwritten with $force.
     * See docs/content-modeling.md § Importing structure.
     *
     * @param  array<string, mixed>  $definition
     *
     * @throws Structure\StructureImportFailed
     */
    public function importStructure(array $definition, bool $dryRun = false, bool $force = false): Structure\ImportReport
    {
        return app(Structure\StructureImporter::class)->import($definition, $dryRun, $force);
    }

    /**
     * Narrow which accounts the admin's Users screen lists, and which ones
     * user pickers offer (e.g. "move their content to"), for a package
     * whose accounts aren't staff, such as a shop's customers. The scope
     * receives the user model's query builder; it may return it or change
     * it in place. Accounts it hides can still be opened by their address.
     *
     *     Sunrice::usersQueryUsing(fn (Builder $query) => $query->whereDoesntHave(...));
     */
    public function usersQueryUsing(callable $scope): void
    {
        $this->userScopes[] = $scope;
    }

    /**
     * A query over the user model with every usersQueryUsing() scope applied.
     *
     * @return Builder<Model>
     */
    public function usersQuery(): Builder
    {
        /** @var class-string<Model> $model */
        $model = config('sunrice.auth.user_model');
        $query = $model::query();
        foreach ($this->userScopes as $scope) {
            $result = $scope($query);
            if ($result instanceof Builder) {
                $query = $result;
            }
        }

        return $query;
    }

    /**
     * Change the whole admin sidebar. Hooks run in registration order;
     * each receives (array $groups, $user) and returns the groups to use.
     * A group is ['label' => …, 'items' => [['label', 'href', 'icon'], …]].
     */
    public function navigationUsing(callable $hook): void
    {
        $this->navigationHooks[] = $hook;
    }

    /**
     * @return array<int, callable>
     */
    public function navigationHooks(): array
    {
        return $this->navigationHooks;
    }

    /**
     * Change the page's body classes. Hooks run in registration order;
     * each receives (array $classes, ?TemplateContext $page) and returns
     * the classes to use.
     */
    public function bodyClassUsing(callable $hook): void
    {
        $this->bodyClassHooks[] = $hook;
    }

    /**
     * @return array<int, callable>
     */
    public function bodyClassHooks(): array
    {
        return $this->bodyClassHooks;
    }

    /**
     * Fluent public query over a collection's published entries.
     */
    public function entries(string $collection): EntryQuery
    {
        return EntryQuery::collection($collection);
    }

    /**
     * Build a navigation menu for the active (or given) locale.
     *
     * @return Collection<int, MenuNode>
     */
    public function menu(string $handle, ?string $locale = null): Collection
    {
        return app(MenuBuilder::class)->build($handle, $locale);
    }

    /**
     * Fetch a global set's hydrated values for the active (or given) locale.
     */
    public function global(string $handle, ?string $locale = null): mixed
    {
        return app(GlobalsRepository::class)->get($handle, $locale);
    }
}
