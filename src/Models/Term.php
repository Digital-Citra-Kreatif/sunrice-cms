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
use Sunrice\Cms\Models;
use Sunrice\Cms\Site\Site;
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
 * @property-read int|null $entries_count with withCount('entries')
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

    /**
     * The entries with this term (their own terms, the editor's Taxonomies
     * card): those of collections its taxonomy is attached to.
     *
     * @return BelongsToMany<Entry, $this>
     */
    public function entries(): BelongsToMany
    {
        return $this->belongsToMany(Entry::class, 'sunrice_entry_term')->whereExists(Entry::termAttached());
    }

    /**
     * In a language (by default the page's, Locales::current(), as url()
     * does), falling back to the main language's, else the first one.
     */
    public function translation(?string $locale = null): ?TermTranslation
    {
        return $this->translations->firstWhere('locale', $locale ?? Locales::current())
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

    /**
     * The term's page in a language: its translation's, else (with the
     * main-language fallback) the main language's at that language's
     * address. In a collection (a model or handle), its page there
     * (/books/tags/featured, only that collection's entries); without one,
     * the shared page, else the page shown's collection's, else the first
     * collection's (Site::termUrl()). Null: no such page.
     */
    public function url(?string $locale = null, Models\Collection|string|null $collection = null): ?string
    {
        $locale ??= Locales::current();
        if (is_string($collection)) {
            $collection = $this->taxonomy->collections->firstWhere('handle', $collection);
            if ($collection === null) {
                return null;
            }
        }
        $translation = $this->translations->firstWhere('locale', $locale);
        if ($translation === null && $locale !== Locales::default() && Site::fallback()) {
            $main = $this->translations->firstWhere('locale', Locales::default());
            $main?->setRelation('term', $this);

            return $main === null ? null : self::scoped($main, $collection, fn () => app(Site::class)->termUrlIn($main, $locale));
        }

        return $translation === null ? null : self::scoped($translation, $collection, fn () => $translation->url());
    }

    /**
     * A URL worked out with a translation scoped to a collection, leaving
     * it as it was (it's shared with the term's other uses).
     *
     * @param  \Closure(): ?string  $url
     */
    private static function scoped(TermTranslation $translation, ?Models\Collection $collection, \Closure $url): ?string
    {
        if ($collection === null) {
            return $url();
        }
        $before = $translation->scope;
        $translation->scope = $collection;
        try {
            return $url();
        } finally {
            $translation->scope = $before;
        }
    }

    /**
     * The title in a language: by default the page's (Locales::current(),
     * as url()), falling back to the main language's when it has no
     * translation there. Admin code passes the language it shows.
     */
    public function title(?string $locale = null): string
    {
        return $this->translation($locale)->title ?? '';
    }

    /**
     * Where other content points at this term through its fields: entries
     * (draft or live), terms and global sets, a row per language and field.
     *
     * @return Collection<int, ContentReference>
     */
    public function referencedBy(): Collection
    {
        return ContentReference::query()->where('target_type', ContentReference::TERM)->where('target_id', $this->id)
            ->whereNot(fn ($query) => $query->where('source_type', ContentReference::TERM)->where('source_id', $this->id))
            ->orderBy('id')->get();
    }
}
