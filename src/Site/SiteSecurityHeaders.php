<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Foundation\Vite;
use Illuminate\Http\Request;
use Sunrice\Admin\Security\ContentSecurityPolicy;
use Symfony\Component\HttpFoundation\Response;

/**
 * Security headers on every response of the CMS's site routes (pages,
 * listings, terms, search, the sitemap, previews, form and comment posts):
 * those in `sunrice-cms.site.headers` (DEFAULTS when the app's config file
 * has none), a header set to null or '' left out, and the site's
 * Content-Security-Policy when `sunrice-cms.site.csp` turns it on (SiteCsp;
 * a policy string in `site.headers` is sent as is instead). A header the
 * response already has (the app's own middleware or template set it) is
 * kept. It runs outside the page cache, so kept pages get them too.
 *
 * @internal
 */
final class SiteSecurityHeaders
{
    public const DEFAULTS = [
        'X-Content-Type-Options' => 'nosniff',
        'X-Frame-Options' => 'SAMEORIGIN',
        'Referrer-Policy' => 'strict-origin-when-cross-origin',
        'Permissions-Policy' => 'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy' => null,
    ];

    /** @param  Closure(Request): Response  $next */
    public function handle(Request $request, Closure $next): Response
    {
        $policy = SiteCsp::enabled();
        // A fresh nonce for every request (kept pages too: CspNonceReplacer puts it in), before the page is rendered.
        $nonce = $policy && SiteCsp::usesNonce() ? app(Vite::class)->useCspNonce() : null;

        $response = $next($request);
        $wanted = config('sunrice-cms.site.headers', self::DEFAULTS);
        foreach (is_array($wanted) ? $wanted : [] as $name => $value) {
            if (is_string($name) && is_string($value) && trim($value) !== '' && ! $response->headers->has($name)) {
                $response->headers->set($name, trim($value));
            }
        }

        $headers = $response->headers;
        if ($policy && self::wantsPolicy($response) && ! $headers->has(ContentSecurityPolicy::HEADER) && ! $headers->has(ContentSecurityPolicy::REPORT_ONLY_HEADER)) {
            $headers->set(SiteCsp::reportOnly() ? ContentSecurityPolicy::REPORT_ONLY_HEADER : ContentSecurityPolicy::HEADER, SiteCsp::policy($request, $nonce)->toString());
        }

        return $response;
    }

    /** Pages (HTML), not the sitemap's XML; nor the framework's error page with the stack trace (a 500 with APP_DEBUG), whose inline scripts have no nonce. */
    private static function wantsPolicy(Response $response): bool
    {
        $type = (string) $response->headers->get('Content-Type', 'text/html');

        return str_starts_with(strtolower($type), 'text/html') && ! ($response->getStatusCode() >= 500 && config('app.debug') === true);
    }
}
