<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Term;

/**
 * Deletes a term in all languages. Terms under it move up to its parent;
 * entries keep the id in their fields, which then show nothing for it.
 *
 * @api
 */
final class DeleteTerm
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Term $term): void
    {
        $title = $term->title();
        DB::transaction(function () use ($term): void {
            Term::query()->withTrashed()->where('parent_id', $term->id)->update(['parent_id' => $term->parent_id]);
            // Explicitly, not by the foreign keys' cascade: not every connection enforces them.
            $term->translations()->delete();
            $term->entries()->detach();
            $term->forceDelete();
        });
        $this->activity->record('deleted', 'term', $term, $title);
    }
}
