<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\Schema;

/**
 * The words in a field's value: text, textarea and rich text, a link's
 * label, and the same inside groups, repeater rows and flexible blocks.
 * Nested fields marked `translatable: false` are left out.
 *
 * @internal
 */
final class TranslatableText
{
    /**
     * @return array<string, array{text: string, rich: bool}> dot path inside the value ("" for the value itself) => its text
     */
    public static function of(Field $field, mixed $value): array
    {
        $strings = [];
        self::collect($field, $value, '', $strings);

        return $strings;
    }

    /** @param array<string, array{text: string, rich: bool}> $strings */
    private static function collect(Field $field, mixed $value, string $path, array &$strings): void
    {
        $at = fn (string|int $key): string => $path === '' ? (string) $key : "{$path}.{$key}";
        switch ($field->type) {
            case 'text':
            case 'textarea':
            case 'rich_text':
                if (is_string($value) && trim(strip_tags($value)) !== '') {
                    $strings[$path] = ['text' => $value, 'rich' => $field->type === 'rich_text'];
                }
                break;
            case 'link':
                if (is_array($value) && is_string($value['label'] ?? null) && trim($value['label']) !== '') {
                    $strings[$at('label')] = ['text' => $value['label'], 'rich' => false];
                }
                break;
            case 'group':
                if (is_array($value)) {
                    self::fields($field->fields, $value, $path, $strings);
                }
                break;
            case 'repeater':
                foreach (is_array($value) ? $value : [] as $index => $row) {
                    if (is_array($row)) {
                        self::fields($field->fields, $row, $at($index), $strings);
                    }
                }
                break;
            case 'flexible':
                foreach (is_array($value) ? $value : [] as $index => $block) {
                    $fields = is_array($block) && is_string($block['type'] ?? null) ? app(Fieldsets::class)->fields($block['type']) : null;
                    if ($fields !== null && is_array($block['values'] ?? null)) {
                        self::fields(Schema::make($fields)->fields(), $block['values'], $at($index).'.values', $strings);
                    }
                }
                break;
        }
    }

    /**
     * @param  list<Field>  $fields
     * @param  array<mixed>  $values
     * @param  array<string, array{text: string, rich: bool}>  $strings
     */
    private static function fields(array $fields, array $values, string $path, array &$strings): void
    {
        foreach ($fields as $field) {
            if ($field->translatable !== false && array_key_exists($field->handle, $values)) {
                self::collect($field, $values[$field->handle], $path === '' ? $field->handle : "{$path}.{$field->handle}", $strings);
            }
        }
    }
}
