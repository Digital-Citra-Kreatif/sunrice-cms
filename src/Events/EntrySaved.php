<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * An entry's draft was saved in a language: a new entry (CreateEntry,
 * `$created` true) or a change (SaveDraft; not fired when nothing
 * changed). `$changed` names what changed: "title", "slug", field handles,
 * "terms" (for a new entry, the title, slug and the fields given a value).
 * The site shows it once published (EntryPublished).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class EntrySaved implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    /** @param list<string> $changed */
    public function __construct(
        public readonly EntryTranslation $translation,
        public readonly bool $created,
        public readonly array $changed,
    ) {
        $this->recordActor();
    }
}
