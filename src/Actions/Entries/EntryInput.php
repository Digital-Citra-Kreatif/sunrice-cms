<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator as ValidatorInstance;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Checks an entry's title, slug and fields and returns them as stored.
 * Shared by CreateEntry, SaveDraft and PublishEntry, which validate and
 * write inside write(): the slug check locks the translations it looks
 * at until the write is done, and a slug taken in between by a save the
 * lock couldn't hold off is refused instead of crashing.
 *
 * @internal
 */
final class EntryInput
{
    public const SLUG = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';

    /**
     * @param  array<mixed>  $data  the fields, complete (stored values merged with the input)
     * @param  int|null  $except  the translation being saved, whose own slug doesn't count as taken
     * @return array{title: string, slug: string, data: array<string, mixed>}
     *
     * @throws ValidationException
     */
    public static function validate(Schema $schema, mixed $title, mixed $slug, array $data, int $collectionId, string $locale, ?int $except): array
    {
        $rules = ['title' => ['required', 'string', 'max:255'], 'slug' => ['nullable', 'string', 'max:200', 'regex:'.self::SLUG], 'data' => ['array']] + $schema->rules($data);
        $validator = Validator::make(
            ['title' => $title, 'slug' => $slug, 'data' => $data],
            $rules,
            ['slug.regex' => __('Use lowercase letters, digits and dashes (about-us).')],
            self::attributes($schema, array_keys($rules)),
        );
        $validator->after(function (ValidatorInstance $validator) use ($slug, $collectionId, $locale, $except): void {
            if (is_string($slug) && $slug !== '' && self::taken($slug, $collectionId, $locale, $except)) {
                $validator->errors()->add('slug', __('Another entry in this collection already uses ":slug".', ['slug' => $slug]));
            }
        });
        $validator->validate();

        // Validated as a string above.
        $title = is_string($title) ? trim($title) : '';
        $slug = is_string($slug) && $slug !== '' ? $slug : self::uniqueSlug($title, $collectionId, $locale, $except);
        /** @var array<string, mixed> $normalized */
        $normalized = $schema->normalize($data);

        return ['title' => $title, 'slug' => $slug, 'data' => $normalized];
    }

    /**
     * Names for messages: "The Intro field is required", not "The data.intro field".
     * With `$locale`, each field's label in that language (Field::labelIn()).
     *
     * @param  list<string>  $keys
     * @return array<string, string>
     */
    public static function attributes(Schema $schema, array $keys, ?string $locale = null): array
    {
        $names = [];
        foreach ($keys as $key) {
            if (str_starts_with($key, 'data.')) {
                $path = substr($key, 5);
                $field = $schema->field($path);
                $names[$key] = $field !== null && $locale !== null ? $field->labelIn($locale) : ($field?->label ?: Str::headline((string) Str::afterLast($path, '.')));
            }
        }

        return $names;
    }

    /**
     * Only the fields the schema has: unknown handles in input aren't stored.
     *
     * @param  array<string, mixed>  $stored
     * @return array<mixed>
     */
    public static function merge(Schema $schema, array $stored, mixed $input): array
    {
        if (! is_array($input)) {
            return $stored;
        }
        $handles = array_flip(array_map(fn ($field): string => $field->handle, $schema->fields()));

        return array_replace($stored, array_intersect_key($input, $handles));
    }

    /**
     * Runs a write that may take a slug, in a transaction. The slug checks
     * in it lock what they find until it commits (where the driver can);
     * a slug the unique index refuses anyway is a validation error.
     *
     * @template T
     *
     * @param  \Closure(): T  $write
     * @return T
     *
     * @throws ValidationException
     */
    public static function write(\Closure $write): mixed
    {
        try {
            return DB::transaction($write);
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['slug' => __('This slug is already used. Choose another one.')]);
        }
    }

    /**
     * Whether another translation in the collection and language has the
     * slug, live or in its draft (trashed entries count). In a transaction
     * the rows it finds stay locked until it ends, so two saves can't take
     * the same slug at once (SQLite has no row locks; there the unique
     * index on live slugs has the last word, see write()).
     */
    public static function taken(string $slug, int $collectionId, string $locale, ?int $except): bool
    {
        return EntryTranslation::query()
            ->where('collection_id', $collectionId)
            ->where('locale', $locale)
            ->when($except !== null, fn ($query) => $query->whereKeyNot($except))
            ->where(fn ($query) => $query->where('slug', $slug)->orWhere('draft_slug', $slug))
            ->lockForUpdate()
            ->exists();
    }

    private static function uniqueSlug(string $title, int $collectionId, string $locale, ?int $except): string
    {
        $base = Str::limit(Str::slug($title), 190, '') ?: 'entry';
        $base = trim($base, '-') ?: 'entry';
        $slug = $base;
        for ($i = 2; self::taken($slug, $collectionId, $locale, $except); $i++) {
            $slug = "{$base}-{$i}";
        }

        return $slug;
    }
}
