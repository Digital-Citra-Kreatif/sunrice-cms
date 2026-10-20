<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Settings\SwitchMainLanguage;
use Sunrice\Cms\Support\Locales;

/** Makes another content language the main one, moving what's stored (SwitchMainLanguage). */
final class SwitchMainLanguageCommand extends Command
{
    protected $signature = 'sunrice:switch-main-language
        {locale : The language to make the main one, e.g. id}
        {--dry-run : Only tell what would change}
        {--copy-missing : Give entries and terms without that language a copy of the current main one}
        {--force : Don\'t ask for confirmation}';

    protected $description = 'Make another content language the main one, moving the shared values and addresses';

    public function handle(SwitchMainLanguage $switch): int
    {
        $to = (string) $this->argument('locale');
        $from = Locales::default();
        try {
            $report = $switch->report($to);
        } catch (ValidationException $e) {
            $this->components->error(implode(' ', $e->validator->errors()->all()));

            return self::FAILURE;
        }

        $this->components->info('From '.Locales::name($from)." ({$from}) to ".Locales::name($to)." ({$to})");
        $this->components->twoColumnDetail('Entries in '.$from, (string) $report['entries']);
        $this->components->twoColumnDetail("… without {$to}", (string) $report['missing_entries']);
        $this->components->twoColumnDetail('Terms in '.$from, (string) $report['terms']);
        $this->components->twoColumnDetail("… without {$to}", (string) $report['missing_terms']);
        $this->components->twoColumnDetail('Global sets', (string) $report['globals']);
        $this->components->twoColumnDetail('Listing pages', (string) $report['listings']);
        $this->newLine();
        $this->line("  Afterwards {$to} pages are at the plain addresses (/{$to}/… redirects there) and {$from} pages at /{$from}/…, their old addresses redirecting.");
        $this->newLine();

        $missing = $report['missing_entries'] + $report['missing_terms'];
        if ($missing > 0 && ! $this->option('copy-missing')) {
            $this->components->error("{$missing} entries and terms have no {$to} translation. Translate them first, or run again with --copy-missing to copy the {$from} ones into it.");

            return self::FAILURE;
        }
        if ($this->option('dry-run')) {
            $this->components->info('Dry run: nothing changed.');

            return self::SUCCESS;
        }
        if (! $this->option('force') && ! $this->confirm('Back up the database first. Switch the main language now?')) {
            $this->components->warn('Nothing changed.');

            return self::FAILURE;
        }

        try {
            $counts = $switch->handle($to, (bool) $this->option('copy-missing'));
        } catch (ValidationException $e) {
            $this->components->error(implode(' ', $e->validator->errors()->all()));

            return self::FAILURE;
        }
        $this->components->twoColumnDetail('Entries moved', (string) $counts['entries']);
        $this->components->twoColumnDetail("Entries copied from {$from}", (string) $counts['copied_entries']);
        $this->components->twoColumnDetail('Terms moved', (string) $counts['terms']);
        $this->components->twoColumnDetail("Terms copied from {$from}", (string) $counts['copied_terms']);
        $this->components->twoColumnDetail('Global sets moved', (string) $counts['globals']);
        $this->components->twoColumnDetail('Listing pages moved', (string) $counts['listings']);
        $this->components->twoColumnDetail('Menu labels filled in', (string) $counts['menu_items']);
        $this->components->twoColumnDetail('Redirects written', (string) $counts['redirects']);
        $this->components->info(Locales::name($to)." ({$to}) is the main language now.");

        return self::SUCCESS;
    }
}
