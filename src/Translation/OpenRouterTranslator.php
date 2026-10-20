<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use RuntimeException;

/**
 * OpenRouter's chat completions, for any model it hosts, with SUNRICE_OPENROUTER_KEY.
 *
 * @api
 */
final class OpenRouterTranslator extends LlmTranslator
{
    public const DEFAULT_MODEL = 'google/gemini-2.5-flash';

    protected function complete(string $system, string $user): string
    {
        $name = config('app.name');
        $response = $this->http()->withToken($this->key)
            ->withHeaders(['HTTP-Referer' => url('/'), 'X-Title' => is_string($name) ? $name : 'Sunrice'])
            ->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => $this->model,
                'messages' => [['role' => 'system', 'content' => $system], ['role' => 'user', 'content' => $user]],
                'response_format' => ['type' => 'json_object'],
                'temperature' => 0.2,
            ]);
        if ($response->failed()) {
            $message = $response->json('error.message');

            throw new RuntimeException('OpenRouter answered '.$response->status().(is_string($message) ? ": {$message}" : '.'));
        }
        $text = $response->json('choices.0.message.content');

        return is_string($text) ? $text : '';
    }
}
