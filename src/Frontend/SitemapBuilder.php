<?php

declare(strict_types=1);

namespace Sunrice\Frontend;

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Sunrice\Cache\ContentCache;
use Sunrice\Models\Collection;
use Sunrice\Models\Taxonomy;
use Sunrice\Support\Locales;

/**
 * sitemap.xml: published entries of collections with `has_single`,
 * archive pages and term archive pages — each entry once per locale
 * where the URL is that locale's or the main fallback (fallback URLs
 * for non-Ready locales are excluded), with lastmod.
 */
class SitemapBuilder
{
    public function render(): string
    {
        return ContentCache::remember('sitemap', fn (): string => $this->build());
    }

    protected function build(): string
    {
        $sitemap = Sitemap::create();
        $urls = app(UrlGenerator::class);

        // The whole site is hidden from search engines (Settings).
        if ((bool) config('sunrice.seo.noindex', false)) {
            return $sitemap->render();
        }

        Collection::query()->get()->each(function (Collection $collection) use ($sitemap, $urls): void {
            // Hidden from search engines in the collection's SEO defaults.
            if (static::hidden((array) $collection->setting('seo', []))) {
                return;
            }
            if ($collection->setting('has_archive')) {
                $listing = Collection::archiveByLocale($collection->archive_data);
                foreach (Locales::available() as $locale) {
                    if (static::hidden((array) ($listing[$locale]['seo'] ?? []))) {
                        continue;
                    }
                    $sitemap->add(Url::create(url($urls->archive($collection, $locale))));
                }
            }

            if (! $collection->setting('has_single', true)) {
                return;
            }

            // Streamed in chunks: a big site doesn't load every entry at once.
            $collection->entries()->published()->with('translations')->lazyById(200)
                ->each(function ($entry) use ($sitemap, $urls, $collection): void {
                    $entry->setRelation('collection', $collection);
                    foreach (Locales::available() as $locale) {
                        $resolved = $entry->translation($locale);
                        if (! Locales::isMain($locale) && ! $resolved?->is_ready) {
                            continue; // fallback URL — excluded from sitemap
                        }
                        if (static::hidden((array) ($resolved->seo ?? []))) {
                            continue; // hidden from search engines, or canonical elsewhere
                        }
                        $sitemap->add(
                            Url::create(url($urls->entry($entry, $locale)))
                                ->setLastModificationDate($entry->updated_at ?? now())
                        );
                    }
                });
        });

        Taxonomy::query()->get()->each(function (Taxonomy $taxonomy) use ($sitemap, $urls): void {
            if (! $taxonomy->setting('has_archive') || static::hidden((array) $taxonomy->setting('seo', []))) {
                return;
            }
            $routes = $taxonomy->termRoutes();
            $taxonomy->terms()->with('translations')->lazyById(200)->each(function ($term) use ($sitemap, $urls, $routes, $taxonomy): void {
                $term->setRelation('taxonomy', $taxonomy);
                foreach (Locales::available() as $locale) {
                    $resolved = $term->readyTranslation($locale);
                    if (! Locales::isMain($locale) && $resolved === null) {
                        continue;
                    }
                    if (static::hidden((array) ($resolved->seo ?? []))) {
                        continue;
                    }
                    foreach ($routes as $route) {
                        $sitemap->add(
                            Url::create(url($urls->term($term, $locale, $route['collection'])))
                                ->setLastModificationDate($term->updated_at ?? now())
                        );
                    }
                }
            });
        });

        return $sitemap->render();
    }

    /**
     * A page kept out of the sitemap: noindex, or a canonical URL that
     * points somewhere else.
     *
     * @param  array<string, mixed>  $seo
     */
    protected static function hidden(array $seo): bool
    {
        return (bool) ($seo['noindex'] ?? false) || ! empty($seo['canonical']);
    }
}
