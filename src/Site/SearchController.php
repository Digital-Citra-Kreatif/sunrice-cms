<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\View;

/**
 * The search page: /search?q=… and /{locale}/search (from the site's
 * fallback, so the app's own routes come first), rendered with cms.search
 * or the CMS's plain one. Never indexed, nor kept by the page cache.
 *
 * @internal
 */
final class SearchController
{
    public function __invoke(Request $request, Search $search, string $locale): Response
    {
        // Searches one visitor may make per minute.
        $perMinute = config('sunrice-cms.search.per_minute', 30);
        $key = 'sunrice-search|'.$request->ip();
        abort_if(RateLimiter::tooManyAttempts($key, is_numeric($perMinute) ? (int) $perMinute : 30), 429);
        RateLimiter::hit($key, 60);
        app()->setLocale($locale);
        $query = $request->query(Search::NAME);
        $query = is_string($query) ? trim(mb_substr($query, 0, 100)) : '';
        $results = $search->entries($query, locale: $locale);
        abort_if($results->currentPage() > 1 && $results->isEmpty(), 404);
        $view = View::exists('cms.search') ? 'cms.search' : 'sunrice-cms::search';
        (new Page(Page::SEARCH, $locale, $view, pageNumber: $results->currentPage()))->share();

        return response()->view($view, [
            'query' => $query,
            'results' => $results,
            'title' => $query === '' ? __('Search', [], $locale) : __('Search: :query', ['query' => $query], $locale),
            'locale' => $locale,
        ])->header('X-Robots-Tag', 'noindex, follow');
    }
}
