<?php

declare(strict_types=1);

namespace Sunrice\Cms\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Tells those who may publish that a draft waits for their review, with a
 * link to it.
 *
 * @internal
 */
final class ReviewRequested extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public EntryTranslation $translation, public ?Model $requester = null) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Waiting for your review: '.Str::limit($this->translation->draft_title, 80));
    }

    public function content(): Content
    {
        $name = $this->requester?->getAttribute('name');

        return new Content(view: 'sunrice-cms::mail.review-requested', with: [
            'title' => $this->translation->draft_title,
            'collection' => $this->translation->entry->collection->title,
            'requester' => is_string($name) && $name !== '' ? $name : 'Someone',
            'url' => route('sunrice.admin.cms.entries.edit', [
                'entry' => $this->translation->entry_id,
                ...($this->translation->locale === Locales::default() ? [] : ['locale' => $this->translation->locale]),
            ]),
        ]);
    }
}
