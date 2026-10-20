<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/** One line of text. Settings: max (characters, up to 255 in the builder; none: 65535), placeholder, default. */
final class Text extends FieldType
{
    public function type(): string
    {
        return 'text';
    }

    public function rules(Field $field): array
    {
        // Only the field's own limit: legacy data longer than the builder's hint stays valid. Text columns top out at 65535.
        return ['string', 'max:'.min($field->configInt('max') ?? 65535, 65535)];
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
