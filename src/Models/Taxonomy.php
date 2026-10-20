<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\Schema;

/**
 * A way to group entries (categories, tags), with terms, optionally
 * nested. Attached to the collections whose entries it groups. A deleted
 * taxonomy keeps its terms, out of sight.
 *
 * @property int $id
 * @property string $handle
 * @property string $title
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

    protected $table = 'sunrice_taxonomies';

    protected $guarded = [];

    protected $attributes = ['hierarchical' => false];

    private ?Schema $schema = null;

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['hierarchical' => 'boolean'];
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
    public function schema(): Schema
    {
        return $this->schema ??= ($this->blueprint === null ? null : Blueprint::query()->where('handle', $this->blueprint)->first()?->schema()) ?? Schema::make([]);
    }
}
