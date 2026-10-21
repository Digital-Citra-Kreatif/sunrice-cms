<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Support\Str;
use Sunrice\Cms\Fields\CustomField;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Fields\Types\Link;
use Sunrice\Cms\Support\FieldText;

/**
 * Field values as text for the entries CSV (EntryList::export()): what an
 * editor reads, not how it's stored. Links are their address, terms and
 * linked entries their titles, rich text plain text with a line per
 * paragraph, heading or list item. Groups, repeater rows and flexible
 * blocks are "Label: value" pairs (a row or block per line), without the
 * keys Sunrice keeps for itself (_id, _key, _hidden); a row or block
 * hidden from the site says so.
 *
 * @internal
 */
final class ExportText
{
    private const MAX_DEPTH = 10;

    /**
     * @param  array<int, string>  $entries  linked entries' titles, by id
     * @param  array<int, string>  $terms  terms' titles, by id
     */
    public function __construct(
        private readonly array $entries,
        private readonly array $terms,
        private readonly HydrationContext $context,
    ) {}

    public function text(mixed $value, Field $field, Schema $schema, int $depth = 0): string
    {
        $type = $schema->type($field);
        $base = $type instanceof CustomField ? $type->baseType() : $type->type();

        return match ($base) {
            'link' => (string) ((new Link)->hydrate($value, $field, $this->context)['url'] ?? ''),
            'rich_text' => self::plain($value),
            'terms' => self::titles($value, $this->terms),
            'entries' => self::titles($value, $this->entries),
            'group' => is_array($value) && $depth < self::MAX_DEPTH ? $this->row($value, Schema::children($field, $schema->depth()), $depth + 1) : '',
            'repeater' => $depth < self::MAX_DEPTH ? $this->rows($value, Schema::children($field, $schema->depth()), $depth + 1) : '',
            'flexible' => $depth < self::MAX_DEPTH ? $this->blocks($value, $schema->depth(), $depth + 1) : '',
            default => FieldText::text($value, $field),
        };
    }

    /** Rich text without its tags: a line per paragraph, heading, list item or line break. */
    public static function plain(mixed $html): string
    {
        if (! is_string($html)) {
            return '';
        }
        $text = (string) preg_replace(['#<br\s*/?>#i', '#</(?:p|h[1-6]|li|blockquote|pre|div|tr|figcaption)>#i'], "\n", $html);
        $lines = array_map(Str::squish(...), explode("\n", html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5)));

        return implode("\n", array_values(array_filter($lines, fn (string $line): bool => $line !== '')));
    }

    /**
     * @param  array<int, string>  $titles
     */
    private static function titles(mixed $value, array $titles): string
    {
        $names = [];
        foreach (is_array($value) ? $value : [$value] as $id) {
            if (is_int($id) || (is_string($id) && ctype_digit($id))) {
                $names[] = $titles[(int) $id] ?? '#'.$id;
            }
        }

        return implode(', ', $names);
    }

    /** A repeater's rows, one per line. */
    private function rows(mixed $value, Schema $schema, int $depth): string
    {
        $lines = [];
        foreach (is_array($value) ? $value : [] as $row) {
            if (is_array($row)) {
                $line = $this->row($row, $schema, $depth);
                $lines[] = ($row['_hidden'] ?? false) === true ? '('.self::hidden().') '.$line : $line;
            }
        }

        return implode("\n", $lines);
    }

    /** Flexible blocks, one per line: "Hero: Heading: Homes …". */
    private function blocks(mixed $value, int $schemaDepth, int $depth): string
    {
        $fieldsets = app(Fieldsets::class);
        $lines = [];
        foreach (is_array($value) ? $value : [] as $block) {
            if (! is_array($block) || ! is_string($block['type'] ?? null)) {
                continue;
            }
            $values = is_array($block['values'] ?? null) ? $block['values'] : [];
            $fields = $fieldsets->fields($block['type']);
            $text = $fields === null ? '' : $this->row($values, Schema::make($fields, $schemaDepth + 1), $depth);
            $line = $fieldsets->title($block['type']).($text === '' ? '' : ': '.$text);
            $lines[] = ($block['hidden'] ?? false) === true ? '('.self::hidden().') '.$line : $line;
        }

        return implode("\n", $lines);
    }

    /**
     * A group's values or a row's: "Label: value; Label: value", only the
     * fields that have one, each on the row's line.
     *
     * @param  array<mixed>  $values
     */
    private function row(array $values, Schema $schema, int $depth): string
    {
        $parts = [];
        foreach ($schema->fields() as $field) {
            if (! array_key_exists($field->handle, $values)) {
                continue;
            }
            $text = trim(str_replace("\n", ' / ', $this->text($values[$field->handle], $field, $schema, $depth)));
            if ($text !== '') {
                $parts[] = FieldText::label($field).': '.$text;
            }
        }

        return implode('; ', $parts);
    }

    private static function hidden(): string
    {
        $said = __('hidden');

        return is_string($said) ? $said : 'hidden';
    }
}
