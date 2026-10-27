<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Sunrice\Cms\Fields\CustomField;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Fields\Types\Flexible;
use Sunrice\Cms\Fields\Types\Group;
use Sunrice\Cms\Fields\Types\Repeater;

/**
 * The text to translate in field data: text, textarea and rich text
 * fields, and links' texts (`label`, at "cta.label"), that are
 * translated, also inside groups, repeater rows and flexible blocks, and
 * custom field types built on them. Fields shared by all languages are
 * left out, and so is everything else: numbers, choices, media, related
 * entries and terms (ids), and how a field presents itself (its label,
 * hint, placeholder…: the blueprint's, not the content's).
 *
 * @api
 */
final class TranslatableStrings
{
    public const TYPES = ['text', 'textarea', 'rich_text', 'link'];

    /**
     * The strings of a translation, each with the source's text at the same
     * place (rows and blocks matched by id, those without one by position). Fields the
     * translation lacks get the source's value first, so there's a place to
     * write the translation to.
     *
     * @param  array<mixed>  $target  the translation's data
     * @param  array<mixed>  $source  the data translated from
     * @return array{0: array<mixed>, 1: array<string, array{source: string, current: string|null, rich: bool}>} the target with those values, and its strings by dot path
     */
    public static function pairs(Schema $schema, array $target, array $source, string $prefix = ''): array
    {
        $strings = [];
        foreach ($schema->fields() as $field) {
            if (! $schema->isTranslatable($field)) {
                continue;
            }
            $handle = $field->handle;
            $from = $source[$handle] ?? null;
            if (($target[$handle] ?? null) === null) {
                if ($from === null) {
                    continue;
                }
                $target[$handle] = $from;
            }
            $path = $prefix.$handle;
            $value = $target[$handle];
            // A custom field type is translated as the built-in one it builds on.
            $type = $schema->type($field);
            $base = $type instanceof CustomField ? $type->baseType() : $field->type;
            if ($base === 'link') {
                // Only the link's text: where it goes stays the source's.
                $text = is_array($from) ? ($from['label'] ?? null) : null;
                if (is_string($text) && trim($text) !== '') {
                    $current = is_array($value) ? ($value['label'] ?? null) : null;
                    $strings[$path.'.label'] = ['source' => $text, 'current' => is_string($current) ? $current : null, 'rich' => false];
                }

                continue;
            }
            if (in_array($base, self::TYPES, true)) {
                if (is_string($from) && trim(strip_tags($from)) !== '') {
                    $strings[$path] = ['source' => $from, 'current' => is_string($value) ? $value : null, 'rich' => $base === 'rich_text'];
                }

                continue;
            }
            if (! is_array($value) || ! is_array($from)) {
                continue;
            }
            [$target[$handle], $nested] = match ($base) {
                Group::TYPE => self::pairs(Schema::children($field, $schema->depth()), $value, $from, $path.'.'),
                Repeater::TYPE => self::items($value, $from, '_id', $path, fn (array $row, array $sourceRow, string $at): array => self::pairs(Schema::children($field, $schema->depth()), $row, $sourceRow, $at.'.')),
                Flexible::TYPE => self::blocks($field, $schema, $value, $from, $path),
                default => [$value, []],
            };
            $strings += $nested;
        }

        return [$target, $strings];
    }

    /**
     * The strings of some data on its own: what pairs() finds against itself.
     *
     * @param  array<mixed>  $data
     * @return array<string, array{source: string, current: string|null, rich: bool}>
     */
    public static function collect(Schema $schema, array $data): array
    {
        return self::pairs($schema, $data, $data)[1];
    }

    /**
     * @param  array<mixed>  $blocks
     * @param  array<mixed>  $source
     * @return array{0: array<mixed>, 1: array<string, array{source: string, current: string|null, rich: bool}>}
     */
    private static function blocks(Field $field, Schema $schema, array $blocks, array $source, string $path): array
    {
        if ($schema->depth() >= Schema::MAX_DEPTH) {
            return [$blocks, []];
        }

        return self::items($blocks, $source, 'id', $path, function (array $block, array $sourceBlock, string $at) use ($schema): array {
            $type = $block['type'] ?? null;
            $fields = is_string($type) && $type === ($sourceBlock['type'] ?? null) ? app(Fieldsets::class)->fields($type) : null;
            if ($fields === null || ! is_array($block['values'] ?? null) || ! is_array($sourceBlock['values'] ?? null)) {
                return [$block, []];
            }
            [$block['values'], $strings] = self::pairs(Schema::make($fields, $schema->depth() + 1), $block['values'], $sourceBlock['values'], $at.'.values.');

            return [$block, $strings];
        });
    }

    /**
     * Each row or block with the source's of the same id (one without an id: of the same position).
     *
     * @param  array<mixed>  $items
     * @param  array<mixed>  $source
     * @param  \Closure(array<mixed>, array<mixed>, string): array{0: array<mixed>, 1: array<string, array{source: string, current: string|null, rich: bool}>}  $pair
     * @return array{0: array<mixed>, 1: array<string, array{source: string, current: string|null, rich: bool}>}
     */
    private static function items(array $items, array $source, string $id, string $path, \Closure $pair): array
    {
        $byId = [];
        foreach ($source as $item) {
            if (is_array($item) && is_string($item[$id] ?? null)) {
                $byId[$item[$id]] = $item;
            }
        }
        $sourceList = array_values($source);
        $strings = [];
        foreach ($items as $index => $item) {
            if (! is_array($item)) {
                continue;
            }
            // By id; by position only an item without one (a row or block of the translation's own is never another's).
            $match = is_string($item[$id] ?? null)
                ? $byId[$item[$id]] ?? null
                : (is_int($index) && is_array($sourceList[$index] ?? null) ? $sourceList[$index] : null);
            if ($match !== null) {
                [$items[$index], $nested] = $pair($item, $match, $path.'.'.$index);
                $strings += $nested;
            }
        }

        return [$items, $strings];
    }
}
