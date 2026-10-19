<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Blueprints\DeleteBlueprint;
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
        // One query for which collections use what.
        $usedBy = Collection::query()->whereNotNull('blueprint')->orderBy('title')->get(['title', 'blueprint'])->groupBy('blueprint');

        return Inertia::render('Cms/Blueprints/Index', [
            'blueprints' => Blueprint::query()->orderBy('title')->get()->map(fn (Blueprint $blueprint): array => [
                'id' => $blueprint->id,
                'handle' => $blueprint->handle,
                'title' => $blueprint->title,
                'fields' => count($blueprint->fields),
                'usedBy' => $usedBy->get($blueprint->handle)?->pluck('title')->values()->all() ?? [],
            ])->all(),
        ]);
    }

    public function create(BuilderData $builder): Response
    {
        return Inertia::render('Cms/Blueprints/Form', ['blueprint' => null, ...$builder->toArray()]);
    }

    public function store(Request $request, SaveBlueprint $save): RedirectResponse
    {
        $blueprint = $save->handle($request->only(['handle', 'title', 'fields']));

        return redirect()->route('sunrice.admin.cms.blueprints.edit', $blueprint)->with('success', "Blueprint \"{$blueprint->title}\" created.");
    }

    public function edit(Blueprint $blueprint, BuilderData $builder): Response
    {
        return Inertia::render('Cms/Blueprints/Form', [
            'blueprint' => ['id' => $blueprint->id, 'handle' => $blueprint->handle, 'title' => $blueprint->title, 'fields' => $blueprint->fields],
            ...$builder->toArray(),
        ]);
    }

    public function update(Request $request, Blueprint $blueprint, SaveBlueprint $save): RedirectResponse
    {
        $save->handle($request->only(['title', 'fields']), $blueprint);

        return back()->with('success', 'Blueprint saved.');
    }

    public function destroy(Blueprint $blueprint, DeleteBlueprint $delete): RedirectResponse
    {
        $delete->handle($blueprint);

        return redirect()->route('sunrice.admin.cms.blueprints.index')->with('success', "Blueprint \"{$blueprint->title}\" deleted.");
    }
}
