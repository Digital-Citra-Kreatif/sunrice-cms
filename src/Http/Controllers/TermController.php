<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Terms\DeleteTerm;
use Sunrice\Cms\Actions\Terms\MoveTerm;
use Sunrice\Cms\Actions\Terms\ReorderTerms;
use Sunrice\Cms\Actions\Terms\RestoreTerm;
use Sunrice\Cms\Actions\Terms\SaveTerm;
use Sunrice\Cms\Actions\Terms\SaveTermContent;
use Sunrice\Cms\Actions\Terms\TrashTerm;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Types\TermsField;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\AdminUrls;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\References;
use Sunrice\Cms\Support\Seo;

/**
 * Content → Terms: a taxonomy's terms, in tree order, edited in place.
 * Behind cms.terms.{view,create,update,delete} (see CmsPlugin).
 *
 * @internal
 */
final class TermController
{
    public function home(Request $request): RedirectResponse|Response
    {
        $first = Taxonomy::query()->orderBy('title')->get()->first(fn (Taxonomy $t): bool => Access::terms($request->user(), 'view', $t));

        return $first === null
            ? Inertia::render('Cms/Terms/Index', ['taxonomy' => null, 'taxonomies' => [], 'terms' => [], 'locales' => Locales::all(), 'locale' => Locales::default()])
            : redirect()->route('sunrice.admin.cms.taxonomies.terms.index', $first->handle);
    }

    public function index(Request $request, Taxonomy $taxonomy): Response
    {
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $trashed = $request->query('status') === 'trashed';
        $terms = Term::query()->when($trashed, fn ($q) => $q->onlyTrashed())->with('translations')->withCount('entries')->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->get();
        // Where each is used, to warn before trashing or deleting it.
        $usedBy = References::usedByMany(Reference::TERM, array_values(array_map(fn (Term $term): int => $term->id, $terms->all())));

        return Inertia::render('Cms/Terms/Index', [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title, 'hierarchical' => $taxonomy->hierarchical,
                // Terms have pages, or fields of their own: edit them on their page.
                'pages' => $taxonomy->route !== null || $taxonomy->blueprint !== null,
                'settings' => $request->user()?->can('cms.taxonomies.update') === true ? route('sunrice.admin.cms.taxonomies.edit', $taxonomy->handle) : null,
                'collections' => $taxonomy->collections()->orderBy('title')->get(['sunrice_collections.handle', 'sunrice_collections.title'])
                    ->map(fn (Collection $collection): array => ['title' => $collection->title, 'url' => route('sunrice.admin.cms.collections.entries.index', $collection->handle)])->all()],
            'trashed' => $trashed,
            'taxonomies' => Taxonomy::query()->orderBy('title')->get()->filter(fn (Taxonomy $t): bool => Access::terms($request->user(), 'view', $t))->values()->map(fn (Taxonomy $t): array => ['handle' => $t->handle, 'title' => $t->title])->all(),
            'locales' => Locales::all(),
            'locale' => $locale,
            'terms' => array_map(function (array $item) use ($locale, $usedBy, $taxonomy): array {
                [$term, $depth] = $item;
                $translation = $term->translations->firstWhere('locale', $locale);

                return [
                    'id' => $term->id,
                    'parentId' => $term->parent_id,
                    'depth' => $depth,
                    // Untranslated: the main language's title, to show what it is.
                    'title' => $translation->title ?? null,
                    'slug' => $translation->slug ?? null,
                    'version' => $translation->version ?? null,
                    'fallback' => $term->title(),
                    'entries' => $term->entries_count ?? 0,
                    'createdAt' => $term->created_at?->toIso8601String(),
                    'url' => $translation !== null && $taxonomy->route !== null ? $term->url($locale) : null,
                    'usedBy' => array_map(fn (array $use): string => $use['label'], $usedBy[$term->id] ?? []),
                ];
            }, $trashed ? array_map(fn (Term $t): array => [$t, 0], array_values($terms->all())) : TermsField::tree(array_values($terms->all()), null, 0)),
        ]);
    }

    /** A new term's page: its title, slug and, in nested taxonomies, where it goes. */
    public function create(Request $request, Taxonomy $taxonomy): Response
    {
        $locale = $this->locale($request);
        $terms = Term::query()->with('translations')->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->get();

        return Inertia::render('Cms/Terms/Create', [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title, 'hierarchical' => $taxonomy->hierarchical],
            'locale' => $locale,
            'locales' => Locales::all(),
            'parent' => $request->integer('parent') ?: null,
            'terms' => $taxonomy->hierarchical ? array_map(fn (array $item): array => ['id' => $item[0]->id, 'title' => $item[0]->title($locale), 'depth' => $item[1]],
                TermsField::tree(array_values($terms->all()), null, 0)) : [],
        ]);
    }

    /** Then to the term's page when terms have pages or fields, else back to the list. */
    public function store(Request $request, Taxonomy $taxonomy, SaveTerm $save): RedirectResponse
    {
        $locale = $this->locale($request);
        $term = $save->handle($taxonomy, $request->only(['title', 'slug', 'locale', 'parent_id']));
        $to = $taxonomy->route !== null || $taxonomy->blueprint !== null
            ? (string) AdminUrls::term($term, $locale)
            : route('sunrice.admin.cms.taxonomies.terms.index', ['taxonomy' => $taxonomy->handle, 'locale' => $locale]);

        return redirect()->to($to)->with('success', __('":title" added.', ['title' => $term->title($locale)]));
    }

    public function update(Request $request, Term $term, SaveTerm $save): RedirectResponse
    {
        $save->handle($term->taxonomy, $request->only(['title', 'slug', 'locale', 'parent_id', 'version']), $term);

        return back()->with('success', 'Saved.');
    }

    public function move(Request $request, Term $term, MoveTerm $move): RedirectResponse
    {
        $move->handle($term, $request->input('direction') === 'up' ? -1 : 1);

        return back();
    }

    /** One level's terms in the order dragged: "taxonomy", "ids" and "parent_id". */
    public function reorder(Request $request, ReorderTerms $reorder): RedirectResponse
    {
        $handle = $request->input('taxonomy');
        $taxonomy = is_string($handle) ? Taxonomy::query()->where('handle', $handle)->first() : null;
        abort_if($taxonomy === null, 404);
        abort_unless(Access::terms($request->user(), 'update', $taxonomy), 403);
        $parent = $request->input('parent_id');
        $reorder->handle($taxonomy, (array) $request->input('ids', []), is_numeric($parent) ? (int) $parent : null);

        return back();
    }

    /** To the trash, with the terms under it. */
    public function destroy(Term $term, TrashTerm $trash): RedirectResponse
    {
        $trash->handle($term);

        return back()->with('success', 'Moved to the trash.');
    }

    public function restore(Term $term, RestoreTerm $restore): RedirectResponse
    {
        $restore->handle($term);

        return back()->with('success', 'Restored.');
    }

    /** For good; one used elsewhere only with "force" (the list asks first). */
    public function forceDelete(Request $request, Term $term, DeleteTerm $delete): RedirectResponse
    {
        abort_unless($term->trashed(), 404);
        $delete->handle($term, $request->boolean('force'));

        return back()->with('success', 'Deleted for good.');
    }

    /** A term's page content in a language: fields, SEO and template. */
    /** A term's old short address: to the one under its taxonomy. */
    public function open(Request $request, Term $term): RedirectResponse
    {
        $locale = $request->query('locale');

        return redirect()->to((string) AdminUrls::term($term, is_string($locale) ? $locale : null));
    }

    public function edit(Request $request, Taxonomy $taxonomy, Term $term): Response|RedirectResponse
    {
        // Under another taxonomy (or its old handle): to its own.
        if ($term->taxonomy_id !== $taxonomy->id) {
            return $this->open($request, $term);
        }
        $term->setRelation('taxonomy', $taxonomy);
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $term->load('translations');
        $taxonomy = $term->taxonomy;
        $schema = $taxonomy->schema();
        $translation = $term->translations->firstWhere('locale', $locale);
        $main = $term->translations->firstWhere('locale', Locales::default());

        return Inertia::render('Cms/Terms/Edit', [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title],
            'term' => ['id' => $term->id, 'title' => $translation->title ?? $term->title(), 'template' => $term->template, 'url' => $translation?->url(),
                // This language's own title and slug, edited here too (empty: not translated yet).
                'ownTitle' => $translation?->title, 'slug' => $translation?->slug, 'mainTitle' => $main?->title,
                // Whether the term has a page of its own, whose address a new slug moves (nothing redirects from the old one).
                'hasPage' => $taxonomy->route !== null && $translation !== null && ! $term->trashed()],
            // Where to add a redirect by hand, for those who may.
            'redirectsUrl' => $request->user()?->can('cms.redirects.create') === true ? route('sunrice.admin.cms.redirects.create') : null,
            'translated' => $translation !== null,
            'fields' => $schema->toAdmin(),
            'locale' => $locale,
            'locales' => Locales::all(),
            'shared' => $locale === Locales::default() ? [] : $schema->shared(),
            'sharedValues' => array_intersect_key(array_replace($schema->defaults(), $main->data ?? []), array_flip($schema->shared())),
            'values' => array_replace($schema->defaults(), $translation->data ?? []),
            'seo' => $translation->data[Seo::KEY] ?? null,
            'version' => $translation?->version,
            'usedBy' => References::usedBy(Reference::TERM, $term->id),
        ]);
    }

    public function content(Request $request, Term $term, SaveTermContent $save): RedirectResponse
    {
        $save->handle($term, $request->only(['data', 'seo', 'template', 'version', 'title', 'slug']), $this->locale($request));

        return back()->with('success', 'Saved. The site shows it now.');
    }

    private function locale(Request $request): string
    {
        $locale = $request->input('locale');

        return is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
    }
}
