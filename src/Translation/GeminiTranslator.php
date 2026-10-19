<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Illuminate\Support\Facades\Http;
use RuntimeException;

/**
 * Google's Gemini API.
 *
 * @internal
 */
final class GeminiTranslator extends LlmTranslator
{
    protected function complete(string $system, string $user): string
    {
        $response = Http::timeout($this->timeout)->retry(2, 1000, throw: false)
            ->withHeaders(['x-goog-api-key' => $this->key])
            ->post('https://generativelanguage.googleapis.com/v1beta/models/'.rawurlencode($this->model).':generateContent', [
                'systemInstruction' => ['parts' => [['text' => $system]]],
                'contents' => [['role' => 'user', 'parts' => [['text' => $user]]]],
                'generationConfig' => ['responseMimeType' => 'application/json', 'temperature' => 0.2],
            ]);
        if ($response->failed()) {
            throw new RuntimeException('Gemini answered '.$response->status().'.');
        }
        $text = $response->json('candidates.0.content.parts.0.text');

        return is_string($text) ? $text : '';
    }
}
