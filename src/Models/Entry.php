<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Settings\CommentSettings;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\Ids;
use Sunrice\Cms\Support\Locales;

/**
 * A piece of content in a collection. Its title, slug and fields live in
 * its translations, one per language (EntryTranslation). Created with
 * CreateEntry; trashed with TrashEntry.
 *
 * @property int $id
 * @property int $collection_id
 * @property int|null $author_id
 * @property int|null $parent_id
 * @property int $sort_order
 * @property string|null $template a Blade view for this entry alone
 * @property string|null $blueprint its own blueprint (a handle the collection allows); null: the collection's
 * @property bool $comments_closed it takes no new comments
 * @property list<int>|null $draft_terms its terms chosen and not published yet (ids, of the taxonomies attached to its collection); null: the live ones (terms())
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read Collection $collection
 * @property-read Entry|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Entry> $children
 * @property-read \Illuminate\Database\Eloquent\Collection<int, EntryTranslation> $translations
 *
 * @api
 */
class Entry extends Model
{
    use SoftDeletes;

    protected $table = 'sunrice_entries';

    /** How deep entries may nest under parents. */
    public const MAX_DEPTH = 10;

    protected $guarded = [];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['comments_closed' => 'boolean', 'draft_terms' => 'array'];
    }

    /** @return HasMany<Comment, $this> */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Whether it takes new comments now: its collection allows them, it
     * isn't closed (by hand, or by Settings → Comments' days after its
     * publish date) and it's on the site in some language.
     */
    public function acceptsComments(): bool
    {
        if (! $this->collection->comments || $this->comments_closed || $this->trashed() || $this->collection->trashed()) {
            return false;
        }
        $days = app(CommentSettings::class)->closeAfterDays;
        $published = null;
        foreach ($this->translations as $translation) {
            if ($translation->isLive() && $translation->published_at !== null && ($published === null || $translation->published_at->lt($published))) {
                $published = $translation->published_at;
            }
        }
        if ($published === null) {
            return false;
        }

        return $days === null || now()->lt($published->copy()->addDays($days));
    }

    /** @return BelongsTo<Collection, $this> */
    public function collection(): BelongsTo
    {
        // Trashed collections too: their entries still exist.
        return $this->belongsTo(Collection::class)->withTrashed();
    }

    /**
     * The blueprint its fields come from: its own when the collection
     * allows it (ChangeBlueprint), else the collection's.
     */
    public function blueprintHandle(): ?string
    {
        return $this->blueprint !== null && in_array($this->blueprint, $this->collection->allowedBlueprints(), true)
            ? $this->blueprint
            : $this->collection->blueprint;
    }

    /**
     * Its fields: those of its blueprint (see blueprintHandle()). Use this,
     * not the collection's schema, for anything about this entry.
     */
    public function schema(): Schema
    {
        return $this->collection->schemaFor($this->blueprint);
    }

    /**
     * The entries filled in with a blueprint (trashed ones too): their own
     * when their collection offers it, else their collection's.
     *
     * @return Builder<Entry>
     */
    public static function usingBlueprint(string $handle): Builder
    {
        $query = self::withTrashed();
        $collections = Collection::withTrashed()->get(['id', 'blueprint', 'blueprints'])
            ->filter(fn (Collection $collection): bool => in_array($handle, $collection->allowedBlueprints(), true));
        if ($collections->isEmpty()) {
            return $query->whereRaw('1 = 0');
        }

        return $query->where(function (Builder $any) use ($collections, $handle): void {
            foreach ($collections as $collection) {
                $any->orWhere(function (Builder $in) use ($collection, $handle): void {
                    $in->where('collection_id', $collection->id);
                    $collection->blueprint === $handle
                        // Its own blueprint: unless the entry picked another one the collection offers.
                        ? $in->where(fn (Builder $own) => $own->whereNull('blueprint')->orWhereNotIn('blueprint', array_values(array_diff($collection->allowedBlueprints(), [$handle]))))
                        : $in->where('blueprint', $handle);
                });
            }
        });
    }

    /** @return HasMany<EntryTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(EntryTranslation::class);
    }

    /**
     * Its live terms, shared by all its languages: those chosen in the
     * editor's Taxonomies card, for the taxonomies attached to its
     * collection, as last published (PublishEntry). Terms fields don't
     * count: their values are fields like any other. A taxonomy detached
     * from the collection keeps its terms here, unseen, until it's
     * attached again.
     *
     * @return BelongsToMany<Term, $this>
     */
    public function terms(): BelongsToMany
    {
        return $this->belongsToMany(Term::class, 'sunrice_entry_term')->whereExists(self::termAttached());
    }

    /**
     * For a query of sunrice_entry_term (or one joining it): only the rows
     * whose term's taxonomy is attached to the entry's collection, those
     * the site shows. Entry::terms() and Term::entries() use it.
     *
     * @internal
     *
     * @return \Closure(QueryBuilder): void
     */
    public static function termAttached(): \Closure
    {
        return function (QueryBuilder $query): void {
            $query->selectRaw('1')->from('sunrice_collection_taxonomy as attached')
                ->join('sunrice_entries as attached_entry', 'attached_entry.collection_id', '=', 'attached.collection_id')
                ->join('sunrice_terms as attached_term', 'attached_term.taxonomy_id', '=', 'attached.taxonomy_id')
                ->whereColumn('attached_entry.id', 'sunrice_entry_term.entry_id')
                ->whereColumn('attached_term.id', 'sunrice_entry_term.term_id');
        };
    }

    /**
     * The ids of its live terms (not those in the trash).
     *
     * @return list<int>
     */
    public function liveTermIds(): array
    {
        return Ids::of($this->terms()->pluck('sunrice_terms.id'));
    }

    /**
     * The ids of its terms as the editor shows them: those chosen and not
     * published yet, else the live ones.
     *
     * @return list<int>
     */
    public function draftTermIds(): array
    {
        return $this->draft_terms !== null ? array_values(array_filter($this->draft_terms, is_int(...))) : $this->liveTermIds();
    }

    /** Whether terms were chosen that aren't published yet (publishing any of its languages publishes them). */
    public function hasUnpublishedTerms(): bool
    {
        return $this->draft_terms !== null;
    }

    /**
     * The parent entry, in a hierarchical collection.
     *
     * @return BelongsTo<Entry, $this>
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /** @return HasMany<Entry, $this> */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * The entries above this one, top-down (for breadcrumbs).
     *
     * @return list<Entry>
     */
    public function ancestors(): array
    {
        $ancestors = [];
        $seen = [$this->id => true];
        for ($parent = $this->parent; $parent !== null && ! isset($seen[$parent->id]) && count($ancestors) < self::MAX_DEPTH; $parent = $parent->parent) {
            $seen[$parent->id] = true;
            array_unshift($ancestors, $parent);
        }

        return $ancestors;
    }

    public function translation(string $locale): ?EntryTranslation
    {
        return $this->translations->firstWhere('locale', $locale);
    }

    /**
     * What a visitor reading a language sees of this entry: its live
     * translation there, else (with the main-language fallback, see
     * Site::fallback()) the main language's live one; null when neither
     * is live or the entry is in the trash. Its url() and values() are in
     * that language: a breadcrumb or link to the page there.
     */
    public function shownIn(?string $locale = null): ?EntryTranslation
    {
        $locale ??= Locales::current();
        if ($this->trashed()) {
            return null;
        }
        $own = $this->translation($locale);
        $shown = $own !== null && $own->isLive() ? $own : null;
        if ($shown === null && $locale !== Locales::default() && Site::fallback()) {
            $main = $this->translation(Locales::default());
            $shown = $main !== null && $main->isLive() ? $main : null;
        }
        $shown?->setRelation('entry', $this);

        return $shown?->hydrateWith(new HydrationContext($locale));
    }

    /**
     * The translation in the main language, which holds the fields shared
     * by all languages; the oldest one if there's none in it.
     */
    public function mainTranslation(): ?EntryTranslation
    {
        return $this->translation(Locales::default()) ?? $this->translations->sortBy('id')->first();
    }

    /**
     * Where other content points at this entry through its fields: entries
     * (draft or live), terms and global sets, a row per language and field.
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, ContentReference>
     */
    public function referencedBy(): \Illuminate\Database\Eloquent\Collection
    {
        return ContentReference::query()->where('target_type', ContentReference::ENTRY)->where('target_id', $this->id)
            ->whereNot(fn ($query) => $query->where('source_type', ContentReference::ENTRY)->where('source_id', $this->id))
            ->orderBy('id')->get();
    }
}
