<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;

#[IsReadOnly]
#[Description('Without "menu": the menus (handle, title). With one: its items as a tree, each with entry_id, term_id, collection_id (a listing page) or url, labels by language and new_tab, as cms_save_menu takes them.')]
final class GetMenu extends CmsTool
{
    protected string $name = 'cms_get_menu';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.menus.view')) {
            return $this->denied('see menus');
        }
        $handle = $request->get('menu');
        if (! is_string($handle) || $handle === '') {
            return $this->json(Menu::query()->orderBy('title')->get(['handle', 'title'])->toArray());
        }
        $menu = Menu::query()->where('handle', $handle)->first();
        if ($menu === null) {
            return Response::error('No such menu.');
        }

        return $this->json(['handle' => $menu->handle, 'title' => $menu->title, 'items' => self::tree($menu->items()->orderBy('sort_order')->get()->all(), null)]);
    }

    /**
     * @param  array<int, MenuItem>  $items
     * @return list<array<string, mixed>>
     */
    public static function tree(array $items, ?int $parent): array
    {
        $tree = [];
        foreach ($items as $item) {
            if ($item->parent_id === $parent) {
                $tree[] = [
                    'entry_id' => $item->entry_id, 'term_id' => $item->term_id, 'collection_id' => $item->collection_id, 'url' => $item->url,
                    'labels' => (object) $item->labels, 'new_tab' => $item->new_tab, 'children' => self::tree($items, $item->id),
                ];
            }
        }

        return $tree;
    }

    public function schema(JsonSchema $schema): array
    {
        return ['menu' => $schema->string()];
    }
}
