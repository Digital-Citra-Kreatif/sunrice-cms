<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use InvalidArgumentException;
use Sunrice\Cms\Actions\Languages\SwitchMainLanguage;
use Sunrice\Cms\Support\Locales;

/**
 * sunrice:switch-main-language — gets content ready for another language
 * to be the main one (see SwitchMainLanguage and docs/cms/translation.md).
 *
 * @internal
 */
final class SwitchMainLanguageCommand extends Command
{
    protected $signature = 'sunrice:switch-main-language
        {locale : The language to make the main one}
        {--copy-missing : Give entries and terms without that language a copy of the main language\'s}
        {--dry-run : Only say what blocks the switch and what changes}
        {--force : Don\'t ask}';

    protected $description = 'Make another language the main one, moving shared fields and redirecting addresses';

    public function handle(SwitchMainLanguage $switch): int
    {
        $to = (string) $this->argument('locale');
        $from = Locales::default();
        try {
            $report = $switch->report($to);
        } catch (InvalidArgumentException $e) {
            $this->components->error($e->getMessage());

            return self::FAILURE;
        }

        $this->components->info("Switching the main language from {$from} to {$to}");
        $this->rows("Entries with no {$to} version", $report['missing_entries']);
        $this->rows("Terms with no {$to} version", $report['missing_terms']);
        $this->rows("Entries live in {$from} but not published in {$to} (they won't be on the site at their main address)", $report['unpublished']);
        $this->newLine();
        $this->line("  • {$to} pages lose their /{$to} prefix; their old addresses redirect (301).");
        $this->line("  • {$from} pages move under /{$from}/…; their old addresses redirect (301).");
        $this->line("  • Fields shared by all languages (images, toggles…) are copied to {$to}, which keeps them from then on.");
        $this->newLine();

        $missing = count($report['missing_entries']) + count($report['missing_terms']);
        if ($missing > 0 && ! $this->option('copy-missing')) {
            $this->components->error("{$missing} entries and terms have no {$to} version. Translate them first (sunrice:translate --to={$to}), or run again with --copy-missing.");

            return self::FAILURE;
        }
        if ($this->option('dry-run')) {
            $this->components->info("Dry run: nothing changed. {$report['entries']} entries would be converted.");

            return self::SUCCESS;
        }
        if (! $this->option('force') && ! $this->confirm('Back up the database first. Convert the content now?')) {
            return self::FAILURE;
        }

        $stats = $switch->handle($to, (bool) $this->option('copy-missing'));
        $this->components->twoColumnDetail('Entries converted', (string) $stats['entries']);
        $this->components->twoColumnDetail("Entries copied from {$from}", (string) $stats['copied_entries']);
        $this->components->twoColumnDetail("Terms copied from {$from}", (string) $stats['copied_terms']);
        $this->components->twoColumnDetail('Redirects', (string) $stats['redirects']);
        $order = implode(',', [$to, ...array_values(array_diff(Locales::all(), [$to]))]);
        $this->components->warn("Now make {$to} the first language: SUNRICE_LOCALES={$order} (sunrice-cms.locales). Until then the site stays as it was.");

        return self::SUCCESS;
    }

    /** @param list<string> $rows */
    private function rows(string $title, array $rows): void
    {
        if ($rows === []) {
            return;
        }
        $this->newLine();
        $this->line("  <fg=yellow>{$title} (".count($rows).'):</>');
        foreach (array_slice($rows, 0, 50) as $row) {
            $this->line("    {$row}");
        }
        if (count($rows) > 50) {
            $this->line('    … and '.(count($rows) - 50).' more');
        }
    }
}
