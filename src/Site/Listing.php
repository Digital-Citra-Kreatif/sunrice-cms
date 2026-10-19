<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Models\Collection;

/**
 * A collection's listing page in a language, as Site::listing() finds it.
 *
 * @internal
 */
final readonly class Listing
{
    public function __construct(public Collection $collection, public string $locale) {}
}
