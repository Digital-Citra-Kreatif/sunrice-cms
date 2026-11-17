<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\GlobalValue;

/**
 * A global set's values were saved in a language (SaveGlobals); they're
 * live at once. `$changed` names the fields that changed (it may be
 * empty).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class GlobalsSaved implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    /** @param list<string> $changed */
    public function __construct(
        public readonly GlobalSet $set,
        public readonly GlobalValue $values,
        public readonly string $locale,
        public readonly array $changed,
    ) {
        $this->recordActor();
    }
}
