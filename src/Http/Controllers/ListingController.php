<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Collections\SaveListing;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

/**
 * A collection's listing page fields and SEO, per language (cms.entries.view to
 * see, .update to save). Without a listing page, the editor sends to the
 * collection's settings (or, for those who can't change them, its entries).
 *
 * @internal
 */
final class ListingController
{
    public function edit(Request $request, Collection $collection): Response|RedirectResponse
    {
        if ($collection->listing_route === null) {
            // Off: where it's switched on, for those who may, else the collection's entries; not a bare 404.
            return $request->user()?->can('cms.collections.update') === true
                ? redirect()->route('sunrice.admin.cms.collections.edit', $collection->handle)->with('error', 'This collection has no listing page. Switch it on in its settings: Has a listing page.')
                : redirect()->route('sunrice.admin.cms.collections.entries.index', $collection->handle)->with('error', 'This collection has no listing page. An administrator can switch it on in its settings.');
        }
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $collection->load('listings');
        $schema = $collection->listingSchema();

        return Inertia::render('Cms/Listing/Edit', [
            'collection' => ['handle' => $collection->handle, 'title' => $collection->title, 'url' => $collection->listingUrl($locale)],
            'fields' => $schema->toAdmin(),
            'locale' => $locale,
            'locales' => Locales::all(),
            // The languages with texts of their own (the main one always counts), for the language switch.
            'translated' => array_values(array_unique([Locales::default(), ...$collection->listings->map(fn (CollectionListing $listing): string => $listing->locale)->all()])),
            'shared' => $locale === Locales::default() ? [] : $schema->shared(),
            'values' => array_diff_key($collection->listingData($locale, $schema), [Seo::KEY => true]),
            'seo' => $collection->listings->firstWhere('locale', $locale)?->data[Seo::KEY] ?? null,
            'version' => $collection->listings->firstWhere('locale', $locale)?->version,
            'can' => ['update' => Access::entries($request->user(), 'update', $collection)],
        ]);
    }

    public function update(Request $request, Collection $collection, SaveListing $save): RedirectResponse
    {
        abort_if($collection->listing_route === null, 404);
        $data = $request->input('data');
        $locale = $request->input('locale');
        $version = $request->input('version');
        $save->handle($collection, is_array($data) ? $data : [], is_string($locale) ? $locale : null, is_int($version) || is_string($version) ? $version : null, $request->has('seo') ? ($request->input('seo') ?? []) : null);

        return back()->with('success', 'Saved. The site shows it now.');
    }
}
