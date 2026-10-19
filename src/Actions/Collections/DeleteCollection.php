<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Collections;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Collection;

/**
 * Deletes a collection. Its entries aren't erased, but leave the admin and
 * the site; its handle stays taken.
 *
 * @api
 */
final class DeleteCollection
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Collection $collection): void
    {
        $collection->delete();
        $this->activity->record('deleted', 'collection', $collection, $collection->title);
    }
}
