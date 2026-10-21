<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use Illuminate\Support\Str;

/**
 * One field in a blueprint or fieldset, as editors define it in the
 * blueprint builder. Stored as JSON:
 *
 *     {"handle": "hero", "type": "group", "label": "Hero", "required": false,
 *      "instructions": "", "translatable": null, "validation": [], "config": {},
 *      "fields": [ …children of groups and repeaters… ]}
 *
 * `translatable` null means "the type decides" (text yes, numbers no).
 * `translations` holds what visitors read in other languages: the label,
 * the instructions and a select's option labels, by language, as forms
 * show them (labelIn(), instructionsIn(), optionLabel()):
 *
 *     "translations": {"id": {"label": "Nama", "instructions": "…", "options": {"house": "Rumah"}}}
 *
 * Build one with Field::make() or Field::fromArray(); DefinitionValidator
 * checks a whole list before it is saved.
 *
 * @api
 */
final readonly class Field
{
    /**
     * @param  list<string>  $validation  extra Laravel rules, from DefinitionValidator::RULES
     * @param  array<string, mixed>  $config  the type's settings
     * @param  list<Field>  $fields  children (groups and repeaters)
     * @param  array{field: string, operator: string, value: string|int|float|bool|null}|null  $condition  shown only when another field on its level is so
     * @param  array<string, array{label?: string, instructions?: string, options?: array<string, string>}>  $translations  by language: what visitors read there
     */
    public function __construct(
        public string $handle,
        public string $type,
        public string $label = '',
        public bool $required = false,
        public string $instructions = '',
        public ?bool $translatable = null,
        public array $validation = [],
        public array $config = [],
        public array $fields = [],
        public ?array $condition = null,
        public array $translations = [],
    ) {}

    /** @param array<string, mixed> $config */
    public static function make(string $handle, string $type, array $config = []): self
    {
        return new self($handle, $type, config: $config);
    }

    /**
     * A field from its stored JSON. Values of the wrong type fall back to
     * their defaults; DefinitionValidator refuses them before they are saved.
     *
     * @param  array<mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        $string = fn (string $key): string => is_string($data[$key] ?? null) ? $data[$key] : '';
        $config = is_array($data['config'] ?? null) ? $data['config'] : [];
        $children = is_array($data['fields'] ?? null) ? $data['fields'] : [];

        return new self(
            handle: $string('handle'),
            type: $string('type'),
            label: $string('label'),
            required: ($data['required'] ?? false) === true,
            instructions: $string('instructions'),
            translatable: is_bool($data['translatable'] ?? null) ? $data['translatable'] : null,
            validation: is_array($data['validation'] ?? null) ? array_values(array_filter($data['validation'], 'is_string')) : [],
            config: array_filter($config, 'is_string', ARRAY_FILTER_USE_KEY),
            fields: self::listFromArray($children),
            condition: self::conditionFrom($data['condition'] ?? null),
            translations: self::translationsFrom($data['translations'] ?? null),
        );
    }

    /** @return array<string, array{label?: string, instructions?: string, options?: array<string, string>}> */
    private static function translationsFrom(mixed $translations): array
    {
        $clean = [];
        foreach (is_array($translations) ? $translations : [] as $locale => $texts) {
            if (! is_string($locale) || ! is_array($texts)) {
                continue;
            }
            $own = [];
            foreach (['label', 'instructions'] as $key) {
                if (is_string($texts[$key] ?? null) && trim($texts[$key]) !== '') {
                    $own[$key] = $texts[$key];
                }
            }
            $options = [];
            foreach (is_array($texts['options'] ?? null) ? $texts['options'] : [] as $value => $label) {
                if (is_string($label) && trim($label) !== '') {
                    $options[(string) $value] = $label;
                }
            }
            if ($options !== []) {
                $own['options'] = $options;
            }
            if ($own !== []) {
                $clean[$locale] = $own;
            }
        }

        return $clean;
    }

    /** What a field may be shown on: another field's value, or that it's filled in. */
    public const OPERATORS = ['equals', 'not_equals', 'filled', 'empty'];

    /** @return array{field: string, operator: string, value: string|int|float|bool|null}|null */
    private static function conditionFrom(mixed $condition): ?array
    {
        if (! is_array($condition) || ! is_string($condition['field'] ?? null) || ! in_array($condition['operator'] ?? null, self::OPERATORS, true)) {
            return null;
        }
        $value = $condition['value'] ?? null;

        return ['field' => $condition['field'], 'operator' => (string) $condition['operator'], 'value' => is_scalar($value) ? $value : null];
    }

    /**
     * Whether the field shows, given the values on its level (the editor
     * decides the same way): "equals" another field's value (or one of its
     * values), "not_equals", "filled" or "empty".
     *
     * @param  array<mixed>  $siblings
     */
    public function isShownWith(array $siblings): bool
    {
        if ($this->condition === null) {
            return true;
        }
        $other = $siblings[$this->condition['field']] ?? null;
        $filled = $other !== null && $other !== '' && $other !== false && $other !== [];
        $equal = in_array(self::comparable($this->condition['value']), array_map(self::comparable(...), is_array($other) ? $other : [$other]), true);

        return match ($this->condition['operator']) {
            'equals' => $equal,
            'not_equals' => ! $equal,
            'filled' => $filled,
            default => ! $filled,
        };
    }

    private static function comparable(mixed $value): string
    {
        return match (true) {
            $value === true => 'true',
            $value === false => 'false',
            is_scalar($value) => (string) $value,
            default => '',
        };
    }

    /**
     * @param  array<mixed>  $fields
     * @return list<Field>
     */
    public static function listFromArray(array $fields): array
    {
        return array_values(array_map(self::fromArray(...), array_filter($fields, 'is_array')));
    }

    /**
     * @param  list<Field>  $fields
     * @return list<array<string, mixed>>
     */
    public static function listToArray(array $fields): array
    {
        return array_map(fn (Field $field): array => $field->toArray(), $fields);
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'handle' => $this->handle,
            'type' => $this->type,
            'label' => $this->label,
            'required' => $this->required,
            'instructions' => $this->instructions,
            'translatable' => $this->translatable,
            'validation' => $this->validation,
            'config' => $this->config,
            'fields' => self::listToArray($this->fields),
        ] + ($this->condition !== null ? ['condition' => $this->condition] : [])
            + ($this->translations !== [] ? ['translations' => $this->translations] : []);
    }

    /** The label, or the handle as words when there is none. */
    public function displayLabel(): string
    {
        return $this->label !== '' ? $this->label : ucfirst(str_replace('_', ' ', $this->handle));
    }

    /** The label in a language (null: the page's), else the label, else the handle as a headline ("Phone Number"). */
    public function labelIn(?string $locale = null): string
    {
        return $this->translations[$locale ?? app()->getLocale()]['label'] ?? ($this->label !== '' ? $this->label : Str::headline($this->handle));
    }

    /** The instructions in a language (null: the page's), else the instructions. */
    public function instructionsIn(?string $locale = null): string
    {
        return $this->translations[$locale ?? app()->getLocale()]['instructions'] ?? $this->instructions;
    }

    /**
     * A select's options as a language shows them (null: the page's): each
     * value with its label there, else its label, else the value.
     *
     * @return list<array{value: string, label: string}>
     */
    public function options(?string $locale = null): array
    {
        $translated = $this->translations[$locale ?? app()->getLocale()]['options'] ?? [];
        $options = [];
        foreach (is_array($this->config['options'] ?? null) ? $this->config['options'] : [] as $option) {
            $value = is_array($option) ? ($option['value'] ?? null) : $option;
            if (! is_scalar($value) || $value === '') {
                continue;
            }
            $label = is_array($option) && is_scalar($option['label'] ?? null) && $option['label'] !== '' ? (string) $option['label'] : (string) $value;
            $options[] = ['value' => (string) $value, 'label' => $translated[(string) $value] ?? $label];
        }

        return $options;
    }

    /**
     * What a select's stored value reads as in a language (null: the
     * page's): `$field->optionLabel($values['status'])` gives "Under offer"
     * for under_offer. Null for a value that isn't one of its options.
     */
    public function optionLabel(mixed $value, ?string $locale = null): ?string
    {
        if (! is_scalar($value)) {
            return null;
        }
        foreach ($this->options($locale) as $option) {
            if ($option['value'] === (string) $value) {
                return $option['label'];
            }
        }

        return null;
    }

    public function config(string $key, mixed $default = null): mixed
    {
        return $this->config[$key] ?? $default;
    }

    public function configBool(string $key, bool $default = false): bool
    {
        $value = $this->config[$key] ?? $default;

        return is_bool($value) ? $value : filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function configInt(string $key): ?int
    {
        $value = $this->config[$key] ?? null;

        return is_numeric($value) ? (int) $value : null;
    }

    public function configNumber(string $key): int|float|null
    {
        $value = $this->config[$key] ?? null;

        return is_numeric($value) ? $value + 0 : null;
    }

    public function configString(string $key): ?string
    {
        $value = $this->config[$key] ?? null;

        return is_string($value) && $value !== '' ? $value : null;
    }

    /** @return list<string> */
    public function configStrings(string $key): array
    {
        $value = $this->config[$key] ?? [];

        return is_array($value) ? array_values(array_filter($value, fn (mixed $item): bool => is_string($item) && $item !== '')) : [];
    }

    /** @param array<string, mixed> $config */
    public function withConfig(array $config): self
    {
        return new self($this->handle, $this->type, $this->label, $this->required, $this->instructions, $this->translatable, $this->validation, $config, $this->fields, $this->condition, $this->translations);
    }

    /** @param list<Field> $fields */
    public function withFields(array $fields): self
    {
        return new self($this->handle, $this->type, $this->label, $this->required, $this->instructions, $this->translatable, $this->validation, $this->config, $fields, $this->condition, $this->translations);
    }
}
