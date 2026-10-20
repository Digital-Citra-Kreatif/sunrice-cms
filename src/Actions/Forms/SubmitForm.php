<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Forms;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Fields\Types\FileField;
use Sunrice\Cms\Mail\SubmissionReceived;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\RoleMembers;

/**
 * Keeps what a visitor sent with a form, checked against its fields (files
 * kept on the private upload disk), with who sent it (IP address, user
 * agent, referrer; unless sunrice-cms.forms.visitor_details is off), and
 * emails it to the form's addresses and the members of its roles (queued
 * when the app has a queue).
 *
 * @api
 */
final class SubmitForm
{
    /**
     * @param  array<mixed>  $input  the visitor's values by field handle
     * @param  string|null  $referrer  the page it was sent from
     *
     * @throws ValidationException
     */
    public function handle(Form $form, array $input, ?string $locale = null, ?string $ip = null, ?string $userAgent = null, ?string $referrer = null): Submission
    {
        $schema = $form->schema();
        $data = array_intersect_key($input, array_flip(array_map(fn ($field): string => $field->handle, $schema->fields())));
        $rules = $schema->rules($data);
        $attributes = EntryInput::attributes($schema, array_keys($rules));
        // Messages name fields without the "data." the rules are keyed under.
        $validator = Validator::make(['data' => $data], $rules, [], $attributes);
        if ($validator->fails()) {
            $errors = [];
            foreach ($validator->errors()->messages() as $key => $messages) {
                $errors[str_starts_with($key, 'data.') ? substr($key, 5) : $key] = $messages;
            }
            throw ValidationException::withMessages($errors);
        }

        $data = $this->storeFiles($form, $data);
        $visitor = config('sunrice-cms.forms.visitor_details', true) !== false;
        $submission = $form->submissions()->create([
            'locale' => $locale !== null && Locales::has($locale) ? $locale : Locales::default(),
            'data' => $schema->normalize($data),
            'ip_address' => $visitor && $ip !== null && filter_var($ip, FILTER_VALIDATE_IP) !== false ? $ip : null,
            'user_agent' => $visitor ? self::cut($userAgent, 512) : null,
            'referrer' => $visitor && $referrer !== null && preg_match('#^https?://#i', $referrer) === 1 ? self::cut($referrer, 2000) : null,
        ]);

        $addresses = array_values(array_filter($form->notify ?? [], fn (string $address): bool => filter_var($address, FILTER_VALIDATE_EMAIL) !== false));
        // One email each, to the addresses and the roles' members: the addresses aren't shown to each other.
        foreach (array_unique([...$addresses, ...RoleMembers::emails($form->notify_roles ?? [])]) as $address) {
            Mail::to($address)->queue(new SubmissionReceived($submission));
        }

        return $submission;
    }

    private static function cut(?string $text, int $length): ?string
    {
        $text = $text === null ? '' : trim(mb_substr($text, 0, $length));

        return $text !== '' ? $text : null;
    }

    /** The disk files sent with forms are kept on (never public). */
    public static function disk(): string
    {
        $disk = config('sunrice-cms.forms.upload_disk', 'local');

        return is_string($disk) && $disk !== '' ? $disk : 'local';
    }

    /**
     * Files sent, kept under form-uploads/{handle} with names of their own;
     * in the data as {path, name, size, mime}.
     *
     * @param  array<mixed>  $data
     * @return array<mixed>
     */
    private function storeFiles(Form $form, array $data): array
    {
        foreach ($form->schema()->fields() as $field) {
            $file = $data[$field->handle] ?? null;
            if ($field->type !== FileField::TYPE) {
                continue;
            }
            if (! $file instanceof UploadedFile) {
                $data[$field->handle] = null;

                continue;
            }
            $path = $file->store('form-uploads/'.$form->handle, ['disk' => self::disk()]);
            $name = Str::limit(basename(str_replace('\\', '/', $file->getClientOriginalName())), 200, '');
            $data[$field->handle] = $path === false ? null : [
                'path' => $path,
                'name' => $name !== '' ? $name : basename($path),
                'size' => (int) $file->getSize(),
                'mime' => $file->getMimeType() ?? 'application/octet-stream',
            ];
        }

        return $data;
    }
}
