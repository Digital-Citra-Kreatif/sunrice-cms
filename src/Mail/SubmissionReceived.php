<?php

declare(strict_types=1);

namespace Sunrice\Cms\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Sunrice\Admin\Support\AppUrl;
use Sunrice\Cms\Models\Submission;

/**
 * Tells a form's addresses what a visitor sent. Replies go to the
 * visitor when the form has a valid `email` field.
 *
 * @internal
 */
final class SubmissionReceived extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Submission $submission) {}

    public function envelope(): Envelope
    {
        $email = $this->submission->data['email'] ?? null;
        $replyTo = is_string($email) && filter_var($email, FILTER_VALIDATE_EMAIL) !== false ? [new Address($email)] : [];

        return new Envelope(subject: 'New submission: '.Str::limit($this->submission->form->title, 100), replyTo: $replyTo);
    }

    public function content(): Content
    {
        return new Content(view: 'sunrice-cms::mail.submission', with: [
            'form' => $this->submission->form,
            // Sent while a visitor submits: file links on APP_URL, not their Host header.
            'rows' => array_map(fn (array $row): array => [...$row, 'file' => $row['file'] !== null ? AppUrl::url($row['file']) : null], SubmissionRows::of($this->submission)),
        ]);
    }
}
