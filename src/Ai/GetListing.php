<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

#[IsReadOnly]
#[Description('Read a listing page: a collection\'s ("collection": /blog), or a taxonomy\'s index page listing its terms ("taxonomy": the shared one, /tags; with "collection" too, that collection\'s, /blog/tags). Gives its URL, its blueprint\'s fields and their values in a language (fields not translated come from the main language: "shared"), its SEO card, and the version to send back to cms_save_listing. The pages themselves are set on the collection (listing_route, listing_blueprint) or the taxonomy (index, index_page_{collection id}, index_blueprint) with save_record; cms_list_terms says which index pages are on.')]
final class GetListing extends CmsTool
{
    protected string $name = 'cms_get_listing';

    public function handle(Request $request): Response
    {
        $page = self::pageOf($request);
        if ($page instanceof Response) {
            return $page;
        }
        if ($page instanceof Collection ? ! $this->may('view', $page) : ! Access::terms($this->user(), 'view', $page[0])) {
            return $this->denied($page instanceof Collection ? 'view entries of '.$page->title : 'view terms of '.$page[0]->title);
        }
        $locale = $request->get('locale');
        $locale = is_string($locale) && $locale !== '' ? $locale : Locales::default();
        if (! Locales::has($locale)) {
            return Response::error("No language \"{$locale}\". Languages: ".implode(', ', Locales::all()).'.');
        }

        return $this->json(self::present($page, $locale));
    }

    /**
     * The page asked for: a collection's listing page ("collection"), or a
     * taxonomy's index page ("taxonomy": the shared one; with "collection",
     * that collection's) as [taxonomy, collection or null]; an error when
     * there's no such page or it's switched off.
     *
     * @return Collection|array{0: Taxonomy, 1: Collection|null}|Response
     */
    public static function pageOf(Request $request): Collection|array|Response
    {
        $handle = $request->get('collection');
        $handle = is_string($handle) && $handle !== '' ? $handle : null;
        $taxonomyHandle = $request->get('taxonomy');
        if (is_string($taxonomyHandle) && $taxonomyHandle !== '') {
            return self::indexOf($taxonomyHandle, $handle);
        }
        $collection = $handle !== null ? Collection::query()->where('handle', $handle)->with('listings')->first() : null;
        if ($collection === null) {
            return Response::error('No such collection. cms_list_entries lists them; for a taxonomy\'s index page send "taxonomy".');
        }
        if ($collection->listing_route === null) {
            return Response::error("{$collection->title} has no listing page: give the collection a listing_route (save_record) first.");
        }

        return $collection;
    }

    /** @return array{0: Taxonomy, 1: Collection|null}|Response */
    private static function indexOf(string $handle, ?string $collectionHandle): array|Response
    {
        $taxonomy = Taxonomy::query()->where('handle', $handle)->with('listings')->first();
        if ($taxonomy === null) {
            return Response::error('No such taxonomy. cms_list_terms lists them.');
        }
        if ($collectionHandle === null) {
            return $taxonomy->index_route === null
                ? Response::error("{$taxonomy->title} has no shared index page: switch on \"index\" on the taxonomy (save_record, resource \"taxonomies\") first, or send \"collection\" for a collection's index page.")
                : [$taxonomy, null];
        }
        $collection = $taxonomy->collections()->where('handle', $collectionHandle)->first();
        if ($collection === null) {
            return Response::error("{$taxonomy->title} doesn't group a collection \"{$collectionHandle}\". cms_list_terms lists the collections each taxonomy groups.");
        }
        $pivot = $collection->getRelation('pivot');
        if (! $pivot instanceof CollectionTaxonomy || ! $pivot->index_page) {
            return Response::error("{$collection->title}'s {$taxonomy->title} index page is switched off: switch on \"index_page_{$collection->id}\" on the taxonomy (save_record, resource \"taxonomies\") first.");
        }

        return [$taxonomy, $collection];
    }

    /**
     * @param  Collection|array{0: Taxonomy, 1: Collection|null}  $page
     * @return array<string, mixed>
     */
    public static function present(Collection|array $page, string $locale): array
    {
        if ($page instanceof Collection) {
            $schema = $page->listingSchema();
            $stored = $page->listings->firstWhere('locale', $locale);

            return [
                'collection' => $page->handle,
                'locale' => $locale,
                'url' => $page->listingUrl($locale),
                'listing_blueprint' => $page->listing_blueprint,
                'fields' => $schema->toAdmin(),
                'shared' => $locale === Locales::default() ? [] : $schema->shared(),
                'values' => array_diff_key($page->listingData($locale, $schema), [Seo::KEY => true]),
                'seo' => $stored?->data[Seo::KEY] ?? null,
                'version' => $stored?->version,
                'languages' => Locales::all(),
            ];
        }
        [$taxonomy, $collection] = $page;
        $schema = $taxonomy->indexSchema();
        $stored = $taxonomy->listings->first(fn (TaxonomyListing $listing): bool => $listing->locale === $locale && $listing->collection_id === $collection?->id);

        return [
            'taxonomy' => $taxonomy->handle,
            'collection' => $collection?->handle,
            'locale' => $locale,
            'url' => $taxonomy->indexUrl($locale, $collection),
            'index_blueprint' => $taxonomy->index_blueprint,
            'fields' => $schema->toAdmin(),
            'shared' => $locale === Locales::default() ? [] : $schema->shared(),
            'values' => array_diff_key($taxonomy->indexData($locale, $collection, $schema), [Seo::KEY => true]),
            'seo' => $stored?->data[Seo::KEY] ?? null,
            'version' => $stored?->version,
            'languages' => Locales::all(),
        ];
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'collection' => $schema->string()->description('The collection\'s handle: its listing page; with "taxonomy", that collection\'s index page of the taxonomy.'),
            'taxonomy' => $schema->string()->description('A taxonomy\'s handle: its index page (the shared one without "collection").'),
            'locale' => $schema->string()->description('A language; the main one when left out.'),
        ];
    }
}
