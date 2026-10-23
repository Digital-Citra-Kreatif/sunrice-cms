<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/** Several lines of plain text. Settings: rows, max (characters), placeholder. */
final class Textarea extends FieldType
{
    public function type(): string
    {
        return 'textarea';
    }

    public function rules(Field $field): array
    {
        return ['string', 'max:'.($field->configInt('max') ?? 65535)];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        return is_scalar($value) && $value !== '' ? str_replace("\r\n", "\n", (string) $value) : null;
    }

    public function translatableByDefault(): bool
    {
        return true;
    }

    public function sortCast(): string
    {
        return 'string';
    }

    public function settings(): array
    {
        return [
            new Field('rows', 'number', 'Rows', config: ['min' => 2, 'max' => 40]),
            new Field('max', 'number', 'Maximum characters', config: ['min' => 1, 'max' => 65535]),
            InputSettings::placeholder(),
        ];
    }
}
