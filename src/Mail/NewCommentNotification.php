<?php

declare(strict_types=1);

namespace Sunrice\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Sunrice\Admin\AdminUrls;
use Sunrice\Models\Comment;

/** To the moderators, for each new comment (Settings → Comments). Queued. */
class NewCommentNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Comment $comment) {}

    public function envelope(): Envelope
    {
        $title = $this->comment->entry?->mainTranslation()->title ?? 'an entry';

        return new Envelope(
            subject: ($this->comment->isApproved() ? 'New comment on ' : 'Comment waiting for approval on ').$title,
        );
    }

    public function content(): Content
    {
        $entry = $this->comment->entry;
        $path = $entry?->url;

        return new Content(
            text: 'sunrice::mail.comment-new',
            with: [
                'comment' => $this->comment,
                'title' => $entry?->mainTranslation()->title ?? '',
                'pageUrl' => $path === null ? null : url($path).'#comment-'.$this->comment->id,
                'adminUrl' => $entry === null ? null : AdminUrls::entry($entry),
            ],
        );
    }
}
