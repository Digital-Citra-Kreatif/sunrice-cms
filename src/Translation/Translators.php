<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use InvalidArgumentException;

/**
 * The translator sunrice:translate uses: the one bound to Translator in
 * the container, else the configured driver (sunrice-cms.translation).
 *
 * @internal
 */
final class Translators
{
    public function make(?string $driver = null, ?string $model = null): Translator
    {
        if ($driver === null && app()->bound(Translator::class)) {
            return app(Translator::class);
        }
        $driver ??= self::string('driver') ?? 'gemini';
        $model ??= self::string('model') ?? self::string("{$driver}.model") ?? '';
        $key = self::string("{$driver}.key") ?? '';
        $batch = config('sunrice-cms.translation.batch_size', 40);
        $timeout = config('sunrice-cms.translation.timeout', 120);
        $batch = is_numeric($batch) ? (int) $batch : 40;
        $timeout = is_numeric($timeout) ? (int) $timeout : 120;

        return match ($driver) {
            'gemini' => new GeminiTranslator($key, $model, $batch, $timeout),
            'openrouter' => new OpenRouterTranslator($key, $model, $batch, $timeout),
            default => throw new InvalidArgumentException("Unknown translation driver \"{$driver}\": use gemini or openrouter."),
        };
    }

    private static function string(string $key): ?string
    {
        $value = config("sunrice-cms.translation.{$key}");

        return is_string($value) && $value !== '' ? $value : null;
    }
}
