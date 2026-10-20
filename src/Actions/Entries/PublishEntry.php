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
 * date (now, the date it was first published, or the given one, which may
 * be in the future) and a revision is kept. The draft is checked again,
 * as the blueprint may have changed since it was saved.
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
            throw ValidationException::withMessages(['entry' => 'This entry is in the trash; restore it before publishing.']);
        }
        if ($entry->collection->trashed()) {
            throw ValidationException::withMessages(['entry' => "The collection \"{$entry->collection->title}\" was deleted."]);
        }
        // Where the live page was, to redirect from if its address changes.
        $site = app(Site::class);
        $oldPath = $translation->isPublished() ? $site->path($translation, $translation->slug) : null;

        // The slug check and the write in one transaction: see EntryInput::write().
        $values = EntryInput::write(function () use ($translation, $publishAt, $site, $oldPath): array {
            $values = EntryInput::validate(
                $translation->editableSchema(),
                $translation->draft_title,
                $translation->draft_slug,
                $translation->draft_data,
                $translation->collection_id,
                $translation->locale,
                $translation->id,
            );
            $translation->fill([
                'status' => EntryTranslation::PUBLISHED,
                'title' => $values['title'],
                'slug' => $values['slug'],
                'data' => $values['data'],
                'draft_data' => $values['data'],
                'published_at' => $publishAt !== null ? Carbon::instance($publishAt) : ($translation->published_at ?? now()),
                // Counted up too, so an editor opened before this publish can't save over it unknowingly.
                'version' => $translation->version + 1,
            ]);
            // Another language is up to date with the main one as it is now (EntryTranslation::isOutdated()).
            $mainVersion = $translation->currentMainVersion();
            if ($mainVersion !== null) {
                $translation->main_version = $mainVersion;
            }
            $translation->save();
            $id = Auth::id();
            $translation->revisions()->create([
                'user_id' => is_int($id) ? $id : null,
                'title' => $values['title'],
                'slug' => $values['slug'],
                'data' => $values['data'],
            ]);
            $this->prune($translation);
            $newPath = $site->path($translation, $translation->slug);
            if ($oldPath !== null && $newPath !== null) {
                $site->moved($oldPath, $newPath);
            }
            $this->terms->handle($translation->entry);
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
