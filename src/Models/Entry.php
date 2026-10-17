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
use Sunrice\Database\Factories\EntryFactory;
use Sunrice\Fields\HydrationContext;
use Sunrice\Fields\TranslationOverlay;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Models\Scopes\HiddenWithParent;
use Sunrice\Support\Locales;

/**
 * @property-read EntryTranslation|null $resolved
 * @property int $id
 * @property int $collection_id
 * @property int|null $blueprint_id
 * @property int|null $author_id
 * @property int|null $parent_id
 * @property string $status
 * @property string|null $template
 * @property Carbon|null $published_at
 * @property int $sort_order
 * @property bool $comments_closed
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 *
 * @use HasFactory<EntryFactory>
 */
class Entry extends Model
{
    /** @use HasFactory<EntryFactory> */
    use HasFactory, SoftDeletes, \Sunrice\References\HasReferences;

    protected $table = 'sunrice_entries';

    protected $guarded = [];

    protected $casts = [
        'published_at' => 'datetime',
        'sort_order' => 'integer',
        'comments_closed' => 'boolean',
    ];

    /** Deepest nesting of entries in a hierarchical collection. */
    public const MAX_DEPTH = 10;

    /** The translation resolved for rendering (set by resolveFor). */
    public ?EntryTranslation $resolved = null;

    public ?string $resolvedLocale = null;

    public bool $isFallback = false;

    /**
     * Memo of merged translation data, keyed by translation object id.
     *
     * @var array<int, array<string, mixed>>
     */
    protected array $mergedData = [];

    /**
     * Data to render instead of the stored data (used by preview).
     *
     * @var array<string, mixed>|null
     */
    public ?array $dataOverride = null;

    /**
     * Shared hydration context (preload caches) — set by EntryQuery
     * when 'assets'/'terms' are eager preloaded.
     */
    public ?HydrationContext $hydrationContext = null;

    protected static function newFactory(): EntryFactory
    {
        return EntryFactory::new();
    }

    protected static function booted(): void
    {
        // Hidden while its collection is deleted (see HiddenWithParent).
        static::addGlobalScope(new HiddenWithParent('collection_id', 'sunrice_collections'));

        // New entries go to the end of their collection's manual order.
        static::creating(function (Entry $entry): void {
            if (! $entry->sort_order) {
                $entry->sort_order = (int) static::withTrashed()->where('collection_id', $entry->collection_id)->max('sort_order') + 1;
            }
        });
    }

    /** @return BelongsTo<Collection, $this> */
    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    /**
     * The parent entry, in a hierarchical collection (Structure →
     * Collections → Hierarchical).
     *
     * @return BelongsTo<Entry, $this>
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Entry::class, 'parent_id');
    }

    /** @return HasMany<Entry, $this> */
    public function children(): HasMany
    {
        return $this->hasMany(Entry::class, 'parent_id');
    }

    /**
     * Parents from the top down (root first), not including this entry.
     * Stops at a missing (trashed) parent or a loop.
     *
     * @return array<int, Entry>
     */
    public function ancestors(): array
    {
        $chain = [];
        $seen = [$this->id => true];
        $current = $this;
        while ($current->parent_id !== null && count($chain) < self::MAX_DEPTH) {
            $parent = $current->parent;
            if ($parent === null || isset($seen[$parent->id])) {
                break;
            }
            $seen[$parent->id] = true;
            array_unshift($chain, $parent);
            $current = $parent;
        }

        return $chain;
    }

    /**
     * Ids of this entry's children, their children and so on.
     *
     * @return array<int, int>
     */
    public function descendantIds(): array
    {
        $ids = [];
        $level = [$this->id];
        for ($depth = 0; $level !== [] && $depth < self::MAX_DEPTH; $depth++) {
            $level = static::query()->withTrashed()->whereIn('parent_id', $level)->pluck('id')
                ->map(fn ($id) => (int) $id)->diff($ids)->values()->all();
            $ids = [...$ids, ...$level];
        }

        return $ids;
    }

    /** @return BelongsTo<Blueprint, $this> */
    public function blueprint(): BelongsTo
    {
        return $this->belongsTo(Blueprint::class);
    }

    /** @return HasMany<EntryTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(EntryTranslation::class);
    }

    /** @return HasMany<Comment, $this> */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Whether visitors can add comments now: the collection allows them,
     * the entry isn't closed, and it isn't older than
     * sunrice.comments.close_after_days. Approved comments stay visible
     * when closed (see Collection::allowsComments()).
     */
    public function acceptsComments(): bool
    {
        if ($this->comments_closed || ! $this->collection?->allowsComments()) {
            return false;
        }

        $days = config('sunrice.comments.close_after_days');

        return $days === null || $this->published_at === null || $this->published_at->gt(now()->subDays((int) $days));
    }

    /** @return BelongsToMany<Term, $this> */
    public function terms(): BelongsToMany
    {
        return $this->belongsToMany(Term::class, 'sunrice_entry_term');
    }

    /** @return BelongsTo<Model, $this> */
    public function author(): BelongsTo
    {
        /** @var class-string<Model> $model */
        $model = config('sunrice.auth.user_model');

        return $this->belongsTo($model, 'author_id');
    }

    /**
     * The entry's blueprint override, or the collection default.
     */
    public function activeBlueprint(): ?Blueprint
    {
        return $this->blueprint ?? $this->collection?->blueprint;
    }

    public function translation(string $locale): ?EntryTranslation
    {
        $translations = $this->relationLoaded('translations')
            ? $this->translations
            : $this->translations()->get();

        return $translations->firstWhere('locale', $locale);
    }

    public function mainTranslation(): ?EntryTranslation
    {
        return $this->translation(Locales::main());
    }

    /**
     * Whole-entry fallback: the Ready translation for $locale, otherwise
     * the main-language translation. Never mixes fields across locales.
     */
    public function resolveFor(string $locale): EntryTranslation
    {
        $main = $this->mainTranslation();
        $resolved = $main;

        if (! Locales::isMain($locale)) {
            $translation = $this->translation($locale);
            if ($translation?->is_ready) {
                $resolved = $translation;
            }
        }

        $this->resolved = $resolved ?? new EntryTranslation([
            'locale' => $locale,
            'title' => '',
            'slug' => '',
            'data' => [],
            'seo' => [],
        ]);
        $this->resolvedLocale = $locale;
        $this->isFallback = $resolved !== null && $resolved->locale !== $locale;
        $this->mergedData = [];

        return $this->resolved;
    }

    /**
     * Translation used for public rendering: resolved if set, else main.
     */
    public function renderedTranslation(): ?EntryTranslation
    {
        return $this->resolved ?? $this->mainTranslation();
    }

    // ---- Template-facing accessors ----------------------------------------

    public function getTitleAttribute(): ?string
    {
        return $this->renderedTranslation()?->title;
    }

    public function getSlugAttribute(): ?string
    {
        return $this->renderedTranslation()?->slug;
    }

    /**
     * Field data for the rendered translation. A secondary language only
     * stores its translated text; the layout and every non-translatable
     * value come from the main language (see TranslationOverlay).
     *
     * @return array<string, mixed>
     */
    public function getDataAttribute(): array
    {
        if ($this->dataOverride !== null) {
            return $this->dataOverride;
        }

        $translation = $this->renderedTranslation();
        if (! $translation instanceof EntryTranslation) {
            return [];
        }

        return $this->mergedData[spl_object_id($translation)] ??= $this->dataFor($translation);
    }

    /**
     * Merged data for a translation, optionally overriding the stored
     * main/translation data (preview passes their drafts).
     *
     * @param  array<string, mixed>|null  $overlay
     * @param  array<string, mixed>|null  $main
     * @return array<string, mixed>
     */
    public function dataFor(EntryTranslation $translation, ?array $overlay = null, ?array $main = null): array
    {
        $overlay ??= (array) ($translation->data ?? []);
        if (Locales::isMain($translation->locale)) {
            return $overlay;
        }

        $schema = $this->activeBlueprint()?->schema();
        $main ??= (array) ($this->mainTranslation()->data ?? []);

        return $schema === null ? $overlay : TranslationOverlay::merge($schema->fields(), $main, $overlay);
    }

    /** @return array<string, mixed> */
    public function getSeoAttribute(): array
    {
        return $this->renderedTranslation() instanceof EntryTranslation
            ? $this->renderedTranslation()->seo
            : [];
    }

    /** Null when the collection's entries have no page of their own. */
    public function getUrlAttribute(): ?string
    {
        return app(UrlGenerator::class)->entryUrl($this, $this->resolvedLocale);
    }

    public function getLocaleAttribute(): ?string
    {
        return $this->resolvedLocale;
    }

    /**
     * Hydrated custom-field value for templates.
     */
    public function get(string $handle, ?HydrationContext $ctx = null): mixed
    {
        $blueprint = $this->activeBlueprint();
        if ($blueprint === null) {
            return $this->data[$handle] ?? null;
        }

        $ctx ??= $this->hydrationContext ?? new HydrationContext($this->resolvedLocale ?? Locales::main());

        return $blueprint->schema()->hydrateField($handle, $this->data[$handle] ?? null, $ctx);
    }

    // ---- Scopes -----------------------------------------------------------

    /**
     * @param  Builder<Entry>  $query
     * @return Builder<Entry>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')->where('published_at', '<=', now());
    }

    /**
     * @param  Builder<Entry>  $query
     * @return Builder<Entry>
     */
    public function scopeInCollection(Builder $query, string $handle): Builder
    {
        return $query->whereHas('collection', fn (Builder $q) => $q->where('handle', $handle));
    }

    /**
     * @param  Builder<Entry>  $query
     * @return Builder<Entry>
     */
    public function scopeScheduled(Builder $query): Builder
    {
        return $query->where('status', 'published')->where('published_at', '>', now());
    }
}
