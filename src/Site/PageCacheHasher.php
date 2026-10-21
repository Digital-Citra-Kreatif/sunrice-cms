<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Request;
use Spatie\ResponseCache\Hasher\DefaultHasher;

/**
 * What tells kept pages apart (see PageCache): the host, the path, the
 * language and only the query parameters the site reads (a `page` number
 * above 1, config `sunrice-cms.cache.query` and those in Settings →
 * Cache), so `?utm_source=…`,
 * `?x=<random>` or `?page=abc` can't fill the cache store with copies of
 * one page. (`?q=` and `?reply_to=` pages are never kept: see
 * PageCache::UNKEPT_QUERY.) The CMS sets it as `responsecache.hasher`
 * unless the app set its own. The parameters themselves are
 * PageCacheQuery's (usable without spatie/laravel-responsecache).
 *
 * @api
 */
class PageCacheHasher extends DefaultHasher
{
    /** Always kept: paginated pages read it. */
    public const QUERY = PageCacheQuery::QUERY;

    public function getHashFor(Request $request): string
    {
        return hash('xxh128', parent::getHashFor($request).'-'.app()->getLocale());
    }

    /** @return list<string> see PageCacheQuery::query() */
    public static function query(): array
    {
        return PageCacheQuery::query();
    }

    /** @return list<string> see PageCacheQuery::configuredQuery() */
    public static function configuredQuery(): array
    {
        return PageCacheQuery::configuredQuery();
    }

    /** See PageCacheQuery::pageNumber(). */
    public static function pageNumber(Request $request): ?int
    {
        return PageCacheQuery::pageNumber($request);
    }

    protected function getNormalizedQueryString(Request $request): string
    {
        $kept = [];
        foreach (PageCacheQuery::query() as $name) {
            $value = $name === 'page' ? PageCacheQuery::pageNumber($request) : $request->query($name);
            // An empty one (?sort=, as a form sends a blank choice) is the page without it.
            if (PageCacheQuery::given($value)) {
                $kept[$name] = $value;
            }
        }
        ksort($kept);

        return http_build_query($kept);
    }
}
