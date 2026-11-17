<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Form;

/**
 * A visitor sent a form, and what they sent is about to be checked and
 * kept (SubmitForm). `$data` holds the values of the form's fields by
 * handle, as sent (files as UploadedFile).
 *
 * A listener may change or add to `$data` (only the form's fields are
 * kept), or refuse the submission by throwing a ValidationException: the
 * visitor sees its messages on the form like its own errors, by the field
 * for a field's handle (`email` or `data.email`), in the form's list of
 * problems for any other key:
 *
 *     throw ValidationException::withMessages(['email' => 'Use your work email.']);
 *
 * What listeners leave is then validated by the form's rules. `$user` is
 * the visitor when they're signed in; `$source` is "site".
 *
 * @api
 */
final class FormSubmitting
{
    use Dispatchable, RecordsActor;

    /** @param array<mixed> $data */
    public function __construct(
        public readonly Form $form,
        public readonly string $locale,
        public array $data,
    ) {
        $this->recordActor(source: 'site');
    }
}
