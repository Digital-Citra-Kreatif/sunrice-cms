<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * A link in a menu: to an entry (entry_id), a term's page (term_id), a
 * collection's listing page (collection_id), or an address (url).
 *
 * @property int $id
 * @property int $menu_id
 * @property int|null $parent_id
 * @property int $sort_order
 * @property int|null $entry_id
 * @property int|null $term_id
 * @property int|null $collection_id
 * @property string|null $url
 * @property array<string, string> $labels by language; empty: the entry's title
 * @property bool $new_tab
 * @property string|null $query_string a listing page's filters ("listing_type=for-sale"), added to its address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Entry|null $entry
 * @property-read Term|null $term
 * @property-read Collection|null $collection
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

    /** @return BelongsTo<Term, $this> */
    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    /** @return BelongsTo<Collection, $this> */
    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }
}
