<?php

declare(strict_types=1);

namespace Sunrice\Frontend;

use Illuminate\Support\Collection;
use Sunrice\Cache\ContentCache;
use Sunrice\Models\Collection as ContentCollection;
use Sunrice\Models\Entry;
use Sunrice\Models\Menu;
use Sunrice\Models\MenuItem;
use Sunrice\Models\Term;
use Sunrice\Support\Locales;
use Sunrice\Support\SafeUrl;

/**
 * Resolves a menu's items into a tree of MenuNodes for the active
 * (or given) locale. Item targets are resolved through UrlGenerator
 * so links always follow slug changes and the rendered locale.
 * Items whose target is unpublished or trashed are skipped.
 */
class MenuBuilder
{
    public function __construct(protected UrlGenerator $urls) {}

    /**
     * @return Collection<int, MenuNode>
     */
    public function build(string $handle, ?string $locale = null): Collection
    {
        // Only the structure is cached; the active state depends on the
        // current request, so it is applied to every read.
        // Cached as arrays: sites may refuse objects from the cache.
        /** @var array<int, array<string, mixed>> $cached */
        $cached = ContentCache::remember('menu:'.$handle, fn () => $this->buildMenu($handle, $locale)->map->toArray()->all(), $locale);
        $nodes = collect($cached)->map(fn (array $node) => MenuNode::fromArray($node));

        return $this->withActiveState($nodes, '/'.trim((string) request()->path(), '/'));
    }

    /**
     * @param  Collection<int, MenuNode>  $nodes
     * @return Collection<int, MenuNode>
     */
    protected function withActiveState(Collection $nodes, string $currentPath): Collection
    {
        return $nodes->map(fn (MenuNode $node): MenuNode => new MenuNode(
            label: $node->label,
            url: $node->url,
            newTab: $node->newTab,
            isActive: $this->isActive($node->url, $currentPath),
            children: $this->withActiveState($node->children, $currentPath),
        ))->values();
    }

    /**
     * A link is active on its own page and on pages below it. Home links
     * (`/` and locale roots such as `/en`) only match exactly, and links
     * to other hosts never match.
     */
    protected function isActive(string $url, string $currentPath): bool
    {
        $host = parse_url($url, PHP_URL_HOST);
        if (is_string($host) && $host !== request()->getHost()) {
            return false;
        }

        $path = '/'.trim((string) parse_url($url, PHP_URL_PATH), '/');
        $homePaths = array_merge(['/'], array_map(fn (string $locale) => '/'.$locale, Locales::available()));

        if (in_array($path, $homePaths, true)) {
            return $currentPath === $path;
        }

        return $currentPath === $path || str_starts_with($currentPath.'/', $path.'/');
    }

    /** @return Collection<int, MenuNode> */
    protected function buildMenu(string $handle, ?string $locale): Collection
    {
        $locale ??= Locales::current();
        $menu = Menu::query()
            ->where('handle', $handle)
            ->with('items')
            ->first();

        if ($menu === null) {
            return collect();
        }

        $targets = $this->resolveTargets($menu->items->all(), $locale);

        return $this->tree($menu->items->all(), $targets, $locale);
    }

    /**
     * Eager-load translated titles/urls per item id. Unpublished or
     * trashed targets map to null and are skipped.
     *
     * @param  array<int, MenuItem>  $items
     * @return array<int, array{title: ?string, url: ?string}|null>
     */
    protected function resolveTargets(array $items, string $locale): array
    {
        $entryIds = [];
        $collectionIds = [];
        $termIds = [];
        foreach ($items as $item) {
            match ($item->type) {
                'entry' => $item->target_id !== null && $entryIds[] = $item->target_id,
                'collection' => $item->target_id !== null && $collectionIds[] = $item->target_id,
                'term' => $item->target_id !== null && $termIds[] = $item->target_id,
                default => null,
            };
        }

        $entries = $entryIds === [] ? collect() : Entry::query()
            ->with('translations')
            ->whereIn('id', array_unique($entryIds))
            ->get()
            ->keyBy('id');
        $collections = $collectionIds === [] ? collect() : ContentCollection::query()
            ->whereIn('id', array_unique($collectionIds))
            ->get()
            ->keyBy('id');
        $terms = $termIds === [] ? collect() : Term::query()
            ->with(['translations', 'taxonomy'])
            ->whereIn('id', array_unique($termIds))
            ->get()
            ->keyBy('id');

        $resolved = [];
        foreach ($items as $item) {
            $resolved[$item->id] = match ($item->type) {
                'url' => SafeUrl::isSafe($item->url) ? ['title' => null, 'url' => (string) $item->url] : null,
                'entry' => $this->entryTarget($entries->get($item->target_id), $locale),
                'collection' => $this->collectionTarget($collections->get($item->target_id), $locale),
                'term' => $this->termTarget($terms->get($item->target_id), $locale),
                default => null,
            };
        }

        return $resolved;
    }

    /** @return array{title: ?string, url: string}|null */
    protected function entryTarget(?Entry $entry, string $locale): ?array
    {
        if ($entry === null || $entry->trashed() || $entry->status !== 'published') {
            return null;
        }

        $entry->resolveFor($locale);
        // Entries without a page of their own can't be linked to.
        $url = $this->urls->entryUrl($entry, $locale);

        return $url === null ? null : [
            'title' => $entry->renderedTranslation()?->title,
            'url' => $url,
        ];
    }

    /** @return array{title: ?string, url: string}|null */
    protected function collectionTarget(?ContentCollection $collection, string $locale): ?array
    {
        if ($collection === null || ! $collection->setting('has_archive', false)) {
            return null;
        }

        return ['title' => $collection->titleIn($locale), 'url' => $this->urls->archive($collection, $locale)];
    }

    /** @return array{title: ?string, url: string}|null */
    protected function termTarget(?Term $term, string $locale): ?array
    {
        if ($term === null || $term->trashed()) {
            return null;
        }

        return [
            'title' => ($term->readyTranslation($locale) ?? $term->mainTranslation())?->name,
            'url' => $this->urls->term($term, $locale),
        ];
    }

    /**
     * @param  array<int, MenuItem>  $items
     * @param  array<int, array{title: ?string, url: ?string}|null>  $targets
     * @return Collection<int, MenuNode>
     */
    protected function tree(array $items, array $targets, string $locale, ?int $parentId = null): Collection
    {
        return collect($items)
            ->filter(fn (MenuItem $item) => $item->parent_id === $parentId)
            ->sortBy('sort_order')
            ->map(function (MenuItem $item) use ($items, $targets, $locale): ?MenuNode {
                $target = $targets[$item->id] ?? null;
                if ($target === null || $target['url'] === null) {
                    return null;
                }

                $label = $item->labels[$locale] ?? $item->labels[Locales::main()] ?? $target['title'] ?? '';

                return new MenuNode(
                    label: $label,
                    url: $target['url'],
                    newTab: (bool) $item->new_tab,
                    children: $this->tree($items, $targets, $locale, $item->id),
                );
            })
            ->filter()
            ->values();
    }
}
