<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Generator;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\SiteCache;

/**
 * The sitemap's XML: every live entry page with its other languages, term
 * pages and listing pages, but those that ask not to be indexed, built in
 * chunks (never all at once) and kept in the cache's sitemap area, in
 * files of at most LIMIT addresses: one file when they fit, else an index
 * of /sitemap-{n}.xml files.
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
            $xml[] = '<sitemap><loc>'.e(route('sunrice.cms.sitemap.part', ['part' => $n])).'</loc></sitemap>';
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
            if (Seo::noindex($translation) || ($url = $translation->url()) === null) {
                continue;
            }
            $xml = '<url><loc>'.e($url).'</loc>';
            if ($translation->updated_at !== null) {
                $xml .= '<lastmod>'.$translation->updated_at->toAtomString().'</lastmod>';
            }
            foreach (Seo::alternates($translation) as $locale => $alternate) {
                $xml .= '<xhtml:link rel="alternate" hreflang="'.e(str_replace('_', '-', $locale)).'" href="'.e($alternate).'"/>';
            }
            yield $xml.'</url>';
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
            $xml = '<url><loc>'.e($url).'</loc>';
            if ($term->updated_at !== null) {
                $xml .= '<lastmod>'.$term->updated_at->toAtomString().'</lastmod>';
            }
            yield $xml.'</url>';
        }
        // Listing pages, in every language.
        foreach (Collection::query()->whereNotNull('listing_route')->orderBy('id')->get() as $collection) {
            foreach (Locales::all() as $locale) {
                yield '<url><loc>'.e((string) $collection->listingUrl($locale)).'</loc></url>';
            }
        }
    }

    /** Its addresses are full URLs: per host. */
    private function key(string $key): string
    {
        return $this->cache->key('sitemap:'.sha1(url('/')).':'.$key, SiteCache::SITEMAP);
    }
}
