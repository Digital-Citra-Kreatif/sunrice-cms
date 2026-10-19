<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Comments;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Comment;

/**
 * A moderator answers a comment from the admin: published at once under
 * their name, even when the entry is closed. Answering a held comment
 * approves it first.
 *
 * @api
 */
final class ReplyToComment
{
    public function __construct(private readonly SetCommentStatus $status, private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(Comment $comment, string $body, Model $user): Comment
    {
        Validator::make(['body' => $body], ['body' => ['required', 'string', 'max:'.PostComment::MAX_LENGTH]], [], ['body' => 'reply'])->validate();
        if ($comment->status === Comment::SPAM || $comment->trashed()) {
            throw ValidationException::withMessages(['body' => 'Restore the comment, or mark it not spam, before replying.']);
        }
        if (! $comment->isApproved()) {
            $this->status->handle($comment, Comment::APPROVED);
        }
        $key = $user->getKey();
        $reply = Comment::query()->create([
            'entry_id' => $comment->entry_id,
            'parent_id' => $comment->id,
            'user_id' => is_numeric($key) ? (int) $key : null,
            'body' => trim(str_replace("\r\n", "\n", $body)),
            'status' => Comment::APPROVED,
            'locale' => $comment->locale,
        ]);
        $this->activity->record('replied', 'comments', $comment, $comment->authorName());
        SetCommentStatus::notifyParent($reply);

        return $reply;
    }
}
