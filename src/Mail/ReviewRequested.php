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
use Sunrice\Admin\Support\AppUrl;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Tells those who may publish that a draft (or a live entry's unpublished
 * changes) waits for their review, with a link to it and to the live page.
 *
 * @internal
 */
final class ReviewRequested extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * $requester is private: a public property would reach the view as
     * well, over its "requester" (the name), and print the user record.
     */
    public function __construct(public EntryTranslation $translation, private ?Model $requester = null) {}

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
            'requester' => is_string($name) && $name !== '' ? $name : __('Someone'),
            // Live already: what's to review are its unpublished changes, beside the live page.
            'changes' => $this->translation->isLive() && $this->translation->hasUnpublishedChanges(),
            'liveUrl' => $this->translation->isLive() && ! $this->translation->entry->trashed() ? $this->translation->url() : null,
            'url' => AppUrl::route('sunrice.admin.cms.collections.entries.edit', [
                'collection' => $this->translation->entry->collection->handle,
                'entry' => $this->translation->entry_id,
                ...($this->translation->locale === Locales::default() ? [] : ['locale' => $this->translation->locale]),
            ]),
        ]);
    }
}
