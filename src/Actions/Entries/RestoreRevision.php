<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Support\Ids;

/**
 * Loads a revision back into the draft of its translation, and the
 * entry's terms it was published with (when it kept them) into the
 * entry's terms not published yet (a revision kept before revisions
 * had terms, of the main language: those its top-level terms fields
 * held, as 0.1 published them, for the attached taxonomies; unless
 * `$withTerms` is false: for
 * someone who may edit this language only, who may not change the
 * entry's terms); publish it to put it on the site.
 * When another entry took its slug since, the draft keeps its current
 * slug.
 *
 * @api
 */
final class RestoreRevision
{
    public function __construct(private readonly ActivityLog $activity, private readonly SaveEntryTerms $terms) {}

    public function handle(Revision $revision, bool $withTerms = true): void
    {
        $translation = $revision->translation;
        $taken = EntryInput::taken($revision->slug, $translation->collection_id, $translation->locale, $translation->id);
        $translation->fill([
            'draft_title' => $revision->title,
            'draft_slug' => $taken ? $translation->draft_slug : $revision->slug,
            'draft_data' => $translation->ownData($revision->data),
            'version' => $translation->version + 1,
        ])->save();
        $terms = $withTerms ? ($revision->terms !== null ? array_values(array_filter($revision->terms, is_int(...))) : self::fromFields($translation, $revision->data)) : null;
        if ($terms !== null) {
            $this->terms->setDraft($translation->entry, $terms);
        }
        $this->activity->record('reverted', 'entry', $translation->entry, $revision->title, ['locale' => $translation->locale, 'revision' => $revision->id]);
    }

    /**
     * The entry's terms with those a revision's top-level terms fields held
     * (a main-language revision kept before revisions had terms) for the
     * taxonomies attached to its collection; the other taxonomies keep
     * theirs. Null when it has no such field: the terms stay as they are.
     *
     * @param  array<string, mixed>|null  $data
     * @return list<int>|null
     */
    private static function fromFields(EntryTranslation $translation, ?array $data): ?array
    {
        if (! is_array($data) || ! $translation->isMain()) {
            return null;
        }
        $attached = SaveEntryTerms::attached($translation->entry)->keyBy('handle');
        $chosen = [];
        foreach ($translation->entry->schema()->fields() as $field) {
            $taxonomy = $field->type === 'terms' ? $attached->get($field->configString('taxonomy') ?? '') : null;
            if ($taxonomy instanceof Taxonomy) {
                $value = $data[$field->handle] ?? null;
                $chosen[$taxonomy->id] = [...($chosen[$taxonomy->id] ?? []), ...Ids::of(is_array($value) ? $value : [$value])];
            }
        }
        if ($chosen === []) {
            return null;
        }
        $current = $translation->entry->draftTermIds();
        $of = SaveEntryTerms::taxonomiesOf([...$current, ...array_merge(...array_values($chosen))]);
        $keep = array_filter($current, fn (int $id): bool => ! isset($chosen[$of[$id] ?? 0]));
        $picked = [];
        foreach ($chosen as $taxonomyId => $ids) {
            array_push($picked, ...array_filter($ids, fn (int $id): bool => ($of[$id] ?? null) === $taxonomyId));
        }

        return array_values(array_unique([...$keep, ...$picked]));
    }
}
