<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Fieldset;

#[IsReadOnly]
#[Description('Without "handle": the blueprints (the fields of collections, taxonomies, global sets, forms and listing pages) or, with "kind": "fieldset", the fieldsets (reusable groups of fields, also blocks). With one: its title and field definitions as saved, to change and send back whole to cms_save_blueprint. cms_field_types lists the field types and their settings.')]
final class GetBlueprint extends CmsTool
{
    protected string $name = 'cms_get_blueprint';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.blueprints.view')) {
            return $this->denied('manage blueprints');
        }
        $fieldset = $request->get('kind') === 'fieldset';
        $class = $fieldset ? Fieldset::class : Blueprint::class;
        $handle = $request->get('handle');
        if ((! is_string($handle) || $handle === '') && $fieldset) {
            return $this->json(['fieldsets' => Fieldset::query()->orderBy('title')->get()
                ->map(fn (Fieldset $f): array => ['handle' => $f->handle, 'title' => $f->title, 'fields' => count($f->fields)])->all()]);
        }
        if (! is_string($handle) || $handle === '') {
            $usedBy = [];
            foreach (Collection::query()->whereNotNull('blueprint')->orderBy('handle')->get(['handle', 'blueprint']) as $collection) {
                $usedBy[(string) $collection->blueprint][] = $collection->handle;
            }

            return $this->json(['blueprints' => Blueprint::query()->orderBy('title')->get()
                ->map(fn (Blueprint $b): array => ['handle' => $b->handle, 'title' => $b->title, 'fields' => count($b->fields), 'collections' => $usedBy[$b->handle] ?? []])->all()]);
        }
        $model = $class::query()->where('handle', $handle)->first();
        if ($model === null) {
            return Response::error('No such '.($fieldset ? 'fieldset' : 'blueprint').'. Leave out "handle" to list them.');
        }

        return $this->json(['kind' => $fieldset ? 'fieldset' : 'blueprint', 'handle' => $model->handle, 'title' => $model->title, 'fields' => $model->fields]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'kind' => $schema->string()->enum(['blueprint', 'fieldset'])->description('Blueprint when left out.'),
            'handle' => $schema->string(),
        ];
    }
}
