<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Session\Middleware\StartSession;
use Symfony\Component\HttpFoundation\Response;

/**
 * Laravel's StartSession for the site's routes, keeping a session only
 * when the page needs one (`sunrice-cms.site.lazy_sessions`, on by
 * default). A visitor without a session cookie who reads a page (GET or
 * HEAD) gets no stored session and no session or XSRF-TOKEN cookie,
 * unless the page printed the CSRF token (a form, `@csrf`, `csrf_token()`,
 * a kept page's form filled in by CsrfTokenReplacer), something was put
 * or flashed in the session, or they're signed in. Visitors with a
 * session cookie, and other methods, get Laravel's normal behaviour.
 *
 * So a page without a form writes nothing (no sessions row with the
 * `database` driver) and sets no cookie, and a CDN may keep it.
 *
 * @internal
 */
final class StartSessionWhenNeeded extends StartSession
{
    /** The middleware group the site's routes run in instead of `sunrice-cms.site.middleware`. */
    public const GROUP = 'sunrice-cms.site';

    /** What every new session has, so it doesn't make one needed. */
    private const BOOTSTRAP = ['_token' => true, '_previous' => true, '_flash' => true];

    /**
     * Defines the site's middleware group: the given middleware (and the
     * groups it names), with this in place of StartSession when
     * `sunrice-cms.site.lazy_sessions` is on. Done when a route is first
     * matched, so the app's middleware groups are known (they are set when
     * the HTTP kernel is made, and not at all for console commands such as
     * route:cache).
     *
     * @param  list<string>  $middleware
     */
    public static function register(Router $router, array $middleware): void
    {
        $router->matched(function () use ($router, $middleware): void {
            if ($router->hasMiddlewareGroup(self::GROUP)) {
                return;
            }
            $lazy = config('sunrice-cms.site.lazy_sessions', true) !== false;
            $resolved = [];
            foreach ($router->resolveMiddleware($middleware) as $name) {
                if (is_string($name)) {
                    $resolved[] = $lazy && $name === StartSession::class ? self::class : $name;
                }
            }
            $router->middlewareGroup(self::GROUP, $resolved);
        });
    }

    /**
     * @param  Session  $session
     */
    protected function handleStatefulRequest(Request $request, $session, Closure $next): mixed
    {
        if (! in_array($request->method(), ['GET', 'HEAD'], true) || $request->cookies->has($session->getName())) {
            return parent::handleStatefulRequest($request, $session, $next);
        }
        $request->setLaravelSession($this->startSession($request, $session));
        $this->collectGarbage($session);

        $response = $next($request);

        if (! $this->needed($request, $session, $response)) {
            if ($response instanceof Response) {
                $config = $this->manager->getSessionConfig();
                $response->headers->removeCookie('XSRF-TOKEN', is_string($config['path'] ?? null) ? $config['path'] : '/', is_string($config['domain'] ?? null) ? $config['domain'] : null);
            }

            return $response;
        }
        $this->storeCurrentUrl($request, $session);
        if ($response instanceof Response) {
            $this->addCookieToResponse($response, $session);
        }
        $this->saveSession($request);

        return $response;
    }

    /** Whether the visitor needs the session kept: the page printed its CSRF token, it holds data, or they're signed in. */
    private function needed(Request $request, Session $session, mixed $response): bool
    {
        if (array_diff_key($session->all(), self::BOOTSTRAP) !== [] || $request->user() !== null) {
            return true;
        }
        $token = $session->token();
        $content = $response instanceof Response ? $response->getContent() : false;

        return $token !== '' && is_string($content) && str_contains($content, $token);
    }
}
