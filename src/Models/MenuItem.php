<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * A link in a menu: to an entry (entry_id), or to an address (url).
 *
 * @property int $id
 * @property int $menu_id
 * @property int|null $parent_id
 * @property int $sort_order
 * @property int|null $entry_id
 * @property string|null $url
 * @property array<string, string> $labels by language; empty: the entry's title
 * @property bool $new_tab
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Entry|null $entry
 *
 * @api
 */
class MenuItem extends Model
{
    protected $table = 'sunrice_menu_items';

    protected $guarded = [];

    protected $attributes = ['labels' => '{}', 'new_tab' => false, 'sort_order' => 0];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['labels' => 'array', 'new_tab' => 'boolean', 'sort_order' => 'integer'];
    }

    /** @return BelongsTo<Entry, $this> */
    public function entry(): BelongsTo
    {
        return $this->belongsTo(Entry::class);
    }
}
