<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Users;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Actions\Users\DeleteUser;
use Sunrice\Cms\Actions\Comments\TrashComment;
use Sunrice\Cms\Actions\Entries\TrashEntry;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Revision;

/**
 * What happens to a deleted user's content (registered with
 * `$panel->userContent()`, run by the panel's DeleteUser):
 *
 * - entries: given to the heir, kept without an author, or trashed
 *   (restorable, without an author). Trashed entries follow too, so a
 *   later restore isn't tied to a ghost. Revisions never name the
 *   deleted user afterwards.
 * - comments: given to the heir, or kept (or trashed) as a guest's
 *   comment under the user's name and email.
 *
 * @api
 */
final class ReleaseUserContent
{
    public function __construct(private readonly TrashEntry $trashEntry, private readonly TrashComment $trashComment) {}

    public static function entries(Model $user): int
    {
        return Entry::query()->where('author_id', $user->getKey())->count();
    }

    public static function comments(Model $user): int
    {
        return Comment::query()->where('user_id', $user->getKey())->count();
    }

    public function handleEntries(Model $user, string $mode, ?Model $heir): void
    {
        $id = $user->getKey();
        if ($mode === DeleteUser::DELETE) {
            foreach (Entry::query()->where('author_id', $id)->with('translations')->lazyById(100) as $entry) {
                $this->trashEntry->handle($entry);
            }
        }
        Entry::withTrashed()->where('author_id', $id)->update(['author_id' => $heir?->getKey()]);
        Revision::query()->where('user_id', $id)->update(['user_id' => null]);
    }

    public function handleComments(Model $user, string $mode, ?Model $heir): void
    {
        $id = $user->getKey();
        if ($mode === DeleteUser::DELETE) {
            foreach (Comment::query()->where('user_id', $id)->lazyById(100) as $comment) {
                $this->trashComment->handle($comment);
            }
        }
        if ($heir === null) {
            // They become a guest's comments, still signed with the name and email they had.
            $name = $user->getAttribute('name');
            $email = $user->getAttribute('email');
            Comment::withTrashed()->where('user_id', $id)->whereNull('author_name')->update(['author_name' => is_string($name) ? $name : null]);
            Comment::withTrashed()->where('user_id', $id)->whereNull('author_email')->update(['author_email' => is_string($email) ? $email : null]);
        }
        Comment::withTrashed()->where('user_id', $id)->update(['user_id' => $heir?->getKey()]);
    }
}
