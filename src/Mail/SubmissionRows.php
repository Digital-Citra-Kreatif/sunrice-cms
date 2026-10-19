<?php

declare(strict_types=1);

namespace Sunrice\Cms\Mail;

use Illuminate\Support\Str;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Models\Submission;

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
        return $field->label ?: Str::headline($field->handle);
    }

    public static function text(mixed $value, ?Field $field = null): string
    {
        if ($field?->type === 'select') {
            $labels = [];
            $options = $field->config('options', []);
            foreach (is_array($options) ? $options : [] as $option) {
                if (is_array($option) && is_scalar($option['value'] ?? null)) {
                    $labels[(string) $option['value']] = is_scalar($option['label'] ?? null) ? (string) $option['label'] : (string) $option['value'];
                }
            }
            $value = is_array($value) ? array_map(fn (mixed $v): mixed => is_scalar($v) ? ($labels[(string) $v] ?? $v) : $v, $value) : (is_scalar($value) ? ($labels[(string) $value] ?? $value) : $value);
        }

        return match (true) {
            $value === null => '',
            is_bool($value) => $value ? 'Yes' : 'No',
            is_scalar($value) => (string) $value,
            is_array($value) && array_is_list($value) && array_filter($value, is_scalar(...)) === $value => implode(', ', array_map(strval(...), $value)),
            default => (string) json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        };
    }
}
