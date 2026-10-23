<?php

declare(strict_types=1);

/*
 * Short functions for templates, the same as the `Cms` alias
 * (Sunrice\Cms\Content): cms_entries('blog'), cms_menu('main'),
 * cms_global('contact'), cms_locale_urls(), cms_body_class(), cms_page(),
 * cms_nonce().
 * An app may define any of them itself first.
 */

use Sunrice\Cms\Content;
use Sunrice\Cms\Globals;
use Sunrice\Cms\Menus;
use Sunrice\Cms\Query\EntryQuery;
use Sunrice\Cms\Site\Page;
use Sunrice\Cms\Site\SiteCsp;
use Sunrice\Cms\Support\Locales;

if (! function_exists('cms_entries')) {
    /** Live entries of some collections (all when none given), in the current language: Cms::entries(). */
    function cms_entries(string ...$collections): EntryQuery
    {
        return Content::entries(...$collections);
    }
}

if (! function_exists('cms_menu')) {
    /**
     * A menu's links in the current language (or the one given): Cms::menu().
     *
     * @return list<array{label: string, url: string, new_tab: bool, active: bool, active_trail: bool, children: list<mixed>}>
     */
    function cms_menu(string $handle, ?string $locale = null): array
    {
        return app(Menus::class)->get($handle, $locale);
    }
}

if (! function_exists('cms_global')) {
    /**
     * A global set's values in the current language (or the one given): Cms::global().
     *
     * @return array<mixed>
     */
    function cms_global(string $handle, ?string $locale = null): array
    {
        return app(Globals::class)->get($handle, $locale ?? Locales::current());
    }
}

if (! function_exists('cms_locale_urls')) {
    /**
     * The page shown in each language, for a language switcher: Cms::localeUrls().
     *
     * @return array<string, string>
     */
    function cms_locale_urls(): array
    {
        return Content::localeUrls();
    }
}

if (! function_exists('cms_body_class')) {
    /**
     * Classes for the <body>, as one string: Cms::bodyClass(). The
     * `@bodyClass` directive prints the whole class="…" attribute.
     *
     * @param  list<string>|string  $extra
     */
    function cms_body_class(array|string $extra = []): string
    {
        return Content::bodyClass($extra);
    }
}

if (! function_exists('cms_page')) {
    /** The CMS page being shown, or null on the app's own pages: Cms::page(). */
    function cms_page(): ?Page
    {
        return Content::page();
    }
}

if (! function_exists('cms_nonce')) {
    /**
     * The nonce of the site's Content-Security-Policy (`site.csp`), or ''
     * while it's off or has none, for a template's inline script or style:
     * `<script nonce="{{ cms_nonce() }}">`.
     */
    function cms_nonce(): string
    {
        return SiteCsp::nonce();
    }
}
