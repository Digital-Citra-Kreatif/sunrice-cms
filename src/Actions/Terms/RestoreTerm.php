<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Term;

/**
 * Brings a term out of the trash, with the terms under it. Under a parent
 * that's still in the trash, it goes to the top level.
 *
 * @api
 */
final class RestoreTerm
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Term $term): void
    {
        if (! $term->trashed()) {
            return;
        }
        DB::transaction(function () use ($term): void {
            if ($term->parent_id !== null && Term::query()->find($term->parent_id) === null) {
                $term->parent_id = null;
            }
            $term->restore();
            Term::onlyTrashed()->whereKey($term->descendantIds())->get()->each(fn (Term $child) => $child->restore());
        });
        $this->activity->record('restored', 'term', $term, $term->title());
    }
}
