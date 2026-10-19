<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Structure;

use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Admin\Media\MediaUsages;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;

/**
 * Deletes a deleted collection or taxonomy for good, with the entries or
 * terms it kept (sunrice:orphans --purge). Menu links to them go nowhere
 * after, as when an entry is deleted.
 *
 * @api
 */
final class PurgeDeleted
{
    public function __construct(private readonly ActivityLog $activity, private readonly MediaUsages $media) {}

    /**
     * @return int the entries deleted
     *
     * @throws InvalidArgumentException when the collection isn't deleted
     */
    public function collection(Collection $collection): int
    {
        if (! $collection->trashed()) {
            throw new InvalidArgumentException("The collection \"{$collection->handle}\" isn't deleted.");
        }
        $count = 0;
        // Explicitly, not by the foreign keys' cascade: not every connection enforces them.
        DB::transaction(function () use ($collection, &$count): void {
            Entry::query()->withTrashed()->where('collection_id', $collection->id)->select('id')->chunkById(500, function ($entries) use (&$count): void {
                $ids = array_map(fn (Entry $entry): int => $entry->id, $entries->all());
                $translations = EntryTranslation::query()->whereIn('entry_id', $ids)->pluck('id');
                Revision::query()->whereIn('entry_translation_id', $translations)->delete();
                DB::table('sunrice_entry_term')->whereIn('entry_id', $ids)->delete();
                Comment::query()->withTrashed()->whereIn('entry_id', $ids)->update(['parent_id' => null]);
                Comment::query()->withTrashed()->whereIn('entry_id', $ids)->forceDelete();
                MenuItem::query()->whereIn('entry_id', $ids)->update(['entry_id' => null]);
                EntryTranslation::query()->whereIn('entry_id', $ids)->delete();
                foreach ($ids as $id) {
                    $this->media->forget('cms.entry', (string) $id);
                }
                $count += count($ids);
            });
            Entry::query()->withTrashed()->where('collection_id', $collection->id)->forceDelete();
            MenuItem::query()->where('collection_id', $collection->id)->update(['collection_id' => null]);
            $collection->listings()->delete();
            DB::table('sunrice_collection_taxonomy')->where('collection_id', $collection->id)->delete();
            $collection->forceDelete();
        });
        $this->activity->record('purged', 'collection', $collection, $collection->title, ['entries' => $count]);

        return $count;
    }

    /**
     * @return int the terms deleted
     *
     * @throws InvalidArgumentException when the taxonomy isn't deleted
     */
    public function taxonomy(Taxonomy $taxonomy): int
    {
        if (! $taxonomy->trashed()) {
            throw new InvalidArgumentException("The taxonomy \"{$taxonomy->handle}\" isn't deleted.");
        }
        $count = 0;
        DB::transaction(function () use ($taxonomy, &$count): void {
            $ids = Term::query()->withTrashed()->where('taxonomy_id', $taxonomy->id)->pluck('id');
            DB::table('sunrice_entry_term')->whereIn('term_id', $ids)->delete();
            MenuItem::query()->whereIn('term_id', $ids)->update(['term_id' => null]);
            TermTranslation::query()->whereIn('term_id', $ids)->delete();
            Term::query()->withTrashed()->whereIn('id', $ids)->update(['parent_id' => null]);
            Term::query()->withTrashed()->whereIn('id', $ids)->forceDelete();
            DB::table('sunrice_collection_taxonomy')->where('taxonomy_id', $taxonomy->id)->delete();
            $taxonomy->forceDelete();
            $count = $ids->count();
        });
        $this->activity->record('purged', 'taxonomy', $taxonomy, $taxonomy->title, ['terms' => $count]);

        return $count;
    }
}
