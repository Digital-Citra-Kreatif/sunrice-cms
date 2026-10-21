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
    /**
     * Includes may nest this deep; deeper ones stay unexpanded. The editor
     * gets flexible blocks' fields this many blocks deep too; deeper blocks
     * come without fields (a fieldset may use itself as a kind of block).
     */
    public const MAX_DEPTH = 5;

    /** @param list<Field> $fields */
    private function __construct(
        private readonly array $fields,
        private readonly FieldTypes $types,
        private readonly int $depth = 0,
    ) {}

    /**
     * @param  list<Field>  $fields
     * @param  int  $depth  how many flexible blocks deep these fields are (a block's fieldset: its field's depth + 1)
     */
    public static function make(array $fields, int $depth = 0): self
    {
        return new self(self::expand($fields, app(Fieldsets::class)), app(FieldTypes::class), $depth);
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

    /** A schema of a group's or repeater's fields (already expanded with their parent), at the parent's depth. */
    public static function children(Field $field, int $depth = 0): self
    {
        return new self($field->fields, app(FieldTypes::class), $depth);
    }

    /** How many flexible blocks deep these fields are. */
    public function depth(): int
    {
        return $this->depth;
    }

    public function isTranslatable(Field $field): bool
    {
        return $field->translatable ?? $this->type($field)->translatableByDefault();
    }

    /**
     * The handles of the fields shared by all languages (not translatable).
     *
     * @return list<string>
     */
    public function shared(): array
    {
        return array_values(array_map(fn (Field $field): string => $field->handle, array_filter($this->fields, fn (Field $field): bool => ! $this->isTranslatable($field))));
    }

    /**
     * Another language's data with what all languages share taken from the
     * main language's: the shared (not translated) fields, and shared fields
     * inside translated groups (by handle), repeater rows (by `_id`) and
     * flexible blocks (by `id`) that the main language has too. What the
     * main language doesn't have is kept as stored.
     *
     * @param  array<mixed>  $data
     * @param  array<mixed>  $main
     * @return array<mixed>
     */
    public function withShared(array $data, array $main): array
    {
        return $this->share($data, $main, false);
    }

    /**
     * What another language stores of its data: without what withShared()
     * would take from the main language's.
     *
     * @param  array<mixed>  $data
     * @param  array<mixed>  $main
     * @return array<mixed>
     */
    public function withoutShared(array $data, array $main): array
    {
        return $this->share($data, $main, true);
    }

    /**
     * @param  array<mixed>  $data
     * @param  array<mixed>  $main
     * @return array<mixed>
     */
    private function share(array $data, array $main, bool $strip): array
    {
        foreach ($this->fields as $field) {
            $handle = $field->handle;
            if (! array_key_exists($handle, $main)) {
                continue;
            }
            if (! $this->isTranslatable($field)) {
                if ($strip) {
                    unset($data[$handle]);
                } else {
                    $data[$handle] = $main[$handle];
                }

                continue;
            }
            $value = $data[$handle] ?? null;
            $base = $main[$handle];
            if (! is_array($value) || ! is_array($base)) {
                continue;
            }
            $data[$handle] = match ($field->type) {
                Types\Group::TYPE => self::children($field, $this->depth)->share($value, $base, $strip),
                Types\Repeater::TYPE => $this->shareItems($value, $base, '_id', fn (array $row, array $mainRow): array => self::children($field, $this->depth)->share($row, $mainRow, $strip)),
                Types\Flexible::TYPE => $this->depth >= self::MAX_DEPTH ? $value : $this->shareItems($value, $base, 'id', function (array $block, array $mainBlock) use ($strip): array {
                    $fields = is_string($block['type'] ?? null) && ($block['type'] === ($mainBlock['type'] ?? null)) ? app(Fieldsets::class)->fields($block['type']) : null;
                    if ($fields !== null && is_array($block['values'] ?? null) && is_array($mainBlock['values'] ?? null)) {
                        $block['values'] = self::make($fields, $this->depth + 1)->share($block['values'], $mainBlock['values'], $strip);
                    }

                    return $block;
                }),
                default => $value,
            };
        }

        return $data;
    }

    /**
     * Rows or blocks, each paired with the main language's of the same id.
     *
     * @param  array<mixed>  $items
     * @param  array<mixed>  $main
     * @param  \Closure(array<mixed>, array<mixed>): array<mixed>  $share
     * @return array<mixed>
     */
    private function shareItems(array $items, array $main, string $id, \Closure $share): array
    {
        $byId = [];
        foreach ($main as $item) {
            if (is_array($item) && is_string($item[$id] ?? null) && $item[$id] !== '') {
                $byId[$item[$id]] = $item;
            }
        }
        foreach ($items as $index => $item) {
            $key = is_array($item) && is_string($item[$id] ?? null) ? $item[$id] : null;
            if ($key !== null && isset($byId[$key])) {
                $items[$index] = $share($item, $byId[$key]);
            }
        }

        return $items;
    }

    /**
     * These fields without the given handles.
     *
     * @param  list<string>  $handles
     */
    public function except(array $handles): self
    {
        return new self(array_values(array_filter($this->fields, fn (Field $field): bool => ! in_array($field->handle, $handles, true))), $this->types, $this->depth);
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
            $own = [$key => [$field->required ? 'required' : 'nullable', ...$type->rules($field), ...$field->validation]]
                + $type->nestedRules($field, $key, $data[$field->handle] ?? null);
            // Hidden by its condition: nothing in it is required, but what
            // it keeps (it's stored as it is) is still checked.
            $rules += $field->isShownWith($data) ? $own : array_map(self::optional(...), $own);
        }

        return $rules;
    }

    /**
     * @param  list<mixed>  $rules
     * @return list<mixed> the rules with "required" (and its variants) made "nullable", and a required toggle's "accepted" "boolean"
     */
    private static function optional(array $rules): array
    {
        return array_map(fn (mixed $rule): mixed => is_string($rule) && str_starts_with($rule, 'required') ? 'nullable' : ($rule === 'accepted' ? 'boolean' : $rule), $rules);
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
     * The definitions sent to the editor. Flexible blocks' fields go
     * MAX_DEPTH blocks deep; deeper blocks are listed without fields.
     *
     * @return list<array<string, mixed>>
     */
    public function toAdmin(): array
    {
        return array_map(fn (Field $field): array => $this->type($field)->toAdmin($field, $this), $this->fields);
    }
}
