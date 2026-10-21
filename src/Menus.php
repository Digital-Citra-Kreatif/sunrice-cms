<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Site\Page;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * Menus for templates: items with their label and URL in a language, and
 * whether they're the page shown (`active`) or lead to it (`active_trail`:
 * the page is below them in the menu, or on the site: an entry's listing
 * page and its parent entries). A link with a query string is the page
 * shown only when the address has the same values, and then wins over the
 * link without it (which is on the trail). Links to entries, terms and
 * listing pages that aren't on the site are left out, with what's under
 * them. Loaded once per request.
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
            }, SiteCache::MENUS);
        }

        // Which link is the page shown: per request, so not cached with them.
        $current = ['path' => self::normalize(request()->url()), 'query' => request()->query(), 'above' => $this->above()];
        $best = self::bestScore($this->resolved[$key], $current);

        return self::mark($this->resolved[$key], $current, $best);
    }

    /**
     * @param  list<array{label: string, url: string, new_tab: bool, children: list<mixed>}>  $items
     * @param  array{path: string, query: array<mixed>, above: list<string>}  $current
     * @return list<MenuLink>
     */
    private static function mark(array $items, array $current, int $best): array
    {
        $marked = [];
        foreach ($items as $item) {
            /** @var list<array{label: string, url: string, new_tab: bool, children: list<mixed>}> $children */
            $children = $item['children'];
            $children = self::mark($children, $current, $best);
            $score = self::score($item['url'], $current);
            $active = $score >= 0 && $score === $best;
            $trail = $score >= 0
                || in_array(self::normalize($item['url']), $current['above'], true) && parse_url($item['url'], PHP_URL_QUERY) === null
                || array_filter($children, fn (array $child): bool => $child['active_trail']) !== [];
            $marked[] = ['label' => $item['label'], 'url' => $item['url'], 'new_tab' => $item['new_tab'], 'active' => $active, 'active_trail' => $trail, 'children' => $children];
        }

        return $marked;
    }

    /**
     * The best score of any link in the menu (-1: none is the page shown).
     *
     * @param  list<array{label: string, url: string, new_tab: bool, children: list<mixed>}>  $items
     * @param  array{path: string, query: array<mixed>, above: list<string>}  $current
     */
    private static function bestScore(array $items, array $current): int
    {
        $best = -1;
        foreach ($items as $item) {
            /** @var list<array{label: string, url: string, new_tab: bool, children: list<mixed>}> $children */
            $children = $item['children'];
            $best = max($best, self::score($item['url'], $current), self::bestScore($children, $current));
        }

        return $best;
    }

    /**
     * How well a link matches the page shown: -1 not at all, else how many
     * of its query string's values the address has (it must have them all).
     *
     * @param  array{path: string, query: array<mixed>, above: list<string>}  $current
     */
    private static function score(string $url, array $current): int
    {
        if (self::normalize($url) !== $current['path']) {
            return -1;
        }
        parse_str((string) parse_url($url, PHP_URL_QUERY), $query);
        foreach ($query as $name => $value) {
            $given = $current['query'][$name] ?? null;
            if (is_array($value) ? ! is_array($given) || array_diff(array_map(strval(...), array_filter($value, is_scalar(...))), array_map(strval(...), array_filter($given, is_scalar(...)))) !== [] : ! is_scalar($given) || (string) $given !== $value) {
                return -1;
            }
        }

        return count($query);
    }

    /**
     * The pages above the entry shown, as compared URLs: its collection's
     * listing page and its parent entries.
     *
     * @return list<string>
     */
    private function above(): array
    {
        $page = Page::current();
        $translation = $page?->type === Page::ENTRY ? $page->entry : null;
        $entry = $translation?->entry;
        if ($page === null || $entry === null) {
            return [];
        }
        $listing = $entry->collection->listingUrl($page->locale);
        $urls = $listing === null ? [] : [self::normalize($listing)];
        foreach ($entry->ancestors() as $ancestor) {
            $live = $ancestor->translation($page->locale);
            $live = $live !== null && $live->isLive() ? $live : $ancestor->mainTranslation();
            $url = $live !== null && $live->isLive() ? app(Site::class)->urlIn($live, $page->locale) : null;
            if ($url !== null) {
                $urls[] = self::normalize($url);
            }
        }

        return $urls;
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
            $url = $translation === null ? null : app(Site::class)->termUrlIn($translation, $locale);

            return $url === null ? null : ['label' => $label ?? $translation->title, 'url' => $url];
        }
        if ($item->collection_id !== null) {
            $collection = $item->collection;
            if ($collection === null || $collection->trashed() || ($url = $collection->listingUrl($locale)) === null) {
                return null;
            }
            // Its filters, in every language (a term filter takes a slug in any language).
            $url .= $item->query_string !== null ? '?'.$item->query_string : '';

            return ['label' => $label ?? $collection->titleIn($locale), 'url' => $url];
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
        // Not live in this language: the main language's page (at this language's address with Site::fallback()).
        $url = $translation !== null && $translation->isLive() ? app(Site::class)->urlIn($translation, $locale) : null;

        return $url === null ? null : ['label' => $label ?? (string) $translation->title, 'url' => $url];
    }
}
