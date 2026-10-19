<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Takes an entry translation off the site. Its draft, revisions and
 * publish date stay, so publishing it again keeps the date.
 *
 * @api
 */
final class UnpublishEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(EntryTranslation $translation): EntryTranslation
    {
        if (! $translation->isPublished()) {
            return $translation;
        }
        $translation->status = EntryTranslation::DRAFT;
        $translation->save();
        $this->activity->record('unpublished', 'entry', $translation->entry, $translation->draft_title, ['locale' => $translation->locale]);

        return $translation;
    }
}
