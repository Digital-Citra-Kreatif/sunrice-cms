<?php

declare(strict_types=1);

namespace Sunrice\Actions\Comments;

use Illuminate\Validation\Rule;
use Sunrice\Events\ContentChanged;
use Sunrice\Models\Comment;
use Sunrice\Support\CommentNotifier;

/**
 * Moderation: approve, hold (pending) or mark as spam, edit the text,
 * trash, restore and delete for good. Changes to what the site shows
 * clear the page cache, and an approval tells the author of the
 * comment it answers (when they asked to be emailed).
 */
class ModerateComment
{
    public const ACTIONS = ['approve', 'pending', 'spam', 'trash', 'restore', 'delete'];

    public function __construct(protected CommentNotifier $notifier) {}

    public function handle(Comment $comment, string $action): void
    {
        validator(['action' => $action], ['action' => ['required', Rule::in(self::ACTIONS)]])->validate();
        $wasVisible = $comment->isApproved() && ! $comment->trashed();
        $firstApproval = $comment->approved_at === null;

        match ($action) {
            'approve' => $this->setStatus($comment, Comment::APPROVED),
            'pending' => $this->setStatus($comment, Comment::PENDING),
            'spam' => $this->setStatus($comment, Comment::SPAM),
            'trash' => $comment->delete(),
            'restore' => $comment->restore(),
            'delete' => $comment->forceDelete(),
        };

        $isVisible = $action !== 'delete' && $comment->isApproved() && ! $comment->trashed();
        if ($wasVisible !== $isVisible) {
            ContentChanged::dispatch('comment_saved');
        }
        // Replies are announced once, on their first approval.
        if ($firstApproval && $isVisible && $action === 'approve') {
            $this->notifier->approved($comment);
        }
    }

    /** Edits a comment's text (moderators fix typos or remove links). */
    public function edit(Comment $comment, string $body): void
    {
        $validated = validator(['body' => $body], ['body' => ['required', 'string', 'min:2', 'max:5000']])->validate();
        $comment->update(['body' => trim((string) $validated['body'])]);

        if ($comment->isApproved()) {
            ContentChanged::dispatch('comment_saved');
        }
    }

    /** approved_at stays the first approval's time, even when held again later. */
    protected function setStatus(Comment $comment, string $status): void
    {
        $comment->update([
            'status' => $status,
            'approved_at' => $comment->approved_at ?? ($status === Comment::APPROVED ? now() : null),
        ]);
    }
}
