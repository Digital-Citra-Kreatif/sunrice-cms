<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Actions\Collections\PurgeDeleted;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\ContentReference;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;

/**
 * sunrice:orphans: what's left over. Deleted collections and taxonomies
 * with the entries and terms they keep (--purge deletes them for good and
 * frees their handles), media whose file is gone, and fields pointing at
 * entries or terms that are gone.
 *
 * @internal
 */
final class OrphansCommand extends Command
{
    protected $signature = 'sunrice:orphans
        {--purge : Delete the deleted collections and taxonomies for good, with their entries and terms}
        {--force : Purge without asking}';

    protected $description = 'List deleted collections and taxonomies, media with missing files and links to missing entries or terms';

    public function handle(PurgeDeleted $purge): int
    {
        $collections = Collection::onlyTrashed()->orderBy('handle')->get();
        $taxonomies = Taxonomy::onlyTrashed()->orderBy('handle')->get();
        $kept = [];
        foreach ($collections as $collection) {
            $kept[] = ['Collection', $collection->handle, $collection->title, PurgeDeleted::entriesOf($collection)->count().' entries', $collection->deleted_at?->toDateTimeString() ?? ''];
        }
        foreach ($taxonomies as $taxonomy) {
            $kept[] = ['Taxonomy', $taxonomy->handle, $taxonomy->title, PurgeDeleted::termsOf($taxonomy)->count().' terms', $taxonomy->deleted_at?->toDateTimeString() ?? ''];
        }
        $this->components->twoColumnDetail('<fg=gray>Deleted collections and taxonomies</>', (string) count($kept));
        if ($kept !== []) {
            $this->table(['Type', 'Handle', 'Title', 'Keeps', 'Deleted'], $kept);
        }

        $missing = [];
        Media::query()->lazyById(200)->each(function (Media $media) use (&$missing): void {
            if (! Storage::disk($media->disk)->exists($media->path)) {
                $missing[] = [(string) $media->id, $media->filename, $media->disk.':'.$media->path];
            }
        });
        $this->components->twoColumnDetail('<fg=gray>Media whose file is missing</>', (string) count($missing));
        if ($missing !== []) {
            $this->table(['ID', 'File', 'Stored at'], $missing);
        }

        $dangling = $this->danglingReferences();
        $this->components->twoColumnDetail('<fg=gray>Fields pointing at missing entries or terms</>', (string) count($dangling));
        if ($dangling !== []) {
            $this->table(['In', 'Language', 'Field', 'Points at'], $dangling);
        }

        if (! $this->option('purge')) {
            if ($kept !== []) {
                $this->line('Restore deleted collections and taxonomies from their lists (filter: Deleted), or run <comment>sunrice:orphans --purge</comment> to delete them for good.');
            }

            return self::SUCCESS;
        }
        if ($kept === []) {
            $this->components->info('Nothing to purge.');

            return self::SUCCESS;
        }
        if (! $this->option('force') && ! $this->confirm('Delete the deleted collections and taxonomies listed, with their entries and terms, for good? This can\'t be undone.')) {
            $this->components->warn('Nothing was deleted.');

            return self::FAILURE;
        }
        foreach ($collections as $collection) {
            $this->components->info("Deleted the collection \"{$collection->handle}\" and {$purge->collection($collection)} entries; its handle is free.");
        }
        foreach ($taxonomies as $taxonomy) {
            $this->components->info("Deleted the taxonomy \"{$taxonomy->handle}\" and {$purge->taxonomy($taxonomy)} terms; its handle is free.");
        }

        return self::SUCCESS;
    }

    /**
     * References whose entry or term no longer exists (in the trash counts as existing).
     *
     * @return list<array{string, string, string, string}>
     */
    private function danglingReferences(): array
    {
        $rows = [];
        foreach ([Reference::ENTRY => Entry::class, Reference::TERM => Term::class] as $type => $class) {
            ContentReference::query()->where('target_type', $type)
                ->whereNotIn('target_id', $class::withTrashed()->select('id'))
                ->orderBy('id')->each(function (ContentReference $reference) use (&$rows): void {
                    $rows[] = ["{$reference->source_type} {$reference->source_id}", $reference->locale, $reference->field, "{$reference->target_type} {$reference->target_id}"];
                });
        }

        return $rows;
    }
}
