<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use DateTimeInterface;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Events\EntryPublished;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\SearchText;

/**
 * Publishes the draft of an entry translation: the site shows it from its
 * date (the given one, which may be in the future; else the date it was
 * first published or is scheduled for, but now for a draft that was
 * scheduled for later and unpublished; else, for another language than
 * the main one first published, the main translation's when that's
 * published; else now) and a revision is kept. The entry's terms not
 * published yet (SaveEntryTerms) go live with it, whichever language is
 * published: now, or for a date to come when that comes (the
 * sunrice:publish-scheduled command). The draft is checked again, as the
 * blueprint may have changed since it was saved.
 *
 * @api
 */
final class PublishEntry
{
    public function __construct(
        private readonly ActivityLog $activity,
        private readonly SyncEntryTerms $terms,
    ) {}

    /** @throws ValidationException */
    public function handle(EntryTranslation $translation, ?DateTimeInterface $publishAt = null): EntryTranslation
    {
        $entry = $translation->entry;
        if ($entry->trashed()) {
            throw ValidationException::withMessages(['entry' => __('This entry is in the trash; restore it before publishing.')]);
        }
        if ($entry->collection->trashed()) {
            throw ValidationException::withMessages(['entry' => __('The collection ":title" was deleted.', ['title' => $entry->collection->title])]);
        }
        $site = app(Site::class);

        // The slug check and the write in one transaction: see EntryInput::write().
        $values = EntryInput::write(function () use ($translation, $publishAt, $site): array {
            // The draft as stored now, its row locked until the publish ends: a save made since the
            // translation was loaded is published, not overwritten, and two publishes take turns.
            $stored = EntryTranslation::query()->whereKey($translation->id)->lockForUpdate()->firstOrFail();
            $translation->setRawAttributes($stored->getAttributes(), true);
            // Where the live page was, to redirect from if its address changes.
            $oldPath = $translation->isPublished() ? $site->path($translation, $translation->slug) : null;
            $oldSlug = $translation->isPublished() ? $translation->slug : null;
            // As SaveDraft does: validated with the main language's shared values in rows and blocks, which ownData() drops again.
            $data = $translation->draft_data;
            $main = $translation->entry->mainTranslation();
            if ($main !== null && ! $main->is($translation)) {
                $data = $translation->entry->schema()->withShared($data, $main->draft_data);
            }
            $values = EntryInput::validate(
                $translation->editableSchema(),
                $translation->draft_title,
                $translation->draft_slug,
                $data,
                $translation->collection_id,
                $translation->locale,
                $translation->id,
            );
            $values['data'] = $translation->ownData($values['data']);
            $translation->fill([
                'status' => EntryTranslation::PUBLISHED,
                'title' => $values['title'],
                'slug' => $values['slug'],
                'data' => $values['data'],
                'draft_data' => $values['data'],
                // Without a date: the one it has (first published, or scheduled), but now for a draft once scheduled for later;
                // never published: the entry's date (another language), else now.
                // In the app's timezone, as dates are stored (the editor sends UTC, others any offset).
                'published_at' => $publishAt !== null ? Carbon::instance($publishAt)->setTimezone(now()->getTimezone())
                    : ($translation->published_at === null ? (self::entryDate($translation) ?? now())
                        : (! $translation->isPublished() && $translation->published_at->isFuture() ? now() : $translation->published_at)),
                // Counted up too, so an editor opened before this publish can't save over it unknowingly.
                'version' => $translation->version + 1,
                // Published: no longer waiting for review (RequestReview).
                'review_requested_at' => null,
                'review_requested_by' => null,
            ]);
            // Another language is up to date with the main one as it is now (EntryTranslation::isOutdated()).
            $mainVersion = $translation->currentMainVersion();
            if ($mainVersion !== null) {
                $translation->main_version = $mainVersion;
            }
            // The version its live content is, which discarding later changes goes back to (DiscardChanges).
            $translation->live_version = $translation->version;
            $translation->live_updated_at = now();
            $translation->save();
            // The entry's terms chosen since, every language's (SaveEntryTerms): live now, or when its date comes.
            $live = $translation->isLive();
            if ($live) {
                $this->terms->handle($translation->entry);
            }
            $id = Auth::id();
            $translation->revisions()->create([
                'user_id' => is_int($id) ? $id : null,
                'title' => $values['title'],
                'slug' => $values['slug'],
                'data' => $values['data'],
                // The entry's terms it's published with, which restoring the revision brings back.
                'terms' => $live ? $translation->entry->liveTermIds() : $translation->entry->draftTermIds(),
            ]);
            $this->prune($translation);
            $newPath = $site->path($translation, $translation->slug);
            if ($oldPath !== null && $newPath !== null) {
                $site->moved($oldPath, $newPath);
            }
            // Pages whose URL holds this slug (/projects/{project}/{slug}) moved with it.
            if ($oldSlug !== null && $oldSlug !== $translation->slug) {
                $site->relatedMoved($translation, $oldSlug);
            }
            // The other languages' search text holds this one's shared fields.
            if ($translation->isMain()) {
                $translation->entry->load('translations');
                foreach ($translation->entry->translations as $other) {
                    if (! $other->is($translation) && $other->data !== null) {
                        $other->setRelation('entry', $translation->entry);
                        $other->forceFill(['search_text' => SearchText::of($other->completeData())])->save();
                    }
                }
            }

            return $values;
        });
        $this->activity->record('published', 'entry', $entry, $values['title'], ['locale' => $translation->locale]);
        EntryPublished::dispatch($translation);

        return $translation;
    }

    /**
     * Another language published for the first time takes the entry's date
     * (its main translation's, when that's published), so a translated
     * article isn't dated the day it was translated.
     */
    private static function entryDate(EntryTranslation $translation): ?Carbon
    {
        $main = $translation->entry->mainTranslation();

        return $main !== null && ! $main->is($translation) && $main->isPublished() ? $main->published_at?->copy() : null;
    }

    private function prune(EntryTranslation $translation): void
    {
        $keep = config('sunrice-cms.revisions.keep', 50);
        $keep = is_int($keep) && $keep > 0 ? $keep : 50;
        $oldest = Revision::query()->where('entry_translation_id', $translation->id)->latest('id')->skip($keep)->value('id');
        if ($oldest !== null) {
            Revision::query()->where('entry_translation_id', $translation->id)->where('id', '<=', $oldest)->delete();
        }
    }
}
