<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Cms\Structure\ImportReport;
use Sunrice\Cms\Structure\StructureImporter;
use Sunrice\Cms\Structure\StructureImportFailed;

/**
 * sunrice:import-structure structure.json: creates or updates, by handle,
 * what a file from sunrice:export-structure describes. Safe to run again.
 *
 * @internal
 */
final class ImportStructureCommand extends Command
{
    protected $signature = 'sunrice:import-structure
        {file : A JSON file from sunrice:export-structure}
        {--dry-run : Report what would happen without saving anything}
        {--force : Also save fieldsets and blueprints that lose fields}';

    protected $description = 'Create or update collections, blueprints, taxonomies and more from a structure file';

    public function handle(StructureImporter $importer): int
    {
        $file = (string) $this->argument('file');
        $json = is_file($file) ? file_get_contents($file) : false;
        if ($json === false) {
            $this->components->error("Can't read {$file}.");

            return self::FAILURE;
        }
        $structure = json_decode($json, true);
        if (! is_array($structure)) {
            $this->components->error("{$file} isn't a structure file (JSON with fieldsets, blueprints, collections…).");

            return self::FAILURE;
        }

        try {
            $report = $importer->import($structure, (bool) $this->option('dry-run'), (bool) $this->option('force'));
        } catch (StructureImportFailed $e) {
            $this->components->error($e->getMessage().' Nothing was imported.');

            return self::FAILURE;
        }

        $this->table(['Type', 'Handle', 'Result', 'Notes'], array_map(fn (array $item): array => [$item['type'], $item['handle'], $item['status'], implode(' ', $item['notes'])], $report->items()));
        $counts = array_filter($report->counts());
        $this->line(implode(', ', array_map(fn (string $status, int $count): string => "{$count} {$status}", array_keys($counts), $counts)) ?: 'Nothing to import.');
        if ($report->dryRun) {
            $this->components->info('Dry run: nothing was saved.');
        }
        if ($report->items(ImportReport::REFUSED) !== []) {
            $this->components->warn('Some fieldsets or blueprints would lose fields and were left as they are. Rename fields with sunrice:rename-field, or run with --force to remove them.');

            return self::FAILURE;
        }

        return self::SUCCESS;
    }
}
