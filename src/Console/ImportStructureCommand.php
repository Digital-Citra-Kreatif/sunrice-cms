<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use InvalidArgumentException;
use Sunrice\Cms\Actions\Structure\ImportStructure;
use Sunrice\Cms\Support\ImportReport;

/**
 * sunrice:import-structure — makes what a definition file (PHP returning
 * an array, or JSON) describes (ImportStructure). Safe to run again.
 *
 * @internal
 */
final class ImportStructureCommand extends Command
{
    protected $signature = 'sunrice:import-structure
        {file : A .php file returning the definition, or a .json file}
        {--dry-run : Say what would happen, saving nothing}
        {--force : Overwrite what is there but differs from the definition}';

    protected $description = 'Make collections, blueprints, taxonomies and more from a definition file';

    public function handle(ImportStructure $import): int
    {
        $file = (string) $this->argument('file');
        if (! is_file($file)) {
            $this->components->error("There's no file {$file}.");

            return self::FAILURE;
        }
        $definition = str_ends_with(strtolower($file), '.json') ? json_decode((string) file_get_contents($file), true) : require $file;
        if (! is_array($definition)) {
            $this->components->error('The file must return (or hold) a definition array.');

            return self::FAILURE;
        }

        try {
            $report = $import->handle($definition, (bool) $this->option('dry-run'), (bool) $this->option('force'));
        } catch (InvalidArgumentException $e) {
            $this->components->error($e->getMessage().' Nothing was saved.');

            return self::FAILURE;
        }

        $this->table(['', 'Handle', 'Result', 'Differences'], array_map(fn (array $item): array => [
            $item['type'], $item['handle'], $item['status'],
            implode(', ', array_slice($item['differences'], 0, 5)).(count($item['differences']) > 5 ? ', …' : ''),
        ], $report->items()));
        if ($report->dryRun) {
            $this->components->info('Dry run: nothing was saved.');
        }
        if ($report->items(ImportReport::CHANGED) !== []) {
            $this->components->warn('Some are there but differ from the definition, and were left as they are. --force overwrites them.');
        }

        return self::SUCCESS;
    }
}
