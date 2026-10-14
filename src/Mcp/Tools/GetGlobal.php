<?php

declare(strict_types=1);

namespace Sunrice\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Mcp\Presenter;
use Sunrice\Models\GlobalSet;
use Sunrice\Support\Locales;

#[IsReadOnly]
#[Description('Read a global set (site-wide values such as contact details, social links, footer text, or a template part) with its fields and its values in every language (other languages: the main language\'s values with their translated text laid over; only translatable fields differ).')]
class GetGlobal extends SunriceTool
{
    protected string $name = 'get_global';

    public function handle(Request $request): Response
    {
        $set = $this->findByHandle(GlobalSet::class, $request->get('handle'));
        if ($set === null) {
            return $this->notFound('Global set');
        }
        $this->authorize('viewAny', GlobalSet::class);

        $values = [];
        foreach (Locales::available() as $locale) {
            $values[$locale] = $set->valuesFor($locale);
        }

        return $this->json([
            'handle' => $set->handle,
            'title' => $set->title,
            'group' => $set->group,
            'blueprint' => $set->blueprint?->handle,
            'fields' => $set->blueprint === null ? [] : Presenter::fields($set->blueprint->schema()->fields()),
            'values' => $values,
            'template_usage' => "sunrice_global('{$set->handle}')->field_handle",
        ]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['handle' => $schema->string()->required()];
    }
}
