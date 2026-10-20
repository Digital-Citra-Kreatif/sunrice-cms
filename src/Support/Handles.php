<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\Cache;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Taxonomy;
use Throwable;

/**
 * The handles of every collection, taxonomy and form, read on every admin
 * page (the sidebar asks Access whether a user may see some collection's
 * entries), cached until one is created, changed or deleted.
 *
 * @internal
 */
final class Handles
{
    private const KEY = 'sunrice-cms:handles';

    /** @return list<string> */
    public static function collections(): array
    {
        return self::all()['collections'];
    }

    /** @return list<string> */
    public static function taxonomies(): array
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
        Cache::forget(self::KEY);
    }

    /** @return array{collections: list<string>, taxonomies: list<string>, forms: list<string>} */
    private static function all(): array
    {
        try {
            return Cache::remember(self::KEY, SiteCache::ttl(), fn (): array => [
                'collections' => self::pluck(Collection::query()->pluck('handle')->all()),
                'taxonomies' => self::pluck(Taxonomy::query()->pluck('handle')->all()),
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
