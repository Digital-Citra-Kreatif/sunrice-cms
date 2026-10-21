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

    /** @var array<string, array<int, array<string, string>>> related entries' live slugs by language, per collection and route field */
    private array $related = [];

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
            return $this->homepage($locale) ?? ($this->fallsBack($locale) ? $this->homepage() : null);
        }
        // What was found at the path before, by id (only pages found: any path may be asked for).
        $cache = app(SiteCache::class);
        $key = 'page:'.sha1($locale.'|'.$rest.'|'.(int) self::fallback());
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
            $matched = $pattern->match($rest);
            if ($matched === null) {
                continue;
            }
            if ($type === 'taxonomy') {
                $term = $this->termQuery()->where('taxonomy_id', $id)->where('locale', $locale)->where('slug', $matched['slug'])->first();
                // Not translated: the main language's, at this language's address.
                if ($term === null && $this->fallsBack($locale)) {
                    $term = $this->termQuery()->where('taxonomy_id', $id)->where('locale', Locales::default())->where('slug', $matched['slug'])
                        ->whereDoesntHave('term.translations', fn (Builder $q) => $q->where('locale', $locale))->first();
                }

                return $term;
            }
            $found = $this->entryQuery()->where('collection_id', $id)->where('locale', $locale)->where('slug', $matched['slug'])->first();
            // Not live in this language: the main language's, at this language's address.
            if ($found === null && $this->fallsBack($locale)) {
                $found = $this->entryQuery()->where('collection_id', $id)->where('locale', Locales::default())->where('slug', $matched['slug'])
                    ->whereDoesntHave('entry.translations', fn (Builder $q) => $q->live()->where('locale', $locale))->first();
            }
            // Slugs are unique in a collection and language; the related entries' must be theirs now (an old one redirects).
            if ($found !== null && $matched['parameters'] !== [] && $this->parameters($found, $pattern, $locale) !== $matched['parameters']) {
                return null;
            }

            return $found;
        }

        return null;
    }

    /**
     * Where a main-language slug at another language's address goes when
     * the entry (or term) has a page of its own in that language:
     * /id/about → /id/tentang-kami. Null when nothing like that is there.
     */
    public function translatedAddress(string $path): ?string
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));
        if ($locale === Locales::default() || $rest === '/') {
            return null;
        }
        foreach ($this->patterns() as [$type, $id, $pattern]) {
            $matched = $pattern->match($rest);
            if ($matched === null) {
                continue;
            }
            if ($type === 'taxonomy') {
                $main = $this->termQuery()->where('taxonomy_id', $id)->where('locale', Locales::default())->where('slug', $matched['slug'])->first();
                $own = $main === null ? null : $main->term->translations->firstWhere('locale', $locale)?->setRelation('term', $main->term);

                return $own?->url();
            }
            $main = $this->entryQuery()->where('collection_id', $id)->where('locale', Locales::default())->where('slug', $matched['slug'])->first();
            $own = $main === null ? null : $main->entry->translations->firstWhere('locale', $locale)?->setRelation('entry', $main->entry);

            return $own !== null && $own->isLive() ? $own->url() : null;
        }

        return null;
    }

    /** Whether pages not translated into a language show the main language's there (`sunrice-cms.site.fallback`). */
    public static function fallback(): bool
    {
        return filter_var(config('sunrice-cms.site.fallback', true), FILTER_VALIDATE_BOOL);
    }

    private function fallsBack(string $locale): bool
    {
        return $locale !== Locales::default() && self::fallback();
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
    public function termUrl(TermTranslation $translation, ?string $locale = null): ?string
    {
        $route = $translation->term->taxonomy->route;
        if ($route === null || $translation->term->trashed()) {
            return null;
        }
        $locale ??= $translation->locale;

        return url(Locales::prefix($locale).(new RoutePattern($route))->path((string) $translation->slug));
    }

    /**
     * A term's page for a visitor reading a language: its translation's
     * there; else, with the main-language fallback, the main language's
     * page at that language's address; else the main language's own.
     */
    public function termUrlIn(TermTranslation $translation, string $locale): ?string
    {
        if ($translation->locale !== $locale && $this->fallsBack($locale) && $translation->locale === Locales::default()
            && $translation->term->translations->firstWhere('locale', $locale) === null) {
            return $this->termUrl($translation, $locale);
        }

        return $this->termUrl($translation);
    }

    /** The homepage (Settings → Site) in a language, when it's live there. */
    public function homepage(?string $locale = null): ?EntryTranslation
    {
        $id = $this->homepageId();

        return $id === null ? null : $this->entryQuery()->where('entry_id', $id)->where('locale', $locale ?? Locales::default())->first();
    }

    /** The language a path is in (/id/blog/kopi: "id"): its prefix's, else the main one. */
    public function locale(string $path): string
    {
        return $this->splitLocale('/'.trim($path, '/'))[0];
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

    /**
     * An entry's page for a visitor reading a language: the translation's
     * own URL when it's in that language; for the main language's when the
     * entry isn't live in that language, with the fallback on, the page at
     * that language's address (/id/blog/hello); else its own URL.
     */
    public function urlIn(EntryTranslation $translation, string $locale): ?string
    {
        if ($translation->locale === $locale || ! $this->isFallbackFor($translation, $locale)) {
            return $this->url($translation);
        }
        if ($translation->entry_id === $this->homepageId() && $translation->entry->collection->route !== null) {
            return url(Locales::prefix($locale) ?: '/');
        }
        $path = $this->routePath($translation, $locale, $translation->slug);

        return $path === null ? null : url($path);
    }

    /** Whether a main-language translation stands in for its entry in a language it isn't live in. */
    public function isFallbackFor(EntryTranslation $translation, string $locale): bool
    {
        if (! $this->fallsBack($locale) || $translation->locale !== Locales::default() || ! $translation->isLive()) {
            return false;
        }
        $own = $translation->entry->translations->firstWhere('locale', $locale);

        return $own === null || ! $own->isLive();
    }

    /** The path of an entry translation with a slug (/id/blog/halo), or null without a route. */
    public function path(EntryTranslation $translation, ?string $slug): ?string
    {
        if ($translation->entry_id === $this->homepageId() && $translation->entry->collection->route !== null && $slug !== null) {
            return Locales::prefix($translation->locale) ?: '/';
        }

        return $this->routePath($translation, $translation->locale, $slug);
    }

    /**
     * The path from the collection's pattern in a language, with the
     * related entries' slugs in it (/projects/tower/unit-1).
     */
    private function routePath(EntryTranslation $translation, string $locale, ?string $slug): ?string
    {
        $route = $translation->entry->collection->route;
        if ($route === null || $slug === null) {
            return null;
        }
        $pattern = new RoutePattern($route);

        return Locales::prefix($locale).$pattern->path($slug, $this->parameters($translation, $pattern, $locale));
    }

    /**
     * The related entries' slugs a pattern's {field}s take, in a language
     * (else the main one's; "-" when a field links to nothing live).
     *
     * @return array<string, string>
     */
    private function parameters(EntryTranslation $translation, RoutePattern $pattern, string $locale): array
    {
        $parameters = [];
        foreach ($pattern->parameters() as $field) {
            $id = self::relatedId($translation, $field);
            $slugs = $id === null ? [] : ($this->relatedSlugs($translation->entry->collection, $field)[$id] ?? []);
            $parameters[$field] = $slugs[$locale] ?? $slugs[Locales::default()] ?? RoutePattern::NONE;
        }

        return $parameters;
    }

    /** The entry a route field links to, from the live version (shared fields from the main language). */
    private static function relatedId(EntryTranslation $translation, string $field): ?int
    {
        $data = $translation->data ?? [];
        $value = array_key_exists($field, $data) ? $data[$field] : ($translation->entry->mainTranslation()->data[$field] ?? null);
        $value = is_array($value) ? reset($value) : $value;

        return is_int($value) && $value > 0 ? $value : null;
    }

    /**
     * The live slugs of the entries a collection's route field may link
     * to, by entry and language: one query (or none, cached) for all.
     *
     * @return array<int, array<string, string>>
     */
    private function relatedSlugs(Collection $collection, string $field): array
    {
        $key = $collection->id.'|'.$field;
        if (! isset($this->related[$key])) {
            $handles = $collection->schema()->field($field)?->configStrings('collections') ?? [];
            sort($handles);
            /** @var array<int, array<string, string>> $slugs */
            $slugs = $handles === [] ? [] : app(SiteCache::class)->remember('related-slugs:'.implode(',', $handles), fn (): array => self::loadSlugs($handles), SiteCache::ROUTES);
            $this->related[$key] = $slugs;
        }

        return $this->related[$key];
    }

    /**
     * @param  list<string>  $handles
     * @return array<int, array<string, string>>
     */
    private static function loadSlugs(array $handles): array
    {
        $slugs = [];
        $translations = EntryTranslation::query()->live()->whereNotNull('slug')
            ->whereIn('collection_id', Collection::query()->whereIn('handle', $handles)->select('id'))
            ->toBase()->get(['entry_id', 'locale', 'slug']);
        foreach ($translations as $row) {
            if (is_numeric($row->entry_id) && is_string($row->locale) && is_string($row->slug)) {
                $slugs[(int) $row->entry_id][$row->locale] = $row->slug;
            }
        }

        return $slugs;
    }

    /**
     * After an entry's slug changed: the pages whose URL holds it (a
     * collection routed as /projects/{project}/{slug}) moved too, and
     * their old addresses redirect.
     */
    public function relatedMoved(EntryTranslation $related, string $oldSlug): void
    {
        $collection = $related->entry->collection;
        foreach ($this->dependents($collection->handle) as [$dependent, $field]) {
            $key = $dependent->id.'|'.$field;
            $ids = [];
            // Whichever language holds the field (the main one, when it's shared).
            foreach (EntryTranslation::query()->where('collection_id', $dependent->id)->select(['id', 'entry_id', 'data'])->lazyById(500) as $row) {
                $value = ($row->data ?? [])[$field] ?? null;
                if ((is_array($value) ? reset($value) : $value) === $related->entry_id) {
                    $ids[] = $row->entry_id;
                }
            }
            if ($ids === []) {
                continue;
            }
            $handles = $dependent->schema()->field($field)?->configStrings('collections') ?? [];
            $now = self::loadSlugs($handles);
            $before = $now;
            $before[$related->entry_id][$related->locale] = $oldSlug;
            $pages = $this->entryQuery()->whereIn('entry_id', array_unique($ids))->get();
            foreach ($pages as $page) {
                $this->related[$key] = $before;
                $from = $this->path($page, $page->slug);
                $this->related[$key] = $now;
                $to = $this->path($page, $page->slug);
                if ($from !== null && $to !== null) {
                    $this->moved($from, $to);
                }
            }
            unset($this->related[$key]);
        }
    }

    /**
     * Collections whose URL holds a field that may link into a collection.
     *
     * @return list<array{0: Collection, 1: string}>
     */
    private function dependents(string $handle): array
    {
        $dependents = [];
        foreach (Collection::query()->where('route', 'like', '%}%{%')->get() as $collection) {
            foreach ((new RoutePattern((string) $collection->route))->parameters() as $field) {
                if (in_array($handle, $collection->schema()->field($field)?->configStrings('collections') ?? [], true)) {
                    $dependents[] = [$collection, $field];
                }
            }
        }

        return $dependents;
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
        return $this->routePath($translation, $translation->locale, $translation->slug);
    }

    /** Forget the collections loaded, after one changed. */
    public function flush(): void
    {
        $this->patterns = null;
        $this->homepage = false;
        $this->related = [];
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
        [$locale, $rest] = Locales::split($path);

        return [$locale, $rest];
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
