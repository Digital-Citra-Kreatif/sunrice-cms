<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Support\HandleRule;

/**
 * Changes a blueprint's handle, and with it every place that names it:
 * collections (their blueprint, other blueprints and listing page fields,
 * deleted ones too), taxonomies (their terms' and index pages' fields),
 * global sets, forms and the entries that
 * picked it in their Page settings. Content keeps its values.
 *
 *     app(RenameBlueprint::class)->handle($blueprint, 'property');
 *
 * @api
 */
final class RenameBlueprint
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(Blueprint $blueprint, string $handle): Blueprint
    {
        $old = $blueprint->handle;
        if ($handle === $old) {
            return $blueprint;
        }
        Validator::make(['handle' => $handle], [
            'handle' => ['required', 'string', 'max:64', new HandleRule, Rule::unique($blueprint->getTable(), 'handle')->ignore($blueprint->id)],
        ])->validate();

        DB::transaction(function () use ($blueprint, $old, $handle): void {
            $blueprint->handle = $handle;
            $blueprint->save();
            foreach (['blueprint', 'listing_blueprint'] as $column) {
                Collection::withTrashed()->where($column, $old)->update([$column => $handle]);
            }
            // Other blueprints: a JSON list, on the few collections that have one.
            foreach (Collection::withTrashed()->whereNotNull('blueprints')->get() as $collection) {
                $others = $collection->blueprints ?? [];
                if (in_array($old, $others, true)) {
                    $collection->blueprints = array_map(fn (string $other): string => $other === $old ? $handle : $other, $others);
                    $collection->save();
                }
            }
            foreach (['blueprint', 'index_blueprint'] as $column) {
                Taxonomy::withTrashed()->where($column, $old)->update([$column => $handle]);
            }
            GlobalSet::query()->where('blueprint', $old)->update(['blueprint' => $handle]);
            Form::query()->where('blueprint', $old)->update(['blueprint' => $handle]);
            Entry::withTrashed()->where('blueprint', $old)->update(['blueprint' => $handle]);
        });
        $this->activity->updated('blueprint', $blueprint, $blueprint->title, ['handle']);

        return $blueprint;
    }
}
