<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Pagination\LengthAwarePaginator as Paginated;
use Illuminate\Pagination\Paginator;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * Site search: live entries with pages of their own, in one language
 * (and, with the main-language fallback, the main language's of entries
 * not live in it, linking to their page at that language's address),
 * whose title or field text holds the words searched. Title matches
 * first, then newest first. Used by the search page (/search?q=…) and
 * <x-sunrice-cms::search>.
 *
 * Each database searches its own way, with the index of migration
 * 000017: MySQL and MariaDB a FULLTEXT index (whole words, natural
 * language mode), Postgres a GIN index on the words (the 'simple'
 * dictionary), SQLite (development) a LIKE scan matching what's typed
 * literally (% and _ aren't wildcards). The same search within a minute
 * is answered from the site cache (ids only, never models).
 *
 *     app(Search::class)->entries('coffee', ['blog'], perPage: 20)
 *
 * Config `sunrice-cms.search`: `enabled`, `path`, `collections` (handles;
 * null: every collection with pages), `per_page`, `per_minute` and
 * `per_minute_global`.
 *
 * @api
 */
final class Search
{
    /** The query string's name: ?q=… */
    public const NAME = 'q';

    /** Longer searches are cut. */
    private const MAX = 100;

    /** Seconds a search's results are kept (under the content version too). */
    private const CACHE_TTL = 60;

    public function __construct(private readonly SiteCache $cache) {}

    public static function enabled(): bool
    {
        return filter_var(config('sunrice-cms.search.enabled', true), FILTER_VALIDATE_BOOL);
    }

    /** The search page in a language: /search, /id/search. */
    public static function url(?string $locale = null): string
    {
        $locale ??= Locales::current();

        return url(($locale === Locales::default() ? '' : '/'.$locale).'/'.self::path());
    }

    /** @internal */
    public static function path(): string
    {
        $path = config('sunrice-cms.search.path', 'search');

        return is_string($path) && trim($path, '/') !== '' ? trim($path, '/') : 'search';
    }

    /**
     * @param  list<string>|null  $collections  handles; null: those in config, else every one with pages
     * @return LengthAwarePaginator<int, EntryTranslation>
     */
    public function entries(string $query, ?array $collections = null, ?int $perPage = null, ?string $locale = null, string $pageName = 'page'): LengthAwarePaginator
    {
        $query = trim(mb_substr($query, 0, self::MAX));
        $configured = config('sunrice-cms.search.collections');
        $collections ??= is_array($configured) ? array_values(array_filter($configured, is_string(...))) : null;
        $perPage ??= is_numeric($configured = config('sunrice-cms.search.per_page', 10)) ? (int) $configured : 10;
        $perPage = max(1, min(100, $perPage));
        $locale ??= Locales::current();
        $page = Paginator::resolveCurrentPage($pageName);

        $found = $query === '' ? ['ids' => [], 'total' => 0] : $this->cache->remember(
            'search:'.sha1(serialize([$locale, Site::fallback(), $query, $collections, $perPage, $page])),
            fn (): array => $this->find($query, $collections, $perPage, $locale, $page),
            ttl: self::CACHE_TTL,
        );
        $items = $found['ids'] === [] ? new EloquentCollection : EntryTranslation::query()->whereKey($found['ids'])->with(SiteController::listed($locale))->get()
            ->sortBy(fn (EntryTranslation $translation): int => (int) array_search($translation->id, $found['ids'], true))->values();
        // Hydrated together: the first values() loads what all of them point at.
        (new HydrationContext($locale))->share($items);

        return (new Paginated($items, $found['total'], $perPage, $page, ['path' => Paginator::resolveCurrentPath(), 'pageName' => $pageName]))->withQueryString();
    }

    /**
     * The ids on one page of results, in order, and how many there are in all.
     *
     * @param  list<string>|null  $collections
     * @return array{ids: list<int>, total: int}
     */
    private function find(string $query, ?array $collections, int $perPage, string $locale, int $page): array
    {
        // Entries not live in the language, in the main one (with the fallback), as their pages are shown.
        $builder = EntryTranslation::query()->live()->shownIn($locale)
            ->whereIn('collection_id', Collection::query()->whereNotNull('route')
                ->when($collections !== null, fn (Builder $q) => $q->whereIn('handle', $collections ?? []))->select('id'));
        $this->matching($builder, $query);
        $total = $builder->toBase()->getCountForPagination();
        $ids = $total === 0 ? [] : $builder->orderByDesc('published_at')->orderByDesc('id')->forPage($page, $perPage)->pluck('id')->all();

        return ['ids' => array_values(array_filter($ids, is_int(...))), 'total' => $total];
    }

    /**
     * Only what holds the words searched, the database's own way, title
     * matches first.
     *
     * @param  Builder<EntryTranslation>  $builder
     */
    private function matching(Builder $builder, string $query): void
    {
        $driver = $builder->getModel()->getConnection()->getDriverName();
        // What's typed, matched literally: ! escapes % and _.
        $like = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $query).'%';
        $operator = $driver === 'pgsql' ? 'ILIKE' : 'LIKE';
        match ($driver) {
            'mysql', 'mariadb' => $builder->whereFullText(['title', 'search_text'], $query),
            // The expression of the index in migration 000017, exactly.
            'pgsql' => $builder->whereRaw("to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(search_text, '')) @@ plainto_tsquery('simple', ?)", [$query]),
            default => $builder->where(fn (Builder $q) => $q->whereRaw("title LIKE ? ESCAPE '!'", [$like])->orWhereRaw("search_text LIKE ? ESCAPE '!'", [$like])),
        };
        // Cheap: checked for what matched only.
        $builder->orderByRaw("CASE WHEN title {$operator} ? ESCAPE '!' THEN 0 ELSE 1 END", [$like]);
    }
}
