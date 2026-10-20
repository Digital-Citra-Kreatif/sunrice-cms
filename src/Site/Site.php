<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Database\Eloquent\Builder;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * The public site: which entry a path shows, and entries' URLs. The main
 * language has no prefix; others start with their code (/id/blog/kopi).
 *
 * @api
 */
final class Site
{
    /** @var list<array{0: 'collection'|'taxonomy', 1: int, 2: RoutePattern}>|null */
    private ?array $patterns = null;

    /** The homepage entry's id, once read (false: not read yet). */
    private int|false|null $homepage = false;

    /** The live entry translation at a path, or null. */
    public function find(string $path): ?EntryTranslation
    {
        $page = $this->match($path);

        return $page instanceof EntryTranslation ? $page : null;
    }

    /**
     * What's at a path: a live entry, a term's page, or nothing. The most
     * specific pattern that matches decides (collections before taxonomies
     * on a tie); there's no falling through to the next.
     */
    public function match(string $path): EntryTranslation|TermTranslation|null
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));
        if ($rest === '/') {
            return $this->homepage($locale);
        }
        // What was found at the path before, by id (only pages found: any path may be asked for).
        $cache = app(SiteCache::class);
        $key = 'page:'.sha1($locale.'|'.$rest);
        $found = SiteCache::enabled() ? $cache->store()->get($cache->key($key, SiteCache::ROUTES)) : null;
        if (is_array($found) && is_int($found[1] ?? null)) {
            $page = $found[0] === 'entry' ? $this->entryQuery()->whereKey($found[1])->first() : $this->termQuery()->whereKey($found[1])->first();
            if ($page !== null) {
                return $page;
            }
        }
        $page = $this->resolve($locale, $rest);
        if ($page !== null && SiteCache::enabled()) {
            $cache->store()->put($cache->key($key, SiteCache::ROUTES), [$page instanceof EntryTranslation ? 'entry' : 'term', $page->id], SiteCache::ttl());
        }

        return $page;
    }

    private function resolve(string $locale, string $rest): EntryTranslation|TermTranslation|null
    {
        foreach ($this->patterns() as [$type, $id, $pattern]) {
            $slug = $pattern->match($rest);
            if ($slug === null) {
                continue;
            }

            return $type === 'collection'
                ? $this->entryQuery()->where('collection_id', $id)->where('locale', $locale)->where('slug', $slug)->first()
                : $this->termQuery()->where('taxonomy_id', $id)->where('locale', $locale)->where('slug', $slug)->first();
        }

        return null;
    }

    /** @return Builder<EntryTranslation> */
    private function entryQuery(): Builder
    {
        // Its other languages too: for hreflang links (Seo::alternates()).
        return EntryTranslation::query()->live()->with('entry.collection', 'entry.translations');
    }

    /** @return Builder<TermTranslation> */
    private function termQuery(): Builder
    {
        return TermTranslation::query()->with('term.taxonomy', 'term.translations')->whereHas('term', fn ($q) => $q->withoutTrashed());
    }

    /** The URL of a term's page in its language, or null when its taxonomy has no pages. */
    public function termUrl(TermTranslation $translation): ?string
    {
        $route = $translation->term->taxonomy->route;
        if ($route === null || $translation->term->trashed()) {
            return null;
        }

        return url(($translation->locale === Locales::default() ? '' : '/'.$translation->locale).(new RoutePattern($route))->path($translation->slug));
    }

    /** The homepage (Settings → Site) in a language, when it's live there. */
    public function homepage(?string $locale = null): ?EntryTranslation
    {
        $id = $this->homepageId();

        return $id === null ? null : $this->entryQuery()->where('entry_id', $id)->where('locale', $locale ?? Locales::default())->first();
    }

    /** The language of the search page at a path (/search, /id/search), or null when it isn't one. */
    public function searchLocale(string $path): ?string
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));

        return $rest === '/'.Search::path() ? $locale : null;
    }

    /** Whether an entry is the homepage. */
    public function isHomepage(EntryTranslation $translation): bool
    {
        return $translation->entry_id === $this->homepageId();
    }

    /** The collection whose listing page is at a path, and the language. */
    public function listing(string $path): ?Listing
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));
        if ($rest === '/') {
            return null;
        }
        /** @var array<string, int> $routes listing routes and their collections */
        $routes = app(SiteCache::class)->remember('listings', fn (): array => Collection::query()->whereNotNull('listing_route')->pluck('id', 'listing_route')
            ->map(fn (mixed $id): int => is_numeric($id) ? (int) $id : 0)->all(), SiteCache::ROUTES);
        $collection = isset($routes[$rest]) ? Collection::query()->find($routes[$rest]) : null;

        return $collection === null ? null : new Listing($collection, $locale);
    }

    /** The URL of an entry translation's live page, or null when its collection has no route. */
    public function url(EntryTranslation $translation): ?string
    {
        $path = $this->path($translation, $translation->slug);

        return $path === null ? null : url($path);
    }

    /** The path of an entry translation with a slug (/id/blog/halo), or null without a route. */
    public function path(EntryTranslation $translation, ?string $slug): ?string
    {
        $route = $translation->entry->collection->route;
        if ($route === null || $slug === null) {
            return null;
        }
        $prefix = $translation->locale === Locales::default() ? '' : '/'.$translation->locale;
        if ($translation->entry_id === $this->homepageId()) {
            return $prefix === '' ? '/' : $prefix;
        }

        return $prefix.(new RoutePattern($route))->path($slug);
    }

    /** Where an old address moved, if it did. */
    public function redirect(string $path): ?Redirect
    {
        return Redirect::query()->where('from_path', Redirect::normalizePath($path))->first();
    }

    /**
     * Records that a page moved: the old path redirects to the new one, a
     * redirect away from the new path goes, and chains are shortened.
     */
    public function moved(string $from, string $to): void
    {
        $from = Redirect::normalizePath($from);
        $to = Redirect::normalizePath($to);
        if ($from === $to) {
            return;
        }
        Redirect::query()->where('from_path', $to)->delete();
        Redirect::query()->where('to_url', $from)->update(['to_url' => $to]);
        Redirect::query()->updateOrCreate(['from_path' => $from], ['to_url' => $to, 'status' => 301]);
    }

    /** The path a page has besides the one it's served at (the homepage's own address), to redirect from. */
    public function ownPath(EntryTranslation $translation): ?string
    {
        $route = $translation->entry->collection->route;
        if ($route === null || $translation->slug === null) {
            return null;
        }

        return ($translation->locale === Locales::default() ? '' : '/'.$translation->locale).(new RoutePattern($route))->path($translation->slug);
    }

    /** Forget the collections loaded, after one changed. */
    public function flush(): void
    {
        $this->patterns = null;
        $this->homepage = false;
    }

    private function homepageId(): ?int
    {
        if ($this->homepage === false) {
            $this->homepage = app(SiteSettings::class)->homepage;
        }

        return $this->homepage;
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

    /** @return list<array{0: 'collection'|'taxonomy', 1: int, 2: RoutePattern}> collections' and taxonomies' patterns, most specific first */
    private function patterns(): array
    {
        if ($this->patterns === null) {
            /** @var list<array{0: 'collection'|'taxonomy', 1: int, 2: string}> $routes */
            $routes = app(SiteCache::class)->remember('patterns', function (): array {
                $routes = [];
                foreach (Collection::query()->whereNotNull('route')->orderBy('id')->get(['id', 'route']) as $collection) {
                    $routes[] = ['collection', $collection->id, (string) $collection->route];
                }
                foreach (Taxonomy::query()->whereNotNull('route')->orderBy('id')->get(['id', 'route']) as $taxonomy) {
                    $routes[] = ['taxonomy', $taxonomy->id, (string) $taxonomy->route];
                }

                return $routes;
            }, SiteCache::ROUTES);
            $patterns = [];
            foreach ($routes as [$type, $id, $route]) {
                $patterns[] = [$type, $id, new RoutePattern($route)];
            }
            // usort keeps the order of equals: collections before taxonomies, then oldest first.
            usort($patterns, fn (array $a, array $b): int => $b[2]->specificity() <=> $a[2]->specificity());
            $this->patterns = $patterns;
        }

        return $this->patterns;
    }
}
