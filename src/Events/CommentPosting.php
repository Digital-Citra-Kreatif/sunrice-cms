<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;

/**
 * A visitor's comment on an entry (or reply to `$parent`) is about to be
 * kept (PostComment), once their input passed the checks. A listener may
 * change `$body` and `$status` (Comment::APPROVED, PENDING or SPAM: what
 * Settings → Comments decided; a spam filter can hold it or mark it spam),
 * or refuse it by throwing a ValidationException (under "body"), which the
 * visitor sees on the comment form. What listeners leave is checked again.
 * `$user` is the commenter when signed in (else `$authorName` and
 * `$authorEmail` are theirs); `$source` is "site".
 *
 * @api
 */
final class CommentPosting
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Entry $entry,
        public readonly ?Comment $parent,
        public readonly ?string $authorName,
        public readonly ?string $authorEmail,
        public readonly string $locale,
        public string $body,
        public string $status,
    ) {
        $this->recordActor(source: 'site');
    }
}
