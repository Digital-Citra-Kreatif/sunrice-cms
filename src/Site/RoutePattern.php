<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

/**
 * A collection's or taxonomy's route pattern ("/blog/{slug}"): checks it,
 * matches paths against it and builds URLs from it. A collection's may
 * also hold the slug of a related entry, named by a single-value
 * `entries` field: "/projects/{project}/{slug}".
 *
 * @internal
 */
final class RoutePattern
{
    /** A path of lowercase segments with {slug} once, like /blog/{slug} or /{slug}. */
    public const FORMAT = '#^(/[a-z0-9\-_]+)*/\{slug\}(/[a-z0-9\-_]+)*$#';

    /** The same, with {field} segments too (a field's handle), like /projects/{project}/{slug}. */
    private const WITH_PARAMETERS = '#^(/([a-z0-9\-_]+|\{[a-z][a-z0-9_]*\}))+$#';

    /** A slug in a URL. */
    private const SLUG = '[a-z0-9]+(?:-[a-z0-9]+)*';

    /** What fills a parameter that links to nothing: "/projects/-/unit-1". */
    public const NONE = '-';

    /** The words in braces that never name a field: {slug}, and {handle}, written in when a pattern is saved (withHandle()). */
    public const RESERVED = ['slug', 'handle'];

    /** @var list<string>|null parameters(), once read */
    private ?array $parameters = null;

    public function __construct(public readonly string $pattern) {}

    /** Whether it's a valid pattern: {slug} once, and with $parameters also {field} segments, each once. */
    public static function isValid(string $pattern, bool $parameters = false): bool
    {
        if (! $parameters) {
            return preg_match(self::FORMAT, $pattern) === 1;
        }
        if (preg_match(self::WITH_PARAMETERS, $pattern) !== 1 || substr_count($pattern, '{slug}') !== 1) {
            return false;
        }
        $names = (new self($pattern))->parameters();

        return count($names) === count(array_unique($names));
    }

    /**
     * The pattern as it's stored: {handle} replaced with the handle of the
     * collection or taxonomy it's saved for, and in a taxonomy's pattern
     * in a collection, {listing} with that collection's listing page URL
     * ("{listing}/{handle}/{slug}" → "/books/tags/{slug}"). With
     * $handleIsField (a blueprint made before {handle} was kept, whose
     * Entries field is named handle), {handle} is that field, as it was.
     */
    public static function withHandle(string $pattern, string $handle, ?string $listing = null, bool $handleIsField = false): string
    {
        if (! $handleIsField) {
            $pattern = str_replace('{handle}', $handle, $pattern);
        }

        return $listing === null ? $pattern : str_replace('{listing}', rtrim($listing, '/'), $pattern);
    }

    /**
     * What's wrong with a pattern, or null: the first problem found, as
     * [what, the segment or name]: 'slash' (not starting with one),
     * 'empty' (an empty part), 'segment' (a fixed part with other
     * characters), 'no-slug', 'slugs' ({slug} more than once), 'twice' (a
     * {field} more than once), 'braces' (a {name} where none may be: any
     * but {slug} without $parameters, any at all with $fixed).
     *
     * @return array{0: 'slash'|'empty'|'segment'|'no-slug'|'slugs'|'twice'|'braces', 1: string}|null
     */
    public static function problem(string $pattern, bool $parameters = false, bool $fixed = false): ?array
    {
        if (! str_starts_with($pattern, '/')) {
            return ['slash', ''];
        }
        $slugs = 0;
        $names = [];
        foreach (explode('/', substr($pattern, 1)) as $segment) {
            if ($segment === '') {
                return ['empty', ''];
            }
            if (preg_match('#^\{([a-z][a-z0-9_]*)\}$#', $segment, $m) === 1) {
                if ($fixed || ($m[1] !== 'slug' && ! $parameters)) {
                    return ['braces', $m[1]];
                }
                if ($m[1] === 'slug') {
                    $slugs++;
                } elseif (in_array($m[1], $names, true)) {
                    return ['twice', $m[1]];
                } else {
                    $names[] = $m[1];
                }
            } elseif (preg_match('#^[a-z0-9\-_]+$#', $segment) !== 1) {
                return ['segment', $segment];
            }
        }
        if ($fixed) {
            return null;
        }

        return match (true) {
            $slugs === 0 => ['no-slug', ''],
            $slugs > 1 => ['slugs', 'slug'],
            default => null,
        };
    }

    /**
     * The fields whose related entries fill it, in order ("project").
     *
     * @return list<string>
     */
    public function parameters(): array
    {
        if ($this->parameters === null) {
            preg_match_all('#\{([a-z][a-z0-9_]*)\}#', $this->pattern, $matches);
            $this->parameters = array_values(array_filter($matches[1], fn (string $name): bool => $name !== 'slug'));
        }

        return $this->parameters;
    }

    /**
     * The slug and parameters in a path ("/blog/hello" → slug "hello"), or
     * null when it doesn't match.
     *
     * @return array{slug: string, parameters: array<string, string>}|null
     */
    public function match(string $path): ?array
    {
        $regex = (string) preg_replace_callback('#\\\\\{([a-z][a-z0-9_]*)\\\\\}#', fn (array $m): string => $m[1] === 'slug'
            ? '(?<slug>'.self::SLUG.')'
            : '(?<p_'.$m[1].'>'.self::SLUG.'|'.preg_quote(self::NONE, '#').')', preg_quote($this->pattern, '#'));
        if (preg_match('#^'.$regex.'$#', $path, $matches) !== 1) {
            return null;
        }
        $parameters = [];
        foreach ($this->parameters() as $name) {
            $parameters[$name] = $matches['p_'.$name];
        }

        return ['slug' => $matches['slug'], 'parameters' => $parameters];
    }

    /** @param  array<string, string>  $parameters  the related entries' slugs by field */
    public function path(string $slug, array $parameters = []): string
    {
        $path = $this->pattern;
        foreach ($this->parameters() as $name) {
            $path = str_replace('{'.$name.'}', $parameters[$name] ?? self::NONE, $path);
        }

        return str_replace('{slug}', $slug, $path);
    }

    /** How specific it is: the fixed characters. More specific patterns are tried first. */
    public function specificity(): int
    {
        return strlen((string) preg_replace('#\{[a-z][a-z0-9_]*\}#', '', $this->pattern));
    }
}
