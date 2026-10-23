<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * Moves a term, with the terms under it, to the trash: off the site, out
 * of pickers and entries' terms. RestoreTerm brings them back.
 *
 * @api
 */
final class TrashTerm
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Term $term): void
    {
        if ($term->trashed()) {
            return;
        }
        DB::transaction(function () use ($term): void {
            Term::query()->whereKey($term->descendantIds())->get()->each(fn (Term $child) => $child->delete());
            $term->delete();
        });
        $this->activity->record('trashed', 'term', $term, $term->title(Locales::default()));
    }
}
