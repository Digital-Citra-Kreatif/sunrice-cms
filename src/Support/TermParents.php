<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Sunrice\Cms\Models\Term;

/**
 * The titles of terms' parents, top first ("News" for "Local" under it),
 * for the term picker's tooltips ("News › Local") before its list is
 * opened. Three queries however many terms and however deep.
 *
 * @internal
 */
final class TermParents
{
    /**
     * By term id, for the terms that have parents (the others are left out).
     *
     * @param  list<int>  $ids
     * @return array<int, list<string>>
     */
    public static function of(array $ids): array
    {
        $ids = array_values(array_unique(array_filter($ids, fn (int $id): bool => $id > 0)));
        if ($ids === []) {
            return [];
        }
        $terms = Term::query()->whereKey(array_slice($ids, 0, 500))->whereNotNull('parent_id')->get(['id', 'taxonomy_id', 'parent_id']);
        if ($terms->isEmpty()) {
            return [];
        }
        // Their taxonomies' tree (ids only), to walk up without a query per level.
        $parentOf = Term::query()->withTrashed()->whereIn('taxonomy_id', $terms->pluck('taxonomy_id')->unique()->values()->all())
            ->pluck('parent_id', 'id')->all();
        $chains = [];
        foreach ($terms as $term) {
            $chain = [];
            for ($at = $term->parent_id; is_int($at) && count($chain) < 20 && ! in_array($at, $chain, true); $at = $parentOf[$at] ?? null) {
                array_unshift($chain, $at);
            }
            $chains[$term->id] = $chain;
        }
        $titles = Term::query()->withTrashed()->with('translations')->whereKey(array_values(array_unique(array_merge(...array_values($chains)))))->get()
            ->mapWithKeys(fn (Term $term): array => [$term->id => $term->title(Locales::default())])->all();

        return array_map(fn (array $chain): array => array_map(fn (int $id): string => $titles[$id] ?? '', $chain), $chains);
    }
}
