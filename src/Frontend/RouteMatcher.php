<?php

declare(strict_types=1);

namespace Sunrice\Frontend;

use Illuminate\Support\Facades\Cache;
use Sunrice\Cache\ContentCache;
use Sunrice\Cache\ContentVersion;
use Sunrice\Models\Collection;
use Sunrice\Models\Taxonomy;

/**
 * Compiles every collection's `route` / `archive_route` and every
 * taxonomy's `route` setting into regexes (memoized per request) and
 * matches a stripped frontend path against them.
 */
class RouteMatcher
{
    /** @var array<int, array{regex: string, match: RouteMatch}>|null */
    protected static ?array $compiled = null;

    /**
     * RouteMatch a locale-stripped path (e.g. 'blog/hello') to a route.
     */
    public function match(string $path): ?RouteMatch
    {
        $path = '/'.trim($path, '/');

        foreach ($this->compiled() as ['regex' => $regex, 'match' => $match]) {
            if (preg_match($regex, $path, $m)) {
                return new RouteMatch(
                    type: $match->type,
                    collection: $match->collection,
                    taxonomy: $match->taxonomy,
                    slug: $m['slug'] ?? $match->slug,
                );
            }
        }

        return null;
    }

    /** Forget the per-request memoization (mainly for tests/long runs). */
    public static function flush(bool $keepCache = false): void
    {
        static::$compiled = null;
        if ($keepCache) {
            return;
        }
        Cache::store(config('sunrice.cache.store'))->forget(
            'sunrice:'.ContentVersion::current().':shared:routematcher'
        );
    }

    /** @return array<int, array{regex: string, match: RouteMatch}> */
    protected function compiled(): array
    {
        return static::$compiled ??= $this->compile();
    }

    /**
     * The cache holds plain arrays (ids, not models): sites may refuse to
     * unserialize objects from the cache (cache.serializable_classes).
     *
     * @return array<int, array{regex: string, match: RouteMatch}>
     */
    protected function compile(): array
    {
        $routes = ContentCache::remember('routematcher', fn () => array_map(fn (array $r) => [
            'regex' => $r['regex'],
            'type' => $r['match']->type,
            'collection' => $r['match']->collection?->id,
            'taxonomy' => $r['match']->taxonomy?->id,
            'slug' => $r['match']->slug,
        ], $this->buildRoutes()), 'shared');

        $collections = Collection::query()->whereKey(array_filter(array_column($routes, 'collection')))->get()->keyBy('id');
        $taxonomies = Taxonomy::query()->whereKey(array_filter(array_column($routes, 'taxonomy')))->get()->keyBy('id');

        return array_map(fn (array $r) => [
            'regex' => $r['regex'],
            'match' => new RouteMatch(
                type: $r['type'],
                collection: $r['collection'] === null ? null : $collections->get($r['collection']),
                taxonomy: $r['taxonomy'] === null ? null : $taxonomies->get($r['taxonomy']),
                slug: $r['slug'],
            ),
        ], $routes);
    }

    /** @return array<int, array{regex: string, match: RouteMatch}> */
    protected function buildRoutes(): array
    {
        $routes = [];

        Collection::query()->get()->each(function (Collection $collection) use (&$routes): void {
            if ($collection->setting('has_single', true)) {
                $route = $collection->entryRoute();
                // Hierarchical: the slug is a path of parent slugs ('about/team').
                $routes[] = $this->route($route, new RouteMatch('entry', collection: $collection), nested: $collection->isHierarchical());
            }
            if ($collection->setting('has_archive')) {
                $route = (string) $collection->setting('archive_route', '/'.$collection->handle);
                $routes[] = $this->route($route, new RouteMatch('archive', collection: $collection));
            }
        });

        Taxonomy::query()->with('collections')->get()->each(function (Taxonomy $taxonomy) use (&$routes): void {
            if ($taxonomy->setting('has_archive')) {
                foreach ($taxonomy->termRoutes() as $termRoute) {
                    $routes[] = $this->route($termRoute['route'], new RouteMatch('term', collection: $termRoute['collection'], taxonomy: $taxonomy));
                }
            }
        });

        // Most specific first: fixed paths ('/blog') before patterns
        // ('/{slug}'), then more literal characters before fewer, so a
        // root-level collection doesn't swallow other archives and terms.
        usort($routes, fn (array $a, array $b) => [$a['dynamic'], -$a['literal']] <=> [$b['dynamic'], -$b['literal']]);

        return array_map(fn (array $r) => ['regex' => $r['regex'], 'match' => $r['match']], $routes);
    }

    /** @return array{regex: string, match: RouteMatch, dynamic: bool, literal: int} */
    protected function route(string $pattern, RouteMatch $match, bool $nested = false): array
    {
        $pattern = '/'.trim($pattern, '/');
        $placeholder = '#\{[a-z][a-z0-9_]*\}#';
        $parts = preg_split('#(\{[a-z][a-z0-9_]*\})#', $pattern, -1, PREG_SPLIT_DELIM_CAPTURE) ?: [$pattern];
        $regex = '#^'.implode('', array_map(fn (string $part) => match (true) {
            $part === '{slug}' => $nested ? '(?<slug>[^/]+(?:/[^/]+)*)' : '(?<slug>[^/]+)',
            // '{project}' segments take any slug; the entry page checks they're its own.
            preg_match($placeholder, $part) === 1 => '[^/]+',
            default => preg_quote($part, '#'),
        }, $parts)).'$#';

        return [
            'regex' => $regex,
            'match' => $match,
            'dynamic' => preg_match($placeholder, $pattern) === 1,
            'literal' => strlen((string) preg_replace($placeholder, '', $pattern)),
        ];
    }
}
