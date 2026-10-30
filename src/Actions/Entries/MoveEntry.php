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
 * Moves an entry among its siblings (the entries with the same parent),
 * in a collection whose entries are in the order editors put them in
 * (`ordered`): one place up or down, to the top or the bottom, or to a
 * position (1 is the first; past the last is the last). That level is
 * numbered 1…n again, in a statement per few hundred entries
 * (SortOrder), so its order is always complete.
 *
 * @api
 */
final class MoveEntry
{
    public const DIRECTIONS = ['up', 'down', 'top', 'bottom'];

    public function __construct(
        private readonly ActivityLog $activity,
        private readonly SiteCache $cache,
    ) {}

    /**
     * @param  string|int  $to  "up", "down", "top", "bottom", or a position among its siblings (from 1)
     * @return bool whether it moved (nothing is logged when it didn't)
     *
     * @throws ValidationException
     */
    public function handle(Entry $entry, string|int $to): bool
    {
        if (! $entry->collection->ordered) {
            throw ValidationException::withMessages(['entry' => __('This collection lists entries by date or title: turn on Manual order to move them.')]);
        }
        if (is_int($to) ? $to < 1 : ! in_array($to, self::DIRECTIONS, true)) {
            throw ValidationException::withMessages(is_int($to)
                ? ['position' => __('Give a position from 1.')]
                : ['direction' => __('Move it up or down.')]);
        }

        $position = DB::transaction(function () use ($entry, $to): ?int {
            // Positions count the entries editors see: trashed ones keep their places, the others move around them.
            $level = self::siblings($entry);
            $ids = array_keys(array_filter($level, fn (bool $trashed): bool => ! $trashed));
            $index = array_search($entry->id, $ids, true);
            if ($index === false) {
                return null;
            }
            $last = count($ids) - 1;
            $target = match ($to) {
                'up' => $index - 1,
                'down' => $index + 1,
                'top' => 0,
                'bottom' => $last,
                default => min((int) $to, $last + 1) - 1,
            };
            if ($target < 0 || $target > $last || $target === $index) {
                return null;
            }
            array_splice($ids, $index, 1);
            array_splice($ids, $target, 0, [$entry->id]);
            $positions = [];
            $place = 0;
            foreach ($level as $id => $trashed) {
                $positions[$trashed ? $id : $ids[$place++]] = count($positions) + 1;
            }
            SortOrder::write((new Entry)->getTable(), $positions);

            return $target + 1;
        });
        if ($position === null) {
            return false;
        }
        $note = match ($to) {
            'up', 'down' => "moved {$to}",
            'top' => 'moved to the top',
            'bottom' => 'moved to the bottom',
            default => "moved to position {$position}",
        };
        $this->activity->record('reordered', 'entry', $entry, TrashEntry::label($entry), ['note' => $note]);
        $this->cache->changed("collection {$entry->collection->handle} order", SiteCache::PAGES);

        return true;
    }

    /** The next place at the end of a collection's order. */
    public static function last(int $collectionId): int
    {
        $max = Entry::query()->withTrashed()->where('collection_id', $collectionId)->max('sort_order');

        return (is_numeric($max) ? (int) $max : 0) + 1;
    }

    /** @return array<int, bool> the entries at the entry's level (its parent's children, or all in a flat collection), in order: whether each is trashed, by id */
    private static function siblings(Entry $entry): array
    {
        $level = [];
        foreach (Entry::query()->withTrashed()->where('collection_id', $entry->collection_id)
            ->when($entry->collection->hierarchical, fn ($query) => $query->where('parent_id', $entry->parent_id))
            ->orderBy('sort_order')->orderBy('id')->lockForUpdate()->toBase()->get(['id', 'deleted_at']) as $row) {
            $id = isset($row->id) && is_numeric($row->id) ? (int) $row->id : 0;
            $level[$id] = isset($row->deleted_at);
        }

        return $level;
    }
}
