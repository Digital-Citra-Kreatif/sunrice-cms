<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Security\Captcha;
use Sunrice\Cms\Actions\Forms\SubmitForm;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Support\SafeUrl;

/**
 * POST /forms/{handle}: a visitor sends a form. Behind the honeypot, a
 * per-address limit and, when the form asks, the captcha; answers JSON to
 * requests that ask for it.
 *
 * @internal
 */
final class FormController
{
    /** The error key of a missing or wrong captcha answer. */
    public const CAPTCHA = '_captcha';

    /** The session key the success message is flashed under, per form. */
    public static function flashKey(Form $form): string
    {
        return 'sunrice-cms.form.'.$form->handle;
    }

    public function __invoke(Request $request, Form $form, SubmitForm $submit, Captcha $captcha): RedirectResponse|JsonResponse
    {
        $locale = $request->input('locale');
        $locale = is_string($locale) ? $locale : app()->getLocale();
        try {
            // The captcha first: nothing else is looked at until it's passed.
            if ($form->captcha && ! $captcha->passes($request)) {
                throw ValidationException::withMessages([self::CAPTCHA => Lang::get('Please confirm you\'re not a robot, then send the form again.', [], $locale)]);
            }
            $submit->handle($form, $request->except(['_token', 'locale', $captcha->field()]), $locale);
        } catch (ValidationException $e) {
            // Errors under the form's own bag, so two forms on a page don't mix them up.
            throw $e->errorBag($form->handle);
        }
        $redirect = $form->redirect_url !== null && SafeUrl::isSafe($form->redirect_url) ? $form->redirect_url : null;

        if ($request->expectsJson()) {
            return response()->json(['message' => $form->successMessage(), 'redirect_url' => $redirect], 201);
        }

        return ($redirect !== null ? redirect()->to($redirect) : redirect()->back())->with(self::flashKey($form), $form->successMessage());
    }
}
