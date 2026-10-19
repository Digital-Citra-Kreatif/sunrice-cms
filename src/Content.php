<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Sunrice\Cms\Query\EntryQuery;

/**
 * The CMS for templates, also as the `Cms` alias when the app doesn't use
 * that name. In a Blade view:
 *
 *     Cms::entries('articles')->latest()->limit(3)->get()  // live articles
 *     $article->url(), $article->title
 *     Cms::global('contact')['phone']
 *     Cms::menu('main')  // [['label' => …, 'url' => …, 'new_tab' => …, 'children' => […]], …]
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
}
