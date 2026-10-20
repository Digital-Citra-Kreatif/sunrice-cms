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
     * The fields whose related entries fill it, in order ("project").
     *
     * @return list<string>
     */
    public function parameters(): array
    {
        preg_match_all('#\{([a-z][a-z0-9_]*)\}#', $this->pattern, $matches);

        return array_values(array_filter($matches[1], fn (string $name): bool => $name !== 'slug'));
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
