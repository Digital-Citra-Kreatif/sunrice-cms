<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/** One line of text. Settings: max (characters), placeholder, default. */
final class Text extends FieldType
{
    public function type(): string
    {
        return 'text';
    }

    public function rules(Field $field): array
    {
        return ['string', 'max:'.($field->configInt('max') ?? 255)];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        return is_scalar($value) && $value !== '' ? trim((string) $value) : null;
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
            new Field('max', 'number', 'Maximum characters', config: ['min' => 1, 'max' => 255]),
            new Field('placeholder', 'text', 'Placeholder'),
            new Field('default', 'text', 'Default value'),
        ];
    }
}
