<?php

declare(strict_types=1);

namespace Sunrice\Mcp;

use Sunrice\Frontend\UrlGenerator;
use Sunrice\Models\Asset;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Term;
use Sunrice\Models\TermTranslation;
use Sunrice\Support\Locales;

/**
 * Plain arrays of Sunrice content for AI agents.
 */
class Presenter
{
    /** @return array<string, mixed> */
    public static function collection(Collection $collection): array
    {
        return [
            'id' => $collection->id,
            'handle' => $collection->handle,
            'title' => $collection->title,
            'blueprint' => $collection->blueprint?->handle,
            'entry_url_pattern' => $collection->hasSinglePages() ? $collection->entryRoute() : null,
            'hierarchical' => $collection->isHierarchical(),
            'taxonomies' => $collection->taxonomies->pluck('handle')->values()->all(),
            'settings' => $collection->settings ?? [],
        ];
    }

    /**
     * One line per entry for lists.
     *
     * @return array<string, mixed>
     */
    public static function entrySummary(Entry $entry): array
    {
        $main = $entry->translations->firstWhere('locale', Locales::main());

        return [
            'id' => $entry->id,
            'title' => $main?->title,
            'slug' => $main?->slug,
            'status' => static::status($entry),
            'published_at' => $entry->published_at?->toIso8601String(),
            'parent_id' => $entry->parent_id,
            'url' => $entry->trashed() ? null : app(UrlGenerator::class)->entryUrl($entry, Locales::main()),
            'has_unpublished_changes' => $main?->draft !== null,
            'languages' => $entry->translations->pluck('locale')->values()->all(),
            'updated_at' => $entry->updated_at?->toIso8601String(),
        ];
    }

    /**
     * Everything about an entry: each language's live and draft content.
     *
     * @return array<string, mixed>
     */
    public static function entry(Entry $entry): array
    {
        $entry->loadMissing(['translations', 'terms.translations', 'collection', 'blueprint']);
        $blueprint = $entry->activeBlueprint();
        $main = $entry->mainTranslation();
        $mainDraftData = (array) ($main->draft['data'] ?? $main->data ?? []);

        $translations = [];
        foreach ($entry->translations as $t) {
            $translations[$t->locale] = [
                'title' => $t->title,
                'slug' => $t->slug,
                'ready' => (bool) $t->is_ready,
                'url' => app(UrlGenerator::class)->translationUrl($entry, $t),
                // Secondary languages store only translated values: shown merged with the main layout.
                'data' => $entry->dataFor($t),
                'seo' => $t->seo ?? [],
                'draft' => $t->draft === null ? null : [
                    'title' => $t->draft['title'] ?? null,
                    'slug' => $t->draft['slug'] ?? null,
                    'data' => $entry->dataFor($t, (array) ($t->draft['data'] ?? []), $mainDraftData),
                    'seo' => $t->draft['seo'] ?? [],
                ],
                'outdated' => ! Locales::isMain($t->locale) && $t->isOutdated(),
            ];
        }

        return [
            'id' => $entry->id,
            'collection' => $entry->collection?->handle,
            'blueprint' => $blueprint?->handle,
            'status' => static::status($entry),
            'published_at' => $entry->published_at?->toIso8601String(),
            'parent_id' => $entry->parent_id,
            'template' => $entry->template,
            'author_id' => $entry->author_id,
            'terms' => $entry->terms->map(fn (Term $term) => [
                'id' => $term->id,
                'taxonomy_id' => $term->taxonomy_id,
                'name' => $term->translations->firstWhere('locale', Locales::main())?->name,
            ])->values()->all(),
            'fields' => $blueprint === null ? [] : static::fields($blueprint->schema()->fields()),
            'translations' => $translations,
            'missing_languages' => array_values(array_diff(Locales::available(), array_keys($translations))),
        ];
    }

    /**
     * Field definitions without builder noise.
     *
     * @param  array<int, array<string, mixed>>  $fields
     * @return array<int, array<string, mixed>>
     */
    public static function fields(array $fields): array
    {
        return array_map(fn (array $f) => array_filter([
            'handle' => $f['handle'] ?? null,
            'type' => $f['type'] ?? null,
            'label' => $f['label'] ?? null,
            'required' => $f['required'] ?? null,
            'instructions' => $f['instructions'] ?? null,
            'translatable' => $f['translatable'] ?? null,
            'config' => isset($f['config']['fields']) && is_array($f['config']['fields'])
                ? ['fields' => static::fields($f['config']['fields'])] + $f['config']
                : ($f['config'] ?? null),
        ], fn ($v) => $v !== null && $v !== []), $fields);
    }

    /** @return array<string, mixed> */
    public static function term(Term $term): array
    {
        return [
            'id' => $term->id,
            'parent_id' => $term->parent_id,
            'template' => $term->template,
            // Other languages: the main language's values with their translated text laid over.
            'translations' => $term->translations->mapWithKeys(fn (TermTranslation $t) => [$t->locale => [
                'name' => $t->name,
                'slug' => $t->slug,
                'data' => $term->dataFor($t),
                'seo' => $t->seo ?? [],
                'is_ready' => Locales::isMain($t->locale) || $t->is_ready,
            ]])->all(),
        ];
    }

    /** @return array<string, mixed> */
    public static function asset(Asset $asset): array
    {
        return [
            'id' => $asset->id,
            'filename' => $asset->filename,
            'title' => $asset->title,
            'alt' => $asset->alt,
            'caption' => $asset->caption,
            'mime_type' => $asset->mime_type,
            'size' => $asset->size,
            'width' => $asset->width,
            'height' => $asset->height,
            'url' => $asset->url(),
        ];
    }

    public static function status(Entry $entry): string
    {
        return match (true) {
            $entry->trashed() => 'trashed',
            $entry->status === 'published' && $entry->published_at?->isFuture() === true => 'scheduled',
            default => $entry->status,
        };
    }

    /**
     * Draft data for a translation as the editor shows it (merged).
     *
     * @return array<string, mixed>
     */
    public static function draftData(Entry $entry, EntryTranslation $translation): array
    {
        $main = $entry->mainTranslation();
        $mainData = (array) ($main->draft['data'] ?? $main->data ?? []);

        return $entry->dataFor($translation, (array) ($translation->draft['data'] ?? $translation->data ?? []), $mainData);
    }
}
