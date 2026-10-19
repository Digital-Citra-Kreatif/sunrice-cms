<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Admin\Media\MediaUsages;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Revision;

/**
 * Deletes a trashed entry for good, with its languages, revisions and
 * terms. Entries must be in the trash first.
 *
 * @api
 */
final class ForceDeleteEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException when the entry isn't in the trash */
    public function handle(Entry $entry): void
    {
        if (! $entry->trashed()) {
            throw ValidationException::withMessages(['entry' => 'Move the entry to the trash first.']);
        }
        $label = TrashEntry::label($entry);
        // Explicitly, not by the foreign keys' cascade: not every connection enforces them.
        DB::transaction(function () use ($entry): void {
            $translations = $entry->translations()->pluck('id');
            Revision::query()->whereIn('entry_translation_id', $translations)->delete();
            $entry->terms()->detach();
            // Its children move up to its parent.
            Entry::query()->withTrashed()->where('parent_id', $entry->id)->update(['parent_id' => $entry->parent_id]);
            $entry->translations()->delete();
            $entry->forceDelete();
            app(MediaUsages::class)->forget('cms.entry', (string) $entry->id);
        });
        $this->activity->record('deleted', 'entry', $entry, $label);
    }
}
