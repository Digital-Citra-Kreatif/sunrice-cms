<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Saves the draft of an entry translation; the site keeps showing what
 * was published. Input: title, slug, data and version. Fields left out of
 * data keep their values. With version (the one the editor opened), a
 * save over someone else's newer one is refused.
 *
 * @api
 */
final class SaveDraft
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(EntryTranslation $translation, array $input): EntryTranslation
    {
        $schema = $translation->entry->collection->schema();
        $data = EntryInput::merge($schema, $translation->draft_data, $input['data'] ?? null);
        $values = EntryInput::validate(
            $schema,
            array_key_exists('title', $input) ? $input['title'] : $translation->draft_title,
            array_key_exists('slug', $input) ? $input['slug'] : $translation->draft_slug,
            $data,
            $translation->collection_id,
            $translation->locale,
            $translation->id,
        );
        $expected = $input['version'] ?? $translation->version;
        if (! is_int($expected) && ! (is_string($expected) && ctype_digit($expected))) {
            throw ValidationException::withMessages(['version' => 'The version must be a number.']);
        }

        $changed = array_keys(array_filter([
            'title' => $values['title'] !== $translation->draft_title,
            'slug' => $values['slug'] !== $translation->draft_slug,
        ]));
        foreach ($values['data'] as $handle => $value) {
            if (! array_key_exists($handle, $translation->draft_data) || $translation->draft_data[$handle] != $value) {
                $changed[] = $handle;
            }
        }
        if ($changed === []) {
            return $translation;
        }

        // Only if nobody saved in between: the version check and the write are one statement.
        $saved = EntryTranslation::query()->whereKey($translation->id)->where('version', (int) $expected)->update([
            'draft_title' => $values['title'],
            'draft_slug' => $values['slug'],
            'draft_data' => json_encode($values['data'], JSON_THROW_ON_ERROR),
            'version' => (int) $expected + 1,
            'updated_at' => now(),
        ]);
        if ($saved === 0) {
            throw ValidationException::withMessages(['version' => 'Someone else saved this entry after you opened it. Reload to see their changes.']);
        }
        $translation->refresh();
        $this->activity->updated('entry', $translation->entry, $values['title'], $changed);

        return $translation;
    }
}
