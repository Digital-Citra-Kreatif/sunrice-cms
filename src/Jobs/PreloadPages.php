<?php

declare(strict_types=1);

namespace Sunrice\Cms\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Sunrice\Cms\Actions\Cache\PreloadCache;
use Sunrice\Cms\Site\PageCache;
use Sunrice\Cms\Support\SiteCache;

/**
 * One batch of a preload (see PreloadCache): requests its pages one by
 * one, then queues the next batch, so only one runs at a time. Inline
 * (the command's --now, the sync queue) it does every batch itself. It
 * stops when the run was replaced, or whole pages stopped being kept.
 *
 * @internal
 */
final class PreloadPages implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    public int $tries = 1;

    public function __construct(public string $run, public int $batch, public int $batches, public bool $inline = false) {}

    public function handle(): void
    {
        $store = app(SiteCache::class)->store();
        for ($n = $this->batch; $n < $this->batches; $n++) {
            if ($store->get(PreloadCache::LOCK) !== $this->run) {
                return; // replaced, or given up on
            }
            if (! PageCache::enabled()) {
                PreloadCache::finish($this->run, 'The whole-page cache was turned off.');

                return;
            }
            $urls = $store->pull(PreloadCache::BATCH."{$this->run}:{$n}");
            $warmed = $failed = 0;
            foreach (is_array($urls) ? $urls : [] as $i => $url) {
                if ($i > 0 && PreloadCache::delay() > 0) {
                    usleep(PreloadCache::delay() * 1000);
                }
                is_string($url) && PreloadCache::warm($url) ? $warmed++ : $failed++;
            }
            PreloadCache::progress($this->run, $warmed, $failed);
            if (! $this->inline && $n + 1 < $this->batches) {
                dispatch(new self($this->run, $n + 1, $this->batches));

                return;
            }
        }
        PreloadCache::finish($this->run);
    }
}
