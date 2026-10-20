<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Revision;

/**
 * Loads a revision back into the draft of its translation; publish it to
 * put it on the site. When another entry took its slug since, the draft
 * keeps its current slug.
 *
 * @api
 */
final class RestoreRevision
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Revision $revision): void
    {
        $translation = $revision->translation;
        $taken = EntryInput::taken($revision->slug, $translation->collection_id, $translation->locale, $translation->id);
        $translation->fill([
            'draft_title' => $revision->title,
            'draft_slug' => $taken ? $translation->draft_slug : $revision->slug,
            'draft_data' => $translation->ownData($revision->data),
            'version' => $translation->version + 1,
        ])->save();
        $this->activity->record('reverted', 'entry', $translation->entry, $revision->title, ['locale' => $translation->locale, 'revision' => $revision->id]);
    }
}
