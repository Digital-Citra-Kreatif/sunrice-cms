<?php

declare(strict_types=1);

namespace Sunrice\Cache;

use Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests;
use Sunrice\Sunrice;
use Symfony\Component\HttpFoundation\Response;

/**
 * The full-page cache's profile (`sunrice.cache.full_page`, with
 * spatie/laravel-responsecache): the package's default rules, then every
 * Sunrice::cachePageUsing() callback. Decided after the response, when
 * the controller has set the page (request attribute `sunrice.page`).
 *
 * Used unless the site sets its own `responsecache.cache_profile`.
 */
class FullPageCacheProfile extends CacheAllSuccessfulGetRequests
{
    /** Make this the response cache's profile, unless the site configured one of its own. */
    public static function useUnlessConfigured(): void
    {
        $profile = config('responsecache.cache_profile');
        if ($profile === null || $profile === CacheAllSuccessfulGetRequests::class) {
            config(['responsecache.cache_profile' => static::class]);
        }
    }

    public function shouldCacheResponse(Response $response): bool
    {
        return parent::shouldCacheResponse($response) && app(Sunrice::class)->shouldCachePage(request());
    }
}
