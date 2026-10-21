<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Validation\Rule;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/**
 * A choice from a list. Settings: options ([{value, label}]), multiple.
 * Stores the value, or a list of values when multiple.
 */
final class Select extends FieldType
{
    public function type(): string
    {
        return 'select';
    }

    public function rules(Field $field): array
    {
        if ($field->configBool('multiple')) {
            return ['array'];
        }

        return ['string', Rule::in(self::values($field))];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return $field->configBool('multiple') ? ["{$key}.*" => ['string', 'distinct', Rule::in(self::values($field))]] : [];
    }

    public function defaultValue(Field $field): mixed
    {
        $default = $field->configString('default');

        return $field->configBool('multiple') ? ($default === null ? [] : [$default]) : $default;
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        if ($field->configBool('multiple')) {
            return is_array($value) ? array_values(array_map(strval(...), array_filter($value, 'is_scalar'))) : [];
        }

        return is_scalar($value) && $value !== '' ? (string) $value : null;
    }

    public function sortCast(): string
    {
        return 'string';
    }

    public function settings(): array
    {
        return [
            new Field('options', 'repeater', 'Options', required: true, fields: [
                new Field('value', 'text', 'Value', required: true),
                new Field('label', 'text', 'Label'),
            ]),
            new Field('multiple', 'toggle', 'Several choices'),
            new Field('default', 'text', 'Default value'),
        ];
    }

    /** @return list<string> */
    public static function values(Field $field): array
    {
        $options = $field->config('options', []);
        $values = [];
        foreach (is_array($options) ? $options : [] as $option) {
            $value = is_array($option) ? ($option['value'] ?? null) : $option;
            if (is_scalar($value) && $value !== '') {
                $values[] = (string) $value;
            }
        }

        return $values;
    }
}
