<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Translation\ContentTranslator;
use Sunrice\Cms\Translation\LangFileTranslator;
use Sunrice\Cms\Translation\TranslationStats;
use Sunrice\Cms\Translation\Translator;
use Sunrice\Cms\Translation\Translators;
use Throwable;

/**
 * sunrice:translate — machine-translates content and the app's language
 * files with a language model (see docs/cms/translation.md).
 *
 * @internal
 */
final class TranslateCommand extends Command
{
    private const PARTS = ['entries', 'terms', 'globals', 'menus', 'lang'];

    protected $signature = 'sunrice:translate
        {--to=* : Languages to translate into (default: all but the source)}
        {--from= : The language to translate from (default: the main one)}
        {--only=* : What to translate: entries, terms, globals, menus, lang (default: all)}
        {--collection=* : Only entries of these collections}
        {--force : Translate again what is translated already}
        {--dry-run : Count what would be translated, without sending anything}
        {--driver= : gemini or openrouter (default: sunrice-cms.translation.driver)}
        {--model= : The model (default: the configured one)}';

    protected $description = 'Machine-translate content and language files with a language model';

    public function handle(Translators $translators): int
    {
        $from = self::optional($this->option('from')) ?? Locales::default();
        $targets = self::strings($this->option('to')) ?: array_values(array_diff(Locales::all(), [$from]));
        $parts = self::strings($this->option('only')) ?: self::PARTS;
        $force = (bool) $this->option('force');
        $dryRun = (bool) $this->option('dry-run');

        if ($unknown = array_diff($parts, self::PARTS)) {
            $this->components->error('Unknown --only: '.implode(', ', $unknown).'. Use '.implode(', ', self::PARTS).'.');

            return self::FAILURE;
        }
        if ($unknown = array_diff([$from, ...$targets], Locales::all())) {
            $this->components->error('Not one of the site\'s languages: '.implode(', ', $unknown).'. They are '.implode(', ', Locales::all()).'.');

            return self::FAILURE;
        }
        $targets = array_values(array_diff($targets, [$from]));
        if ($targets === []) {
            $this->components->warn('Nothing to translate into: the site has one language (sunrice-cms.locales).');

            return self::SUCCESS;
        }
        if ($force && ! $dryRun && $this->input->isInteractive() && ! $this->confirm('--force translates again, replacing translations people may have edited. Continue?')) {
            return self::FAILURE;
        }

        try {
            $translator = $dryRun ? self::nothing() : $translators->make(self::optional($this->option('driver')), self::optional($this->option('model')));
        } catch (Throwable $e) {
            $this->components->error($e->getMessage());

            return self::FAILURE;
        }

        $stats = new TranslationStats;
        $report = fn (string $line) => $this->line("  {$line}");
        foreach ($targets as $to) {
            $this->components->info(($dryRun ? 'Checking' : 'Translating')." {$from} → {$to}");
            $content = (new ContentTranslator($translator, $from, $to, $force, $dryRun, $stats))->onProgress($report);
            if (in_array('entries', $parts, true)) {
                $content->entries(self::strings($this->option('collection')));
            }
            if (in_array('terms', $parts, true)) {
                $content->terms();
            }
            if (in_array('globals', $parts, true)) {
                $content->globals();
            }
            if (in_array('menus', $parts, true)) {
                $content->menus();
            }
            if (in_array('lang', $parts, true)) {
                (new LangFileTranslator($translator, $from, $to, $force, $dryRun, $stats))->onProgress($report)->translate();
            }
        }

        $this->newLine();
        if ($dryRun) {
            $this->components->info("Dry run: {$stats->pending} to translate, {$stats->skipped} translated already.");

            return self::SUCCESS;
        }
        $this->components->info("Translated {$stats->translated}, skipped {$stats->skipped} translated already, {$stats->failed} failed.");
        if ($stats->translated > 0 && in_array('entries', $parts, true)) {
            $this->line('  Entries were translated into their drafts: review and publish them in the admin.');
        }

        return $stats->failed > 0 ? self::FAILURE : self::SUCCESS;
    }

    private static function optional(mixed $value): ?string
    {
        return is_string($value) && $value !== '' ? $value : null;
    }

    /** @return list<string> */
    private static function strings(mixed $values): array
    {
        return array_values(array_filter(is_array($values) ? $values : [], fn (mixed $value): bool => is_string($value) && $value !== ''));
    }

    /** A dry run sends nothing. */
    private static function nothing(): Translator
    {
        return new class implements Translator
        {
            public function translate(array $strings, string $from, string $to, ?string $context = null): array
            {
                return [];
            }
        };
    }
}
