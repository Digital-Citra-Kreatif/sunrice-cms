<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Support\Seo;

#[IsReadOnly]
#[Description('An entry in one language (the main one unless "locale" is given): its status, its fields (handle, type, label, required, settings, options) and the draft\'s values: title, slug, data by field handle, and seo. Without "id", give "collection" to get the fields for cms_save_entry to create one. Media fields hold media ids (list_media), entries fields entry ids, terms fields term ids (cms_list_terms). Shared fields are edited in the main language.')]
final class GetEntry extends CmsTool
{
    protected string $name = 'cms_get_entry';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.entries.view')) {
            return $this->denied('view entries');
        }
        if ($request->get('id') === null) {
            $handle = $request->get('collection');
            $collection = is_string($handle) ? Collection::query()->where('handle', $handle)->first() : null;
            if ($collection === null) {
                return Response::error('Give an entry "id", or a "collection" handle for a new entry\'s fields.');
            }

            return $this->json(['collection' => $collection->handle, 'fields' => $collection->schema()->toAdmin(), 'defaults' => $collection->schema()->defaults()]);
        }
        $entry = $this->findEntry($request, withTrashed: true);
        if ($entry instanceof Response) {
            return $entry;
        }
        $translation = $this->findTranslation($request, $entry);
        if ($translation instanceof Response) {
            return $translation;
        }
        $schema = $entry->collection->schema();
        $data = $translation->draft_data;
        unset($data[Seo::KEY]);

        return $this->json([
            ...self::describe($translation),
            'fields' => $schema->toAdmin(),
            'shared' => $translation->isMain() ? [] : $schema->shared(),
            'values' => ['title' => $translation->draft_title, 'slug' => $translation->draft_slug, 'data' => $data, 'seo' => $translation->draft_data[Seo::KEY] ?? null],
            'live' => $translation->isPublished() ? ['title' => $translation->title, 'slug' => $translation->slug] : null,
        ]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'id' => $schema->integer(),
            'locale' => $schema->string()->description('A language code; the main language when left out.'),
            'collection' => $schema->string()->description('Without "id": the collection to get a new entry\'s fields for.'),
        ];
    }
}
