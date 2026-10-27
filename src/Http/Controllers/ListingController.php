<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Collections\SaveListing;
use Sunrice\Cms\Actions\Collections\SaveListingTemplate;
use Sunrice\Cms\Admin\BlueprintLinks;
use Sunrice\Cms\Admin\TemplateHelp;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Site\TemplateLookup;
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
            // Where its back link and breadcrumbs go: the collection's settings (its listing page card), for those who may change them.
            'settings' => $request->user()?->can('cms.collections.update') === true ? route('sunrice.admin.cms.collections.edit', $collection->handle) : null,
            // Its listing blueprint, for those who may edit blueprints.
            'blueprint' => BlueprintLinks::url($request->user(), $collection->listing_blueprint),
            // Shared fields in groups, rows and blocks read-only outside the main language.
            'fields' => $locale === Locales::default() ? $schema->toAdmin() : $schema->toAdminShared(),
            'locale' => $locale,
            'locales' => Locales::all(),
            // The languages with texts of their own (the main one always counts), for the language switch.
            'translated' => array_values(array_unique([Locales::default(), ...$collection->listings->map(fn (CollectionListing $listing): string => $listing->locale)->all()])),
            'shared' => $locale === Locales::default() ? [] : $schema->shared(),
            'values' => array_diff_key($collection->listingData($locale, $schema), [Seo::KEY => true]),
            'seo' => $collection->listings->firstWhere('locale', $locale)?->data[Seo::KEY] ?? null,
            'version' => $collection->listings->firstWhere('locale', $locale)?->version,
            // Its Listing page template, the views tried when it's empty, and which exist (Template, and How is it chosen?).
            'template' => $collection->listing_template,
            'templates' => [
                'own' => TemplateHelp::lookup([$collection->listing_template])[0] ?? null,
                'fallbacks' => TemplateHelp::lookup(TemplateLookup::listing($collection, own: false)),
                'example' => TemplateHelp::example("{$collection->handle}-home"),
            ],
            // The views that exist under the template prefixes, to pick from: read when the Template choice opens.
            'templateChoices' => Inertia::optional(fn (): array => TemplateHelp::choices()),
            'can' => [
                'update' => Access::entries($request->user(), 'update', $collection),
                // The template is the collection's setting.
                'template' => $request->user()?->can('cms.collections.update') === true,
            ],
        ]);
    }

    public function update(Request $request, Collection $collection, SaveListing $save, SaveListingTemplate $saveTemplate): RedirectResponse
    {
        abort_if($collection->listing_route === null, 404);
        // The template is the collection's setting: only for those who may change it.
        abort_if($request->has('template') && $request->user()?->can('cms.collections.update') !== true, 403);
        $data = $request->input('data');
        $locale = $request->input('locale');
        $version = $request->input('version');
        DB::transaction(function () use ($request, $collection, $save, $saveTemplate, $data, $locale, $version): void {
            if ($request->has('template')) {
                $saveTemplate->handle($collection, $request->input('template'));
            }
            $save->handle($collection, is_array($data) ? $data : [], is_string($locale) ? $locale : null, is_int($version) || is_string($version) ? $version : null, $request->has('seo') ? ($request->input('seo') ?? []) : null);
        });

        return back()->with('success', 'Saved. The site shows it now.');
    }
}
