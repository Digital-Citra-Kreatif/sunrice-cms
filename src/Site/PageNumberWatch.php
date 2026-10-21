<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Pagination\AbstractPaginator;

/**
 * Notes when a page asks for its page number (any paginator: the CMS's
 * listings, `Cms::entries()->paginate()`, an app's own Eloquent query),
 * so PageCache keeps a `?page=2` copy only of pages that paginate. It
 * wraps the paginators' page resolver and changes nothing it returns.
 *
 * @internal
 *
 * @extends AbstractPaginator<int, mixed>
 */
abstract class PageNumberWatch extends AbstractPaginator
{
    public static function register(): void
    {
        // Laravel's PaginationServiceProvider sets one; without it, nothing to watch.
        /** @var Closure|null $resolver */
        $resolver = static::$currentPageResolver;
        if ($resolver === null) {
            return;
        }
        static::currentPageResolver(function (string $pageName = 'page') use ($resolver): int {
            if ($pageName === 'page' && app()->bound('request')) {
                app('request')->attributes->set(PageCache::PAGINATED, true);
            }

            $page = $resolver($pageName);

            return is_numeric($page) ? (int) $page : 1;
        });
    }
}
