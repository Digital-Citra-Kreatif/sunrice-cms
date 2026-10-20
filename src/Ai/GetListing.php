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
#[Description('Read a collection\'s listing page (e.g. /blog): its URL, the listing blueprint\'s fields and their values in a language (fields not translated come from the main language: "shared"), and the version to send back to cms_save_listing. The listing page itself is set on the collection (listing_route, listing_blueprint) with save_record.')]
final class GetListing extends CmsTool
{
    protected string $name = 'cms_get_listing';

    public function handle(Request $request): Response
    {
        $collection = self::listingOf($request);
        if ($collection instanceof Response) {
            return $collection;
        }
        if (! $this->may('view', $collection)) {
            return $this->denied('view entries of '.$collection->title);
        }
        $locale = $request->get('locale');
        $locale = is_string($locale) && $locale !== '' ? $locale : Locales::default();
        if (! Locales::has($locale)) {
            return Response::error("No language \"{$locale}\". Languages: ".implode(', ', Locales::all()).'.');
        }

        return $this->json(self::present($collection, $locale));
    }

    /** The collection named by "collection", when it has a listing page; else an error. */
    public static function listingOf(Request $request): Collection|Response
    {
        $handle = $request->get('collection');
        $collection = is_string($handle) ? Collection::query()->where('handle', $handle)->with('listings')->first() : null;
        if ($collection === null) {
            return Response::error('No such collection. cms_list_entries lists them.');
        }
        if ($collection->listing_route === null) {
            return Response::error("{$collection->title} has no listing page: give the collection a listing_route (save_record) first.");
        }

        return $collection;
    }

    /** @return array<string, mixed> */
    public static function present(Collection $collection, string $locale): array
    {
        $schema = $collection->listingSchema();

        return [
            'collection' => $collection->handle,
            'locale' => $locale,
            'url' => $collection->listingUrl($locale),
            'listing_blueprint' => $collection->listing_blueprint,
            'fields' => $schema->toAdmin(),
            'shared' => $locale === Locales::default() ? [] : $schema->shared(),
            'values' => $collection->listingData($locale, $schema),
            'version' => $collection->listings->firstWhere('locale', $locale)?->version,
            'languages' => Locales::all(),
        ];
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'collection' => $schema->string()->description('The collection\'s handle.')->required(),
            'locale' => $schema->string()->description('A language; the main one when left out.'),
        ];
    }
}
