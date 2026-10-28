<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Support\Templates;
use Sunrice\Cms\Templates\TemplatePage;
use Sunrice\Cms\Templates\TemplatePages;
use Sunrice\Cms\Templates\TemplateWriter;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\multiselect;

/**
 * sunrice:make-templates: Blade templates written from the blueprints,
 * in the files the site picks for each page (TemplatePages,
 * TemplateWriter): asks which pages of each collection and taxonomy, shows
 * what it will write, then writes. Files that exist are kept unless
 * --force; shared files (blocks' views, partials, the layout) always.
 *
 * Without a terminal (--no-interaction) it needs --all, or the
 * collections and taxonomies named (--collection, --taxonomy): their
 * pages, all of them.
 *
 * @internal
 */
final class MakeTemplatesCommand extends Command
{
    protected $signature = 'sunrice:make-templates
        {--collection=* : Only these collections (handles)}
        {--taxonomy=* : Only these taxonomies (handles)}
        {--all : Every page (of those named), without asking}
        {--force : Overwrite the pages\' templates that exist}';

    protected $description = 'Write Blade templates for the site\'s pages from their blueprints';

    public function handle(TemplateWriter $writer): int
    {
        $collections = $this->handles('collection');
        $taxonomies = $this->handles('taxonomy');
        $named = $collections !== [] || $taxonomies !== [];
        $missing = [
            ...array_map(fn (string $h): string => "collection \"{$h}\"", array_diff($collections, Collection::query()->whereIn('handle', $collections)->get()->map(fn (Collection $c): string => $c->handle)->all())),
            ...array_map(fn (string $h): string => "taxonomy \"{$h}\"", array_diff($taxonomies, Taxonomy::query()->whereIn('handle', $taxonomies)->get()->map(fn (Taxonomy $t): string => $t->handle)->all())),
        ];
        if ($missing !== []) {
            $this->components->error('No such '.implode(', ', $missing).' (or in the trash).');

            return self::FAILURE;
        }
        $all = $this->option('all') === true;
        if (! $all && ! $named && ! $this->input->isInteractive()) {
            $this->components->error('Nothing chosen: pass --all for every page, or --collection and --taxonomy for those records\' pages.');

            return self::FAILURE;
        }

        $groups = TemplatePages::groups($named ? $collections : null, $named ? $taxonomies : null);
        if ($groups === []) {
            $this->components->info('No pages to make templates for: give collections or taxonomies URLs first.');

            return self::SUCCESS;
        }
        $force = $this->option('force') === true;
        $ask = ! $all && $this->input->isInteractive();
        $pages = [];
        foreach ($groups as $group) {
            if (! $ask) {
                array_push($pages, ...$group['pages']);

                continue;
            }
            $options = [];
            foreach ($group['pages'] as $page) {
                $options[$page->path] = $page->label().' → cms/'.$page->path.($this->exists($page->path) ? ($force ? ' (exists, will be overwritten)' : ' (exists, will be skipped)') : '');
            }
            $chosen = multiselect(
                label: $group['title'].' ('.$group['handle'].')',
                options: $options,
                default: array_values(array_filter(array_keys($options), fn (string $path): bool => ! $this->exists($path))),
                scroll: 10,
                hint: ucfirst($group['type']).': the pages to write templates for.',
            );
            array_push($pages, ...array_values(array_filter($group['pages'], fn (TemplatePage $page): bool => in_array($page->path, $chosen, true))));
        }
        if ($pages === []) {
            $this->components->info('Nothing chosen: nothing written.');

            return self::SUCCESS;
        }

        $files = $writer->plan($pages);
        $this->table(['File', 'For', 'Action'], array_map(fn (array $file): array => ['cms/'.$file['path'], $file['name'], $this->action($file['path'], $file['shared'], $force)], $files));
        if ($ask && ! confirm('Write these files?', true)) {
            $this->components->info('Nothing written.');

            return self::SUCCESS;
        }

        [$written, $skipped] = [0, 0];
        foreach ($files as $file) {
            $action = $this->action($file['path'], $file['shared'], $force);
            $path = Templates::path($file['path']);
            if ($action === 'skip (exists)' || $path === null) {
                $skipped++;
                $this->components->twoColumnDetail('cms/'.$file['path'], '<fg=yellow>skipped</>'.($path === null ? ' (not a template path)' : ' (exists)'));

                continue;
            }
            File::ensureDirectoryExists(dirname($path));
            File::put($path, $file['source']);
            $written++;
            $this->components->twoColumnDetail('cms/'.$file['path'], $action === 'overwrite' ? '<fg=green>overwritten</>' : '<fg=green>written</>');
        }
        $this->components->info("{$written} written, {$skipped} skipped, in ".str_replace(base_path().'/', '', Templates::directory()).'.');

        return self::SUCCESS;
    }

    /** @return list<string> */
    private function handles(string $option): array
    {
        $values = $this->option($option);

        return array_values(array_unique(array_filter(array_map(fn (mixed $v): string => is_string($v) ? trim($v) : '', is_array($values) ? $values : []), fn (string $v): bool => $v !== '')));
    }

    private function exists(string $relative): bool
    {
        return is_file(Templates::directory().'/'.$relative);
    }

    /** write, overwrite (--force; a page's own file only) or skip (exists). */
    private function action(string $relative, bool $shared, bool $force): string
    {
        return ! $this->exists($relative) ? 'write' : ($force && ! $shared ? 'overwrite' : 'skip (exists)');
    }
}
