<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\HtmlString;
use Sunrice\Admin\Panel;

/**
 * A visitor's comment on an entry, or a reply to one (`parent_id`). One
 * thread per entry, in all its languages; `locale` is the one it was
 * written in. Plain text: html() prints it safely.
 *
 * @property int $id
 * @property int $entry_id
 * @property int|null $parent_id
 * @property int|null $user_id signed in when commenting
 * @property string|null $author_name a guest's name
 * @property string|null $author_email a guest's email, never shown
 * @property string $body
 * @property string $status pending, approved or spam
 * @property string $locale
 * @property bool $notify_replies email the author when someone replies
 * @property Carbon|null $reply_notified_at when the parent's author was told about this reply
 * @property string|null $ip_hash
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at in the trash
 * @property-read Entry $entry
 * @property-read Comment|null $parent
 * @property-read Collection<int, Comment> $replies
 *
 * @api
 */
class Comment extends Model
{
    use Prunable;
    use SoftDeletes;

    public const PENDING = 'pending';

    public const APPROVED = 'approved';

    public const SPAM = 'spam';

    protected $table = 'sunrice_comments';

    protected $guarded = [];

    protected function casts(): array
    {
        return ['notify_replies' => 'boolean', 'reply_notified_at' => 'datetime'];
    }

    /** @return BelongsTo<Entry, $this> */
    public function entry(): BelongsTo
    {
        return $this->belongsTo(Entry::class)->withTrashed();
    }

    /** @return BelongsTo<Comment, $this> */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id')->withTrashed();
    }

    /** @return HasMany<Comment, $this> */
    public function replies(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /** @param Builder<self> $query */
    public function scopeApproved(Builder $query): void
    {
        $query->where('status', self::APPROVED);
    }

    public function isApproved(): bool
    {
        return $this->status === self::APPROVED;
    }

    /**
     * The signed-in author's name and email, once looked up (withAuthors()).
     *
     * @var array{name: string|null, email: string|null}|null
     */
    private ?array $user = null;

    /**
     * Looks up the signed-in authors of these comments in one query.
     *
     * @param  iterable<Comment>  $comments
     */
    public static function withAuthors(iterable $comments): void
    {
        $ids = [];
        foreach ($comments as $comment) {
            if ($comment->user_id !== null) {
                $ids[$comment->user_id] = true;
            }
        }
        $users = [];
        foreach ($ids === [] ? [] : app(Panel::class)->getUserModel()::query()->whereKey(array_keys($ids))->get() as $user) {
            $key = $user->getKey();
            if (is_scalar($key)) {
                $users['u'.$key] = $user;
            }
        }
        foreach ($comments as $comment) {
            $user = $comment->user_id !== null ? ($users['u'.$comment->user_id] ?? null) : null;
            $name = $user?->getAttribute('name');
            $email = $user?->getAttribute('email');
            $comment->user = ['name' => is_string($name) ? $name : null, 'email' => is_string($email) ? $email : null];
        }
    }

    /** Who wrote it: the user's name, else the guest's. */
    public function authorName(): string
    {
        if ($this->user_id !== null) {
            if ($this->user === null) {
                self::withAuthors([$this]);
            }
            if (($this->user['name'] ?? '') !== '') {
                return (string) $this->user['name'];
            }
        }

        return $this->author_name !== null && $this->author_name !== '' ? $this->author_name : 'Anonymous';
    }

    /** The email replies go to: the user's, else the guest's. */
    public function authorEmail(): ?string
    {
        if ($this->user_id !== null) {
            if ($this->user === null) {
                self::withAuthors([$this]);
            }

            return $this->user['email'] ?? null;
        }

        return $this->author_email;
    }

    /** The text as HTML: escaped, line breaks kept, web addresses as links (nofollow, ugc). */
    public function html(): HtmlString
    {
        $html = (string) preg_replace_callback('#\bhttps?://(?:(?!&quot;|&\#039;|&lt;|&gt;)[^\s<>"\'])+#i', function (array $match): string {
            $url = rtrim($match[0], '.,;:!?)');
            $rest = substr($match[0], strlen($url));

            return '<a href="'.$url.'" rel="nofollow ugc noopener" target="_blank">'.$url.'</a>'.$rest;
        }, e($this->body));

        return new HtmlString(nl2br($html, false));
    }

    /**
     * Spam older than `sunrice-cms.comments.prune_spam_after_days`: deleted by the daily model:prune.
     *
     * @return Builder<static>
     */
    public function prunable(): Builder
    {
        $days = config('sunrice-cms.comments.prune_spam_after_days', 30);

        $query = static::query();
        if (is_numeric($days) && (int) $days > 0) {
            $query->withTrashed()->where('status', self::SPAM)->where('updated_at', '<', now()->subDays((int) $days));
        } else {
            $query->whereRaw('1 = 0');
        }

        return $query;
    }
}
