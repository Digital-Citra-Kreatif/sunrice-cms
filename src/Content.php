<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Admin\EntryLinks;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Query\EntryQuery;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Site\Page;
use Sunrice\Cms\Site\SiteHooks;
use Sunrice\Cms\Support\ContentData;

/**
 * The CMS for templates, also as the `Cms` alias when the app doesn't use
 * that name. In a Blade view:
 *
 *     Cms::entries('articles')->latest()->limit(3)->get()  // live articles
 *     $article->url(), $article->title
 *     Cms::global('contact')['phone']
 *     Cms::menu('main')  // [['label' => …, 'url' => …, 'new_tab' => …, 'children' => […]], …]
 *     <body class="{{ Cms::bodyClass('dark') }}">
 *
 *     <nav>@foreach (Cms::localeUrls() as $locale => $url) … @endforeach</nav>
 *     Cms::site()->name()
 *     Cms::toData(Cms::entries('places')->get(), ['location'])  // plain arrays for a script
 *
 * The same as functions: cms_entries(), cms_menu(), cms_global(),
 * cms_locale_urls(), cms_body_class(), cms_page(); and `<body @bodyClass>`.
 * In a service provider's boot(), hooks for every page:
 *
 *     Cms::resolveTemplateUsing(fn (Page $page): ?string => $page->collection?->handle === 'shop' ? 'shop.product' : null);
 *     Cms::bodyClassUsing(fn (Page $page): array => $page->home ? ['landing'] : []);
 *
 * @phpstan-import-type EntryData from EntryTranslation
 * @phpstan-import-type TermData from Term
 * @phpstan-import-type MediaData from Media
 *
 * @api
 */
final class Content
{
    /** Live entries of some collections (all when none given), in the current language. */
    public static function entries(string ...$collections): EntryQuery
    {
        return new EntryQuery(array_values($collections));
    }

    /**
     * A menu's links in the current language: label, url, new_tab, children.
     *
     * @return list<array{label: string, url: string, new_tab: bool, children: list<mixed>}>
     */
    public static function menu(string $handle): array
    {
        return app(Menus::class)->get($handle);
    }

    /**
     * A global set's values in the current language.
     *
     * @return array<mixed>
     */
    public static function global(string $handle): array
    {
        return app(Globals::class)->get($handle, Support\Locales::current());
    }

    /** The CMS page being shown (entry, listing or term page), or null on the app's own pages. */
    public static function page(): ?Page
    {
        return Page::current();
    }

    /**
     * Classes for the <body>: the kind of page, its collection, entry or
     * term, template and language (see Page::classes()), plus `$extra`.
     *
     * @param  list<string>|string  $extra
     */
    public static function bodyClass(array|string $extra = []): string
    {
        $extra = is_string($extra) ? array_values(array_filter(preg_split('/\s+/', $extra) ?: [])) : $extra;
        $page = Page::current();

        return implode(' ', $page !== null ? $page->classes($extra) : Page::classesOutside($extra));
    }

    /**
     * The page shown in each language it's on, for a language switcher:
     * locale => URL (none on the app's own pages).
     *
     * @return array<string, string>
     */
    public static function localeUrls(): array
    {
        return Page::current()?->localeUrls() ?? [];
    }

    /**
     * Choose the view of the CMS's pages (entries, listings, term and
     * search pages): the hook gets the page with the view chosen so far
     * (`$page->view`) and returns another view's name, or null to keep it.
     * Hooks run in the order registered.
     *
     * @param  Closure(Page): ?string  $hook
     */
    public static function resolveTemplateUsing(Closure $hook): void
    {
        app(SiteHooks::class)->resolveTemplateUsing($hook);
    }

    /**
     * Add classes to the <body> of the CMS's pages (Cms::bodyClass(),
     * `@bodyClass`): the hook gets the page and returns a list of classes.
     *
     * @param  Closure(Page): list<string>  $hook
     */
    public static function bodyClassUsing(Closure $hook): void
    {
        app(SiteHooks::class)->bodyClassUsing($hook);
    }

    /**
     * Add links to the ⋮ menu of an entry's page in the panel, for a
     * plugin's own screen about that entry: the hook gets the entry in the
     * language being edited and who is looking, and returns the links they
     * may follow, each a `label` and an `href` (a path or an http(s)
     * address; anything else is left out). Hooks run in the order
     * registered, each time the page is opened.
     *
     *     Cms::entryLinksUsing(fn (EntryTranslation $entry, Authorizable $user): array =>
     *         $user->can('shop.products.view') ? [['label' => 'Sales', 'href' => '/admin/shop/sales?entry='.$entry->entry_id]] : []);
     *
     * @param  Closure(EntryTranslation, Authorizable): iterable<array{label: string, href: string}>  $hook
     */
    public static function entryLinksUsing(Closure $hook): void
    {
        app(EntryLinks::class)->add($hook);
    }

    /** Settings → Site: name(), description, title(…), hidden() … */
    public static function site(): SiteSettings
    {
        return app(SiteSettings::class);
    }

    /**
     * Plain arrays of entries, terms or media, for a script on a page (a
     * map, a gallery, "load more") or a small JSON route of the app's: each
     * one's toData(), entries with the fields named in `$fields`. A list
     * (an Eloquent or Laravel collection, an array) gives a list; a
     * paginator (`->paginate()`, a listing page's `$entries`) gives
     * `['data' => [...], 'meta' => [current_page, last_page, per_page,
     * total, next_url, prev_url]]`. Anything else in it is left out.
     *
     *     <script type="application/json" id="pins">@json(Cms::toData(Cms::entries('places')->get(), ['location']))</script>
     *
     * @param  iterable<mixed>|LengthAwarePaginator<array-key, mixed>  $items
     * @param  list<string>  $fields
     * @return ($items is LengthAwarePaginator<array-key, mixed> ? array{data: list<EntryData|TermData|MediaData>, meta: array{current_page: int, last_page: int, per_page: int, total: int, next_url: string|null, prev_url: string|null}} : list<EntryData|TermData|MediaData>)
     */
    public static function toData(iterable|LengthAwarePaginator $items, array $fields = []): array
    {
        return $items instanceof LengthAwarePaginator ? ContentData::page($items, $fields) : ContentData::list($items, $fields);
    }
}
