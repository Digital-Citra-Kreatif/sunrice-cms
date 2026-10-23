<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Globals\SaveGlobals;
use Sunrice\Cms\Admin\GlobalSetResource;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Support\Locales;

/**
 * A global set's values in each language (/admin/cms/globals/{handle}/values);
 * the sets themselves are GlobalSetResource. Behind cms.globals.view,
 * saving behind cms.globals.update (see CmsPlugin). Only the values: the
 * set's title, handle and blueprint are its Settings (cms.globals.configure).
 *
 * @internal
 */
final class GlobalsController
{
    public function edit(Request $request, GlobalSet $set): Response
    {
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $main = $locale === Locales::default();
        $set->load('values');

        return Inertia::render('Cms/Globals/Edit', [
            'set' => ['id' => $set->id, 'handle' => $set->handle, 'title' => $set->title],
            'fields' => $set->schema()->toAdmin(),
            'locale' => $locale,
            'locales' => Locales::all(),
            'shared' => $main ? [] : $set->schema()->shared(),
            'values' => $set->data($locale),
            'version' => $set->values->firstWhere('locale', $locale)?->version,
            'can' => ['update' => $request->user()?->can('cms.globals.update') ?? false],
            // Its title, handle and fields: for those who may configure sets, not editors.
            'settings' => GlobalSetResource::configures($request->user()) ? route('sunrice.admin.cms.globals.edit', $set->handle) : null,
        ]);
    }

    public function update(Request $request, GlobalSet $set, SaveGlobals $save): RedirectResponse
    {
        $data = $request->input('data');
        $locale = $request->input('locale');
        $version = $request->input('version');
        $save->handle($set, is_array($data) ? $data : [], is_string($locale) ? $locale : null, is_int($version) || is_string($version) ? $version : null);

        return back()->with('success', 'Saved. The site shows it now.');
    }
}
