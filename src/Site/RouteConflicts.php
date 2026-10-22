<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Support\Locales;

/**
 * Whether something else has a URL pattern in a language already: another
 * collection (or taxonomy) of the same kind, its own there, else its main
 * one; for entry and term page patterns also the other kind's, and
 * taxonomies' term pages in collections (/books/tags/{slug}); for listing
 * pages and taxonomies' index pages (fixed addresses) each other, and
 * index pages in collections (/books/tags). Two of them with the same
 * pattern in a language would share its addresses.
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
            // Listing pages and taxonomies' index pages: fixed addresses, which must differ from each other.
            return self::fixedPages($locale, $pattern, $record instanceof Collection ? 'listing_route' : 'index_route', $record->exists ? $record->id : null);
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
     * What else has an address for a taxonomy's index page in a collection
     * in a language: listing pages, shared index pages and other
     * collections' index pages.
     */
    public static function forIndexPage(Collection $collection, Taxonomy $taxonomy, string $locale, string $path): ?string
    {
        return self::fixedPages($locale, $path, except: [$collection->id, $taxonomy->id]);
    }

    /**
     * What clashes with a taxonomy's pages in a collection as attached
     * (`$pivot`, maybe not saved yet): its term pages' pattern and its
     * index page's address, while switched on, as set or by default, in
     * every language. The first clash: which page, the language, the URL
     * and what else has it.
     *
     * @return array{page: 'term'|'index', locale: string, url: string, title: string}|null
     */
    public static function forAttachment(Collection $collection, Taxonomy $taxonomy, CollectionTaxonomy $pivot): ?array
    {
        foreach (Locales::all() as $locale) {
            if ($pivot->term_pages && ($title = self::forTermPages($collection, $taxonomy, $locale, $url = $pivot->pattern($collection, $taxonomy, $locale))) !== null) {
                return ['page' => 'term', 'locale' => $locale, 'url' => $url, 'title' => $title];
            }
            if ($pivot->index_page && ($title = self::forIndexPage($collection, $taxonomy, $locale, $url = $pivot->indexPath($collection, $taxonomy, $locale))) !== null) {
                return ['page' => 'index', 'locale' => $locale, 'url' => $url, 'title' => $title];
            }
        }

        return null;
    }

    /**
     * What has a fixed address in a language: a collection's listing page,
     * a taxonomy's shared index page, or its index page in a collection
     * ("Books · Tags"), but the one left out (an attribute's record by id,
     * or a collection's and a taxonomy's pair).
     *
     * @param  'listing_route'|'index_route'|null  $attribute
     * @param  array{0: int, 1: int}|null  $except
     */
    private static function fixedPages(string $locale, string $path, ?string $attribute = null, ?int $id = null, ?array $except = null): ?string
    {
        foreach (Collection::query()->withTrashed()->whereNotNull('listing_route')->get() as $collection) {
            if (! ($attribute === 'listing_route' && $collection->id === $id) && $collection->routeIn($locale, 'listing_route') === $path) {
                return $collection->title;
            }
        }
        foreach (Taxonomy::query()->withTrashed()->whereNotNull('index_route')->get() as $taxonomy) {
            if (! ($attribute === 'index_route' && $taxonomy->id === $id) && $taxonomy->routeIn($locale, 'index_route') === $path) {
                return $taxonomy->title;
            }
        }
        foreach (Taxonomy::query()->withTrashed()->with(['collections' => fn ($q) => $q->withTrashed()->wherePivot('index_page', true)])->get() as $taxonomy) {
            foreach ($taxonomy->collections as $collection) {
                $pivot = $collection->getRelation('pivot');
                if ($pivot instanceof CollectionTaxonomy && $except !== [$collection->id, $taxonomy->id] && $pivot->indexPath($collection, $taxonomy, $locale) === $path) {
                    return $collection->title.' · '.$taxonomy->title;
                }
            }
        }

        return null;
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
