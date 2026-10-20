<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Sunrice\Cms\Settings\LocaleSettings;

/**
 * The languages content is written in, the first being the main one:
 * Settings → Languages (LocaleSettings) once saved there, else config
 * sunrice-cms.locales (names from sunrice-cms.locale_names).
 *
 * @api
 */
final class Locales
{
    /** @return non-empty-list<string> */
    public static function all(): array
    {
        return array_keys(self::names());
    }

    public static function default(): string
    {
        return self::all()[0];
    }

    /** The language of the page being shown: the app's locale when it is a content language, else the main one. */
    public static function current(): string
    {
        $locale = app()->getLocale();

        return self::has($locale) ? $locale : self::default();
    }

    public static function has(string $locale): bool
    {
        return array_key_exists($locale, self::names());
    }

    /**
     * The content languages by code, with their names, the main one first.
     *
     * @return non-empty-array<string, string>
     */
    public static function names(): array
    {
        $set = app(LocaleSettings::class)->locales();
        if ($set !== []) {
            return $set;
        }

        $names = config('sunrice-cms.locale_names', []);
        $locales = [];
        foreach ((array) config('sunrice-cms.locales', []) as $code) {
            if (is_string($code) && $code !== '') {
                $name = is_array($names) ? ($names[$code] ?? null) : null;
                $locales[$code] = is_string($name) && $name !== '' ? $name : self::displayName($code);
            }
        }

        return $locales === [] ? [self::fallback() => self::displayName(self::fallback())] : $locales;
    }

    /** A content language's name ("id" → "Indonesian", or as set); any other code as it is. */
    public static function name(string $locale): string
    {
        return self::names()[$locale] ?? $locale;
    }

    /** What the language's addresses start with: "" for the main one, "/id" for the others. */
    public static function prefix(string $locale): string
    {
        return $locale === self::default() ? '' : '/'.$locale;
    }

    /** A language's English name from its code, when PHP's intl extension knows it; else the code. */
    public static function displayName(string $code): string
    {
        if (! class_exists(\Locale::class)) {
            return $code;
        }

        return \Locale::getDisplayName(str_replace('-', '_', $code), 'en') ?: $code;
    }

    private static function fallback(): string
    {
        $locale = config('app.locale');

        return is_string($locale) && $locale !== '' ? $locale : 'en';
    }
}
