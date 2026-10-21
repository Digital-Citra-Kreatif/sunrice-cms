<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\RedirectResponse;

/**
 * A redirect to an address on the site, sent host-relative (`Location:
 * /about`): absolute URLs built from the request carry its Host header,
 * which whoever sends the request chooses, and a cache or proxy in front
 * could keep a redirect to their host for everyone. Addresses on the
 * request's own host lose it; paths and other sites are sent as they are.
 *
 * @internal
 */
final class SiteRedirect
{
    public static function to(string $url, int $status = 302): RedirectResponse
    {
        $root = request()->getSchemeAndHttpHost();
        if ($url === $root) {
            $url = '/';
        } elseif (str_starts_with($url, $root.'/')) {
            $url = substr($url, strlen($root));
        } elseif (str_starts_with($url, $root.'?') || str_starts_with($url, $root.'#')) {
            $url = '/'.substr($url, strlen($root));
        }

        return new RedirectResponse($url, $status);
    }
}
