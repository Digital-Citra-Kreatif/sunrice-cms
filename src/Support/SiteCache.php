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
 * content version. Every change to what the site shows bumps the version
 * (and fires ContentChanged), so everything cached before is never read
 * again, on any cache store, without tags. Only plain values are cached,
 * never models.
 *
 *     app(SiteCache::class)->remember('shop:featured', fn () => $ids);
 *
 * Config `sunrice-cms.cache`: `enabled`, `store` (null: the default)
 * and `ttl` (seconds).
 *
 * @api
 */
final class SiteCache
{
    private const VERSION = 'sunrice-cms:content-version';

    private ?int $version = null;

    public static function enabled(): bool
    {
        return filter_var(config('sunrice-cms.cache.enabled', true), FILTER_VALIDATE_BOOL);
    }

    /**
     * The value under a key in this content version, made by `$make` when
     * it isn't cached yet (or caching is off), kept for `$ttl` seconds
     * (null: config `ttl`).
     *
     * @template T
     *
     * @param  Closure(): T  $make
     * @return T
     */
    public function remember(string $key, Closure $make, ?int $ttl = null): mixed
    {
        if (! self::enabled()) {
            return $make();
        }

        return $this->store()->remember($this->key($key), $ttl ?? self::ttl(), $make);
    }

    /** The full cache key of `$key` in this content version. */
    public function key(string $key): string
    {
        return 'sunrice-cms:'.$this->version().':'.$key;
    }

    public function version(): int
    {
        if ($this->version === null) {
            $version = $this->store()->get(self::VERSION);
            $this->version = is_numeric($version) ? (int) $version : 1;
        }

        return $this->version;
    }

    /**
     * Something the site shows changed: a new version, and ContentChanged,
     * once the database transaction it's in commits (before that, other
     * requests would cache the old content under the new version).
     */
    public function changed(string $what): void
    {
        DB::afterCommit(function () use ($what): void {
            if (self::enabled()) {
                $store = $this->store();
                $store->add(self::VERSION, 1);
                $next = $store->increment(self::VERSION);
                $this->version = is_int($next) ? $next : null;
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
