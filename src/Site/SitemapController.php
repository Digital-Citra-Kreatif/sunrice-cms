<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Response;
use Sunrice\Cms\Settings\SiteSettings;

/**
 * /sitemap.xml: every live page (see Sitemap), or, past 50,000 of them,
 * an index of /sitemap-{n}.xml files.
 *
 * @internal
 */
final class SitemapController
{
    public function __invoke(Sitemap $sitemap): Response
    {
        if (app(SiteSettings::class)->hidden()) {
            return self::hidden();
        }

        return self::xml($sitemap->count() === 1 ? (string) $sitemap->part(1) : $sitemap->index());
    }

    public function part(Sitemap $sitemap, string $part): Response
    {
        if (app(SiteSettings::class)->hidden()) {
            return self::hidden();
        }
        $xml = $sitemap->part((int) $part);
        abort_if($xml === null, 404);

        return self::xml($xml);
    }

    private static function xml(string $xml): Response
    {
        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    /** The whole site hidden from search engines: nothing to list. */
    private static function hidden(): Response
    {
        return self::xml(Sitemap::empty())->header('X-Robots-Tag', 'noindex');
    }
}
