<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Admin\Media\MediaUsages;
use Sunrice\Cms\Events\EntryDeleted;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\ContentReference;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Support\References;

/**
 * Deletes a trashed entry permanently, with its languages, revisions and
 * terms. Entries must be in the trash first. One that other content
 * points at (Entry::referencedBy()) is refused unless forced; those
 * fields then show nothing for it.
 *
 * @api
 */
final class ForceDeleteEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException when the entry isn't in the trash, or is used elsewhere and $force is false */
    public function handle(Entry $entry, bool $force = false): void
    {
        if (! $entry->trashed()) {
            throw ValidationException::withMessages(['entry' => __('Move the entry to the trash first.')]);
        }
        $usedBy = References::usedBy(Reference::ENTRY, $entry->id);
        if (! $force && $usedBy !== []) {
            throw ValidationException::withMessages(['entry' => __('This entry is used by :uses. Delete it anyway to leave those links empty.', ['uses' => References::sentence($usedBy)])]);
        }
        $label = TrashEntry::label($entry);
        // Explicitly, not by the foreign keys' cascade: not every connection enforces them.
        DB::transaction(function () use ($entry): void {
            $translations = $entry->translations()->pluck('id');
            Revision::query()->whereIn('entry_translation_id', $translations)->delete();
            $entry->terms()->detach();
            Comment::query()->withTrashed()->where('entry_id', $entry->id)->update(['parent_id' => null]);
            Comment::query()->withTrashed()->where('entry_id', $entry->id)->forceDelete();
            // Its children move up to its parent.
            Entry::query()->withTrashed()->where('parent_id', $entry->id)->update(['parent_id' => $entry->parent_id]);
            $entry->translations()->delete();
            $entry->forceDelete();
            app(MediaUsages::class)->forget('cms.entry', (string) $entry->id);
            References::forget(ContentReference::ENTRY, $entry->id);
        });
        $this->activity->record('deleted', 'entry', $entry, $label);
        EntryDeleted::dispatch($entry);
    }
}
