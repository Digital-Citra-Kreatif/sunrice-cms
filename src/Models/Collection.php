<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Concerns\HasLanguageRoutes;
use Sunrice\Cms\Models\Concerns\TranslatesText;
use Sunrice\Cms\Support\LanguageValues;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteRecords;

/**
 * A kind of content (pages, articles, products), whose entries are filled
 * in with its blueprint's fields. Saved with SaveCollection. A deleted
 * collection keeps its entries, out of sight.
 *
 * @property int $id
 * @property string $handle
 * @property string $title in the main language (titleIn() for the others)
 * @property array<string, array<string, string>>|null $translations what visitors read in the other languages: {"id": {"title": "Properti"}}
 * @property string|null $blueprint the blueprint's handle
 * @property list<string>|null $blueprints more blueprints (handles) its entries may use instead (Entry::$blueprint)
 * @property bool $dated entries show a date, and list newest first
 * @property bool $translatable entries can have a version in each language; false: the main language only
 * @property string|null $route the entries' public URL pattern ("/blog/{slug}") in the main language (routeIn() for the others); none: no pages
 * @property string|null $template the Blade view entries render with
 * @property string|null $listing_template the Blade view its listing page renders with
 * @property bool $hierarchical entries may have a parent entry
 * @property bool $ordered entries are in the order editors put them in
 * @property string|null $listing_route the listing page's URL ("/blog") in the main language (routeIn($locale, 'listing_route') for the others); none: no listing page
 * @property array<string, array<string, string>>|null $routes the other languages' own patterns: {"id": {"route": "/buku/{slug}", "listing_route": "/buku"}} (HasLanguageRoutes)
 * @property array<string, array<string, list<string>>>|null $previous_routes the patterns they had before, which redirect
 * @property string|null $listing_blueprint the listing page's own fields
 * @property int $per_page entries per listing page
 * @property bool $comments visitors may comment on its entries
 * @property string|null $schema_type its entries' schema.org type (StructuredData::ENTRY_TYPES); null: Article when dated, else WebPage
 * @property string|null $seo_title_field a text field whose value is the SEO title when the SEO card leaves it empty
 * @property string|null $seo_description_field a text or textarea field for the description
 * @property string|null $seo_image_field a media field whose first image is the share image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 *
 * @api
 */
class Collection extends Model
{
    use HasLanguageRoutes;
    use SoftDeletes;
    use TranslatesText;

    protected $table = 'sunrice_collections';

    protected $guarded = [];

    protected $attributes = ['dated' => false, 'translatable' => true, 'hierarchical' => false, 'ordered' => false, 'per_page' => 10];

    private ?Schema $schema = null;

    /** @var array<string, Schema> other allowed blueprints' fields, by handle */
    private array $schemas = [];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['dated' => 'boolean', 'translatable' => 'boolean', 'comments' => 'boolean', 'hierarchical' => 'boolean', 'ordered' => 'boolean', 'per_page' => 'integer', 'blueprints' => 'array', 'translations' => 'array', 'routes' => 'array', 'previous_routes' => 'array'];
    }

    /** @return list<string> */
    public static function routeAttributes(): array
    {
        return ['route', 'listing_route'];
    }

    /** @return HasMany<CollectionListing, $this> */
    public function listings(): HasMany
    {
        return $this->hasMany(CollectionListing::class);
    }

    /** The listing page's fields (none without a listing blueprint). */
    public function listingSchema(): Schema
    {
        return $this->listing_blueprint === null ? Schema::make([]) : (Blueprint::query()->where('handle', $this->listing_blueprint)->first()?->schema() ?? Schema::make([]));
    }

    /**
     * The listing page's stored values in a language, over the defaults;
     * fields not translated (inside groups, rows and blocks too) come from
     * the main language.
     *
     * @return array<string, mixed>
     */
    public function listingData(string $locale, ?Schema $schema = null): array
    {
        $schema ??= $this->listingSchema();
        $stored = fn (string $code): array => $this->listings->firstWhere('locale', $code)->data ?? [];

        return LanguageValues::read($schema, $stored($locale), $locale === Locales::default() ? null : $stored(Locales::default()));
    }

    /** Its title in a language (null: the page's), as visitors read it: listing pages, breadcrumbs, menus. */
    public function titleIn(?string $locale = null): string
    {
        return $this->translated('title', $locale);
    }

    /** The listing page's URL in a language (null: the page's), with that language's pattern; null without one. */
    public function listingUrl(?string $locale = null): ?string
    {
        $locale ??= Locales::current();
        $route = $this->routeIn($locale, 'listing_route');

        return $route === null ? null : url(Locales::prefix($locale).$route);
    }

    /** @return HasMany<Entry, $this> */
    public function entries(): HasMany
    {
        return $this->hasMany(Entry::class);
    }

    /**
     * The taxonomies grouping its entries; `pivot` says whether their
     * terms have pages and an index page in it (CollectionTaxonomy).
     *
     * @return BelongsToMany<Taxonomy, $this, CollectionTaxonomy>
     */
    public function taxonomies(): BelongsToMany
    {
        return $this->belongsToMany(Taxonomy::class, 'sunrice_collection_taxonomy')->using(CollectionTaxonomy::class)
            ->withPivot(CollectionTaxonomy::COLUMNS);
    }

    /** The fields of its entries (none without a blueprint), loaded once. */
    public function schema(): Schema
    {
        return $this->schema ??= SiteRecords::blueprint($this->blueprint)?->schema() ?? Schema::make([]);
    }

    /**
     * The blueprints its entries may use: its own first, then the others
     * allowed (handles; an entry picks one with ChangeBlueprint).
     *
     * @return list<string>
     */
    public function allowedBlueprints(): array
    {
        $handles = [$this->blueprint, ...(is_array($this->blueprints) ? $this->blueprints : [])];

        return array_values(array_unique(array_filter($handles, fn (mixed $handle): bool => is_string($handle) && $handle !== '')));
    }

    /**
     * The fields of an entry with this blueprint (a handle): its own when
     * null or not allowed. Loaded once per handle.
     */
    public function schemaFor(?string $blueprint): Schema
    {
        if ($blueprint === null || $blueprint === $this->blueprint || ! in_array($blueprint, $this->allowedBlueprints(), true)) {
            return $this->schema();
        }

        return $this->schemas[$blueprint] ??= SiteRecords::blueprint($blueprint)?->schema() ?? Schema::make([]);
    }

    /**
     * The fields of every allowed blueprint (for queries across entries).
     *
     * @return list<Schema>
     */
    public function allSchemas(): array
    {
        return [$this->schema(), ...array_map(fn (string $handle): Schema => $this->schemaFor($handle), array_values(array_diff($this->allowedBlueprints(), [$this->blueprint])))];
    }

    /** Forget the loaded fields, e.g. after the blueprint changed. */
    public function flushSchema(): void
    {
        $this->schema = null;
        $this->schemas = [];
    }
}
