<?php

declare(strict_types=1);

namespace Sunrice\Support;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Sunrice\Mail\CommentReplyNotification;
use Sunrice\Mail\NewCommentNotification;
use Sunrice\Models\Comment;

/**
 * Comment emails (queued): moderators hear about every new comment,
 * and a commenter who asked for it hears about approved replies.
 */
class CommentNotifier
{
    /** A new comment: email the moderators (Settings → Comments). */
    public function posted(Comment $comment): void
    {
        if (! config('sunrice.comments.notify')) {
            return;
        }

        $emails = array_diff($this->moderatorEmails(), array_filter([$comment->author_email]));
        if ($emails !== []) {
            Mail::to(array_values($emails))->queue(new NewCommentNotification($comment));
        }
    }

    /** A comment went live: tell the author of the comment it answers. */
    public function approved(Comment $comment): void
    {
        $parent = $comment->parent;
        if ($parent === null || ! $parent->notify_replies || ! $parent->isApproved()
            || $parent->author_email === null || ! config('sunrice.comments.reply_notifications')) {
            return;
        }
        // Not for answering yourself.
        if ($parent->author_email === $comment->author_email || ($parent->user_id !== null && $parent->user_id === $comment->user_id)) {
            return;
        }

        Mail::to($parent->author_email)->queue(new CommentReplyNotification($comment, $parent));
    }

    /**
     * The ticked roles' users (none ticked: everyone who can moderate
     * comments, super admins included) plus the extra addresses.
     *
     * @return array<int, string>
     */
    public function moderatorEmails(): array
    {
        /** @var class-string<Model> $model */
        $model = config('sunrice.auth.user_model');
        $roles = array_values(array_filter((array) config('sunrice.comments.notify_roles', [])));

        $users = $model::query()->whereHas('roles', fn (Builder $q) => $roles !== []
            ? $q->whereIn('name', $roles)
            : $q->where(fn (Builder $q) => $q->where('name', config('sunrice.super_admin_role'))
                ->orWhereHas('permissions', fn (Builder $q) => $q->where('name', 'sunrice.comments.moderate'))));
        if ($roles === []) {
            $users->orWhereHas('permissions', fn (Builder $q) => $q->where('name', 'sunrice.comments.moderate'));
        }

        $emails = [
            ...$users->pluck('email')->all(),
            ...(array) config('sunrice.comments.notify_emails', []),
        ];

        return array_values(array_unique(array_filter(array_map(fn ($email) => is_string($email) ? mb_strtolower(trim($email)) : '', $emails))));
    }
}
