<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Routing\Router;
use Sunrice\Admin\Resources\Forms\Link;
use Sunrice\Admin\Resources\Forms\Warning;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Site\Served;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\AdminUrls;
use Sunrice\Cms\Support\Locales;
use WeakMap;

/**
 * What answers a redirect's addresses before it would: the app's own
 * routes, and on the site whatever Site::served() finds there (a live
 * page always wins over a redirect from its address). Structure →
 * Redirects says so under From on the edit form (warning()) and marks
 * such redirects in the list (badge(), worked out for the whole page at
 * once). A wildcard isn't checked: it takes only the addresses under its
 * path, where whatever is live keeps its own anyway.
 *
 * @internal
 */
final class RedirectShadows
{
    public const PAGE = 'Shadowed by a live page';

    public const ROUTE = 'Shadowed by an app route';

    public const PREFIX = 'Needs a language prefix';

    /** @var WeakMap<Redirect, RedirectShadowsPage>|null each listed redirect's page of the list */
    private static ?WeakMap $pages = null;

    /**
     * The addresses a redirect takes as they are: its From, and with
     * In every language that path in each language (an address without
     * any prefix only when one language has none: else it's sent on to
     * the main language's before any redirect, and the redirect takes
     * that one). None for a wildcard.
     *
     * @return list<string>
     */
    public static function paths(Redirect $redirect): array
    {
        if ($redirect->isWildcard()) {
            return [];
        }
        $from = Redirect::normalizePath($redirect->from_path);
        if (! $redirect->every_language) {
            return [$from];
        }
        [, $rest] = Locales::split($from);

        return array_values(array_unique(array_map(fn (string $locale): string => Redirect::normalizePath(Locales::prefix($locale).$rest), Locales::all())));
    }

    /** What the edit form says under From for the redirect as saved, or null when nothing is in its way. */
    public static function warning(Redirect $redirect, ?Authorizable $user): ?Warning
    {
        $site = app(Site::class);
        $lines = [];
        $links = [];
        foreach (self::paths($redirect) as $path) {
            if (self::appRoute($path) !== null) {
                $lines[] = __("Your app's own route :path answers this address first.", ['path' => $path]);

                continue;
            }
            $served = $site->served($path);
            if ($served === null) {
                continue;
            }
            $lines[] = self::describe($served, $path);
            $link = self::link($served, $user);
            if ($link !== null) {
                $links[$link[0]] = Link::make($link[1], $link[0]);
            }
        }
        $lines = array_values(array_unique($lines));

        return $lines === [] ? null : Warning::make(implode("\n", $lines))->links(array_values($links));
    }

    /**
     * Remembers the redirects of a list's page together, so the first
     * badge() works out all of theirs at once.
     *
     * @param  iterable<mixed>  $redirects
     */
    public static function listed(iterable $redirects): void
    {
        $page = new RedirectShadowsPage;
        self::$pages ??= new WeakMap;
        foreach ($redirects as $redirect) {
            if ($redirect instanceof Redirect) {
                $page->paths[$redirect->id] = self::paths($redirect);
                self::$pages[$redirect] = $page;
            }
        }
    }

    /** The list's badge for a redirect (said in the panel's language) whose address something else answers first, or null. */
    public static function badge(Redirect $redirect): ?string
    {
        $page = self::$pages?->offsetExists($redirect) === true ? self::$pages[$redirect] : null;
        if ($page === null) {
            $page = new RedirectShadowsPage;
            $page->paths[$redirect->id] = self::paths($redirect);
        }
        $page->badges ??= self::badges($page->paths);

        $said = match ($page->badges[$redirect->id] ?? null) {
            self::PAGE => __('Shadowed by a live page'),
            self::ROUTE => __('Shadowed by an app route'),
            self::PREFIX => __('Needs a language prefix'),
            default => null,
        };

        return is_string($said) ? $said : null;
    }

    /**
     * The badges of redirects by id, from their addresses: one look at the
     * routes per address and Site::servedAll() for all of them.
     *
     * @param  array<int, list<string>>  $paths
     * @return array<int, string|null>
     */
    private static function badges(array $paths): array
    {
        $routes = [];
        foreach (array_unique(array_merge([], ...array_values($paths))) as $path) {
            $routes[$path] = self::appRoute($path) !== null;
        }
        $served = app(Site::class)->servedAll(array_keys(array_filter($routes, fn (bool $route): bool => ! $route)));
        $badges = [];
        foreach ($paths as $id => $at) {
            $badges[$id] = null;
            foreach ($at as $path) {
                $badges[$id] = match (true) {
                    $routes[$path] => self::ROUTE,
                    ! isset($served[$path]) => null,
                    $served[$path]->kind === Served::UNPREFIXED => self::PREFIX,
                    default => self::PAGE,
                };
                if ($badges[$id] !== null) {
                    break;
                }
            }
        }

        return $badges;
    }

    /** The app's own route that answers GET at a path before the site's pages (not the CMS's homepage or fallback), if any. */
    public static function appRoute(string $path): ?Route
    {
        $request = Request::create($path, 'GET');
        // Matched as the router would, without binding the route to this request (the current one may be among them).
        foreach (app(Router::class)->getRoutes()->get('GET') as $route) {
            if (! $route->isFallback && ! in_array($route->getName(), ['sunrice.cms.home', 'sunrice.cms.page'], true) && $route->matches($request)) {
                return $route;
            }
        }

        return null;
    }

    private static function describe(Served $served, string $path): string
    {
        $entry = $served->entry;
        if ($entry !== null) {
            $site = app(Site::class);
            $what = ['title' => $entry->title, 'collection' => $entry->entry->collection->title, 'path' => $path];
            if ($site->isHomepage($entry) && $entry->locale === $served->locale && $site->ownPath($entry) === $path) {
                return __('This is the own address of the homepage, ":title" (:collection), which sends visitors to :to before any redirect.', [...$what, 'to' => $site->path($entry, $entry->slug) ?? '/']);
            }
            if ($site->isHomepage($entry)) {
                return __('":title" (:collection) is the homepage, at :path, and a live page wins over a redirect: this redirect applies only once another page is the homepage, or none is.', $what);
            }

            return __('":title" (:collection) is live at :path, and a live page wins over a redirect: this redirect applies only once that page is unpublished, moved to the trash or given another slug.', $what);
        }
        if ($served->term !== null) {
            return __('":title" (:taxonomy) has its page at :path, and a live page wins over a redirect: this redirect applies only once that term is moved to the trash or given another slug.',
                ['title' => $served->term->title, 'taxonomy' => $served->term->term->taxonomy->title, 'path' => $path]);
        }
        if ($served->listing !== null) {
            return __(':path is the listing page of :collection, and a live page wins over a redirect: this redirect applies only once that listing page has another address, or none.',
                ['path' => $path, 'collection' => $served->listing->collection->title]);
        }
        if ($served->index !== null) {
            $index = $served->index;

            return $index->collection === null
                ? __(':path is the index page of :taxonomy, and a live page wins over a redirect: this redirect applies only once that index page has another address, or none.', ['path' => $path, 'taxonomy' => $index->taxonomy->title])
                : __(':path is the index page of :taxonomy in :collection, and a live page wins over a redirect: this redirect applies only once that index page has another address, or none.', ['path' => $path, 'taxonomy' => $index->taxonomy->title, 'collection' => $index->collection->title]);
        }
        if ($served->kind === Served::SEARCH) {
            return __(':path is the site search page, which wins over a redirect.', ['path' => $path]);
        }
        [, $rest] = Locales::split($path);
        $prefix = Locales::prefix(Locales::default());

        return __('Addresses without a language prefix go to the main language\'s (:to) before any redirect: start From with :prefix.', ['to' => $prefix.($rest === '/' ? '' : $rest), 'prefix' => $prefix]);
    }

    /**
     * The link to the editor of the entry or term at an address, for a user who may edit it there.
     *
     * @return array{0: string, 1: string}|null the address and the label
     */
    private static function link(Served $served, ?Authorizable $user): ?array
    {
        $entry = $served->entry;
        if ($entry !== null && Access::entries($user, 'update', $entry->entry->collection, $entry->entry, $entry->locale)) {
            $url = AdminUrls::entry($entry->entry, $entry->locale);

            return $url === null ? null : [$url, __('Edit ":title"', ['title' => $entry->title])];
        }
        $term = $served->term;
        if ($term !== null && Access::terms($user, 'update', $term->term->taxonomy)) {
            $url = AdminUrls::term($term->term, $term->locale);

            return $url === null ? null : [$url, __('Edit ":title"', ['title' => $term->title])];
        }

        return null;
    }
}
