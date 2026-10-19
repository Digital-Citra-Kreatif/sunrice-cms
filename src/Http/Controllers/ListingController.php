<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Collections\SaveListing;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;

/**
 * A collection's listing page fields, per language (cms.entries.view to
 * see, .update to save).
 *
 * @internal
 */
final class ListingController
{
    public function edit(Request $request, Collection $collection): Response
    {
        abort_if($collection->listing_route === null, 404);
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $collection->load('listings');
        $schema = $collection->listingSchema();

        return Inertia::render('Cms/Entries/Listing', [
            'collection' => ['handle' => $collection->handle, 'title' => $collection->title, 'url' => $collection->listingUrl($locale)],
            'fields' => $schema->toAdmin(),
            'locale' => $locale,
            'locales' => Locales::all(),
            'shared' => $locale === Locales::default() ? [] : $schema->shared(),
            'values' => $collection->listingData($locale, $schema),
            'can' => ['update' => Access::entries($request->user(), 'update', $collection)],
        ]);
    }

    public function update(Request $request, Collection $collection, SaveListing $save): RedirectResponse
    {
        abort_if($collection->listing_route === null, 404);
        $data = $request->input('data');
        $locale = $request->input('locale');
        $save->handle($collection, is_array($data) ? $data : [], is_string($locale) ? $locale : null);

        return back()->with('success', 'Saved. The site shows it now.');
    }
}
