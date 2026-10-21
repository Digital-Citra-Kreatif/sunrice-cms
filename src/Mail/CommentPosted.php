<?php

declare(strict_types=1);

namespace Sunrice\Cms\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Sunrice\Cms\Models\Comment;

/**
 * Tells moderators about a new comment, with a link to moderate it.
 *
 * @internal
 */
final class CommentPosted extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Comment $comment) {}

    public function envelope(): Envelope
    {
        $title = $this->comment->entry->mainTranslation()->title ?? $this->comment->entry->mainTranslation()->draft_title ?? 'an entry';

        return new Envelope(subject: ($this->comment->isApproved() ? 'New comment on ' : 'A comment to approve on ').Str::limit((string) $title, 80));
    }

    public function content(): Content
    {
        $translation = $this->comment->entry->translation($this->comment->locale) ?? $this->comment->entry->mainTranslation();

        return new Content(view: 'sunrice-cms::mail.comment-posted', with: [
            'comment' => $this->comment,
            'title' => $translation->title ?? $translation->draft_title ?? '',
            'url' => $translation?->url(),
            // The entry's comments with this one's status: those that came after it too.
            'moderate' => route('sunrice.admin.cms.comments.index', ['entry' => $this->comment->entry_id, 'status' => $this->comment->status]),
        ]);
    }
}
