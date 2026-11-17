<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Entry;

/**
 * An entry is about to go to the trash (TrashEntry: `$permanent` false)
 * or be deleted for good (ForceDeleteEntry: `$permanent` true), after the
 * CMS's own checks. A listener can stop it by throwing a
 * ValidationException (under "entry"): nothing is changed.
 *
 * @api
 */
final class EntryDeleting
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Entry $entry,
        public readonly bool $permanent,
    ) {
        $this->recordActor();
    }
}
