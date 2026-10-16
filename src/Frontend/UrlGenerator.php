<?php

declare(strict_types=1);

namespace Sunrice\Frontend;

use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Setting;
use Sunrice\Models\Term;
use Sunrice\Support\Locales;

/**
 * Builds public URLs for entries, collection archives and terms.
 * Main-language URLs have no prefix; other languages use /{locale}.
 * A language URL uses the translated slug when that translation is
 * Ready, else the main-language slug.
 */
class UrlGenerator
{
    public function entry(Entry $entry, ?string $locale = null): string
    {
        $locale ??= Locales::current();
        $collection = $entry->collection;

        // Homepage entry renders at the site root.
        if ((int) Setting::get('homepage_entry_id') === (int) $entry->id) {
            return Locales::prefix($locale) ?: '/';
        }

        return Locales::prefix($locale).$this->fillRoute($collection->entryRoute(), $entry, $locale, $this->slugPath($entry, $locale));
    }

    /**
     * Puts the slug path and each linked entry's slug into the route:
     * '/projects/{project}/{slug}' → '/projects/tower-a/unit-1'. A
     * field that links to nothing fills its segment with '-'.
     */
    public function fillRoute(string $route, Entry $entry, string $locale, string $slugPath): string
    {
        foreach (Collection::parametersOf($route) as $field) {
            $route = str_replace('{'.$field.'}', $this->linkedSlug($entry, $field, $locale), $route);
        }

        return str_replace('{slug}', $slugPath, $route);
    }

    /** Slug of the first entry the `entries` field $field links to. */
    protected function linkedSlug(Entry $entry, string $field, string $locale): string
    {
        // Relationships are shared by every language: read the main one.
        $ids = (array) ($entry->mainTranslation()?->data[$field] ?? []);
        $id = (int) (reset($ids) ?: 0);
        $linked = $id === 0 ? null : Entry::query()->with('translations')->find($id);
        $slug = $linked === null ? '' : $this->entrySlug($linked, $locale);

        return $slug === '' ? '-' : $slug;
    }

    /**
     * The entry's slug, after its parents' in a hierarchical collection:
     * 'about/team'.
     */
    public function slugPath(Entry $entry, string $locale, ?string $ownSlug = null): string
    {
        $slug = $ownSlug ?? $this->entrySlug($entry, $locale);
        if ($entry->parent_id === null || ! $entry->collection?->isHierarchical()) {
            return $slug;
        }

        $parents = array_map(fn (Entry $parent) => $this->entrySlug($parent, $locale), $entry->ancestors());

        return implode('/', [...$parents, $slug]);
    }

    /**
     * The entry's public URL, or null when its collection has no single
     * pages ("Each entry has its own page" off): such entries are data
     * for templates, not pages. The homepage entry always has one.
     */
    public function entryUrl(Entry $entry, ?string $locale = null): ?string
    {
        $isHomepage = (int) Setting::get('homepage_entry_id') === (int) $entry->id;
        if (! $isHomepage && $entry->collection !== null && ! $entry->collection->hasSinglePages()) {
            return null;
        }

        return $this->entry($entry, $locale);
    }

    /**
     * The page address of one translation, with its own slug even when
     * it isn't Ready yet (a signed-in editor can open it as a draft).
     * Null when the collection's entries have no page of their own.
     */
    public function translationUrl(Entry $entry, EntryTranslation $translation): ?string
    {
        $isHomepage = (int) Setting::get('homepage_entry_id') === (int) $entry->id;
        if ($isHomepage) {
            return Locales::prefix($translation->locale) ?: '/';
        }
        if ($entry->collection === null || ! $entry->collection->hasSinglePages()) {
            return null;
        }

        return Locales::prefix($translation->locale).$this->fillRoute($entry->collection->entryRoute(), $entry, $translation->locale, $this->slugPath($entry, $translation->locale, $translation->slug));
    }

    public function entrySlug(Entry $entry, string $locale): string
    {
        if (! Locales::isMain($locale)) {
            $translation = $entry->translation($locale);
            if ($translation?->is_ready) {
                return $translation->slug;
            }
        }

        $main = $entry->mainTranslation();

        return $main === null ? '' : $main->slug;
    }

    public function archive(Collection $collection, ?string $locale = null): string
    {
        $locale ??= Locales::current();

        return Locales::prefix($locale).$collection->setting('archive_route', '/'.$collection->handle);
    }

    /**
     * Term archive URL; with a collection, the archive listing that
     * collection's entries (when the taxonomy has per-collection pages).
     */
    public function term(Term $term, ?string $locale = null, ?Collection $collection = null): string
    {
        $locale ??= Locales::current();
        $route = $term->taxonomy->termRoute($collection);

        $main = $term->mainTranslation();
        $slug = $main === null ? '' : $main->slug;
        if (! Locales::isMain($locale)) {
            $translation = $term->readyTranslation($locale);
            if ($translation !== null) {
                $slug = $translation->slug;
            }
        }

        return Locales::prefix($locale).str_replace('{slug}', $slug, $route);
    }

    /**
     * Locale => URL map for the current page (language switchers): an
     * entry, a term (with the collection of a per-collection term page),
     * or, with neither, the current frontend path (archives) in each
     * language.
     *
     * @return array<string, string>
     */
    public function localeUrls(Entry|Term|null $page = null, ?Collection $collection = null): array
    {
        $urls = [];

        if ($page instanceof Entry) {
            foreach (Locales::available() as $locale) {
                $url = $this->entryUrl($page, $locale);
                if ($url !== null) {
                    $urls[$locale] = $url;
                }
            }

            return $urls;
        }

        if ($page instanceof Term) {
            foreach (Locales::available() as $locale) {
                $urls[$locale] = $this->term($page, $locale, $collection);
            }

            return $urls;
        }

        $request = request();
        if (! $request->attributes->has('sunrice.path')) {
            return [];
        }
        $path = trim((string) $request->attributes->get('sunrice.path'), '/');
        foreach (Locales::available() as $locale) {
            $url = Locales::prefix($locale).($path === '' ? '' : '/'.$path);
            $urls[$locale] = $url === '' ? '/' : $url;
        }

        return $urls;
    }
}
