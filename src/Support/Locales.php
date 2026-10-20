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

    /**
     * What the language's addresses start with: by default "" for the main
     * one and "/id" for the others; Settings → Languages (or config
     * sunrice-cms.locale_prefixes) can give any of them another, the main
     * one too ("/en").
     */
    public static function prefix(string $locale): string
    {
        $segment = self::segments()[$locale] ?? $locale;

        return $segment === '' ? '' : '/'.$segment;
    }

    /**
     * Each language's first address segment: '' for the one at the plain
     * addresses (the main one, unless it has its own).
     *
     * @return array<string, string>
     */
    public static function segments(): array
    {
        $set = app(LocaleSettings::class)->locales() !== [] ? app(LocaleSettings::class)->prefixes() : config('sunrice-cms.locale_prefixes', []);

        return self::segmentsFor(self::all(), is_array($set) ? $set : []);
    }

    /**
     * The segments of these languages (the main one first), from the ones
     * set: a set one as it is, else '' for the main one and the code for
     * the others.
     *
     * @param  list<string>  $codes
     * @param  array<mixed>  $set
     * @return array<string, string>
     */
    public static function segmentsFor(array $codes, array $set): array
    {
        $segments = [];
        foreach ($codes as $index => $code) {
            $own = $set[$code] ?? null;
            $segments[$code] = is_string($own) && trim($own, '/ ') !== '' ? trim($own, '/ ') : ($index === 0 ? '' : $code);
        }

        return $segments;
    }

    /**
     * The language of a path and the path without its prefix:
     * ['id', '/about'] for "/id/about". A path with no language's prefix
     * belongs to the language at the plain addresses; when every language
     * has a prefix, it's the main one's, and the third value is false.
     *
     * @param  array<string, string>|null  $segments  for other segments than the current ones (Locales::segmentsFor())
     * @return array{0: string, 1: string, 2: bool}
     */
    public static function split(string $path, ?array $segments = null): array
    {
        $path = '/'.trim($path, '/');
        $segments ??= self::segments();
        $prefixed = array_filter($segments, fn (string $segment): bool => $segment !== '');
        // Longest first: "/pt-br" before "/pt".
        uasort($prefixed, fn (string $a, string $b): int => strlen($b) <=> strlen($a));
        foreach ($prefixed as $code => $segment) {
            if ($path === "/{$segment}" || str_starts_with($path, "/{$segment}/")) {
                return [$code, substr($path, strlen($segment) + 1) ?: '/', true];
            }
        }
        $root = array_search('', $segments, true);

        return is_string($root) ? [$root, $path, true] : [array_key_first($segments) ?? self::default(), $path, false];
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
