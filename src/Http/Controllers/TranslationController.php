<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Translations\SaveVisitorTranslations;
use Sunrice\Cms\Admin\VisitorTexts;
use Sunrice\Cms\Settings\LocaleSettings;
use Sunrice\Cms\Support\Locales;

/**
 * Content → Translations, behind cms.entries.translate: what visitors
 * read outside entries (forms, listing titles, menus, the site's
 * description), in a language besides the main one. On a site in one
 * language, the editor sends to Settings → Languages (or, for those who
 * can't add one, the dashboard).
 *
 * @internal
 */
final class TranslationController
{
    public function edit(Request $request): Response|RedirectResponse
    {
        $others = array_values(array_diff(Locales::all(), [Locales::default()]));
        if ($others === []) {
            // One language: where a second one is added, for those who may, else the dashboard; not a bare 404.
            return $request->user()?->can('cms.settings.locales') === true
                ? redirect()->route('sunrice.admin.settings.edit', LocaleSettings::key())->with('error', __('Add a second language in Settings → Languages to translate the site\'s texts.'))
                : redirect()->route('sunrice.admin.dashboard')->with('error', __('Translations need a second language. An administrator can add one in Settings → Languages.'));
        }
        $locale = $request->query('locale');
        $locale = is_string($locale) && in_array($locale, $others, true) ? $locale : $others[0];

        return Inertia::render('Cms/Translations/Edit', [
            'locale' => $locale,
            'main' => Locales::default(),
            'locales' => array_map(fn (string $code): array => ['code' => $code, 'name' => Locales::name($code)], $others),
            'sections' => VisitorTexts::sections($locale),
        ]);
    }

    public function update(Request $request, SaveVisitorTranslations $save): RedirectResponse
    {
        $request->validate(['locale' => ['required', 'string'], 'texts' => ['present', 'array']]);
        $texts = $request->input('texts');
        $changed = $save->handle($request->string('locale')->toString(), is_array($texts) ? $texts : []);

        return back()->with('success', $changed === 0 ? __('Nothing changed.') : __('Translations saved.'));
    }
}
