<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Forms;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Submission;

/**
 * Deletes a form submission permanently.
 *
 * @api
 */
final class DeleteSubmission
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Submission $submission): void
    {
        $submission->delete();
        $this->activity->record('deleted', 'submissions', $submission, $submission->form->title.' #'.$submission->id);
    }
}
