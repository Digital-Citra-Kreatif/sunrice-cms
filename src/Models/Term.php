<?php

declare(strict_types=1);

namespace Sunrice\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Sunrice\Database\Factories\TermFactory;
use Sunrice\Fields\HydrationContext;
use Sunrice\Fields\TranslationOverlay;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Models\Collection as ContentCollection;
use Sunrice\Models\Scopes\HiddenWithParent;
use Sunrice\Support\Locales;

/**
 * @property int $id
 * @property int $taxonomy_id
 * @property int|null $parent_id
 * @property int $sort_order
 * @property string|null $template
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 *
 * @use HasFactory<TermFactory>
 */
class Term extends Model
{
    /** @use HasFactory<TermFactory> */
    use HasFactory, SoftDeletes, \Sunrice\References\HasReferences;

    protected $table = 'sunrice_terms';

    protected $guarded = [];

    /** The translation resolved for rendering (set by resolveFor). */
    public ?TermTranslation $resolved = null;

    public ?string $resolvedLocale = null;

    public bool $isFallback = false;

    protected static function newFactory(): TermFactory
    {
        return TermFactory::new();
    }

    protected static function booted(): void
    {
        // Hidden while its taxonomy is deleted (see HiddenWithParent).
        static::addGlobalScope(new HiddenWithParent('taxonomy_id', 'sunrice_taxonomies'));
    }

    /** @return BelongsTo<Taxonomy, $this> */
    public function taxonomy(): BelongsTo
    {
        return $this->belongsTo(Taxonomy::class);
    }

    /** @return BelongsTo<Term, $this> */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Term::class, 'parent_id');
    }

    /** @return HasMany<Term, $this> */
    public function children(): HasMany
    {
        return $this->hasMany(Term::class, 'parent_id')->orderBy('sort_order');
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

    /**
     * Set `entries_count` on each term with one grouped query. withCount()
     * runs a count per term, which gets slow with hundreds of terms and
     * thousands of entries.
     *
     * @param  iterable<Term>  $terms
     * @param  (\Closure(Builder<Entry>): mixed)|null  $constrain  narrow the counted entries
     */
    public static function loadEntryCounts(iterable $terms, ?\Closure $constrain = null): void
    {
        $ids = [];
        foreach ($terms as $term) {
            $ids[] = (int) $term->id;
        }
        if ($ids === []) {
            return;
        }

        $query = Entry::query()
            ->join('sunrice_entry_term', 'sunrice_entry_term.entry_id', '=', 'sunrice_entries.id')
            ->whereIntegerInRaw('sunrice_entry_term.term_id', $ids)
            ->groupBy('sunrice_entry_term.term_id')
            ->select('sunrice_entry_term.term_id')
            ->selectRaw('count(*) as aggregate');
        if ($constrain !== null) {
            $constrain($query);
        }
        $counts = $query->toBase()->pluck('aggregate', 'term_id');

        foreach ($terms as $term) {
            $term->setAttribute('entries_count', (int) ($counts[$term->id] ?? 0));
        }
    }

    public function translation(string $locale): ?TermTranslation
    {
        $translations = $this->relationLoaded('translations')
            ? $this->translations
            : $this->translations()->get();

        return $translations->firstWhere('locale', $locale);
    }

    public function mainTranslation(): ?TermTranslation
    {
        return $this->translation(Locales::main());
    }

    /**
     * The translation the site shows in $locale: the main language's, or
     * another language's once it is Ready. Null when there is none.
     */
    public function readyTranslation(string $locale): ?TermTranslation
    {
        $translation = $this->translation($locale);

        return Locales::isMain($locale) || $translation?->is_ready ? $translation : null;
    }

    /**
     * Whole-term fallback mirroring Entry::resolveFor: the Ready
     * translation for $locale, otherwise the main-language one.
     */
    public function resolveFor(string $locale): TermTranslation
    {
        $resolved = $this->readyTranslation($locale) ?? $this->mainTranslation();

        $this->resolved = $resolved ?? new TermTranslation([
            'locale' => $locale,
            'name' => '',
            'slug' => '',
            'data' => [],
        ]);
        $this->resolvedLocale = $locale;
        $this->isFallback = $resolved !== null && $resolved->locale !== $locale;

        return $this->resolved;
    }

    /**
     * The translation templates read. A term nobody resolved (such as
     * $entry->terms) resolves itself for the page's language.
     */
    public function renderedTranslation(): ?TermTranslation
    {
        if ($this->resolved === null && $this->exists) {
            $this->resolveFor(Locales::current());
        }

        return $this->resolved;
    }

    public function getNameAttribute(): ?string
    {
        return $this->renderedTranslation()?->name;
    }

    public function getSlugAttribute(): ?string
    {
        return $this->renderedTranslation()?->slug;
    }

    public function getUrlAttribute(): ?string
    {
        $this->renderedTranslation();

        return app(UrlGenerator::class)->term($this, $this->resolvedLocale);
    }

    /**
     * This term's archive page for one collection's entries, e.g. on a
     * blog post: $term->urlIn($entry->collection) → /blog/category/news.
     */
    public function urlIn(ContentCollection $collection): string
    {
        $this->renderedTranslation();

        return app(UrlGenerator::class)->term($this, $this->resolvedLocale, $collection);
    }

    /**
     * Hydrated value of a field from the taxonomy's blueprint, in the
     * resolved language (e.g. a category description or image).
     */
    public function get(string $handle): mixed
    {
        $translation = $this->renderedTranslation();
        $data = $translation === null ? [] : $this->dataFor($translation);
        $blueprint = $this->taxonomy?->blueprint;

        if ($blueprint === null) {
            return $data[$handle] ?? null;
        }

        return $blueprint->schema()->hydrateField(
            $handle,
            $data[$handle] ?? null,
            new HydrationContext($this->resolvedLocale ?? Locales::main()),
        );
    }

    /**
     * A translation's field data: the main language's values with this
     * language's translatable ones laid over (see TranslationOverlay).
     *
     * @param  array<string, mixed>|null  $overlay
     * @param  array<string, mixed>|null  $main
     * @return array<string, mixed>
     */
    public function dataFor(TermTranslation $translation, ?array $overlay = null, ?array $main = null): array
    {
        $overlay ??= (array) ($translation->data ?? []);
        if (Locales::isMain($translation->locale)) {
            return $overlay;
        }

        $schema = $this->taxonomy?->blueprint?->schema();
        $main ??= (array) ($this->mainTranslation()->data ?? []);

        return $schema === null ? $overlay : TranslationOverlay::merge($schema->fields(), $main, $overlay);
    }

    /**
     * Nested tree of terms for a taxonomy, ordered by sort_order.
     *
     * @return Collection<int, Term>
     */
    public static function tree(int $taxonomyId): Collection
    {
        $terms = static::query()
            ->where('taxonomy_id', $taxonomyId)
            ->orderBy('sort_order')
            ->get();

        /** @var Collection<int, Term> $list */
        $list = $terms->values()->toBase();

        return static::buildTree($list);
    }

    /**
     * @param  Collection<int, Term>  $terms
     * @return Collection<int, Term>
     */
    public static function buildTree(Collection $terms, ?int $parentId = null): Collection
    {
        return $terms
            ->where('parent_id', $parentId)
            ->values()
            ->map(function (Term $term) use ($terms): Term {
                $term->setRelation('children', static::buildTree($terms, $term->id));

                return $term;
            });
    }

    /**
     * @return array<int, int> ids of this term and all descendants
     */
    public function descendantIds(): array
    {
        $ids = [$this->id];
        foreach ($this->children()->get() as $child) {
            $ids = array_merge($ids, $child->descendantIds());
        }

        return $ids;
    }
}
