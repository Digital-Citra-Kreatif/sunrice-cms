<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\Cache;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Taxonomy;
use Throwable;

/**
 * The handles of every collection, taxonomy and form, and the titles of
 * the collections and taxonomies, read on every admin page (the sidebar
 * lists them and asks Access who may see each), cached until one is
 * created, changed or deleted, and read from the cache once per request.
 *
 * @internal
 */
final class Handles
{
    private const KEY = 'sunrice-cms:handles:v2';

    /** @return list<string> */
    public static function collections(): array
    {
        return array_keys(self::all()['collections']);
    }

    /** @return list<string> */
    public static function taxonomies(): array
    {
        return array_keys(self::all()['taxonomies']);
    }

    /** @return array<string, array{title: string, listing: bool}> handle => its title, and whether it has a listing page; by title */
    public static function collectionTitles(): array
    {
        return self::all()['collections'];
    }

    /** @return array<string, string> handle => title, by title */
    public static function taxonomyTitles(): array
    {
        return self::all()['taxonomies'];
    }

    /** @return list<string> */
    public static function forms(): array
    {
        return self::all()['forms'];
    }

    public static function flush(): void
    {
        Cache::memo()->forget(self::KEY);
    }

    /** @return array{collections: array<string, array{title: string, listing: bool}>, taxonomies: array<string, string>, forms: list<string>} */
    private static function all(): array
    {
        try {
            // Memoized: read from the cache once per request (or job), however many times the sidebar and Access ask.
            return Cache::memo()->remember(self::KEY, SiteCache::ttl(), fn (): array => [
                'collections' => Collection::query()->orderBy('title')->get(['handle', 'title', 'listing_route'])
                    ->mapWithKeys(fn (Collection $c): array => [$c->handle => ['title' => $c->title, 'listing' => $c->listing_route !== null]])->all(),
                'taxonomies' => Taxonomy::query()->orderBy('title')->get(['handle', 'title'])
                    ->mapWithKeys(fn (Taxonomy $t): array => [$t->handle => $t->title])->all(),
                'forms' => self::pluck(Form::query()->pluck('handle')->all()),
            ]);
        } catch (Throwable) {
            // No database yet (a fresh install).
            return ['collections' => [], 'taxonomies' => [], 'forms' => []];
        }
    }

    /**
     * @param  array<mixed>  $handles
     * @return list<string>
     */
    private static function pluck(array $handles): array
    {
        return array_values(array_filter($handles, is_string(...)));
    }
}
