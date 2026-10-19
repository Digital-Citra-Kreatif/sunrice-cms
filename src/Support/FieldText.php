<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Str;
use Sunrice\Cms\Fields\Field;

/**
 * Field values as plain text, for emails and CSV: booleans as Yes/No,
 * select values as their labels, lists joined, anything else as JSON.
 *
 * @internal
 */
final class FieldText
{
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

        // A file sent with a form: its name.
        if (is_array($value) && is_string($value['path'] ?? null) && is_string($value['name'] ?? null)) {
            return $value['name'];
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
