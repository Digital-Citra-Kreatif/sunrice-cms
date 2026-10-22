<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * A taxonomy index page's fields in one language: the shared index page's
 * (collection_id null) or a collection's (/books/tags). Saved with
 * SaveIndexPage; no drafts: saved is live.
 *
 * @property int $id
 * @property int $taxonomy_id
 * @property int|null $collection_id null: the shared index page
 * @property string $locale
 * @property array<string, mixed> $data
 * @property int $version counted up on each save; a save with an older one is refused
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Taxonomy $taxonomy
 * @property-read Collection|null $collection
 *
 * @api
 */
class TaxonomyListing extends Model
{
    protected $table = 'sunrice_taxonomy_listings';

    protected $guarded = [];

    protected function casts(): array
    {
        return ['data' => 'array', 'version' => 'integer', 'collection_id' => 'integer'];
    }

    /** @return BelongsTo<Taxonomy, $this> */
    public function taxonomy(): BelongsTo
    {
        return $this->belongsTo(Taxonomy::class)->withTrashed();
    }

    /** @return BelongsTo<Collection, $this> */
    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class)->withTrashed();
    }
}
