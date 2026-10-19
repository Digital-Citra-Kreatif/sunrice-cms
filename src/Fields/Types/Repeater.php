<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Support\Str;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Items;
use Sunrice\Cms\Fields\Schema;

/**
 * Rows of the same fields, in order. Settings: min, max (rows).
 *
 * Each stored row also has `_id` (stable, so translations line up with
 * their row), an optional `_key` for templates and `_hidden`. Templates
 * get Items without the hidden rows.
 */
final class Repeater extends FieldType
{
    public function type(): string
    {
        return 'repeater';
    }

    public function rules(Field $field): array
    {
        $rules = ['array'];
        if (($min = $field->configInt('min')) !== null) {
            $rules[] = "min:{$min}";
        }
        if (($max = $field->configInt('max')) !== null) {
            $rules[] = "max:{$max}";
        }

        return $rules;
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        $schema = Schema::children($field);
        $rules = [];
        foreach (is_array($value) ? $value : [] as $index => $row) {
            $rules["{$key}.{$index}"] = ['array'];
            $rules["{$key}.{$index}._id"] = ['nullable', 'string', 'max:40'];
            $rules["{$key}.{$index}._key"] = ['nullable', 'string', 'max:100'];
            $rules["{$key}.{$index}._hidden"] = ['nullable', 'boolean'];
            $rules += $schema->rules(is_array($row) ? $row : [], "{$key}.{$index}");
        }

        return $rules;
    }

    public function defaultValue(Field $field): mixed
    {
        return [];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        $schema = Schema::children($field);
        $rows = [];
        foreach (is_array($value) ? $value : [] as $row) {
            if (! is_array($row)) {
                continue;
            }
            $row = $schema->normalize($row);
            $key = is_string($row['_key'] ?? null) ? trim($row['_key']) : '';
            $row['_id'] = is_string($row['_id'] ?? null) && $row['_id'] !== '' ? $row['_id'] : (string) Str::ulid();
            $row['_key'] = $key === '' ? null : $key;
            $row['_hidden'] = filter_var($row['_hidden'] ?? false, FILTER_VALIDATE_BOOLEAN);
            $rows[] = $row;
        }

        return $rows;
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): Items
    {
        $schema = Schema::children($field);
        $rows = [];
        foreach (is_array($value) ? $value : [] as $row) {
            if (is_array($row) && ($row['_hidden'] ?? false) !== true) {
                unset($row['_hidden']);
                $rows[] = $schema->hydrate($row, $context);
            }
        }

        return new Items($rows);
    }

    public function references(mixed $value, Field $field): array
    {
        $schema = Schema::children($field);
        $references = [];
        foreach (is_array($value) ? $value : [] as $index => $row) {
            foreach (is_array($row) ? $schema->references($row) : [] as $reference) {
                $references[] = $reference->under((string) $index);
            }
        }

        return $references;
    }

    public function translatableByDefault(): bool
    {
        return true;
    }

    public function hasChildren(): bool
    {
        return true;
    }

    public function settings(): array
    {
        return [
            new Field('min', 'number', 'At least (rows)', config: ['min' => 0, 'step' => 1]),
            new Field('max', 'number', 'At most (rows)', config: ['min' => 1, 'step' => 1]),
        ];
    }

    public function toAdmin(Field $field, Schema $schema): array
    {
        return ['fields' => Schema::children($field)->toAdmin()] + parent::toAdmin($field, $schema);
    }
}
