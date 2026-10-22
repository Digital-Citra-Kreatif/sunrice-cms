<?php

declare(strict_types=1);

namespace Sunrice\Cms\Structure;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Fieldset;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * The site's structure as an array StructureImporter takes (and
 * `sunrice:export-structure` writes as JSON): fieldsets, blueprints,
 * collections with their listing pages, taxonomies with their index pages, global sets, forms,
 * menus and redirects, by handle. With $content, also terms, entries
 * (drafts, every language) and global values. Records point at each
 * other by handle and slug ("pages/about"), not by id, and so do field
 * values: linked entries, terms and media files are written portably
 * (ContentReferences: {"entry": "pages/about"}, {"term": "topics/news"},
 * {"media": "<path>"}). The file names the site's languages (`locales`).
 *
 * @api
 */
final class StructureExporter
{
    public const VERSION = 1;

    private ContentReferences $references;

    public function __construct()
    {
        $this->references = new ContentReferences;
    }

    /** @return array<string, mixed> */
    public function export(bool $content = false): array
    {
        $structure = [
            'sunrice' => self::VERSION,
            // The languages its texts are in, so another site can tell what it lacks.
            'locales' => Locales::all(),
            'fieldsets' => Fieldset::query()->orderBy('handle')->get()->map(fn (Fieldset $f): array => ['handle' => $f->handle, 'title' => $f->title, 'fields' => $f->fields])->all(),
            'blueprints' => Blueprint::query()->orderBy('handle')->get()->map(fn (Blueprint $b): array => ['handle' => $b->handle, 'title' => $b->title, 'fields' => $b->fields])->all(),
            // Translations only when there are some, after the rest.
            'collections' => Collection::query()->with('listings')->orderBy('handle')->get()->map(fn (Collection $c): array => [
                // "blueprints" only when it offers more than its own.
                ...array_diff_key($c->only(StructureImporter::COLLECTION), ['translations' => true, 'routes' => true], $c->blueprints === null ? ['blueprints' => true] : []),
                'listings' => (object) $c->listings->sortBy('locale')->mapWithKeys(fn (CollectionListing $l): array => [$l->locale => $this->references->portable($c->listingSchema(), $l->data)])->all(),
                ...($c->translations !== null ? ['translations' => $c->translations] : []),
                ...($c->routes !== null ? ['routes' => $c->routes] : []),
            ])->all(),
            'taxonomies' => Taxonomy::query()->with('collections', 'listings')->orderBy('handle')->get()->map(fn (Taxonomy $t): array => [
                ...array_diff_key($t->only(StructureImporter::TAXONOMY), ['translations' => true, 'routes' => true]),
                // The shared index page's fields, per language.
                ...(($shared = $this->indexValues($t, null)) !== [] ? ['listings' => (object) $shared] : []),
                'collections' => $t->collections->pluck('handle')->sort()->values()->all(),
                ...($t->collections->isNotEmpty() ? ['collection_pages' => (object) $this->collectionPages($t)] : []),
                ...($t->translations !== null ? ['translations' => $t->translations] : []),
                ...($t->routes !== null ? ['routes' => $t->routes] : []),
            ])->all(),
            'globals' => GlobalSet::query()->with('values')->orderBy('handle')->get()->map(fn (GlobalSet $g): array => [
                ...$g->only(StructureImporter::GLOBAL_SET),
                ...($content ? ['values' => (object) $g->values->sortBy('locale')->mapWithKeys(fn (GlobalValue $v): array => [$v->locale => $this->references->portable($g->schema(), $v->data)])->all()] : []),
            ])->all(),
            'forms' => Form::query()->orderBy('handle')->get()->map(fn (Form $f): array => [...array_diff_key($f->only(StructureImporter::FORM), ['translations' => true]), ...($f->translations !== null ? ['translations' => $f->translations] : [])])->all(),
            'menus' => [],
            'redirects' => Redirect::query()->orderBy('from_path')->get()->map(fn (Redirect $r): array => ['from' => $r->from_path, 'to' => $r->to_url, 'status' => $r->status] + ($r->every_language ? ['every_language' => true] : []))->all(),
        ];
        if ($content) {
            $structure['terms'] = $this->terms();
            $structure['entries'] = $this->entries();
        }
        $structure['menus'] = $this->menus();

        return $structure;
    }

    /** @return list<array<string, mixed>> */
    private function terms(): array
    {
        $terms = Term::query()->with(['taxonomy', 'translations', 'parent.translations'])->orderBy('taxonomy_id')->orderBy('sort_order')->orderBy('id')->get();
        // Parents before children.
        $sorted = [];
        $placed = [];
        for ($pass = 0; count($sorted) < $terms->count() && $pass < 50; $pass++) {
            foreach ($terms as $term) {
                if (! isset($placed[$term->id]) && ($term->parent_id === null || isset($placed[$term->parent_id]) || $term->parent === null)) {
                    $placed[$term->id] = true;
                    $sorted[] = [
                        'taxonomy' => $term->taxonomy->handle,
                        'slug' => self::mainSlug($term),
                        'parent' => $term->parent === null ? null : self::mainSlug($term->parent),
                        'template' => $term->template,
                        'translations' => (object) $term->translations->sortBy('locale')->mapWithKeys(fn (TermTranslation $t): array => [$t->locale => ['title' => $t->title, 'slug' => $t->slug, 'data' => $this->references->portable($term->taxonomy->schema(), $t->data)]])->all(),
                    ];
                }
            }
        }

        return $sorted;
    }

    /** @return list<array<string, mixed>> */
    private function entries(): array
    {
        $entries = [];
        Entry::query()->with(['collection', 'translations', 'parent.translations'])->whereHas('collection', fn ($query) => $query->withoutTrashed())->orderBy('collection_id')->orderBy('sort_order')->orderBy('id')
            ->each(function (Entry $entry) use (&$entries): void {
                $entries[] = [
                    'collection' => $entry->collection->handle,
                    'slug' => self::entrySlug($entry),
                    'parent' => $entry->parent === null ? null : self::entrySlug($entry->parent),
                    'template' => $entry->template,
                    ...($entry->blueprint === null ? [] : ['blueprint' => $entry->blueprint]),
                    'translations' => (object) $entry->translations->sortBy('locale')->mapWithKeys(fn (EntryTranslation $t): array => [$t->locale => [
                        'title' => $t->draft_title, 'slug' => $t->draft_slug, 'data' => $this->references->portable($entry->schema(), $t->draft_data), 'published' => $t->isPublished(),
                        // Its date (a post's, or the one it's scheduled for), so a moved site keeps them.
                        ...($t->isPublished() && $t->published_at !== null ? ['published_at' => $t->published_at->toIso8601String()] : []),
                    ]])->all(),
                ];
            });

        return $entries;
    }

    /** @return list<array<string, mixed>> */
    private function menus(): array
    {
        $menus = [];
        // Links to what's in the trash too (or in a deleted collection): the
        // menu keeps them, and an import finds them there by slug as well.
        $trashed = fn (BelongsTo $query) => $query->withoutGlobalScope(SoftDeletingScope::class);
        foreach (Menu::query()->with([
            'items.entry' => $trashed, 'items.entry.collection' => $trashed, 'items.entry.translations',
            'items.term' => $trashed, 'items.term.taxonomy' => $trashed, 'items.term.translations', 'items.collection' => $trashed, 'items.taxonomy' => $trashed,
        ])->orderBy('handle')->get() as $menu) {
            $menus[] = ['handle' => $menu->handle, 'title' => $menu->title, 'items' => $this->items($menu->items->all(), null)];
        }

        return $menus;
    }

    /**
     * @param  array<int, MenuItem>  $items
     * @return list<array<string, mixed>>
     */
    private function items(array $items, ?int $parent): array
    {
        $tree = [];
        foreach (collect($items)->where('parent_id', $parent)->sortBy('sort_order') as $item) {
            $target = match (true) {
                $item->entry_id !== null => $item->entry === null ? null : ['entry' => $item->entry->collection->handle.'/'.self::entrySlug($item->entry)],
                $item->term_id !== null => $item->term === null ? null : ['term' => $item->term->taxonomy->handle.'/'.self::mainSlug($item->term)]
                    + ($item->collection !== null ? ['collection' => $item->collection->handle] : []),
                // A taxonomy's index page: the shared one, or a collection's.
                $item->taxonomy_id !== null => $item->taxonomy === null || ($item->collection_id !== null && $item->collection === null) ? null
                    : ['index' => $item->taxonomy->handle] + ($item->collection !== null ? ['collection' => $item->collection->handle] : []),
                $item->collection_id !== null => $item->collection === null ? null : ['collection' => $item->collection->handle],
                $item->url !== null => ['url' => $item->url],
                default => null,
            };
            if ($target === null) {
                continue; // what it linked to is gone
            }
            $tree[] = [...$target, 'labels' => (object) $item->labels, 'new_tab' => $item->new_tab, ...($item->query_string !== null ? ['query' => $item->query_string] : []), 'children' => $this->items($items, $item->id)];
        }

        return $tree;
    }

    private static function entrySlug(Entry $entry): string
    {
        return $entry->translation(Locales::default())->draft_slug ?? $entry->mainTranslation()->draft_slug ?? (string) $entry->id;
    }

    private static function mainSlug(Term $term): string
    {
        return $term->translations->firstWhere('locale', Locales::default())->slug ?? $term->translation()->slug ?? (string) $term->id;
    }

    /**
     * An index page's fields per language (the shared one's: collection
     * null), written portably.
     *
     * @return array<string, array<mixed>>
     */
    private function indexValues(Taxonomy $taxonomy, ?int $collection): array
    {
        return $taxonomy->listings->filter(fn (TaxonomyListing $page): bool => $page->collection_id === $collection)->sortBy('locale')
            ->mapWithKeys(fn (TaxonomyListing $page): array => [$page->locale => $this->references->portable($taxonomy->indexSchema(), $page->data) ?? []])->all();
    }

    /**
     * Each attached collection's term pages and index page: whether it has
     * them, their own URL patterns when it has some, and the index page's
     * fields.
     *
     * @return array<string, array<string, mixed>>
     */
    private function collectionPages(Taxonomy $taxonomy): array
    {
        $pages = [];
        foreach ($taxonomy->collections->sortBy('handle') as $collection) {
            $pivot = $collection->getRelation('pivot');
            if ($pivot instanceof CollectionTaxonomy) {
                $values = $this->indexValues($taxonomy, $collection->id);
                $pages[$collection->handle] = ['pages' => $pivot->term_pages]
                    + ($pivot->term_route !== null ? ['route' => $pivot->term_route] : [])
                    + ($pivot->term_routes !== null ? ['routes' => $pivot->term_routes] : [])
                    + ['index' => $pivot->index_page]
                    + ($pivot->index_route !== null ? ['index_route' => $pivot->index_route] : [])
                    + ($pivot->index_routes !== null ? ['index_routes' => $pivot->index_routes] : [])
                    + ($values !== [] ? ['listings' => (object) $values] : []);
            }
        }

        return $pages;
    }
}
