<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use RuntimeException;

/**
 * Google's Gemini API (generateContent), with SUNRICE_GEMINI_KEY.
 *
 * @api
 */
final class GeminiTranslator extends LlmTranslator
{
    public const DEFAULT_MODEL = 'gemini-2.5-flash';

    protected function complete(string $system, string $user): string
    {
        $response = $this->http()->withHeaders(['x-goog-api-key' => $this->key])
            ->post('https://generativelanguage.googleapis.com/v1beta/models/'.rawurlencode($this->model).':generateContent', [
                'systemInstruction' => ['parts' => [['text' => $system]]],
                'contents' => [['role' => 'user', 'parts' => [['text' => $user]]]],
                'generationConfig' => ['responseMimeType' => 'application/json', 'temperature' => 0.2],
            ]);
        if ($response->failed()) {
            $message = $response->json('error.message');

            throw new RuntimeException('Gemini answered '.$response->status().(is_string($message) ? ": {$message}" : '.'));
        }
        $text = $response->json('candidates.0.content.parts.0.text');

        return is_string($text) ? $text : '';
    }
}
