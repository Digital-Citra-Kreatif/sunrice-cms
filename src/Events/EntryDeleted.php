<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Cms\Models\Entry;

/**
 * An entry was deleted for good (the model is gone from the database).
 *
 * @api
 */
final class EntryDeleted
{
    use Dispatchable;

    public function __construct(
        public readonly Entry $entry,
    ) {}
}
