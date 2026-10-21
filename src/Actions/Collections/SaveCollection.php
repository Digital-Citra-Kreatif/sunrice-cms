<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Collections;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Admin\HandleField;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Support\HandleRule;

/**
 * Creates a collection or changes one. Input: handle (only when creating;
 * not one a deleted collection had), title, blueprint (a blueprint's
 * handle, or null), blueprints (more blueprints its entries may switch to)
 * dated and translatable. Changing the blueprint keeps entries' data.
 *
 * @api
 */
final class SaveCollection
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(array $input, ?Collection $collection = null): Collection
    {
        $collection ??= new Collection;
        /** @var array{handle?: string, title: string, blueprint?: string|null, blueprints?: array<int|string, string>|null, dated?: bool, translatable?: bool} $validated */
        $validated = Validator::make($input, [
            'handle' => $collection->exists ? ['prohibited'] : ['required', 'string', 'max:64', new HandleRule, Rule::notIn(HandleField::RESERVED), Rule::unique($collection->getTable(), 'handle')],
            'title' => ['required', 'string', 'max:255'],
            'blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'blueprints' => ['sometimes', 'nullable', 'array'],
            'blueprints.*' => ['string', 'distinct', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'dated' => ['sometimes', 'boolean'],
            'translatable' => ['sometimes', 'boolean'],
        ], ['handle.unique' => __('A collection (perhaps a deleted one) already has this handle.')])->validate();

        $creating = ! $collection->exists;
        if ($creating) {
            $collection->handle = $validated['handle'] ?? '';
        }
        $collection->title = $validated['title'];
        if (array_key_exists('blueprint', $validated)) {
            $collection->blueprint = $validated['blueprint'];
        }
        if (array_key_exists('blueprints', $validated)) {
            $collection->blueprints = $validated['blueprints'] === null || $validated['blueprints'] === [] ? null : array_values($validated['blueprints']);
        }
        if (array_key_exists('dated', $validated)) {
            $collection->dated = (bool) $validated['dated'];
        }
        if (array_key_exists('translatable', $validated)) {
            $collection->translatable = (bool) $validated['translatable'];
        }
        $changed = array_keys($collection->getDirty());
        $collection->save();
        $collection->flushSchema();

        if ($creating) {
            $this->activity->record('created', 'collection', $collection, $collection->title);
        } elseif ($changed !== []) {
            $this->activity->updated('collection', $collection, $collection->title, $changed);
        }

        return $collection;
    }
}
