<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Support\Locales;

#[IsReadOnly]
#[Description('A collection\'s listing page in a language (the main one unless "locale" is given): its address, its fields and their values.')]
final class GetListing extends CmsTool
{
    protected string $name = 'cms_get_listing';

    public function handle(Request $request): Response
    {
        $collection = self::listing($request);
        if ($collection instanceof Response) {
            return $collection;
        }
        if (! $this->may('view', $collection)) {
            return $this->denied('see this collection');
        }
        $locale = $request->get('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();

        return $this->json([
            'collection' => $collection->handle, 'locale' => $locale, 'url' => $collection->listingUrl($locale),
            'fields' => array_map(fn ($field): array => ['handle' => $field->handle, 'type' => $field->type, 'label' => $field->label], $collection->listingSchema()->fields()),
            'data' => $collection->listingData($locale),
        ]);
    }

    /** The collection with a listing page asked for ("collection"), or an error. */
    public static function listing(Request $request): Collection|Response
    {
        $handle = $request->get('collection');
        $collection = is_string($handle) ? Collection::query()->with('listings')->where('handle', $handle)->first() : null;
        if ($collection === null) {
            return Response::error('No such collection. cms_list_entries lists them.');
        }

        return $collection->listing_route === null ? Response::error('This collection has no listing page.') : $collection;
    }

    public function schema(JsonSchema $schema): array
    {
        return ['collection' => $schema->string()->required(), 'locale' => $schema->string()];
    }
}
