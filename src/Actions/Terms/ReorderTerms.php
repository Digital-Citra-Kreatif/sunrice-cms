<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\ReorderEntries;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\SiteCache;

/**
 * Puts some terms of one level (all under `$parentId`, null: the top) in
 * the order given (dragged in the list): they swap among the places they
 * held. The level is numbered 0…n again, in one transaction.
 *
 * @api
 */
final class ReorderTerms
{
    public function __construct(
        private readonly ActivityLog $activity,
        private readonly SiteCache $cache,
    ) {}

    /**
     * @param  array<mixed>  $ids  term ids in their new order
     *
     * @throws ValidationException
     */
    public function handle(Taxonomy $taxonomy, array $ids, ?int $parentId = null): void
    {
        $ids = ReorderEntries::ids($ids);

        DB::transaction(function () use ($taxonomy, $ids, $parentId): void {
            $order = [];
            foreach (Term::query()->where('taxonomy_id', $taxonomy->id)->where('parent_id', $parentId)->orderBy('sort_order')->orderBy('id')->lockForUpdate()->pluck('id') as $id) {
                $order[] = is_numeric($id) ? (int) $id : 0;
            }
            if (array_diff($ids, $order) !== []) {
                throw ValidationException::withMessages(['ids' => 'Only terms of this taxonomy at the same level can be put in order together.']);
            }
            $slots = array_keys(array_intersect($order, $ids));
            foreach ($slots as $i => $slot) {
                $order[$slot] = $ids[$i];
            }
            foreach ($order as $position => $id) {
                Term::query()->whereKey($id)->where('sort_order', '!=', $position)->update(['sort_order' => $position]);
            }
        });
        // A query update fires no model events: term lists and menus change.
        $this->cache->changed("taxonomy {$taxonomy->handle}", SiteCache::PAGES, SiteCache::MENUS);
        $this->activity->record('reordered', 'taxonomy', $taxonomy, $taxonomy->title, ['note' => count($ids) === 1 ? '1 term' : count($ids).' terms']);
    }
}
