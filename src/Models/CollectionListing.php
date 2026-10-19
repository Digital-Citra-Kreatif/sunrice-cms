<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * A collection's listing page fields in one language. Saved with
 * SaveListing; no drafts: saved is live.
 *
 * @property int $id
 * @property int $collection_id
 * @property string $locale
 * @property array<string, mixed> $data
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection $collection
 *
 * @api
 */
class CollectionListing extends Model
{
    protected $table = 'sunrice_collection_listings';

    protected $guarded = [];

    protected function casts(): array
    {
        return ['data' => 'array'];
    }

    /** @return BelongsTo<Collection, $this> */
    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class)->withTrashed();
    }
}
