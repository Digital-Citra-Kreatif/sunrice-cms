<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Models\Fieldset;

/**
 * Puts a fieldset's fields in its place; Schema::make() does the
 * replacing. Only an include whose fieldset is missing is ever used as a
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
            new Field('fieldset', 'select', 'Fieldset', required: true, config: ['options' => Fieldset::options()]),
        ];
    }
}
