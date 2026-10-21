<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Request;
use Spatie\ResponseCache\Hasher\DefaultHasher;

/**
 * What tells kept pages apart (see PageCache): the host, the path, the
 * language and only the query parameters the site reads (a `page` number
 * above 1 and config `sunrice-cms.cache.query`), so `?utm_source=…`,
 * `?x=<random>` or `?page=abc` can't fill the cache store with copies of
 * one page. (`?q=` and `?reply_to=` pages are never kept: see
 * PageCache::UNKEPT_QUERY.) The CMS sets it as `responsecache.hasher`
 * unless the app set its own.
 *
 * @api
 */
class PageCacheHasher extends DefaultHasher
{
    /** Always kept: paginated pages read it. */
    public const QUERY = ['page'];

    public function getHashFor(Request $request): string
    {
        return hash('xxh128', parent::getHashFor($request).'-'.app()->getLocale());
    }

    /** @return list<string> */
    public static function query(): array
    {
        $extra = config('sunrice-cms.cache.query', []);
        $extra = is_array($extra) ? array_values(array_filter($extra, fn (mixed $name): bool => is_string($name) && $name !== '')) : [];

        return array_values(array_unique([...self::QUERY, ...$extra]));
    }

    /**
     * The `?page=` number when it's above 1 (else null: the first page).
     * Only plainly written numbers count: PageCache leaves any other
     * `?page=` (`abc`, `+2`, `02`) out of the cache altogether.
     */
    public static function pageNumber(Request $request): ?int
    {
        $page = $request->query('page');

        return self::plainPageNumber($page) && (int) $page > 1 ? (int) $page : null;
    }

    /** @internal Whether a `?page=` value is written plainly (1, 2, 30). */
    public static function plainPageNumber(mixed $page): bool
    {
        return is_string($page) && preg_match('/^[1-9][0-9]{0,8}$/', $page) === 1;
    }

    protected function getNormalizedQueryString(Request $request): string
    {
        $kept = [];
        foreach (self::query() as $name) {
            $value = $name === 'page' ? self::pageNumber($request) : $request->query($name);
            if ($value !== null) {
                $kept[$name] = $value;
            }
        }
        ksort($kept);

        return http_build_query($kept);
    }
}
