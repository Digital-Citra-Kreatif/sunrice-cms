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

    /** @return HasMany<MenuItem, $this> */
    public function items(): HasMany
    {
        return $this->hasMany(MenuItem::class)->orderBy('sort_order')->orderBy('id');
    }
}
