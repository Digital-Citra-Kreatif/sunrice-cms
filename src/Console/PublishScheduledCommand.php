<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Events\EntryPublished;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\SiteCache;

/**
 * Entries published for a later date go live by themselves when it comes
 * (the site only shows what's past its date). This tells everyone else:
 * it clears the site's caches and fires EntryPublished (`scheduled`) for
 * each one whose time came since the last run. The scheduler runs it
 * every minute.
 *
 * @internal
 */
final class PublishScheduledCommand extends Command
{
    protected $signature = 'sunrice:publish-scheduled';

    protected $description = 'Announce entries whose scheduled publish time has come (clears the site caches)';

    private const LAST_RUN = 'sunrice-cms:scheduled-checked-at';

    public function handle(SiteCache $cache): int
    {
        $now = now();
        $last = $cache->store()->get(self::LAST_RUN);
        $since = is_numeric($last) ? Carbon::createFromTimestamp((int) $last) : $now->copy()->subMinutes(5);
        $cache->store()->forever(self::LAST_RUN, $now->getTimestamp());

        $count = 0;
        EntryTranslation::query()->live()->with('entry.collection')
            ->where('published_at', '>', $since)->where('published_at', '<=', $now)
            // Published ahead of its date (not just now, or backdated).
            ->whereHas('revisions', fn (Builder $q) => $q->whereColumn('sunrice_revisions.created_at', '<', 'sunrice_entry_translations.published_at'))
            ->chunkById(100, function ($translations) use (&$count): void {
                foreach ($translations as $translation) {
                    EntryPublished::dispatch($translation, true);
                    $count++;
                }
            });
        if ($count > 0) {
            $cache->changed('scheduled entries');
        }
        $this->info($count === 1 ? '1 scheduled entry went live.' : "{$count} scheduled entries went live.");

        return self::SUCCESS;
    }
}
