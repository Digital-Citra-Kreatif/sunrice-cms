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
    /**
     * With `file`, the admin's download link of a file sent.
     *
     * @return list<array{handle: string, label: string, value: string, file: string|null}>
     */
    public static function of(Submission $submission): array
    {
        $rows = [];
        $fields = $submission->form->schema()->fields();
        $known = [];
        foreach ($fields as $field) {
            $known[] = $field->handle;
            $rows[] = self::row($submission, $field->handle, self::label($field), $field);
        }
        // Fields removed from the blueprint since: still shown.
        foreach ($submission->data as $handle => $value) {
            if (! in_array((string) $handle, $known, true)) {
                $rows[] = self::row($submission, (string) $handle, Str::headline((string) $handle), null);
            }
        }

        return $rows;
    }

    /** @return array{handle: string, label: string, value: string, file: string|null} */
    private static function row(Submission $submission, string $handle, string $label, ?Field $field): array
    {
        $value = $submission->data[$handle] ?? null;
        $file = is_array($value) && is_string($value['path'] ?? null)
            ? route('sunrice.admin.cms.submissions.file', ['submission' => $submission->id, 'field' => $handle]) : null;

        return ['handle' => $handle, 'label' => $label, 'value' => self::text($value, $field), 'file' => $file];
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
