<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Sunrice\Cms\Actions\Cache\ClearCache;

/**
 * Settings → Cache's buttons: clear the page cache, or all the site's
 * caches (cms.settings.cache, on the routes).
 *
 * @internal
 */
final class CacheController
{
    public function clearPages(ClearCache $clear): RedirectResponse
    {
        $clear->handle(ClearCache::PAGES);

        return back()->with('success', 'The page cache is cleared: visitors get freshly rendered pages.');
    }

    public function clear(ClearCache $clear): RedirectResponse
    {
        $clear->handle(ClearCache::ALL);

        return back()->with('success', 'All the site\'s caches are cleared: pages, addresses, menus and the sitemap are read afresh.');
    }
}
