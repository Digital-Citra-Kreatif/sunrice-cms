<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Access;

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
        // The search page (/search, /id/search) before any page at that address.
        if (Search::enabled() && ($locale = $site->searchLocale($request->path())) !== null) {
            return app(SearchController::class)($request, app(Search::class), $locale);
        }
        // Listing pages first: their URLs are fixed, more specific than any {slug}.
        $listing = $site->listing($request->path());
        if ($listing !== null) {
            return $this->renderListing($listing, $request);
        }
        $page = $site->match($request->path());
        // The address's language: another than the page's when it stands in for a translation (Site::fallback()).
        $locale = $site->locale($request->path());
        if ($page instanceof TermTranslation) {
            return $this->renderTerm($page, $locale);
        }
        $translation = $page;
        $path = '/'.trim($request->path(), '/');
        if ($translation !== null && $translation->locale !== $locale) {
            // The homepage in a language it isn't translated into is at /{locale}.
            if ($site->isHomepage($translation) && $path !== '/'.$locale) {
                return redirect()->to(self::withQuery(url('/'.$locale), $request), 301);
            }
        } elseif ($translation !== null && ($own = $site->ownPath($translation)) !== null && ($served = $site->path($translation, $translation->slug)) !== $own
            && $path === $own) {
            // The homepage is at /: its own address goes there.
            return redirect()->to(self::withQuery(url((string) $served), $request), 301);
        }
        if ($translation === null) {
            $redirect = $site->redirect($request->path());
            abort_if($redirect === null, 404);

            return redirect()->to(self::withQuery($redirect->to_url, $request), $redirect->status);
        }

        // Editors signed in to the panel see the unpublished changes on the page itself.
        if ($translation->locale === $locale && self::seesDrafts($translation)) {
            if ($translation->hasUnpublishedChanges()) {
                $draft = $request->query->has('draft');

                return $this->withDraftBanner($this->render($translation, preview: $draft, draft: $draft), $translation, $draft);
            }
        }

        return $this->render($translation, preview: false, locale: $locale);
    }

    /** Signed in to the panel with cms.entries.view-drafts, and may see the entry's collection. */
    private static function seesDrafts(EntryTranslation $translation): bool
    {
        $user = auth(app(Panel::class)->getGuard())->user();

        return $user instanceof Authorizable && $user->can('cms.entries.view-drafts') && Access::entries($user, 'view', $translation->entry->collection);
    }

    /** The draft banner after <body>, whatever the template; and never kept by any cache. */
    private function withDraftBanner(Response $response, EntryTranslation $translation, bool $draft): Response
    {
        $live = $translation->url();
        $banner = view('sunrice-cms::draft-banner', [
            'entry' => $translation,
            'draft' => $draft,
            'liveUrl' => $live,
            'draftUrl' => $live === null ? null : $live.'?draft',
            'editUrl' => Route::has('sunrice.admin.cms.entries.edit') ? route('sunrice.admin.cms.entries.edit', [$translation->entry_id, 'locale' => $translation->locale]) : null,
        ])->render();
        $content = (string) $response->getContent();
        $content = preg_match('/<body\b[^>]*>/i', $content) === 1
            ? (string) preg_replace_callback('/<body\b[^>]*>/i', fn (array $m): string => $m[0].$banner, $content, 1)
            : $banner.$content;
        $view = $response->getOriginalContent();
        $response->setContent($content);
        // Still the view the page was rendered from, for whoever inspects the response.
        $response->original = $view;
        $response->headers->set('Cache-Control', 'private, no-store');
        if ($draft) {
            $response->headers->set('X-Robots-Tag', 'noindex, nofollow');
        }

        return $response;
    }

    /** A draft as it would look, from the editor's signed, expiring link. */
    public function preview(EntryTranslation $translation): Response
    {
        abort_if($translation->entry->trashed() || $translation->entry->collection->trashed(), 404);

        // Not for search engines, nor for any cache: it's a draft, behind a link that expires.
        return $this->render($translation, preview: true)->header('X-Robots-Tag', 'noindex, nofollow')->header('Cache-Control', 'private, no-store');
    }

    /** An address with the request's query string carried over (?utm_source=…). */
    private static function withQuery(string $url, Request $request): string
    {
        $query = $request->getQueryString();

        return $query === null || $query === '' ? $url : $url.(str_contains($url, '?') ? '&' : '?').$query;
    }

    /** @param  string|null  $locale  the page's language: another than the translation's when it stands in for one */
    private function render(EntryTranslation $translation, bool $preview, ?string $locale = null, bool $draft = false): Response
    {
        $locale ??= $translation->locale;
        $fallback = $locale !== $translation->locale;
        app()->setLocale($locale);
        $collection = $translation->entry->collection;
        $view = self::view($collection->handle, $collection->template, $translation->entry->template);
        $view = (new Page(Page::ENTRY, $locale, $view, entry: $translation, collection: $collection, preview: $preview,
            home: app(Site::class)->isHomepage($translation), fallback: $fallback, draft: $draft))->share()->view;

        return $this->hidden(response()->view($view, [
            'entry' => $translation,
            'title' => $preview ? $translation->draft_title : $translation->title,
            'values' => $translation->values(new HydrationContext($locale, $preview)),
            // Rich text is cleaned when saved, so it's the only HTML a template may print as is.
            'richText' => array_values(array_map(fn (Field $field): string => $field->handle, array_filter($translation->entry->schema()->fields(), fn (Field $field): bool => $field->type === 'rich_text'))),
            'collection' => $collection,
            'locale' => $locale,
            'preview' => $preview,
            'draft' => $draft,
            // The main language's content, in a language it isn't translated into.
            'fallback' => $fallback,
            'contentLocale' => $translation->locale,
        ]));
    }

    /** A term's page: its fields and the live entries with it, newest first. */
    private function renderTerm(TermTranslation $translation, string $locale): Response
    {
        $fallback = $locale !== $translation->locale;
        app()->setLocale($locale);
        $term = $translation->term;
        $taxonomy = $term->taxonomy;
        $entries = EntryTranslation::query()->live()->with('entry.collection')->where('locale', $locale)
            ->whereHas('entry.terms', fn ($q) => $q->where('sunrice_terms.id', $term->id))
            ->orderByDesc('published_at')->orderByDesc('id')->paginate(10)->withQueryString();
        abort_if($entries->currentPage() > 1 && $entries->isEmpty(), 404);
        $view = 'sunrice-cms::term';
        foreach (array_filter([self::own($term->template), $taxonomy->template, "cms.taxonomy-{$taxonomy->handle}", 'cms.term']) as $candidate) {
            if (View::exists($candidate)) {
                $view = $candidate;

                break;
            }
        }
        $schema = $taxonomy->schema();
        $view = (new Page(Page::TERM, $locale, $view, term: $translation, pageNumber: $entries->currentPage(), fallback: $fallback))->share()->view;

        return $this->hidden(response()->view($view, [
            'term' => $translation,
            'taxonomy' => $taxonomy,
            'title' => $translation->title,
            'entries' => $entries,
            'values' => $translation->values(),
            'richText' => array_values(array_map(fn (Field $field): string => $field->handle, array_filter($schema->fields(), fn (Field $field): bool => $field->type === 'rich_text'))),
            'locale' => $locale,
            'fallback' => $fallback,
            'contentLocale' => $translation->locale,
        ]));
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

        $view = (new Page(Page::LISTING, $listing->locale, $view, collection: $collection, pageNumber: $entries->currentPage()))->share()->view;

        return $this->hidden(response()->view($view, [
            'collection' => $collection,
            'title' => $collection->title,
            'entries' => $entries,
            'values' => $schema->hydrate($collection->listingData($listing->locale, $schema), new HydrationContext($listing->locale)),
            'richText' => array_values(array_map(fn (Field $field): string => $field->handle, array_filter($schema->fields(), fn (Field $field): bool => $field->type === 'rich_text'))),
            'locale' => $listing->locale,
            'url' => $collection->listingUrl($listing->locale),
        ]));
    }

    /** The whole site hidden from search engines (Settings → Site): say so on every page too. */
    private function hidden(Response $response): Response
    {
        return app(SiteSettings::class)->hidden() ? $response->header('X-Robots-Tag', 'noindex, nofollow') : $response;
    }

    /** The entry's own template, else the collection's, else cms.{handle}, else cms.entry, else the CMS's plain one. */
    public static function view(string $handle, ?string $template, ?string $entryTemplate = null): string
    {
        foreach (array_filter([self::own($entryTemplate), $template, "cms.{$handle}", 'cms.entry']) as $view) {
            if (View::exists($view)) {
                return $view;
            }
        }

        return 'sunrice-cms::entry';
    }

    /** An entry's or term's own template, only under the site's template prefixes (never another view of the app). */
    private static function own(?string $template): ?string
    {
        return $template !== null && SaveEntrySettings::allowed($template) ? $template : null;
    }
}
