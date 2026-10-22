<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Database\Eloquent\Builder;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
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
 * @phpstan-type RouteType 'collection'|'taxonomy'|'collection-terms'|'collection-index'
 * @phpstan-type RouteRecord array{type: RouteType, id: int, collection: int|null, route: string|null, listing: string|null, index: string|null, own: array<string, array<string, string>>, previous: array<string, array<string, list<string>>>}
 *
 * @api
 */
final class Site
{
    /** @var list<RouteRecord>|null collections' and taxonomies' patterns, and taxonomies' term pages and index pages in collections (collection-terms, collection-index: id is the taxonomy's), as cached */
    private ?array $routes = null;

    /** @var array<string, list<array{0: RouteType, 1: int, 2: RoutePattern, 3: int|null}>> each language's patterns, most specific first */
    private array $patterns = [];

    /** @var array<string, list<array{0: RouteType, 1: int, 2: RoutePattern, 3: int|null}>> the patterns each language's addresses had before */
    private array $oldPatterns = [];

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
            if ($page instanceof TermTranslation && is_int($found[2] ?? null)) {
                $page->in(Collection::query()->find($found[2]));
            }
            if ($page !== null) {
                return $page;
            }
        }
        $page = $this->resolve($locale, $rest);
        if ($page !== null && SiteCache::enabled()) {
            $cache->store()->put($cache->key($key, SiteCache::ROUTES), [$page instanceof EntryTranslation ? 'entry' : 'term', $page->id, $page instanceof TermTranslation ? $page->scope?->id : null], SiteCache::ttl());
        }

        return $page;
    }

    private function resolve(string $locale, string $rest): EntryTranslation|TermTranslation|null
    {
        foreach ($this->patterns($locale) as [$type, $id, $pattern, $collection]) {
            $matched = $pattern->match($rest);
            if ($matched === null) {
                continue;
            }
            if ($type !== 'collection') {
                $term = $this->termQuery()->where('taxonomy_id', $id)->where('locale', $locale)->where('slug', $matched['slug'])->first();
                // Not translated: the main language's, at this language's address.
                if ($term === null && $this->fallsBack($locale)) {
                    $term = $this->termQuery()->where('taxonomy_id', $id)->where('locale', Locales::default())->where('slug', $matched['slug'])
                        ->whereDoesntHave('term.translations', fn (Builder $q) => $q->where('locale', $locale))->first();
                }

                // A collection's term page lists only its entries.
                return $collection === null ? $term : $term?->in(Collection::query()->find($collection));
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
        foreach ($this->patterns($locale) as [$type, $id, $pattern, $collection]) {
            $matched = $pattern->match($rest);
            if ($matched === null) {
                continue;
            }
            if ($type !== 'collection') {
                $main = $this->termQuery()->where('taxonomy_id', $id)->where('locale', Locales::default())->where('slug', $matched['slug'])->first();
                $own = $main === null ? null : $main->term->translations->firstWhere('locale', $locale)?->setRelation('term', $main->term);

                return $own?->in($collection === null ? null : Collection::query()->find($collection))->url();
            }
            $main = $this->entryQuery()->where('collection_id', $id)->where('locale', Locales::default())->where('slug', $matched['slug'])->first();
            $own = $main === null ? null : $main->entry->translations->firstWhere('locale', $locale)?->setRelation('entry', $main->entry);

            return $own !== null && $own->isLive() ? $own->url() : null;
        }

        return null;
    }

    /**
     * Where an address a language's pattern had before went: the main
     * pattern under the language's prefix once it has its own
     * (/id/books/halo → /id/buku/halo), or a pattern it had before
     * (HasLanguageRoutes::previousRoutes()); a listing page's too
     * (/id/books → /id/buku). Null when nothing like that is there.
     */
    public function movedAddress(string $path): ?string
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));
        if ($rest === '/') {
            return null;
        }
        $listing = $this->listingRoutes(old: true)[$locale][$rest] ?? null;
        if ($listing !== null) {
            return Collection::query()->find($listing)?->listingUrl($locale);
        }
        $index = $this->indexRoutes(old: true)[$locale][$rest] ?? null;
        if ($index !== null) {
            $collection = $index[1] === null ? null : Collection::query()->find($index[1]);

            return $index[1] !== null && $collection === null ? null : Taxonomy::query()->find($index[0])?->indexUrl($locale, $collection);
        }
        foreach ($this->oldPatterns($locale) as [$type, $id, $pattern]) {
            $matched = $pattern->match($rest);
            $url = $matched === null ? null : ($type !== 'collection' ? $this->termAt($id, $locale, $matched['slug']) : $this->entryAt($id, $locale, $matched['slug']));
            if ($url !== null && $url !== url($path)) {
                return $url;
            }
        }

        return null;
    }

    /** The address in a language of the entry with a slug there (or the main language's standing in), if it has one. */
    private function entryAt(int $collection, string $locale, string $slug): ?string
    {
        $own = $this->entryQuery()->where('collection_id', $collection)->where('locale', $locale)->where('slug', $slug)->first();
        if ($own !== null) {
            return $own->url();
        }
        $main = $locale === Locales::default() ? null : $this->entryQuery()->where('collection_id', $collection)->where('locale', Locales::default())->where('slug', $slug)->first();
        if ($main === null) {
            return null;
        }
        $there = $main->entry->translations->first(fn (EntryTranslation $t): bool => $t->locale === $locale && $t->isLive());

        return $there !== null ? $there->setRelation('entry', $main->entry)->url() : ($this->isFallbackFor($main, $locale) ? $this->urlIn($main, $locale) : null);
    }

    /** The address in a language of the term with a slug there (or the main language's standing in), if it has one. */
    private function termAt(int $taxonomy, string $locale, string $slug): ?string
    {
        $own = $this->termQuery()->where('taxonomy_id', $taxonomy)->where('locale', $locale)->where('slug', $slug)->first();
        if ($own !== null) {
            return $own->url();
        }
        $main = $locale === Locales::default() ? null : $this->termQuery()->where('taxonomy_id', $taxonomy)->where('locale', Locales::default())->where('slug', $slug)->first();
        if ($main === null) {
            return null;
        }
        $there = $main->term->translations->firstWhere('locale', $locale);
        if ($there !== null) {
            return $there->setRelation('term', $main->term)->url();
        }

        return $this->fallsBack($locale) ? $this->termUrl($main, $locale) : null;
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

    /**
     * The URL of a term's page in a language (its own by default), or null
     * when it has none. In its scope's collection (TermTranslation::in()),
     * that collection's term page. Without a scope: the page shown's
     * collection's, when its terms have pages there ($followPage, for
     * links on an entry, listing or term page of a collection); else the
     * shared page (the taxonomy's route); else the first collection's (by id).
     */
    public function termUrl(TermTranslation $translation, ?string $locale = null, bool $followPage = true): ?string
    {
        $locale ??= $translation->locale;
        $term = $translation->term;
        if ($term->trashed()) {
            return null;
        }
        $taxonomy = $term->taxonomy;
        $inCollections = $this->collectionTerms()[$taxonomy->id] ?? [];
        if ($translation->scope !== null) {
            $record = $inCollections[$translation->scope->id] ?? null;
        } else {
            $shown = $followPage ? Page::current()?->collection?->id : null;
            $record = $shown !== null && isset($inCollections[$shown]) ? $inCollections[$shown]
                : ($taxonomy->routeIn($locale) !== null ? null : (reset($inCollections) ?: null));
        }
        $route = $record !== null ? (self::own($record, $locale, 'route') ?? $record['route'])
            : ($translation->scope === null ? $taxonomy->routeIn($locale) : null);
        if ($route === null) {
            return null;
        }

        return url(Locales::prefix($locale).(new RoutePattern($route))->path((string) $translation->slug));
    }

    /**
     * Taxonomies' term pages in collections, by taxonomy and collection id
     * (collections in id order), as cached.
     *
     * @return array<int, array<int, RouteRecord>>
     */
    public function collectionTerms(): array
    {
        $found = [];
        foreach ($this->routes() as $record) {
            if ($record['type'] === 'collection-terms' && $record['collection'] !== null) {
                $found[$record['id']][$record['collection']] = $record;
            }
        }

        return $found;
    }

    /**
     * Taxonomies' index pages in collections, by taxonomy and collection id
     * (collections in id order), as cached.
     *
     * @return array<int, array<int, RouteRecord>>
     */
    public function collectionIndexes(): array
    {
        $found = [];
        foreach ($this->routes() as $record) {
            if ($record['type'] === 'collection-index' && $record['collection'] !== null) {
                $found[$record['id']][$record['collection']] = $record;
            }
        }

        return $found;
    }

    /**
     * The URL of a taxonomy's index page in a language: the shared one
     * (/tags), or a collection's (/books/tags); null when it's off.
     */
    public function indexUrl(Taxonomy $taxonomy, ?Collection $collection, string $locale): ?string
    {
        if ($collection === null) {
            $path = $taxonomy->routeIn($locale, 'index_route');
        } else {
            $record = $this->collectionIndexes()[$taxonomy->id][$collection->id] ?? null;
            $path = $record === null ? null : (self::own($record, $locale, 'index_route') ?? $record['index']);
        }

        return $path === null ? null : url(Locales::prefix($locale).$path);
    }

    /** The taxonomy index page at a path (the shared one, or a collection's), and the language. */
    public function taxonomyIndex(string $path): ?TaxonomyIndex
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));
        if ($rest === '/') {
            return null;
        }
        $found = $this->indexRoutes()[$locale][$rest] ?? null;
        if ($found === null) {
            return null;
        }
        $taxonomy = Taxonomy::query()->find($found[0]);
        $collection = $found[1] === null ? null : Collection::query()->find($found[1]);

        return $taxonomy === null || ($found[1] !== null && $collection === null) ? null : new TaxonomyIndex($taxonomy, $collection, $locale);
    }

    /**
     * A term's page for a visitor reading a language: its translation's
     * there; else, with the main-language fallback, the main language's
     * page at that language's address; else the main language's own.
     */
    public function termUrlIn(TermTranslation $translation, string $locale, bool $followPage = true): ?string
    {
        if ($translation->locale !== $locale && $this->fallsBack($locale) && $translation->locale === Locales::default()
            && $translation->term->translations->firstWhere('locale', $locale) === null) {
            return $this->termUrl($translation, $locale, $followPage);
        }

        return $this->termUrl($translation, null, $followPage);
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
        $id = $this->listingRoutes()[$locale][$rest] ?? null;
        $collection = $id === null ? null : Collection::query()->find($id);

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
     * The path from the collection's pattern in a language (its own, else
     * the main one), with the related entries' slugs in it
     * (/projects/tower/unit-1).
     */
    private function routePath(EntryTranslation $translation, string $locale, ?string $slug): ?string
    {
        $route = $translation->entry->collection->routeIn($locale);
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
        foreach (Collection::query()->whereNotNull('route')->get() as $collection) {
            // Each language's pattern may hold other fields.
            $fields = [];
            foreach (Locales::all() as $locale) {
                array_push($fields, ...(new RoutePattern((string) $collection->routeIn($locale)))->parameters());
            }
            foreach (array_unique($fields) as $field) {
                if (in_array($handle, $collection->schema()->field($field)?->configStrings('collections') ?? [], true)) {
                    $dependents[] = [$collection, $field];
                }
            }
        }

        return $dependents;
    }

    /**
     * Where an old address moved, if it did: a redirect from this path, or
     * one for every language from the same path in another language
     * (/listings for /id/listings); else the wildcard redirect whose path
     * is the longest start of it (/blog/* for /blog/2024/hello). Send
     * visitors to its targetFor($path).
     */
    public function redirect(string $path): ?Redirect
    {
        $path = Redirect::normalizePath($path);
        $exact = Redirect::query()->where('from_path', $path)->first();
        if ($exact !== null) {
            return $exact;
        }
        [, $rest] = Locales::split($path);
        $candidates = array_values(array_unique(array_map(
            fn (string $locale): string => Redirect::normalizePath(Locales::prefix($locale).$rest),
            Locales::all(),
        )));

        return Redirect::query()->where('every_language', true)->whereIn('from_path', $candidates)->orderBy('id')->first() ?? $this->wildcardRedirect($path);
    }

    /**
     * The wildcard redirect for a path: the one whose path (without the
     * language's prefix) is the longest start of it, one for this
     * language's paths before one for every language. Wildcards are read
     * once (and cached until a redirect changes), and tested in PHP.
     */
    private function wildcardRedirect(string $path): ?Redirect
    {
        /** @var list<array{0: int, 1: string, 2: bool}> $wildcards */
        $wildcards = app(SiteCache::class)->remember('wildcard-redirects', fn (): array => Redirect::query()->where('from_path', 'like', '%/'.Redirect::WILDCARD)->orderBy('id')
            ->get(['id', 'from_path', 'every_language'])->map(fn (Redirect $r): array => [$r->id, $r->from_path, $r->every_language])->values()->all(), SiteCache::ROUTES);
        [, $rest] = Locales::split($path);
        $best = null;
        $bestRank = null;
        foreach ($wildcards as [$id, $from, $everyLanguage]) {
            if (! Redirect::wildcard($from)) {
                continue;
            }
            $prefix = Redirect::prefixOf($from);
            $own = str_starts_with($path, $prefix) && strlen($path) > strlen($prefix);
            $restPrefix = Redirect::prefixOf(Locales::split($from)[1]);
            $other = $everyLanguage && str_starts_with($rest, $restPrefix) && strlen($rest) > strlen($restPrefix);
            if (! $own && ! $other) {
                continue;
            }
            $rank = [strlen($restPrefix), $everyLanguage ? 0 : 1];
            if ($bestRank === null || $rank > $bestRank) {
                [$best, $bestRank] = [$id, $rank];
            }
        }

        return $best === null ? null : Redirect::query()->find($best);
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
        $this->routes = null;
        $this->patterns = [];
        $this->oldPatterns = [];
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

    /**
     * Collections' and taxonomies' patterns in every language, read once
     * (and cached until one changes).
     *
     * @return list<RouteRecord>
     */
    private function routes(): array
    {
        if ($this->routes === null) {
            /** @var list<RouteRecord> $routes */
            $routes = app(SiteCache::class)->remember('language-routes', function (): array {
                $routes = [];
                $columns = ['id', 'route', 'routes', 'previous_routes'];
                foreach (Collection::query()->where(fn ($q) => $q->whereNotNull('route')->orWhereNotNull('listing_route'))->orderBy('id')->get([...$columns, 'listing_route']) as $collection) {
                    $routes[] = ['type' => 'collection', 'id' => $collection->id, 'collection' => null, 'route' => $collection->route, 'listing' => $collection->listing_route, 'index' => null, 'own' => $collection->routes ?? [], 'previous' => $collection->previous_routes ?? []];
                }
                foreach (Taxonomy::query()->where(fn ($q) => $q->whereNotNull('route')->orWhereNotNull('index_route'))->orderBy('id')->get([...$columns, 'index_route']) as $taxonomy) {
                    $routes[] = ['type' => 'taxonomy', 'id' => $taxonomy->id, 'collection' => null, 'route' => $taxonomy->route, 'listing' => null, 'index' => $taxonomy->index_route, 'own' => $taxonomy->routes ?? [], 'previous' => $taxonomy->previous_routes ?? []];
                }
                // Term pages and index pages in collections: each language's pattern worked out now (they follow the collection's listing page).
                $taxonomies = Taxonomy::query()->orderBy('id')->with(['collections' => fn ($q) => $q->where(fn ($q) => $q->where('sunrice_collection_taxonomy.term_pages', true)->orWhere('sunrice_collection_taxonomy.index_page', true))->orderBy('sunrice_collections.id')])->get();
                foreach ($taxonomies as $taxonomy) {
                    foreach ($taxonomy->collections as $collection) {
                        $pivot = $collection->getRelation('pivot');
                        if (! $pivot instanceof CollectionTaxonomy) {
                            continue;
                        }
                        foreach (array_filter(['collection-terms' => $pivot->term_pages, 'collection-index' => $pivot->index_page]) as $type => $on) {
                            $path = fn (string $locale): string => $type === 'collection-terms' ? $pivot->pattern($collection, $taxonomy, $locale) : $pivot->indexPath($collection, $taxonomy, $locale);
                            $attribute = $type === 'collection-terms' ? 'route' : 'index_route';
                            $main = $path(Locales::default());
                            $own = [];
                            foreach (Locales::all() as $locale) {
                                if ($locale !== Locales::default() && ($pattern = $path($locale)) !== $main) {
                                    $own[$locale] = [$attribute => $pattern];
                                }
                            }
                            $routes[] = ['type' => $type, 'id' => $taxonomy->id, 'collection' => $collection->id, 'route' => $type === 'collection-terms' ? $main : null,
                                'listing' => null, 'index' => $type === 'collection-index' ? $main : null, 'own' => $own, 'previous' => []];
                        }
                    }
                }

                return $routes;
            }, SiteCache::ROUTES);
            $this->routes = $routes;
        }

        return $this->routes;
    }

    /**
     * A language's own pattern of a record (as cached), or null.
     *
     * @param  array{own: array<string, array<string, string>>}  $record
     */
    private static function own(array $record, string $locale, string $attribute): ?string
    {
        $own = $locale === Locales::default() ? null : ($record['own'][$locale][$attribute] ?? null);

        return is_string($own) && $own !== '' ? $own : null;
    }

    /**
     * The patterns a language's addresses had before, as cached: its
     * previous ones, and the main one once it has its own.
     *
     * @param  array{own: array<string, array<string, string>>, previous: array<string, array<string, list<string>>>}  $record
     * @return list<string>
     */
    private static function old(array $record, string $locale, string $attribute, string $main): array
    {
        $now = self::own($record, $locale, $attribute) ?? $main;
        $old = [...($record['previous'][$locale][$attribute] ?? []), ...($now !== $main ? [$main] : [])];

        return array_values(array_unique(array_filter($old, fn (string $pattern): bool => $pattern !== '' && $pattern !== $now)));
    }

    /** @return list<array{0: RouteType, 1: int, 2: RoutePattern, 3: int|null}> a language's patterns, most specific first */
    private function patterns(string $locale): array
    {
        if (! isset($this->patterns[$locale])) {
            $patterns = [];
            foreach ($this->routes() as $record) {
                if ($record['route'] !== null) {
                    $patterns[] = [$record['type'], $record['id'], new RoutePattern(self::own($record, $locale, 'route') ?? $record['route']), $record['collection']];
                }
            }
            $this->patterns[$locale] = self::bySpecificity($patterns);
        }

        return $this->patterns[$locale];
    }

    /** @return list<array{0: RouteType, 1: int, 2: RoutePattern, 3: int|null}> the patterns a language's addresses had before, most specific first */
    private function oldPatterns(string $locale): array
    {
        if (! isset($this->oldPatterns[$locale])) {
            $patterns = [];
            foreach ($this->routes() as $record) {
                foreach ($record['route'] === null ? [] : self::old($record, $locale, 'route', $record['route']) as $old) {
                    $patterns[] = [$record['type'], $record['id'], new RoutePattern($old), $record['collection']];
                }
            }
            $this->oldPatterns[$locale] = self::bySpecificity($patterns);
        }

        return $this->oldPatterns[$locale];
    }

    /**
     * @param  list<array{0: RouteType, 1: int, 2: RoutePattern, 3: int|null}>  $patterns
     * @return list<array{0: RouteType, 1: int, 2: RoutePattern, 3: int|null}>
     */
    private static function bySpecificity(array $patterns): array
    {
        // usort keeps the order of equals: collections before taxonomies (shared term pages before collections'), then oldest first.
        usort($patterns, fn (array $a, array $b): int => $b[2]->specificity() <=> $a[2]->specificity());

        return $patterns;
    }

    /**
     * Listing pages' paths in each language and their collections; with
     * $old, the paths they had before.
     *
     * @return array<string, array<string, int>>
     */
    private function listingRoutes(bool $old = false): array
    {
        $paths = [];
        foreach ($this->routes() as $record) {
            if ($record['listing'] === null) {
                continue;
            }
            foreach (Locales::all() as $locale) {
                foreach ($old ? self::old($record, $locale, 'listing_route', $record['listing']) : [self::own($record, $locale, 'listing_route') ?? $record['listing']] as $path) {
                    $paths[$locale][$path] ??= $record['id'];
                }
            }
        }

        return $paths;
    }

    /**
     * Taxonomy index pages' paths in each language, with their taxonomy's
     * and collection's ids (null: the shared page); with $old, the paths
     * they had before.
     *
     * @return array<string, array<string, array{0: int, 1: int|null}>>
     */
    private function indexRoutes(bool $old = false): array
    {
        $paths = [];
        foreach ($this->routes() as $record) {
            if ($record['index'] === null) {
                continue;
            }
            foreach (Locales::all() as $locale) {
                foreach ($old ? self::old($record, $locale, 'index_route', $record['index']) : [self::own($record, $locale, 'index_route') ?? $record['index']] as $path) {
                    $paths[$locale][$path] ??= [$record['id'], $record['collection']];
                }
            }
        }

        return $paths;
    }
}
