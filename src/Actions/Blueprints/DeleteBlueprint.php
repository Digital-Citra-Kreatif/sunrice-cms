<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;

/**
 * Deletes a blueprint no collection uses.
 *
 * @api
 */
final class DeleteBlueprint
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException when a collection uses it */
    public function handle(Blueprint $blueprint): void
    {
        $users = Collection::query()->where('blueprint', $blueprint->handle)->orderBy('title')->get()
            ->map(fn (Collection $collection): string => "\"{$collection->title}\"")->all();
        if ($users !== []) {
            throw ValidationException::withMessages([
                'blueprint' => "\"{$blueprint->title}\" is used by the collection ".implode(', ', $users).'. Choose another blueprint there first.',
            ]);
        }
        $blueprint->delete();
        $this->activity->record('deleted', 'blueprint', $blueprint, $blueprint->title);
    }
}
