<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

/**
 * Notes when a page asks for its page number (any paginator: the CMS's
 * listings, `Cms::entries()->paginate()`, an app's own Eloquent query),
 * so PageCache keeps a `?page=2` copy only of pages that paginate. It
 * wraps the paginators' page resolver and changes nothing it returns.
 * pastLast() turns a page number past the last into a 404 on site pages.
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
            if (app()->bound('request')) {
                $request = app('request');
                if ($pageName === 'page') {
                    $request->attributes->set(PageCache::PAGINATED, true);
                } elseif (PageCacheQuery::plainPageNumber($request->query($pageName))) {
                    // Another page name in cache.query ("listings"): read, so it may tell kept pages apart.
                    app(PageCache::class)->read($pageName, $request);
                }
            }

            $page = $resolver($pageName);

            return is_numeric($page) ? (int) $page : 1;
        });
    }

    /**
     * On the site's pages, a page number past the last of a paginator
     * (any: the CMS's listings, an entry filter, `Cms::entries()->paginate()`,
     * your own Eloquent query) is a 404 for `?page=`, so it's never kept as
     * a page of its own; past the last of another page name ("?listings=")
     * the page is shown but not kept.
     */
    public static function pastLast(): void
    {
        $check = function (AbstractPaginator $paginator): void {
            if (! app()->bound('request') || Page::current() === null || $paginator->currentPage() <= 1 || $paginator->isNotEmpty()) {
                return;
            }
            $request = app('request');
            if ($paginator->getPageName() !== 'page') {
                app(PageCache::class)->dontKeep($request);

                return;
            }
            abort(404);
        };
        app()->afterResolving(LengthAwarePaginator::class, $check);
        app()->afterResolving(Paginator::class, $check);
    }
}
