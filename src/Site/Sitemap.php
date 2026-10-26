<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Generator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Sunrice\Admin\Support\AppUrl;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Query\Sql;
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

    /** How many rows are read at once (with their entries' or terms' other languages). */
    private const CHUNK = 500;

    /**
     * What the sitemap reads of an entry translation: never its draft or
     * search text, and its fields only where a route takes some
     * (withRouteFields()). Not reading them keeps a chunk's memory small.
     */
    private const ENTRY_COLUMNS = ['id', 'entry_id', 'collection_id', 'locale', 'status', 'slug', 'published_at', 'updated_at', 'live_updated_at'];

    /** What it reads of an entry: what its URL needs. */
    private const ENTRY_PARENT_COLUMNS = ['id', 'collection_id'];

    /** What it reads of a term translation. */
    private const TERM_COLUMNS = ['id', 'term_id', 'taxonomy_id', 'locale', 'slug', 'updated_at'];

    /** The column lean() reads a row's "Hide from search engines" (SEO card) into: 1 or 0. */
    private const NOINDEX = 'sitemap_noindex';

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
        $routed = Collection::query()->whereNotNull('route')->get();
        $fields = self::withRouteFields($routed);
        $translations = self::lean(EntryTranslation::query()->live(), self::ENTRY_COLUMNS, $fields, noindex: true)
            ->with(['entry' => fn (BelongsTo $q) => $q->select(self::ENTRY_PARENT_COLUMNS), 'entry.collection',
                'entry.translations' => fn (HasMany $q) => self::lean($q->getQuery(), self::ENTRY_COLUMNS, $fields)])
            ->whereIn('collection_id', $routed->modelKeys());
        // An entry's languages share their links: made once for all of them.
        $links = [];
        foreach (self::chunks($translations) as $translation) {
            if (self::noindex($translation) || ($url = app(Site::class)->url($translation)) === null) {
                continue;
            }
            $xml = '<url><loc>'.e(AppUrl::url($url)).'</loc>';
            if (($modified = $translation->liveUpdatedAt()) !== null) {
                $xml .= '<lastmod>'.$modified->toAtomString().'</lastmod>';
            }
            yield $xml.self::remember($links, $translation->entry_id, fn (): string => self::links(Seo::alternates($translation))).'</url>';
        }
        // Term pages, but those that ask not to be indexed.
        $taxonomies = Taxonomy::query()->whereNotNull('route')->pluck('id');
        $terms = self::lean(TermTranslation::query(), self::TERM_COLUMNS, noindex: true)->whereIn('taxonomy_id', $taxonomies)
            ->whereHas('term', fn ($q) => $q->withoutTrashed())
            ->with(['term.taxonomy', 'term.translations' => fn (HasMany $q) => self::lean($q->getQuery(), self::TERM_COLUMNS)]);
        $links = [];
        foreach (self::chunks($terms) as $term) {
            if (self::noindex($term) || ($url = $term->url()) === null) {
                continue;
            }
            $xml = '<url><loc>'.e(AppUrl::url($url)).'</loc>';
            if ($term->updated_at !== null) {
                $xml .= '<lastmod>'.$term->updated_at->toAtomString().'</lastmod>';
            }
            yield $xml.self::remember($links, $term->term_id, fn (): string => self::links(Seo::termAlternates($term))).'</url>';
        }
        // Term pages in collections, for terms with entries there.
        $links = [];
        foreach ($this->collectionTerms() as [$collection, $term]) {
            if (self::noindex($term) || ($url = $term->in($collection)->url()) === null) {
                continue;
            }
            $xml = '<url><loc>'.e(AppUrl::url($url)).'</loc>';
            if ($term->updated_at !== null) {
                $xml .= '<lastmod>'.$term->updated_at->toAtomString().'</lastmod>';
            }
            yield $xml.self::remember($links, $collection->id.':'.$term->term_id, fn (): string => self::links(Seo::termAlternates($term))).'</url>';
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
                if (! self::indexNoindex($taxonomy, $collection, $locale) && ($url = $taxonomy->indexUrl($locale, $collection)) !== null
                    && ($collection === null || self::indexListsTerms($taxonomy, $collection, $locale))) {
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
        $routed = Collection::query()->whereNotNull('route')->get();
        $handles = $routed->pluck('handle', 'id');
        $translations = self::lean(EntryTranslation::query()->live(), self::ENTRY_COLUMNS, self::withRouteFields($routed), noindex: true)
            ->with(['entry' => fn (BelongsTo $q) => $q->select(self::ENTRY_PARENT_COLUMNS), 'entry.collection'])->whereIn('collection_id', $routed->modelKeys())
            ->when($locale !== null, fn ($q) => $q->where('locale', $locale));
        foreach (self::chunks($translations) as $translation) {
            if (! self::noindex($translation) && ($url = app(Site::class)->url($translation)) !== null) {
                $handle = $handles->get($translation->collection_id);
                yield ['url' => AppUrl::url($url), 'collection' => is_string($handle) ? $handle : null];
            }
        }
        $taxonomies = Taxonomy::query()->whereNotNull('route')->pluck('id');
        $terms = self::lean(TermTranslation::query(), self::TERM_COLUMNS, noindex: true)->whereIn('taxonomy_id', $taxonomies)
            ->whereHas('term', fn ($q) => $q->withoutTrashed())
            ->when($locale !== null, fn ($q) => $q->where('locale', $locale))->with('term.taxonomy');
        foreach (self::chunks($terms) as $term) {
            if (! self::noindex($term) && ($url = $term->url()) !== null) {
                yield ['url' => AppUrl::url($url), 'collection' => null];
            }
        }
        foreach ($this->collectionTerms($locale) as [$collection, $term]) {
            if (! self::noindex($term) && ($url = $term->in($collection)->url()) !== null) {
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
                if (($locale === null || $locale === $code) && ! self::indexNoindex($taxonomy, $collection, $code) && ($url = $taxonomy->indexUrl($code, $collection)) !== null
                    && ($collection === null || self::indexListsTerms($taxonomy, $collection, $code))) {
                    yield ['url' => AppUrl::url($url), 'collection' => $collection?->handle];
                }
            }
        }
    }

    /**
     * Each taxonomy's terms with live entries in a collection where its
     * terms have pages, with that collection (one language, or all): in a
     * language, those whose page there lists entries, as it shows them
     * (EntryTranslation::shownIn(), so with the main-language fallback off
     * an untranslated entry doesn't count).
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
                foreach ($locale === null ? Locales::all() : [$locale] as $code) {
                    $terms = self::lean(TermTranslation::query(), self::TERM_COLUMNS, noindex: true)->where('taxonomy_id', $taxonomy)->where('locale', $code)
                        // The collection is picked among the live translations (by their index, once), not on each entry of each term.
                        ->whereHas('term', fn ($q) => $q->withoutTrashed()->whereHas('entries', fn ($q) => $q
                            ->whereHas('translations', fn ($q) => $q->whereIn('id', self::shown($id, $code)))))
                        ->with(['term.taxonomy', 'term.translations' => fn (HasMany $q) => self::lean($q->getQuery(), self::TERM_COLUMNS)]);
                    foreach (self::chunks($terms) as $term) {
                        yield [$collection, $term];
                    }
                }
            }
        }
    }

    /**
     * A query for only `$columns` of its rows (and `data`, their fields,
     * for those of the collections `$withData`), with whether each asks not
     * to be indexed (NOINDEX, `$noindex`) read in SQL: decoding every row's
     * fields for it would take longer than the rest of the sitemap.
     *
     * @template TModel of Model
     *
     * @param  Builder<TModel>  $query
     * @param  list<string>  $columns
     * @param  list<int>  $withData
     * @return Builder<TModel>
     */
    private static function lean(Builder $query, array $columns, array $withData = [], bool $noindex = false): Builder
    {
        $table = $query->getModel()->getTable();
        $grammar = $query->getQuery()->getGrammar();
        $data = $grammar->wrap("{$table}.data");
        $query->select(array_map(fn (string $column): string => "{$table}.{$column}", $columns));
        if ($withData !== []) {
            $query->addSelect(new Sql('case when '.$grammar->wrap("{$table}.collection_id").' in ('.implode(', ', $withData).") then {$data} end as data"));
        }
        if ($noindex) {
            // The SEO card's toggle, true itself (as Seo::noindex() reads it: not 1 or "true").
            $true = match ($query->getModel()->getConnection()->getDriverName()) {
                'sqlite' => "json_type({$data}, '$.\"".Seo::KEY."\".\"noindex\"') = 'true'",
                'pgsql' => "({$data} -> '".Seo::KEY."' -> 'noindex')::text = 'true'",
                default => "cast(json_extract({$data}, '$.\"".Seo::KEY."\".\"noindex\"') as char) = 'true'",
            };
            $query->addSelect(new Sql("case when {$true} then 1 else 0 end as ".self::NOINDEX));
        }

        return $query;
    }

    /** Whether a row lean() read asks not to be indexed. */
    private static function noindex(Model $row): bool
    {
        $flag = $row->getAttribute(self::NOINDEX);

        return is_numeric($flag) && (int) $flag === 1;
    }

    /**
     * The routed collections whose patterns (in any language) take fields
     * of their entries (/projects/{project}/{slug}): their URLs need them.
     *
     * @param  iterable<Collection>  $collections
     * @return list<int>
     */
    private static function withRouteFields(iterable $collections): array
    {
        $ids = [];
        foreach ($collections as $collection) {
            $patterns = [$collection->route, ...array_map(fn (array $own): mixed => $own['route'] ?? null, array_values($collection->routes ?? []))];
            foreach ($patterns as $pattern) {
                if (is_string($pattern) && (new RoutePattern($pattern))->parameters() !== []) {
                    $ids[] = $collection->id;
                    break;
                }
            }
        }

        return $ids;
    }

    /**
     * A query's rows in id order, CHUNK at a time (with its eager loads),
     * each chunk let go of before the next: its models point at each other
     * (an entry and its translations), so they're collected right away
     * rather than piling up until PHP's collector runs.
     *
     * @template TModel of Model
     *
     * @param  Builder<TModel>  $query
     * @return Generator<int, TModel>
     */
    private static function chunks(Builder $query): Generator
    {
        $key = $query->getModel()->getQualifiedKeyName();
        $after = null;
        do {
            $chunk = (clone $query)->when($after !== null, fn (Builder $q) => $q->where($key, '>', $after))->orderBy($key)->limit(self::CHUNK)->get();
            foreach ($chunk as $row) {
                yield $row;
            }
            $after = $chunk->last()?->getKey();
            $more = $chunk->count() === self::CHUNK;
            unset($chunk, $row);
            gc_collect_cycles();
        } while ($more);
    }

    /**
     * Whether a collection's index page lists any term in a language: one
     * of its entries shown there (EntryTranslation::shownIn()) has a term
     * of the taxonomy.
     */
    private static function indexListsTerms(Taxonomy $taxonomy, Collection $collection, string $locale): bool
    {
        return Term::query()->where('taxonomy_id', $taxonomy->id)
            ->whereHas('entries', fn ($q) => $q->whereHas('translations', fn ($q) => $q->whereIn('id', self::shown($collection->id, $locale))))
            ->exists();
    }

    /**
     * The ids of a collection's live entry translations shown in a
     * language, as its pages there list them.
     *
     * @return Builder<EntryTranslation>
     */
    private static function shown(int $collection, string $locale): Builder
    {
        return EntryTranslation::query()->live()->shownIn($locale)->where('sunrice_entry_translations.collection_id', $collection)->select('sunrice_entry_translations.id');
    }

    /**
     * A page's links, made once for the pages of its entry or term (`$key`)
     * among the last CHUNK of them.
     *
     * @param  array<int|string, string>  $made
     * @param  Closure(): string  $make
     */
    private static function remember(array &$made, int|string $key, Closure $make): string
    {
        if (! isset($made[$key])) {
            $made = count($made) >= self::CHUNK ? [] : $made;
            $made[$key] = $make();
        }

        return $made[$key];
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
