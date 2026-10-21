<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Menus\SaveMenu;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * Content → Menus: the menus and their links. Behind cms.menus.view,
 * saving behind cms.menus.update (see CmsPlugin).
 *
 * @internal
 */
final class MenuController
{
    public function index(): Response
    {
        return Inertia::render('Cms/Menus/Index', [
            'menus' => Menu::query()->orderBy('title')->get()->map(fn (Menu $menu): array => ['handle' => $menu->handle, 'title' => $menu->title])->all(),
        ]);
    }

    public function edit(Request $request, Menu $menu): Response
    {
        $menu->load('items.entry.translations', 'items.entry.collection', 'items.term.translations', 'items.term.taxonomy', 'items.collection');

        return Inertia::render('Cms/Menus/Edit', [
            'menu' => ['handle' => $menu->handle, 'title' => $menu->title],
            'items' => self::tree($menu->items->all(), null),
            'locales' => Locales::all(),
            'limits' => ['depth' => SaveMenu::MAX_DEPTH, 'items' => SaveMenu::MAX_ITEMS],
            // What else items may link to: terms with pages, listing pages.
            'terms' => Term::query()->whereHas('taxonomy', fn ($q) => $q->whereNotNull('route'))->with('translations', 'taxonomy')->orderBy('taxonomy_id')->orderBy('sort_order')->limit(500)->get()
                ->map(fn (Term $term): array => ['id' => $term->id, 'title' => $term->title(), 'taxonomy' => $term->taxonomy->title])->all(),
            'listings' => Collection::query()->whereNotNull('listing_route')->orderBy('title')->get()
                ->map(fn (Collection $collection): array => ['id' => $collection->id, 'title' => $collection->title])->all(),
            'can' => ['update' => $request->user()?->can('cms.menus.update') ?? false],
        ]);
    }

    public function update(Request $request, Menu $menu, SaveMenu $save): RedirectResponse
    {
        $items = $request->input('items');
        $save->handle($menu, is_array($items) ? $items : []);

        return back()->with('success', 'Menu saved.');
    }

    /** @return array{title: string, kind: string, live: bool}|null */
    private static function target(MenuItem $item): ?array
    {
        if ($item->entry !== null) {
            $main = $item->entry->mainTranslation();

            return $main === null ? null : ['title' => (string) $main->draft_title, 'kind' => $item->entry->collection->title, 'live' => $main->isLive() && ! $item->entry->trashed()];
        }
        if ($item->term !== null) {
            return ['title' => $item->term->title(), 'kind' => $item->term->taxonomy->title, 'live' => ! $item->term->trashed() && $item->term->taxonomy->route !== null];
        }
        if ($item->collection !== null) {
            return ['title' => $item->collection->title, 'kind' => 'Listing page', 'live' => ! $item->collection->trashed() && $item->collection->listing_route !== null];
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
