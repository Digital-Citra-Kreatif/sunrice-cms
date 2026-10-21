<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Admin\Resources\Tables\ActionFailed;
use Sunrice\Cms\Actions\Cache\PreloadCache;
use Sunrice\Cms\Support\Locales;

/**
 * Preloads the whole-page cache (PreloadCache): queued, as Settings →
 * Cache's button does, or here and now with --now. The scheduler runs it
 * hourly or daily when Settings → Cache says so.
 *
 * @internal
 */
final class CachePreloadCommand extends Command
{
    protected $signature = 'sunrice:cache-preload
        {--limit= : At most this many pages}
        {--locale= : Only this language\'s pages}
        {--now : Request the pages here instead of in queued jobs}';

    protected $description = 'Preload the whole-page cache with the site\'s pages';

    public function handle(PreloadCache $preload): int
    {
        $limit = $this->option('limit');
        $locale = $this->option('locale');
        if ($limit !== null && preg_match('/^[1-9][0-9]*$/', $limit) !== 1) {
            $this->error('--limit takes a whole number above 0.');

            return self::FAILURE;
        }
        if ($locale !== null && ! Locales::has($locale)) {
            $this->error('--locale takes one of the site\'s languages: '.implode(', ', Locales::all()).'.');

            return self::FAILURE;
        }

        try {
            $count = $preload->handle($limit === null ? null : (int) $limit, $locale, (bool) $this->option('now'));
        } catch (ActionFailed $refused) {
            $this->warn($refused->getMessage());

            return self::FAILURE;
        }
        if ($this->option('now')) {
            $status = $preload->status();
            $this->info("Preloaded {$count} pages: ".($status['warmed'] ?? 0).' kept, '.($status['failed'] ?? 0).' failed.');
        } else {
            $this->info("Preloading {$count} pages in queued jobs (a queue worker runs them).");
        }

        return self::SUCCESS;
    }
}
