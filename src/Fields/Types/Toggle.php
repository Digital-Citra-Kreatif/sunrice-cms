<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/** On or off; a required one must be on (a form's consent box). Settings: default. */
final class Toggle extends FieldType
{
    public function type(): string
    {
        return 'toggle';
    }

    public function rules(Field $field): array
    {
        // "Required" can only mean ticked: off is a value too.
        return $field->required ? ['accepted'] : ['boolean'];
    }

    public function defaultValue(Field $field): mixed
    {
        return $field->configBool('default');
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function sortCast(): string
    {
        return 'number';
    }

    public function settings(): array
    {
        return [new Field('default', 'toggle', 'On by default')];
    }
}
