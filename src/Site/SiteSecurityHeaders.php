<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Security headers on every response of the CMS's site routes (pages,
 * listings, terms, search, the sitemap, previews, form and comment posts):
 * those in `sunrice-cms.site.headers` (DEFAULTS when the app's config file
 * has none), a header set to null or '' left out. A header the response
 * already has (the app's own middleware or template set it) is kept.
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
        $response = $next($request);
        $wanted = config('sunrice-cms.site.headers', self::DEFAULTS);
        foreach (is_array($wanted) ? $wanted : [] as $name => $value) {
            if (is_string($name) && is_string($value) && trim($value) !== '' && ! $response->headers->has($name)) {
                $response->headers->set($name, trim($value));
            }
        }

        return $response;
    }
}
