<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Request;
use Spatie\ResponseCache\Hasher\DefaultHasher;

/**
 * What tells kept pages apart (see PageCache): the host, the path, the
 * language and only the query parameters the site reads (`page`, `q` and
 * config `sunrice-cms.cache.query`), so `?utm_source=…` or `?x=<random>`
 * can't fill the cache store with copies of one page. The CMS sets it as
 * `responsecache.hasher` unless the app set its own.
 *
 * @api
 */
class PageCacheHasher extends DefaultHasher
{
    /** Always kept: listing pages and search results read them. */
    public const QUERY = ['page', 'q'];

    public function getHashFor(Request $request): string
    {
        return hash('xxh128', parent::getHashFor($request).'-'.app()->getLocale());
    }

    /** @return list<string> */
    public static function query(): array
    {
        $extra = config('sunrice-cms.cache.query', []);
        $extra = is_array($extra) ? array_values(array_filter($extra, fn (mixed $name): bool => is_string($name) && $name !== '')) : [];

        return array_values(array_unique([...self::QUERY, ...$extra]));
    }

    protected function getNormalizedQueryString(Request $request): string
    {
        $kept = [];
        foreach (self::query() as $name) {
            $value = $request->query($name);
            if ($value !== null) {
                $kept[$name] = $value;
            }
        }
        ksort($kept);

        return http_build_query($kept);
    }
}
