<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Mail\ReviewSentBack;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * "Send back": someone who may publish answers a review request
 * (RequestReview) without publishing. The request is cleared, and the one
 * who sent it gets an email, with the reviewer's note when there is one.
 * The draft stays as it is.
 *
 * @api
 */
final class SendBackReview
{
    public const MAX_NOTE = 2000;

    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException when it isn't waiting for review, or the note is too long */
    public function handle(EntryTranslation $translation, ?string $note = null, ?Authorizable $reviewer = null): EntryTranslation
    {
        if ($translation->review_requested_at === null) {
            throw ValidationException::withMessages(['entry' => __('It isn\'t waiting for review.')]);
        }
        $note = trim((string) $note);
        if (mb_strlen($note) > self::MAX_NOTE) {
            throw ValidationException::withMessages(['note' => __('Keep the note under :max characters.', ['max' => self::MAX_NOTE])]);
        }
        $requester = $translation->review_requested_by === null ? null : app(Panel::class)->getUserModel()::query()->find($translation->review_requested_by);
        $translation->forceFill(['review_requested_at' => null, 'review_requested_by' => null])->save();
        $this->activity->record('review sent back', 'entry', $translation->entry, $translation->draft_title, ['locale' => $translation->locale]);

        $address = $requester instanceof Model ? $requester->getAttribute('email') : null;
        if (is_string($address) && filter_var($address, FILTER_VALIDATE_EMAIL) !== false && ! ($reviewer instanceof Model && $requester->is($reviewer))) {
            $name = $reviewer instanceof Model ? $reviewer->getAttribute('name') : null;
            Mail::to($address)->queue(new ReviewSentBack($translation, is_string($name) && $name !== '' ? $name : null, $note === '' ? null : $note));
        }

        return $translation;
    }
}
