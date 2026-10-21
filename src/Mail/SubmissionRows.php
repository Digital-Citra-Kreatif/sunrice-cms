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
     * With `file`, the admin's download link of a file sent; with `files`,
     * each of several files' name and link.
     *
     * @return list<array{handle: string, label: string, value: string, file: string|null, files: list<array{name: string, url: string}>}>
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

    /** @return array{handle: string, label: string, value: string, file: string|null, files: list<array{name: string, url: string}>} */
    private static function row(Submission $submission, string $handle, string $label, ?Field $field): array
    {
        $value = $submission->data[$handle] ?? null;
        $file = is_array($value) && is_string($value['path'] ?? null)
            ? route('sunrice.admin.cms.submissions.file', ['submission' => $submission->id, 'field' => $handle]) : null;
        $files = [];
        foreach (is_array($value) && array_is_list($value) ? $value : [] as $index => $one) {
            if (is_array($one) && is_string($one['path'] ?? null)) {
                $files[] = [
                    'name' => is_string($one['name'] ?? null) ? $one['name'] : basename($one['path']),
                    'url' => route('sunrice.admin.cms.submissions.file', ['submission' => $submission->id, 'field' => $handle, 'index' => $index]),
                ];
            }
        }

        return ['handle' => $handle, 'label' => $label, 'value' => self::text($value, $field), 'file' => $file, 'files' => $files];
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
