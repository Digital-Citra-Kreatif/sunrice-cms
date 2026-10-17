<?php

declare(strict_types=1);

namespace Sunrice\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;
use Sunrice\Models\Comment;

/**
 * To a commenter who ticked "Notify me of replies", when a reply to
 * their comment goes live. Written in the language they commented in,
 * with a signed link to stop these emails. Queued.
 */
class CommentReplyNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Comment $reply, public Comment $parent)
    {
        $this->locale($parent->locale);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('sunrice::frontend.comment_reply_subject', ['name' => $this->reply->author_name]),
        );
    }

    public function content(): Content
    {
        $entry = $this->reply->entry;
        // In the commenter's language: its title and its address.
        $title = $entry === null ? '' : $entry->resolveFor($this->parent->locale)->title;
        $path = $entry?->url;

        return new Content(
            text: 'sunrice::mail.comment-reply',
            with: [
                'reply' => $this->reply,
                'title' => $title,
                'url' => $path === null ? null : url($path).'#comment-'.$this->reply->id,
                'unsubscribeUrl' => URL::signedRoute('sunrice.frontend.comments.unsubscribe', ['comment' => $this->parent->id]),
            ],
        );
    }
}
