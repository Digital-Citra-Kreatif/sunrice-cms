<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

/**
 * A field type built on a built-in one: the same input in the editor,
 * with preset settings and extra rules. No JavaScript needed.
 *
 *     final class RatingField extends CustomField
 *     {
 *         public function type(): string { return 'rating'; }
 *         public function baseType(): string { return 'number'; }
 *         public function preset(): array { return ['min' => 1, 'max' => 5]; }
 *         public function extraRules(): array { return ['integer']; }
 *     }
 *
 * Everything else is the base type's, with the preset applied under the
 * field's own settings. Override any method to change it.
 *
 * @api
 */
abstract class CustomField extends FieldType
{
    /** The built-in type this one builds on: "text", "select"… */
    abstract public function baseType(): string;

    /**
     * Settings applied under the field's own.
     *
     * @return array<string, mixed>
     */
    public function preset(): array
    {
        return [];
    }

    /** @return list<mixed> */
    public function extraRules(): array
    {
        return [];
    }

    protected function base(): FieldType
    {
        return app(FieldTypes::class)->get($this->baseType());
    }

    protected function withPreset(Field $field): Field
    {
        return $field->withConfig(array_merge($this->preset(), $field->config));
    }

    public function rules(Field $field): array
    {
        return [...$this->base()->rules($this->withPreset($field)), ...$this->extraRules()];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return $this->base()->nestedRules($this->withPreset($field), $key, $value);
    }

    public function defaultValue(Field $field): mixed
    {
        return $this->base()->defaultValue($this->withPreset($field));
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        return $this->base()->normalize($value, $this->withPreset($field));
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        return $this->base()->hydrate($value, $this->withPreset($field), $context);
    }

    public function references(mixed $value, Field $field): array
    {
        return $this->base()->references($value, $this->withPreset($field));
    }

    public function translatableByDefault(): bool
    {
        return $this->base()->translatableByDefault();
    }

    public function sortCast(): ?string
    {
        return $this->base()->sortCast();
    }

    public function hasChildren(): bool
    {
        return $this->base()->hasChildren();
    }

    public function settings(): array
    {
        return $this->base()->settings();
    }

    /** The editor shows the base type's input, with the preset applied. */
    public function toAdmin(Field $field, Schema $schema): array
    {
        return ['custom_type' => $field->type, 'type' => $this->baseType()] + $this->base()->toAdmin($this->withPreset($field), $schema);
    }
}
