<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Locale;
use RuntimeException;

/**
 * Prompt, batching and answer parsing shared by the language-model
 * translators. Strings go out as a JSON object with short numeric keys
 * and must come back as one with the same keys.
 *
 * @internal
 */
abstract class LlmTranslator implements Translator
{
    public function __construct(
        protected readonly string $key,
        protected readonly string $model,
        protected readonly int $batchSize = 40,
        protected readonly int $timeout = 120,
    ) {
        if ($key === '') {
            throw new RuntimeException('Machine translation needs an API key: set it in sunrice-cms.translation (see docs/cms/translation.md).');
        }
    }

    /** Sends one prompt and returns the model's answer. */
    abstract protected function complete(string $system, string $user): string;

    public function translate(array $strings, string $from, string $to, ?string $context = null): array
    {
        $translated = [];
        foreach (array_chunk($strings, max(1, $this->batchSize), true) as $batch) {
            $keys = array_map(strval(...), array_keys($batch));
            $answer = $this->parse($this->complete(
                $this->prompt($from, $to, $context),
                (string) json_encode(array_values($batch), JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            ));
            foreach ($answer as $index => $value) {
                if (is_string($value) && is_numeric($index) && isset($keys[(int) $index])) {
                    $translated[$keys[(int) $index]] = $value;
                }
            }
        }

        return $translated;
    }

    protected function prompt(string $from, string $to, ?string $context): string
    {
        $source = self::language($from);
        $target = self::language($to);

        return <<<PROMPT
            You are a professional website translator. Translate every value of the JSON object from {$source} to {$target}.
            - Reply with a JSON object only, with exactly the same keys. Don't add, drop or rename keys, and add no explanations.
            - Keep HTML tags and attributes as they are; translate only the visible text.
            - Keep placeholders unchanged, such as :name, {name}, {{ name }}, %s and %d.
            - Keep Laravel pluralisation such as "{0} ...|{1} ...|[2,*] ...", including the | separators.
            - Keep addresses, email addresses, code and brand or product names unchanged.
            - Write natural, fluent text in the tone of the original.
            PROMPT.($context !== null ? "\nContext: {$context}" : '');
    }

    private static function language(string $code): string
    {
        $name = class_exists(Locale::class) ? Locale::getDisplayName($code, 'en') : '';

        return $name !== '' && $name !== $code ? "{$name} ({$code})" : $code;
    }

    /** @return array<mixed> */
    private function parse(string $answer): array
    {
        $json = trim($answer);
        // Some models wrap the JSON in a Markdown code fence.
        if (preg_match('/```(?:json)?\s*(.*?)\s*```/s', $json, $match) === 1) {
            $json = $match[1];
        }
        $decoded = json_decode($json, true);
        if (! is_array($decoded)) {
            throw new RuntimeException('The translation model did not answer with a JSON object.');
        }

        return $decoded;
    }
}
