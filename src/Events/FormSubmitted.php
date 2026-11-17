<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Submission;

/**
 * A visitor's form submission was kept (SubmitForm), and the form's
 * emails queued. `$submission->form` is the form, `$submission->data` the
 * values by field handle. `$source` is "site".
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class FormSubmitted implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Submission $submission,
    ) {
        $this->recordActor(source: 'site');
    }
}
