<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * A global set's values in one language.
 *
 * @property int $id
 * @property int $global_set_id
 * @property string $locale
 * @property array<string, mixed> $data
 * @property int $version counted up on each save; a save with an older one is refused
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read GlobalSet $globalSet
 *
 * @api
 */
class GlobalValue extends Model
{
    protected $table = 'sunrice_global_values';

    protected $guarded = [];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['data' => 'array', 'version' => 'integer'];
    }

    /** @return BelongsTo<GlobalSet, $this> */
    public function globalSet(): BelongsTo
    {
        return $this->belongsTo(GlobalSet::class);
    }
}
