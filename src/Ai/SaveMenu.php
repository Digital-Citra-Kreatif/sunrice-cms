<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Menus\SaveMenu as SaveMenuAction;
use Sunrice\Cms\Models\Menu;

#[Description('Replace a menu\'s items with "items", a tree as cms_get_menu gives it (each item: entry_id, term_id, collection_id or url; labels by language, required for an address; new_tab; children, three levels at most). It is live at once: ask the user first.')]
final class SaveMenu extends CmsTool
{
    protected string $name = 'cms_save_menu';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.menus.update')) {
            return $this->denied('change menus');
        }
        $handle = $request->get('menu');
        $menu = is_string($handle) ? Menu::query()->where('handle', $handle)->first() : null;
        if ($menu === null) {
            return Response::error('Give the "menu" handle (cms_get_menu lists them).');
        }
        $items = $request->get('items');
        if (! is_array($items)) {
            return Response::error('Send "items" as a list.');
        }
        try {
            app(SaveMenuAction::class)->handle($menu, $items);
        } catch (ValidationException $e) {
            return self::invalid($e);
        }

        return $this->json(['saved' => true, 'menu' => $menu->handle, 'items' => $menu->items()->count()]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['menu' => $schema->string()->required(), 'items' => $schema->array()->required()];
    }
}
