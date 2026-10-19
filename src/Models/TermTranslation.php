<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * A term in one language: its title and slug.
 *
 * @property int $id
 * @property int $term_id
 * @property int $taxonomy_id
 * @property string $locale
 * @property string $title
 * @property string $slug
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Term $term
 *
 * @api
 */
class TermTranslation extends Model
{
    protected $table = 'sunrice_term_translations';

    protected $guarded = [];

    /** @return BelongsTo<Term, $this> */
    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }
}
