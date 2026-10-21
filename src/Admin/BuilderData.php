<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Sunrice\Cms\Fields\DefinitionValidator;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Fieldset;

/**
 * What the blueprint builder needs besides the fields: the field types
 * with their settings, the fieldsets and the extra rules on offer.
 *
 * @internal
 */
final class BuilderData
{
    public function __construct(private readonly FieldTypes $types) {}

    /** @return array{fieldTypes: list<array<string, mixed>>, fieldsets: list<array{value: string, label: string}>, rules: list<string>} */
    public function toArray(): array
    {
        return [
            'fieldTypes' => array_values(array_map(fn (FieldType $type): array => [
                'type' => $type->type(),
                'label' => self::say($type->label()),
                'hasChildren' => $type->hasChildren(),
                'settings' => Schema::make(array_map(self::said(...), $type->settings()))->toAdmin(),
            ], $this->types->all())),
            'fieldsets' => Fieldset::options(),
            'rules' => DefinitionValidator::RULES,
        ];
    }

    /** A setting with its label and instructions in the user's language (they're written in English in the type). */
    private static function said(Field $field): Field
    {
        return new Field($field->handle, $field->type, self::say($field->label), $field->required, self::say($field->instructions),
            $field->translatable, $field->validation, $field->config, array_map(self::said(...), $field->fields), $field->condition);
    }

    private static function say(string $words): string
    {
        $said = $words === '' ? '' : __($words);

        return is_string($said) ? $said : $words;
    }
}
