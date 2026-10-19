<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Support\SiteCache;
use Symfony\Component\HttpFoundation\Response as BaseResponse;

/**
 * The whole-page cache (`sunrice-cms.cache.pages`): site pages rendered
 * once and kept until the content changes (or `cache.ttl` passes), for
 * visitors who aren't signed in. Forms keep working: each visitor gets
 * their own CSRF token in the kept page.
 *
 * Left out: anyone signed in, a visitor with something flashed to them
 * (form errors, old input, a thank-you message), pages that aren't a
 * plain 200 or that set cookies of their own, and what skipWhen() says:
 *
 *     app(PageCache::class)->skipWhen(fn (Request $request, ?Page $page): bool =>
 *         $request->cookies->has('cart') || $page?->collection?->handle === 'products');
 *
 * @api
 */
final class PageCache
{
    private const TOKEN = '__sunrice_csrf_token__';

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

    /** @internal the middleware on the site's routes */
    public function handle(Request $request, Closure $next): BaseResponse
    {
        if (! self::enabled() || ! $this->forVisitor($request)) {
            /** @var BaseResponse */
            return $next($request);
        }
        $cache = app(SiteCache::class);
        $key = $cache->key('html:'.sha1($request->fullUrl()));
        $kept = $cache->store()->get($key);
        if (is_array($kept) && is_string($kept['body'] ?? null) && is_string($kept['type'] ?? null) && ! $this->skipped($request, null)) {
            return new Response(str_replace(self::TOKEN, (string) csrf_token(), $kept['body']), 200, ['Content-Type' => $kept['type'], 'X-Sunrice-Cache' => 'hit']);
        }

        /** @var BaseResponse $response */
        $response = $next($request);
        if ($this->keepable($response) && ! $this->skipped($request, Page::current())) {
            $token = (string) csrf_token();
            $body = (string) $response->getContent();
            $cache->store()->put($key, [
                'body' => $token !== '' ? str_replace($token, self::TOKEN, $body) : $body,
                'type' => (string) $response->headers->get('Content-Type', 'text/html; charset=UTF-8'),
            ], SiteCache::ttl());
            $response->headers->set('X-Sunrice-Cache', 'miss');
        }

        return $response;
    }

    /** A visitor who sees the same page as everyone. */
    private function forVisitor(Request $request): bool
    {
        if (! $request->isMethod('GET') || auth()->check() || auth(app(Panel::class)->getGuard())->check()) {
            return false;
        }
        if ($request->hasSession()) {
            $session = $request->session();
            if ($session->has('errors') || $session->get('_flash.old', []) !== [] || $session->hasOldInput()) {
                return false;
            }
        }

        return true;
    }

    private function keepable(BaseResponse $response): bool
    {
        if (! $response instanceof Response || $response->getStatusCode() !== 200) {
            return false;
        }
        // Cookies of its own (the session's and the CSRF cookie are set later, for everyone).
        foreach ($response->headers->getCookies() as $cookie) {
            if (! in_array($cookie->getName(), [config('session.cookie'), 'XSRF-TOKEN'], true)) {
                return false;
            }
        }

        return true;
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
