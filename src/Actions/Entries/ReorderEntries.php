<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Support\SiteCache;

/**
 * Puts some entries of an ordered collection in the order given (dragged
 * in the list): they swap among the places they held, so a page of the
 * list can be reordered without the others moving. In a hierarchical
 * collection they are siblings: all under `$parentId` (null: the top
 * level). The collection is numbered 1…n again, in one transaction.
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
            throw ValidationException::withMessages(['ids' => 'This collection lists entries by date or title: turn on Manual order to move them.']);
        }
        $ids = self::ids($ids);

        DB::transaction(function () use ($collection, $ids, $parentId): void {
            $entries = Entry::query()->where('collection_id', $collection->id)->whereKey($ids)->lockForUpdate()->get(['id', 'parent_id']);
            $siblings = $entries->every(fn (Entry $entry): bool => $entry->parent_id === $parentId);
            if ($entries->count() !== count($ids) || ($collection->hierarchical || $parentId !== null) && ! $siblings) {
                throw ValidationException::withMessages(['ids' => $collection->hierarchical
                    ? 'Only entries of this collection under the same parent can be put in order together.'
                    : 'Only entries of this collection can be put in order.']);
            }
            $order = [];
            foreach (Entry::query()->withTrashed()->where('collection_id', $collection->id)->orderBy('sort_order')->orderBy('id')->lockForUpdate()->pluck('id') as $id) {
                $order[] = is_numeric($id) ? (int) $id : 0;
            }
            // The places these entries held, now in the new order.
            $slots = array_keys(array_intersect($order, $ids));
            foreach ($slots as $i => $slot) {
                $order[$slot] = $ids[$i];
            }
            foreach ($order as $position => $id) {
                Entry::query()->withTrashed()->whereKey($id)->where('sort_order', '!=', $position + 1)->update(['sort_order' => $position + 1]);
            }
        });
        // A query update fires no model events: the site's lists change.
        $this->cache->changed("collection {$collection->handle}", SiteCache::PAGES, SiteCache::MENUS, SiteCache::SITEMAP);
        $this->activity->record('reordered', 'collection', $collection, $collection->title, ['note' => count($ids) === 1 ? '1 entry' : count($ids).' entries']);
    }

    /**
     * @param  array<mixed>  $ids
     * @return non-empty-list<int>
     *
     * @throws ValidationException
     */
    public static function ids(array $ids): array
    {
        $clean = [];
        foreach ($ids as $id) {
            if (! is_int($id) && ! (is_string($id) && ctype_digit($id))) {
                throw ValidationException::withMessages(['ids' => 'Give the ids of what to put in order.']);
            }
            $clean[] = (int) $id;
        }
        if ($clean === [] || count($clean) > 500 || count(array_unique($clean)) !== count($clean)) {
            throw ValidationException::withMessages(['ids' => 'Give each id once, at most 500.']);
        }

        return $clean;
    }
}
