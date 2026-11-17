<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;

/**
 * A term is about to be created (`$term` null) or changed in a language,
 * once per save: its name (SaveTerm), its page's fields (SaveTermContent)
 * or both (CreateTerm, the term editor).
 *
 * A listener may change `$title`, `$slug` and, when the save includes the
 * fields (`$data` isn't null), `$data` (the fields this language edits:
 * the stored values with what was sent over them), or stop it by throwing
 * a ValidationException (`data.<handle>` for a field). What listeners
 * leave is validated as usual.
 *
 * @api
 */
final class TermSaving
{
    use Dispatchable, RecordsActor;

    /** @param array<mixed>|null $data */
    public function __construct(
        public readonly Taxonomy $taxonomy,
        public readonly string $locale,
        public readonly ?Term $term,
        public mixed $title,
        public mixed $slug,
        public ?array $data,
    ) {
        $this->recordActor();
    }
}
