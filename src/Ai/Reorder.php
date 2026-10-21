<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Entries\ReorderEntries;
use Sunrice\Cms\Actions\Menus\ReorderMenuItems;
use Sunrice\Cms\Actions\Terms\ReorderTerms;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Access;

#[Description('Set the manual order of one level of entries in a collection (with Manual order on), terms in a taxonomy, or items in a menu. "in" is the collection, taxonomy or menu handle; "parent_id" the level (left out: the top level, or all entries of a collection without parents); "ids" the items in their new order: they come first, the rest of the level follows as it was, so a short list moves just those to the front. Parents don\'t change. "changed" says whether the order was different.')]
final class Reorder extends CmsTool
{
    protected string $name = 'cms_reorder';

    public function handle(Request $request): Response
    {
        /** @var array{type: string, in: string, ids: list<int>, parent_id?: int|null} $args */
        $args = $request->validate([
            'type' => ['required', 'string', 'in:entries,terms,menu_items'],
            'in' => ['required', 'string', 'max:100'],
            'ids' => ['required', 'array', 'min:1', 'max:1000'],
            'ids.*' => ['integer'],
            'parent_id' => ['nullable', 'integer'],
        ]);
        $parent = $args['parent_id'] ?? null;

        if ($args['type'] === 'entries') {
            $collection = Collection::query()->where('handle', $args['in'])->first();
            if ($collection === null || ! $this->may('view', $collection)) {
                return Response::error('No such collection. cms_list_entries lists them.');
            }
            if (! $this->may('update', $collection)) {
                return $this->denied('order entries of '.$collection->title);
            }
            $changed = app(ReorderEntries::class)->handle($collection, $args['ids'], $parent);
            $order = Entry::query()->where('collection_id', $collection->id)->when($collection->hierarchical, fn ($q) => $q->where('parent_id', $parent))->orderBy('sort_order')->orderBy('id')->pluck('id');
        } elseif ($args['type'] === 'terms') {
            $taxonomy = Taxonomy::query()->where('handle', $args['in'])->first();
            if ($taxonomy === null) {
                return Response::error('No such taxonomy. cms_list_terms lists them.');
            }
            if (! Access::terms($this->user(), $taxonomy)) {
                return $this->denied('order the terms of '.$taxonomy->title);
            }
            $changed = app(ReorderTerms::class)->handle($taxonomy, $args['ids'], $parent);
            $order = Term::query()->where('taxonomy_id', $taxonomy->id)->where('parent_id', $parent)->orderBy('sort_order')->orderBy('id')->pluck('id');
        } else {
            $menu = Menu::query()->where('handle', $args['in'])->first();
            if ($menu === null || ! $this->can('cms.menus.view')) {
                return Response::error('No such menu. list_records with resource "menus" lists them.');
            }
            if (! $this->can('cms.menus.update')) {
                return $this->denied('edit menus');
            }
            $changed = app(ReorderMenuItems::class)->handle($menu, $args['ids'], $parent);
            $order = MenuItem::query()->where('menu_id', $menu->id)->where('parent_id', $parent)->orderBy('sort_order')->orderBy('id')->pluck('id');
        }

        // "changed": false when the order was already so (nothing logged).
        return $this->json(['saved' => true, 'changed' => $changed, 'order' => $order->all()]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'type' => $schema->string()->enum(['entries', 'terms', 'menu_items'])->required(),
            'in' => $schema->string()->description('The collection, taxonomy or menu handle.')->required(),
            'ids' => $schema->array()->items($schema->integer())->description('Ids in their new order.')->required(),
            'parent_id' => $schema->integer()->description('The level: the parent entry, term or item; the top level when left out.'),
        ];
    }
}
