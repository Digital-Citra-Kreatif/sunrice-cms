<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Cache;

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Str;
use Spatie\ResponseCache\Middlewares\CacheResponse;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Admin\Resources\Tables\ActionFailed;
use Sunrice\Cms\Jobs\PreloadPages;
use Sunrice\Cms\Settings\CacheSettings;
use Sunrice\Cms\Site\PageCache;
use Sunrice\Cms\Site\Sitemap;
use Sunrice\Cms\Support\SiteCache;
use Throwable;

/**
 * Preloads the whole-page cache (Settings → Cache → Preload cache,
 * `php artisan sunrice:cache-preload`, after clearing or content changes
 * when Settings → Cache says so): the sitemap's pages (every language,
 * listing pages' first page, term pages, the homepage), but those Settings
 * → Cache leaves out, are requested one by one through the app as a
 * visitor who isn't signed in, on APP_URL, so each is kept.
 *
 * It runs in queued jobs (PreloadPages) of `sunrice-cms.cache.preload.batch`
 * pages, one after the other, with `preload.delay` milliseconds between
 * pages, so it never holds up a request or floods the server; on the
 * `sync` queue it runs after the response. One preload at a time: a
 * second is refused while one runs. Authorize first (cms.settings.cache).
 *
 * @api
 */
final class PreloadCache
{
    /** @internal The run under way (the lock), in the site cache's store. */
    public const LOCK = 'sunrice-cms:preload:running';

    /** @internal The last preload's progress. */
    public const STATUS = 'sunrice-cms:preload:status';

    /** @internal One batch of a run's addresses: STATUS.":{run}:{n}". */
    public const BATCH = 'sunrice-cms:preload:batch:';

    /** @internal A preload waiting to start after content changes. */
    private const SOON = 'sunrice-cms:preload:soon';

    /** Seconds a run holds the lock without progress before another may start. */
    private const LOCK_SECONDS = 7200;

    public function __construct(private SiteCache $cache, private ActivityLog $activity) {}

    /**
     * Starts preloading (queued, or here and now with `$now`) and returns
     * how many pages it will request.
     *
     * @param  int|null  $limit  at most this many pages
     * @param  string|null  $locale  only this language's pages
     * @param  int  $delay  seconds before it starts (queued only)
     *
     * @throws ActionFailed when whole pages aren't kept, or a preload is running
     */
    public function handle(?int $limit = null, ?string $locale = null, bool $now = false, bool $log = true, int $delay = 0): int
    {
        if (! PageCache::enabled()) {
            throw new ActionFailed(self::said('The whole-page cache is off: there\'s nothing to preload.'));
        }
        $store = $this->cache->store();
        $run = (string) Str::uuid();
        if (! $store->add(self::LOCK, $run, self::LOCK_SECONDS)) {
            throw new ActionFailed(self::said('A preload is running already.'));
        }

        $settings = app(CacheSettings::class);
        $batch = self::batchSize();
        $pages = [];
        $count = 0;
        $batches = 0;
        foreach (app(Sitemap::class)->pages($locale) as $page) {
            $path = parse_url($page['url'], PHP_URL_PATH);
            if ($settings->excludesCollection($page['collection']) || $settings->excludesPath(is_string($path) ? $path : '/')) {
                continue;
            }
            $pages[] = $page['url'];
            $count++;
            if (count($pages) === $batch) {
                $store->put(self::BATCH."{$run}:{$batches}", $pages, self::LOCK_SECONDS);
                $batches++;
                $pages = [];
            }
            if ($limit !== null && $count >= $limit) {
                break;
            }
        }
        if ($pages !== []) {
            $store->put(self::BATCH."{$run}:{$batches}", $pages, self::LOCK_SECONDS);
            $batches++;
        }
        $user = auth()->user();
        $name = $user === null ? null : data_get($user, 'name');
        $store->forever(self::STATUS, ['run' => $run, 'started_at' => now()->getTimestamp(), 'finished_at' => null, 'total' => $count,
            'warmed' => 0, 'failed' => 0, 'by' => is_string($name) ? $name : null, 'stopped' => null]);
        if ($log) {
            $this->activity->record('preloaded', 'cache', 'preload', 'the page cache', ['pages' => $count] + ($locale === null ? [] : ['locale' => $locale]));
        }

        if ($batches === 0) {
            self::finish($run);
        } elseif ($now) {
            (new PreloadPages($run, 0, $batches, inline: true))->handle();
        } elseif (config('queue.default') === 'sync') {
            dispatch(new PreloadPages($run, 0, $batches, inline: true))->afterResponse();
        } else {
            dispatch(new PreloadPages($run, 0, $batches))->delay($delay);
        }

        return $count;
    }

    /**
     * After content changed, when Settings → Cache preloads then: a
     * preload a minute later (several changes in that minute start one),
     * unless one is running.
     */
    public function soon(): void
    {
        if (! PageCache::enabled() || $this->running() || ! $this->cache->store()->add(self::SOON, 1, 60)) {
            return;
        }
        try {
            $this->handle(log: false, delay: 60);
        } catch (ActionFailed) {
            // Started meanwhile.
        }
    }

    public function running(): bool
    {
        return $this->cache->store()->get(self::LOCK) !== null;
    }

    /**
     * The last preload: when it started and finished (timestamps), how
     * many pages it was to request, how many were kept and failed, who
     * started it, and why it stopped early, if it did.
     *
     * @return array{run: string, started_at: int, finished_at: int|null, total: int, warmed: int, failed: int, by: string|null, stopped: string|null}|null
     */
    public function status(): ?array
    {
        $status = $this->cache->store()->get(self::STATUS);
        if (! is_array($status) || ! is_string($status['run'] ?? null)) {
            return null;
        }
        $int = fn (string $key): int => is_int($status[$key] ?? null) ? $status[$key] : 0;

        return ['run' => $status['run'], 'started_at' => $int('started_at'), 'finished_at' => is_int($status['finished_at'] ?? null) ? $status['finished_at'] : null,
            'total' => $int('total'), 'warmed' => $int('warmed'), 'failed' => $int('failed'),
            'by' => is_string($status['by'] ?? null) ? $status['by'] : null, 'stopped' => is_string($status['stopped'] ?? null) ? $status['stopped'] : null];
    }

    /**
     * Requests one address through the app, as a visitor who isn't signed
     * in and without a session of their own, so the page cache keeps it;
     * true when it answered 200.
     *
     * @internal
     */
    public static function warm(string $url): bool
    {
        $previous = app()->bound('request') ? app('request') : null;
        $session = config('session.driver');
        $locale = app()->getLocale();
        // A session per page would fill the sessions table; a guest sees the pages visitors see.
        config(['session.driver' => 'array']);
        app('auth')->forgetGuards();
        try {
            $request = Request::create($url, 'GET', server: ['REMOTE_ADDR' => '127.0.0.1', 'HTTP_USER_AGENT' => 'Sunrice cache preload']);
            $response = app(Kernel::class)->handle($request);
            // responsecache keeps the page when the request terminates; only its own part of terminating.
            if (class_exists(CacheResponse::class)) {
                app(CacheResponse::class)->terminate($request, $response);
            }

            return $response->getStatusCode() === 200;
        } catch (Throwable) {
            return false;
        } finally {
            config(['session.driver' => $session]);
            // The page set its language: back to the one before.
            app()->setLocale($locale);
            app('auth')->forgetGuards();
            if ($previous instanceof Request) {
                app()->instance('request', $previous);
                Facade::clearResolvedInstance('request');
            }
        }
    }

    /**
     * Adds a batch's results to the status, and keeps the lock.
     *
     * @internal
     */
    public static function progress(string $run, int $warmed, int $failed): void
    {
        $store = app(SiteCache::class)->store();
        $status = $store->get(self::STATUS);
        if (is_array($status) && ($status['run'] ?? null) === $run) {
            $status['warmed'] = (is_int($status['warmed'] ?? null) ? $status['warmed'] : 0) + $warmed;
            $status['failed'] = (is_int($status['failed'] ?? null) ? $status['failed'] : 0) + $failed;
            $store->forever(self::STATUS, $status);
        }
        $store->put(self::LOCK, $run, self::LOCK_SECONDS);
    }

    /**
     * The run is over (or stopped, saying why): its status gets its end,
     * and the lock goes.
     *
     * @internal
     */
    public static function finish(string $run, ?string $stopped = null): void
    {
        $store = app(SiteCache::class)->store();
        $status = $store->get(self::STATUS);
        if (is_array($status) && ($status['run'] ?? null) === $run) {
            $store->forever(self::STATUS, ['finished_at' => Carbon::now()->getTimestamp(), 'stopped' => $stopped] + $status);
        }
        if ($store->get(self::LOCK) === $run) {
            $store->forget(self::LOCK);
        }
    }

    /** Pages per queued job (`sunrice-cms.cache.preload.batch`). */
    public static function batchSize(): int
    {
        $batch = config('sunrice-cms.cache.preload.batch', 25);

        return is_numeric($batch) ? max(1, min(500, (int) $batch)) : 25;
    }

    /** Milliseconds between two pages (`sunrice-cms.cache.preload.delay`). */
    public static function delay(): int
    {
        $delay = config('sunrice-cms.cache.preload.delay', 100);

        return is_numeric($delay) ? max(0, min(10000, (int) $delay)) : 100;
    }

    private static function said(string $text): string
    {
        $said = __($text);

        return is_string($said) ? $said : $text;
    }
}
