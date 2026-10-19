<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Cms\Models\Entry;

/**
 * An entry came back from the trash (its published languages are live again).
 *
 * @api
 */
final class EntryRestored
{
    use Dispatchable;

    public function __construct(
        public readonly Entry $entry,
    ) {}
}
