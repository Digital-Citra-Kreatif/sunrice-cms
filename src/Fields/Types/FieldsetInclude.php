<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Models\Fieldset;

/**
 * Puts a fieldset's fields in its place, at its level and with their own
 * handles (its own handle, label and settings aren't used); Schema::make()
 * does the replacing. A Group around it keeps them under one name. Only an include whose fieldset is missing is ever used as a
 * field, and then it keeps its value as it is.
 */
final class FieldsetInclude extends FieldType
{
    public const TYPE = 'fieldset';

    public function type(): string
    {
        return self::TYPE;
    }

    public function label(): string
    {
        return 'Fieldset';
    }

    public function settings(): array
    {
        return [
            new Field('fieldset', 'select', 'Fieldset', required: true, config: ['options' => Fieldset::options()],
                instructions: 'Its fields are added here, at this level, with their own handles. To keep them under one name (primary_contact.phone), put this in a Group.'),
        ];
    }
}
