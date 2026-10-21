<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Menus\SaveMenu as Save;
use Sunrice\Cms\Models\Menu;

#[Description('Replace a menu\'s items with a tree (send every item: what\'s left out is removed). An item: one target, "entry_id", "term_id" (its page), "collection_id" (its listing page; "query" adds its filters in every language, "listing_type=for-sale") or "url"; "labels" by language (needed for a url; empty: the target\'s title); "new_tab"; "children" (three levels at most). Start from cms_get_menu\'s items. Live as soon as it\'s saved: ask first. Item ids change; to only reorder, use cms_reorder.')]
final class SaveMenu extends CmsTool
{
    protected string $name = 'cms_save_menu';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.menus.update')) {
            return $this->denied('edit menus');
        }
        /** @var array{handle: string, items: array<mixed>} $args */
        $args = $request->validate(['handle' => ['required', 'string'], 'items' => ['present', 'array', 'list']]);
        $menu = Menu::query()->where('handle', $args['handle'])->first();
        if ($menu === null) {
            return Response::error('No such menu. Create it with save_record (resource "menus") first.');
        }
        app(Save::class)->handle($menu, self::withoutIds($args['items']));
        $menu->load('items');

        return $this->json(['saved' => true, 'handle' => $menu->handle, 'items' => GetMenu::tree($menu->items->all(), null)]);
    }

    /**
     * cms_get_menu's items without their ids, which saving replaces.
     *
     * @param  array<mixed>  $items
     * @return array<mixed>
     */
    private static function withoutIds(array $items): array
    {
        return array_map(function (mixed $item): mixed {
            if (! is_array($item)) {
                return $item;
            }
            unset($item['id']);
            if (is_array($item['children'] ?? null)) {
                $item['children'] = self::withoutIds($item['children']);
            }

            return $item;
        }, $items);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'handle' => $schema->string()->required(),
            'items' => $schema->array()->items($schema->object())->description('The whole tree.')->required(),
        ];
    }
}
