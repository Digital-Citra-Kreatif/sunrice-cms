<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
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
 * @property string|null $template the Blade view its page renders with
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at in the trash
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
    use SoftDeletes;

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

    /**
     * The ids of the terms below this one, at any depth (trashed too).
     *
     * @return list<int>
     */
    public function descendantIds(): array
    {
        $ids = [];
        $level = [$this->id];
        for ($depth = 0; $level !== [] && $depth < 50; $depth++) {
            $level = [];
            foreach (self::query()->withTrashed()->whereIn('parent_id', $ids === [] ? [$this->id] : $ids)->whereNotIn('id', $ids)->pluck('id') as $id) {
                $level[] = is_numeric($id) ? (int) $id : 0;
            }
            array_push($ids, ...$level);
        }

        return $ids;
    }

    /** The term's page in a language (null: its taxonomy has no pages, or it isn't translated). */
    public function url(?string $locale = null): ?string
    {
        $translation = $this->translations->firstWhere('locale', $locale ?? Locales::current());

        return $translation?->url();
    }

    /** The title in a language (falling back to the main one). */
    public function title(?string $locale = null): string
    {
        return $this->translation($locale)->title ?? '';
    }
}
