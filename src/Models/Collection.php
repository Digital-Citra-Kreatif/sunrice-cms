<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Support\Locales;

/**
 * A kind of content (pages, articles, products), whose entries are filled
 * in with its blueprint's fields. Saved with SaveCollection. A deleted
 * collection keeps its entries, out of sight.
 *
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property string|null $blueprint the blueprint's handle
 * @property bool $dated entries show a date, and list newest first
 * @property string|null $route the entries' public URL pattern ("/blog/{slug}"); none: no pages
 * @property string|null $template the Blade view entries render with
 * @property bool $hierarchical entries may have a parent entry
 * @property bool $ordered entries are in the order editors put them in
 * @property string|null $listing_route the listing page's URL ("/blog"); none: no listing page
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
    use SoftDeletes;

    protected $table = 'sunrice_collections';

    protected $guarded = [];

    protected $attributes = ['dated' => false, 'hierarchical' => false, 'ordered' => false, 'per_page' => 10];

    private ?Schema $schema = null;

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['dated' => 'boolean', 'comments' => 'boolean', 'hierarchical' => 'boolean', 'ordered' => 'boolean', 'per_page' => 'integer'];
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
     * fields not translated come from the main language.
     *
     * @return array<string, mixed>
     */
    public function listingData(string $locale, ?Schema $schema = null): array
    {
        $schema ??= $this->listingSchema();
        $stored = fn (string $code): array => $this->listings->firstWhere('locale', $code)->data ?? [];
        $data = array_replace($schema->defaults(), $stored($locale));
        if ($locale !== Locales::default()) {
            $data = array_replace($data, array_intersect_key(array_replace($schema->defaults(), $stored(Locales::default())), array_flip($schema->shared())));
        }

        return $data;
    }

    /** The listing page's URL in a language, or null without one. */
    public function listingUrl(?string $locale = null): ?string
    {
        if ($this->listing_route === null) {
            return null;
        }
        $locale ??= Locales::current();

        return url(($locale === Locales::default() ? '' : '/'.$locale).$this->listing_route);
    }

    /** @return HasMany<Entry, $this> */
    public function entries(): HasMany
    {
        return $this->hasMany(Entry::class);
    }

    /** @return BelongsToMany<Taxonomy, $this> */
    public function taxonomies(): BelongsToMany
    {
        return $this->belongsToMany(Taxonomy::class, 'sunrice_collection_taxonomy');
    }

    /** The blueprint, or null when it has none or it was deleted. */
    public function blueprintModel(): ?Blueprint
    {
        return $this->blueprint === null ? null : Blueprint::query()->where('handle', $this->blueprint)->first();
    }

    /** The fields of its entries (none without a blueprint), loaded once. */
    public function schema(): Schema
    {
        return $this->schema ??= $this->blueprintModel()?->schema() ?? Schema::make([]);
    }

    /** Forget the loaded fields, e.g. after the blueprint changed. */
    public function flushSchema(): void
    {
        $this->schema = null;
    }
}
