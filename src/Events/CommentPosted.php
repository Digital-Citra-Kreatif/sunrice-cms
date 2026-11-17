<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Comment;

/**
 * A comment was kept: a visitor's (PostComment; `$source` "site";
 * `$comment->status` says whether it's approved or held) or a moderator's
 * reply from the admin (ReplyToComment).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class CommentPosted implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    /** @param string|null $source "site" for a visitor's comment; null: the current one (ActivityLog::currentSource()) */
    public function __construct(
        public readonly Comment $comment,
        ?string $source = null,
    ) {
        $this->recordActor(source: $source);
    }
}
