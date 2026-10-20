<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Menus;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Support\Locales;

#[IsReadOnly]
#[Description('Read a menu: its items as stored, as a tree (id, entry_id, term_id or collection_id (a listing page) or url, labels by language (empty: the target\'s title), new_tab, children), ready to change and send back to cms_save_menu; and as the site shows it in a language (labels and URLs; links to pages not on the site left out). Without "handle": the menus.')]
final class GetMenu extends CmsTool
{
    protected string $name = 'cms_get_menu';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.menus.view')) {
            return $this->denied('view menus');
        }
        $handle = $request->get('handle');
        if (! is_string($handle) || $handle === '') {
            return $this->json(['menus' => Menu::query()->orderBy('title')->get()->map(fn (Menu $m): array => ['handle' => $m->handle, 'title' => $m->title])->all()]);
        }
        $menu = Menu::query()->where('handle', $handle)->with('items')->first();
        if ($menu === null) {
            return Response::error('No such menu. Leave out "handle" to list them; create one with save_record (resource "menus").');
        }
        $locale = $request->get('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();

        return $this->json([
            'handle' => $menu->handle,
            'title' => $menu->title,
            'items' => self::tree($menu->items->all(), null),
            'locale' => $locale,
            'site' => app(Menus::class)->get($menu->handle, $locale),
        ]);
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
                $tree[] = array_filter([
                    'id' => $item->id,
                    'entry_id' => $item->entry_id,
                    'term_id' => $item->term_id,
                    'collection_id' => $item->collection_id,
                    'url' => $item->url,
                    'labels' => $item->labels,
                    'new_tab' => $item->new_tab,
                    'children' => self::tree($items, $item->id),
                ], fn (mixed $v): bool => $v !== null);
            }
        }

        return $tree;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'handle' => $schema->string(),
            'locale' => $schema->string()->description('The language the site\'s version is in; the main one when left out.'),
        ];
    }
}
