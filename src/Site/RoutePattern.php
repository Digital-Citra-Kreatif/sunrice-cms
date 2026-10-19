<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

/**
 * A collection's route pattern ("/blog/{slug}"): checks it, matches paths
 * against it and builds URLs from it.
 *
 * @internal
 */
final class RoutePattern
{
    /** A path of lowercase segments with {slug} once, like /blog/{slug} or /{slug}. */
    public const FORMAT = '#^(/[a-z0-9\-_]+)*/\{slug\}(/[a-z0-9\-_]+)*$#';

    public function __construct(public readonly string $pattern) {}

    public static function isValid(string $pattern): bool
    {
        return preg_match(self::FORMAT, $pattern) === 1;
    }

    /** The slug in a path ("/blog/hello" → "hello"), or null when it doesn't match. */
    public function match(string $path): ?string
    {
        $regex = '#^'.str_replace('\{slug\}', '([a-z0-9]+(?:-[a-z0-9]+)*)', preg_quote($this->pattern, '#')).'$#';

        return preg_match($regex, $path, $matches) === 1 ? $matches[1] : null;
    }

    public function path(string $slug): string
    {
        return str_replace('{slug}', $slug, $this->pattern);
    }

    /** How specific it is: the fixed characters. More specific patterns are tried first. */
    public function specificity(): int
    {
        return strlen(str_replace('{slug}', '', $this->pattern));
    }
}
