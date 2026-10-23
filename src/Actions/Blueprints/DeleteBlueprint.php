<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Illuminate\Contracts\Database\Query\Builder;
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
        return $this->usedByMany([$blueprint->handle])[$blueprint->handle] ?? [];
    }

    /**
     * What uses each of these blueprints (every one when null), as
     * usedBy() names them, by handle: a few queries however many there
     * are, for the Blueprints list. Unused ones are left out.
     *
     * @param  list<string>|null  $handles
     * @return array<string, list<string>>
     */
    public function usedByMany(?array $handles = null): array
    {
        $wanted = fn (mixed $handle): bool => is_string($handle) && $handle !== '' && ($handles === null || in_array($handle, $handles, true));
        $trashed = fn (Collection|Taxonomy $model, string $label): string => $model->trashed() ? __(':label (in the trash)', ['label' => $label]) : $label;
        $users = [];
        $collections = Collection::query()->withTrashed()
            ->where(function (Builder $query) use ($handles): void {
                $query->where(fn (Builder $q) => self::using($q, 'blueprint', $handles))->orWhere(fn (Builder $q) => self::using($q, 'listing_blueprint', $handles))
                    ->orWhere(function (Builder $q) use ($handles): void {
                        if ($handles === null) {
                            $q->whereNotNull('blueprints');
                        } else {
                            foreach ($handles as $handle) {
                                $q->orWhereJsonContains('blueprints', $handle);
                            }
                        }
                    });
            })
            ->orderBy('title')->get();
        foreach ($collections as $collection) {
            if ($wanted($collection->blueprint)) {
                $users[$collection->blueprint][] = $trashed($collection, __('the collection ":title"', ['title' => $collection->title]));
            }
            foreach (array_unique($collection->blueprints ?? []) as $other) {
                if ($wanted($other) && $other !== $collection->blueprint) {
                    $users[$other][] = $trashed($collection, __('the collection ":title" (one of its other blueprints)', ['title' => $collection->title]));
                }
            }
            if ($wanted($collection->listing_blueprint)) {
                $users[$collection->listing_blueprint][] = $trashed($collection, __('the listing page of ":title"', ['title' => $collection->title]));
            }
        }
        $entries = self::using(Entry::query()->withTrashed(), 'blueprint', $handles)
            ->selectRaw('blueprint, collection_id, count(*) as aggregate')->groupBy('blueprint', 'collection_id')->get();
        if ($entries->isNotEmpty()) {
            $titles = Collection::query()->withTrashed()->whereKey($entries->pluck('collection_id')->unique()->values()->all())->orderBy('title')->pluck('title', 'id');
            foreach ($titles as $id => $title) {
                foreach ($entries->where('collection_id', $id) as $row) {
                    $count = $row->getAttribute('aggregate');
                    $handle = $row->getAttribute('blueprint');
                    if (is_string($handle)) {
                        $users[$handle][] = trans_choice('{1} an entry of ":title"|[2,*] :count entries of ":title"', is_numeric($count) ? (int) $count : 0, ['title' => $title]);
                    }
                }
            }
        }
        $taxonomies = Taxonomy::query()->withTrashed()
            ->where(fn (Builder $query) => $query->where(fn (Builder $q) => self::using($q, 'blueprint', $handles))->orWhere(fn (Builder $q) => self::using($q, 'index_blueprint', $handles)))
            ->orderBy('title')->get();
        foreach ($taxonomies as $taxonomy) {
            if ($wanted($taxonomy->blueprint)) {
                $users[$taxonomy->blueprint][] = $trashed($taxonomy, __('the taxonomy ":title"', ['title' => $taxonomy->title]));
            }
            if ($wanted($taxonomy->index_blueprint)) {
                $users[$taxonomy->index_blueprint][] = $trashed($taxonomy, __('the index pages of ":title"', ['title' => $taxonomy->title]));
            }
        }
        foreach (self::using(GlobalSet::query(), 'blueprint', $handles)->orderBy('title')->get() as $set) {
            if ($wanted($set->blueprint)) {
                $users[$set->blueprint][] = __('the global set ":title"', ['title' => $set->title]);
            }
        }
        foreach (self::using(Form::query(), 'blueprint', $handles)->orderBy('title')->get() as $form) {
            if ($wanted($form->blueprint)) {
                $users[$form->blueprint][] = __('the form ":title"', ['title' => $form->title]);
            }
        }

        return $users;
    }

    /**
     * Rows whose column names one of the handles (any, when null).
     *
     * @template TQuery of Builder
     *
     * @param  TQuery  $query
     * @param  list<string>|null  $handles
     * @return TQuery
     */
    private static function using(Builder $query, string $column, ?array $handles): Builder
    {
        if ($handles === null) {
            $query->whereNotNull($column);
        } else {
            $query->whereIn($column, $handles);
        }

        return $query;
    }
}
