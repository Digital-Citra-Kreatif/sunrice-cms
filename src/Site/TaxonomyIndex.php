<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;

/**
 * A taxonomy's index page in a language, as Site::taxonomyIndex() finds
 * it: the shared one (collection null) or a collection's.
 *
 * @internal
 */
final readonly class TaxonomyIndex
{
    public function __construct(public Taxonomy $taxonomy, public ?Collection $collection, public string $locale) {}
}
