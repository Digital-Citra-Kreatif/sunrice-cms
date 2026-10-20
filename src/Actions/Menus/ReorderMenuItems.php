<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Menus;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Menus;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Support\SiteCache;
use Sunrice\Cms\Support\SortOrder;

/**
 * Puts a menu's items in the order given, keeping their ids: the items of
 * one level (under `$parentId`, or the top level) are numbered 0…n again,
 * the ones given first, the others after them as they were.
 *
 * @api
 */
final class ReorderMenuItems
{
    public function __construct(
        private readonly ActivityLog $activity,
        private readonly SiteCache $cache,
        private readonly Menus $menus,
    ) {}

    /**
     * @param  array<mixed>  $ids  item ids in their new order
     *
     * @throws ValidationException
     */
    public function handle(Menu $menu, array $ids, ?int $parentId = null): void
    {
        $order = [];
        foreach ($ids as $id) {
            if (! is_int($id) && ! (is_string($id) && ctype_digit($id))) {
                throw ValidationException::withMessages(['ids' => 'Give menu item ids (numbers).']);
            }
            $order[] = (int) $id;
        }
        if ($order === [] || count(array_unique($order)) !== count($order)) {
            throw ValidationException::withMessages(['ids' => 'Give each item id once, in the new order.']);
        }

        DB::transaction(function () use ($menu, $order, $parentId): void {
            $level = [];
            foreach (MenuItem::query()->where('menu_id', $menu->id)->where('parent_id', $parentId)
                ->orderBy('sort_order')->orderBy('id')->lockForUpdate()->pluck('id') as $id) {
                $level[] = is_numeric($id) ? (int) $id : 0;
            }
            $unknown = array_diff($order, $level);
            if ($unknown !== []) {
                throw ValidationException::withMessages(['ids' => 'Not items of this menu at this level: '.implode(', ', $unknown).'.']);
            }
            $positions = [];
            foreach ([...$order, ...array_diff($level, $order)] as $index => $id) {
                $positions[$id] = $index;
            }
            SortOrder::write((new MenuItem)->getTable(), $positions);
        });
        $menu->unsetRelation('items');
        $this->menus->flush();
        $this->activity->record('reordered', 'menu', $menu, $menu->title, ['note' => 'items']);
        $this->cache->changed("menu {$menu->handle}", SiteCache::MENUS, SiteCache::PAGES);
    }
}
