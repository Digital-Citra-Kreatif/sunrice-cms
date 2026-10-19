<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Forms\SubmitForm;
use Sunrice\Cms\Models\Form;

/**
 * POST /forms/{handle}: a visitor sends a form. Behind the honeypot and a
 * per-address limit; answers JSON to requests that ask for it.
 *
 * @internal
 */
final class FormController
{
    /** The session key the success message is flashed under, per form. */
    public static function flashKey(Form $form): string
    {
        return 'sunrice-cms.form.'.$form->handle;
    }

    public function __invoke(Request $request, Form $form, SubmitForm $submit): RedirectResponse|JsonResponse
    {
        $input = $request->except(['_token', 'locale']);
        $locale = $request->input('locale');
        try {
            $submit->handle($form, $input, is_string($locale) ? $locale : app()->getLocale());
        } catch (ValidationException $e) {
            // Errors under the form's own bag, so two forms on a page don't mix them up.
            throw $e->errorBag($form->handle);
        }

        if ($request->expectsJson()) {
            return response()->json(['message' => $form->successMessage()], 201);
        }

        return redirect()->back()->with(self::flashKey($form), $form->successMessage());
    }
}
