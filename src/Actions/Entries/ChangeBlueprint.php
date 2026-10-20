<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Gives an entry another of the blueprints its collection allows (the
 * collection's own, or one of `Collection::$blueprints`), in every
 * language. No value is moved or dropped: fields both blueprints have keep
 * their values, the others stay stored, out of sight, and come back when
 * the entry switches back. Every translation's version counts up, so an
 * editor opened on the old fields can't save over the change. Logged.
 *
 * @api
 */
final class ChangeBlueprint
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  string|null  $blueprint  a handle the collection allows; null (or the collection's own) for the collection's
     *
     * @throws ValidationException
     */
    public function handle(Entry $entry, ?string $blueprint): Entry
    {
        $blueprint = $blueprint === null || trim($blueprint) === '' ? null : trim($blueprint);
        $collection = $entry->collection;
        if ($blueprint !== null && ! in_array($blueprint, $collection->allowedBlueprints(), true)) {
            throw ValidationException::withMessages(['blueprint' => "The collection {$collection->title} doesn't offer that blueprint."]);
        }
        // The collection's own is stored as none, so the entry follows it if it changes.
        $blueprint = $blueprint === $collection->blueprint ? null : $blueprint;
        if ($blueprint === $entry->blueprint) {
            return $entry;
        }

        DB::transaction(function () use ($entry, $blueprint): void {
            $entry->blueprint = $blueprint;
            $entry->save();
            EntryTranslation::query()->where('entry_id', $entry->id)->increment('version');
        });
        $entry->unsetRelation('translations');
        $this->activity->updated('entry', $entry, TrashEntry::label($entry), ['blueprint']);

        return $entry;
    }
}
