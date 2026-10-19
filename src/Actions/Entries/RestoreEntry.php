<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Entry;

/**
 * Takes an entry out of the trash, as it was: published languages are
 * live again.
 *
 * @api
 */
final class RestoreEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Entry $entry): void
    {
        if (! $entry->trashed()) {
            return;
        }
        $entry->restore();
        $this->activity->record('restored', 'entry', $entry, TrashEntry::label($entry));
    }
}
