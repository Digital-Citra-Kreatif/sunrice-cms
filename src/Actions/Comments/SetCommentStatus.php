<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Comments;

use Illuminate\Support\Facades\Mail;
use InvalidArgumentException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Mail\CommentReplied;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Settings\CommentSettings;

/**
 * Approves a comment, holds it again (pending) or marks it spam. A reply
 * approved for the first time emails its parent's author, when they asked.
 *
 * @api
 */
final class SetCommentStatus
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Comment $comment, string $status): Comment
    {
        if (! in_array($status, [Comment::PENDING, Comment::APPROVED, Comment::SPAM], true)) {
            throw new InvalidArgumentException("Unknown comment status \"{$status}\".");
        }
        if ($comment->status === $status) {
            return $comment;
        }
        $comment->status = $status;
        $comment->save();
        $this->activity->record(match ($status) {
            Comment::APPROVED => 'approved',
            Comment::SPAM => 'marked as spam',
            default => 'unapproved',
        }, 'comments', $comment, $comment->authorName());
        if ($comment->isApproved()) {
            self::notifyParent($comment);
        }

        return $comment;
    }

    /**
     * Emails the author of the comment this one answers, once, when they
     * asked to be told and didn't write the reply themselves.
     */
    public static function notifyParent(Comment $reply): void
    {
        $parent = $reply->parent;
        if ($parent === null || ! $parent->notify_replies || $reply->reply_notified_at !== null || ! app(CommentSettings::class)->replyNotifications) {
            return;
        }
        $to = $parent->authorEmail();
        $self = ($parent->user_id !== null && $parent->user_id === $reply->user_id)
            || ($parent->user_id === null && $reply->user_id === null && $to !== null && $to === $reply->author_email);
        if ($to === null || $self) {
            return;
        }
        $reply->forceFill(['reply_notified_at' => now()])->saveQuietly();
        Mail::to($to)->queue(new CommentReplied($reply));
    }
}
