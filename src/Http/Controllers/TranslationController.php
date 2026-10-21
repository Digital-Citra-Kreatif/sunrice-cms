<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Translations\SaveVisitorTranslations;
use Sunrice\Cms\Admin\VisitorTexts;
use Sunrice\Cms\Support\Locales;

/**
 * Content → Translations, behind cms.entries.translate: what visitors
 * read outside entries (forms, listing titles, menus, the site's
 * description), in a language besides the main one.
 *
 * @internal
 */
final class TranslationController
{
    public function edit(Request $request): Response
    {
        $others = array_values(array_diff(Locales::all(), [Locales::default()]));
        abort_if($others === [], 404);
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
