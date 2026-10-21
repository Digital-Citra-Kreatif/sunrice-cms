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
                $row['value'] .= ' ('.self::size($file['size']).')';
            }
            // Several files: each with its size and its link in the admin.
            $row['files'] = array_map(function (array $one, int $index) use ($file): array {
                $size = is_array($file) && is_array($file[$index] ?? null) && is_int($file[$index]['size'] ?? null) ? $file[$index]['size'] : null;

                return ['name' => $one['name'], 'size' => $size === null ? null : self::size($size), 'url' => AppUrl::url($one['url'])];
            }, $row['files'], array_keys($row['files']));
            $rows[] = $row;
        }

        return new Content(view: 'sunrice-cms::mail.submission', with: [
            'form' => $submission->form,
            // Sent while a visitor submits: file links on APP_URL, not their Host header.
            'rows' => array_map(fn (array $row): array => [...$row, 'file' => $row['file'] !== null ? AppUrl::url($row['file']) : null], $rows),
            'page' => $submission->referrer,
            'language' => Locales::name($submission->locale),
            'admin' => AppUrl::route('sunrice.admin.cms.forms.submissions.index', ['form' => $submission->form->handle]),
        ]);
    }

    /** A file's size in bytes as people read it ("820 KB"). */
    private static function size(int $bytes): string
    {
        return FileField::size(max(1, intdiv($bytes, 1024)));
    }
}
