<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Events\EntryRestored;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Takes an entry out of the trash, as it was: published languages are
 * live again, and the terms of those whose scheduled time came in the
 * trash go on the site (SyncEntryTerms::cameDue()).
 *
 * @api
 */
final class RestoreEntry
{
    public function __construct(private readonly ActivityLog $activity, private readonly SyncEntryTerms $terms) {}

    public function handle(Entry $entry): void
    {
        if (! $entry->trashed()) {
            return;
        }
        $trashedAt = $entry->deleted_at;
        $entry->restore();
        if ($trashedAt !== null) {
            $this->terms->cameDue(EntryTranslation::query()->where('entry_id', $entry->id), $trashedAt);
        }
        $this->activity->record('restored', 'entry', $entry, TrashEntry::label($entry));
        EntryRestored::dispatch($entry);
    }
}
