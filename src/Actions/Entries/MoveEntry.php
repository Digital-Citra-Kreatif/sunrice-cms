<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Entry;

/**
 * Moves an entry one place up or down, in a collection whose entries are
 * in the order editors put them in (`ordered`). The collection's entries
 * are numbered 1…n again, so the order is always complete.
 *
 * @api
 */
final class MoveEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(Entry $entry, string $direction): void
    {
        if (! $entry->collection->ordered) {
            throw ValidationException::withMessages(['entry' => __('This collection lists entries by date or title: turn on Manual order to move them.')]);
        }
        if (! in_array($direction, ['up', 'down'], true)) {
            throw ValidationException::withMessages(['direction' => __('Move it up or down.')]);
        }

        DB::transaction(function () use ($entry, $direction): void {
            $ids = self::ordered($entry->collection_id);
            $index = array_search($entry->id, $ids, true);
            $swap = $direction === 'up' ? $index - 1 : $index + 1;
            if ($index !== false && isset($ids[$swap])) {
                [$ids[$index], $ids[$swap]] = [$ids[$swap], $ids[$index]];
            }
            foreach ($ids as $position => $id) {
                Entry::query()->withTrashed()->whereKey($id)->update(['sort_order' => $position + 1]);
            }
        });
        $this->activity->record('reordered', 'entry', $entry, TrashEntry::label($entry), ['note' => "moved {$direction}"]);
    }

    /** The next place at the end of a collection's order. */
    public static function last(int $collectionId): int
    {
        $max = Entry::query()->withTrashed()->where('collection_id', $collectionId)->max('sort_order');

        return (is_numeric($max) ? (int) $max : 0) + 1;
    }

    /** @return list<int> the collection's entries in order */
    private static function ordered(int $collectionId): array
    {
        $ids = [];
        foreach (Entry::query()->withTrashed()->where('collection_id', $collectionId)->orderBy('sort_order')->orderBy('id')->pluck('id') as $id) {
            $ids[] = is_numeric($id) ? (int) $id : 0;
        }

        return $ids;
    }
}
