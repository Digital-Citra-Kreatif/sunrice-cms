<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Events\EntryDeleting;
use Sunrice\Cms\Events\EntryTrashed;
use Sunrice\Cms\Models\Entry;

/**
 * Moves an entry, in all its languages, to the trash: off the site, out
 * of lists, restorable with RestoreEntry. Its slugs stay taken. A
 * listener of EntryDeleting may refuse.
 *
 * @api
 */
final class TrashEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException when an EntryDeleting listener refuses */
    public function handle(Entry $entry): void
    {
        if ($entry->trashed()) {
            return;
        }
        EntryDeleting::dispatch($entry, false);
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
