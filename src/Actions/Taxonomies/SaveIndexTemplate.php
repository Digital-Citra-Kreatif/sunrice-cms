<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Taxonomies;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Sets the Blade view a taxonomy's index pages render with, the shared one
 * and each collection's (its Index page template; empty: the first file
 * that exists), checked like any template setting
 * (SaveEntrySettings::template()). For the index page editor; the
 * taxonomy's settings set it too.
 *
 * @internal
 */
final class SaveIndexTemplate
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(Taxonomy $taxonomy, mixed $template): Taxonomy
    {
        $template = SaveEntrySettings::template($template, 'cms.tag-cloud');
        if ($taxonomy->index_template !== $template) {
            $taxonomy->index_template = $template;
            $taxonomy->save();
            $this->activity->updated('taxonomy', $taxonomy, $taxonomy->title, ['index_template']);
        }

        return $taxonomy;
    }
}
