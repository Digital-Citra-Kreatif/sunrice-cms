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
     * A global set's values in the current language.
     *
     * @return array<mixed>
     */
    public static function global(string $handle): array
    {
        return app(Globals::class)->get($handle, Support\Locales::current());
    }
}
