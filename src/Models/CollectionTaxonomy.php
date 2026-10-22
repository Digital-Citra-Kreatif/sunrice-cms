<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Sunrice\Cms\Support\Locales;

/**
 * A taxonomy attached to a collection, and its term pages there: one page
 * per term listing only that collection's entries with it
 * (/books/tags/featured), unless switched off.
 *
 * @property int $collection_id
 * @property int $taxonomy_id
 * @property bool $term_pages whether its terms have pages in the collection
 * @property string|null $term_route their URL pattern instead of the default (pattern())
 * @property array<string, string>|null $term_routes other languages' own patterns: {"id": "/buku/tag/{slug}"}
 *
 * @api
 */
class CollectionTaxonomy extends Pivot
{
    protected $table = 'sunrice_collection_taxonomy';

    public $timestamps = false;

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['term_pages' => 'boolean', 'term_routes' => 'array'];
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
        $base = $collection->routeIn($locale ?? Locales::default(), 'listing_route') ?? '/'.$collection->handle;

        return rtrim($base, '/').'/'.str_replace('_', '-', $taxonomy->handle).'/{slug}';
    }
}
