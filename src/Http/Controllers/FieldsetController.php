<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Fieldsets\DeleteFieldset;
use Sunrice\Cms\Actions\Fieldsets\SaveFieldset;
use Sunrice\Cms\Admin\BuilderData;
use Sunrice\Cms\Models\Fieldset;

/**
 * Structure → Fieldsets: the list and the builder (the blueprint builder's
 * page). Behind cms.blueprints.manage (see CmsPlugin).
 *
 * @internal
 */
final class FieldsetController
{
    public function index(): Response
    {
        return Inertia::render('Cms/Fieldsets/Index', [
            'fieldsets' => Fieldset::query()->orderBy('title')->get()->map(fn (Fieldset $fieldset): array => [
                'id' => $fieldset->id,
                'handle' => $fieldset->handle,
                'title' => $fieldset->title,
                'fields' => count($fieldset->fields),
            ])->all(),
        ]);
    }

    public function create(BuilderData $builder): Response
    {
        return Inertia::render('Cms/Fieldsets/Edit', ['kind' => 'fieldset', 'blueprint' => null, ...$builder->toArray()]);
    }

    public function store(Request $request, SaveFieldset $save): RedirectResponse
    {
        $fieldset = $save->handle($request->only(['handle', 'title', 'fields']));

        return redirect()->route('sunrice.admin.cms.fieldsets.edit', $fieldset)->with('success', __('Fieldset ":title" created.', ['title' => $fieldset->title]));
    }

    public function edit(Fieldset $fieldset, BuilderData $builder, DeleteFieldset $delete): Response
    {
        return Inertia::render('Cms/Fieldsets/Edit', [
            'kind' => 'fieldset',
            'blueprint' => ['id' => $fieldset->id, 'handle' => $fieldset->handle, 'title' => $fieldset->title, 'fields' => $fieldset->fields],
            'usedBy' => $delete->usedBy($fieldset),
            ...$builder->toArray(),
        ]);
    }

    public function update(Request $request, Fieldset $fieldset, SaveFieldset $save): RedirectResponse
    {
        $save->handle($request->only(['title', 'fields']), $fieldset);

        return back()->with('success', 'Fieldset saved.');
    }

    public function destroy(Fieldset $fieldset, DeleteFieldset $delete): RedirectResponse
    {
        $delete->handle($fieldset);

        return redirect()->route('sunrice.admin.cms.fieldsets.index')->with('success', __('Fieldset ":title" deleted.', ['title' => $fieldset->title]));
    }
}
