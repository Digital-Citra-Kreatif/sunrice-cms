<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Comments;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Comment;

/**
 * Deletes a comment from the trash for good; its replies move up to its
 * parent.
 *
 * @api
 */
final class DeleteComment
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(Comment $comment): void
    {
        if (! $comment->trashed()) {
            throw ValidationException::withMessages(['comment' => 'Move the comment to the trash first.']);
        }
        // Explicitly, not by the foreign key: not every connection enforces it.
        Comment::query()->withTrashed()->where('parent_id', $comment->id)->update(['parent_id' => $comment->parent_id]);
        $comment->forceDelete();
        $this->activity->record('deleted', 'comments', $comment, $comment->authorName());
    }
}
