<?php

declare(strict_types=1);

namespace Sunrice\Cms\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Sunrice\Admin\Support\AppUrl;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Tells whoever sent a draft for review that it was sent back
 * (SendBackReview), with the reviewer's note and a link to the draft.
 *
 * @internal
 */
final class ReviewSentBack extends Mailable
{
    use Queueable;
    use SerializesModels;

    /** Plain strings only besides the translation: public properties go to the view as they are. */
    public function __construct(public EntryTranslation $translation, public ?string $reviewerName = null, public ?string $note = null) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Sent back: '.Str::limit($this->translation->draft_title, 80));
    }

    public function content(): Content
    {
        return new Content(view: 'sunrice-cms::mail.review-sent-back', with: [
            'title' => $this->translation->draft_title,
            'collection' => $this->translation->entry->collection->title,
            'reviewer' => $this->reviewerName ?? 'Someone',
            'url' => AppUrl::route('sunrice.admin.cms.collections.entries.edit', [
                'collection' => $this->translation->entry->collection->handle,
                'entry' => $this->translation->entry_id,
                ...($this->translation->locale === Locales::default() ? [] : ['locale' => $this->translation->locale]),
            ]),
        ]);
    }
}
