<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Fieldset;

#[IsReadOnly]
#[Description('Without "handle": the blueprints and fieldsets (handle, title) and the field types there are. With one: its fields as stored (handle, type, label, required, translatable, config, fields). "kind": "fieldset" for a fieldset.')]
final class GetBlueprint extends CmsTool
{
    protected string $name = 'cms_get_blueprint';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.blueprints.manage')) {
            return $this->denied('see blueprints');
        }
        $model = $request->get('kind') === 'fieldset' ? Fieldset::class : Blueprint::class;
        $handle = $request->get('handle');
        if (! is_string($handle) || $handle === '') {
            return $this->json([
                'blueprints' => Blueprint::query()->orderBy('title')->get(['handle', 'title'])->toArray(),
                'fieldsets' => Fieldset::query()->orderBy('title')->get(['handle', 'title'])->toArray(),
                'field_types' => array_keys(app(FieldTypes::class)->all()),
            ]);
        }
        $record = $model::query()->where('handle', $handle)->first();

        return $record === null ? Response::error("No such {$this->kind($request)}.") : $this->json(['handle' => $record->handle, 'title' => $record->title, 'fields' => $record->fields]);
    }

    private function kind(Request $request): string
    {
        return $request->get('kind') === 'fieldset' ? 'fieldset' : 'blueprint';
    }

    public function schema(JsonSchema $schema): array
    {
        return ['handle' => $schema->string(), 'kind' => $schema->string()->enum(['blueprint', 'fieldset'])];
    }
}
