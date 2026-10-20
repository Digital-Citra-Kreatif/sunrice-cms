<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use RuntimeException;
use Sunrice\Cms\Support\Locales;

/**
 * A translator on a language model: strings go in batches as a JSON
 * object with short keys and must come back with the same keys. HTML tags
 * are swapped for numbered placeholders on the way out and put back on
 * the way in, so the model can't add, drop or change markup: a string
 * that comes back without its placeholders, exactly once each, counts as
 * not translated.
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
            throw new RuntimeException(static::class.' needs an API key (see docs/translation.md in sunrice/cms).');
        }
    }

    /** Send one prompt and return the model's answer as text. */
    abstract protected function complete(string $system, string $user): string;

    public function translate(array $strings, string $from, string $to, ?string $context = null): array
    {
        $translated = [];
        foreach (array_chunk($strings, max(1, $this->batchSize), true) as $batch) {
            $keys = array_keys($batch);
            $tags = [];
            $payload = [];
            foreach (array_values($batch) as $i => $text) {
                [$payload[(string) $i], $tags[$i]] = self::mask($text);
            }
            $answer = $this->parse($this->complete(
                $this->prompt($from, $to, $context),
                (string) json_encode($payload, JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            ));
            foreach ($answer as $i => $text) {
                $index = is_int($i) ? $i : (ctype_digit($i) ? (int) $i : -1);
                if (is_string($text) && isset($keys[$index])) {
                    $restored = self::unmask($text, $tags[$index]);
                    if ($restored !== null) {
                        $translated[$keys[$index]] = $restored;
                    }
                }
            }
        }

        return $translated;
    }

    protected function http(): PendingRequest
    {
        // Tried again when the service is busy or out of reach, not when it refuses.
        return Http::timeout($this->timeout)->acceptJson()->retry(3, 1000, fn (\Throwable $e): bool => $e instanceof ConnectionException
            || ($e instanceof RequestException && $e->response->serverError()), throw: false);
    }

    protected function prompt(string $from, string $to, ?string $context): string
    {
        $source = Locales::name($from)." ({$from})";
        $target = Locales::name($to)." ({$to})";

        return "You translate website content. Translate every value of the JSON object from {$source} to {$target}.\n"
            ."- Answer with a JSON object only, with exactly the same keys. No explanations.\n"
            ."- Keep every placeholder like ⟦0⟧ exactly as it is, once, where it belongs in the sentence: they stand for formatting.\n"
            ."- Keep web addresses, email addresses, code, and brand and product names as they are.\n"
            ."- Use natural, fluent wording in the tone of the original.\n"
            .($context !== null && $context !== '' ? "Context: {$context}\n" : '');
    }

    /** @return array<array-key, mixed> */
    protected function parse(string $answer): array
    {
        $json = trim($answer);
        // Some models wrap JSON in a Markdown code fence.
        if (preg_match('/```(?:json)?\s*(.*?)\s*```/s', $json, $match) === 1) {
            $json = $match[1];
        }
        $decoded = json_decode($json, true);
        if (! is_array($decoded)) {
            throw new RuntimeException('The translation model did not answer with a JSON object.');
        }

        return $decoded;
    }

    /**
     * The text with its HTML tags swapped for ⟦0⟧, ⟦1⟧…, and the tags.
     *
     * @return array{0: string, 1: list<string>}
     */
    public static function mask(string $text): array
    {
        $tags = [];
        $masked = preg_replace_callback('/<[^>]*>/', function (array $match) use (&$tags): string {
            $tags[] = $match[0];

            return '⟦'.(count($tags) - 1).'⟧';
        }, $text);

        return [$masked ?? $text, $tags];
    }

    /**
     * The tags put back, or null when the placeholders didn't come back exactly once each.
     *
     * @param  list<string>  $tags
     */
    public static function unmask(string $text, array $tags): ?string
    {
        preg_match_all('/⟦(\d+)⟧/u', $text, $found);
        $numbers = array_map(intval(...), $found[1]);
        sort($numbers);
        if ($numbers !== array_keys($tags)) {
            return null;
        }

        return (string) preg_replace_callback('/⟦(\d+)⟧/u', fn (array $match): string => $tags[(int) $match[1]], $text);
    }
}
