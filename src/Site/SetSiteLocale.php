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
 * and the search page are in it too; and the main language's own prefix
 * (/en/about, from before the main language changed) goes to the plain
 * address, query string kept. The app's own routes come first and aren't
 * touched.
 *
 * @internal
 */
final class SetSiteLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $path = '/'.trim($request->path(), '/');
        $default = Locales::default();
        if (in_array($request->method(), ['GET', 'HEAD'], true) && ($path === "/{$default}" || str_starts_with($path, "/{$default}/"))) {
            $query = $request->getQueryString();

            return redirect()->to(url(substr($path, strlen($default) + 1) ?: '/').($query === null || $query === '' ? '' : "?{$query}"), 301);
        }
        app()->setLocale(app(Site::class)->locale($path));

        /** @var Response */
        return $next($request);
    }
}
