<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Illuminate\Support\Facades\Http;
use RuntimeException;

/**
 * OpenRouter's chat completions, for any model it hosts.
 *
 * @internal
 */
final class OpenRouterTranslator extends LlmTranslator
{
    protected function complete(string $system, string $user): string
    {
        $response = Http::timeout($this->timeout)->retry(2, 1000, throw: false)
            ->withToken($this->key)
            ->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => $this->model,
                'messages' => [['role' => 'system', 'content' => $system], ['role' => 'user', 'content' => $user]],
                'response_format' => ['type' => 'json_object'],
                'temperature' => 0.2,
            ]);
        if ($response->failed()) {
            throw new RuntimeException('OpenRouter answered '.$response->status().'.');
        }
        $text = $response->json('choices.0.message.content');

        return is_string($text) ? $text : '';
    }
}
