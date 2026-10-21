<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Support\Str;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Support\FieldText;
use Sunrice\Cms\Support\Seo;

/**
 * The entry editor's revisions: who published each one and what it
 * changed from the one before, and one compared with the draft.
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
        $out = [];
        foreach (array_slice($revisions, 0, $limit) as $index => $revision) {
            $before = $revisions[$index + 1] ?? null;
            $out[] = [
                'id' => $revision->id,
                'title' => $revision->title,
                'createdAt' => $revision->created_at?->toIso8601String(),
                'author' => $revision->user_id === null ? null : ($authors[$revision->user_id] ?? null),
                // The oldest kept: the first published (or older ones were pruned), nothing to compare with.
                'changed' => $before === null ? null : self::changed(self::values($before), self::values($revision), $labels),
            ];
        }

        return $out;
    }

    /**
     * The fields where a revision and the translation's draft differ, as text.
     *
     * @return list<array{label: string, revision: string, draft: string}>
     */
    public static function compare(Revision $revision): array
    {
        $translation = $revision->translation;
        $labels = self::labels($translation);
        $schema = $translation->entry->schema();
        $old = self::values($revision);
        $new = ['title' => $translation->draft_title, 'slug' => $translation->draft_slug] + $translation->draft_data;
        $out = [];
        foreach (self::changedKeys($old, $new, $labels) as $key) {
            $field = in_array($key, ['title', 'slug', Seo::KEY], true) ? null : $schema->field($key);
            $out[] = ['label' => $labels[$key], 'revision' => self::text($old[$key] ?? null, $field), 'draft' => self::text($new[$key] ?? null, $field)];
        }

        return $out;
    }

    /** @return array<string, mixed> */
    private static function values(Revision $revision): array
    {
        return ['title' => $revision->title, 'slug' => $revision->slug] + $revision->data;
    }

    /**
     * What's compared, in the editor's order, with its label.
     *
     * @return array<string, string>
     */
    private static function labels(EntryTranslation $translation): array
    {
        $labels = ['title' => 'Title', 'slug' => 'Slug'];
        foreach ($translation->entry->schema()->fields() as $field) {
            $labels[$field->handle] = FieldText::label($field);
        }

        return $labels + [Seo::KEY => 'Search and sharing'];
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

    private static function text(mixed $value, ?Field $field): string
    {
        $text = $field?->type === 'rich_text' && is_string($value) ? strip_tags($value) : FieldText::text($value, $field);

        return Str::limit(trim(html_entity_decode($text)), 1000);
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
