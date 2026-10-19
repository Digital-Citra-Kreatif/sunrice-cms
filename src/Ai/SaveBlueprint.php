<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Blueprints\SaveBlueprint as SaveBlueprintAction;
use Sunrice\Cms\Actions\Fieldsets\SaveFieldset;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Fieldset;

#[Description('Create or change a blueprint (or with "kind": "fieldset", a fieldset): "title" and the whole list of "fields" as cms_get_blueprint gives them. Content keeps its data when a field is removed or changed, but templates may rely on it: ask the user first.')]
final class SaveBlueprint extends CmsTool
{
    protected string $name = 'cms_save_blueprint';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.blueprints.manage')) {
            return $this->denied('change blueprints');
        }
        $handle = $request->get('handle');
        if (! is_string($handle) || $handle === '') {
            return Response::error('Give the "handle".');
        }
        $input = ['title' => $request->get('title'), 'fields' => $request->get('fields', [])];
        try {
            if ($request->get('kind') === 'fieldset') {
                $existing = Fieldset::query()->where('handle', $handle)->first();
                app(SaveFieldset::class)->handle($existing === null ? ['handle' => $handle] + $input : $input, $existing);
            } else {
                $existing = Blueprint::query()->where('handle', $handle)->first();
                app(SaveBlueprintAction::class)->handle($existing === null ? ['handle' => $handle] + $input : $input, $existing);
            }
        } catch (ValidationException $e) {
            return self::invalid($e);
        }

        return $this->json(['saved' => true, 'handle' => $handle, 'created' => $existing === null]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'handle' => $schema->string()->required(),
            'kind' => $schema->string()->enum(['blueprint', 'fieldset']),
            'title' => $schema->string()->required(),
            'fields' => $schema->array()->description('Field definitions: handle, type, label, required, translatable, config, fields.')->required(),
        ];
    }
}
