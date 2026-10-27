<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Str;
use Sunrice\Cms\Fields\CustomField;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Fields\Types\Flexible;
use Sunrice\Cms\Fields\Types\Group;
use Sunrice\Cms\Fields\Types\Repeater;

/**
 * An entry's field text for site search: the words in its values (rich
 * text without its tags), not field handles, ids, addresses or SEO. Given
 * the fields, as the page shows them: rows and blocks hidden from the site
 * are left out, and so are what Sunrice keeps beside the values (a block's
 * id, kind and key, a link's kind: only a link's text counts).
 *
 * @internal
 */
final class SearchText
{
    /**
     * Longer text is cut: 20,000 characters is a few thousand words, more
     * than a page shows, and keeps the full-text index (and on SQLite the
     * scan) small. What's cut is text far down a page, found through its
     * title and first words anyway.
     */
    private const MAX = 20000;

    /** @param array<mixed> $data */
    public static function of(array $data, ?Schema $schema = null): ?string
    {
        unset($data[Seo::KEY]);
        $words = [];
        $schema === null ? self::collect($data, $words) : self::fields($schema, $data, $words);
        $text = Str::squish(implode(' ', $words));

        return $text === '' ? null : mb_substr($text, 0, self::MAX);
    }

    /**
     * @param  array<mixed>  $values
     * @param  list<string>  $words
     */
    private static function collect(array $values, array &$words): void
    {
        foreach ($values as $key => $value) {
            // Rows' own keys (_id, _key, _type) aren't content.
            if (is_string($key) && str_starts_with($key, '_')) {
                continue;
            }
            if (is_array($value)) {
                self::collect($value, $words);
            } elseif (is_string($value) && $value !== '' && ! preg_match('#^(https?://|/|mailto:|tel:)\S*$#i', $value)) {
                $words[] = html_entity_decode(strip_tags(str_replace(['<br', '</p>', '</li>', '</h'], [' <br', ' </p>', ' </li>', ' </h'], $value)), ENT_QUOTES | ENT_HTML5);
            }
        }
    }

    /**
     * The words of values by their fields; values under handles the fields
     * don't have count as they are.
     *
     * @param  array<mixed>  $values
     * @param  list<string>  $words
     */
    private static function fields(Schema $schema, array $values, array &$words): void
    {
        $known = [];
        foreach ($schema->fields() as $field) {
            $known[$field->handle] = true;
            $value = $values[$field->handle] ?? null;
            if ($value === null) {
                continue;
            }
            $type = $schema->type($field);
            $base = $type instanceof CustomField ? $type->baseType() : $field->type;
            if ($base === Group::TYPE && is_array($value)) {
                self::fields(Schema::children($field, $schema->depth()), $value, $words);
            } elseif ($base === Repeater::TYPE && is_array($value)) {
                foreach ($value as $row) {
                    if (is_array($row) && ($row['_hidden'] ?? false) !== true) {
                        self::fields(Schema::children($field, $schema->depth()), $row, $words);
                    }
                }
            } elseif ($base === Flexible::TYPE && is_array($value)) {
                foreach ($value as $block) {
                    if (! is_array($block) || ! is_string($block['type'] ?? null) || ($block['hidden'] ?? false) === true || ! is_array($block['values'] ?? null)) {
                        continue;
                    }
                    // A block whose fieldset is gone keeps its values, as templates get them.
                    $fields = app(Fieldsets::class)->fields($block['type']);
                    $fields === null ? self::collect($block['values'], $words) : self::fields(Schema::make($fields, $schema->depth() + 1), $block['values'], $words);
                }
            } elseif ($base === 'link') {
                if (is_array($value) && is_string($value['label'] ?? null)) {
                    self::collect([$value['label']], $words);
                }
            } else {
                self::collect([$value], $words);
            }
        }
        self::collect(array_diff_key($values, $known), $words);
    }
}
