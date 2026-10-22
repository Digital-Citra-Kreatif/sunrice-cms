<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Taxonomies;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Blueprints\SaveBlueprint;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Types\TermsField;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\RouteConflicts;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * The collections whose entries a taxonomy groups. A collection attached
 * gets a terms field for the taxonomy in each of its blueprints that has
 * none yet, so editors can choose terms on its entries: labelled with the
 * taxonomy's title, under its handle (or a free variant), several terms
 * allowed, saved like any blueprint change (SaveBlueprint). A collection
 * detached keeps that field, with what its entries chose, unless
 * `$removeFields` (then the field goes from blueprints no attached
 * collection still uses; the values stay stored, out of sight). A
 * collection attached whose term or index page (on by default) would
 * have a URL something else has is refused.
 *
 * @api
 */
final class AttachCollections
{
    public function __construct(private readonly SaveBlueprint $save) {}

    /**
     * @param  list<int>  $ids  the collections to attach, all of them
     * @param  bool  $checkRoutes  false when the caller checks the new attachments' URLs itself (with its own values for them)
     * @return array{added: list<string>, removed: list<string>, attached: list<int>} the blueprints (titles) given or relieved of a field, and the collections newly attached
     *
     * @throws ValidationException when a newly attached collection's term or index page (on by default) would have a URL something else has
     */
    public function handle(Taxonomy $taxonomy, array $ids, bool $removeFields = false, bool $checkRoutes = true): array
    {
        return DB::transaction(function () use ($taxonomy, $ids, $removeFields, $checkRoutes): array {
            $before = $taxonomy->collections()->pluck('sunrice_collections.id')->map(fn (mixed $id): int => is_numeric($id) ? (int) $id : 0)->all();
            $taxonomy->collections()->sync($ids);
            $attached = array_values(array_diff($ids, $before));
            $detached = array_values(array_diff($before, $ids));
            if ($attached !== [] || $detached !== []) {
                // Its terms have pages in collections it's attached to (CollectionTaxonomy::$term_pages, on for new ones).
                app(SiteCache::class)->changed('term pages');
            }
            if ($checkRoutes && $attached !== []) {
                self::checkRoutes($taxonomy, $attached);
            }

            $added = [];
            foreach (self::blueprintsOf($attached) as $blueprint) {
                if (self::fieldFor($blueprint, $taxonomy) === null) {
                    $fields = $blueprint->fields;
                    $fields[] = ['handle' => self::freeHandle($blueprint, $taxonomy->handle), 'type' => TermsField::TYPE, 'label' => $taxonomy->title,
                        'config' => ['taxonomy' => $taxonomy->handle, 'multiple' => true]];
                    $this->save->handle(['title' => $blueprint->title, 'fields' => $fields], $blueprint);
                    $added[] = $blueprint->title;
                }
            }

            $removed = [];
            if ($removeFields && $detached !== []) {
                $kept = array_map(fn (Blueprint $blueprint): string => $blueprint->handle, self::blueprintsOf($ids));
                foreach (self::blueprintsOf($detached) as $blueprint) {
                    $fields = array_values(array_filter($blueprint->fields, fn (array $field): bool => ! self::isFieldFor($field, $taxonomy)));
                    if (! in_array($blueprint->handle, $kept, true) && count($fields) !== count($blueprint->fields)) {
                        $this->save->handle(['title' => $blueprint->title, 'fields' => $fields], $blueprint);
                        $removed[] = $blueprint->title;
                    }
                }
            }

            return ['added' => $added, 'removed' => $removed, 'attached' => $attached];
        });
    }

    /**
     * Refuses newly attached collections whose term or index pages for
     * the taxonomy would have a URL something else has (RouteConflicts).
     *
     * @param  list<int>  $ids
     *
     * @throws ValidationException
     */
    private static function checkRoutes(Taxonomy $taxonomy, array $ids): void
    {
        foreach ($taxonomy->collections()->whereIn('sunrice_collections.id', $ids)->get() as $collection) {
            $pivot = $collection->getRelation('pivot');
            if ($pivot instanceof CollectionTaxonomy && ($clash = RouteConflicts::forAttachment($collection, $taxonomy, $pivot)) !== null) {
                throw ValidationException::withMessages(['collections' => __(':title has the URL :url in :language already.', ['title' => $clash['title'], 'url' => $clash['url'], 'language' => Locales::name($clash['locale'])])]);
            }
        }
    }

    /**
     * The blueprints with a terms field for the taxonomy (at any depth,
     * fieldsets included), with that field's handle: what the taxonomy's
     * form lists.
     *
     * @return list<array{blueprint: Blueprint, field: string}>
     */
    public static function blueprintsWithField(Taxonomy $taxonomy): array
    {
        $found = [];
        foreach (Blueprint::query()->orderBy('title')->get() as $blueprint) {
            if (($field = self::fieldFor($blueprint, $taxonomy)) !== null) {
                $found[] = ['blueprint' => $blueprint, 'field' => $field];
            }
        }

        return $found;
    }

    /**
     * @param  list<int>  $ids
     * @return list<Blueprint> the blueprints these collections' entries may use
     */
    private static function blueprintsOf(array $ids): array
    {
        if ($ids === []) {
            return [];
        }
        $handles = Collection::query()->whereIn('id', $ids)->get()->flatMap(fn (Collection $collection): array => $collection->allowedBlueprints())->unique()->values()->all();

        return array_values(Blueprint::query()->whereIn('handle', $handles)->orderBy('title')->get()->all());
    }

    /** The handle of the blueprint's terms field for the taxonomy, at any depth (fieldsets included); null without one. */
    private static function fieldFor(Blueprint $blueprint, Taxonomy $taxonomy): ?string
    {
        $find = function (array $fields, string $prefix) use (&$find, $taxonomy): ?string {
            foreach ($fields as $field) {
                if (! $field instanceof Field) {
                    continue;
                }
                if ($field->type === TermsField::TYPE && $field->configString('taxonomy') === $taxonomy->handle) {
                    return $prefix.$field->handle;
                }
                if (($inside = $find($field->fields, $prefix.$field->handle.'.')) !== null) {
                    return $inside;
                }
            }

            return null;
        };

        return $find($blueprint->schema()->fields(), '');
    }

    /** @param array<mixed> $field */
    private static function isFieldFor(array $field, Taxonomy $taxonomy): bool
    {
        return ($field['type'] ?? null) === TermsField::TYPE && is_array($field['config'] ?? null) && ($field['config']['taxonomy'] ?? null) === $taxonomy->handle;
    }

    /** The taxonomy's handle, or "{handle}_terms", "{handle}_terms_2"… when the blueprint uses it (or content keeps it). */
    private static function freeHandle(Blueprint $blueprint, string $handle): string
    {
        $taken = [...Blueprint::RESERVED, ...array_map(fn (Field $field): string => $field->handle, $blueprint->schema()->fields())];
        $free = $handle;
        for ($i = 1; in_array($free, $taken, true); $i++) {
            $free = $i === 1 ? "{$handle}_terms" : "{$handle}_terms_{$i}";
        }

        return $free;
    }
}
