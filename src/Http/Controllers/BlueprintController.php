<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Blueprints\DeleteBlueprint;
use Sunrice\Cms\Actions\Blueprints\RenameBlueprint;
use Sunrice\Cms\Actions\Blueprints\SaveBlueprint;
use Sunrice\Cms\Admin\BuilderData;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;

/**
 * Structure → Blueprints: the list and the builder. Behind
 * cms.blueprints.manage (see CmsPlugin).
 *
 * @internal
 */
final class BlueprintController
{
    public function index(): Response
    {
        // One query for which collections use what, for their entries or as one of their other blueprints.
        $usedBy = [];
        foreach (Collection::query()->orderBy('title')->get(['title', 'blueprint', 'blueprints']) as $collection) {
            foreach (array_unique(array_filter([$collection->blueprint, ...($collection->blueprints ?? [])], 'is_string')) as $handle) {
                $usedBy[$handle][] = $collection->title;
            }
        }

        return Inertia::render('Cms/Blueprints/Index', [
            'blueprints' => Blueprint::query()->orderBy('title')->get()->map(fn (Blueprint $blueprint): array => [
                'id' => $blueprint->id,
                'handle' => $blueprint->handle,
                'title' => $blueprint->title,
                'fields' => count($blueprint->fields),
                'usedBy' => $usedBy[$blueprint->handle] ?? [],
            ])->all(),
        ]);
    }

    public function create(BuilderData $builder): Response
    {
        return Inertia::render('Cms/Blueprints/Edit', ['blueprint' => null, ...$builder->toArray()]);
    }

    public function store(Request $request, SaveBlueprint $save): RedirectResponse
    {
        $blueprint = $save->handle($request->only(['handle', 'title', 'fields']));

        return redirect()->route('sunrice.admin.cms.blueprints.edit', $blueprint)->with('success', __('Blueprint ":title" created.', ['title' => $blueprint->title]));
    }

    public function edit(Blueprint $blueprint, BuilderData $builder): Response
    {
        return Inertia::render('Cms/Blueprints/Edit', [
            'blueprint' => ['id' => $blueprint->id, 'handle' => $blueprint->handle, 'title' => $blueprint->title, 'fields' => $blueprint->fields],
            ...$builder->toArray(),
        ]);
    }

    public function update(Request $request, Blueprint $blueprint, SaveBlueprint $save, RenameBlueprint $rename): RedirectResponse
    {
        $handle = $request->input('handle');
        DB::transaction(function () use ($request, $blueprint, $save, $rename, $handle): void {
            if (is_string($handle) && $handle !== '') {
                $rename->handle($blueprint, $handle);
            }
            $save->handle($request->only(['title', 'fields']), $blueprint);
        });

        // At its new address when the handle changed.
        return redirect()->route('sunrice.admin.cms.blueprints.edit', $blueprint->refresh()->handle)->with('success', 'Blueprint saved.');
    }

    public function destroy(Blueprint $blueprint, DeleteBlueprint $delete): RedirectResponse
    {
        $delete->handle($blueprint);

        return redirect()->route('sunrice.admin.cms.blueprints.index')->with('success', __('Blueprint ":title" deleted.', ['title' => $blueprint->title]));
    }
}
