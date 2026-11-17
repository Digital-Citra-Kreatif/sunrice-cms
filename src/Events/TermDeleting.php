<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Term;

/**
 * A term is about to go to the trash with the terms under it (TrashTerm:
 * `$permanent` false) or be deleted for good (DeleteTerm: `$permanent`
 * true), after the CMS's own checks. A listener can stop it by throwing a
 * ValidationException (under "term"): nothing is changed.
 *
 * @api
 */
final class TermDeleting
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Term $term,
        public readonly bool $permanent,
    ) {
        $this->recordActor();
    }
}
