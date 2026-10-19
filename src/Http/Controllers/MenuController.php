<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Menus\SaveMenu;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
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
        $menu->load('items.entry.translations', 'items.entry.collection');

        return Inertia::render('Cms/Menus/Edit', [
            'menu' => ['handle' => $menu->handle, 'title' => $menu->title],
            'items' => self::tree($menu->items->all(), null),
            'locales' => Locales::all(),
            'limits' => ['depth' => SaveMenu::MAX_DEPTH, 'items' => SaveMenu::MAX_ITEMS],
            'can' => ['update' => $request->user()?->can('cms.menus.update') ?? false],
        ]);
    }

    public function update(Request $request, Menu $menu, SaveMenu $save): RedirectResponse
    {
        $items = $request->input('items');
        $save->handle($menu, is_array($items) ? $items : []);

        return back()->with('success', 'Menu saved.');
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
                $entry = $item->entry;
                $main = $entry?->mainTranslation();
                $tree[] = [
                    'entry_id' => $item->entry_id,
                    // For the editor: what the entry is, and whether the site shows it.
                    'entry' => $entry === null || $main === null ? null : ['title' => $main->draft_title, 'collection' => $entry->collection->title, 'live' => $main->isLive() && ! $entry->trashed()],
                    'url' => $item->url,
                    'labels' => (object) $item->labels,
                    'new_tab' => $item->new_tab,
                    'children' => self::tree($items, $item->id),
                ];
            }
        }

        return $tree;
    }
}
