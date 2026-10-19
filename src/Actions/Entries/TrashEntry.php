<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Events\EntryTrashed;
use Sunrice\Cms\Models\Entry;

/**
 * Moves an entry, in all its languages, to the trash: off the site, out
 * of lists, restorable with RestoreEntry. Its slugs stay taken.
 *
 * @api
 */
final class TrashEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Entry $entry): void
    {
        if ($entry->trashed()) {
            return;
        }
        $entry->delete();
        $this->activity->record('trashed', 'entry', $entry, self::label($entry));
        EntryTrashed::dispatch($entry);
    }

    /** @internal the main language's title, or the first */
    public static function label(Entry $entry): ?string
    {
        $entry->loadMissing('translations');

        return $entry->translations->sortBy('id')->first()?->draft_title;
    }
}
