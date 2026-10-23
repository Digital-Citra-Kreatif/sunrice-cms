<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/** A number. Settings: min, max, step (1 for whole numbers), default, placeholder, prefix, suffix (shown around the input, not stored). */
final class Number extends FieldType
{
    public function type(): string
    {
        return 'number';
    }

    public function rules(Field $field): array
    {
        $rules = [$field->configNumber('step') === 1 ? 'integer' : 'numeric'];
        if (($min = $field->configNumber('min')) !== null) {
            $rules[] = 'min:'.$min;
        }
        if (($max = $field->configNumber('max')) !== null) {
            $rules[] = 'max:'.$max;
        }

        return $rules;
    }

    public function defaultValue(Field $field): mixed
    {
        return $field->configNumber('default');
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        return is_numeric($value) ? $value + 0 : null;
    }

    public function sortCast(): string
    {
        return 'number';
    }

    public function settings(): array
    {
        return [
            new Field('min', 'number', 'Minimum'),
            new Field('max', 'number', 'Maximum'),
            new Field('step', 'number', 'Step', instructions: '1 for whole numbers; empty for any number.', config: ['min' => 0]),
            new Field('default', 'number', 'Default value'),
            InputSettings::placeholder(),
            ...InputSettings::affixes(),
        ];
    }
}
