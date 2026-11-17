<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Term;

/**
 * A term was created (`$created`) or changed in a language: its name,
 * parent, fields or template. Once per save, like TermSaving.
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class TermSaved implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Term $term,
        public readonly string $locale,
        public readonly bool $created,
    ) {
        $this->recordActor();
    }
}
