<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Support\Locales;

/**
 * Menus for templates: items with their label and URL in a language.
 * Links to entries that aren't live (drafts, trashed, without a page) are
 * left out, with what's under them. Loaded once per request.
 *
 * @api
 */
final class Menus
{
    /** @var array<string, list<array{label: string, url: string, new_tab: bool, children: list<mixed>}>> */
    private array $resolved = [];

    /**
     * A menu's items: [['label' => …, 'url' => …, 'new_tab' => …, 'children' => […]], …];
     * empty for an unknown menu.
     *
     * @return list<array{label: string, url: string, new_tab: bool, children: list<mixed>}>
     */
    public function get(string $handle, ?string $locale = null): array
    {
        $locale ??= Locales::current();
        $key = "{$handle}:{$locale}";
        if (! array_key_exists($key, $this->resolved)) {
            $menu = Menu::query()->where('handle', $handle)->with('items.entry.translations', 'items.entry.collection')->first();
            $this->resolved[$key] = $menu === null ? [] : $this->tree($menu->items->all(), null, $locale);
        }

        return $this->resolved[$key];
    }

    public function flush(): void
    {
        $this->resolved = [];
    }

    /**
     * @param  array<int, MenuItem>  $items
     * @return list<array{label: string, url: string, new_tab: bool, children: list<mixed>}>
     */
    private function tree(array $items, ?int $parent, string $locale): array
    {
        $tree = [];
        foreach ($items as $item) {
            if ($item->parent_id !== $parent) {
                continue;
            }
            $link = $this->link($item, $locale);
            if ($link === null) {
                continue;
            }
            $tree[] = [...$link, 'new_tab' => $item->new_tab, 'children' => $this->tree($items, $item->id, $locale)];
        }

        return $tree;
    }

    /** @return array{label: string, url: string}|null */
    private function link(MenuItem $item, string $locale): ?array
    {
        $label = $item->labels[$locale] ?? $item->labels[Locales::default()] ?? null;
        if ($item->entry_id === null) {
            return $item->url === null ? null : ['label' => $label ?? $item->url, 'url' => $item->url];
        }
        $entry = $item->entry;
        if (! $entry instanceof Entry || $entry->trashed() || $entry->collection->trashed()) {
            return null;
        }
        $translation = $entry->translation($locale);
        $translation = $translation !== null && $translation->isLive() ? $translation : $entry->mainTranslation();
        $url = $translation !== null && $translation->isLive() ? $translation->url() : null;

        return $url === null ? null : ['label' => $label ?? (string) $translation->title, 'url' => $url];
    }
}
