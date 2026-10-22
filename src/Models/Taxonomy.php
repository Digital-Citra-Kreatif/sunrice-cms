<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Concerns\HasLanguageRoutes;
use Sunrice\Cms\Models\Concerns\TranslatesText;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteRecords;

/**
 * A way to group entries (categories, tags), with terms, optionally
 * nested. Attached to the collections whose entries it groups. A deleted
 * taxonomy keeps its terms, out of sight.
 *
 * @property int $id
 * @property string $handle
 * @property string $title in the main language (titleIn() for the others)
 * @property array<string, array<string, string>>|null $translations what visitors read in the other languages: {"id": {"title": "Lokasi"}}
 * @property bool $hierarchical terms can have a parent
 * @property string|null $route shared term pages' URL pattern ("/topics/{slug}": each term's entries from every collection) in the main language (routeIn() for the others); none: no shared pages (collections may still have theirs: CollectionTaxonomy)
 * @property array<string, array<string, string>>|null $routes the other languages' own patterns: {"id": {"route": "/topik/{slug}", "index_route": "/topik"}} (HasLanguageRoutes)
 * @property array<string, array<string, list<string>>>|null $previous_routes the patterns they had before, which redirect
 * @property string|null $index_route the shared index page's URL ("/tags": every term, linking to its page) in the main language (routeIn($locale, 'index_route') for the others); none: no shared index page (collections may still have theirs: CollectionTaxonomy)
 * @property string|null $blueprint terms' own fields
 * @property string|null $index_blueprint its index pages' own fields (TaxonomyListing)
 * @property string|null $template the Blade view term pages render with
 * @property string|null $index_template the Blade view its index pages render with
 * @property string|null $seo_title_field a text field whose value is the SEO title when the SEO card leaves it empty
 * @property string|null $seo_description_field a text or textarea field for the description
 * @property string|null $seo_image_field a media field whose first image is the share image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Collection> $collections
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Term> $terms
 * @property-read \Illuminate\Database\Eloquent\Collection<int, TaxonomyListing> $listings its index pages' fields, per page and language
 *
 * @api
 */
class Taxonomy extends Model
{
    use HasLanguageRoutes;
    use SoftDeletes;
    use TranslatesText;

    protected $table = 'sunrice_taxonomies';

    protected $guarded = [];

    protected $attributes = ['hierarchical' => false];

    /** The field terms of a taxonomy without a blueprint have: an introduction for their page. */
    public const DESCRIPTION = 'description';

    private ?Schema $schema = null;

    /** Its title in a language (null: the page's), as visitors read it on term pages. */
    public function titleIn(?string $locale = null): string
    {
        return $this->translated('title', $locale);
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['hierarchical' => 'boolean', 'translations' => 'array', 'routes' => 'array', 'previous_routes' => 'array'];
    }

    /** @return list<string> */
    public static function routeAttributes(): array
    {
        return ['route', 'index_route'];
    }

    /**
     * The collections whose entries it groups; `pivot` says whether its
     * terms have pages and an index page in each (CollectionTaxonomy).
     *
     * @return BelongsToMany<Collection, $this, CollectionTaxonomy>
     */
    public function collections(): BelongsToMany
    {
        return $this->belongsToMany(Collection::class, 'sunrice_collection_taxonomy')->using(CollectionTaxonomy::class)
            ->withPivot(CollectionTaxonomy::COLUMNS);
    }

    /** @return HasMany<TaxonomyListing, $this> */
    public function listings(): HasMany
    {
        return $this->hasMany(TaxonomyListing::class);
    }

    /** Its index pages' fields (none without an index blueprint). */
    public function indexSchema(): Schema
    {
        return SiteRecords::blueprint($this->index_blueprint)?->schema() ?? Schema::make([]);
    }

    /**
     * An index page's stored values in a language (the shared page's, or
     * a collection's), over the defaults; fields not translated come from
     * the main language.
     *
     * @return array<string, mixed>
     */
    public function indexData(string $locale, ?Collection $collection = null, ?Schema $schema = null): array
    {
        $schema ??= $this->indexSchema();
        $stored = fn (string $code): array => $this->listings->first(fn (TaxonomyListing $listing): bool => $listing->locale === $code && $listing->collection_id === $collection?->id)->data ?? [];
        $data = array_replace($schema->defaults(), $stored($locale));
        if ($locale !== Locales::default()) {
            $data = array_replace($data, array_intersect_key(array_replace($schema->defaults(), $stored(Locales::default())), array_flip($schema->shared())));
        }

        return $data;
    }

    /**
     * Whether its terms have pages: shared ones, or in a collection it's
     * attached to (read now, not from the site's cache; from its
     * collections when they're loaded).
     */
    public function hasTermPages(): bool
    {
        if ($this->route !== null) {
            return true;
        }
        if ($this->relationLoaded('collections')) {
            return $this->collections->contains(fn (Collection $collection): bool => ($pivot = $collection->getRelation('pivot')) instanceof CollectionTaxonomy && $pivot->term_pages);
        }

        return $this->collections()->wherePivot('term_pages', true)->exists();
    }

    /** Whether it has an index page: the shared one, or with a collection that collection's (read now, not from the site's cache). */
    public function hasIndexPage(?Collection $collection = null): bool
    {
        return $collection === null ? $this->index_route !== null : $this->collections()->wherePivot('index_page', true)->whereKey($collection->id)->exists();
    }

    /**
     * The URL of its index page in a language (null: the page's): the
     * shared one (/tags), or with a collection that collection's
     * (/books/tags). Null when that page is off.
     */
    public function indexUrl(?string $locale = null, ?Collection $collection = null): ?string
    {
        return app(Site::class)->indexUrl($this, $collection, $locale ?? Locales::current());
    }

    /** @return HasMany<Term, $this> */
    public function terms(): HasMany
    {
        return $this->hasMany(Term::class);
    }

    /** Terms' own fields (none without a blueprint), loaded once. */
    /**
     * Its terms' own fields: its blueprint's; without one, a description
     * (DESCRIPTION), so a term's page has an introduction to write.
     */
    public function schema(): Schema
    {
        return $this->schema ??= SiteRecords::blueprint($this->blueprint)?->schema()
            ?? Schema::make($this->blueprint === null ? [new Field(self::DESCRIPTION, 'textarea', 'Description', instructions: 'An introduction shown on the term\'s page.')] : []);
    }
}
