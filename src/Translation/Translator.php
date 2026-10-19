<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

/**
 * Translates text from one language into another (sunrice:translate).
 *
 * @api
 */
interface Translator
{
    /**
     * Translates a batch of strings, keeping their keys. A key missing from
     * the result means that string couldn't be translated.
     *
     * @param  array<string, string>  $strings
     * @return array<string, string>
     */
    public function translate(array $strings, string $from, string $to, ?string $context = null): array;
}
