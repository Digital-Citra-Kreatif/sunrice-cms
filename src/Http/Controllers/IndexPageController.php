<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Taxonomies\SaveIndexPage;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

/**
 * A taxonomy index page's fields and SEO, per page (the shared one, or a
 * collection's: ?collection=books) and language; behind the taxonomy's
 * terms permissions (view to see, update to save). Only pages that are on.
 *
 * @internal
 */
final class IndexPageController
{
    public function edit(Request $request, Taxonomy $taxonomy): Response
    {
        $collection = self::collection($request, $taxonomy);
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $taxonomy->load('listings');
        $schema = $taxonomy->indexSchema();
        $own = $taxonomy->listings->filter(fn (TaxonomyListing $page): bool => $page->collection_id === $collection?->id);
        $stored = $own->firstWhere('locale', $locale);

        return Inertia::render('Cms/TaxonomyIndex/Edit', [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title],
            'collection' => $collection === null ? null : ['handle' => $collection->handle, 'title' => $collection->title],
            'url' => $taxonomy->indexUrl($locale, $collection),
            // The taxonomy's index pages that are on, for the page switch.
            'pages' => self::pages($taxonomy),
            'fields' => $schema->toAdmin(),
            'locale' => $locale,
            'locales' => Locales::all(),
            // The languages with texts of their own (the main one always counts), for the language switch.
            'translated' => array_values(array_unique([Locales::default(), ...$own->map(fn (TaxonomyListing $page): string => $page->locale)->all()])),
            'shared' => $locale === Locales::default() ? [] : $schema->shared(),
            'values' => array_diff_key($taxonomy->indexData($locale, $collection, $schema), [Seo::KEY => true]),
            'seo' => $stored?->data[Seo::KEY] ?? null,
            'version' => $stored?->version,
            'can' => ['update' => Access::terms($request->user(), 'update', $taxonomy)],
            // Its index blueprint, for those who may edit the taxonomy.
            'settings' => $request->user()?->can('cms.taxonomies.update') === true ? route('sunrice.admin.cms.taxonomies.edit', $taxonomy->handle) : null,
        ]);
    }

    public function update(Request $request, Taxonomy $taxonomy, SaveIndexPage $save): RedirectResponse
    {
        $collection = self::collection($request, $taxonomy);
        $data = $request->input('data');
        $locale = $request->input('locale');
        $version = $request->input('version');
        $save->handle($taxonomy, $collection, is_array($data) ? $data : [], is_string($locale) ? $locale : null, is_int($version) || is_string($version) ? $version : null, $request->has('seo') ? ($request->input('seo') ?? []) : null);

        return back()->with('success', 'Saved. The site shows it now.');
    }

    /**
     * The index pages of a taxonomy that are on: the shared one (collection
     * null), then its collections' by title.
     *
     * @return list<array{collection: string|null, title: string}>
     */
    public static function pages(Taxonomy $taxonomy): array
    {
        $pages = $taxonomy->index_route !== null ? [['collection' => null, 'title' => __('Shared index page')]] : [];
        foreach ($taxonomy->collections()->wherePivot('index_page', true)->orderBy('title')->get() as $collection) {
            $pages[] = ['collection' => $collection->handle, 'title' => $collection->title];
        }

        return $pages;
    }

    /** The page asked for (?collection=books: that collection's; none: the shared one); a 404 when it isn't on. */
    private static function collection(Request $request, Taxonomy $taxonomy): ?Collection
    {
        $handle = $request->input('collection');
        $collection = null;
        if (is_string($handle) && $handle !== '') {
            $collection = $taxonomy->collections()->where('handle', $handle)->first();
            $pivot = $collection?->getRelation('pivot');
            abort_unless($pivot instanceof CollectionTaxonomy && $pivot->index_page, 404);
        }
        abort_if($collection === null && $taxonomy->index_route === null, 404);

        return $collection;
    }
}
