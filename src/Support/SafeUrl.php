<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Closure;

/**
 * Whether an address editors typed is safe to put in a link: paths on the
 * site, #anchors and http, https, mailto and tel are; other schemes
 * (javascript:, data:…) are not, since they would run code on a click.
 *
 * @api
 */
final class SafeUrl
{
    public const SCHEMES = ['http', 'https', 'mailto', 'tel'];

    public static function isSafe(string $url): bool
    {
        // Browsers ignore whitespace and control characters inside a scheme.
        $clean = (string) preg_replace('/[\x00-\x20\x7F]+/', '', $url);
        if (preg_match('/^([a-zA-Z][a-zA-Z0-9+.\-]*):/', $clean, $match) === 1) {
            return in_array(strtolower($match[1]), self::SCHEMES, true);
        }

        // A path, ?query or #anchor: not //host (another site, hidden in what looks like a path),
        // nor a backslash, which would let browsers read "/\evil.com" as a host.
        return ! str_starts_with($clean, '//') && ! str_contains($clean, '\\');
    }

    /**
     * Whether an address is on this site: a path (/about, not //host), or
     * an absolute URL with the scheme, host and port of the current
     * request or of `APP_URL`. For sending visitors "back": the Referer
     * header (what `url()->previous()` reads first) is whatever the page
     * that sent them said, and could be another site.
     */
    public static function isLocal(string $url): bool
    {
        if ($url === '' || preg_match('/[\x00-\x20\x7F\\\\]/', $url) === 1) {
            return false;
        }
        if (str_starts_with($url, '/')) {
            return ! str_starts_with($url, '//');
        }
        $origin = self::origin($url);
        if ($origin === null) {
            return false;
        }
        $appUrl = config('app.url');
        foreach ([request()->getSchemeAndHttpHost(), is_string($appUrl) ? $appUrl : ''] as $site) {
            if ($site !== '' && self::origin($site) === $origin) {
                return true;
            }
        }

        return false;
    }

    /**
     * Where to send a visitor back to: the previous page (`url()->previous()`)
     * when it's on this site (isLocal()), else $fallback.
     */
    public static function previous(string $fallback = '/'): string
    {
        $previous = url()->previous();

        return self::isLocal($previous) ? $previous : $fallback;
    }

    /** scheme://host:port of an absolute http(s) URL without user info, lower-cased, with the port always given. */
    private static function origin(string $url): ?string
    {
        $parts = parse_url($url);
        if (! is_array($parts) || ! isset($parts['scheme'], $parts['host']) || isset($parts['user']) || isset($parts['pass'])) {
            return null;
        }
        $scheme = strtolower($parts['scheme']);
        if (! in_array($scheme, ['http', 'https'], true)) {
            return null;
        }

        return $scheme.'://'.strtolower($parts['host']).':'.($parts['port'] ?? ($scheme === 'https' ? 443 : 80));
    }

    /** A validation rule for link inputs. */
    public static function rule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            if (is_string($value) && ! self::isSafe($value)) {
                $fail(__('Use a web address (https://…), a path on this site (/about), mailto: or tel:.'));
            }
        };
    }
}
