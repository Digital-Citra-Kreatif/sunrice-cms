<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\MediaUsage;
use Sunrice\Cms\Support\References;

/**
 * Throws away a published translation's unpublished changes: the draft
 * becomes the live version again (its title, slug, fields and SEO). As
 * SaveDraft, with a version (the one the editor opened) it refuses to
 * discard over someone else's newer save. A translation never published
 * has no live version to go back to.
 *
 * @api
 */
final class DiscardChanges
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(EntryTranslation $translation, int|string|null $version = null): EntryTranslation
    {
        if (! $translation->isPublished() || $translation->title === null || $translation->slug === null) {
            throw ValidationException::withMessages(['entry' => __('This entry has no published version to go back to.')]);
        }
        if (! $translation->hasUnpublishedChanges()) {
            return $translation;
        }
        $expected = $version ?? $translation->version;
        if (! is_int($expected) && ! ctype_digit($expected)) {
            throw ValidationException::withMessages(['version' => __('The version must be a number.')]);
        }
        // Only if nobody saved in between: the version check and the write are one statement.
        $saved = EntryTranslation::query()->whereKey($translation->id)->where('version', (int) $expected)->update([
            'draft_title' => $translation->title,
            'draft_slug' => $translation->slug,
            'draft_data' => json_encode($translation->data ?? [], JSON_THROW_ON_ERROR),
            'version' => (int) $expected + 1,
            'updated_at' => now(),
        ]);
        if ($saved === 0) {
            throw ValidationException::withMessages(['version' => __('Someone else saved this entry after you opened it. Reload to see their changes.')]);
        }
        $translation->refresh();
        // A query update fires no model events: keep the media library's and the references' "Used by" here.
        MediaUsage::entry($translation);
        References::entry($translation);
        $this->activity->record('discarded', 'entry', $translation->entry, $translation->title, ['locale' => $translation->locale, 'note' => 'discarded the unpublished changes']);

        return $translation;
    }
}
