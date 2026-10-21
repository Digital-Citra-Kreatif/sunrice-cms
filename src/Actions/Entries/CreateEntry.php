<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

/**
 * Creates an entry as a draft. Input: title, slug (made from the title
 * when empty), data (the blueprint's fields), locale (the main language
 * when left out) and parent_id (in a hierarchical collection; see
 * SaveEntrySettings::parent()). The signed-in user is its author.
 *
 * @api
 */
final class CreateEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(Collection $collection, array $input): EntryTranslation
    {
        if ($collection->trashed()) {
            throw ValidationException::withMessages(['collection' => "The collection \"{$collection->title}\" was deleted."]);
        }
        $locale = $input['locale'] ?? Locales::default();
        if (! is_string($locale) || ! Locales::has($locale)) {
            throw ValidationException::withMessages(['locale' => 'Choose one of the site\'s languages: '.implode(', ', Locales::all()).'.']);
        }
        $schema = $collection->schema();
        $data = EntryInput::merge($schema, $schema->defaults(), $input['data'] ?? null);

        // The slug check and the write in one transaction: see EntryInput::write().
        $translation = EntryInput::write(function () use ($collection, $locale, $schema, $input, $data): EntryTranslation {
            $values = EntryInput::validate($schema, $input['title'] ?? null, $input['slug'] ?? null, $data, $collection->id, $locale, null);
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

            return $entry->translations()->create([
                'collection_id' => $collection->id,
                'locale' => $locale,
                'draft_title' => $values['title'],
                'draft_slug' => $values['slug'],
                'draft_data' => $values['data'],
            ]);
        });
        $this->activity->record('created', 'entry', $translation->entry_id, $translation->draft_title, ['collection' => $collection->handle, 'locale' => $locale]);

        return $translation;
    }
}
