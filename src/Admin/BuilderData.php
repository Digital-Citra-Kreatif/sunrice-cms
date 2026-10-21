<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Sunrice\Cms\Fields\DefinitionValidator;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Fields\Schema;
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

    /** @return array{fieldTypes: list<array<string, mixed>>, fieldsets: list<array{value: string, label: string}>, rules: list<string>, locales: list<array{code: string, name: string}>} */
    public function toArray(): array
    {
        return [
            'fieldTypes' => array_values(array_map(fn (FieldType $type): array => [
                'type' => $type->type(),
                'label' => $type->label(),
                'hasChildren' => $type->hasChildren(),
                'settings' => Schema::make($type->settings())->toAdmin(),
            ], $this->types->all())),
            'fieldsets' => Fieldset::options(),
            'rules' => DefinitionValidator::RULES,
            // The content languages, the main one first: fields' labels for visitors in the others.
            'locales' => array_map(fn (string $code, string $name): array => ['code' => $code, 'name' => $name], array_keys(Locales::names()), Locales::names()),
        ];
    }
}
