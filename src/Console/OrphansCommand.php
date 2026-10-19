<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Cms\Actions\Structure\PurgeDeleted;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;

/**
 * sunrice:orphans — the deleted collections and taxonomies, which keep
 * their entries and terms (and their handles): restore them, or delete
 * them for good.
 *
 * @internal
 */
final class OrphansCommand extends Command
{
    protected $signature = 'sunrice:orphans
        {--restore : Bring the listed collections and taxonomies back, with their entries and terms}
        {--purge : Delete the listed collections and taxonomies for good, with their entries and terms}
        {--handle=* : Only these handles}
        {--force : Don\'t ask before purging}';

    protected $description = 'List, restore or purge deleted collections and taxonomies and the content they keep';

    public function handle(PurgeDeleted $purge): int
    {
        if ($this->option('restore') && $this->option('purge')) {
            $this->components->error('Use --restore or --purge, not both.');

            return self::FAILURE;
        }
        $handles = array_values(array_filter((array) $this->option('handle'), is_string(...)));
        $collections = Collection::onlyTrashed()->when($handles !== [], fn ($query) => $query->whereIn('handle', $handles))->orderBy('handle')->get();
        $taxonomies = Taxonomy::onlyTrashed()->when($handles !== [], fn ($query) => $query->whereIn('handle', $handles))->orderBy('handle')->get();
        if ($collections->isEmpty() && $taxonomies->isEmpty()) {
            $this->components->info('No deleted collections or taxonomies.');

            return self::SUCCESS;
        }

        $entries = Entry::query()->withTrashed()->whereIn('collection_id', $collections->modelKeys())->selectRaw('collection_id, count(*) as aggregate')->groupBy('collection_id')->pluck('aggregate', 'collection_id');
        $terms = Term::query()->withTrashed()->whereIn('taxonomy_id', $taxonomies->modelKeys())->selectRaw('taxonomy_id, count(*) as aggregate')->groupBy('taxonomy_id')->pluck('aggregate', 'taxonomy_id');
        $rows = [];
        foreach ($collections as $collection) {
            $rows[] = ['Collection', $collection->handle, $collection->title, self::count($entries[$collection->id] ?? 0).' entries', (string) $collection->deleted_at];
        }
        foreach ($taxonomies as $taxonomy) {
            $rows[] = ['Taxonomy', $taxonomy->handle, $taxonomy->title, self::count($terms[$taxonomy->id] ?? 0).' terms', (string) $taxonomy->deleted_at];
        }
        $this->table(['', 'Handle', 'Title', 'Keeps', 'Deleted'], $rows);

        if ($this->option('restore')) {
            $collections->each->restore();
            $taxonomies->each->restore();
            $this->components->info('Restored: they are back in the admin and on the site.');

            return self::SUCCESS;
        }
        if (! $this->option('purge')) {
            $this->line('  They are hidden in the admin and on the site, and keep their handles. Bring them back with --restore,');
            $this->line('  or delete them for good with --purge (--handle=… for some only).');

            return self::SUCCESS;
        }
        if (! $this->option('force') && ! $this->confirm('Delete all of the above for good? This can\'t be undone.', false)) {
            $this->components->warn('Nothing deleted.');

            return self::FAILURE;
        }
        foreach ($collections as $collection) {
            $this->components->twoColumnDetail("Collection {$collection->handle}", $purge->collection($collection).' entries deleted');
        }
        foreach ($taxonomies as $taxonomy) {
            $this->components->twoColumnDetail("Taxonomy {$taxonomy->handle}", $purge->taxonomy($taxonomy).' terms deleted');
        }

        return self::SUCCESS;
    }

    private static function count(mixed $value): int
    {
        return is_numeric($value) ? (int) $value : 0;
    }
}
