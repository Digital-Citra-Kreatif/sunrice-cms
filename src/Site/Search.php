<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Site search: live entries with pages of their own, in one language,
 * whose title or field text holds the words searched (as typed: % and _
 * aren't wildcards). Title matches first, then newest first. Used by the
 * search page (/search?q=…) and <x-sunrice-cms::search>.
 *
 *     app(Search::class)->entries('coffee', ['blog'], perPage: 20)
 *
 * Config `sunrice-cms.search`: `enabled`, `path`, `collections` (handles;
 * null: every collection with pages), `per_page` and `per_minute`.
 *
 * @api
 */
final class Search
{
    /** The query string's name: ?q=… */
    public const NAME = 'q';

    /** Longer searches are cut. */
    private const MAX = 100;

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

        $builder = EntryTranslation::query()->live()->with('entry.collection')->where('locale', $locale ?? Locales::current())
            ->whereIn('collection_id', Collection::query()->whereNotNull('route')
                ->when($collections !== null, fn (Builder $q) => $q->whereIn('handle', $collections ?? []))->select('id'));
        if ($query === '') {
            $builder->whereRaw('1 = 0');
        } else {
            // What's typed is matched literally: ! escapes % and _.
            $like = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $query).'%';
            $operator = $builder->getModel()->getConnection()->getDriverName() === 'pgsql' ? 'ILIKE' : 'LIKE';
            $builder->where(fn (Builder $q) => $q->whereRaw("title {$operator} ? ESCAPE '!'", [$like])->orWhereRaw("search_text {$operator} ? ESCAPE '!'", [$like]))
                ->orderByRaw("CASE WHEN title {$operator} ? ESCAPE '!' THEN 0 ELSE 1 END", [$like]);
        }

        return $builder->orderByDesc('published_at')->orderByDesc('id')
            ->paginate(max(1, min(100, $perPage)), ['*'], $pageName)->withQueryString();
    }
}
