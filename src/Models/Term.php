<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Support\Locales;

/**
 * A term of a taxonomy ("News" in Categories), with a title and slug per
 * language. Saved with SaveTerm.
 *
 * @property int $id
 * @property int $taxonomy_id
 * @property int|null $parent_id
 * @property int $sort_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Taxonomy $taxonomy
 * @property-read Term|null $parent
 * @property-read Collection<int, Term> $children
 * @property-read Collection<int, TermTranslation> $translations
 *
 * @api
 */
class Term extends Model
{
    protected $table = 'sunrice_terms';

    protected $guarded = [];

    protected $attributes = ['sort_order' => 0];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['sort_order' => 'integer'];
    }

    /** @return BelongsTo<Taxonomy, $this> */
    public function taxonomy(): BelongsTo
    {
        return $this->belongsTo(Taxonomy::class)->withTrashed();
    }

    /** @return BelongsTo<Term, $this> */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /** @return HasMany<Term, $this> */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')->orderBy('sort_order')->orderBy('id');
    }

    /** @return HasMany<TermTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(TermTranslation::class);
    }

    /** @return BelongsToMany<Entry, $this> */
    public function entries(): BelongsToMany
    {
        return $this->belongsToMany(Entry::class, 'sunrice_entry_term');
    }

    /** In a language, falling back to the main language's. */
    public function translation(?string $locale = null): ?TermTranslation
    {
        return $this->translations->firstWhere('locale', $locale ?? Locales::default())
            ?? $this->translations->firstWhere('locale', Locales::default())
            ?? $this->translations->sortBy('id')->first();
    }

    /** The title in a language (falling back to the main one). */
    public function title(?string $locale = null): string
    {
        return $this->translation($locale)->title ?? '';
    }
}
