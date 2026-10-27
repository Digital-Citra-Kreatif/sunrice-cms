<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Sunrice\Cms\Fields\Block;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Items;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Fieldset;

/**
 * Blocks editors add, repeat and reorder: page sections, say. Each kind
 * of block is a fieldset, listed in the `blocks` setting. Stored as
 * [{id, type: <fieldset handle>, key, hidden, values: {…}}]; templates get
 * Items of Block, without the hidden ones.
 */
final class Flexible extends FieldType
{
    public const TYPE = 'flexible';

    public function type(): string
    {
        return self::TYPE;
    }

    public function label(): string
    {
        return 'Flexible content';
    }

    public function rules(Field $field): array
    {
        $rules = ['array'];
        if (($max = $field->configInt('max')) !== null) {
            $rules[] = "max:{$max}";
        }

        return $rules;
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        $rules = [];
        foreach (is_array($value) ? $value : [] as $index => $block) {
            $type = is_array($block) && is_string($block['type'] ?? null) ? $block['type'] : '';
            $rules["{$key}.{$index}"] = ['array'];
            $rules["{$key}.{$index}.id"] = ['nullable', 'string', 'max:40'];
            $rules["{$key}.{$index}.type"] = ['required', 'string', Rule::in($field->configStrings('blocks'))];
            $rules["{$key}.{$index}.key"] = ['nullable', 'string', 'max:100'];
            $rules["{$key}.{$index}.hidden"] = ['nullable', 'boolean'];
            $rules["{$key}.{$index}.values"] = ['array'];
            $schema = $this->schema($type);
            if ($schema !== null && is_array($block)) {
                $rules += $schema->rules(is_array($block['values'] ?? null) ? $block['values'] : [], "{$key}.{$index}.values");
            }
        }

        return $rules;
    }

    public function defaultValue(Field $field): mixed
    {
        return [];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        $blocks = [];
        foreach (is_array($value) ? $value : [] as $block) {
            if (! is_array($block) || ! is_string($block['type'] ?? null)) {
                continue;
            }
            $values = is_array($block['values'] ?? null) ? $block['values'] : [];
            $key = is_string($block['key'] ?? null) ? trim($block['key']) : '';
            $blocks[] = [
                'id' => is_string($block['id'] ?? null) && $block['id'] !== '' ? $block['id'] : (string) Str::ulid(),
                'type' => $block['type'],
                'key' => $key === '' ? null : $key,
                'hidden' => filter_var($block['hidden'] ?? false, FILTER_VALIDATE_BOOLEAN),
                // A block whose fieldset is gone keeps its values as they are.
                'values' => $this->schema($block['type'])?->normalize($values) ?? $values,
            ];
        }

        return $blocks;
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): Items
    {
        $blocks = [];
        foreach (is_array($value) ? $value : [] as $block) {
            if (! is_array($block) || ! is_string($block['type'] ?? null) || ($block['hidden'] ?? false) === true) {
                continue;
            }
            $values = is_array($block['values'] ?? null) ? $block['values'] : [];
            $blocks[] = new Block(
                type: $block['type'],
                id: is_string($block['id'] ?? null) ? $block['id'] : '',
                values: array_filter($this->schema($block['type'])?->hydrate($values, $context) ?? $values, 'is_string', ARRAY_FILTER_USE_KEY),
                key: is_string($block['key'] ?? null) ? $block['key'] : null,
            );
        }

        return new Items($blocks);
    }

    public function references(mixed $value, Field $field): array
    {
        $references = [];
        foreach (is_array($value) ? $value : [] as $index => $block) {
            if (! is_array($block) || ! is_string($block['type'] ?? null) || ! is_array($block['values'] ?? null)) {
                continue;
            }
            foreach ($this->schema($block['type'])?->references($block['values']) ?? [] as $reference) {
                $references[] = $reference->under("{$index}.values");
            }
        }

        return $references;
    }

    public function translatableByDefault(): bool
    {
        return true;
    }

    public function settings(): array
    {
        return [
            new Field('blocks', 'select', 'Kinds of block', required: true, instructions: 'Fieldsets editors can add as blocks, offered in the order you tick them.', config: [
                'multiple' => true,
                'in_tick_order' => true,
                'options' => Fieldset::options(),
                'empty' => 'There are no fieldsets yet: each kind of block is a fieldset, so create them first (Structure → Fieldsets), then come back.',
            ]),
            new Field('max', 'number', 'At most (blocks)', config: ['min' => 1, 'step' => 1]),
        ];
    }

    /**
     * The block kinds, so the editor can show their fields. A fieldset may
     * use itself (or one that uses it) as a kind of block, so the fields
     * stop Schema::MAX_DEPTH blocks deep: deeper blocks come without any.
     */
    public function toAdmin(Field $field, Schema $schema): array
    {
        $blocks = [];
        $deepest = $schema->depth() >= Schema::MAX_DEPTH;
        foreach ($field->configStrings('blocks') as $handle) {
            $fieldset = $this->schema($handle, $schema->depth() + 1);
            if ($fieldset !== null) {
                // A new block starts with its fields' defaults.
                $blocks[] = ['type' => $handle, 'label' => app(Fieldsets::class)->title($handle), 'fields' => $deepest ? [] : $fieldset->toAdmin(), 'defaults' => $deepest ? [] : $fieldset->defaults()];
            }
        }

        return ['blocks' => $blocks] + parent::toAdmin($field, $schema);
    }

    private function schema(string $fieldset, int $depth = 0): ?Schema
    {
        $fields = app(Fieldsets::class)->fields($fieldset);

        return $fields === null ? null : Schema::make($fields, $depth);
    }
}
