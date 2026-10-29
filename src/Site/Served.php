<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\TermTranslation;

/**
 * What answers a path on the site before any redirect from it would, as
 * Site::served() finds it: an address without a language's prefix (sent
 * on to the main language's), the search page, a listing page, a
 * taxonomy's index page, or a live entry's or term's page (the homepage
 * at its own address too). SiteController::show() serves it; the
 * redirects screen warns that a redirect from it doesn't apply.
 *
 * @internal
 */
final readonly class Served
{
    public const UNPREFIXED = 'unprefixed';

    public const SEARCH = 'search';

    public const LISTING = 'listing';

    public const INDEX = 'index';

    public const ENTRY = 'entry';

    public const TERM = 'term';

    /**
     * @param  self::*  $kind
     * @param  string  $locale  the address's language
     */
    private function __construct(
        public string $kind,
        public string $locale,
        public ?Listing $listing = null,
        public ?TaxonomyIndex $index = null,
        public ?EntryTranslation $entry = null,
        public ?TermTranslation $term = null,
    ) {}

    public static function unprefixed(string $locale): self
    {
        return new self(self::UNPREFIXED, $locale);
    }

    public static function search(string $locale): self
    {
        return new self(self::SEARCH, $locale);
    }

    public static function listing(Listing $listing): self
    {
        return new self(self::LISTING, $listing->locale, listing: $listing);
    }

    public static function index(TaxonomyIndex $index): self
    {
        return new self(self::INDEX, $index->locale, index: $index);
    }

    /** @param  string  $locale  the address's: another than the page's when it stands in for a translation (Site::fallback()) */
    public static function page(EntryTranslation|TermTranslation $page, string $locale): self
    {
        return $page instanceof EntryTranslation ? new self(self::ENTRY, $locale, entry: $page) : new self(self::TERM, $locale, term: $page);
    }
}
