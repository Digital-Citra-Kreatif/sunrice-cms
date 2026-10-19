<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Comments;

use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Comment;

/**
 * Moves a comment to the trash (its replies stay; they show without it),
 * or back with restore().
 *
 * @api
 */
final class TrashComment
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Comment $comment): void
    {
        if ($comment->trashed()) {
            return;
        }
        $comment->delete();
        $this->activity->record('trashed', 'comments', $comment, $comment->authorName());
    }

    public function restore(Comment $comment): void
    {
        if (! $comment->trashed()) {
            return;
        }
        $comment->restore();
        $this->activity->record('restored', 'comments', $comment, $comment->authorName());
    }
}
