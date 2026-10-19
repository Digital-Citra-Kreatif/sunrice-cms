<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Support\Locales;

#[IsReadOnly]
#[Description('Without "set": the global sets (site-wide values like contact details). With one: its fields and values in a language (the main one unless "locale" is given).')]
final class GetGlobals extends CmsTool
{
    protected string $name = 'cms_get_globals';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.globals.view')) {
            return $this->denied('view globals');
        }
        $handle = $request->get('set');
        if (! is_string($handle) || $handle === '') {
            return $this->json(['sets' => GlobalSet::query()->orderBy('title')->get()->map(fn (GlobalSet $s): array => ['handle' => $s->handle, 'title' => $s->title])->all()]);
        }
        $set = GlobalSet::query()->where('handle', $handle)->with('values')->first();
        if ($set === null) {
            return Response::error('No such global set. Leave out "set" to list them.');
        }
        $locale = $request->get('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();

        return $this->json([
            'set' => $set->handle,
            'locale' => $locale,
            'fields' => $set->schema()->toAdmin(),
            'shared' => $locale === Locales::default() ? [] : $set->schema()->shared(),
            'values' => $set->data($locale),
        ]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['set' => $schema->string(), 'locale' => $schema->string()];
    }
}
