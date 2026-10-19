<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Removes one language of an entry, with its revisions. The main
 * translation can't be removed: it holds the shared fields (trash the
 * entry instead).
 *
 * @api
 */
final class DeleteTranslation
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(EntryTranslation $translation): void
    {
        if ($translation->isMain()) {
            throw ValidationException::withMessages(['locale' => 'The main language can\'t be removed; move the entry to the trash instead.']);
        }
        $translation->delete();
        $translation->entry->unsetRelation('translations');
        $this->activity->record('removed translation', 'entry', $translation->entry, $translation->draft_title, ['locale' => $translation->locale]);
    }
}
