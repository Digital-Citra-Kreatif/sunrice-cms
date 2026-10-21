<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Http\Request;
use Sunrice\Cms\Support\Locales;
use Symfony\Component\HttpFoundation\Response;

/**
 * On the site's routes, before anything is looked up: the app's locale is
 * the language of the address (/id/blog/kopi), so 404 pages, redirects
 * and the search page are in it too; and while the main language is at
 * the plain addresses, its code as a prefix (/en/about, from before the
 * main language changed) goes to the plain address, query string kept, as
 * do /about/ and /index.php/about (one address per page). The app's own
 * routes come first and aren't touched.
 *
 * @internal
 */
final class SetSiteLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $path = '/'.trim($request->path(), '/');
        $default = Locales::default();
        $script = (bool) preg_match('#/index\.php$#', $request->getBaseUrl());
        $slash = $request->getPathInfo() !== '/' && str_ends_with($request->getPathInfo(), '/');
        if (in_array($request->method(), ['GET', 'HEAD'], true) && ($script || $slash)) {
            $query = $request->getQueryString();
            $root = $request->getSchemeAndHttpHost().preg_replace('#/index\.php$#', '', $request->getBaseUrl());

            return redirect()->to($root.$path.($query === null || $query === '' ? '' : "?{$query}"), 301);
        }
        // Only while the main language is at the plain addresses and no language uses its code as prefix.
        $plain = Locales::prefix($default) === '' && ! in_array($default, Locales::segments(), true);
        if ($plain && in_array($request->method(), ['GET', 'HEAD'], true) && ($path === "/{$default}" || str_starts_with($path, "/{$default}/"))) {
            $query = $request->getQueryString();

            return redirect()->to(url(substr($path, strlen($default) + 1) ?: '/').($query === null || $query === '' ? '' : "?{$query}"), 301);
        }
        app()->setLocale(app(Site::class)->locale($path));

        /** @var Response */
        return $next($request);
    }
}
