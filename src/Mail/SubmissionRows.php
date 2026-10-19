<?php

declare(strict_types=1);

namespace Sunrice\Cms\Mail;

use Illuminate\Support\Str;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\FieldText;

/**
 * A submission as label and text pairs, in the form's field order, for
 * emails, the admin and exports.
 *
 * @internal
 */
final class SubmissionRows
{
    /** @return list<array{handle: string, label: string, value: string}> */
    public static function of(Submission $submission): array
    {
        $rows = [];
        $fields = $submission->form->schema()->fields();
        $known = [];
        foreach ($fields as $field) {
            $known[] = $field->handle;
            $rows[] = ['handle' => $field->handle, 'label' => self::label($field), 'value' => self::text($submission->data[$field->handle] ?? null, $field)];
        }
        // Fields removed from the blueprint since: still shown.
        foreach ($submission->data as $handle => $value) {
            if (! in_array((string) $handle, $known, true)) {
                $rows[] = ['handle' => (string) $handle, 'label' => Str::headline((string) $handle), 'value' => self::text($value)];
            }
        }

        return $rows;
    }

    public static function label(Field $field): string
    {
        return FieldText::label($field);
    }

    public static function text(mixed $value, ?Field $field = null): string
    {
        return FieldText::text($value, $field);
    }
}
