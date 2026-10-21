<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Support\SiteCache;
use Sunrice\Cms\Support\SortOrder;

/**
 * Puts entries in the order given, in a collection whose entries are in
 * the order editors put them in (`ordered`): the entries of one level
 * (those under `$parentId` in a hierarchical collection, else all of
 * them) are numbered 1…n again, the ones given first, the others after
 * them as they were.
 *
 * @api
 */
final class ReorderEntries
{
    public function __construct(
        private readonly ActivityLog $activity,
        private readonly SiteCache $cache,
    ) {}

    /**
     * @param  array<mixed>  $ids  entry ids in their new order
     *
     * @throws ValidationException
     */
    public function handle(Collection $collection, array $ids, ?int $parentId = null): void
    {
        if (! $collection->ordered) {
            throw ValidationException::withMessages(['ids' => __('This collection lists entries by date or title: turn on Manual order to order them.')]);
        }
        if ($parentId !== null && ! $collection->hierarchical) {
            throw ValidationException::withMessages(['parent_id' => __('Entries of this collection have no parents.')]);
        }
        $order = self::ids($ids);

        DB::transaction(function () use ($collection, $order, $parentId): void {
            $level = [];
            foreach (Entry::query()->withTrashed()->where('collection_id', $collection->id)
                ->when($collection->hierarchical, fn ($query) => $query->where('parent_id', $parentId))
                ->orderBy('sort_order')->orderBy('id')->lockForUpdate()->pluck('id') as $id) {
                $level[] = is_numeric($id) ? (int) $id : 0;
            }
            $unknown = array_diff($order, $level);
            if ($unknown !== []) {
                throw ValidationException::withMessages(['ids' => $collection->hierarchical
                    ? __('Not entries of this collection at this level: :ids.', ['ids' => implode(', ', $unknown)])
                    : __('Not entries of this collection: :ids.', ['ids' => implode(', ', $unknown)])]);
            }
            $positions = [];
            foreach ([...$order, ...array_diff($level, $order)] as $index => $id) {
                $positions[$id] = $index + 1;
            }
            SortOrder::write((new Entry)->getTable(), $positions);
        });
        $this->activity->record('reordered', 'collection', $collection, $collection->title, ['note' => 'entries']);
        $this->cache->changed("collection {$collection->handle} order", SiteCache::PAGES);
    }

    /**
     * @param  array<mixed>  $ids
     * @return list<int>
     *
     * @throws ValidationException
     */
    private static function ids(array $ids): array
    {
        $valid = [];
        foreach ($ids as $id) {
            if (! is_int($id) && ! (is_string($id) && ctype_digit($id))) {
                throw ValidationException::withMessages(['ids' => __('Give entry ids (numbers).')]);
            }
            $valid[] = (int) $id;
        }
        if ($valid === [] || count(array_unique($valid)) !== count($valid)) {
            throw ValidationException::withMessages(['ids' => __('Give each entry id once, in the new order.')]);
        }

        return $valid;
    }
}
