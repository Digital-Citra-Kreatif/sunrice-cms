<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Comments;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Mail\CommentPosted;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Settings\CommentSettings;
use Sunrice\Cms\Support\Locales;
use Throwable;

/**
 * A visitor comments on an entry, or replies to a comment: checked,
 * published or held as Settings → Comments says, and moderators told.
 * Input: body, parent_id, and for guests author_name and author_email;
 * notify_replies.
 *
 * @api
 */
final class PostComment
{
    public const MAX_LENGTH = 5000;

    public function __construct(private readonly CommentSettings $settings) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(Entry $entry, array $input, ?Model $user = null, ?string $locale = null, ?string $ip = null): Comment
    {
        $locale = $locale !== null && Locales::has($locale) ? $locale : Locales::default();
        if (! $entry->acceptsComments()) {
            throw ValidationException::withMessages(['body' => Lang::get('sunrice-cms::site.comments.closed', [], $locale)]);
        }
        if ($user === null && $this->settings->signedInOnly) {
            throw ValidationException::withMessages(['body' => Lang::get('sunrice-cms::site.comments.sign_in', [], $locale)]);
        }
        $guest = $user === null;
        /** @var array{body: string, parent_id?: int|string|null, author_name?: string, author_email?: string, notify_replies?: bool|string|null} $valid */
        $valid = Validator::make($input, [
            'body' => ['required', 'string', 'max:'.self::MAX_LENGTH],
            'parent_id' => ['nullable', 'integer'],
            'author_name' => $guest ? ['required', 'string', 'max:100'] : ['prohibited'],
            'author_email' => $guest ? ['required', 'string', 'email', 'max:255'] : ['prohibited'],
            'notify_replies' => ['nullable', 'boolean'],
        ], [], ['body' => 'comment', 'author_name' => 'name', 'author_email' => 'email'])->validate();

        $parent = null;
        if (($valid['parent_id'] ?? null) !== null) {
            $parent = Comment::query()->where('entry_id', $entry->id)->approved()->find((int) $valid['parent_id']);
            if ($parent === null) {
                throw ValidationException::withMessages(['parent_id' => Lang::get('sunrice-cms::site.comments.parent_gone', [], $locale)]);
            }
        }
        $moderator = $user !== null && Gate::forUser($user)->allows('cms.comments.moderate');
        $email = $guest ? Str::lower(trim($valid['author_email'] ?? '')) : null;
        $name = $guest ? Str::squish($valid['author_name'] ?? '') : null;
        $ipHash = $ip !== null ? hash_hmac('sha256', $ip, is_string($appKey = config('app.key')) ? $appKey : '') : null;
        $trusted = $guest ? $this->trusted($email, $name, $ipHash) : null;
        $status = $moderator ? Comment::APPROVED : $this->status($user, $trusted);
        // A guest's address isn't proven: they're signed up only when a moderator sees the comment
        // (it's held), or when they asked on the comment that earned their trust.
        $notify = $this->settings->replyNotifications && filter_var($valid['notify_replies'] ?? false, FILTER_VALIDATE_BOOL)
            && ($user !== null || $status === Comment::PENDING || ($trusted !== null && $trusted->notify_replies));
        $key = $user?->getKey();

        $comment = $entry->comments()->create([
            'parent_id' => $parent?->id,
            'user_id' => is_int($key) ? $key : (is_numeric($key) ? (int) $key : null),
            'author_name' => $name,
            'author_email' => $email,
            'body' => trim(str_replace("\r\n", "\n", $valid['body'])),
            'status' => $status,
            'locale' => $locale,
            'notify_replies' => $notify,
            'ip_hash' => $ipHash,
        ]);
        $comment->setRelation('entry', $entry);
        if ($comment->isApproved()) {
            SetCommentStatus::notifyParent($comment);
        }
        if (! $moderator && $this->settings->notifyModerators) {
            $this->tellModerators($comment);
        }

        return $comment;
    }

    /** Published at once, or held, as Settings → Comments says. */
    private function status(?Model $user, ?Comment $trusted): string
    {
        return match ($this->settings->moderation) {
            CommentSettings::HOLD_NONE => Comment::APPROVED,
            CommentSettings::HOLD_ALL => Comment::PENDING,
            // Someone with a comment approved before: a user by their account, a guest by the comment that earned their trust.
            default => ($user !== null ? Comment::query()->approved()->where('user_id', $user->getKey())->exists() : $trusted !== null)
                ? Comment::APPROVED : Comment::PENDING,
        };
    }

    /**
     * The guest's latest approved comment with the same name, email and
     * address (its hash): what lets their next comment through when only
     * the first is held. An email alone proves nothing, so a different
     * name or address is held again.
     */
    private function trusted(?string $email, ?string $name, ?string $ipHash): ?Comment
    {
        if ($email === null || $email === '' || $ipHash === null || $this->settings->moderation !== CommentSettings::HOLD_FIRST) {
            return null;
        }

        return Comment::query()->approved()->whereNull('user_id')
            ->where('author_email', $email)->where('author_name', $name)->where('ip_hash', $ipHash)
            ->latest('id')->first();
    }

    private function tellModerators(Comment $comment): void
    {
        $addresses = $this->settings->extraEmails();
        try {
            // Users with the permission, directly or through a role (spatie/laravel-permission's scope).
            $moderators = app(Panel::class)->getUserModel()::query()->__call('permission', ['cms.comments.moderate']);
            foreach ($moderators instanceof Builder ? $moderators->get() : [] as $moderator) {
                $address = $moderator->getAttribute('email');
                if (is_string($address)) {
                    $addresses[] = $address;
                }
            }
        } catch (Throwable) {
            // The permission isn't synced yet: the extra addresses only.
        }
        // One email each: the addresses aren't shown to each other.
        foreach (array_unique($addresses) as $address) {
            Mail::to($address)->queue(new CommentPosted($comment));
        }
    }
}
