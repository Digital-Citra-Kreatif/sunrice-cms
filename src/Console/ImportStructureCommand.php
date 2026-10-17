<?php

declare(strict_types=1);

namespace Sunrice\Console;

use Illuminate\Console\Command;
use Sunrice\Structure\ImportReport;
use Sunrice\Structure\StructureImportFailed;
use Sunrice\Sunrice;

/**
 * sunrice:import-structure — creates the fieldsets, blueprints,
 * taxonomies, collections, globals, forms, entries and menus a definition
 * file (PHP returning an array, or JSON) describes. Safe to run again.
 */
class ImportStructureCommand extends Command
{
    protected $signature = 'sunrice:import-structure
        {file : A .php file returning the definition array, or a .json file}
        {--dry-run : Report what would happen without saving anything}
        {--force : Overwrite items that exist but differ from the definition}';

    protected $description = 'Create collections, blueprints, taxonomies and more from a definition file';

    public function handle(Sunrice $sunrice): int
    {
        $file = (string) $this->argument('file');
        if (! is_file($file)) {
            $this->components->error("File not found: {$file}");

            return self::FAILURE;
        }

        $definition = str_ends_with(strtolower($file), '.json')
            ? json_decode((string) file_get_contents($file), true)
            : require $file;
        if (! is_array($definition)) {
            $this->components->error('The file must return (or contain) a definition array.');

            return self::FAILURE;
        }

        try {
            $report = $sunrice->importStructure($definition, (bool) $this->option('dry-run'), (bool) $this->option('force'));
        } catch (StructureImportFailed $e) {
            $this->components->error($e->getMessage());

            return self::FAILURE;
        }

        $this->table(['Type', 'Handle', 'Result', 'Differences'], array_map(fn (array $item) => [
            $item['type'],
            $item['handle'],
            $item['status'],
            implode(', ', array_slice($item['differences'], 0, 5)).(count($item['differences']) > 5 ? ', …' : ''),
        ], $report->items()));

        if ($report->dryRun) {
            $this->components->info('Dry run: nothing was saved.');
        }
        if ($report->items(ImportReport::CHANGED) !== []) {
            $this->components->warn('Some items differ from the definition and were left as they are. Run with --force to overwrite them.');
        }

        return self::SUCCESS;
    }
}
