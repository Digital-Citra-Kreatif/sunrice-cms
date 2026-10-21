<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Deletes a blueprint nothing uses: no collection (for its entries or its
 * listing page), taxonomy, global set or form.
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
     * What uses the blueprint, named: collections (entries and listing
     * pages), taxonomies, global sets and forms. Deleted collections and
     * taxonomies don't count: there is no restoring them.
     *
     * @return list<string>
     */
    public function usedBy(Blueprint $blueprint): array
    {
        $handle = $blueprint->handle;
        $users = [];
        foreach (Collection::query()->where(fn ($query) => $query->where('blueprint', $handle)->orWhere('listing_blueprint', $handle))->orderBy('title')->get() as $collection) {
            if ($collection->blueprint === $handle) {
                $users[] = __('the collection ":title"', ['title' => $collection->title]);
            }
            if ($collection->listing_blueprint === $handle) {
                $users[] = __('the listing page of ":title"', ['title' => $collection->title]);
            }
        }
        foreach (Taxonomy::query()->where('blueprint', $handle)->orderBy('title')->get() as $taxonomy) {
            $users[] = __('the taxonomy ":title"', ['title' => $taxonomy->title]);
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
