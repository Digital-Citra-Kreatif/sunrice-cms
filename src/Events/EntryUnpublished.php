<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * An entry translation was taken off the site (back to a draft).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run). `$user` and `$source` say
 * who did it (RecordsActor).
 *
 * @api
 */
final class EntryUnpublished implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly EntryTranslation $translation,
    ) {
        $this->recordActor();
    }
}
