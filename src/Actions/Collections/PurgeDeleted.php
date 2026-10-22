<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Collections;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\ForceDeleteEntry;
use Sunrice\Cms\Actions\Terms\DeleteTerm;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;

/**
 * Deletes a deleted collection or taxonomy permanently, with the entries or
 * terms it kept (trashed ones too), which frees its handle. Used by
 * `sunrice:orphans --purge` and the trash's Permanently delete in
 * Structure → Collections and Taxonomies.
 *
 * @api
 */
final class PurgeDeleted
{
    public function __construct(
        private readonly ForceDeleteEntry $deleteEntry,
        private readonly DeleteTerm $deleteTerm,
        private readonly ActivityLog $activity,
    ) {}

    /**
     * The entries a collection keeps, trashed ones too.
     *
     * @return Builder<Entry>
     */
    public static function entriesOf(Collection $collection): Builder
    {
        return Entry::withTrashed()->where('collection_id', $collection->id);
    }

    /**
     * The terms a taxonomy keeps, trashed ones too.
     *
     * @return Builder<Term>
     */
    public static function termsOf(Taxonomy $taxonomy): Builder
    {
        return Term::withTrashed()->where('taxonomy_id', $taxonomy->id);
    }

    /** @return int the entries deleted */
    public function collection(Collection $collection): int
    {
        if (! $collection->trashed()) {
            throw new \InvalidArgumentException("The collection \"{$collection->handle}\" isn't deleted.");
        }
        $count = 0;
        DB::transaction(function () use ($collection, &$count): void {
            self::entriesOf($collection)->lazyById(100)->each(function (Entry $entry) use ($collection, &$count): void {
                $entry->setRelation('collection', $collection);
                if (! $entry->trashed()) {
                    $entry->delete();
                }
                $this->deleteEntry->handle($entry, force: true);
                $count++;
            });
            $collection->listings()->delete();
            $collection->taxonomies()->detach();
            $collection->forceDelete();
        });
        $this->activity->record('purged', 'collection', $collection, $collection->title);

        return $count;
    }

    /** @return int the terms deleted */
    public function taxonomy(Taxonomy $taxonomy): int
    {
        if (! $taxonomy->trashed()) {
            throw new \InvalidArgumentException("The taxonomy \"{$taxonomy->handle}\" isn't deleted.");
        }
        $count = 0;
        DB::transaction(function () use ($taxonomy, &$count): void {
            // Children first would be tidier, but each delete moves the ones below up: any order ends empty.
            foreach (self::termsOf($taxonomy)->pluck('id') as $id) {
                $term = Term::withTrashed()->whereKey($id)->first();
                if ($term !== null) {
                    $this->deleteTerm->handle($term, force: true);
                    $count++;
                }
            }
            $taxonomy->collections()->detach();
            $taxonomy->forceDelete();
        });
        $this->activity->record('purged', 'taxonomy', $taxonomy, $taxonomy->title);

        return $count;
    }
}
