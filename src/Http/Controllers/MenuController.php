<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Menus\SaveMenu;
use Sunrice\Cms\Admin\MenuResource;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * A menu's links (/admin/cms/menus/{handle}/links); the menus themselves
 * are MenuResource. Behind cms.menus.view, saving behind cms.menus.update
 * (see CmsPlugin). Only the links: the menu's title and handle are its
 * Settings (cms.menus.configure).
 *
 * @internal
 */
final class MenuController
{
    public function edit(Request $request, Menu $menu): Response
    {
        $menu->load('items.entry.translations', 'items.entry.collection', 'items.term.translations', 'items.term.taxonomy.collections', 'items.collection', 'items.taxonomy.collections');

        return Inertia::render('Cms/Menus/Edit', [
            'menu' => ['handle' => $menu->handle, 'title' => $menu->title],
            'items' => self::tree($menu->items->all(), null),
            'locales' => Locales::all(),
            'limits' => ['depth' => SaveMenu::MAX_DEPTH, 'items' => SaveMenu::MAX_ITEMS],
            // What else items may link to: terms with pages (shared, or in collections: `pages`), listing pages.
            'terms' => Term::query()->whereHas('taxonomy', fn ($q) => $q->whereNotNull('route')->orWhereHas('collections', fn ($q) => $q->where('sunrice_collection_taxonomy.term_pages', true)))
                ->with(['translations', 'taxonomy.collections' => fn ($query) => $query->orderBy('title')])->orderBy('taxonomy_id')->orderBy('sort_order')->limit(500)->get()
                ->map(fn (Term $term): array => ['id' => $term->id, 'title' => $term->title(Locales::default()), 'taxonomy' => $term->taxonomy->title, 'pages' => self::termPages($term)])->all(),
            'listings' => Collection::query()->whereNotNull('listing_route')->orderBy('title')->get()
                ->map(fn (Collection $collection): array => ['id' => $collection->id, 'title' => $collection->title])->all(),
            // Taxonomies with index pages: the shared one (collection null) and their collections'.
            'indexes' => Taxonomy::query()->with(['collections' => fn ($query) => $query->orderBy('title')])->orderBy('title')->get()
                ->map(fn (Taxonomy $taxonomy): array => ['id' => $taxonomy->id, 'title' => $taxonomy->title, 'pages' => self::indexPages($taxonomy)])
                ->filter(fn (array $taxonomy): bool => $taxonomy['pages'] !== [])->values()->all(),
            'can' => ['update' => $request->user()?->can('cms.menus.update') ?? false],
            // Its title and handle: for those who may configure menus, not editors.
            'settings' => MenuResource::configures($request->user()) ? route('sunrice.admin.cms.menus.edit', $menu->handle) : null,
        ]);
    }

    public function update(Request $request, Menu $menu, SaveMenu $save): RedirectResponse
    {
        // The whole tree, always: an empty list clears the menu, a missing
        // one is a mistake (not "clear"), so it's refused.
        /** @var array{items: array<mixed>} $data */
        $data = $request->validate(['items' => ['present', 'array']]);
        $save->handle($menu, $data['items']);

        return back()->with('success', 'Menu saved.');
    }

    /**
     * The pages a term has, for the editor to choose from: the shared one
     * (collection null) and its collections' (CollectionTaxonomy).
     *
     * @return list<array{collection: int|null, title: string}>
     */
    private static function termPages(Term $term): array
    {
        $taxonomy = $term->taxonomy;
        $pages = $taxonomy->route !== null ? [['collection' => null, 'title' => __('Shared page (all collections)')]] : [];
        foreach ($taxonomy->collections as $collection) {
            $pivot = $collection->getRelation('pivot');
            if ($pivot instanceof CollectionTaxonomy && $pivot->term_pages) {
                $pages[] = ['collection' => $collection->id, 'title' => $collection->title];
            }
        }

        return $pages;
    }

    /**
     * A taxonomy's index pages, for the editor to choose from: the shared
     * one (collection null) and its collections' (CollectionTaxonomy).
     *
     * @return list<array{collection: int|null, title: string}>
     */
    private static function indexPages(Taxonomy $taxonomy): array
    {
        $pages = $taxonomy->index_route !== null ? [['collection' => null, 'title' => __('Shared index (all collections)')]] : [];
        foreach ($taxonomy->collections as $collection) {
            $pivot = $collection->getRelation('pivot');
            if ($pivot instanceof CollectionTaxonomy && $pivot->index_page) {
                $pages[] = ['collection' => $collection->id, 'title' => $collection->title];
            }
        }

        return $pages;
    }

    /** @return array{title: string, kind: string, live: bool}|null */
    private static function target(MenuItem $item): ?array
    {
        if ($item->taxonomy !== null) {
            $taxonomy = $item->taxonomy;
            $in = $item->collection;
            $live = ! $taxonomy->trashed() && ($in === null ? $item->collection_id === null && $taxonomy->index_route !== null
                : ! $in->trashed() && $taxonomy->collections->contains(fn (Collection $c): bool => $c->id === $in->id && $c->getRelation('pivot') instanceof CollectionTaxonomy && $c->getRelation('pivot')->index_page));
            $kind = $in === null ? __(':taxonomy · Index page', ['taxonomy' => $taxonomy->title]) : __(':taxonomy · :collection index', ['taxonomy' => $taxonomy->title, 'collection' => $in->title]);

            return ['title' => $taxonomy->title, 'kind' => $kind, 'live' => $live];
        }
        if ($item->entry !== null) {
            $main = $item->entry->mainTranslation();

            return $main === null ? null : ['title' => (string) $main->draft_title, 'kind' => $item->entry->collection->title, 'live' => $main->isLive() && ! $item->entry->trashed()];
        }
        if ($item->term !== null) {
            $in = $item->collection;
            $taxonomy = $item->term->taxonomy;
            $withPages = $taxonomy->collections->filter(fn (Collection $c): bool => $c->getRelation('pivot') instanceof CollectionTaxonomy && $c->getRelation('pivot')->term_pages);
            // In a collection that's gone (or in the trash): not shown.
            $pages = $in === null ? $item->collection_id === null && ($taxonomy->route !== null || $withPages->isNotEmpty()) : ! $in->trashed() && $withPages->contains('id', $in->id);
            $kind = $in !== null ? $taxonomy->title.' · '.$in->title : ($taxonomy->route !== null ? __(':taxonomy · Shared page', ['taxonomy' => $taxonomy->title]) : $taxonomy->title);

            return ['title' => $item->term->title(Locales::default()), 'kind' => $kind, 'live' => ! $item->term->trashed() && $pages];
        }
        if ($item->collection !== null) {
            return ['title' => $item->collection->title, 'kind' => __('Listing page'), 'live' => ! $item->collection->trashed() && $item->collection->listing_route !== null];
        }

        return null;
    }

    /**
     * @param  array<int, MenuItem>  $items
     * @return list<array<string, mixed>>
     */
    private static function tree(array $items, ?int $parent): array
    {
        $tree = [];
        foreach ($items as $item) {
            if ($item->parent_id === $parent) {
                $tree[] = [
                    'entry_id' => $item->entry_id,
                    'term_id' => $item->term_id,
                    'taxonomy_id' => $item->taxonomy_id,
                    'collection_id' => $item->collection_id,
                    // For the editor: what it links to, and whether the site shows it.
                    'target' => self::target($item),
                    'url' => $item->url,
                    'labels' => (object) $item->labels,
                    'new_tab' => $item->new_tab,
                    'query' => $item->query_string,
                    'children' => self::tree($items, $item->id),
                ];
            }
        }

        return $tree;
    }
}
