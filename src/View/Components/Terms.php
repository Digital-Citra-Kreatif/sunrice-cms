<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection as Items;
use Illuminate\Support\Facades\DB;
use Illuminate\View\Component;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Site\Page;
use Sunrice\Cms\Support\Locales;

/**
 * A taxonomy's terms for a part of a template, such as a list of
 * categories with their counts:
 *
 *     <x-sunrice-cms::terms taxonomy="categories" hide-empty>
 *         <ul>@foreach ($component->terms as $term)<li><a href="{{ $term->url() }}">{{ $term->title() }}</a> ({{ $term->entries_count }})</li>@endforeach</ul>
 *     </x-sunrice-cms::terms>
 *
 * In the editors' order (or `order-by`: title, entries, created_at, "-"
 * first for the other way round), each with `entries_count` (its live
 * entries in the current language, the main language's standing in as
 * on their pages, of `collection` when given). `tree`:
 * only the top-level terms, each with `children` (to any depth).
 * `parent`: the terms directly under a term (its slug or id), or "top".
 * `limit`: at most this many. `:entry="$entry"`: only that entry's terms.
 * `include-children`: `entries_count` counts the entries of the terms
 * under a term too (each entry once), as a filter by the term finds them.
 * With `hide-empty` and `tree`, a term with entries keeps its ancestors.
 * `$component->isCurrent($term)`: whether it's the term page shown.
 *
 * @api
 */
final class Terms extends Component
{
    /** @var Items<int, Term> */
    public Items $terms;

    private ?int $currentTermId = null;

    /**
     * @param  int|string|null  $parent  a term's slug or id: the terms directly under it; "top": the top-level ones
     * @param  string  $orderBy  manual (the editors' order), title, entries, created_at; "-title" for the other way round
     */
    public function __construct(
        string $taxonomy,
        ?string $collection = null,
        bool $hideEmpty = false,
        bool $tree = false,
        Entry|EntryTranslation|int|null $entry = null,
        int|string|null $parent = null,
        string $orderBy = 'manual',
        ?int $limit = null,
        bool $includeChildren = false,
    ) {
        $this->currentTermId = Page::current()?->term?->term_id;
        $taxonomyModel = Taxonomy::query()->where('handle', $taxonomy)->first();
        if ($taxonomyModel === null) {
            $this->terms = new Items;

            return;
        }
        $locale = Locales::current();
        $collectionId = $collection !== null ? Collection::query()->where('handle', $collection)->value('id') : null;
        $entryId = $entry instanceof EntryTranslation ? $entry->entry_id : ($entry instanceof Entry ? $entry->id : $entry);

        $entries = fn (Builder $q) => $q
            ->when($collection !== null, fn (Builder $q) => $q->where('collection_id', $collectionId ?? 0))
            ->whereIn('sunrice_entries.id', EntryTranslation::query()->live()->shownIn($locale)->select('entry_id'));
        $all = Term::query()->where('taxonomy_id', $taxonomyModel->id)->with('translations')
            ->when(! $includeChildren, fn (Builder $q) => $q->withCount(['entries' => $entries]))
            ->when($entryId !== null, fn (Builder $q) => $q->whereHas('entries', fn (Builder $e) => $e->where('sunrice_entries.id', $entryId)))
            ->orderBy('sort_order')->orderBy('id')->get()->toBase();
        // Linked without more queries: $term->url() reads the term and its taxonomy from each translation.
        foreach ($all as $term) {
            $term->setRelation('taxonomy', $taxonomyModel);
            foreach ($term->translations as $translation) {
                $translation->setRelation('term', $term);
            }
        }
        if ($includeChildren) {
            self::countWithChildren($all, $entries);
        }
        $terms = $hideEmpty ? self::withEntries($all, $tree) : $all;
        $terms = self::sorted($terms, $orderBy);
        $parentId = self::parentId($all, $parent);

        if ($tree) {
            // Children under their parents; a term whose parent isn't shown goes to the top.
            $byParent = $terms->groupBy(fn (Term $term): int => $term->parent_id !== null && $terms->contains('id', $term->parent_id) ? $term->parent_id : 0);
            foreach ($terms as $term) {
                $term->setRelation('children', $byParent->get($term->id, new Items)->values());
            }
        }
        $list = match (true) {
            $parent === null => $tree ? $terms->filter(fn (Term $term): bool => $term->parent_id === null || ! $terms->contains('id', $term->parent_id)) : $terms,
            default => $terms->filter(fn (Term $term): bool => $term->parent_id === $parentId),
        };
        $list = $list->values();
        $this->terms = $limit !== null ? $list->take(max(0, $limit))->values() : $list;
    }

    /** Whether the page shown is this term's. */
    public function isCurrent(Term|TermTranslation $term): bool
    {
        $id = $term instanceof TermTranslation ? $term->term_id : $term->id;

        return $this->currentTermId !== null && $this->currentTermId === $id;
    }

    public function render(): string
    {
        return '{{ $slot }}';
    }

    /**
     * Sets each term's entries_count to the entries of it and the terms
     * under it, each entry once (one query).
     *
     * @param  Items<int, Term>  $terms
     * @param  \Closure(Builder<Entry>): mixed  $entries  the entries that count
     */
    private static function countWithChildren(Items $terms, \Closure $entries): void
    {
        $pairs = DB::table('sunrice_entry_term')->whereIn('term_id', $terms->pluck('id')->all())
            ->whereIn('entry_id', tap(Entry::query(), $entries)->select('sunrice_entries.id'))
            ->get(['term_id', 'entry_id']);
        /** @var array<int, array<int, true>> $own */
        $own = [];
        foreach ($pairs as $pair) {
            /** @var object{term_id: int|string, entry_id: int|string} $pair */
            $own[(int) $pair->term_id][(int) $pair->entry_id] = true;
        }
        $children = $terms->groupBy(fn (Term $term): int => $term->parent_id ?? 0);
        $collect = function (Term $term, int $depth) use (&$collect, $own, $children): array {
            $ids = $own[$term->id] ?? [];
            foreach ($depth < 20 ? $children->get($term->id, new Items) : [] as $child) {
                $ids += $collect($child, $depth + 1);
            }

            return $ids;
        };
        foreach ($terms as $term) {
            $term->setAttribute('entries_count', count($collect($term, 0)));
        }
    }

    /**
     * The terms with entries, and in a tree their ancestors too.
     *
     * @param  Items<int, Term>  $terms
     * @return Items<int, Term>
     */
    private static function withEntries(Items $terms, bool $tree): Items
    {
        $byId = $terms->keyBy('id');
        $keep = [];
        foreach ($terms as $term) {
            if (self::count($term) === 0) {
                continue;
            }
            for ($at = $term, $depth = 0; $at !== null && ! isset($keep[$at->id]) && $depth < 20; $depth++) {
                $keep[$at->id] = true;
                $at = $tree && $at->parent_id !== null ? $byId->get($at->parent_id) : null;
            }
        }

        return $terms->filter(fn (Term $term): bool => isset($keep[$term->id]))->values();
    }

    private static function count(Term $term): int
    {
        $count = $term->getAttribute('entries_count');

        return is_numeric($count) ? (int) $count : 0;
    }

    /**
     * @param  Items<int, Term>  $terms
     * @return Items<int, Term>
     */
    private static function sorted(Items $terms, string $orderBy): Items
    {
        $descending = str_starts_with($orderBy, '-');
        $by = match (ltrim($orderBy, '-')) {
            'title', 'name' => fn (Term $term): string => mb_strtolower($term->title(Locales::current())),
            'entries', 'count' => fn (Term $term): int => self::count($term),
            'created_at' => fn (Term $term): int => $term->created_at?->getTimestamp() ?? 0,
            default => null,
        };
        if ($by === null) {
            return $descending ? $terms->reverse()->values() : $terms;
        }

        return ($descending ? $terms->sortByDesc($by) : $terms->sortBy($by))->values();
    }

    /**
     * The parent asked for: null for the top level, -1 when no term has that slug or id.
     *
     * @param  Items<int, Term>  $terms
     */
    private static function parentId(Items $terms, int|string|null $parent): ?int
    {
        if ($parent === null || $parent === 'top' || $parent === 'root' || $parent === '') {
            return null;
        }
        $found = $terms->first(fn (Term $term): bool => (is_int($parent) || ctype_digit($parent)) ? $term->id === (int) $parent
            : $term->translations->contains('slug', $parent));

        return $found === null ? -1 : $found->id;
    }
}
