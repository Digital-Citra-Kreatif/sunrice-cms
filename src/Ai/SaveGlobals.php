<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Globals\SaveGlobals as Save;
use Sunrice\Cms\Models\GlobalSet;

#[Description('Change a global set\'s values in a language (the main one unless "locale" is given): "data" holds only the fields to change. They\'re live on the site once saved, so ask the user first.')]
final class SaveGlobals extends CmsTool
{
    protected string $name = 'cms_save_globals';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.globals.update')) {
            return $this->denied('edit globals');
        }
        $handle = $request->get('set');
        $set = is_string($handle) ? GlobalSet::query()->where('handle', $handle)->first() : null;
        if ($set === null) {
            return Response::error('Give the "set" handle (cms_get_globals lists them).');
        }
        $data = $request->get('data');
        if (! is_array($data)) {
            return Response::error('Send "data" as an object of field handle => value.');
        }
        $locale = $request->get('locale');
        try {
            $value = app(Save::class)->handle($set, $data, is_string($locale) ? $locale : null);
        } catch (ValidationException $e) {
            return self::invalid($e);
        }

        return $this->json(['saved' => true, 'set' => $set->handle, 'locale' => $value->locale]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'set' => $schema->string()->required(),
            'locale' => $schema->string(),
            'data' => $schema->object()->description('Field handle => value.')->required(),
        ];
    }
}
