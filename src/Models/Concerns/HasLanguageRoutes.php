<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models\Concerns;

use Sunrice\Cms\Support\Locales;

/**
 * A collection's or taxonomy's URL patterns in each language. The main
 * attributes (`route`, a collection's `listing_route`) are the main
 * language's; another language may have its own (`routes`:
 * {"id": {"route": "/buku/{slug}", "listing_route": "/buku"}}), else it
 * uses the main one under its prefix (/id/books/{slug}). The patterns a
 * language had before are kept (`previous_routes`), so their addresses
 * redirect to the new ones.
 *
 *     $books->setOwnRoute('id', '/buku/{slug}')->setOwnRoute('id', '/buku', 'listing_route')->save();
 *     $books->routeIn('id');                  // "/buku/{slug}"
 *     $books->routeIn('id', 'listing_route'); // "/buku"
 *
 * @property array<string, array<string, string>>|null $routes the other languages' own patterns
 * @property array<string, array<string, list<string>>>|null $previous_routes the patterns they had before
 *
 * @api
 */
trait HasLanguageRoutes
{
    /** How many earlier patterns of a language are kept, newest first. */
    public const PREVIOUS_ROUTES = 10;

    public static function bootHasLanguageRoutes(): void
    {
        // Whatever changes a language's pattern (the admin, an import, code): its old one is kept to redirect from.
        static::saving(function (self $model): void {
            if ($model->isDirty('routes') || $model->isDirty(static::routeAttributes())) {
                $model->keepPreviousRoutes();
            }
        });
    }

    /**
     * The attributes with a pattern: route, and a collection's listing_route.
     *
     * @return list<string>
     */
    public static function routeAttributes(): array
    {
        return ['route'];
    }

    /**
     * The pattern a language's addresses follow (null: the main
     * language's): its own, else the main one. Null when there are no such
     * pages (the main attribute is empty).
     */
    public function routeIn(?string $locale = null, string $attribute = 'route'): ?string
    {
        $main = $this->getAttribute($attribute);
        if (! is_string($main) || $main === '') {
            return null;
        }

        return $this->ownRoute($locale ?? Locales::default(), $attribute) ?? $main;
    }

    /** A language's own pattern, or null when it uses the main one. */
    public function ownRoute(string $locale, string $attribute = 'route'): ?string
    {
        if ($locale === Locales::default()) {
            return null;
        }
        $own = ($this->routes ?? [])[$locale][$attribute] ?? null;

        return is_string($own) && $own !== '' ? $own : null;
    }

    /** Gives a language its own pattern, or with null (or the main one) the main one again. Save to keep it. */
    public function setOwnRoute(string $locale, ?string $pattern, string $attribute = 'route'): static
    {
        $routes = $this->routes ?? [];
        $pattern = $pattern === null ? '' : trim($pattern);
        if ($pattern === '' || $pattern === $this->getAttribute($attribute)) {
            unset($routes[$locale][$attribute]);
        } else {
            $routes[$locale][$attribute] = $pattern;
        }
        $routes = array_filter($routes, fn (array $own): bool => $own !== []);
        $this->routes = $routes === [] ? null : $routes;

        return $this;
    }

    /**
     * The patterns a language had before, newest first: their addresses
     * redirect to the page's address now (Site::movedAddress()).
     *
     * @return list<string>
     */
    public function previousRoutes(string $locale, string $attribute = 'route'): array
    {
        return array_values(array_filter(($this->previous_routes ?? [])[$locale][$attribute] ?? [], fn (string $pattern): bool => $pattern !== ''));
    }

    /** A language's own patterns that change go to its previous ones (unless it follows that pattern again). */
    private function keepPreviousRoutes(): void
    {
        $before = $this->getOriginal('routes');
        $before = is_string($before) ? json_decode($before, true) : $before;
        $before = is_array($before) ? $before : [];
        $previous = $this->previous_routes ?? [];
        foreach (array_unique([...array_keys($before), ...array_keys($this->routes ?? [])]) as $locale) {
            if (! is_string($locale)) {
                continue;
            }
            foreach (static::routeAttributes() as $attribute) {
                $old = is_array($before[$locale] ?? null) ? ($before[$locale][$attribute] ?? null) : null;
                $now = $this->routeIn($locale, $attribute);
                $kept = array_values(array_filter($previous[$locale][$attribute] ?? [], fn (string $pattern): bool => $pattern !== $now));
                if (is_string($old) && $old !== '' && $old !== $now) {
                    $kept = array_slice(array_values(array_unique([$old, ...$kept])), 0, self::PREVIOUS_ROUTES);
                }
                if ($kept === []) {
                    unset($previous[$locale][$attribute]);
                } else {
                    $previous[$locale][$attribute] = $kept;
                }
            }
        }
        $previous = array_filter($previous, fn (array $patterns): bool => $patterns !== []);
        $this->previous_routes = $previous === [] ? null : $previous;
    }
}
