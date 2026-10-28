<?php

declare(strict_types=1);

namespace Sunrice\Cms\Templates;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;

/**
 * A kind of site page a template can be made for, and the file the site
 * picks for it (TemplateLookup): a collection's entry or listing page, a
 * taxonomy's shared term or index page, or a taxonomy's term or index
 * page in a collection.
 *
 * @internal
 */
final readonly class TemplatePage
{
    public const ENTRY = 'entry';

    public const LISTING = 'listing';

    public const TERM = 'term';

    public const INDEX = 'index';

    /**
     * @param  string  $kind  ENTRY, LISTING, TERM or INDEX
     * @param  string  $url  its URL (pattern) in the main language
     * @param  string  $path  the file, under resources/views/cms
     * @param  Collection|null  $collection  the collection whose page it is (null: a taxonomy's shared page)
     * @param  Taxonomy|null  $taxonomy  the taxonomy of a term or index page
     */
    public function __construct(
        public string $kind,
        public string $url,
        public string $path,
        public ?Collection $collection = null,
        public ?Taxonomy $taxonomy = null,
    ) {}

    /** "Entry page", "Tags term pages", … */
    public function name(): string
    {
        $in = $this->collection !== null && $this->taxonomy !== null ? FieldSnippet::plain($this->taxonomy->title).' ' : '';

        return match ($this->kind) {
            self::ENTRY => 'Entry page',
            self::LISTING => 'Listing page',
            self::TERM => $in === '' ? 'Term pages' : $in.'term pages',
            default => $in === '' ? 'Index page' : $in.'index page',
        };
    }

    /** "Entry page (/books/{slug})" */
    public function label(): string
    {
        return $this->name().' ('.$this->url.')';
    }
}
