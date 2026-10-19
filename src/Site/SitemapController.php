<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Response;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Seo;

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

    public function __invoke(): Response
    {
        $routed = Collection::query()->whereNotNull('route')->pluck('id');
        $translations = EntryTranslation::query()->live()->with('entry.collection', 'entry.translations')
            ->whereIn('collection_id', $routed)->orderBy('id')->limit(self::LIMIT)->get()
            ->reject(fn (EntryTranslation $translation): bool => Seo::noindex($translation));

        $xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];
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
        $xml[] = '</urlset>';

        return response(implode("\n", $xml), 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }
}
