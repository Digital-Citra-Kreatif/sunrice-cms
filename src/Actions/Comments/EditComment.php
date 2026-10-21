<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Comments;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Comment;

/**
 * A moderator fixes a comment's text (a typo, a link to remove).
 *
 * @api
 */
final class EditComment
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(Comment $comment, string $body): Comment
    {
        Validator::make(['body' => $body], ['body' => ['required', 'string', 'max:'.PostComment::MAX_LENGTH]], [], ['body' => __('comment')])->validate();
        $comment->body = trim(str_replace("\r\n", "\n", $body));
        $comment->save();
        $this->activity->record('updated', 'comments', $comment, $comment->authorName());

        return $comment;
    }
}
