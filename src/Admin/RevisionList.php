<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Support\Str;
use Sunrice\Admin\Media\Media;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\FieldText;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

/**
 * The entry editor's revisions: who published each one and what it
 * changed from the one before, and one (or the live version) compared
 * with the draft.
 *
 * @internal
 */
final class RevisionList
{
    /**
     * The latest revisions; `changed` is null for the first one published.
     *
     * @return list<array{id: int, title: string, createdAt: string|null, author: string|null, changed: list<string>|null}>
     */
    public static function summaries(EntryTranslation $translation, int $limit = 20): array
    {
        // One more, to tell what the oldest shown changed.
        $revisions = array_values($translation->revisions()->limit($limit + 1)->get()->all());
        $authors = self::authors($revisions);
        $labels = self::labels($translation);
        // The terms they were published with, read once.
        $terms = self::terms($translation, array_merge(...array_map(fn (Revision $revision): array => $revision->terms ?? [], $revisions)));
        $out = [];
        foreach (array_slice($revisions, 0, $limit) as $index => $revision) {
            $before = $revisions[$index + 1] ?? null;
            $out[] = [
                'id' => $revision->id,
                'title' => $revision->title,
                'createdAt' => $revision->created_at?->toIso8601String(),
                'author' => $revision->user_id === null ? null : ($authors[$revision->user_id] ?? null),
                // The oldest kept: the first published (or older ones were pruned), nothing to compare with.
                'changed' => $before === null ? null : [
                    ...self::changed(self::values($before->title, $before->slug, $before->data), self::values($revision->title, $revision->slug, $revision->data), $labels),
                    ...($before->terms !== null && $revision->terms !== null ? array_column($terms->compare($before->terms, $revision->terms), 'label') : []),
                ],
            ];
        }

        return $out;
    }

    /**
     * When the live version was published and by whom: the latest
     * revision's (publishing keeps one each time), else the publish date.
     *
     * @return array{publishedAt: string|null, by: string|null}
     */
    public static function live(EntryTranslation $translation): array
    {
        $revision = $translation->revisions()->first();
        if ($revision === null) {
            return ['publishedAt' => $translation->published_at?->toIso8601String(), 'by' => null];
        }

        return [
            'publishedAt' => $revision->created_at?->toIso8601String(),
            'by' => $revision->user_id === null ? null : (self::authors([$revision])[$revision->user_id] ?? null),
        ];
    }

    /** The SEO card's settings, compared one by one, with the editor's labels (lib/seo.ts). */
    private const SEO = ['title' => 'Meta title', 'description' => 'Meta description', 'canonical' => 'Canonical URL', 'image' => 'Open Graph image', 'noindex' => 'Hide from search engines (noindex)'];

    /**
     * The fields where a revision and the translation's draft differ, as an
     * editor reads them: links as their address, entries and terms by title,
     * media by file name, rows and groups as "Label: value" lines (as the
     * CSV export), SEO setting by setting; never JSON.
     *
     * @return list<array{label: string, revision: string, draft: string}>
     */
    public static function compare(Revision $revision): array
    {
        $translation = $revision->translation;
        $terms = [];
        if ($revision->terms !== null) {
            $draft = $translation->entry->draftTermIds();
            $terms = self::terms($translation, [...$revision->terms, ...$draft])->compare($revision->terms, $draft);
        }

        return array_map(fn (array $field): array => ['label' => $field['label'], 'revision' => $field['old'], 'draft' => $field['new']],
            [...self::against($translation, $revision->title, $revision->slug, $revision->data), ...$terms]);
    }

    /**
     * The fields where the live version (what visitors see) and the draft
     * (the unpublished changes) differ, in words as compare() gives them.
     *
     * @return list<array{label: string, live: string, draft: string}>
     */
    public static function compareLive(EntryTranslation $translation): array
    {
        return array_map(fn (array $field): array => ['label' => $field['label'], 'live' => $field['old'], 'draft' => $field['new']],
            [...self::against($translation, $translation->title, $translation->slug, $translation->data), ...self::termsFromLive($translation)]);
    }

    /**
     * Which of the editor's values the draft changed from the live version:
     * "title", "slug", field handles, SEO settings ("seo.title") and the
     * entry's terms of a taxonomy ("terms.topics"), each compared as
     * compare() does (empty values alike, objects whatever their key
     * order). For the editor's "Changed" markers.
     *
     * @return list<string>
     */
    public static function changedFromLive(EntryTranslation $translation): array
    {
        if ($translation->title === null) {
            return [];
        }

        return [...self::changedKeys(self::values($translation->title, $translation->slug, $translation->data),
            self::values($translation->draft_title, $translation->draft_slug, $translation->draft_data), self::labels($translation)),
            ...array_column(self::termsFromLive($translation), 'key')];
    }

    /**
     * The taxonomies whose terms the entry chose and didn't publish yet, as compare() gives fields.
     *
     * @return list<array{key: string, label: string, old: string, new: string}>
     */
    private static function termsFromLive(EntryTranslation $translation): array
    {
        $entry = $translation->entry;
        if (! $entry->hasUnpublishedTerms()) {
            return [];
        }
        $live = $entry->liveTermIds();
        $draft = $entry->draftTermIds();

        return self::terms($translation, [...$live, ...$draft])->compare($live, $draft);
    }

    /**
     * The taxonomies attached to the entry's collection and these terms, read once, to compare terms by taxonomy.
     *
     * @param  list<int>  $ids
     */
    private static function terms(EntryTranslation $translation, array $ids): TermsCompared
    {
        return new TermsCompared($translation->entry->collection->taxonomies()->orderBy('title')->get(),
            $ids === [] ? [] : array_values(Term::withTrashed()->with('translations')->whereKey(array_values(array_unique($ids)))->get()->all()), $translation->locale);
    }

    /**
     * The fields where the given version and the translation's draft differ.
     *
     * @param  array<string, mixed>|null  $oldData
     * @return list<array{label: string, old: string, new: string}>
     */
    private static function against(EntryTranslation $translation, ?string $title, ?string $slug, ?array $oldData): array
    {
        $labels = self::labels($translation);
        $schema = $translation->entry->schema();
        $newData = $translation->draft_data;
        $old = self::values($title, $slug, $oldData);
        $new = self::values($translation->draft_title, $translation->draft_slug, $newData);
        $keys = self::changedKeys($old, $new, $labels);
        $words = self::words($schema, [$oldData, $newData], $translation->locale);
        $out = [];
        foreach ($keys as $key) {
            $out[] = ['label' => $labels[$key], 'old' => self::text($key, $old[$key] ?? null, $schema, $words), 'new' => self::text($key, $new[$key] ?? null, $schema, $words)];
        }

        return $out;
    }

    /**
     * What's compared: the title, the slug, each field, and each SEO setting ("seo.title").
     *
     * @param  array<string, mixed>|null  $data
     * @return array<string, mixed>
     */
    private static function values(?string $title, ?string $slug, ?array $data): array
    {
        $data ??= [];
        $seo = is_array($data[Seo::KEY] ?? null) ? $data[Seo::KEY] : [];
        unset($data[Seo::KEY]);
        $values = ['title' => $title, 'slug' => $slug] + $data;
        foreach (array_keys(self::SEO) as $setting) {
            $values[Seo::KEY.'.'.$setting] = $seo[$setting] ?? null;
        }

        return $values;
    }

    /**
     * What the values point at, read once: linked entries' and terms' titles, files' names.
     *
     * @param  list<array<string, mixed>|null>  $data
     */
    private static function words(Schema $schema, array $data, string $locale): ExportText
    {
        $ids = [Reference::ENTRY => [], Reference::TERM => [], Reference::MEDIA => []];
        foreach ($data as $values) {
            foreach ($schema->references($values ?? []) as $reference) {
                $ids[$reference->type][$reference->id] = $reference->id;
            }
            $image = is_array($values[Seo::KEY] ?? null) ? ($values[Seo::KEY]['image'] ?? null) : null;
            if (is_int($image)) {
                $ids[Reference::MEDIA][$image] = $image;
            }
        }
        $entries = [];
        if ($ids[Reference::ENTRY] !== []) {
            foreach (EntryTranslation::query()->whereIn('entry_id', array_values($ids[Reference::ENTRY]))->whereIn('locale', array_unique([$locale, Locales::default()]))->get(['entry_id', 'locale', 'draft_title']) as $row) {
                if ($row->locale === $locale || ! isset($entries[$row->entry_id])) {
                    $entries[$row->entry_id] = (string) $row->draft_title;
                }
            }
        }
        $terms = [];
        foreach ($ids[Reference::TERM] === [] ? [] : Term::withTrashed()->with('translations')->whereKey(array_values($ids[Reference::TERM]))->get() as $term) {
            $terms[$term->id] = $term->title($locale);
        }
        $media = [];
        foreach ($ids[Reference::MEDIA] === [] ? [] : Media::withTrashed()->whereKey(array_values($ids[Reference::MEDIA]))->get(['id', 'filename']) as $file) {
            $media[$file->id] = $file->filename;
        }

        return new ExportText($entries, $terms, new HydrationContext($locale), $media);
    }

    /**
     * What's compared, in the editor's order, with its label.
     *
     * @return array<string, string>
     */
    private static function labels(EntryTranslation $translation): array
    {
        $labels = ['title' => self::say('Title'), 'slug' => self::say('Slug')];
        foreach ($translation->entry->schema()->fields() as $field) {
            $labels[$field->handle] = FieldText::label($field);
        }
        foreach (self::SEO as $setting => $label) {
            $labels[Seo::KEY.'.'.$setting] = self::say($label);
        }

        return $labels;
    }

    /**
     * @param  array<string, mixed>  $old
     * @param  array<string, mixed>  $new
     * @param  array<string, string>  $labels
     * @return list<string>
     */
    private static function changed(array $old, array $new, array $labels): array
    {
        return array_map(fn (string $key): string => $labels[$key], self::changedKeys($old, $new, $labels));
    }

    /**
     * @param  array<string, mixed>  $old
     * @param  array<string, mixed>  $new
     * @param  array<string, string>  $labels
     * @return list<string>
     */
    private static function changedKeys(array $old, array $new, array $labels): array
    {
        $keys = [];
        foreach (array_keys($labels) as $key) {
            if (self::normal($old[$key] ?? null) !== self::normal($new[$key] ?? null)) {
                $keys[] = $key;
            }
        }

        return $keys;
    }

    /** A value to compare: empty ones alike, objects whatever their key order. */
    private static function normal(mixed $value): string
    {
        if ($value === null || $value === '' || $value === [] || $value === false) {
            return '';
        }
        if (is_array($value) && ! array_is_list($value)) {
            ksort($value);
        }

        return (string) json_encode($value, JSON_UNESCAPED_UNICODE);
    }

    private static function text(string $key, mixed $value, Schema $schema, ExportText $words): string
    {
        $text = match (true) {
            $key === 'title' || $key === 'slug' => FieldText::text($value),
            $key === Seo::KEY.'.noindex' => FieldText::text($value === true),
            $key === Seo::KEY.'.image' => $words->files($value),
            str_starts_with($key, Seo::KEY.'.') => FieldText::text($value),
            ($field = $schema->field($key)) !== null => $words->text($value, $field, $schema),
            default => FieldText::text($value),
        };

        return Str::limit(trim($text), 1000);
    }

    private static function say(string $words): string
    {
        $said = __($words);

        return is_string($said) ? $said : $words;
    }

    /**
     * @param  list<Revision>  $revisions
     * @return array<int, string>
     */
    private static function authors(array $revisions): array
    {
        $ids = array_values(array_unique(array_filter(array_map(fn (Revision $revision): ?int => $revision->user_id, $revisions))));
        if ($ids === []) {
            return [];
        }
        $class = app(Panel::class)->getUserModel();
        $names = [];
        foreach ((new $class)->newQuery()->whereKey($ids)->get() as $user) {
            $key = $user->getKey();
            $name = $user->getAttribute('name');
            $email = $user->getAttribute('email');
            if (is_int($key) || (is_string($key) && ctype_digit($key))) {
                $names[(int) $key] = is_string($name) && $name !== '' ? $name : (is_string($email) ? $email : '#'.$key);
            }
        }

        return $names;
    }
}
