<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Cms\Models\Entry;

/**
 * An entry went to the trash, off the site in every language.
 *
 * @api
 */
final class EntryTrashed
{
    use Dispatchable;

    public function __construct(
        public readonly Entry $entry,
    ) {}
}
