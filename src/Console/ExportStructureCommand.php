<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Cms\Structure\StructureExporter;

/**
 * sunrice:export-structure structure.json: writes the site's structure
 * (and with --entries its terms, entries and global values) as JSON that
 * sunrice:import-structure reads.
 *
 * @internal
 */
final class ExportStructureCommand extends Command
{
    protected $signature = 'sunrice:export-structure
        {file : The JSON file to write}
        {--entries : Also terms, entries (drafts, every language) and global values}';

    protected $description = 'Write the fieldsets, blueprints, collections, taxonomies, globals, forms, menus and redirects to a JSON file';

    public function handle(StructureExporter $exporter): int
    {
        $file = (string) $this->argument('file');
        $structure = $exporter->export((bool) $this->option('entries'));
        $json = json_encode($structure, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        if (@file_put_contents($file, $json."\n") === false) {
            $this->components->error("Can't write {$file}.");

            return self::FAILURE;
        }
        $counts = [];
        foreach ($structure as $section => $items) {
            if (is_array($items) && $items !== []) {
                $counts[] = count($items).' '.$section;
            }
        }
        $this->components->info("Wrote {$file}: ".($counts === [] ? 'nothing to export' : implode(', ', $counts)).'.');

        return self::SUCCESS;
    }
}
