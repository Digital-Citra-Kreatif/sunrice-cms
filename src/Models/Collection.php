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
 * A kind of content (pages, articles, products), whose entries are filled
 * in with its blueprint's fields. Saved with SaveCollection. A deleted
 * collection keeps its entries, out of sight.
 *
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property string|null $blueprint the blueprint's handle
 * @property bool $dated entries show a date, and list newest first
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

    protected $attributes = ['dated' => false];

    private ?Schema $schema = null;

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['dated' => 'boolean'];
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
