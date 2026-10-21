<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Adds a language to an entry: a draft copied from the main translation,
 * to translate and publish on its own. Its slug stays the main one's
 * (slugs are unique per language) until changed.
 *
 * @api
 */
final class CreateTranslation
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(Entry $entry, string $locale): EntryTranslation
    {
        if (! Locales::has($locale)) {
            throw ValidationException::withMessages(['locale' => __('Choose one of the site\'s languages: :languages.', ['languages' => implode(', ', Locales::all())])]);
        }
        if (! $entry->collection->translatable) {
            throw ValidationException::withMessages(['locale' => __(':title isn\'t translatable: its entries are in the main language only.', ['title' => $entry->collection->title])]);
        }
        if ($entry->trashed()) {
            throw ValidationException::withMessages(['entry' => __('This entry is in the trash; restore it first.')]);
        }
        $entry->loadMissing('translations');
        if ($entry->translation($locale) !== null) {
            throw ValidationException::withMessages(['locale' => __('The entry already has this language.')]);
        }
        $main = $entry->mainTranslation() ?? throw ValidationException::withMessages(['entry' => __('The entry has no translation to copy.')]);

        // The slug check and the write in one transaction: see EntryInput::write().
        $translation = EntryInput::write(function () use ($entry, $main, $locale): EntryTranslation {
            $slug = $main->draft_slug;
            for ($i = 2; EntryInput::taken($slug, $main->collection_id, $locale, null); $i++) {
                $slug = "{$main->draft_slug}-{$i}";
            }

            return $entry->translations()->create([
                'collection_id' => $main->collection_id,
                'locale' => $locale,
                'draft_title' => $main->draft_title,
                'draft_slug' => $slug,
                // Only the translated fields: the shared ones (in rows and blocks too) stay the main translation's.
                'draft_data' => $entry->schema()->withoutShared($main->draft_data, $main->draft_data),
                // Up to date with the main language until that changes.
                'main_version' => $main->version,
            ]);
        });
        $entry->unsetRelation('translations');
        $this->activity->record('translated', 'entry', $entry, $main->draft_title, ['locale' => $locale]);

        return $translation;
    }
}
