<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

/**
 * Running totals of a sunrice:translate run.
 *
 * @internal
 */
final class TranslationStats
{
    public int $translated = 0;

    /** Strings left alone: they're translated already. */
    public int $skipped = 0;

    /** Strings a dry run would send. */
    public int $pending = 0;

    public int $failed = 0;
}
