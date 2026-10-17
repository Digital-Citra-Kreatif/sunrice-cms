<?php

declare(strict_types=1);

namespace Sunrice\Actions\Comments;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Sunrice\Events\ContentChanged;
use Sunrice\Models\Comment;
use Sunrice\Models\Entry;
use Sunrice\Support\CommentNotifier;

/**
 * Stores a visitor's comment or reply on an entry. Guests give a name
 * and email; signed-in users comment as themselves. Whether it waits
 * for approval follows Settings → Comments (Comment::initialStatus).
 */
class PostComment
{
    public function __construct(protected CommentNotifier $notifier) {}

    /**
     * @param  array<string, mixed>  $input  body, parent_id, author_name, author_email, notify_replies
     * @param  array{ip?: string|null, user_agent?: string|null, locale?: string}  $meta
     *
     * @throws ValidationException
     */
    public function handle(Entry $entry, array $input, ?Authenticatable $user = null, array $meta = []): Comment
    {
        if (! $entry->acceptsComments()) {
            throw ValidationException::withMessages(['body' => __('sunrice::frontend.comments_closed')]);
        }
        if ($user === null && config('sunrice.comments.require_login')) {
            throw ValidationException::withMessages(['body' => __('sunrice::frontend.comments_login')]);
        }

        $validated = validator($input, [
            'body' => ['required', 'string', 'min:2', 'max:5000'],
            'parent_id' => ['nullable', 'integer'],
            'author_name' => [$user === null ? 'required' : 'nullable', 'string', 'max:100'],
            'author_email' => [$user === null ? 'required' : 'nullable', 'email', 'max:255'],
            'notify_replies' => ['nullable', 'boolean'],
        ], [], [
            'body' => __('sunrice::frontend.comment'),
            'author_name' => __('sunrice::frontend.comment_name'),
            'author_email' => __('sunrice::frontend.comment_email'),
        ])->validate();

        // Replies only to approved comments of the same entry.
        $parent = null;
        if (! empty($validated['parent_id'])) {
            $parent = Comment::query()->approved()->where('entry_id', $entry->id)->find((int) $validated['parent_id']);
            if ($parent === null) {
                throw ValidationException::withMessages(['parent_id' => __('sunrice::frontend.comment_reply_gone')]);
            }
        }

        $name = $user instanceof Model ? (string) ($user->getAttribute('name') ?? '') : '';
        $email = $user instanceof Model ? $user->getAttribute('email') : null;
        $name = $name !== '' ? $name : trim((string) ($validated['author_name'] ?? ''));
        $email = mb_strtolower(trim((string) ($email ?? $validated['author_email'] ?? ''))) ?: null;
        $userId = $user?->getAuthIdentifier();
        $moderator = $user instanceof Authorizable && $user->can('sunrice.comments.moderate');
        $status = Comment::initialStatus($email, is_numeric($userId) ? (int) $userId : null, $moderator);

        $comment = Comment::query()->create([
            'entry_id' => $entry->id,
            'parent_id' => $parent?->id,
            'user_id' => is_numeric($userId) ? (int) $userId : null,
            'author_name' => mb_substr($name, 0, 100),
            'author_email' => $email,
            'body' => trim((string) $validated['body']),
            'status' => $status,
            'approved_at' => $status === Comment::APPROVED ? now() : null,
            'locale' => $meta['locale'] ?? app()->getLocale(),
            'notify_replies' => config('sunrice.comments.reply_notifications') && $email !== null && ! empty($validated['notify_replies']),
            'ip_hash' => Comment::hashIp($meta['ip'] ?? null),
            'user_agent' => isset($meta['user_agent']) ? mb_substr((string) $meta['user_agent'], 0, 255) : null,
        ]);

        if ($comment->isApproved()) {
            ContentChanged::dispatch('comment_saved');
            $this->notifier->approved($comment);
        }
        if (! $moderator) {
            $this->notifier->posted($comment);
        }

        return $comment;
    }
}
