<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Cache;

use Illuminate\Support\Facades\Log;
use Spatie\ResponseCache\ResponseCache;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Support\SiteCache;
use Throwable;

/**
 * Clears the site's caches (Settings → Cache → Clear page cache / Clear
 * all site caches), and records who did it in the activity log:
 *
 * - PAGES: a new version of the `pages` area, so no page kept before is
 *   served again, on any store.
 * - ALL: a new version of every area: pages, addresses, menus, the
 *   sitemap and everything kept with SiteCache.
 *
 * Kept pages are also removed from spatie/laravel-responsecache's store
 * when it holds nothing else (a store of its own, or a cache tag): a
 * shared store isn't flushed, and the pages left in it expire.
 * Authorize first (cms.settings.cache).
 *
 * @api
 */
final class ClearCache
{
    public const PAGES = 'pages';

    public const ALL = 'all';

    public function __construct(private SiteCache $cache, private ActivityLog $activity) {}

    /** @param self::PAGES|self::ALL $what */
    public function handle(string $what = self::ALL): void
    {
        $what = $what === self::PAGES ? self::PAGES : self::ALL;
        $this->cache->changed('cache cleared', ...($what === self::PAGES ? [SiteCache::PAGES] : []));
        if (self::ownPageStore()) {
            try {
                app(ResponseCache::class)->clear();
            } catch (Throwable $e) {
                // The new version already hides every kept page.
                Log::warning('Sunrice: could not clear the page cache\'s store: '.$e->getMessage());
            }
        }
        $this->activity->record('cleared', 'cache', $what, $what === self::PAGES ? 'the page cache' : 'all site caches', ['areas' => $what === self::PAGES ? [SiteCache::PAGES] : SiteCache::AREAS]);
    }

    /**
     * Whether responsecache's store holds only kept pages: it has a tag of
     * its own, or a store that isn't the app's default nor the site's.
     */
    public static function ownPageStore(): bool
    {
        if (! class_exists(ResponseCache::class)) {
            return false;
        }
        $tag = config('responsecache.cache.tag');
        if (is_string($tag) && $tag !== '') {
            return true;
        }
        $default = config('cache.default');
        $name = fn (mixed $store): mixed => is_string($store) && $store !== '' ? $store : $default;

        return ! in_array($name(config('responsecache.cache.store')), [$default, $name(config('sunrice-cms.cache.store')), config('cache.limiter')], true);
    }
}
