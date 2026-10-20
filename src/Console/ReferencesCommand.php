<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Cms\Actions\References\RebuildReferences;

/**
 * sunrice:references: rebuilds which entries and terms content points at,
 * and which media files it uses, from what is stored.
 *
 * @internal
 */
final class ReferencesCommand extends Command
{
    protected $signature = 'sunrice:references {--dry-run : Only count what would be recorded}';

    protected $description = 'Rebuild which entries, terms and media files content points at';

    public function handle(RebuildReferences $rebuild): int
    {
        $dryRun = (bool) $this->option('dry-run');
        $counts = $rebuild->handle($dryRun);

        $this->table(['Rebuilt', $dryRun ? 'Would be' : 'Count'], array_map(fn (string $what, int $count): array => [$what, (string) $count], array_keys($counts), $counts));
        $dryRun
            ? $this->components->info('Dry run: nothing was changed.')
            : $this->components->info("Rebuilt {$counts['references']} references from {$counts['entries']} entry translations, {$counts['terms']} term translations and {$counts['globals']} global values.");

        return self::SUCCESS;
    }
}
