<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

/**
 * The languages content is written in (config sunrice-cms.locales), the
 * first being the main one.
 *
 * @api
 */
final class Locales
{
    /** @return non-empty-list<string> */
    public static function all(): array
    {
        $locales = array_values(array_filter((array) config('sunrice-cms.locales', []), is_string(...)));

        return $locales === [] ? [self::fallback()] : $locales;
    }

    public static function default(): string
    {
        return self::all()[0];
    }

    public static function has(string $locale): bool
    {
        return in_array($locale, self::all(), true);
    }

    private static function fallback(): string
    {
        $locale = config('app.locale');

        return is_string($locale) && $locale !== '' ? $locale : 'en';
    }
}
