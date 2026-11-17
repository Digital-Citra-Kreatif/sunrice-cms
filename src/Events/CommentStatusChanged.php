<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Comment;

/**
 * A moderator approved a comment, held it again or marked it spam
 * (SetCommentStatus; also when answering a held comment approves it).
 * `$previous` is the status it had; `$comment->status` the new one
 * (Comment::APPROVED, PENDING or SPAM).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class CommentStatusChanged implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Comment $comment,
        public readonly string $previous,
    ) {
        $this->recordActor();
    }
}
