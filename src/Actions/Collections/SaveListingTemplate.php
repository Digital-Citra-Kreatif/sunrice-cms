<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Collections;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Models\Collection;

/**
 * Sets the Blade view a collection's listing page renders with (its
 * Listing page template; empty: the first file that exists), checked like
 * any template setting (SaveEntrySettings::template()). For the listing
 * page editor; the collection's settings set it too.
 *
 * @internal
 */
final class SaveListingTemplate
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(Collection $collection, mixed $template): Collection
    {
        $template = SaveEntrySettings::template($template, 'cms.blog-home');
        if ($collection->listing_template !== $template) {
            $collection->listing_template = $template;
            $collection->save();
            $this->activity->updated('collection', $collection, $collection->title, ['listing_template']);
        }

        return $collection;
    }
}
