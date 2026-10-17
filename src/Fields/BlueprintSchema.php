<?php

declare(strict_types=1);

namespace Sunrice\Fields;

use Illuminate\Validation\Rule;
use InvalidArgumentException;
use Sunrice\Models\Fieldset;

/**
 * A compiled list of field definitions (from a blueprint, fieldset or
 * form) with `fieldset` includes expanded inline. Provides validation
 * rules, normalization, hydration, reference extraction and the admin
 * JSON schema.
 */
class BlueprintSchema
{
    /** @var array<int, array<string, mixed>> */
    protected array $fields;

    /**
     * @param  array<int, array<string, mixed>>  $fields
     */
    protected function __construct(array $fields)
    {
        $this->fields = $fields;
    }

    /**
     * @param  array<int, array<string, mixed>>  $fields
     */
    public static function make(array $fields): self
    {
        return new self(static::expandFieldsets($fields));
    }

    /**
     * Replace each `{type: 'fieldset', config: {fieldset: handle}}`
     * node with the referenced fieldset's own field definitions.
     *
     * @param  array<int, array<string, mixed>>  $fields
     * @param  array<int, string>  $stack  fieldset handles in the current expansion chain
     * @return array<int, array<string, mixed>>
     */
    protected static function expandFieldsets(array $fields, array $stack = [], int $depth = 0): array
    {
        if ($depth > 5) {
            throw new InvalidArgumentException('Fieldset nesting exceeds the maximum depth of 5.');
        }

        $out = [];

        foreach ($fields as $field) {
            // Older builders stored the handle at the top level.
            if (($field['type'] ?? null) === 'fieldset' && ($handle = $field['config']['fieldset'] ?? $field['fieldset'] ?? null)) {
                if (in_array($handle, $stack, true)) {
                    throw new InvalidArgumentException("Circular fieldset include detected: {$handle}.");
                }

                $fieldset = Fieldset::query()->where('handle', $handle)->first();
                if ($fieldset === null) {
                    // Unknown fieldset: keep the node so data is preserved.
                    $out[] = $field;

                    continue;
                }

                foreach ($fieldset->fields ?? [] as $child) {
                    $out[] = $child;
                }

                continue;
            }

            // Recurse into container definitions.
            if (is_array($field['config']['fields'] ?? null)) {
                $field['config']['fields'] = static::expandFieldsets($field['config']['fields'], $stack, $depth + 1);
            }

            $out[] = $field;
        }

        // A fieldset's own fields may themselves include fieldsets.
        return $out;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function fields(): array
    {
        return $this->fields;
    }

    /**
     * Find a field by handle, walking into group/repeater children via
     * dot paths (e.g. 'hero.image').
     *
     * @return array<string, mixed>|null
     */
    public function field(string $handle): ?array
    {
        $segments = explode('.', $handle);
        /** @var array<int, array<string, mixed>> $fields */
        $fields = $this->fields;

        foreach ($segments as $i => $segment) {
            $found = collect($fields)->firstWhere('handle', $segment);
            if ($found === null) {
                return null;
            }
            if ($i === count($segments) - 1) {
                return $found;
            }
            $fields = (array) ($found['config']['fields'] ?? []);
        }

        return null;
    }

    /** @param array<string, mixed> $field */
    public function fieldType(array $field): FieldType
    {
        return app(FieldRegistry::class)->get($field['type'] ?? 'text');
    }

    // ---- Validation --------------------------------------------------------

    /**
     * Laravel rules for a whole form, keyed by dot path under $prefix.
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(string $prefix = 'data'): array
    {
        $rules = [];
        $this->collectRules($this->fields, $prefix, $rules);

        return $rules;
    }

    /**
     * @param  array<int, array<string, mixed>>  $fields
     * @param  array<string, array<int, mixed>>  $rules
     */
    protected function collectRules(array $fields, string $prefix, array &$rules): void
    {
        foreach ($fields as $field) {
            $key = $prefix.'.'.$field['handle'];
            $type = $this->fieldType($field);

            // Required/nullable first: an empty required field should say
            // "is required", not fail the type rule ("must be a string").
            $fieldRules = [($field['required'] ?? false) ? 'required' : 'nullable', ...$type->rules($field)];
            foreach ((array) ($field['validation'] ?? []) as $rule) {
                $fieldRules[] = $rule;
            }
            $rules[$key] = $fieldRules;

            // Recurse for containers.
            $children = $field['config']['fields'] ?? null;
            if (is_array($children) && $children !== []) {
                $childPrefix = match ($field['type']) {
                    'repeater' => $key.'.*',
                    default => $key,
                };
                $this->collectRules($children, $childPrefix, $rules);
            }

            if (($field['type'] ?? null) === 'repeater') {
                $rules[$key.'.*._key'] = ['nullable', 'string', 'max:100'];
                $rules[$key.'.*._hidden'] = ['nullable', 'boolean'];
            }

            if (($field['type'] ?? null) === 'flexible') {
                $allowed = array_values($field['config']['fieldsets'] ?? []);
                $rules[$key.'.*.id'] = ['string'];
                $rules[$key.'.*.type'] = $allowed === [] ? ['string'] : ['string', Rule::in($allowed)];
                $rules[$key.'.*.values'] = ['array'];
                $rules[$key.'.*.key'] = ['nullable', 'string', 'max:100'];
                $rules[$key.'.*.hidden'] = ['nullable', 'boolean'];
            }
        }
    }

    // ---- Normalize ---------------------------------------------------------

    /**
     * Clean incoming data for storage. Keys not in the schema are kept
     * untouched (blueprint switching preserves hidden data).
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function normalize(array $data): array
    {
        foreach ($this->fields as $field) {
            $handle = $field['handle'];
            if (! array_key_exists($handle, $data)) {
                continue;
            }
            $data[$handle] = $this->fieldType($field)->normalize($data[$handle], $field);
        }

        return $data;
    }

    /**
     * Default values for a fresh record.
     *
     * @return array<string, mixed>
     */
    public function defaults(): array
    {
        $defaults = [];
        foreach ($this->fields as $field) {
            $defaults[$field['handle']] = $this->fieldType($field)->defaultValue($field);
        }

        return $defaults;
    }

    // ---- Hydrate -----------------------------------------------------------

    /**
     * Turn stored data into frontend values.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function hydrate(array $data, HydrationContext $ctx): array
    {
        foreach ($this->fields as $field) {
            $handle = $field['handle'];
            if (array_key_exists($handle, $data)) {
                $data[$handle] = $this->fieldType($field)->hydrate($data[$handle], $field, $ctx);
            }
        }

        return $data;
    }

    /**
     * Hydrate a single top-level field's value (used by Entry::get).
     */
    public function hydrateField(string $handle, mixed $value, HydrationContext $ctx): mixed
    {
        $field = $this->field($handle);

        if ($field === null) {
            return $value;
        }

        return $this->fieldType($field)->hydrate($value, $field, $ctx);
    }

    // ---- References --------------------------------------------------------

    /**
     * All record references inside stored data, with field paths.
     *
     * @param  array<string, mixed>  $data
     * @return array<int, array{target_type: string, target_id: int, field_path: string}>
     */
    public function references(array $data, string $prefix = ''): array
    {
        $refs = [];

        foreach ($this->fields as $field) {
            $handle = $field['handle'];
            if (! array_key_exists($handle, $data)) {
                continue;
            }
            foreach ($this->fieldType($field)->references($data[$handle], $field) as $ref) {
                /** @var array{target_type: string, target_id: int, field_path?: string} $ref */
                $ref['field_path'] = $prefix.$handle.(isset($ref['field_path']) ? '.'.$ref['field_path'] : '');
                $refs[] = $ref;
            }
        }

        return $refs;
    }

    // ---- Admin schema --------------------------------------------------------

    /**
     * @return array<int, array<string, mixed>>
     */
    public function toAdminSchema(): array
    {
        return array_map(
            fn (array $field) => ['translatable' => TranslationOverlay::isTranslatable($field)]
                + $this->fieldType($field)->toAdminSchema($field),
            $this->fields,
        );
    }

    /**
     * Tabbed admin schema ({handle, label, fields}) for the entry/global/term
     * editors.
     *
     * @return array<int, array{handle: string, label: string, fields: array<int, array<string, mixed>>}>
     */
    public function toAdminTabs(string $label = 'Content'): array
    {
        return [
            ['handle' => 'content', 'label' => $label, 'fields' => $this->toAdminSchema()],
        ];
    }
}
