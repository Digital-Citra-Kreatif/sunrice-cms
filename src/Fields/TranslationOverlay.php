<?php

declare(strict_types=1);

namespace Sunrice\Fields;

use Sunrice\Models\Fieldset;

/**
 * Shared layout, translated text.
 *
 * The main language owns an entry's structure: which repeater rows and
 * flexible blocks exist, their order, keys and visibility, and every
 * non-translatable value (images, toggles, numbers...). A translation
 * stores only an overlay of its translatable values:
 *
 *     {
 *         "headline": "Hello",                       // top-level field
 *         "hero": {"title": "Welcome"},               // group
 *         "faq": {"01J...": {"question": "Why?"}},    // repeater, by row _id
 *         "sections": {"01J...": {"values": {...}}}   // flexible, by block id
 *     }
 *
 * merge() lays the overlay over the main data; extract() turns full
 * editor data back into an overlay. Values equal to the main language
 * are not stored, so untranslated text keeps following the main
 * language. Main-language rows/blocks without ids are matched by
 * position ("#0", "#1", ...).
 */
class TranslationOverlay
{
    /**
     * Whether a field's value differs per language.
     *
     * @param  array<string, mixed>  $field
     */
    public static function isTranslatable(array $field): bool
    {
        if (is_bool($field['translatable'] ?? null)) {
            return $field['translatable'];
        }

        return app(FieldRegistry::class)->get($field['type'] ?? 'text')->translatableByDefault();
    }

    /**
     * Full data shaped like $main, with translated values taken from
     * $overlay.
     *
     * @param  array<int, array<string, mixed>>  $fields
     * @param  array<string, mixed>  $main
     * @param  array<string, mixed>  $overlay
     * @return array<string, mixed>
     */
    public static function merge(array $fields, array $main, array $overlay): array
    {
        $out = $main;

        foreach ($fields as $field) {
            $handle = $field['handle'] ?? null;
            if (! is_string($handle) || ! static::isTranslatable($field) || ! array_key_exists($handle, $overlay)) {
                continue;
            }

            $value = $overlay[$handle];
            $base = $main[$handle] ?? null;

            switch ($field['type'] ?? null) {
                case 'group':
                    if (is_array($base) && is_array($value)) {
                        $out[$handle] = static::merge($field['config']['fields'] ?? [], $base, $value);
                    }
                    break;
                case 'repeater':
                    if (is_array($base) && is_array($value)) {
                        $items = static::itemsByKey($value, 'repeater');
                        $out[$handle] = array_map(
                            fn ($row, $i) => is_array($row)
                                ? static::merge($field['config']['fields'] ?? [], $row, static::itemFor($items, $row, (int) $i, '_id'))
                                : $row,
                            $base,
                            array_keys($base),
                        );
                    }
                    break;
                case 'flexible':
                    if (is_array($base) && is_array($value)) {
                        $items = static::itemsByKey($value, 'flexible');
                        $out[$handle] = array_map(function ($block, $i) use ($items) {
                            $schema = is_array($block) ? Fieldset::schemaForHandle((string) ($block['type'] ?? '')) : null;
                            if ($schema === null || ! is_array($block['values'] ?? null)) {
                                return $block;
                            }
                            $block['values'] = static::merge($schema->fields(), $block['values'], static::itemFor($items, $block, (int) $i, 'id'));

                            return $block;
                        }, $base, array_keys($base));
                    }
                    break;
                default:
                    if ($value !== null && $value !== '') {
                        $out[$handle] = $value;
                    }
            }
        }

        return $out;
    }

    /**
     * Reduce full data (as edited in a translation) to its overlay:
     * translatable values that differ from $main, keyed by row/block id.
     *
     * @param  array<int, array<string, mixed>>  $fields
     * @param  array<string, mixed>  $data
     * @param  array<string, mixed>  $main
     * @return array<string, mixed>
     */
    public static function extract(array $fields, array $data, array $main): array
    {
        $out = [];

        foreach ($fields as $field) {
            $handle = $field['handle'] ?? null;
            if (! is_string($handle) || ! static::isTranslatable($field) || ! array_key_exists($handle, $data)) {
                continue;
            }

            $value = $data[$handle];
            $base = $main[$handle] ?? null;

            switch ($field['type'] ?? null) {
                case 'group':
                    if (is_array($value)) {
                        $group = static::extract($field['config']['fields'] ?? [], $value, is_array($base) ? $base : []);
                        if ($group !== []) {
                            $out[$handle] = $group;
                        }
                    }
                    break;
                case 'repeater':
                    $rows = [];
                    $baseList = is_array($base) ? array_values($base) : [];
                    $baseRows = static::itemsByKey($baseList, 'repeater', full: true);
                    foreach (is_array($value) ? array_values($value) : [] as $i => $row) {
                        if (! is_array($row)) {
                            continue;
                        }
                        $key = static::matchKey($row, $i, '_id', $baseList, $baseRows);
                        $baseRow = $baseRows[$key] ?? [];
                        $overlay = static::extract($field['config']['fields'] ?? [], $row, $baseRow);
                        if ($overlay !== []) {
                            $rows[$key] = $overlay;
                        }
                    }
                    if ($rows !== []) {
                        $out[$handle] = $rows;
                    }
                    break;
                case 'flexible':
                    $blocks = [];
                    $baseList = is_array($base) ? array_values($base) : [];
                    $baseBlocks = static::itemsByKey($baseList, 'flexible', full: true);
                    foreach (is_array($value) ? array_values($value) : [] as $i => $block) {
                        $schema = is_array($block) ? Fieldset::schemaForHandle((string) ($block['type'] ?? '')) : null;
                        if ($schema === null || ! is_array($block['values'] ?? null)) {
                            continue;
                        }
                        $key = static::matchKey($block, $i, 'id', $baseList, $baseBlocks);
                        $baseValues = $baseBlocks[$key] ?? [];
                        $overlay = static::extract($schema->fields(), $block['values'], $baseValues);
                        if ($overlay !== []) {
                            $blocks[$key] = ['values' => $overlay];
                        }
                    }
                    if ($blocks !== []) {
                        $out[$handle] = $blocks;
                    }
                    break;
                default:
                    if ($value !== null && $value !== '' && $value !== $base) {
                        $out[$handle] = $value;
                    }
            }
        }

        return $out;
    }

    /**
     * @param  array<string, mixed>  $item
     */
    protected static function keyOf(array $item, int $index, string $idKey): string
    {
        $id = $item[$idKey] ?? null;

        return is_string($id) && $id !== '' ? $id : '#'.$index;
    }

    /**
     * The overlay key for an edited row/block: its own id when the main
     * language has it, otherwise the key of the main item at the same
     * position (translations can't reorder, so positions line up).
     *
     * @param  array<string, mixed>  $item
     * @param  array<int, mixed>  $baseList
     * @param  array<string, array<string, mixed>>  $baseItems
     */
    protected static function matchKey(array $item, int $index, string $idKey, array $baseList, array $baseItems): string
    {
        $id = $item[$idKey] ?? null;
        if (is_string($id) && $id !== '' && isset($baseItems[$id])) {
            return $id;
        }

        $baseItem = $baseList[$index] ?? null;

        return is_array($baseItem) ? static::keyOf($baseItem, $index, $idKey) : static::keyOf($item, $index, $idKey);
    }

    /**
     * Overlay items by key. With $full, reads full main data instead
     * (values of rows/blocks by key, and by position).
     *
     * @param  array<array-key, mixed>  $value
     * @return array<string, array<string, mixed>>
     */
    protected static function itemsByKey(array $value, string $type, bool $full = false): array
    {
        $idKey = $type === 'flexible' ? 'id' : '_id';
        $items = [];

        if (! $full) {
            foreach ($value as $key => $item) {
                if (is_array($item)) {
                    $items[(string) $key] = $type === 'flexible' ? (array) ($item['values'] ?? []) : $item;
                }
            }

            return $items;
        }

        foreach ($value as $i => $item) {
            if (! is_array($item)) {
                continue;
            }
            $values = $type === 'flexible' ? (array) ($item['values'] ?? []) : $item;
            $items[static::keyOf($item, (int) $i, $idKey)] = $values;
            // Also reachable by position, for rows without ids.
            $items['#'.$i] ??= $values;
        }

        return $items;
    }

    /**
     * @param  array<string, array<string, mixed>>  $items
     * @param  array<string, mixed>  $item
     * @return array<string, mixed>
     */
    protected static function itemFor(array $items, array $item, int $index, string $idKey): array
    {
        $id = $item[$idKey] ?? null;
        if (is_string($id) && isset($items[$id])) {
            return $items[$id];
        }

        return $items['#'.$index] ?? [];
    }
}
