<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

/**
 * Machine translation of a batch of strings (TranslatorFactory makes the
 * configured one). Bind your own in the container to use another service.
 *
 * @api
 */
interface Translator
{
    /**
     * Translate strings, keys kept. A key missing from the result could
     * not be translated.
     *
     * @param  array<string, string>  $strings
     * @param  string|null  $context  what the strings are, for the model ("Blog entry “Hello”")
     * @return array<string, string>
     *
     * @throws \RuntimeException when the service can't be reached or answers nonsense
     */
    public function translate(array $strings, string $from, string $to, ?string $context = null): array;
}
