<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

/**
 * Running totals of a ContentTranslator.
 *
 * @api
 */
final class TranslationStats
{
    /** Strings translated and saved. */
    public int $translated = 0;

    /** Strings left alone: translated already. */
    public int $skipped = 0;

    /** Strings that would be sent (dry run). */
    public int $pending = 0;

    public int $failed = 0;

    /** @var list<string> */
    public array $errors = [];
}
