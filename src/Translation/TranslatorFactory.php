<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use RuntimeException;

/**
 * The configured translator, from config sunrice-cms.translation: driver
 * (gemini, openrouter or null for none), model (null: the driver's
 * default), the drivers' keys, batch_size and timeout. An app may bind
 * its own Translator in the container instead.
 *
 * @api
 */
final class TranslatorFactory
{
    public const DRIVERS = ['gemini', 'openrouter'];

    /** Whether machine translation is set up (a driver and its key, or a Translator bound by the app). */
    public function configured(): bool
    {
        if (app()->bound(Translator::class)) {
            return true;
        }
        $driver = self::string('driver');

        return in_array($driver, self::DRIVERS, true) && self::string("{$driver}_key") !== null;
    }

    /**
     * @param  string|null  $driver  null: the configured one
     * @param  string|null  $model  null: the configured one, else the driver's default
     *
     * @throws RuntimeException when none is set up
     */
    public function make(?string $driver = null, ?string $model = null): Translator
    {
        if ($driver === null && app()->bound(Translator::class)) {
            return app(Translator::class);
        }
        $driver ??= self::string('driver');
        $batch = config('sunrice-cms.translation.batch_size', 40);
        $timeout = config('sunrice-cms.translation.timeout', 120);
        $batch = is_numeric($batch) ? (int) $batch : 40;
        $timeout = is_numeric($timeout) ? (int) $timeout : 120;
        $model ??= self::string('model');
        $key = $driver === null ? '' : (self::string("{$driver}_key") ?? '');

        return match ($driver) {
            'gemini' => new GeminiTranslator($key, $model ?? GeminiTranslator::DEFAULT_MODEL, $batch, $timeout),
            'openrouter' => new OpenRouterTranslator($key, $model ?? OpenRouterTranslator::DEFAULT_MODEL, $batch, $timeout),
            default => throw new RuntimeException('Machine translation isn\'t set up: set SUNRICE_TRANSLATE_DRIVER to gemini or openrouter, and its key (see docs/translation.md in sunrice/cms).'),
        };
    }

    private static function string(string $key): ?string
    {
        $value = config("sunrice-cms.translation.{$key}");

        return is_string($value) && $value !== '' ? $value : null;
    }
}
