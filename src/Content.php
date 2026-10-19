<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Sunrice\Cms\Query\EntryQuery;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Site\Page;

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

    /** Settings → Site: name(), description, title(…), hidden() … */
    public static function site(): SiteSettings
    {
        return app(SiteSettings::class);
    }
}
