<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use RuntimeException;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Translation\ContentTranslator;
use Sunrice\Cms\Translation\LangFileTranslator;
use Sunrice\Cms\Translation\TranslationStats;
use Sunrice\Cms\Translation\Translator;
use Sunrice\Cms\Translation\TranslatorFactory;

/** Machine-translates content (ContentTranslator) and the app's language files (LangFileTranslator) into the other languages. */
final class TranslateCommand extends Command
{
    public const PARTS = ['entries', 'terms', 'globals', 'menus', 'lang'];

    /** What runs without --only: content, not the app's language files. */
    public const DEFAULT_PARTS = ['entries', 'terms', 'globals', 'menus'];

    protected $signature = 'sunrice:translate
        {--to=* : Languages to translate into (default: all but the source)}
        {--from= : The language to translate from (default: the main one)}
        {--only=* : entries, terms, globals, menus, lang (default: all but lang)}
        {--collection=* : Only entries of these collections (handles)}
        {--force : Translate again what is translated already}
        {--dry-run : Count what would be translated, without sending anything}';

    protected $description = 'Machine-translate content (entries into their drafts) and the app\'s language files into the other languages';

    public function handle(TranslatorFactory $factory): int
    {
        $from = $this->option('from');
        $from = is_string($from) && $from !== '' ? $from : Locales::default();
        $to = array_values(array_filter((array) $this->option('to'), is_string(...)));
        $to = array_values(array_diff($to === [] ? Locales::all() : $to, [$from]));
        $parts = array_values(array_filter((array) $this->option('only'), is_string(...)));
        $parts = $parts === [] ? self::DEFAULT_PARTS : $parts;
        $collections = array_values(array_filter((array) $this->option('collection'), is_string(...)));
        $dryRun = (bool) $this->option('dry-run');

        if (($unknown = array_diff($parts, self::PARTS)) !== []) {
            $this->components->error('Unknown --only: '.implode(', ', $unknown).'. Use '.implode(', ', self::PARTS).'.');

            return self::FAILURE;
        }
        if (($unknown = array_filter([$from, ...$to], fn (string $code): bool => ! Locales::has($code))) !== []) {
            $this->components->error('Not a content language: '.implode(', ', $unknown).'. They are '.implode(', ', Locales::all()).'.');

            return self::FAILURE;
        }
        if ($to === []) {
            $this->components->warn('There is no other language to translate into.');

            return self::SUCCESS;
        }
        try {
            $translator = $dryRun ? self::nothing() : $factory->make();
        } catch (RuntimeException $e) {
            $this->components->error($e->getMessage());

            return self::FAILURE;
        }

        $stats = new TranslationStats;
        foreach ($to as $locale) {
            $this->components->info(($dryRun ? 'Counting ' : 'Translating ').Locales::name($from).' → '.Locales::name($locale));
            $content = (new ContentTranslator($translator, $from, $locale, (bool) $this->option('force'), $dryRun, $stats))
                ->onProgress(fn (string $line) => $this->line("  {$line}"));
            in_array('entries', $parts, true) && $content->entries($collections);
            in_array('terms', $parts, true) && $content->terms();
            in_array('globals', $parts, true) && $content->globals();
            in_array('menus', $parts, true) && $content->menus();
            in_array('lang', $parts, true) && (new LangFileTranslator($translator, $from, $locale, (bool) $this->option('force'), $dryRun, $stats))
                ->onProgress(fn (string $line) => $this->line("  {$line}"))->translate();
        }

        $this->newLine();
        if ($dryRun) {
            $this->components->info("Dry run: {$stats->pending} texts would be translated, {$stats->skipped} are translated already.");

            return self::SUCCESS;
        }
        $this->components->info("Translated {$stats->translated} texts; {$stats->skipped} were translated already, {$stats->failed} failed.");
        if ($stats->translated > 0 && in_array('entries', $parts, true)) {
            $this->line('  Entries were translated into their drafts: check them in the editor, then publish.');
        }
        foreach ($stats->errors as $error) {
            $this->components->warn($error);
        }

        return $stats->failed > 0 || $stats->errors !== [] ? self::FAILURE : self::SUCCESS;
    }

    /** For a dry run: sends nothing. */
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
