<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection as Items;
use Illuminate\View\Component;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * A taxonomy's terms for a part of a template, such as a list of
 * categories with their counts:
 *
 *     <x-sunrice-cms::terms taxonomy="categories" hide-empty>
 *         <ul>@foreach ($component->terms as $term)<li><a href="{{ $term->url() }}">{{ $term->title() }}</a> ({{ $term->entries_count }})</li>@endforeach</ul>
 *     </x-sunrice-cms::terms>
 *
 * In the editors' order, each with `entries_count` (its live entries in
 * the current language, of `collection` when given). `tree`: only the
 * top-level terms, each with `children` (to any depth). `:entry="$entry"`:
 * only that entry's terms.
 *
 * @api
 */
final class Terms extends Component
{
    /** @var Items<int, Term> */
    public Items $terms;

    public function __construct(
        string $taxonomy,
        ?string $collection = null,
        bool $hideEmpty = false,
        bool $tree = false,
        Entry|EntryTranslation|int|null $entry = null,
    ) {
        $taxonomyId = Taxonomy::query()->where('handle', $taxonomy)->value('id');
        if ($taxonomyId === null) {
            $this->terms = new Items;

            return;
        }
        $locale = Locales::current();
        $collectionId = $collection !== null ? Collection::query()->where('handle', $collection)->value('id') : null;
        $entryId = $entry instanceof EntryTranslation ? $entry->entry_id : ($entry instanceof Entry ? $entry->id : $entry);

        $terms = Term::query()->where('taxonomy_id', $taxonomyId)->with('translations')
            ->withCount(['entries' => fn (Builder $q) => $q
                ->when($collection !== null, fn (Builder $q) => $q->where('collection_id', $collectionId ?? 0))
                ->whereIn('sunrice_entries.id', EntryTranslation::query()->live()->where('locale', $locale)->select('entry_id'))])
            ->when($entryId !== null, fn (Builder $q) => $q->whereHas('entries', fn (Builder $e) => $e->where('sunrice_entries.id', $entryId)))
            ->orderBy('sort_order')->orderBy('id')->get();
        if ($hideEmpty) {
            $terms = $terms->filter(fn (Term $term): bool => ($term->getAttribute('entries_count') ?? 0) > 0)->values();
        }
        if (! $tree) {
            $this->terms = $terms->toBase();

            return;
        }
        // Children under their parents; a term whose parent isn't shown goes to the top.
        $byParent = $terms->groupBy(fn (Term $term): int => $term->parent_id !== null && $terms->contains('id', $term->parent_id) ? $term->parent_id : 0);
        foreach ($terms as $term) {
            $term->setRelation('children', $byParent->get($term->id, new Items)->values());
        }
        $this->terms = $byParent->get(0, new Items)->values()->toBase();
    }

    public function render(): string
    {
        return '{{ $slot }}';
    }
}
