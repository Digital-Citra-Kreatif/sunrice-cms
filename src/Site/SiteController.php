<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Renders entries on the site: the fallback route (paths no app route
 * took) and signed previews of drafts.
 *
 * @internal
 */
final class SiteController
{
    public function show(Request $request, Site $site): Response|RedirectResponse
    {
        // Listing pages first: their URLs are fixed, more specific than any {slug}.
        $listing = $site->listing($request->path());
        if ($listing !== null) {
            return $this->renderListing($listing, $request);
        }
        $translation = $site->find($request->path());
        // The homepage is at /: its own address goes there.
        if ($translation !== null && ($own = $site->ownPath($translation)) !== null && ($served = $site->path($translation, $translation->slug)) !== $own
            && '/'.trim($request->path(), '/') === $own) {
            return redirect()->to(url((string) $served), 301);
        }
        if ($translation === null) {
            $redirect = $site->redirect($request->path());
            abort_if($redirect === null, 404);

            return redirect()->to($redirect->to_url, $redirect->status);
        }

        return $this->render($translation, preview: false);
    }

    /** A draft as it would look, from the editor's signed, expiring link. */
    public function preview(EntryTranslation $translation): Response
    {
        abort_if($translation->entry->trashed() || $translation->entry->collection->trashed(), 404);

        return $this->render($translation, preview: true)->header('X-Robots-Tag', 'noindex, nofollow');
    }

    private function render(EntryTranslation $translation, bool $preview): Response
    {
        app()->setLocale($translation->locale);
        $collection = $translation->entry->collection;

        return response()->view(self::view($collection->handle, $collection->template, $translation->entry->template), [
            'entry' => $translation,
            'title' => $preview ? $translation->draft_title : $translation->title,
            'values' => $translation->values(new HydrationContext($translation->locale, $preview)),
            // Rich text is cleaned when saved, so it's the only HTML a template may print as is.
            'richText' => array_values(array_map(fn (Field $field): string => $field->handle, array_filter($collection->schema()->fields(), fn (Field $field): bool => $field->type === 'rich_text'))),
            'collection' => $collection,
            'locale' => $translation->locale,
            'preview' => $preview,
        ]);
    }

    private function renderListing(Listing $listing, Request $request): Response
    {
        app()->setLocale($listing->locale);
        $collection = $listing->collection;
        $entries = EntryTranslation::query()->live()->with('entry.collection')
            ->where('collection_id', $collection->id)->where('locale', $listing->locale)
            ->when($collection->ordered,
                fn ($q) => $q->orderBy(Entry::query()->select('sort_order')->whereColumn('sunrice_entries.id', 'sunrice_entry_translations.entry_id'))->orderBy('id'),
                fn ($q) => $collection->dated ? $q->orderByDesc('published_at')->orderByDesc('id') : $q->orderBy('title')->orderBy('id'))
            ->paginate(max(1, min(100, $collection->per_page)))->withQueryString();
        abort_if($entries->currentPage() > 1 && $entries->isEmpty(), 404);
        $schema = $collection->listingSchema();

        // cms.{handle}-listing, else cms.listing, else the CMS's plain one.
        $view = 'sunrice-cms::listing';
        foreach (["cms.{$collection->handle}-listing", 'cms.listing'] as $candidate) {
            if (View::exists($candidate)) {
                $view = $candidate;

                break;
            }
        }

        return response()->view($view, [
            'collection' => $collection,
            'title' => $collection->title,
            'entries' => $entries,
            'values' => $schema->hydrate($collection->listingData($listing->locale, $schema), new HydrationContext($listing->locale)),
            'richText' => array_values(array_map(fn (Field $field): string => $field->handle, array_filter($schema->fields(), fn (Field $field): bool => $field->type === 'rich_text'))),
            'locale' => $listing->locale,
            'url' => $collection->listingUrl($listing->locale),
        ]);
    }

    /** The collection's template, else cms.{handle}, else cms.entry, else the CMS's plain one. */
    public static function view(string $handle, ?string $template, ?string $entryTemplate = null): string
    {
        foreach (array_filter([$entryTemplate, $template, "cms.{$handle}", 'cms.entry']) as $view) {
            if (View::exists($view)) {
                return $view;
            }
        }

        return 'sunrice-cms::entry';
    }
}
