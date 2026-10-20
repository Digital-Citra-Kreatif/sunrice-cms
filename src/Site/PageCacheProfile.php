<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Request;
use Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests;
use Sunrice\Cms\Support\SiteCache;
use Symfony\Component\HttpFoundation\Response;

/**
 * responsecache's cache profile for the site's pages (see PageCache): the
 * CMS sets it as `responsecache.cache_profile` unless the app set its own
 * (then extend this one). Pages are kept under the content version, so a
 * change shows at once without clearing the cache, for `cache.ttl` at most.
 *
 * @api
 */
class PageCacheProfile extends CacheAllSuccessfulGetRequests
{
    public function enabled(Request $request): bool
    {
        return parent::enabled($request) && app(PageCache::class)->forVisitor($request);
    }

    public function shouldCacheResponse(Response $response): bool
    {
        return $response->getStatusCode() === 200 && parent::shouldCacheResponse($response)
            && app(PageCache::class)->keeps(request(), Page::current());
    }

    public function cacheLifetimeInSeconds(Request $request): int
    {
        $lifetime = min(parent::cacheLifetimeInSeconds($request), SiteCache::ttl());
        $own = app(PageCache::class)->lifetime($request, Page::current());

        return $own === null ? $lifetime : min($lifetime, $own);
    }

    /** The pages' content version: pages kept before a change are never served again. */
    public function useCacheNameSuffix(Request $request): string
    {
        return 'v'.app(SiteCache::class)->version(SiteCache::PAGES);
    }
}
