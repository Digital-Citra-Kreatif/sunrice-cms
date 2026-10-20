<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Blueprints\SaveBlueprint as SaveBlueprintAction;
use Sunrice\Cms\Actions\Fieldsets\SaveFieldset;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Fieldset;

#[Description('Create a blueprint (or with "kind": "fieldset", a fieldset), or replace an existing one\'s title and fields, found by handle. "fields" is the complete list of field definitions ({handle, type, label, required, instructions, translatable, validation: extra rules, config: the type\'s settings, fields: child fields}: cms_field_types has the types) and replaces the current list; validated like the blueprint builder. A field taken out hides its values but doesn\'t delete them. Ask before removing fields.')]
final class SaveBlueprint extends CmsTool
{
    protected string $name = 'cms_save_blueprint';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.blueprints.manage')) {
            return $this->denied('manage blueprints');
        }
        /** @var array{kind?: string|null, handle: string, title?: string|null, fields?: array<mixed>|null} $args */
        $args = $request->validate([
            'kind' => ['nullable', 'string', 'in:blueprint,fieldset'],
            'handle' => ['required', 'string', 'max:64'],
            'title' => ['nullable', 'string', 'max:255'],
            'fields' => ['nullable', 'array'],
        ]);
        $fieldset = ($args['kind'] ?? 'blueprint') === 'fieldset';
        $model = ($fieldset ? Fieldset::query() : Blueprint::query())->where('handle', $args['handle'])->first();
        $input = [
            'title' => $args['title'] ?? $model->title ?? ucfirst(str_replace('_', ' ', $args['handle'])),
            'fields' => $args['fields'] ?? $model->fields ?? [],
        ];
        if ($model === null) {
            $input['handle'] = $args['handle'];
        }
        $saved = $fieldset
            ? app(SaveFieldset::class)->handle($input, $model instanceof Fieldset ? $model : null)
            : app(SaveBlueprintAction::class)->handle($input, $model instanceof Blueprint ? $model : null);

        return $this->json(['saved' => true, 'created' => $model === null, 'kind' => $fieldset ? 'fieldset' : 'blueprint', 'handle' => $saved->handle, 'title' => $saved->title, 'fields' => $saved->fields]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'kind' => $schema->string()->enum(['blueprint', 'fieldset'])->description('Blueprint when left out.'),
            'handle' => $schema->string()->description('Lowercase letters, numbers and _; an existing one is changed.')->required(),
            'title' => $schema->string(),
            'fields' => $schema->array()->items($schema->object())->description('All field definitions (replaces the list).'),
        ];
    }
}
