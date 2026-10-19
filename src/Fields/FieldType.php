<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

/**
 * A kind of field: how its value is validated, stored and handed to
 * templates. Register your own on the CMS plugin:
 *
 *     CmsPlugin::make()->fieldTypes(ColorField::class);
 *
 * To build on a built-in input (a rating that is a number from 1 to 5),
 * extend CustomField instead.
 *
 * @api
 */
abstract class FieldType
{
    /** The key stored in definitions, lowercase: "text", "color". */
    abstract public function type(): string;

    /** The name in the blueprint builder's "Add field" list. */
    public function label(): string
    {
        return ucfirst(str_replace('_', ' ', $this->type()));
    }

    /**
     * Laravel rules for the value. "required" or "nullable" and the
     * field's own extra rules are added around them.
     *
     * @return list<mixed>
     */
    public function rules(Field $field): array
    {
        return [];
    }

    /**
     * Rules for what is inside the value (a group's fields, a repeater's
     * rows), keyed by dot path under `$key`.
     *
     * @return array<string, list<mixed>>
     */
    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return [];
    }

    /** The value of a new entry. */
    public function defaultValue(Field $field): mixed
    {
        return $field->config('default');
    }

    /** The value to store, from validated input. */
    public function normalize(mixed $value, Field $field): mixed
    {
        return $value;
    }

    /** What templates get for the stored value. */
    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        return $value;
    }

    /**
     * The records the stored value points at.
     *
     * @return list<Reference>
     */
    public function references(mixed $value, Field $field): array
    {
        return [];
    }

    /** Whether values differ per language when the field doesn't say. */
    public function translatableByDefault(): bool
    {
        return false;
    }

    /** How values sort and compare in queries: "string", "number", "date" or null (not at all). */
    public function sortCast(): ?string
    {
        return null;
    }

    /** Whether the field holds other fields (groups and repeaters). */
    public function hasChildren(): bool
    {
        return false;
    }

    /**
     * The type's options in the blueprint builder, stored in the field's
     * `config` and validated like entry data.
     *
     * @return list<Field>
     */
    public function settings(): array
    {
        return [];
    }

    /**
     * The definition sent to the editor's input for this field.
     *
     * @return array<string, mixed>
     */
    public function toAdmin(Field $field, Schema $schema): array
    {
        return ['translatable' => $schema->isTranslatable($field)] + $field->toArray();
    }
}
