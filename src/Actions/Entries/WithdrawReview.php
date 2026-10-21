<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * "Withdraw the request": whoever sent a draft for review (RequestReview)
 * takes the request back, to keep working on it. Nobody is emailed; the
 * draft leaves the dashboard's "Waiting for review".
 *
 * @api
 */
final class WithdrawReview
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException when it isn't waiting for review, or someone else sent it */
    public function handle(EntryTranslation $translation, ?Authorizable $user = null): EntryTranslation
    {
        if ($translation->review_requested_at === null) {
            throw ValidationException::withMessages(['entry' => __('It isn\'t waiting for review.')]);
        }
        $id = $user instanceof Model ? $user->getKey() : null;
        if ($translation->review_requested_by === null || ! is_scalar($id) || (string) $translation->review_requested_by !== (string) $id) {
            throw ValidationException::withMessages(['entry' => __('Only the one who sent it for review can withdraw the request.')]);
        }
        $translation->forceFill(['review_requested_at' => null, 'review_requested_by' => null])->save();
        $this->activity->record('review withdrawn', 'entry', $translation->entry, $translation->draft_title, ['locale' => $translation->locale]);

        return $translation;
    }
}
