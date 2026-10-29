<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Sunrice\Cms\Site\RoutePattern;
use Sunrice\Cms\Support\Locales;

/**
 * A taxonomy attached to a collection: its entries have its terms (chosen
 * in the entry editor's Taxonomies card; one at most when `single`), and
 * its term pages there: one page
 * per term listing only that collection's entries with it
 * (/books/tags/featured), unless switched off; and its index page there,
 * listing the terms its entries have (/books/tags), unless switched off.
 *
 * @property int $collection_id
 * @property int $taxonomy_id
 * @property bool $term_pages whether its terms have pages in the collection
 * @property string|null $term_route their URL pattern instead of the default (pattern())
 * @property array<string, string>|null $term_routes other languages' own patterns: {"id": "/buku/tag/{slug}"}
 * @property bool $index_page whether the collection has an index page of its terms
 * @property string|null $index_route its URL instead of the default (indexPath())
 * @property array<string, string>|null $index_routes other languages' own URLs: {"id": "/buku/tag"}
 * @property bool $single an entry of the collection has one term of it at most ("One term only")
 *
 * @api
 */
class CollectionTaxonomy extends Pivot
{
    protected $table = 'sunrice_collection_taxonomy';

    /** The pivot's columns, loaded with the relation. */
    public const COLUMNS = ['term_pages', 'term_route', 'term_routes', 'index_page', 'index_route', 'index_routes', 'single'];

    public $timestamps = false;

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['term_pages' => 'boolean', 'term_routes' => 'array', 'index_page' => 'boolean', 'index_routes' => 'array', 'single' => 'boolean'];
    }

    protected static function booted(): void
    {
        // Whatever writes its URLs (the taxonomy's form, attaching, an import, code).
        static::saving(fn (self $pivot) => $pivot->writeHandle());
    }

    /**
     * In URLs that changed, {handle} written as the taxonomy's handle and
     * {listing} as the collection's listing page URL in that language
     * (else /{its handle}), as in the default ones: "{listing}/{handle}/{slug}"
     * → "/books/tags/{slug}" (RoutePattern::withHandle()).
     */
    private function writeHandle(): void
    {
        $columns = array_filter(['term_route', 'index_route', 'term_routes', 'index_routes'], fn (string $column): bool => $this->isDirty($column)
            && preg_match('/\{(handle|listing)\}/', (string) json_encode($this->getAttribute($column))) === 1);
        if ($columns === []) {
            return;
        }
        $parent = $this->pivotParent;
        $collection = $parent instanceof Collection && $parent->id === (int) $this->collection_id ? $parent : Collection::query()->find($this->collection_id);
        $taxonomy = $parent instanceof Taxonomy && $parent->id === (int) $this->taxonomy_id ? $parent : Taxonomy::query()->find($this->taxonomy_id);
        if ($collection === null || $taxonomy === null) {
            return;
        }
        $write = fn (string $pattern, string $locale): string => RoutePattern::withHandle($pattern, $taxonomy->handle, self::listingPath($collection, $locale));
        foreach ($columns as $column) {
            $value = $this->getAttribute($column);
            if (is_string($value)) {
                $this->setAttribute($column, $write($value, Locales::default()));
            } elseif (is_array($value)) {
                $written = [];
                foreach ($value as $locale => $pattern) {
                    $written[$locale] = is_string($pattern) ? $write($pattern, (string) $locale) : $pattern;
                }
                $this->setAttribute($column, $written);
            }
        }
    }

    /** The collection's listing page URL in a language, else /{its handle}: what its taxonomies' pages there are under by default. */
    public static function listingPath(Collection $collection, ?string $locale = null): string
    {
        return $collection->routeIn($locale ?? Locales::default(), 'listing_route') ?? '/'.$collection->handle;
    }

    /**
     * The index page's URL path in a language: its own there, else the
     * one set, else under the collection's listing page in that language
     * (or its handle without one) and the taxonomy's handle: /books/tags,
     * /id/buku/tags (without the prefix).
     */
    public function indexPath(Collection $collection, Taxonomy $taxonomy, ?string $locale = null): string
    {
        $locale ??= Locales::default();
        $own = $locale === Locales::default() ? null : ($this->index_routes[$locale] ?? null);
        if (is_string($own) && $own !== '') {
            return $own;
        }
        if ($this->index_route !== null && $this->index_route !== '') {
            return $this->index_route;
        }

        return self::defaultIndexPath($collection, $taxonomy, $locale);
    }

    /** Where the index page is in a collection when no URL is set: {listing}/{taxonomy}. */
    public static function defaultIndexPath(Collection $collection, Taxonomy $taxonomy, ?string $locale = null): string
    {
        return rtrim(self::listingPath($collection, $locale), '/').'/'.str_replace('_', '-', $taxonomy->handle);
    }

    /**
     * Term pages' URL pattern in a language: its own there, else the one
     * set, else under the collection's listing page in that language (or
     * its handle without one) and the taxonomy's handle:
     * /books/tags/{slug}, /id/buku/tags/{slug} (without the prefix).
     */
    public function pattern(Collection $collection, Taxonomy $taxonomy, ?string $locale = null): string
    {
        $locale ??= Locales::default();
        $own = $locale === Locales::default() ? null : ($this->term_routes[$locale] ?? null);
        if (is_string($own) && $own !== '') {
            return $own;
        }
        if ($this->term_route !== null && $this->term_route !== '') {
            return $this->term_route;
        }

        return self::defaultPattern($collection, $taxonomy, $locale);
    }

    /** Where term pages are in a collection when no pattern is set: {listing}/{taxonomy}/{slug}. */
    public static function defaultPattern(Collection $collection, Taxonomy $taxonomy, ?string $locale = null): string
    {
        return self::defaultIndexPath($collection, $taxonomy, $locale).'/{slug}';
    }
}
