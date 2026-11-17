<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * A new entry was made, as a draft: by CreateEntry (`$translation` is
 * the language it was made in; EntrySaved fires too) or as a copy of
 * another (DuplicateEntry: `$copiedFrom`, and `$translation` is the copy's
 * first language).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class EntryCreated implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly EntryTranslation $translation,
        public readonly ?Entry $copiedFrom = null,
    ) {
        $this->recordActor();
    }
}
