<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;

/**
 * Code, edited in the panel's code editor: an embed, a snippet shown on a
 * page, a bit of JSON. Settings: language (html, css, javascript, json,
 * plain: what the editor highlights), max (characters), placeholder.
 *
 * Stored and handed to templates as the text typed, never cleaned: `{{ }}`
 * shows it as text and <x-sunrice-cms::code-block> as a code block.
 * Printing it with `{!! !!}` runs it on the page, for editors you would
 * trust with the site's own code. Shared by all languages unless the
 * field says otherwise, and never machine-translated.
 */
final class Code extends FieldType
{
    /** What the editor highlights, plain by default. */
    public const LANGUAGES = ['html', 'css', 'javascript', 'json', 'plain'];

    public function type(): string
    {
        return 'code';
    }

    public function rules(Field $field): array
    {
        return ['string', 'max:'.min($field->configInt('max') ?? 65535, 65535)];
    }

    /** Line endings made \n; spaces kept (indentation matters in code). */
    public function normalize(mixed $value, Field $field): mixed
    {
        return is_scalar($value) && trim((string) $value) !== '' ? str_replace("\r\n", "\n", (string) $value) : null;
    }

    public function settings(): array
    {
        return [
            new Field('language', 'select', 'Language', instructions: 'What the editor highlights.', config: [
                'options' => [
                    ['value' => 'html', 'label' => 'HTML'],
                    ['value' => 'css', 'label' => 'CSS'],
                    ['value' => 'javascript', 'label' => 'JavaScript'],
                    ['value' => 'json', 'label' => 'JSON'],
                    ['value' => 'plain', 'label' => __('Plain text')],
                ],
                'default' => 'plain',
            ]),
            new Field('max', 'number', 'Maximum characters', config: ['min' => 1, 'max' => 65535]),
            InputSettings::placeholder(),
        ];
    }

    /** The field's language, plain when it names none the editor knows. */
    public static function language(Field $field): string
    {
        $language = $field->configString('language');

        return in_array($language, self::LANGUAGES, true) ? $language : 'plain';
    }
}
