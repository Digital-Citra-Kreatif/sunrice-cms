<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Generator;
use Sunrice\Admin\Support\AppUrl;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\SiteCache;

/**
 * The sitemap's XML: every live entry page, term page, listing page and
 * taxonomy index page with its other languages, but those that ask not to be indexed, built in
 * chunks (never all at once) and kept in the cache's sitemap area, in
 * files of at most LIMIT addresses: one file when they fit, else an index
 * of /sitemap-{n}.xml files. Its addresses are on APP_URL (AppUrl), never
 * on the Host header a request named.
 *
 * @internal
 */
final class Sitemap
{
    /** Search engines read at most this many addresses from one sitemap file. */
    public const LIMIT = 50000;

    private const OPEN = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];

    /** How many files there are, once built or read. */
    private ?int $count = null;

    public function __construct(private SiteCache $cache, private int $limit = self::LIMIT) {}

    /** How many files the sitemap has: 1 (then /sitemap.xml holds the addresses) or more (/sitemap.xml is an index of them). */
    public function count(): int
    {
        if ($this->count === null) {
            $count = SiteCache::enabled() ? $this->cache->store()->get($this->key('count')) : null;
            $this->count = is_int($count) ? $count : $this->build(1)[0];
        }

        return $this->count;
    }

    /** The XML of file `$n` (from 1), or null when there's no such file. */
    public function part(int $n): ?string
    {
        if ($n < 1 || $n > $this->count()) {
            return null;
        }
        $xml = SiteCache::enabled() ? $this->cache->store()->get($this->key("part:{$n}")) : null;
        if (! is_string($xml)) {
            [$this->count, $xml] = $this->build($n);
        }

        return $xml;
    }

    /** The index of the files, for a sitemap with several. */
    public function index(): string
    {
        $xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
        for ($n = 1; $n <= $this->count(); $n++) {
            $xml[] = '<sitemap><loc>'.e(AppUrl::route('sunrice.cms.sitemap.part', ['part' => $n])).'</loc></sitemap>';
        }
        $xml[] = '</sitemapindex>';

        return implode("\n", $xml);
    }

    /** An empty sitemap, for a site hidden from search engines. */
    public static function empty(): string
    {
        return implode("\n", self::OPEN).'</urlset>';
    }

    /**
     * Builds every file, keeping each in the cache as it's done (so only
     * one is in memory at a time), and returns how many there are with the
     * XML of file `$wanted`.
     *
     * @return array{0: int, 1: string|null}
     */
    private function build(int $wanted): array
    {
        $n = 1;
        $xml = self::OPEN;
        $in = 0;
        $kept = null;
        $store = SiteCache::enabled() ? $this->cache->store() : null;
        foreach ($this->urls() as $url) {
            if ($in === $this->limit) {
                $xml[] = '</urlset>';
                $file = implode("\n", $xml);
                $store?->put($this->key("part:{$n}"), $file, SiteCache::ttl());
                $kept = $n === $wanted ? $file : $kept;
                $n++;
                $xml = self::OPEN;
                $in = 0;
            }
            $xml[] = $url;
            $in++;
        }
        $xml[] = '</urlset>';
        $file = implode("\n", $xml);
        $store?->put($this->key("part:{$n}"), $file, SiteCache::ttl());
        $store?->put($this->key('count'), $n, SiteCache::ttl());

        return [$n, $n === $wanted ? $file : $kept];
    }

    /** @return Generator<int, string> each page's <url> element */
    private function urls(): Generator
    {
        $routed = Collection::query()->whereNotNull('route')->pluck('id');
        $translations = EntryTranslation::query()->live()->with('entry.collection', 'entry.translations')
            ->whereIn('collection_id', $routed)->lazyById(500);
        foreach ($translations as $translation) {
            if (Seo::noindex($translation) || ($url = app(Site::class)->url($translation)) === null) {
                continue;
            }
            $xml = '<url><loc>'.e(AppUrl::url($url)).'</loc>';
            if ($translation->updated_at !== null) {
                $xml .= '<lastmod>'.$translation->updated_at->toAtomString().'</lastmod>';
            }
            yield $xml.self::links(Seo::alternates($translation)).'</url>';
        }
        // Term pages, but those that ask not to be indexed.
        $taxonomies = Taxonomy::query()->whereNotNull('route')->pluck('id');
        $terms = TermTranslation::query()->whereIn('taxonomy_id', $taxonomies)->whereHas('term', fn ($q) => $q->withoutTrashed())
            ->with('term.taxonomy', 'term.translations')->lazyById(500);
        foreach ($terms as $term) {
            $seo = $term->data[Seo::KEY] ?? null;
            if ((is_array($seo) && ($seo['noindex'] ?? false) === true) || ($url = $term->url()) === null) {
                continue;
            }
            $xml = '<url><loc>'.e(AppUrl::url($url)).'</loc>';
            if ($term->updated_at !== null) {
                $xml .= '<lastmod>'.$term->updated_at->toAtomString().'</lastmod>';
            }
            yield $xml.self::links(Seo::termAlternates($term)).'</url>';
        }
        // Term pages in collections, for terms with entries there.
        foreach ($this->collectionTerms() as [$collection, $term]) {
            $seo = $term->data[Seo::KEY] ?? null;
            if ((is_array($seo) && ($seo['noindex'] ?? false) === true) || ($url = $term->in($collection)->url()) === null) {
                continue;
            }
            $xml = '<url><loc>'.e(AppUrl::url($url)).'</loc>';
            if ($term->updated_at !== null) {
                $xml .= '<lastmod>'.$term->updated_at->toAtomString().'</lastmod>';
            }
            yield $xml.self::links(Seo::termAlternates($term)).'</url>';
        }
        // Listing pages, in every language.
        foreach (Collection::query()->whereNotNull('listing_route')->orderBy('id')->get() as $collection) {
            $links = self::links(Seo::listingAlternates($collection));
            foreach (Locales::all() as $locale) {
                yield '<url><loc>'.e(AppUrl::url((string) $collection->listingUrl($locale))).'</loc>'.$links.'</url>';
            }
        }
        // Taxonomies' index pages, shared and in collections, in every language, but those that ask not to be indexed.
        foreach ($this->indexPages() as [$taxonomy, $collection]) {
            $links = self::links(Seo::indexAlternates($taxonomy, $collection));
            foreach (Locales::all() as $locale) {
                if (! self::indexNoindex($taxonomy, $collection, $locale) && ($url = $taxonomy->indexUrl($locale, $collection)) !== null) {
                    yield '<url><loc>'.e(AppUrl::url($url)).'</loc>'.$links.'</url>';
                }
            }
        }
    }

    /**
     * Every taxonomy index page that's on: the shared ones (collection
     * null) and collections' (in id order).
     *
     * @return list<array{0: Taxonomy, 1: Collection|null}>
     */
    private function indexPages(): array
    {
        $indexes = app(Site::class)->collectionIndexes();
        $taxonomies = Taxonomy::query()->with('listings')->where(fn ($q) => $q->whereNotNull('index_route')->orWhereIn('id', array_keys($indexes)))->orderBy('id')->get();
        $collections = Collection::query()->whereIn('id', array_merge([], ...array_map(array_keys(...), array_values($indexes))))->get()->keyBy('id');
        $pages = [];
        foreach ($taxonomies as $taxonomy) {
            if ($taxonomy->index_route !== null) {
                $pages[] = [$taxonomy, null];
            }
            foreach (array_keys($indexes[$taxonomy->id] ?? []) as $id) {
                if (($collection = $collections->get($id)) instanceof Collection) {
                    $pages[] = [$taxonomy, $collection];
                }
            }
        }

        return $pages;
    }

    /** Whether an index page asks not to be indexed in a language (its SEO card). */
    private static function indexNoindex(Taxonomy $taxonomy, ?Collection $collection, string $locale): bool
    {
        $seo = $taxonomy->listings->first(fn (TaxonomyListing $listing): bool => $listing->locale === $locale && $listing->collection_id === $collection?->id)?->data[Seo::KEY] ?? null;

        return is_array($seo) && ($seo['noindex'] ?? false) === true;
    }

    /**
     * The sitemap's pages, one language each (all, or `$locale`), as full
     * addresses on APP_URL with their collection's handle (null for term
     * pages): what the page cache preloads (PreloadCache). Entry pages,
     * term pages, listing pages (their first page) and taxonomy index
     * pages, but those that ask not to be indexed.
     *
     * @return Generator<int, array{url: string, collection: string|null}>
     */
    public function pages(?string $locale = null): Generator
    {
        $routed = Collection::query()->whereNotNull('route')->pluck('handle', 'id');
        $translations = EntryTranslation::query()->live()->with('entry.collection')->whereIn('collection_id', $routed->keys())
            ->when($locale !== null, fn ($q) => $q->where('locale', $locale))->lazyById(500);
        foreach ($translations as $translation) {
            if (! Seo::noindex($translation) && ($url = app(Site::class)->url($translation)) !== null) {
                $handle = $routed->get($translation->collection_id);
                yield ['url' => AppUrl::url($url), 'collection' => is_string($handle) ? $handle : null];
            }
        }
        $taxonomies = Taxonomy::query()->whereNotNull('route')->pluck('id');
        $terms = TermTranslation::query()->whereIn('taxonomy_id', $taxonomies)->whereHas('term', fn ($q) => $q->withoutTrashed())
            ->when($locale !== null, fn ($q) => $q->where('locale', $locale))->with('term.taxonomy')->lazyById(500);
        foreach ($terms as $term) {
            $seo = $term->data[Seo::KEY] ?? null;
            if (! (is_array($seo) && ($seo['noindex'] ?? false) === true) && ($url = $term->url()) !== null) {
                yield ['url' => AppUrl::url($url), 'collection' => null];
            }
        }
        foreach ($this->collectionTerms($locale) as [$collection, $term]) {
            $seo = $term->data[Seo::KEY] ?? null;
            if (! (is_array($seo) && ($seo['noindex'] ?? false) === true) && ($url = $term->in($collection)->url()) !== null) {
                yield ['url' => AppUrl::url($url), 'collection' => $collection->handle];
            }
        }
        foreach (Collection::query()->whereNotNull('listing_route')->orderBy('id')->get() as $collection) {
            foreach (Locales::all() as $code) {
                if (($locale === null || $locale === $code) && ($url = $collection->listingUrl($code)) !== null) {
                    yield ['url' => AppUrl::url($url), 'collection' => $collection->handle];
                }
            }
        }
        foreach ($this->indexPages() as [$taxonomy, $collection]) {
            foreach (Locales::all() as $code) {
                if (($locale === null || $locale === $code) && ! self::indexNoindex($taxonomy, $collection, $code) && ($url = $taxonomy->indexUrl($code, $collection)) !== null) {
                    yield ['url' => AppUrl::url($url), 'collection' => $collection?->handle];
                }
            }
        }
    }

    /**
     * Each taxonomy's terms with live entries in a collection where its
     * terms have pages, with that collection (one language, or all).
     *
     * @return Generator<int, array{0: Collection, 1: TermTranslation}>
     */
    private function collectionTerms(?string $locale = null): Generator
    {
        foreach (app(Site::class)->collectionTerms() as $taxonomy => $collections) {
            foreach (array_keys($collections) as $id) {
                $collection = Collection::query()->find($id);
                if ($collection === null) {
                    continue;
                }
                $terms = TermTranslation::query()->where('taxonomy_id', $taxonomy)
                    ->whereHas('term', fn ($q) => $q->withoutTrashed()->whereHas('entries', fn ($q) => $q->where('collection_id', $id)
                        ->whereHas('translations', fn ($q) => $q->live())))
                    ->when($locale !== null, fn ($q) => $q->where('locale', $locale))->with('term.taxonomy', 'term.translations')->lazyById(500);
                foreach ($terms as $term) {
                    yield [$collection, $term];
                }
            }
        }
    }

    /**
     * A page's other languages (and x-default) as hreflang links.
     *
     * @param  array<string, string>  $alternates
     */
    private static function links(array $alternates): string
    {
        $xml = '';
        foreach ($alternates as $locale => $alternate) {
            $xml .= '<xhtml:link rel="alternate" hreflang="'.e(str_replace('_', '-', $locale)).'" href="'.e(AppUrl::url($alternate)).'"/>';
        }

        return $xml;
    }

    /** Its addresses are full URLs, on APP_URL (or, without one, the request's host): per root. */
    private function key(string $key): string
    {
        return $this->cache->key('sitemap:'.sha1(AppUrl::url(url('/'))).':'.$key, SiteCache::SITEMAP);
    }
}
