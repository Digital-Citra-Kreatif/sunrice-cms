<?php

declare(strict_types=1);

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests;
use Spatie\ResponseCache\Facades\ResponseCache;
use Spatie\ResponseCache\Middlewares\CacheResponse;
use Spatie\ResponseCache\ResponseCacheServiceProvider;
use Sunrice\Cache\FullPageCacheProfile;
use Sunrice\Facades\Sunrice;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Frontend\TemplateContext;

use function Pest\Laravel\get;

$responseCacheMissing = ! class_exists(CacheAllSuccessfulGetRequests::class);

beforeEach(function () {
    RouteMatcher::flush();
    $this->pages = createCollection('pages', ['route' => '/{slug}', 'template' => 'sunrice::defaults.show']);
    createEntry($this->pages, 'About');
    createEntry($this->pages, 'Cart');
    // The shop's cart differs per visitor: keep it out of the full-page cache.
    Sunrice::cachePageUsing(fn (Request $request, ?TemplateContext $page) => $page?->entry?->translations->first()?->slug !== 'cart');
});

it('asks every hook with the rendered page', function () {
    $seen = [];
    Sunrice::cachePageUsing(function (Request $request, ?TemplateContext $page) use (&$seen) {
        $seen[] = [$request->path(), $page?->pageType];

        return true;
    });

    get('/about')->assertOk();
    expect(Sunrice::shouldCachePage(request()))->toBeTrue();
    get('/cart')->assertOk();
    expect(Sunrice::shouldCachePage(request()))->toBeFalse();

    // Outside a Sunrice page there is no page context.
    expect(Sunrice::shouldCachePage(Request::create('/elsewhere')))->toBeTrue()
        ->and($seen)->toBe([['about', 'entry'], ['elsewhere', null]]);
});

it('caches only what the default profile and every hook allow', function () {
    $profile = new FullPageCacheProfile;

    get('/about')->assertOk();
    expect($profile->shouldCacheResponse(new Response('ok', 200, ['Content-Type' => 'text/html'])))->toBeTrue()
        ->and($profile->shouldCacheResponse(new Response('no', 500, ['Content-Type' => 'text/html'])))->toBeFalse();

    get('/cart')->assertOk();
    expect($profile->shouldCacheResponse(new Response('ok', 200, ['Content-Type' => 'text/html'])))->toBeFalse();
})->skip($responseCacheMissing, 'spatie/laravel-responsecache is not installed');

it('becomes the cache profile unless the site set its own', function () {
    config(['responsecache.cache_profile' => CacheAllSuccessfulGetRequests::class]);
    FullPageCacheProfile::useUnlessConfigured();
    expect(config('responsecache.cache_profile'))->toBe(FullPageCacheProfile::class);

    config(['responsecache.cache_profile' => 'App\\Cache\\MyProfile']);
    FullPageCacheProfile::useUnlessConfigured();
    expect(config('responsecache.cache_profile'))->toBe('App\\Cache\\MyProfile');
})->skip($responseCacheMissing, 'spatie/laravel-responsecache is not installed');

it('leaves pages a hook refuses out of the full-page cache', function () {
    app()->register(ResponseCacheServiceProvider::class);
    config(['sunrice.cache.full_page' => true, 'responsecache.enabled' => true, 'responsecache.cache.store' => 'array']);
    FullPageCacheProfile::useUnlessConfigured();
    // What the service provider adds to the frontend routes when full_page is on at boot.
    app(Kernel::class)->appendMiddlewareToGroup('web', CacheResponse::class);

    get('/about')->assertOk();
    get('/cart')->assertOk();

    expect(ResponseCache::hasBeenCached(Request::create('/about')))->toBeTrue()
        ->and(ResponseCache::hasBeenCached(Request::create('/cart')))->toBeFalse();
})->skip($responseCacheMissing, 'spatie/laravel-responsecache is not installed');
