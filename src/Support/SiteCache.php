<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Closure;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Sunrice\Cms\Events\ContentChanged;

/**
 * What the site reads often (which page is at a path, menus, the
 * sitemap, whole pages with `sunrice-cms.cache.pages`), cached under a
 * content version per area. A change bumps the versions of the areas it
 * affects (and fires ContentChanged), so everything cached before in
 * them is never read again, on any cache store, without tags. Only plain
 * values are cached, never models.
 *
 * The areas: `pages` (whole pages and what templates render: every
 * change bumps it), `routes` (which page is at a path, URL patterns,
 * listing routes), `menus` and `sitemap`.
 *
 *     app(SiteCache::class)->remember('shop:featured', fn () => $ids);           // gone with the next change
 *     app(SiteCache::class)->remember('shop:paths', fn () => $paths, SiteCache::ROUTES);
 *     app(SiteCache::class)->changed('shop products', SiteCache::PAGES);        // or no areas: all of them
 *
 * Config `sunrice-cms.cache`: `enabled`, `store` (null: the default)
 * and `ttl` (seconds).
 *
 * @api
 */
final class SiteCache
{
    public const PAGES = 'pages';

    public const ROUTES = 'routes';

    public const MENUS = 'menus';

    public const SITEMAP = 'sitemap';

    /** @var list<string> */
    public const AREAS = [self::PAGES, self::ROUTES, self::MENUS, self::SITEMAP];

    private const VERSION = 'sunrice-cms:content-version:';

    /** @var array<string, int>|null */
    private ?array $versions = null;

    public static function enabled(): bool
    {
        return filter_var(config('sunrice-cms.cache.enabled', true), FILTER_VALIDATE_BOOL);
    }

    /**
     * The value under a key in an area's content version, made by `$make`
     * when it isn't cached yet (or caching is off).
     *
     * @template T
     *
     * @param  Closure(): T  $make
     * @return T
     */
    public function remember(string $key, Closure $make, string $area = self::PAGES): mixed
    {
        if (! self::enabled()) {
            return $make();
        }

        return $this->store()->remember($this->key($key, $area), self::ttl(), $make);
    }

    /** The full cache key of `$key` in an area's content version. */
    public function key(string $key, string $area = self::PAGES): string
    {
        return 'sunrice-cms:'.$area.':'.$this->version($area).':'.$key;
    }

    public function version(string $area = self::PAGES): int
    {
        if ($this->versions === null) {
            $this->versions = [];
            $found = $this->store()->many(array_map(fn (string $area): string => self::VERSION.$area, self::AREAS));
            foreach (self::AREAS as $known) {
                $version = $found[self::VERSION.$known] ?? null;
                $this->versions[$known] = is_numeric($version) ? (int) $version : 1;
            }
        }

        return $this->versions[$area] ?? 1;
    }

    /**
     * Something the site shows changed: a new version of the areas named
     * (none: all of them), and ContentChanged, once the database
     * transaction it's in commits (before that, other requests would cache
     * the old content under the new version).
     */
    public function changed(string $what, string ...$areas): void
    {
        $areas = $areas === [] ? self::AREAS : array_values(array_intersect(self::AREAS, $areas));
        DB::afterCommit(function () use ($what, $areas): void {
            if (self::enabled()) {
                $store = $this->store();
                foreach ($areas as $area) {
                    $store->add(self::VERSION.$area, 1);
                    $store->increment(self::VERSION.$area);
                }
                // Read again when next asked.
                $this->versions = null;
            }
            ContentChanged::dispatch($what);
        });
    }

    public static function ttl(): int
    {
        $ttl = config('sunrice-cms.cache.ttl', 3600);

        return is_numeric($ttl) ? max(1, (int) $ttl) : 3600;
    }

    public function store(): Repository
    {
        $store = config('sunrice-cms.cache.store');

        return Cache::store(is_string($store) && $store !== '' ? $store : null);
    }
}
