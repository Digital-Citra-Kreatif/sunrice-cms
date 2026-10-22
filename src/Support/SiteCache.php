<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Closure;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Sunrice\Cms\Events\ContentChanged;
use Sunrice\Cms\Settings\CacheSettings;

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
 * and `ttl` (seconds; Settings → Cache can set it in minutes).
 *
 * Within a request (it's scoped) a value is read from the store once,
 * and what nearly every page reads (the language routes, blueprints,
 * fieldsets and global sets) comes in one read with the first: few round trips on a
 * database or Redis store.
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

    /** What nearly every page reads, by area: read together, once, before the first. */
    private const EVERY_PAGE = [self::ROUTES => ['language-routes'], self::PAGES => ['records:blueprints', 'records:fieldsets', 'records:global-sets', 'records:global-values']];

    /** Values kept in memory at most (a preload run renders many pages in one process). */
    private const KEPT = 500;

    /** @var array<string, int>|null */
    private ?array $versions = null;

    /** @var array<string, mixed> this request's values by full key */
    private array $read = [];

    private bool $preloaded = false;

    public static function enabled(): bool
    {
        return filter_var(config('sunrice-cms.cache.enabled', true), FILTER_VALIDATE_BOOL);
    }

    /**
     * The value under a key in an area's content version, made by `$make`
     * when it isn't cached yet (or caching is off), kept for `$ttl` seconds
     * (null: config `ttl`).
     *
     * @template T
     *
     * @param  Closure(): T  $make
     * @return T
     */
    public function remember(string $key, Closure $make, string $area = self::PAGES, ?int $ttl = null): mixed
    {
        if (! self::enabled()) {
            return $make();
        }

        if (! $this->preloaded) {
            $this->preload();
        }
        $full = $this->key($key, $area);
        if (array_key_exists($full, $this->read)) {
            return $this->read[$full];
        }
        if (count($this->read) >= self::KEPT) {
            $this->read = [];
        }

        return $this->read[$full] = $this->store()->remember($full, $ttl ?? self::ttl(), $make);
    }

    /** Reads what nearly every page needs in one go (what isn't cached yet is made when asked). */
    private function preload(): void
    {
        $this->preloaded = true;
        $keys = [];
        foreach (self::EVERY_PAGE as $area => $names) {
            foreach ($names as $name) {
                $keys[] = $this->key($name, $area);
            }
        }
        foreach ($this->store()->many($keys) as $full => $value) {
            if (is_string($full) && $value !== null) {
                $this->read[$full] = $value;
            }
        }
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
                $this->read = [];
                $this->preloaded = false;
            }
            ContentChanged::dispatch($what);
        });
    }

    /** Seconds anything is kept at most: Settings → Cache's minutes, else config `ttl`. */
    public static function ttl(): int
    {
        return app(CacheSettings::class)->siteTtl();
    }

    public function store(): Repository
    {
        $store = config('sunrice-cms.cache.store');

        return Cache::store(is_string($store) && $store !== '' ? $store : null);
    }
}
