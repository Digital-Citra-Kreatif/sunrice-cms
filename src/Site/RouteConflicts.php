<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Whether something else has a URL pattern in a language already: another
 * collection (or taxonomy) of the same kind, its own there, else its main
 * one; for entry and term page patterns also the other kind's, and
 * taxonomies' term pages in collections (/books/tags/{slug}). Two of them
 * with the same pattern in a language would share its addresses.
 *
 * @internal
 */
final class RouteConflicts
{
    /** The title of what else has the pattern in the language, or null. */
    public static function find(Collection|Taxonomy $record, string $attribute, string $locale, string $pattern): ?string
    {
        // Deleted ones too: they take their addresses back when restored.
        $query = $record->newQueryWithoutScopes();
        if ($record->exists) {
            $query->whereKeyNot($record->getKey());
        }
        foreach ($query->whereNotNull($attribute)->get() as $other) {
            if ($other->routeIn($locale, $attribute) === $pattern) {
                return $other->title;
            }
        }
        if ($attribute !== 'route') {
            return null;
        }
        // Entries' and shared term pages' patterns against each other, and both against collections' term pages.
        $others = $record instanceof Collection ? Taxonomy::query()->withTrashed() : Collection::query()->withTrashed();
        foreach ($others->whereNotNull('route')->get() as $other) {
            if ($other->routeIn($locale) === $pattern) {
                return $other->title;
            }
        }

        return self::termPages($locale, $pattern);
    }

    /**
     * What else has a pattern for a taxonomy's term pages in a collection
     * in a language: entries' and shared term pages' patterns, and other
     * collections' term pages.
     */
    public static function forTermPages(Collection $collection, Taxonomy $taxonomy, string $locale, string $pattern): ?string
    {
        foreach ([Collection::query()->withTrashed(), Taxonomy::query()->withTrashed()] as $query) {
            foreach ($query->whereNotNull('route')->get() as $other) {
                if ($other->routeIn($locale) === $pattern) {
                    return $other->title;
                }
            }
        }

        return self::termPages($locale, $pattern, [$collection->id, $taxonomy->id]);
    }

    /**
     * The collection and taxonomy whose term pages have a pattern in a
     * language ("Books · Tags"), but the pair left out.
     *
     * @param  array{0: int, 1: int}|null  $except  a collection's and a taxonomy's id
     */
    private static function termPages(string $locale, string $pattern, ?array $except = null): ?string
    {
        foreach (Taxonomy::query()->withTrashed()->with(['collections' => fn ($q) => $q->withTrashed()->wherePivot('term_pages', true)])->get() as $taxonomy) {
            foreach ($taxonomy->collections as $collection) {
                $pivot = $collection->getRelation('pivot');
                if (! $pivot instanceof CollectionTaxonomy || $except === [$collection->id, $taxonomy->id]) {
                    continue;
                }
                if ($pivot->pattern($collection, $taxonomy, $locale) === $pattern) {
                    return $collection->title.' · '.$taxonomy->title;
                }
            }
        }

        return null;
    }
}
