<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Puts a translation's earlier draft back, as it was before a revision
 * was restored over it (the editor's Undo).
 *
 * @api
 */
final class PutBackDraft
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @param array{title: string, slug: string, data: array<mixed>} $draft */
    public function handle(EntryTranslation $translation, array $draft): EntryTranslation
    {
        $taken = EntryInput::taken($draft['slug'], $translation->collection_id, $translation->locale, $translation->id);
        $translation->fill([
            'draft_title' => $draft['title'],
            'draft_slug' => $taken ? $translation->draft_slug : $draft['slug'],
            'draft_data' => $draft['data'],
            'version' => $translation->version + 1,
        ])->save();
        $this->activity->record('updated', 'entry', $translation->entry, $draft['title'], ['locale' => $translation->locale, 'note' => 'undid a revision restore']);

        return $translation;
    }
}
