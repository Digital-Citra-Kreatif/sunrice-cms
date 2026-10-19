<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * Menus for templates: items with their label and URL in a language, and
 * whether they're the page shown (`active`) or lead to it (`active_trail`:
 * the page is below them). Links to entries, terms and listing pages that
 * aren't on the site are left out, with what's under them. Loaded once
 * per request.
 *
 * @phpstan-type MenuLink array{label: string, url: string, new_tab: bool, active: bool, active_trail: bool, children: list<mixed>}
 *
 * @api
 */
final class Menus
{
    /** @var array<string, list<array{label: string, url: string, new_tab: bool, children: list<mixed>}>> */
    private array $resolved = [];

    /**
     * A menu's items: [['label' => …, 'url' => …, 'new_tab' => …, 'active' => …,
     * 'active_trail' => …, 'children' => […]], …]; empty for an unknown menu.
     *
     * @return list<MenuLink>
     */
    public function get(string $handle, ?string $locale = null): array
    {
        $locale ??= Locales::current();
        $key = "{$handle}:{$locale}";
        if (! array_key_exists($key, $this->resolved)) {
            // Its links are full URLs: per host.
            $this->resolved[$key] = app(SiteCache::class)->remember('menu:'.sha1(url('/').'|'.$key), function () use ($handle, $locale): array {
                $menu = Menu::query()->where('handle', $handle)
                    ->with('items.entry.translations', 'items.entry.collection', 'items.term.translations', 'items.term.taxonomy', 'items.collection')->first();

                return $menu === null ? [] : $this->tree($menu->items->all(), null, $locale);
            });
        }

        // Which link is the page shown: per request, so not cached with them.
        return self::mark($this->resolved[$key], self::normalize(request()->url()));
    }

    /**
     * @param  list<array{label: string, url: string, new_tab: bool, children: list<mixed>}>  $items
     * @return list<MenuLink>
     */
    private static function mark(array $items, string $current): array
    {
        $marked = [];
        foreach ($items as $item) {
            /** @var list<array{label: string, url: string, new_tab: bool, children: list<mixed>}> $children */
            $children = $item['children'];
            $children = self::mark($children, $current);
            $active = self::normalize($item['url']) === $current;
            $trail = $active || array_filter($children, fn (array $child): bool => $child['active_trail']) !== [];
            $marked[] = ['label' => $item['label'], 'url' => $item['url'], 'new_tab' => $item['new_tab'], 'active' => $active, 'active_trail' => $trail, 'children' => $children];
        }

        return $marked;
    }

    /** A URL to compare: full, without a trailing slash, query or anchor. */
    private static function normalize(string $url): string
    {
        $url = (string) preg_replace('/[?#].*$/', '', $url);

        return rtrim(str_starts_with($url, '/') ? url($url) : $url, '/');
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
        if ($item->term_id !== null) {
            // A term's page, in this language or else the main one.
            $term = $item->term;
            if ($term === null || $term->trashed()) {
                return null;
            }
            $translation = $term->translations->firstWhere('locale', $locale) ?? $term->translation();
            $translation?->setRelation('term', $term);
            $url = $translation?->url();

            return $url === null ? null : ['label' => $label ?? $translation->title, 'url' => $url];
        }
        if ($item->collection_id !== null) {
            $collection = $item->collection;
            if ($collection === null || $collection->trashed() || ($url = $collection->listingUrl($locale)) === null) {
                return null;
            }

            return ['label' => $label ?? $collection->title, 'url' => $url];
        }
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
