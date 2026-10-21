<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Sunrice\Cms\Models\Concerns\TranslatesText;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Schema;

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
 * @property string|null $route term pages' URL pattern ("/topics/{slug}"); none: no pages
 * @property string|null $blueprint terms' own fields
 * @property string|null $template the Blade view term pages render with
 * @property string|null $seo_title_field a text field whose value is the SEO title when the SEO card leaves it empty
 * @property string|null $seo_description_field a text or textarea field for the description
 * @property string|null $seo_image_field a media field whose first image is the share image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Collection> $collections
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Term> $terms
 *
 * @api
 */
class Taxonomy extends Model
{
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
        return ['hierarchical' => 'boolean', 'translations' => 'array'];
    }

    /** @return BelongsToMany<Collection, $this> */
    public function collections(): BelongsToMany
    {
        return $this->belongsToMany(Collection::class, 'sunrice_collection_taxonomy');
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
        return $this->schema ??= ($this->blueprint === null ? null : Blueprint::query()->where('handle', $this->blueprint)->first()?->schema())
            ?? Schema::make($this->blueprint === null ? [new Field(self::DESCRIPTION, 'textarea', 'Description', instructions: 'An introduction shown on the term\'s page.')] : []);
    }
}
