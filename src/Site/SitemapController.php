<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Response;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\SiteCache;

/**
 * /sitemap.xml: every live entry page, with its other languages, but
 * those that ask not to be indexed.
 *
 * @internal
 */
final class SitemapController
{
    /** Search engines read at most this many addresses from one sitemap. */
    public const LIMIT = 50000;

    private const OPEN = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];

    public function __invoke(): Response
    {
        // The whole site hidden from search engines: nothing to list.
        if (app(SiteSettings::class)->hidden()) {
            return response(implode("\n", self::OPEN).'</urlset>', 200, ['Content-Type' => 'application/xml; charset=UTF-8', 'X-Robots-Tag' => 'noindex']);
        }

        return response(app(SiteCache::class)->remember('sitemap:'.sha1(url('/')), fn (): string => $this->xml()), 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    private function xml(): string
    {
        $routed = Collection::query()->whereNotNull('route')->pluck('id');
        $translations = EntryTranslation::query()->live()->with('entry.collection', 'entry.translations')
            ->whereIn('collection_id', $routed)->orderBy('id')->limit(self::LIMIT)->get()
            ->reject(fn (EntryTranslation $translation): bool => Seo::noindex($translation));

        $xml = self::OPEN;
        foreach ($translations as $translation) {
            $url = $translation->url();
            if ($url === null) {
                continue;
            }
            $xml[] = '<url><loc>'.e($url).'</loc>';
            if ($translation->updated_at !== null) {
                $xml[] = '<lastmod>'.$translation->updated_at->toAtomString().'</lastmod>';
            }
            foreach (Seo::alternates($translation) as $locale => $alternate) {
                $xml[] = '<xhtml:link rel="alternate" hreflang="'.e(str_replace('_', '-', $locale)).'" href="'.e($alternate).'"/>';
            }
            $xml[] = '</url>';
        }
        // Term pages, but those that ask not to be indexed.
        $taxonomies = Taxonomy::query()->whereNotNull('route')->pluck('id');
        $terms = TermTranslation::query()->whereIn('taxonomy_id', $taxonomies)->whereHas('term', fn ($q) => $q->withoutTrashed())
            ->with('term.taxonomy', 'term.translations')->orderBy('id')->limit(self::LIMIT)->get();
        foreach ($terms as $term) {
            $seo = $term->data[Seo::KEY] ?? null;
            if ((is_array($seo) && ($seo['noindex'] ?? false) === true) || ($url = $term->url()) === null) {
                continue;
            }
            $xml[] = '<url><loc>'.e($url).'</loc></url>';
        }
        // Listing pages, in every language.
        foreach (Collection::query()->whereNotNull('listing_route')->orderBy('id')->get() as $collection) {
            foreach (Locales::all() as $locale) {
                $xml[] = '<url><loc>'.e((string) $collection->listingUrl($locale)).'</loc></url>';
            }
        }
        $xml[] = '</urlset>';

        return implode("\n", $xml);
    }
}
