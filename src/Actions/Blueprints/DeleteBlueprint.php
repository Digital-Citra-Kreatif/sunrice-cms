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
                'blueprint' => "\"{$blueprint->title}\" is used by ".implode(', ', $users).'. Choose another blueprint there first.',
            ]);
        }
        $blueprint->delete();
        $this->activity->record('deleted', 'blueprint', $blueprint, $blueprint->title);
    }

    /**
     * What uses the blueprint, named: collections (entries and listing
     * pages, deleted ones too), taxonomies, global sets and forms.
     *
     * @return list<string>
     */
    public function usedBy(Blueprint $blueprint): array
    {
        $handle = $blueprint->handle;
        $users = [];
        foreach (Collection::query()->withTrashed()->where(fn ($query) => $query->where('blueprint', $handle)->orWhere('listing_blueprint', $handle))->orderBy('title')->get() as $collection) {
            if ($collection->blueprint === $handle) {
                $users[] = "the collection \"{$collection->title}\"";
            }
            if ($collection->listing_blueprint === $handle) {
                $users[] = "the listing page of \"{$collection->title}\"";
            }
        }
        foreach (Taxonomy::query()->withTrashed()->where('blueprint', $handle)->orderBy('title')->get() as $taxonomy) {
            $users[] = "the taxonomy \"{$taxonomy->title}\"";
        }
        foreach (GlobalSet::query()->where('blueprint', $handle)->orderBy('title')->get() as $set) {
            $users[] = "the global set \"{$set->title}\"";
        }
        foreach (Form::query()->where('blueprint', $handle)->orderBy('title')->get() as $form) {
            $users[] = "the form \"{$form->title}\"";
        }

        return $users;
    }
}
