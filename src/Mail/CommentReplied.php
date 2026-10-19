<?php

declare(strict_types=1);

namespace Sunrice\Cms\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;
use Sunrice\Cms\Models\Comment;

/**
 * Tells a commenter someone replied, in the language they commented in,
 * with a link that stops these emails for that comment.
 *
 * @internal
 */
final class CommentReplied extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Comment $reply)
    {
        $this->locale($reply->parent->locale ?? $reply->locale);
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: __(':name replied to your comment', ['name' => $this->reply->authorName()]));
    }

    public function content(): Content
    {
        $parent = $this->reply->parent;
        $translation = $this->reply->entry->translation($parent->locale ?? $this->reply->locale) ?? $this->reply->entry->mainTranslation();
        $url = $translation?->url();

        return new Content(view: 'sunrice-cms::mail.comment-replied', with: [
            'reply' => $this->reply,
            'title' => $translation->title ?? '',
            'url' => $url !== null ? $url.'#comment-'.$this->reply->id : null,
            'unsubscribe' => URL::signedRoute('sunrice.cms.comments.unsubscribe', ['comment' => $parent?->id]),
        ]);
    }
}
