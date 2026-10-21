<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Settings\SwitchMainLanguage;
use Sunrice\Cms\Support\Locales;

/**
 * Settings → Languages → Main language: make another language the main
 * one (cms.settings.locales).
 *
 * @internal
 */
final class LanguageController
{
    public function main(string $locale, SwitchMainLanguage $switch): RedirectResponse
    {
        try {
            $switch->handle($locale);
        } catch (ValidationException $refused) {
            $message = $refused->validator->errors()->first();

            return back()->with('error', str_replace(' (--copy-missing)', ' (php artisan sunrice:switch-main-language --copy-missing)', $message));
        }

        return back()->with('success', __(':language is the main language now.', ['language' => Locales::name($locale)]));
    }
}
