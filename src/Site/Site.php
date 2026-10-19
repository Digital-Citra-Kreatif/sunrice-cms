<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * The public site: which entry a path shows, and entries' URLs. The main
 * language has no prefix; others start with their code (/id/blog/kopi).
 *
 * @api
 */
final class Site
{
    /** @var list<Collection>|null collections with a route, most specific first */
    private ?array $routed = null;

    /** The live entry translation at a path, or null. */
    public function find(string $path): ?EntryTranslation
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));
        foreach ($this->routed() as $collection) {
            $slug = (new RoutePattern((string) $collection->route))->match($rest);
            if ($slug === null) {
                continue;
            }

            // The first pattern that matches decides; no falling through to the next.
            return EntryTranslation::query()->live()->with('entry.collection')
                ->where('collection_id', $collection->id)->where('locale', $locale)->where('slug', $slug)->first();
        }

        return null;
    }

    /** The URL of an entry translation's live page, or null when its collection has no route. */
    public function url(EntryTranslation $translation, bool $draftSlug = false): ?string
    {
        $route = $translation->entry->collection->route;
        $slug = $draftSlug ? $translation->draft_slug : $translation->slug;
        if ($route === null || $slug === null) {
            return null;
        }
        $prefix = $translation->locale === Locales::default() ? '' : '/'.$translation->locale;

        return url($prefix.(new RoutePattern($route))->path($slug));
    }

    /** Forget the collections loaded, after one changed. */
    public function flush(): void
    {
        $this->routed = null;
    }

    /** @return array{0: string, 1: string} the language and the path without its prefix */
    private function splitLocale(string $path): array
    {
        foreach (Locales::all() as $locale) {
            if ($locale !== Locales::default() && ($path === "/{$locale}" || str_starts_with($path, "/{$locale}/"))) {
                return [$locale, substr($path, strlen($locale) + 1) ?: '/'];
            }
        }

        return [Locales::default(), $path];
    }

    /** @return list<Collection> */
    private function routed(): array
    {
        if ($this->routed === null) {
            $collections = Collection::query()->whereNotNull('route')->orderBy('id')->get()->all();
            usort($collections, fn (Collection $a, Collection $b): int => (new RoutePattern((string) $b->route))->specificity() <=> (new RoutePattern((string) $a->route))->specificity());
            $this->routed = $collections;
        }

        return $this->routed;
    }
}
