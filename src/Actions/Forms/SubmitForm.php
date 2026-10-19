<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Forms;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Mail\SubmissionReceived;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\Locales;

/**
 * Keeps what a visitor sent with a form, checked against its fields, and
 * emails it to the form's addresses (queued when the app has a queue).
 *
 * @api
 */
final class SubmitForm
{
    /**
     * @param  array<mixed>  $input  the visitor's values by field handle
     *
     * @throws ValidationException
     */
    public function handle(Form $form, array $input, ?string $locale = null): Submission
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

        $submission = $form->submissions()->create([
            'locale' => $locale !== null && Locales::has($locale) ? $locale : Locales::default(),
            'data' => $schema->normalize($data),
        ]);

        $addresses = array_values(array_filter($form->notify ?? [], fn (string $address): bool => filter_var($address, FILTER_VALIDATE_EMAIL) !== false));
        if ($addresses !== []) {
            Mail::to($addresses)->queue(new SubmissionReceived($submission));
        }

        return $submission;
    }
}
