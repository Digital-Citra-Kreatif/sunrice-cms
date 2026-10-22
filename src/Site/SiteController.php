<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\View;
use Illuminate\View\ViewException;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Query\EntryPaginator;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\AdminUrls;
use Sunrice\Cms\Support\Locales;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

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
        // Every language has its own prefix (the main one too, /en): a plain address goes to the main language's.
        [, $rest, $matched] = Locales::split($request->path());
        if (! $matched) {
            return SiteRedirect::to(self::withQuery(url(Locales::prefix(Locales::default()).($rest === '/' ? '' : $rest)), $request), 301);
        }
        // The search page (/search, /id/search) before any page at that address.
        if (Search::enabled() && ($locale = $site->searchLocale($request->path())) !== null) {
            return app(SearchController::class)($request, app(Search::class), $locale);
        }
        // Listing pages first: their URLs are fixed, more specific than any {slug}.
        $listing = $site->listing($request->path());
        if ($listing !== null) {
            return $this->renderListing($listing, $request);
        }
        // Taxonomies' index pages (/tags, /books/tags): fixed too.
        $index = $site->taxonomyIndex($request->path());
        if ($index !== null) {
            return $this->renderIndex($index);
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
            if ($site->isHomepage($translation) && $path !== (Locales::prefix($locale) ?: '/')) {
                return SiteRedirect::to(self::withQuery(url(Locales::prefix($locale) ?: '/'), $request), 301);
            }
        } elseif ($translation !== null && ($own = $site->ownPath($translation)) !== null && ($served = $site->path($translation, $translation->slug)) !== $own
            && $path === $own) {
            // The homepage is at /: its own address goes there.
            return SiteRedirect::to(self::withQuery(url((string) $served), $request), 301);
        }
        if ($translation === null) {
            $redirect = $site->redirect($request->path());
            if ($redirect === null && ($own = $site->translatedAddress($request->path())) !== null) {
                // The main language's slug in a language the page has its own address in.
                return SiteRedirect::to(self::withQuery($own, $request), 301);
            }
            if ($redirect === null && ($moved = $site->movedAddress($request->path())) !== null) {
                // An address of a pattern the language had before (/id/books/halo, now /id/buku/halo).
                return SiteRedirect::to(self::withQuery($moved, $request), 301);
            }
            abort_if($redirect === null, 404);

            return SiteRedirect::to(self::withQuery($redirect->targetFor($request->path()), $request), $redirect->status);
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
    private function withDraftBanner(Response $response, EntryTranslation $translation, bool $draft, bool $preview = false): Response
    {
        $live = $translation->isLive() ? $translation->url() : null;
        $banner = view('sunrice-cms::draft-banner', [
            'entry' => $translation,
            'draft' => $draft,
            'preview' => $preview,
            'liveUrl' => $live,
            'draftUrl' => $live === null ? null : $live.'?draft',
            'editUrl' => AdminUrls::entry($translation->entry, $translation->locale),
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

        // Not for search engines, nor for any cache: it's a draft, behind a link that expires. A ribbon says so.
        return $this->withDraftBanner($this->render($translation, preview: true), $translation, draft: true, preview: true)
            ->header('X-Robots-Tag', 'noindex, nofollow');
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

    /**
     * A term's page: its fields and the live entries with it, newest first;
     * on a collection's term page (/books/tags/featured), only that
     * collection's.
     */
    private function renderTerm(TermTranslation $translation, string $locale): Response
    {
        $fallback = $locale !== $translation->locale;
        app()->setLocale($locale);
        $term = $translation->term;
        $taxonomy = $term->taxonomy;
        $collection = $translation->scope;
        // Run when the template first uses $entries: those of the term and, in a hierarchy, of the terms under it.
        $entries = new LazyEntries(function () use ($term, $taxonomy, $locale, $collection): LengthAwarePaginator {
            $terms = [$term->id, ...($taxonomy->hierarchical ? $term->descendantIds() : [])];
            $entries = EntryPaginator::from(EntryTranslation::query()->live()->with(self::listed($locale))->shownIn($locale)
                ->when($collection !== null, fn ($q) => $q->where('collection_id', $collection?->id))
                ->whereHas('entry.terms', fn ($q) => $q->whereIn('sunrice_terms.id', $terms))
                ->orderByDesc('published_at')->orderByDesc('id')->paginate(10))->withQueryString();
            // Hydrated together: the first values() loads what all of them point at.
            (new HydrationContext($locale))->share($entries->getCollection());

            return $entries;
        });
        // The term's own, then (in a collection) cms.{collection}.{taxonomy}, the taxonomy's, cms.taxonomy-{handle}, cms.term, the CMS's plain one.
        $view = 'sunrice-cms::term';
        foreach (array_filter([self::own($term->template), $collection !== null ? "cms.{$collection->handle}.{$taxonomy->handle}" : null, $taxonomy->template, "cms.taxonomy-{$taxonomy->handle}", 'cms.term']) as $candidate) {
            if (View::exists($candidate)) {
                $view = $candidate;

                break;
            }
        }
        $schema = $taxonomy->schema();
        $view = (new Page(Page::TERM, $locale, $view, collection: $collection, term: $translation, pageNumber: self::pageNumber(), fallback: $fallback))->share()->view;

        return $this->hidden(self::renderView($view, [
            'term' => $translation,
            'taxonomy' => $taxonomy,
            // The collection whose term page this is; null on the shared one.
            'collection' => $collection,
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
        // Run when the template first uses $entries.
        $entries = new LazyEntries(function () use ($collection, $listing): LengthAwarePaginator {
            $entries = EntryPaginator::from(EntryTranslation::query()->live()->with(self::listed($listing->locale))
                ->where('collection_id', $collection->id)->shownIn($listing->locale)
                ->when($collection->ordered,
                    fn ($q) => $q->orderBy(Entry::query()->select('sort_order')->whereColumn('sunrice_entries.id', 'sunrice_entry_translations.entry_id'))->orderBy('id'),
                    fn ($q) => $collection->dated ? $q->orderByDesc('published_at')->orderByDesc('id') : $q->orderBy('title')->orderBy('id'))
                ->paginate(max(1, min(100, $collection->per_page))))->withQueryString();
            // Hydrated together: the first values() loads what all of them point at.
            (new HydrationContext($listing->locale))->share($entries->getCollection());

            return $entries;
        });
        $schema = $collection->listingSchema();

        // cms.{handle}-listing, else cms.listing, else the CMS's plain one.
        $view = 'sunrice-cms::listing';
        foreach (["cms.{$collection->handle}-listing", 'cms.listing'] as $candidate) {
            if (View::exists($candidate)) {
                $view = $candidate;

                break;
            }
        }

        $view = (new Page(Page::LISTING, $listing->locale, $view, collection: $collection, pageNumber: self::pageNumber()))->share()->view;

        return $this->hidden(self::renderView($view, [
            'collection' => $collection,
            'title' => $collection->titleIn($listing->locale),
            'entries' => $entries,
            'values' => $schema->hydrate($collection->listingData($listing->locale, $schema), new HydrationContext($listing->locale)),
            'richText' => array_values(array_map(fn (Field $field): string => $field->handle, array_filter($schema->fields(), fn (Field $field): bool => $field->type === 'rich_text'))),
            'locale' => $listing->locale,
            'url' => $collection->listingUrl($listing->locale),
        ]));
    }

    /**
     * A taxonomy's index page: its terms (out of the trash), in their
     * order, each with how many live entries it has in the language
     * (`entries_count`) and its page; a collection's lists only the terms
     * its entries have, counted there, linking to their pages in it when
     * it has term pages (Term::url() follows the page shown).
     */
    private function renderIndex(TaxonomyIndex $index): Response
    {
        $locale = $index->locale;
        app()->setLocale($locale);
        $taxonomy = $index->taxonomy;
        $collection = $index->collection;
        $taxonomy->load('listings');
        /** @param Builder<Entry> $entries */
        $live = fn (Builder $entries) => $entries->when($collection !== null, fn (Builder $q) => $q->where('sunrice_entries.collection_id', $collection?->id))
            ->whereHas('translations', fn (Builder $q) => $q->whereIn('id', EntryTranslation::query()->live()->shownIn($locale)->select('id')));
        $terms = Term::query()->where('taxonomy_id', $taxonomy->id)->with('translations')->withCount(['entries' => $live])
            ->when($collection !== null, fn ($q) => $q->whereHas('entries', $live))
            ->orderBy('sort_order')->orderBy('id')->get();
        // Their links need no queries of their own.
        foreach ($terms as $term) {
            $term->setRelation('taxonomy', $taxonomy);
            foreach ($term->translations as $translation) {
                $translation->setRelation('term', $term);
            }
        }
        $schema = $taxonomy->indexSchema();

        // In a collection cms.{collection}.{taxonomy}-index, then cms.taxonomy-{handle}-index, cms.taxonomy-index, the CMS's plain one.
        $view = 'sunrice-cms::taxonomy-index';
        foreach (array_filter([$collection !== null ? "cms.{$collection->handle}.{$taxonomy->handle}-index" : null, "cms.taxonomy-{$taxonomy->handle}-index", 'cms.taxonomy-index']) as $candidate) {
            if (View::exists($candidate)) {
                $view = $candidate;

                break;
            }
        }
        $view = (new Page(Page::TAXONOMY, $locale, $view, collection: $collection, taxonomy: $taxonomy))->share()->view;

        return $this->hidden(self::renderView($view, [
            'taxonomy' => $taxonomy,
            // The collection whose index page this is; null on the shared one.
            'collection' => $collection,
            'title' => $taxonomy->titleIn($locale),
            'terms' => $terms,
            'values' => $schema->hydrate($taxonomy->indexData($locale, $collection, $schema), new HydrationContext($locale)),
            'richText' => array_values(array_map(fn (Field $field): string => $field->handle, array_filter($schema->fields(), fn (Field $field): bool => $field->type === 'rich_text'))),
            'locale' => $locale,
            'url' => $taxonomy->indexUrl($locale, $collection),
        ]));
    }

    /**
     * What a list's entries load with: in another language than the main
     * one, their other translations too (a main-language one standing in
     * links to its page at this language's address: Site::urlIn()).
     *
     * @return list<string>
     */
    public static function listed(string $locale): array
    {
        return $locale === Locales::default() ? ['entry.collection'] : ['entry.collection', 'entry.translations'];
    }

    /**
     * The page number asked for, read as Laravel's paginators read it, but
     * without asking them (the page cache keeps ?page= copies only of pages
     * whose entries were paginated).
     */
    private static function pageNumber(): int
    {
        $page = filter_var(request()->query('page'), FILTER_VALIDATE_INT);

        return is_int($page) && $page >= 1 ? $page : 1;
    }

    /**
     * A page rendered now; a 404 from inside its template ($entries past
     * the last page) is a 404, not an error.
     *
     * @param  array<string, mixed>  $data
     */
    private static function renderView(string $view, array $data): Response
    {
        try {
            return response()->view($view, $data);
        } catch (ViewException $e) {
            throw $e->getPrevious() instanceof HttpExceptionInterface ? $e->getPrevious() : $e;
        }
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
