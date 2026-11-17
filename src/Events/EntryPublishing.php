<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use DateTimeInterface;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * An entry translation's draft is about to be published (PublishEntry),
 * for `$publishAt` (null: its own date, or now), after the CMS's own
 * checks. Not fired again when a scheduled entry's time comes.
 *
 * A listener may change `$title`, `$slug` and `$data` (the draft's fields
 * this language edits, by handle), which are published and kept as the
 * draft, or stop it by throwing a ValidationException:
 *
 *     throw ValidationException::withMessages(['data.image' => 'Add an image before publishing.']);
 *
 * What listeners leave is validated as usual. It runs inside the publish's
 * database transaction, with the translation's row locked: keep it quick.
 *
 * @api
 */
final class EntryPublishing
{
    use Dispatchable, RecordsActor;

    /** @param array<mixed> $data */
    public function __construct(
        public readonly EntryTranslation $translation,
        public readonly ?DateTimeInterface $publishAt,
        public mixed $title,
        public mixed $slug,
        public array $data,
    ) {
        $this->recordActor();
    }
}
