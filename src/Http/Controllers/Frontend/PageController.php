<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Frontend;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Sunrice\Frontend\RouteMatch;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Frontend\TemplateContext;
use Sunrice\Frontend\TemplateResolver;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Redirect;
use Sunrice\Models\Setting;
use Sunrice\Models\TermTranslation;
use Sunrice\Query\EntryQuery;
use Sunrice\Support\Locales;
use Symfony\Component\HttpFoundation\Response;

class PageController extends Controller
{
    public function __invoke(Request $request): Response|RedirectResponse
    {
        $path = trim((string) $request->attributes->get('sunrice.path', ''), '/');
        $locale = (string) $request->attributes->get('sunrice.locale', Locales::main());

        if ($path === '') {
            return $this->homepage($locale);
        }

        $match = app(RouteMatcher::class)->match($path);

        if ($match === null) {
            return $this->redirectOr404($path, $locale);
        }

        return match ($match->type) {
            'entry' => $this->entry($match, $path, $locale),
            'archive' => $this->archive($match, $locale),
            'term' => $this->term($match, $path, $locale),
            default => $this->redirectOr404($path, $locale),
        };
    }

    protected function homepage(string $locale): Response
    {
        $entryId = (int) Setting::get('homepage_entry_id', 0);
        $entry = $entryId === 0 ? null : Entry::query()->published()->with('translations')->find($entryId);

        if ($entry === null && $entryId !== 0 && $this->canViewDrafts()) {
            $draft = Entry::query()->with('translations')->find($entryId);
            if ($draft !== null) {
                return $this->renderDraft($draft, $locale);
            }
        }

        abort_if($entry === null, 404);

        $entry->resolveFor($locale);

        return $this->render(new TemplateContext(
            pageType: 'entry',
            locale: $locale,
            entry: $entry,
            collection: $entry->collection,
        ), ['entry' => $entry, 'collection' => $entry->collection]);
    }

    protected function entry(RouteMatch $match, string $path, string $locale): Response|RedirectResponse
    {
        abort_if($match->collection === null || $match->slug === null, 404);

        // Hierarchical collections: 'about/team' is found by its last slug,
        // then sent to its current address if the parents differ.
        $nested = $match->collection->isHierarchical();
        if ($nested && str_contains($match->slug, '/')) {
            $segments = explode('/', $match->slug);
            $match = new RouteMatch($match->type, $match->collection, $match->taxonomy, end($segments));
        }

        // The URL slug may be the locale's Ready translation slug or the
        // main-language slug (fallback pages keep the main-language address).
        // Draft translation slugs are never routable.
        $translation = EntryTranslation::query()
            ->where('collection_id', $match->collection->id)
            ->where('slug', $match->slug)
            ->where(fn ($q) => $q
                ->where(fn ($q) => $q->where('locale', $locale)->where('is_ready', true))
                ->orWhere('locale', Locales::main()))
            ->whereHas('entry', fn ($q) => $q->published())
            ->orderByRaw('(locale = ?) desc', [$locale])
            ->first();

        if ($translation === null && $this->canViewDrafts()) {
            // Signed in with sunrice.view-drafts: unpublished entries and
            // translations not yet Ready open as drafts, behind a banner.
            $draft = EntryTranslation::query()
                ->where('collection_id', $match->collection->id)
                ->where('slug', $match->slug)
                ->whereIn('locale', array_unique([$locale, Locales::main()]))
                ->whereHas('entry')
                ->orderByRaw('(locale = ?) desc', [$locale])
                ->first();
            if ($draft !== null) {
                return $this->renderDraft($draft->entry, $locale);
            }
        }

        if ($translation === null) {
            return $this->otherLanguageEntry($match, $locale) ?? $this->redirectOr404($path, $locale);
        }

        $entry = $translation->entry;
        // Rendering reads every language (URLs, hreflang, fallbacks): load them once.
        $entry->loadMissing(['translations', 'collection.blueprint']);
        if ($nested && (int) Setting::get('homepage_entry_id') !== (int) $entry->id) {
            $canonical = app(UrlGenerator::class)->entryUrl($entry, $locale);
            if ($canonical !== null && $canonical !== Locales::prefix($locale).'/'.$path) {
                $query = request()->getQueryString();

                return redirect($canonical.($query ? '?'.$query : ''), 301);
            }
        }
        $entry->resolveFor($locale);

        return $this->render(new TemplateContext(
            pageType: 'entry',
            locale: $locale,
            entry: $entry,
            collection: $match->collection,
        ), ['entry' => $entry, 'collection' => $match->collection]);
    }

    protected function archive(RouteMatch $match, string $locale): Response
    {
        abort_if($match->collection === null || ! $match->collection->setting('has_archive'), 404);

        $entries = EntryQuery::forCollection($match->collection)
            ->locale($locale)
            ->paginate((int) $match->collection->setting('per_page', 12))
            ->withQueryString();

        return $this->render(new TemplateContext(
            pageType: 'archive',
            locale: $locale,
            collection: $match->collection,
        ), [
            'entries' => $entries,
            'collection' => $match->collection,
        ]);
    }

    protected function term(RouteMatch $match, string $path, string $locale): Response|RedirectResponse
    {
        abort_if($match->taxonomy === null || $match->slug === null || ! $match->taxonomy->setting('has_archive'), 404);

        $translation = TermTranslation::query()
            ->where('taxonomy_id', $match->taxonomy->id)
            ->where('slug', $match->slug)
            // Like entries: the locale's Ready slug, or the main-language one.
            ->where(fn ($q) => $q
                ->where(fn ($q) => $q->where('locale', $locale)->where('is_ready', true))
                ->orWhere('locale', Locales::main()))
            ->whereHas('term', fn ($q) => $q->whereNull('deleted_at'))
            ->orderByRaw('(locale = ?) desc', [$locale])
            ->first();

        if ($translation === null) {
            return $this->otherLanguageTerm($match, $locale) ?? $this->redirectOr404($path, $locale);
        }

        $term = $translation->term;
        // Rendering reads every language (URLs, hreflang): load them once.
        $term->loadMissing('translations');
        $term->resolveFor($locale);

        $entries = $term->entries()
            ->published()
            // Per-collection term pages list only that collection's entries.
            ->when($match->collection !== null, fn ($q) => $q->where('collection_id', $match->collection->id))
            ->with(['translations', 'collection.blueprint'])
            ->paginate((int) $match->taxonomy->setting('per_page', 12))
            ->withQueryString();

        // Resolve each entry for the active locale (whole-entry fallback).
        $entries->getCollection()->each(fn (Entry $entry) => $entry->resolveFor($locale));

        return $this->render(new TemplateContext(
            pageType: 'term',
            locale: $locale,
            collection: $match->collection,
            term: $term,
            taxonomy: $match->taxonomy,
        ), [
            'term' => $term,
            'taxonomy' => $match->taxonomy,
            'collection' => $match->collection,
            'entries' => $entries,
        ]);
    }

    /**
     * An unprefixed URL carrying another language's slug, e.g. a link
     * from before the main language changed: redirect to that page.
     */
    protected function otherLanguageEntry(RouteMatch $match, string $locale): ?RedirectResponse
    {
        if (! Locales::isMain($locale)) {
            return null;
        }

        $translation = EntryTranslation::query()
            ->where('collection_id', $match->collection->id)
            ->where('slug', $match->slug)
            ->where('locale', '!=', $locale)
            ->where('is_ready', true)
            ->whereIn('locale', Locales::available())
            ->whereHas('entry', fn ($q) => $q->published())
            ->first();

        return $translation === null
            ? null
            : redirect(app(UrlGenerator::class)->entry($translation->entry, $translation->locale), 301);
    }

    protected function otherLanguageTerm(RouteMatch $match, string $locale): ?RedirectResponse
    {
        if (! Locales::isMain($locale)) {
            return null;
        }

        $translation = TermTranslation::query()
            ->where('taxonomy_id', $match->taxonomy->id)
            ->where('slug', $match->slug)
            ->where('locale', '!=', $locale)
            ->where('is_ready', true)
            ->whereIn('locale', Locales::available())
            ->whereHas('term', fn ($q) => $q->whereNull('deleted_at'))
            ->first();

        return $translation === null
            ? null
            : redirect(app(UrlGenerator::class)->term($translation->term, $translation->locale, $match->collection), 301);
    }

    protected function redirectOr404(string $path, string $locale): Response|RedirectResponse
    {
        // Recorded paths are full URLs, language prefix included.
        $redirect = Redirect::query()
            ->where('old_path', Locales::prefix($locale).'/'.$path)
            ->where('locale', $locale)
            ->first();

        if ($redirect !== null) {
            $entry = $redirect->entry()->published()->first();
            if ($entry !== null) {
                return redirect(app(UrlGenerator::class)->entry($entry, $locale), 301);
            }
        }

        abort(404);
    }

    protected function canViewDrafts(): bool
    {
        $user = auth(config('sunrice.auth.guard', 'web'))->user();

        return $user !== null && $user->can('sunrice.view-drafts');
    }

    /**
     * An entry the public can't see yet, rendered from its drafts for a
     * signed-in editor, with a banner saying so. Never cached or indexed.
     */
    protected function renderDraft(Entry $entry, string $locale): Response
    {
        PreviewController::applyDraft($entry, $locale);
        request()->attributes->set('sunrice.draft', true);

        $response = $this->render(new TemplateContext(
            pageType: 'entry',
            locale: $locale,
            entry: $entry,
            collection: $entry->collection,
        ), ['entry' => $entry, 'collection' => $entry->collection]);

        $content = (string) $response->getContent();
        $banner = view('sunrice::defaults.draft-banner', [
            'entry' => $entry,
            'locale' => $locale,
            'reason' => $this->draftReason($entry, $locale),
        ])->render();
        $content = preg_match('/<body\b[^>]*>/i', $content) === 1
            ? (string) preg_replace_callback('/<body\b[^>]*>/i', fn (array $m) => $m[0].$banner, $content, 1)
            : $banner.$content;

        $response->setContent($content);
        $response->headers->set('X-Robots-Tag', 'noindex');
        $response->headers->set('Cache-Control', 'private, no-store');

        return $response;
    }

    protected function draftReason(Entry $entry, string $locale): string
    {
        if ($entry->status === 'published' && $entry->published_at?->isFuture()) {
            return __('sunrice::frontend.draft_scheduled', ['date' => $entry->published_at->locale($locale)->isoFormat('LLLL')]);
        }
        if ($entry->status !== 'published') {
            return __('sunrice::frontend.draft_unpublished');
        }

        return __('sunrice::frontend.draft_not_ready', ['language' => Locales::name(Locales::main())]);
    }

    /** @param array<string, mixed> $viewData */
    protected function render(TemplateContext $context, array $viewData): Response
    {
        $view = app(TemplateResolver::class)->resolve($context);
        // For components in any layout (<x-sunrice::seo />) to find the page.
        request()->attributes->set('sunrice.page', $context);
        request()->attributes->set('sunrice.template', $view);

        return response()->view($view, $viewData + [
            'locale' => $context->locale,
            'pageType' => $context->pageType,
            // What this page is, for layouts and partials. Unlike $entry or
            // $term it can't be overwritten by a template's own @foreach
            // ($entry in a listing loop leaks into the layout).
            'sunricePage' => $context,
        ]);
    }
}
