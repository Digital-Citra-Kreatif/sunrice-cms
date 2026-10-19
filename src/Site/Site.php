<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Locales;

/**
 * The public site: which entry a path shows, and entries' URLs. The main
 * language has no prefix; others start with their code (/id/blog/kopi).
 *
 * @api
 */
final class Site
{
    /** @var list<array{0: Collection|Taxonomy, 1: RoutePattern}>|null */
    private ?array $patterns = null;

    /** The homepage entry's id, once read (false: not read yet). */
    private int|false|null $homepage = false;

    /** The live entry translation at a path, or null. */
    public function find(string $path): ?EntryTranslation
    {
        $page = $this->match($path);

        return $page instanceof EntryTranslation ? $page : null;
    }

    /**
     * What's at a path: a live entry, a term's page, or nothing. The most
     * specific pattern that matches decides (collections before taxonomies
     * on a tie); there's no falling through to the next.
     */
    public function match(string $path): EntryTranslation|TermTranslation|null
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));
        if ($rest === '/') {
            return $this->homepage($locale);
        }
        foreach ($this->patterns() as [$model, $pattern]) {
            $slug = $pattern->match($rest);
            if ($slug === null) {
                continue;
            }
            if ($model instanceof Collection) {
                return EntryTranslation::query()->live()->with('entry.collection')
                    ->where('collection_id', $model->id)->where('locale', $locale)->where('slug', $slug)->first();
            }

            return TermTranslation::query()->with('term.taxonomy', 'term.translations')
                ->where('taxonomy_id', $model->id)->where('locale', $locale)->where('slug', $slug)
                ->whereHas('term', fn ($q) => $q->withoutTrashed())->first();
        }

        return null;
    }

    /** The URL of a term's page in its language, or null when its taxonomy has no pages. */
    public function termUrl(TermTranslation $translation): ?string
    {
        $route = $translation->term->taxonomy->route;
        if ($route === null || $translation->term->trashed()) {
            return null;
        }

        return url(($translation->locale === Locales::default() ? '' : '/'.$translation->locale).(new RoutePattern($route))->path($translation->slug));
    }

    /** The homepage (Settings → Site) in a language, when it's live there. */
    public function homepage(?string $locale = null): ?EntryTranslation
    {
        $id = $this->homepageId();

        return $id === null ? null : EntryTranslation::query()->live()->with('entry.collection')
            ->where('entry_id', $id)->where('locale', $locale ?? Locales::default())->first();
    }

    /** The collection whose listing page is at a path, and the language. */
    public function listing(string $path): ?Listing
    {
        [$locale, $rest] = $this->splitLocale('/'.trim($path, '/'));
        $collection = $rest === '/' ? null : Collection::query()->where('listing_route', $rest)->first();

        return $collection === null ? null : new Listing($collection, $locale);
    }

    /** The URL of an entry translation's live page, or null when its collection has no route. */
    public function url(EntryTranslation $translation): ?string
    {
        $path = $this->path($translation, $translation->slug);

        return $path === null ? null : url($path);
    }

    /** The path of an entry translation with a slug (/id/blog/halo), or null without a route. */
    public function path(EntryTranslation $translation, ?string $slug): ?string
    {
        $route = $translation->entry->collection->route;
        if ($route === null || $slug === null) {
            return null;
        }
        $prefix = $translation->locale === Locales::default() ? '' : '/'.$translation->locale;
        if ($translation->entry_id === $this->homepageId()) {
            return $prefix === '' ? '/' : $prefix;
        }

        return $prefix.(new RoutePattern($route))->path($slug);
    }

    /** Where an old address moved, if it did. */
    public function redirect(string $path): ?Redirect
    {
        return Redirect::query()->where('from_path', Redirect::normalizePath($path))->first();
    }

    /**
     * Records that a page moved: the old path redirects to the new one, a
     * redirect away from the new path goes, and chains are shortened.
     */
    public function moved(string $from, string $to): void
    {
        $from = Redirect::normalizePath($from);
        $to = Redirect::normalizePath($to);
        if ($from === $to) {
            return;
        }
        Redirect::query()->where('from_path', $to)->delete();
        Redirect::query()->where('to_url', $from)->update(['to_url' => $to]);
        Redirect::query()->updateOrCreate(['from_path' => $from], ['to_url' => $to, 'status' => 301]);
    }

    /** The path a page has besides the one it's served at (the homepage's own address), to redirect from. */
    public function ownPath(EntryTranslation $translation): ?string
    {
        $route = $translation->entry->collection->route;
        if ($route === null || $translation->slug === null) {
            return null;
        }

        return ($translation->locale === Locales::default() ? '' : '/'.$translation->locale).(new RoutePattern($route))->path($translation->slug);
    }

    /** Forget the collections loaded, after one changed. */
    public function flush(): void
    {
        $this->patterns = null;
        $this->homepage = false;
    }

    private function homepageId(): ?int
    {
        if ($this->homepage === false) {
            $this->homepage = app(SiteSettings::class)->homepage;
        }

        return $this->homepage;
    }

    /** @return array{0: string, 1: string} the language and the path without its prefix */
    private function splitLocale(string $path): array
    {
        foreach (Locales::all() as $locale) {
            if ($locale !== Locales::default() && ($path === "/{$locale}" || str_starts_with($path, "/{$locale}/"))) {
                return [$locale, substr($path, strlen($locale) + 1) ?: '/'];
            }
        }

        return [Locales::default(), $path];
    }

    /** @return list<array{0: Collection|Taxonomy, 1: RoutePattern}> collections' and taxonomies' patterns, most specific first */
    private function patterns(): array
    {
        if ($this->patterns === null) {
            $patterns = [];
            foreach (Collection::query()->whereNotNull('route')->orderBy('id')->get() as $collection) {
                $patterns[] = [$collection, new RoutePattern((string) $collection->route)];
            }
            foreach (Taxonomy::query()->whereNotNull('route')->orderBy('id')->get() as $taxonomy) {
                $patterns[] = [$taxonomy, new RoutePattern((string) $taxonomy->route)];
            }
            // usort keeps the order of equals: collections before taxonomies, then oldest first.
            usort($patterns, fn (array $a, array $b): int => $b[1]->specificity() <=> $a[1]->specificity());
            $this->patterns = $patterns;
        }

        return $this->patterns;
    }
}
