<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * A navigation menu (main, footer): nested links to entries and addresses.
 * Edited with SaveMenu; templates get it resolved with Cms::menu().
 *
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property int $version counted up each time its links change; a save with an older one is refused
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, MenuItem> $items
 *
 * @api
 */
class Menu extends Model
{
    protected $table = 'sunrice_menus';

    protected $guarded = [];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['version' => 'integer'];
    }

    /** @return HasMany<MenuItem, $this> */
    public function items(): HasMany
    {
        return $this->hasMany(MenuItem::class)->orderBy('sort_order')->orderBy('id');
    }
}
