<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\MediaUsage;
use Sunrice\Cms\Support\References;
use Sunrice\Cms\Support\Seo;

/**
 * Saves the draft of an entry translation; the site keeps showing what
 * was published. Input: title, slug, data, version and terms (the
 * entry's, every language's: taxonomy handle => term ids or slugs, see
 * SaveEntryTerms). Fields left out of data, and taxonomies left out of
 * terms, keep their values. With version (the one the editor opened), a
 * save over someone else's newer one is refused.
 *
 * @api
 */
final class SaveDraft
{
    public function __construct(private readonly ActivityLog $activity, private readonly SaveEntryTerms $terms) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(EntryTranslation $translation, array $input): EntryTranslation
    {
        $expected = $input['version'] ?? $translation->version;
        if (! is_int($expected) && ! (is_string($expected) && ctype_digit($expected))) {
            throw ValidationException::withMessages(['version' => __('The version must be a number.')]);
        }

        // The slug check and the write in one transaction: see EntryInput::write().
        $changed = EntryInput::write(function () use ($translation, $input, $expected): array {
            // Another language than the main one leaves the shared fields alone.
            $schema = $translation->editableSchema();
            $data = EntryInput::merge($schema, $translation->draft_data, $input['data'] ?? null);
            // Validated with the main language's shared values in rows and blocks; ownData() drops them again.
            $main = $translation->entry->mainTranslation();
            if ($main !== null && ! $main->is($translation)) {
                $data = $translation->entry->schema()->withShared($data, $main->draft_data);
            }
            $values = EntryInput::validate(
                $schema,
                array_key_exists('title', $input) ? $input['title'] : $translation->draft_title,
                array_key_exists('slug', $input) ? $input['slug'] : $translation->draft_slug,
                $data,
                $translation->collection_id,
                $translation->locale,
                $translation->id,
            );
            if (array_key_exists(Seo::KEY, $input)) {
                $values['data'][Seo::KEY] = Seo::validate($input[Seo::KEY]);
            }
            if (array_key_exists('terms', $input) && $input['terms'] !== null && ! is_array($input['terms'])) {
                throw ValidationException::withMessages(['terms' => __('Give the terms by taxonomy handle.')]);
            }
            // Shared fields copied into another language's draft before would go stale: drop them.
            $values['data'] = $translation->ownData($values['data']);

            $changed = array_keys(array_filter([
                'title' => $values['title'] !== $translation->draft_title,
                'slug' => $values['slug'] !== $translation->draft_slug,
            ]));
            foreach ($values['data'] as $handle => $value) {
                if (! array_key_exists($handle, $translation->draft_data) || $translation->draft_data[$handle] != $value) {
                    $changed[] = $handle;
                }
            }
            // The entry's terms (rolled back with the rest when the version check fails).
            if (is_array($input['terms'] ?? null) && $this->terms->handle($translation->entry, $input['terms'])) {
                $changed[] = 'terms';
            }
            if ($changed === []) {
                return [];
            }

            // Another language is up to date with the main one as it is now (EntryTranslation::isOutdated()).
            $mainVersion = $translation->currentMainVersion();
            // Only if nobody saved in between: the version check and the write are one statement.
            $saved = EntryTranslation::query()->whereKey($translation->id)->where('version', (int) $expected)->update([
                'draft_title' => $values['title'],
                'draft_slug' => $values['slug'],
                'draft_data' => json_encode($values['data'], JSON_THROW_ON_ERROR),
                'version' => (int) $expected + 1,
                'updated_at' => now(),
            ] + ($mainVersion === null ? [] : ['main_version' => $mainVersion]));
            if ($saved === 0) {
                throw ValidationException::withMessages(['version' => __('Someone else saved this entry after you opened it. Reload to see their changes.')]);
            }

            return $changed;
        });
        if ($changed === []) {
            return $translation;
        }
        $translation->refresh();
        // A query update fires no model events: keep the media library's and the references' "Used by" here.
        MediaUsage::entry($translation);
        References::entry($translation);
        $this->activity->updated('entry', $translation->entry, $translation->draft_title, $changed);

        return $translation;
    }
}
