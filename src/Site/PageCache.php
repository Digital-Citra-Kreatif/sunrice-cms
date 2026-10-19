<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Http\Request;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Support\SiteCache;

/**
 * The whole-page cache (`sunrice-cms.cache.pages`, with
 * spatie/laravel-responsecache): site pages rendered once and kept until
 * the content changes, for visitors who aren't signed in. Forms keep
 * working: each visitor gets their own CSRF token in a kept page.
 *
 * Left out: anyone signed in, a visitor with something flashed to them
 * (form errors, old input, a thank-you message), search results, pages
 * that aren't a plain 200, and what skipWhen() says:
 *
 *     app(PageCache::class)->skipWhen(fn (Request $request, ?Page $page): bool =>
 *         $request->cookies->has('cart') || $page?->collection?->handle === 'products');
 *
 * See PageCacheProfile for how responsecache asks.
 *
 * @api
 */
final class PageCache
{
    /** @var list<Closure(Request, ?Page): bool> */
    private array $skips = [];

    public static function enabled(): bool
    {
        return SiteCache::enabled() && filter_var(config('sunrice-cms.cache.pages', false), FILTER_VALIDATE_BOOL);
    }

    /** @param Closure(Request, ?Page): bool $skip true: don't serve this page from the cache, or keep it */
    public function skipWhen(Closure $skip): self
    {
        $this->skips[] = $skip;

        return $this;
    }

    /** A visitor who sees the same pages as everyone: served and kept pages. */
    public function forVisitor(Request $request): bool
    {
        if (! self::enabled() || ! $request->isMethod('GET') || auth()->check() || auth(app(Panel::class)->getGuard())->check()) {
            return false;
        }
        if ($request->hasSession()) {
            $session = $request->session();
            if ($session->has('errors') || $session->get('_flash.old', []) !== [] || $session->hasOldInput()) {
                return false;
            }
        }

        return ! $this->skipped($request, null);
    }

    /** Whether the page just rendered may be kept. */
    public function keeps(Request $request, ?Page $page): bool
    {
        // Search results: as many pages as searches.
        return $page?->type !== Page::SEARCH && ! $this->skipped($request, $page);
    }

    private function skipped(Request $request, ?Page $page): bool
    {
        foreach ($this->skips as $skip) {
            if ($skip($request, $page)) {
                return true;
            }
        }

        return false;
    }
}
