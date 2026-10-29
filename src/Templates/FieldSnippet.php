<?php

declare(strict_types=1);

namespace Sunrice\Cms\Templates;

use Sunrice\Cms\Fields\CustomField;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Support\Locales;

/**
 * The Blade that prints fields as templates get them (fields.md: Field
 * types), each guarded so an empty value prints nothing: text escaped,
 * rich text as is (cleaned when saved), dates and numbers formatted,
 * media as images with their alt text and srcset, links, linked entries
 * and terms with their URLs, groups, repeaters' rows and flexible blocks
 * (each kind with its view, cms/blocks/{fieldset}.blade.php). A custom
 * type prints as the built-in type it's built on.
 *
 * `$source` is the PHP expression the fields are read from: `$values`,
 * a row (`$row`), a block (`$block`) or a group (`$values['hero']`).
 *
 * @internal
 */
final class FieldSnippet
{
    /** @var list<string> the fieldsets used as kinds of block by the fields printed so far */
    private array $blocks = [];

    public function __construct(private readonly FieldTypes $types) {}

    /**
     * The fieldsets used as blocks by the fields printed since the last
     * call (their views: cms/blocks/{handle}.blade.php).
     *
     * @return list<string>
     */
    public function takeBlocks(): array
    {
        [$blocks, $this->blocks] = [$this->blocks, []];

        return array_values(array_unique($blocks));
    }

    /**
     * @param  list<Field>  $fields
     * @param  int  $depth  how many repeaters and flexible fields these are inside (names their loops' variables)
     */
    public function fields(array $fields, string $source, int $depth = 0): string
    {
        $parts = [];
        foreach ($fields as $field) {
            $snippet = $this->field($field, $source, $depth);
            if ($snippet !== '') {
                $parts[] = $snippet;
            }
        }

        return implode("\n", $parts);
    }

    public function field(Field $field, string $source, int $depth = 0): string
    {
        [$type, $field] = $this->base($field);
        $value = $source."['".$field->handle."']";
        $label = self::label($field);
        $class = 'field field-'.$field->handle;

        return match ($type) {
            'text' => "@if (filled({$value} ?? null))\n    <p class=\"{$class}\">{{ {$value} }}</p>\n@endif",
            // Escaped, its line breaks kept.
            'textarea' => "@if (filled({$value} ?? null))\n    <p class=\"{$class}\">{!! nl2br(e({$value})) !!}</p>\n@endif",
            // Rich text is cleaned when it's saved: the only HTML printed as is.
            'rich_text' => "@if (filled({$value} ?? null))\n    <div class=\"prose {$class}\">{!! {$value} !!}</div>\n@endif",
            'code' => $this->code($field, $value),
            'number' => "@if (is_numeric({$value} ?? null))\n    <p class=\"{$class}\"><span class=\"field-label\">{$label}:</span> ".self::text($field->configString('prefix') ?? '')."{{ {$value} }}".self::text($field->configString('suffix') ?? '')."</p>\n@endif",
            'toggle' => "@if (is_bool({$value} ?? null))\n    <p class=\"{$class}\"><span class=\"field-label\">{$label}:</span> {{ {$value} ? __('Yes') : __('No') }}</p>\n@endif",
            'select' => $this->select($field, $value, $label, $class),
            'date' => "@if (({$value} ?? null) instanceof \\Carbon\\CarbonInterface)\n    <p class=\"{$class}\"><span class=\"field-label\">{$label}:</span> <time datetime=\"{{ {$value}->toAtomString() }}\">{{ {$value}->translatedFormat('".($field->configBool('time') ? 'j F Y, H:i' : 'j F Y')."') }}</time></p>\n@endif",
            'link' => "@if (is_array({$value} ?? null) && filled({$value}['url']))\n    <p class=\"{$class}\"><a href=\"{{ {$value}['url'] }}\"@if ({$value}['new_tab']) target=\"_blank\"@endif @if ({$value}['rel'])rel=\"{{ {$value}['rel'] }}\"@endif>{{ {$value}['label'] ?? {$value}['title'] ?? {$value}['url'] }}</a></p>\n@endif",
            'media' => $this->media($field, $value, $class),
            'entries' => $this->entries($field, $value, $label, $class),
            'terms' => $this->terms($field, $value, $label, $class),
            'group' => "@if (is_array({$value} ?? null) && array_filter({$value}, fn (\$part) => filled(\$part)) !== [])\n    <div class=\"group {$class}\">\n".self::indent($this->fields($field->fields, $value, $depth), 8)."\n    </div>\n@endif",
            'repeater' => $this->repeater($field, $value, $class, $depth),
            'flexible' => $this->flexible($field, $value, $depth),
            default => "{{-- \"{$field->handle}\" (".self::comment($type).'): a field type this command doesn\'t know; print it here. --}}'
                ."\n@if (is_scalar({$value} ?? null))\n    <p class=\"{$class}\">{{ {$value} }}</p>\n@endif",
        };
    }

    /** The built-in type a field prints as (a custom type's base). */
    public function typeOf(Field $field): string
    {
        return $this->base($field)[0];
    }

    /**
     * The built-in type a field prints as (a custom type's base, its
     * presets under the field's own settings), and the field so.
     *
     * @return array{string, Field}
     */
    private function base(Field $field): array
    {
        $type = $field->type;
        $config = $field->config;
        $seen = [];
        while ($this->types->has($type) && ($custom = $this->types->get($type)) instanceof CustomField && ! in_array($type, $seen, true)) {
            $seen[] = $type;
            $config = [...$custom->preset(), ...$config];
            $type = $custom->baseType();
        }

        return [$type, $field->withConfig($config)];
    }

    private function code(Field $field, string $value): string
    {
        $language = $field->configString('language') ?? 'plain';
        $attribute = $language === 'plain' || preg_match('/^[a-z]+$/', $language) !== 1 ? '' : " language=\"{$language}\"";

        // Shown as code, escaped: never printed as HTML.
        return "@if (filled({$value} ?? null))\n    <x-sunrice-cms::code-block :value=\"{$value}\"{$attribute} />\n@endif";
    }

    private function select(Field $field, string $value, string $label, string $class): string
    {
        $options = [];
        foreach ($field->options(Locales::default()) as $option) {
            // A value Blade would read as its own syntax can't be written here: it prints as it is.
            if (preg_match('/[@{}]/', $option['value']) !== 1) {
                $options[$option['value']] = self::plain($option['label']);
            }
        }

        // The options' labels, by value (a value no longer an option prints as it is). No @php block: Blade would pair it with an @php( above.
        return "@if (filled({$value} ?? null))\n"
            ."    <p class=\"{$class}\"><span class=\"field-label\">{$label}:</span> {{ collect((array) {$value})->map(fn (\$option) => __(".self::export($options)."[\$option] ?? (string) \$option))->implode(', ') }}</p>\n@endif";
    }

    private function media(Field $field, string $value, string $class): string
    {
        if (! $field->configBool('multiple')) {
            return "@if ((\$media = {$value} ?? null) instanceof \\Sunrice\\Admin\\Media\\Media)\n".self::indent(self::file('$media', "figure class=\"{$class}\""), 4)."\n@endif";
        }

        return "@if (filled({$value} ?? null))\n    <ul class=\"gallery {$class}\">\n        @foreach ({$value} as \$media)\n"
            .self::indent(self::file('$media', 'li'), 12)."\n        @endforeach\n    </ul>\n@endif";
    }

    /** A file: an image (its alt text, srcset, size and caption), else a link to it. */
    private static function file(string $media, string $tag): string
    {
        $name = explode(' ', $tag)[0];

        return "<{$tag}>\n"
            ."    @if ({$media}->isImage())\n"
            ."        <img src=\"{{ {$media}->url('large') }}\"@if ({$media}->srcset() !== '') srcset=\"{{ {$media}->srcset() }}\" sizes=\"(min-width: 60rem) 60rem, 100vw\"@endif"
            ." @if ({$media}->width && {$media}->height) width=\"{{ {$media}->width }}\" height=\"{{ {$media}->height }}\"@endif alt=\"{{ {$media}->altIn() ?? '' }}\" loading=\"lazy\">\n"
            ."        @if (filled({$media}->captionIn()))\n"
            .($name === 'figure' ? "            <figcaption>{{ {$media}->captionIn() }}</figcaption>\n" : "            <span class=\"caption\">{{ {$media}->captionIn() }}</span>\n")
            ."        @endif\n"
            ."    @else\n"
            ."        <a href=\"{{ {$media}->url() }}\">{{ {$media}->title ?? {$media}->filename }}</a>\n"
            ."    @endif\n"
            ."</{$name}>";
    }

    private function entries(Field $field, string $value, string $label, string $class): string
    {
        $link = '@if ($linked->url())<a href="{{ $linked->url() }}">{{ $linked->title }}</a>@else{{ $linked->title }}@endif';
        if (! $field->configBool('multiple')) {
            return "@if ((\$linked = {$value} ?? null) instanceof \\Sunrice\\Cms\\Models\\EntryTranslation)\n    <p class=\"{$class}\"><span class=\"field-label\">{$label}:</span> {$link}</p>\n@endif";
        }

        return "@if (filled({$value} ?? null))\n    <div class=\"{$class}\">\n        <p class=\"field-label\">{$label}</p>\n        <ul>\n            @foreach ({$value} as \$linked)\n                <li>{$link}</li>\n            @endforeach\n        </ul>\n    </div>\n@endif";
    }

    private function terms(Field $field, string $value, string $label, string $class): string
    {
        $link = '@if ($linkedTerm->url())<a href="{{ $linkedTerm->url() }}">{{ $linkedTerm->title() }}</a>@else{{ $linkedTerm->title() }}@endif';
        if (! $field->configBool('multiple')) {
            return "@if ((\$linkedTerm = {$value} ?? null) instanceof \\Sunrice\\Cms\\Models\\Term)\n    <p class=\"{$class}\"><span class=\"field-label\">{$label}:</span> {$link}</p>\n@endif";
        }

        return "@if (filled({$value} ?? null))\n    <p class=\"{$class}\"><span class=\"field-label\">{$label}:</span>\n        @foreach ({$value} as \$linkedTerm)\n            {$link} @unless (\$loop->last), @endunless\n        @endforeach\n    </p>\n@endif";
    }

    private function repeater(Field $field, string $value, string $class, int $depth): string
    {
        $row = '$row'.($depth === 0 ? '' : $depth + 1);

        return "@if (filled({$value} ?? null))\n    <ul class=\"rows {$class}\">\n        @foreach ({$value} as {$row})\n            <li>\n"
            .self::indent($this->fields($field->fields, $row, $depth + 1), 16)
            ."\n            </li>\n        @endforeach\n    </ul>\n@endif";
    }

    private function flexible(Field $field, string $value, int $depth): string
    {
        array_push($this->blocks, ...$field->configStrings('blocks'));
        $block = '$section'.($depth === 0 ? '' : $depth + 1);

        // Each kind of block prints with its view, cms/blocks/{fieldset}.blade.php (a kind without one prints nothing).
        return "@if (filled({$value} ?? null))\n    @foreach ({$value} as {$block})\n"
            ."        <section class=\"block block-{{ {$block}->type }}\"@if ({$block}->key) id=\"{{ {$block}->key }}\"@endif>\n"
            ."            @includeIf('cms.blocks.'.{$block}->type, ['block' => {$block}])\n"
            ."        </section>\n    @endforeach\n@endif";
    }

    /** A field's label, in __() so the app's lang files can translate it. */
    private static function label(Field $field): string
    {
        return '{{ __('.self::export(self::plain($field->displayLabel())).') }}';
    }

    /** Text without what Blade would read as its own syntax ({{ }}, @directives) or a line break. */
    public static function plain(string $text): string
    {
        return trim((string) preg_replace('/\s+/', ' ', str_replace(['{', '}', '@'], '', $text)));
    }

    /** Text for a {{-- comment --}}. */
    public static function comment(string $text): string
    {
        return trim((string) preg_replace(['/-{2,}/', '/\s+/'], ['-', ' '], $text));
    }

    /** Fixed text in the HTML, escaped, with nothing Blade would compile. */
    public static function text(string $text): string
    {
        return str_replace(['@', '{', '}'], ['&#64;', '&#123;', '&#125;'], htmlspecialchars($text, ENT_QUOTES));
    }

    /** A PHP literal. */
    public static function export(mixed $value): string
    {
        if (is_array($value)) {
            $items = [];
            foreach ($value as $key => $item) {
                $items[] = self::export($key).' => '.self::export($item);
            }

            return '['.implode(', ', $items).']';
        }

        return var_export($value, true);
    }

    public static function indent(string $blade, int $spaces): string
    {
        $pad = str_repeat(' ', $spaces);

        return implode("\n", array_map(fn (string $line): string => $line === '' ? '' : $pad.$line, explode("\n", $blade)));
    }
}
