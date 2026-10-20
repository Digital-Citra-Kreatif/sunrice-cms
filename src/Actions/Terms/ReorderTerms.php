<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\SiteCache;
use Sunrice\Cms\Support\SortOrder;

/**
 * Puts terms in the order given: the terms of one level of a taxonomy
 * (those under `$parentId`, or the top level) are numbered 0…n again,
 * the ones given first, the others after them as they were.
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
        if ($parentId !== null && ! $taxonomy->hierarchical) {
            throw ValidationException::withMessages(['parent_id' => 'Terms of this taxonomy have no parents.']);
        }
        $order = self::ids($ids);

        DB::transaction(function () use ($taxonomy, $order, $parentId): void {
            $level = [];
            foreach (Term::query()->where('taxonomy_id', $taxonomy->id)->where('parent_id', $parentId)
                ->orderBy('sort_order')->orderBy('id')->lockForUpdate()->pluck('id') as $id) {
                $level[] = is_numeric($id) ? (int) $id : 0;
            }
            $unknown = array_diff($order, $level);
            if ($unknown !== []) {
                throw ValidationException::withMessages(['ids' => 'Not terms of this taxonomy at this level: '.implode(', ', $unknown).'.']);
            }
            $positions = [];
            foreach ([...$order, ...array_diff($level, $order)] as $index => $id) {
                $positions[$id] = $index;
            }
            SortOrder::write((new Term)->getTable(), $positions);
        });
        $this->activity->record('reordered', 'taxonomy', $taxonomy, $taxonomy->title, ['note' => 'terms']);
        $this->cache->changed("taxonomy {$taxonomy->handle} order", SiteCache::PAGES);
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
                throw ValidationException::withMessages(['ids' => 'Give term ids (numbers).']);
            }
            $valid[] = (int) $id;
        }
        if ($valid === [] || count(array_unique($valid)) !== count($valid)) {
            throw ValidationException::withMessages(['ids' => 'Give each term id once, in the new order.']);
        }

        return $valid;
    }
}
