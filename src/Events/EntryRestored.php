<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Entry;

/**
 * An entry came back from the trash (its published languages are live again).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run). `$user` and `$source` say
 * who did it (RecordsActor).
 *
 * @api
 */
final class EntryRestored implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Entry $entry,
    ) {
        $this->recordActor();
    }
}
