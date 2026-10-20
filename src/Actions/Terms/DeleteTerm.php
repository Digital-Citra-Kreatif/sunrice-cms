<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Models\ContentReference;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\References;

/**
 * Deletes a term in all languages. Terms under it move up to its parent;
 * entries keep the id in their fields, which then show nothing for it.
 * A term other content points at (Term::referencedBy()) is refused unless
 * forced.
 *
 * @api
 */
final class DeleteTerm
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException when the term is used elsewhere and $force is false */
    public function handle(Term $term, bool $force = false): void
    {
        $usedBy = References::usedBy(Reference::TERM, $term->id);
        if (! $force && $usedBy !== []) {
            throw ValidationException::withMessages(['term' => 'This term is used by '.References::sentence($usedBy).'. Delete it anyway to leave those fields without it.']);
        }
        $title = $term->title();
        DB::transaction(function () use ($term): void {
            Term::query()->withTrashed()->where('parent_id', $term->id)->update(['parent_id' => $term->parent_id]);
            // Explicitly, not by the foreign keys' cascade: not every connection enforces them.
            $term->translations()->delete();
            $term->entries()->detach();
            $term->forceDelete();
            References::forget(ContentReference::TERM, $term->id);
        });
        $this->activity->record('deleted', 'term', $term, $title);
    }
}
