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
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Site\RouteConflicts;
use Sunrice\Cms\Support\Locales;

/**
 * Checks an entry's title, slug and fields and returns them as stored.
 * A slug is unique in the collection and language, and its page may not
 * be at a listing or index page's address (RouteConflicts::fixedSlugs()).
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
     * @param  bool  $main  whether it's the main language (another doesn't require the shared fields inside groups, rows and blocks: Schema::translationRules())
     * @param  string|null  $kept  the slug it has now (its draft's when saving the draft, its live one when publishing): kept,
     *                             it isn't checked against fixed addresses again, so a clash made before doesn't stop other changes
     * @return array{title: string, slug: string, data: array<string, mixed>}
     *
     * @throws ValidationException
     */
    public static function validate(Schema $schema, mixed $title, mixed $slug, array $data, int $collectionId, string $locale, ?int $except, bool $main = true, ?string $kept = null): array
    {
        // The slugs whose page would be at a listing or index page's address, matched first (RouteConflicts):
        // read only for a slug that changes or is made from the title.
        $fixed = is_string($slug) && $slug !== '' && $slug === $kept ? [] : self::fixedSlugs($collectionId, $locale);
        $rules = ['title' => ['required', 'string', 'max:255'], 'slug' => ['nullable', 'string', 'max:200', 'regex:'.self::SLUG], 'data' => ['array']]
            + ($main ? $schema->rules($data) : $schema->translationRules($data));
        $validator = Validator::make(
            ['title' => $title, 'slug' => $slug, 'data' => $data],
            $rules,
            ['slug.regex' => __('Use lowercase letters, digits and dashes (about-us).')],
            self::attributes($schema, array_keys($rules), data: $data),
        );
        $validator->after(function (ValidatorInstance $validator) use ($slug, $collectionId, $locale, $except, $fixed): void {
            if (! is_string($slug) || $slug === '') {
                return;
            }
            if (self::taken($slug, $collectionId, $locale, $except)) {
                $validator->errors()->add('slug', __('Another entry in this collection already uses ":slug".', ['slug' => $slug]));
            } elseif (isset($fixed[$slug])) {
                $validator->errors()->add('slug', self::fixedMessage($fixed[$slug], $locale));
            }
        });
        $validator->validate();

        // Validated as a string above.
        $title = is_string($title) ? trim($title) : '';
        $slug = is_string($slug) && $slug !== '' ? $slug : self::uniqueSlug($title, $collectionId, $locale, $except, $fixed);
        /** @var array<string, mixed> $normalized */
        $normalized = $schema->normalize($data);

        return ['title' => $title, 'slug' => $slug, 'data' => $normalized];
    }

    /**
     * Names for messages: "The Intro field is required", not "The data.intro field".
     * With `$locale`, each field's label in that language (Field::labelIn()).
     * Fields in rows and blocks ("data.sections.2.values.rows.0.price") are
     * named by their labels too, a block's fields read from its kind in `$data`.
     *
     * @param  list<string>  $keys
     * @param  array<mixed>  $data  the fields validated (under "data")
     * @return array<string, string>
     */
    public static function attributes(Schema $schema, array $keys, ?string $locale = null, array $data = []): array
    {
        $names = [];
        foreach ($keys as $key) {
            if (str_starts_with($key, 'data.')) {
                $path = substr($key, 5);
                // One of a field's several values ("photos.*", "photos.0") is named as the field.
                $field = $schema->fieldAt($path, $data);
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

    /**
     * The slugs an entry of a collection may not have in a language (RouteConflicts::fixedSlugs()).
     *
     * @return array<string, array{title: string, url: string}>
     */
    private static function fixedSlugs(int $collectionId, string $locale): array
    {
        $collection = Collection::query()->withTrashed()->find($collectionId);

        return $collection === null ? [] : RouteConflicts::fixedSlugs($collection, $locale);
    }

    /**
     * Why a slug is refused whose page would be at a fixed address.
     *
     * @param  array{title: string, url: string}  $page  what has the address, and the address
     */
    public static function fixedMessage(array $page, string $locale): string
    {
        return __('With this slug its URL would be :url, which :title has in :language already.', ['url' => $page['url'], 'title' => $page['title'], 'language' => Locales::name($locale)]);
    }

    /**
     * A slug made from the title, free in the collection and language and
     * clear of fixed addresses (`$fixed`).
     *
     * @param  array<string, mixed>  $fixed
     */
    private static function uniqueSlug(string $title, int $collectionId, string $locale, ?int $except, array $fixed = []): string
    {
        $base = Str::limit(Str::slug($title), 190, '') ?: 'entry';
        $base = trim($base, '-') ?: 'entry';
        $slug = $base;
        for ($i = 2; isset($fixed[$slug]) || self::taken($slug, $collectionId, $locale, $except); $i++) {
            $slug = "{$base}-{$i}";
        }

        return $slug;
    }
}
