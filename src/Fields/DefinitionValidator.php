<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator as ValidatorInstance;
use Sunrice\Cms\Fields\Types\FieldsetInclude;
use Sunrice\Cms\Settings\LocaleSettings;
use Sunrice\Cms\Support\HandleRule;

/**
 * Checks field definitions from the blueprint builder before they are
 * saved: handles, known types, each type's settings, extra rules from an
 * allowed list, and fieldset includes that exist and don't include
 * themselves. Returns the definitions as they will be stored.
 *
 *     $fields = app(DefinitionValidator::class)->validate($input['fields'], reserved: Blueprint::RESERVED);
 *
 * @api
 */
final class DefinitionValidator
{
    /** Groups and repeaters may nest this deep. */
    public const MAX_DEPTH = 5;

    /**
     * Extra rules a field may add. Rules that read the database (exists,
     * unique) or other fields aren't offered: definitions are content, and
     * editors who build blueprints aren't developers.
     */
    public const RULES = [
        'alpha', 'alpha_dash', 'alpha_num', 'ascii', 'between', 'date_format', 'decimal', 'digits', 'digits_between',
        'doesnt_end_with', 'doesnt_start_with', 'email', 'ends_with', 'in', 'integer', 'ip', 'json', 'lowercase',
        'mac_address', 'max', 'max_digits', 'min', 'min_digits', 'multiple_of', 'not_in', 'not_regex', 'numeric',
        'regex', 'size', 'starts_with', 'ulid', 'uppercase', 'url', 'uuid',
    ];

    public function __construct(
        private readonly FieldTypes $types,
        private readonly Fieldsets $fieldsets,
    ) {}

    /**
     * @param  list<string>  $reserved  handles the fields may not use (at the top level, includes counted)
     * @param  string|null  $fieldset  the handle of the fieldset being saved, which its fields can't include
     * @return list<Field>
     *
     * @throws ValidationException
     */
    public function validate(mixed $input, string $attribute = 'fields', array $reserved = [], ?string $fieldset = null): array
    {
        $rules = [$attribute => ['present', 'array', 'list', 'max:200']];
        $names = [];
        $this->collectRules(is_array($input) ? $input : [], $attribute, 1, $rules, $names);
        // Errors name the setting ("From collections"), not the path (fields.0.config.collections).
        $validator = Validator::make([$attribute => $input], $rules, [], $names);
        $validator->after(function (ValidatorInstance $validator) use ($input, $attribute, $reserved, $fieldset): void {
            if ($validator->errors()->isEmpty() && is_array($input)) {
                $this->checkHandles($validator, Field::listFromArray($input), $attribute, $reserved, $fieldset);
            }
        });
        $validator->validate();

        return $this->clean(Field::listFromArray(is_array($input) ? $input : []));
    }

    /**
     * @param  array<mixed>  $fields
     * @param  array<string, list<mixed>>  $rules
     * @param  array<string, string>  $names  readable names of the attributes
     */
    private function collectRules(array $fields, string $path, int $depth, array &$rules, array &$names): void
    {
        foreach ($fields as $index => $field) {
            $key = "{$path}.{$index}";
            $type = is_array($field) && is_string($field['type'] ?? null) && $this->types->has($field['type']) ? $this->types->get($field['type']) : null;
            $rules[$key] = ['array'];
            foreach (['handle', 'type', 'label', 'instructions', 'required', 'translatable', 'validation', 'condition', 'config', 'fields'] as $part) {
                $names["{$key}.{$part}"] = $part === 'validation' ? 'extra rules' : $part;
            }
            $rules["{$key}.handle"] = ['required', 'string', 'max:64', new HandleRule];
            $rules["{$key}.type"] = ['required', 'string', Rule::in(array_keys($this->types->all()))];
            $rules["{$key}.label"] = ['nullable', 'string', 'max:255'];
            $rules["{$key}.instructions"] = ['nullable', 'string', 'max:1000'];
            $rules["{$key}.required"] = ['nullable', self::strictBoolean()];
            $rules["{$key}.translatable"] = ['nullable', self::strictBoolean()];
            $rules["{$key}.validation"] = ['nullable', 'array', 'list', 'max:20'];
            $rules["{$key}.validation.*"] = ['string', 'max:255', function (string $attribute, mixed $value, \Closure $fail): void {
                $name = is_string($value) ? strtolower(explode(':', $value, 2)[0]) : '';
                if (! in_array($name, self::RULES, true)) {
                    $fail(__('":rule" can\'t be used as an extra rule. Use one of: :rules.', ['rule' => $name, 'rules' => implode(', ', self::RULES)]));
                }
            }];
            $own = is_array($field) ? ($field['handle'] ?? null) : null;
            $siblings = array_values(array_filter(array_map(fn (mixed $other): mixed => is_array($other) ? ($other['handle'] ?? null) : null, $fields), fn (mixed $handle): bool => is_string($handle) && $handle !== $own));
            $rules["{$key}.condition"] = ['nullable', 'array:field,operator,value'];
            $rules["{$key}.condition.field"] = ["required_with:{$key}.condition", 'string', Rule::in($siblings)];
            $rules["{$key}.condition.operator"] = ["required_with:{$key}.condition", 'string', Rule::in(Field::OPERATORS)];
            $rules["{$key}.condition.value"] = ['nullable', function (string $attribute, mixed $value, \Closure $fail): void {
                if (! is_scalar($value) || (is_string($value) && mb_strlen($value) > 255)) {
                    $fail(__('The value to compare with must be short text, a number or true/false.'));
                }
            }];
            // What visitors read in other languages: label, instructions, a select's option labels.
            $rules["{$key}.translations"] = ['nullable', 'array', function (string $attribute, mixed $value, \Closure $fail): void {
                foreach (is_array($value) ? array_keys($value) : [] as $locale) {
                    if (! is_string($locale) || preg_match(LocaleSettings::CODE, $locale) !== 1) {
                        $fail(__('Translations are by language code, like "id".'));
                    }
                }
            }];
            $rules["{$key}.translations.*"] = ['array:label,instructions,options'];
            $rules["{$key}.translations.*.label"] = ['nullable', 'string', 'max:255'];
            $rules["{$key}.translations.*.instructions"] = ['nullable', 'string', 'max:1000'];
            $rules["{$key}.translations.*.options"] = ['nullable', 'array', 'max:500'];
            $rules["{$key}.translations.*.options.*"] = ['nullable', 'string', 'max:255'];
            $rules["{$key}.config"] = ['nullable', 'array'];
            $rules["{$key}.fields"] = ['nullable', 'array', 'list', 'max:200'];
            if ($type === null) {
                continue;
            }
            $config = is_array($field['config'] ?? null) ? $field['config'] : [];
            $rules += Schema::make($type->settings())->rules($config, "{$key}.config");
            foreach ($type->settings() as $setting) {
                $names["{$key}.config.{$setting->handle}"] = '"'.$setting->displayLabel().'"';
            }
            $children = is_array($field['fields'] ?? null) ? $field['fields'] : [];
            if ($type->hasChildren() && $children !== []) {
                if ($depth >= self::MAX_DEPTH) {
                    $rules["{$key}.fields"][] = 'prohibited';
                } else {
                    $this->collectRules($children, "{$key}.fields", $depth + 1, $rules, $names);
                }
            }
        }
    }

    private static function strictBoolean(): \Closure
    {
        return function (string $attribute, mixed $value, \Closure $fail): void {
            if (! is_bool($value)) {
                $fail(__('The :attribute field must be true or false.'));
            }
        };
    }

    /**
     * Handles are unique on each level, includes counted, and the top
     * level avoids the reserved ones.
     *
     * @param  list<Field>  $fields
     * @param  list<string>  $reserved
     */
    private function checkHandles(ValidatorInstance $validator, array $fields, string $path, array $reserved, ?string $fieldset): void
    {
        $seen = [];
        foreach ($fields as $index => $field) {
            $key = "{$path}.{$index}";
            $handles = [$field->handle];
            if ($field->type === FieldsetInclude::TYPE) {
                $included = $field->configString('fieldset') ?? '';
                if ($included === $fieldset || $this->includes($included, $fieldset)) {
                    $validator->errors()->add("{$key}.config.fieldset", __('The fieldset ":fieldset" includes this one, so it can\'t be included here.', ['fieldset' => $included]));

                    continue;
                }
                $handles = array_map(fn (Field $child): string => $child->handle, Schema::make([$field])->fields());
            }
            // An include's fields land at this level: say so, and how to keep them apart.
            $include = $field->type === FieldsetInclude::TYPE ? ($field->configString('fieldset') ?? '') : null;
            $at = $include !== null ? "{$key}.config.fieldset" : "{$key}.handle";
            foreach ($handles as $handle) {
                // The fieldset that brought the field here, either one.
                $from = $include ?? (is_string($seen[$handle] ?? null) ? $seen[$handle] : null);
                if (in_array($handle, $reserved, true)) {
                    $validator->errors()->add($at, self::said($include === null
                        ? '":handle" is used by the content itself; choose another handle.'
                        : '":handle" is used by the content itself; choose another handle (the fieldset ":fieldset" adds its fields at this level: put it in a Group to keep them under a name of their own).', ['handle' => $handle, 'fieldset' => (string) $include]));
                } elseif (isset($seen[$handle])) {
                    $validator->errors()->add($at, self::said($from === null
                        ? 'There is already a field ":handle" here.'
                        : 'There is already a field ":handle" here (the fieldset ":fieldset" adds its fields at this level: put it in a Group to keep them under a name of their own).', ['handle' => $handle, 'fieldset' => (string) $from]));
                }
                $seen[$handle] = $include ?? true;
            }
            if ($field->fields !== []) {
                $this->checkHandles($validator, $field->fields, "{$key}.fields", [], $fieldset);
            }
        }
    }

    /** @param array<string, string> $replace */
    private static function said(string $text, array $replace): string
    {
        $said = __($text, $replace);

        return is_string($said) ? $said : $text;
    }

    /**
     * Whether a fieldset includes another, directly or through others.
     * Kinds of block don't count: a fieldset may use itself, or one that
     * includes it, as a block. Includes expand when the schema is built
     * and would never end; blocks only nest as deep as the content does,
     * and the editor gets their fields Schema::MAX_DEPTH blocks deep.
     */
    private function includes(string $handle, ?string $target, int $depth = 0): bool
    {
        if ($target === null || $depth > Schema::MAX_DEPTH) {
            return false;
        }
        foreach (self::includedFieldsets($this->fieldsets->fields($handle) ?? []) as $included) {
            if ($included === $target || $this->includes($included, $target, $depth + 1)) {
                return true;
            }
        }

        return false;
    }

    /**
     * The fieldsets these fields include, at any level.
     *
     * @param  list<Field>  $fields
     * @return list<string>
     */
    public static function includedFieldsets(array $fields): array
    {
        $handles = [];
        foreach ($fields as $field) {
            if ($field->type === FieldsetInclude::TYPE && ($handle = $field->configString('fieldset')) !== null) {
                $handles[] = $handle;
            }
            array_push($handles, ...self::includedFieldsets($field->fields));
        }

        return array_values(array_unique($handles));
    }

    /**
     * The fieldsets these fields include or use as kinds of block.
     *
     * @param  list<Field>  $fields
     * @return list<string>
     */
    public static function usedFieldsets(array $fields): array
    {
        $handles = [];
        foreach ($fields as $field) {
            if ($field->type === FieldsetInclude::TYPE && ($handle = $field->configString('fieldset')) !== null) {
                $handles[] = $handle;
            }
            if ($field->type === Types\Flexible::TYPE) {
                array_push($handles, ...$field->configStrings('blocks'));
            }
            array_push($handles, ...self::usedFieldsets($field->fields));
        }

        return array_values(array_unique($handles));
    }

    /**
     * Rows of a repeater setting (a select's options) without what the
     * repeater stores for content rows (_id, _key, _hidden) or empty cells.
     *
     * @param  array<mixed>  $rows
     * @return list<array<string, mixed>>
     */
    private static function settingRows(array $rows): array
    {
        $clean = [];
        foreach ($rows as $row) {
            if (is_array($row)) {
                $clean[] = array_filter(
                    array_diff_key($row, array_flip(['_id', '_key', '_hidden'])),
                    fn (mixed $cell, int|string $key): bool => is_string($key) && $cell !== null && $cell !== '',
                    ARRAY_FILTER_USE_BOTH,
                );
            }
        }

        return $clean;
    }

    /**
     * The definitions as stored: settings normalised, children only on
     * types that have them.
     *
     * @param  list<Field>  $fields
     * @return list<Field>
     */
    private function clean(array $fields): array
    {
        return array_map(function (Field $field): Field {
            $type = $this->types->get($field->type);
            $settings = Schema::make($type->settings());
            $config = [];
            foreach ($settings->normalize(array_intersect_key($field->config, array_flip(array_map(fn (Field $setting): string => $setting->handle, $settings->fields())))) as $key => $value) {
                if (is_string($key) && $value !== null && $value !== [] && $value !== false) {
                    $config[$key] = $settings->field($key)?->type === Types\Repeater::TYPE && is_array($value) ? self::settingRows($value) : $value;
                }
            }

            return new Field(
                handle: $field->handle,
                type: $field->type,
                label: $field->label,
                required: $field->required,
                instructions: $field->instructions,
                translatable: $field->translatable,
                validation: $field->validation,
                config: $config,
                fields: $type->hasChildren() ? $this->clean($field->fields) : [],
                condition: $field->condition,
                translations: $field->translations,
            );
        }, $fields);
    }
}
