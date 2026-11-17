<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * An entry's draft is about to be saved in a language: a new entry
 * (CreateEntry: `$translation` is null) or a change to one (SaveDraft),
 * from the editor, an AI agent, a machine translation or an import.
 *
 * A listener may change `$title`, `$slug` and `$data` (the fields this
 * language edits, by handle: the stored values with what was sent over
 * them), or stop the save by throwing a ValidationException, which the
 * editor sees on the field as any other error (and an AI agent as the
 * tool's error):
 *
 *     throw ValidationException::withMessages(['data.price' => 'Give a price.']);
 *
 * What listeners leave is then validated and normalised as usual, so a
 * value they set must pass the field's rules. Fires before anything is
 * written (and before the version check), even when nothing turns out to
 * have changed; a change runs it inside the save's database transaction:
 * keep it quick.
 *
 * @api
 */
final class EntrySaving
{
    use Dispatchable, RecordsActor;

    /** @param array<mixed> $data */
    public function __construct(
        public readonly Collection $collection,
        public readonly string $locale,
        public readonly ?EntryTranslation $translation,
        public mixed $title,
        public mixed $slug,
        public array $data,
    ) {
        $this->recordActor();
    }
}
