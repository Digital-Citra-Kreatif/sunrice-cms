<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Blueprint;

/**
 * Deletes a blueprint.
 *
 * @api
 */
final class DeleteBlueprint
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Blueprint $blueprint): void
    {
        $blueprint->delete();
        $this->activity->record('deleted', 'blueprint', $blueprint, $blueprint->title);
    }
}
