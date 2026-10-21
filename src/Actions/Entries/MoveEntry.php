<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Support\SiteCache;
use Sunrice\Cms\Support\SortOrder;

/**
 * Moves an entry one place up or down among its siblings (the entries
 * with the same parent), in a collection whose entries are in the order
 * editors put them in (`ordered`). That level is numbered 1…n again, in
 * one statement, so its order is always complete.
 *
 * @api
 */
final class MoveEntry
{
    public function __construct(
        private readonly ActivityLog $activity,
        private readonly SiteCache $cache,
    ) {}

    /** @throws ValidationException */
    public function handle(Entry $entry, string $direction): void
    {
        if (! $entry->collection->ordered) {
            throw ValidationException::withMessages(['entry' => __('This collection lists entries by date or title: turn on Manual order to move them.')]);
        }
        if (! in_array($direction, ['up', 'down'], true)) {
            throw ValidationException::withMessages(['direction' => __('Move it up or down.')]);
        }

        $moved = DB::transaction(function () use ($entry, $direction): bool {
            $ids = self::siblings($entry);
            $index = array_search($entry->id, $ids, true);
            $swap = $direction === 'up' ? $index - 1 : $index + 1;
            if ($index === false || ! isset($ids[$swap])) {
                return false;
            }
            [$ids[$index], $ids[$swap]] = [$ids[$swap], $ids[$index]];
            $positions = [];
            foreach ($ids as $position => $id) {
                $positions[$id] = $position + 1;
            }
            SortOrder::write((new Entry)->getTable(), $positions);

            return true;
        });
        if (! $moved) {
            return;
        }
        $this->activity->record('reordered', 'entry', $entry, TrashEntry::label($entry), ['note' => "moved {$direction}"]);
        $this->cache->changed("collection {$entry->collection->handle} order", SiteCache::PAGES);
    }

    /** The next place at the end of a collection's order. */
    public static function last(int $collectionId): int
    {
        $max = Entry::query()->withTrashed()->where('collection_id', $collectionId)->max('sort_order');

        return (is_numeric($max) ? (int) $max : 0) + 1;
    }

    /** @return list<int> the entries at the entry's level (its parent's children, or all in a flat collection), in order */
    private static function siblings(Entry $entry): array
    {
        $ids = [];
        foreach (Entry::query()->withTrashed()->where('collection_id', $entry->collection_id)
            ->when($entry->collection->hierarchical, fn ($query) => $query->where('parent_id', $entry->parent_id))
            ->orderBy('sort_order')->orderBy('id')->lockForUpdate()->pluck('id') as $id) {
            $ids[] = is_numeric($id) ? (int) $id : 0;
        }

        return $ids;
    }
}
