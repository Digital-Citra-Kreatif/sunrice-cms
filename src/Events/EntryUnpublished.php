<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * An entry translation was taken off the site (back to a draft).
 *
 * @api
 */
final class EntryUnpublished
{
    use Dispatchable;

    public function __construct(
        public readonly EntryTranslation $translation,
    ) {}
}
