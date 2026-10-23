<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Revision;

/**
 * Loads a revision back into the draft of its translation, and the
 * entry's terms it was published with (when it kept them) into the
 * entry's terms not published yet; publish it to put it on the site.
 * When another entry took its slug since, the draft keeps its current
 * slug.
 *
 * @api
 */
final class RestoreRevision
{
    public function __construct(private readonly ActivityLog $activity, private readonly SaveEntryTerms $terms) {}

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
        if ($revision->terms !== null) {
            $this->terms->setDraft($translation->entry, array_values(array_filter($revision->terms, is_int(...))));
        }
        $this->activity->record('reverted', 'entry', $translation->entry, $revision->title, ['locale' => $translation->locale, 'revision' => $revision->id]);
    }
}
