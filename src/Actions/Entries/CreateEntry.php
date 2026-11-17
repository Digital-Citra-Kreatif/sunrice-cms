<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Events\EntryCreated;
use Sunrice\Cms\Events\EntrySaved;
use Sunrice\Cms\Events\EntrySaving;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

/**
 * Creates an entry as a draft. Input: title, slug (made from the title
 * when empty), data (the blueprint's fields), locale (the main language
 * when left out), parent_id (in a hierarchical collection; see
 * SaveEntrySettings::parent()) and terms (taxonomy handle => term ids or
 * slugs, of the taxonomies attached to the collection; see
 * SaveEntryTerms). The signed-in user is its author. Listeners of
 * EntrySaving may change the title, slug and fields or refuse; EntryCreated
 * and EntrySaved follow.
 *
 * @api
 */
final class CreateEntry
{
    public function __construct(private readonly ActivityLog $activity, private readonly SaveEntryTerms $terms) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(Collection $collection, array $input): EntryTranslation
    {
        if ($collection->trashed()) {
            throw ValidationException::withMessages(['collection' => __('The collection ":title" was deleted.', ['title' => $collection->title])]);
        }
        $locale = $input['locale'] ?? Locales::default();
        if (! is_string($locale) || ! Locales::has($locale)) {
            throw ValidationException::withMessages(['locale' => __('Choose one of the site\'s languages: :languages.', ['languages' => implode(', ', Locales::all())])]);
        }
        $schema = $collection->schema();
        $data = EntryInput::merge($schema, $schema->defaults(), $input['data'] ?? null);
        // Listeners may change what's saved, or refuse it; what they leave is validated below.
        event($saving = new EntrySaving($collection, $locale, null, $input['title'] ?? null, $input['slug'] ?? null, $data));
        $data = EntryInput::merge($schema, $schema->defaults(), $saving->data);
        $input['title'] = $saving->title;
        $input['slug'] = $saving->slug;

        // The slug check and the write in one transaction: see EntryInput::write().
        $translation = EntryInput::write(function () use ($collection, $locale, $schema, $input, $data): EntryTranslation {
            $values = EntryInput::validate($schema, $input['title'], $input['slug'], $data, $collection->id, $locale, null);
            if (($seo = Seo::validate($input[Seo::KEY] ?? null)) !== null) {
                $values['data'][Seo::KEY] = $seo;
            }
            $id = Auth::id();
            $entry = new Entry(['collection_id' => $collection->id, 'author_id' => is_int($id) ? $id : null, 'sort_order' => MoveEntry::last($collection->id)]);
            if (($input['parent_id'] ?? null) !== null) {
                $entry->setRelation('collection', $collection);
                $entry->parent_id = SaveEntrySettings::parent($entry, $input['parent_id'])?->id;
            }
            $entry->save();
            if (($input['terms'] ?? null) !== null) {
                if (! is_array($input['terms'])) {
                    throw ValidationException::withMessages(['terms' => __('Give the terms by taxonomy handle.')]);
                }
                $entry->setRelation('collection', $collection);
                $this->terms->handle($entry, $input['terms']);
            }

            return $entry->translations()->create([
                'collection_id' => $collection->id,
                'locale' => $locale,
                'draft_title' => $values['title'],
                'draft_slug' => $values['slug'],
                'draft_data' => $values['data'],
            ]);
        });
        $this->activity->record('created', 'entry', $translation->entry_id, $translation->draft_title, ['collection' => $collection->handle, 'locale' => $locale]);
        EntryCreated::dispatch($translation);
        $given = array_keys(array_filter($translation->draft_data, fn (mixed $value): bool => ! in_array($value, [null, '', []], true)));
        EntrySaved::dispatch($translation, true, ['title', 'slug', ...array_map(strval(...), $given)]);

        return $translation;
    }
}
