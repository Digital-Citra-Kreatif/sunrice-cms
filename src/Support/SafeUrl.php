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

        // A path, ?query, #anchor or //host; a backslash would let browsers read "/\evil.com" as a host.
        return ! str_contains($clean, '\\');
    }

    /** A validation rule for link inputs. */
    public static function rule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            if (is_string($value) && ! self::isSafe($value)) {
                $fail('Use a web address (https://…), a path on this site (/about), mailto: or tel:.');
            }
        };
    }
}
