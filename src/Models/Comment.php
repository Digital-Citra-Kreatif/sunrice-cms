<?php

declare(strict_types=1);

namespace Sunrice\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Carbon;
use Sunrice\Database\Factories\CommentFactory;

/**
 * A visitor's comment on an entry, or a reply to another comment
 * (parent_id). Only approved comments are shown on the site.
 *
 * @property int $id
 * @property int $entry_id
 * @property int|null $parent_id
 * @property int|null $user_id
 * @property string $author_name
 * @property string|null $author_email
 * @property string $body
 * @property string $status
 * @property string $locale
 * @property bool $notify_replies
 * @property string|null $ip_hash
 * @property string|null $user_agent
 * @property Carbon|null $approved_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
class Comment extends Model
{
    /** @use HasFactory<CommentFactory> */
    use HasFactory, Prunable, SoftDeletes;

    public const PENDING = 'pending';

    public const APPROVED = 'approved';

    public const SPAM = 'spam';

    public const STATUSES = [self::PENDING, self::APPROVED, self::SPAM];

    /** Moderation (sunrice.comments.moderation): which new comments wait for approval. */
    public const MODERATION = ['all', 'first_time', 'none'];

    protected $table = 'sunrice_comments';

    protected $guarded = [];

    protected $casts = [
        'approved_at' => 'datetime',
        'notify_replies' => 'boolean',
    ];

    protected static function newFactory(): CommentFactory
    {
        return CommentFactory::new();
    }

    /** @return BelongsTo<Entry, $this> */
    public function entry(): BelongsTo
    {
        return $this->belongsTo(Entry::class);
    }

    /** @return BelongsTo<Comment, $this> */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /** @return HasMany<Comment, $this> */
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    /** @return BelongsTo<Model, $this> */
    public function user(): BelongsTo
    {
        /** @var class-string<Model> $model */
        $model = config('sunrice.auth.user_model');

        return $this->belongsTo($model, 'user_id');
    }

    /**
     * @param  Builder<Comment>  $query
     * @return Builder<Comment>
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', self::APPROVED);
    }

    /**
     * @param  Builder<Comment>  $query
     * @return Builder<Comment>
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', self::PENDING);
    }

    public function isApproved(): bool
    {
        return $this->status === self::APPROVED;
    }

    /**
     * The status a new comment starts with, by the moderation setting:
     * 'all' holds every comment, 'first_time' holds a commenter's
     * comments until one of theirs has been approved, 'none' publishes
     * at once. Moderators' own comments are always approved.
     */
    public static function initialStatus(?string $email, ?int $userId = null, bool $moderator = false): string
    {
        if ($moderator) {
            return self::APPROVED;
        }

        return match (config('sunrice.comments.moderation', 'first_time')) {
            'none' => self::APPROVED,
            'all' => self::PENDING,
            default => static::hasApprovedBefore($email, $userId) ? self::APPROVED : self::PENDING,
        };
    }

    protected static function hasApprovedBefore(?string $email, ?int $userId): bool
    {
        if ($userId === null && ($email === null || $email === '')) {
            return false;
        }

        return static::query()->approved()
            ->where(fn (Builder $q) => $q
                ->when($userId !== null, fn (Builder $q) => $q->orWhere('user_id', $userId))
                ->when($email !== null && $email !== '', fn (Builder $q) => $q->orWhere('author_email', mb_strtolower((string) $email))))
            ->exists();
    }

    /** A visitor's IP, hashed with the app key so it can't be read back. */
    public static function hashIp(?string $ip): ?string
    {
        return $ip === null ? null : hash_hmac('sha256', $ip, (string) config('app.key'));
    }

    /**
     * Spam is deleted after sunrice.comments.prune_spam_after_days
     * (null keeps it).
     *
     * @return Builder<static>
     */
    public function prunable(): Builder
    {
        $days = config('sunrice.comments.prune_spam_after_days');

        if ($days === null) {
            return static::query()->whereRaw('1 = 0');
        }

        // Trashed spam too (withTrashed(), without the macro's loose type).
        return static::query()->withoutGlobalScope(SoftDeletingScope::class)->where('status', self::SPAM)->where('created_at', '<=', now()->subDays((int) $days));
    }
}
