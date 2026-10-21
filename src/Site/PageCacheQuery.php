<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Request;
use Sunrice\Cms\Settings\CacheSettings;

/**
 * Which query parameters tell kept pages apart, and how a `?page=` is
 * read: what PageCacheHasher keys pages by, kept apart from it because
 * it extends spatie/laravel-responsecache's hasher and that package is
 * optional. Settings, the page cache's checks and pagination use this,
 * so they work without the package.
 *
 * @api
 */
final class PageCacheQuery
{
    /** Always kept: paginated pages read it. */
    public const QUERY = ['page'];

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
}
