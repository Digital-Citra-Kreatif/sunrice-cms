<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Term;

/**
 * A term went to the trash with the terms under it (`$permanent` false)
 * or was deleted for good (`$permanent` true: the model still holds its
 * attributes).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class TermDeleted implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Term $term,
        public readonly bool $permanent,
    ) {
        $this->recordActor();
    }
}
