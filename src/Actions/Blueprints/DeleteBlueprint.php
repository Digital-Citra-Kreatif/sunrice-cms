<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Deletes a blueprint nothing uses: no collection (for its entries, as one
 * of its other blueprints, or for its listing page), entry, taxonomy (for
 * its terms or its index pages),
 * global set or form, counting those in the trash.
 *
 * @api
 */
final class DeleteBlueprint
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException when something uses it, saying what */
    public function handle(Blueprint $blueprint): void
    {
        $users = $this->usedBy($blueprint);
        if ($users !== []) {
            throw ValidationException::withMessages([
                'blueprint' => __('":title" is used by :users. Choose another blueprint there first.', ['title' => $blueprint->title, 'users' => implode(', ', $users)]),
            ]);
        }
        $blueprint->delete();
        $this->activity->record('deleted', 'blueprint', $blueprint, $blueprint->title);
    }

    /**
     * What uses the blueprint, named: collections (for their entries, as
     * one of their other blueprints, or for their listing pages), entries
     * that chose it, taxonomies (for their terms or index pages), global
     * sets and forms. Collections and
     * taxonomies in the trash count (marked so): restoring one needs it.
     *
     * @return list<string>
     */
    public function usedBy(Blueprint $blueprint): array
    {
        $handle = $blueprint->handle;
        $trashed = fn (Collection|Taxonomy $model, string $label): string => $model->trashed() ? __(':label (in the trash)', ['label' => $label]) : $label;
        $users = [];
        $collections = Collection::query()->withTrashed()
            ->where(fn ($query) => $query->where('blueprint', $handle)->orWhere('listing_blueprint', $handle)->orWhereJsonContains('blueprints', $handle))
            ->orderBy('title')->get();
        foreach ($collections as $collection) {
            if ($collection->blueprint === $handle) {
                $users[] = $trashed($collection, __('the collection ":title"', ['title' => $collection->title]));
            } elseif (in_array($handle, $collection->blueprints ?? [], true)) {
                $users[] = $trashed($collection, __('the collection ":title" (one of its other blueprints)', ['title' => $collection->title]));
            }
            if ($collection->listing_blueprint === $handle) {
                $users[] = $trashed($collection, __('the listing page of ":title"', ['title' => $collection->title]));
            }
        }
        $entries = Entry::query()->withTrashed()->where('blueprint', $handle)
            ->selectRaw('collection_id, count(*) as aggregate')->groupBy('collection_id')->pluck('aggregate', 'collection_id');
        if ($entries->isNotEmpty()) {
            foreach (Collection::query()->withTrashed()->whereKey($entries->keys()->all())->orderBy('title')->get() as $collection) {
                $count = $entries[$collection->id];
                $users[] = trans_choice('{1} an entry of ":title"|[2,*] :count entries of ":title"', is_numeric($count) ? (int) $count : 0, ['title' => $collection->title]);
            }
        }
        foreach (Taxonomy::query()->withTrashed()->where(fn ($query) => $query->where('blueprint', $handle)->orWhere('index_blueprint', $handle))->orderBy('title')->get() as $taxonomy) {
            if ($taxonomy->blueprint === $handle) {
                $users[] = $trashed($taxonomy, __('the taxonomy ":title"', ['title' => $taxonomy->title]));
            }
            if ($taxonomy->index_blueprint === $handle) {
                $users[] = $trashed($taxonomy, __('the index pages of ":title"', ['title' => $taxonomy->title]));
            }
        }
        foreach (GlobalSet::query()->where('blueprint', $handle)->orderBy('title')->get() as $set) {
            $users[] = __('the global set ":title"', ['title' => $set->title]);
        }
        foreach (Form::query()->where('blueprint', $handle)->orderBy('title')->get() as $form) {
            $users[] = __('the form ":title"', ['title' => $form->title]);
        }

        return $users;
    }
}
