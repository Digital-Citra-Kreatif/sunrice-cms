<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Sunrice\Cms\Models\Term;

/**
 * Moves a term one place up (-1) or down (+1) among the terms with the
 * same parent. Nothing happens at the ends.
 *
 * @api
 */
final class MoveTerm
{
    /** @param -1|1 $by */
    public function handle(Term $term, int $by): void
    {
        DB::transaction(function () use ($term, $by): void {
            $siblings = Term::query()->where('taxonomy_id', $term->taxonomy_id)->where('parent_id', $term->parent_id)
                ->orderBy('sort_order')->orderBy('id')->lockForUpdate()->get()->values();
            $index = $siblings->search(fn (Term $sibling): bool => $sibling->id === $term->id);
            $other = $index === false ? null : $siblings->get($index + $by);
            if ($index === false || $other === null) {
                return;
            }
            // Renumber the level, so equal sort orders can't stall a move.
            $ids = $siblings->pluck('id')->all();
            [$ids[$index], $ids[$index + $by]] = [$ids[$index + $by], $ids[$index]];
            foreach ($ids as $position => $id) {
                Term::query()->whereKey($id)->update(['sort_order' => $position]);
            }
        });
    }
}
