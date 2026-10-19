<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * A way to group entries (categories, tags), with terms, optionally
 * nested. Attached to the collections whose entries it groups. A deleted
 * taxonomy keeps its terms, out of sight.
 *
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property bool $hierarchical terms can have a parent
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
}
