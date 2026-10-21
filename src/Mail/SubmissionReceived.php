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
use Sunrice\Cms\Fields\Types\FileField;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\Locales;

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
        $submission = $this->submission;
        $rows = [];
        foreach (SubmissionRows::of($submission) as $row) {
            // What was left empty isn't news.
            if ($row['value'] === '') {
                continue;
            }
            $file = $submission->data[$row['handle']] ?? null;
            if (is_array($file) && is_int($file['size'] ?? null)) {
                $row['value'] .= ' ('.FileField::size(max(1, intdiv($file['size'], 1024))).')';
            }
            $rows[] = $row;
        }

        return new Content(view: 'sunrice-cms::mail.submission', with: [
            'form' => $submission->form,
            'rows' => $rows,
            'page' => $submission->referrer,
            'language' => Locales::name($submission->locale),
            'admin' => route('sunrice.admin.cms.submissions.index', $submission->form->handle),
        ]);
    }
}
