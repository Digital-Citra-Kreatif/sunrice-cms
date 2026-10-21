<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Request;
use Spatie\ResponseCache\Hasher\DefaultHasher;
use Sunrice\Cms\Settings\CacheSettings;

/**
 * What tells kept pages apart (see PageCache): the host, the path, the
 * language and only the query parameters the site reads (a `page` number
 * above 1, config `sunrice-cms.cache.query` and those in Settings →
 * Cache), so `?utm_source=…`,
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

    /** @return list<string> the parameters that tell kept pages apart: `page`, config `sunrice-cms.cache.query` and Settings → Cache's */
    public static function query(): array
    {
        return array_values(array_unique([...self::configuredQuery(), ...app(CacheSettings::class)->queryParameters()]));
    }

    /** @return list<string> `page` and config `sunrice-cms.cache.query` (without Settings → Cache's) */
    public static function configuredQuery(): array
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

    /** @internal Whether a query parameter has a value: not missing, empty or a list of empty ones. */
    public static function given(mixed $value): bool
    {
        return is_array($value) ? array_filter($value, fn (mixed $one): bool => self::given($one)) !== [] : $value !== null && $value !== '';
    }

    protected function getNormalizedQueryString(Request $request): string
    {
        $kept = [];
        foreach (self::query() as $name) {
            $value = $name === 'page' ? self::pageNumber($request) : $request->query($name);
            // An empty one (?sort=, as a form sends a blank choice) is the page without it.
            if (self::given($value)) {
                $kept[$name] = $value;
            }
        }
        ksort($kept);

        return http_build_query($kept);
    }
}
