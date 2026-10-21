<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Sunrice\Cms\Fields\DefinitionValidator;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Fieldset;
use Sunrice\Cms\Support\Locales;

/**
 * What the blueprint builder needs besides the fields: the field types
 * with their settings, the fieldsets, the extra rules on offer and the
 * content languages.
 *
 * @internal
 */
final class BuilderData
{
    public function __construct(private readonly FieldTypes $types) {}

    /** @return array{fieldTypes: list<array<string, mixed>>, fieldsets: list<array{value: string, label: string}>, rules: list<string>, reserved: list<string>, locales: list<array{code: string, name: string}>} */
    public function toArray(): array
    {
        return [
            'fieldTypes' => array_values(array_map(fn (FieldType $type): array => [
                'type' => $type->type(),
                'label' => self::say($type->label()),
                'hasChildren' => $type->hasChildren(),
                // Whether its fields are translated unless they say otherwise (the builder's "Translatable" starts so).
                'translatable' => $type->translatableByDefault(),
                'settings' => Schema::make(array_map(self::said(...), $type->settings()))->toAdmin(),
            ], $this->types->all())),
            'fieldsets' => Fieldset::options(),
            'rules' => DefinitionValidator::RULES,
            // Handles content keeps for itself: the builder warns as they're typed.
            'reserved' => Blueprint::RESERVED,
            // The content languages, the main one first: fields' labels for visitors in the others.
            'locales' => array_map(fn (string $code, string $name): array => ['code' => $code, 'name' => $name], array_keys(Locales::names()), Locales::names()),
        ];
    }

    /** A setting with its label and instructions in the user's language (they're written in English in the type). */
    private static function said(Field $field): Field
    {
        return new Field($field->handle, $field->type, self::say($field->label), $field->required, self::say($field->instructions),
            $field->translatable, $field->validation, $field->config, array_map(self::said(...), $field->fields), $field->condition, $field->translations);
    }

    private static function say(string $words): string
    {
        $said = $words === '' ? '' : __($words);

        return is_string($said) ? $said : $words;
    }
}
