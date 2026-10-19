<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use Sunrice\Cms\Fields\Types\Missing;

/**
 * A list of fields ready to use: fieldset includes replaced by the
 * fieldset's fields. Validates, stores and hydrates data shaped by them.
 *
 *     $schema = Schema::make($blueprint->fields());
 *     $request->validate($schema->rules($request->input('data', [])));
 *     $data = $schema->normalize($validated['data']);
 *
 * Data under handles the fields don't have is kept as it is, so changing
 * a blueprint never loses what entries already store.
 *
 * @api
 */
final class Schema
{
    /** Includes may nest this deep; deeper ones stay unexpanded. */
    public const MAX_DEPTH = 5;

    /** @param list<Field> $fields */
    private function __construct(
        private readonly array $fields,
        private readonly FieldTypes $types,
    ) {}

    /** @param list<Field> $fields */
    public static function make(array $fields): self
    {
        return new self(self::expand($fields, app(Fieldsets::class)), app(FieldTypes::class));
    }

    /**
     * @param  list<Field>  $fields
     * @param  list<string>  $including  fieldsets being expanded, outermost first
     * @return list<Field>
     */
    private static function expand(array $fields, Fieldsets $fieldsets, array $including = []): array
    {
        $expanded = [];
        foreach ($fields as $field) {
            $handle = $field->type === Types\FieldsetInclude::TYPE ? $field->configString('fieldset') : null;
            $included = $handle === null || in_array($handle, $including, true) || count($including) >= self::MAX_DEPTH ? null : $fieldsets->fields($handle);
            if ($handle !== null && $included !== null) {
                array_push($expanded, ...self::expand($included, $fieldsets, [...$including, $handle]));

                continue;
            }
            // An include that can't be expanded (missing, circular) stays, so its data is kept.
            $expanded[] = $field->fields === [] ? $field : $field->withFields(self::expand($field->fields, $fieldsets, $including));
        }

        return $expanded;
    }

    /** @return list<Field> */
    public function fields(): array
    {
        return $this->fields;
    }

    /** A field by handle, or by dot path into groups and repeaters ("hero.image"). */
    public function field(string $path): ?Field
    {
        $fields = $this->fields;
        $found = null;
        foreach (explode('.', $path) as $handle) {
            $found = null;
            foreach ($fields as $field) {
                if ($field->handle === $handle) {
                    $found = $field;
                }
            }
            if ($found === null) {
                return null;
            }
            $fields = $found->fields;
        }

        return $found;
    }

    /** The field's type; one no longer registered keeps its value as it is. */
    public function type(Field $field): FieldType
    {
        return $this->types->has($field->type) ? $this->types->get($field->type) : new Missing($field->type);
    }

    /** A schema of a group's or repeater's fields (already expanded with their parent). */
    public static function children(Field $field): self
    {
        return new self($field->fields, app(FieldTypes::class));
    }

    public function isTranslatable(Field $field): bool
    {
        return $field->translatable ?? $this->type($field)->translatableByDefault();
    }

    /**
     * Laravel rules for data under `$prefix`, keyed by dot path.
     *
     * @param  array<mixed>  $data  the input, so rules can follow what was sent (flexible blocks)
     * @return array<string, list<mixed>>
     */
    public function rules(array $data, string $prefix = 'data'): array
    {
        $rules = [];
        foreach ($this->fields as $field) {
            $key = $prefix === '' ? $field->handle : $prefix.'.'.$field->handle;
            $type = $this->type($field);
            // Required or nullable first, so an empty required field says "is required".
            $rules[$key] = [$field->required ? 'required' : 'nullable', ...$type->rules($field), ...$field->validation];
            $rules += $type->nestedRules($field, $key, $data[$field->handle] ?? null);
        }

        return $rules;
    }

    /**
     * The data to store. Handles the fields don't have are kept.
     *
     * @param  array<mixed>  $data
     * @return array<mixed>
     */
    public function normalize(array $data): array
    {
        foreach ($this->fields as $field) {
            if (array_key_exists($field->handle, $data)) {
                $data[$field->handle] = $this->type($field)->normalize($data[$field->handle], $field);
            }
        }

        return $data;
    }

    /** @return array<string, mixed> */
    public function defaults(): array
    {
        $defaults = [];
        foreach ($this->fields as $field) {
            $defaults[$field->handle] = $this->type($field)->defaultValue($field);
        }

        return $defaults;
    }

    /**
     * What templates get for stored data.
     *
     * @param  array<mixed>  $data
     * @return array<mixed>
     */
    public function hydrate(array $data, HydrationContext $context): array
    {
        foreach ($this->fields as $field) {
            if (array_key_exists($field->handle, $data)) {
                $data[$field->handle] = $this->type($field)->hydrate($data[$field->handle], $field, $context);
            }
        }

        return $data;
    }

    /**
     * @param  array<mixed>  $data
     * @return list<Reference>
     */
    public function references(array $data): array
    {
        $references = [];
        foreach ($this->fields as $field) {
            if (! array_key_exists($field->handle, $data)) {
                continue;
            }
            foreach ($this->type($field)->references($data[$field->handle], $field) as $reference) {
                $references[] = $reference->under($field->handle);
            }
        }

        return $references;
    }

    /**
     * The definitions sent to the editor.
     *
     * @return list<array<string, mixed>>
     */
    public function toAdmin(): array
    {
        return array_map(fn (Field $field): array => $this->type($field)->toAdmin($field, $this), $this->fields);
    }
}
