<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Terms\DeleteTerm;
use Sunrice\Cms\Actions\Terms\MoveTerm;
use Sunrice\Cms\Actions\Terms\SaveTerm;
use Sunrice\Cms\Fields\Types\TermsField;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * Content → Terms: a taxonomy's terms, in tree order, edited in place.
 * Behind cms.terms.manage (see CmsPlugin).
 *
 * @internal
 */
final class TermController
{
    public function home(): RedirectResponse|Response
    {
        $first = Taxonomy::query()->orderBy('title')->first();

        return $first === null
            ? Inertia::render('Cms/Terms/Index', ['taxonomy' => null, 'taxonomies' => [], 'terms' => [], 'locales' => Locales::all(), 'locale' => Locales::default()])
            : redirect()->route('sunrice.admin.cms.terms.index', $first->handle);
    }

    public function index(Request $request, Taxonomy $taxonomy): Response
    {
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $terms = Term::query()->with('translations')->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->get();

        return Inertia::render('Cms/Terms/Index', [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title, 'hierarchical' => $taxonomy->hierarchical],
            'taxonomies' => Taxonomy::query()->orderBy('title')->get()->map(fn (Taxonomy $t): array => ['handle' => $t->handle, 'title' => $t->title])->all(),
            'locales' => Locales::all(),
            'locale' => $locale,
            'terms' => array_map(function (array $item) use ($locale): array {
                [$term, $depth] = $item;
                $translation = $term->translations->firstWhere('locale', $locale);

                return [
                    'id' => $term->id,
                    'parentId' => $term->parent_id,
                    'depth' => $depth,
                    // Untranslated: the main language's title, to show what it is.
                    'title' => $translation->title ?? null,
                    'slug' => $translation->slug ?? null,
                    'fallback' => $term->title(),
                ];
            }, TermsField::tree(array_values($terms->all()), null, 0)),
        ]);
    }

    public function store(Request $request, Taxonomy $taxonomy, SaveTerm $save): RedirectResponse
    {
        $term = $save->handle($taxonomy, $request->only(['title', 'slug', 'locale', 'parent_id']));

        return back()->with('success', "\"{$term->title($this->locale($request))}\" added.");
    }

    public function update(Request $request, Term $term, SaveTerm $save): RedirectResponse
    {
        $save->handle($term->taxonomy, $request->only(['title', 'slug', 'locale', 'parent_id']), $term);

        return back()->with('success', 'Saved.');
    }

    public function move(Request $request, Term $term, MoveTerm $move): RedirectResponse
    {
        $move->handle($term, $request->input('direction') === 'up' ? -1 : 1);

        return back();
    }

    public function destroy(Term $term, DeleteTerm $delete): RedirectResponse
    {
        $delete->handle($term);

        return back()->with('success', 'Deleted.');
    }

    private function locale(Request $request): string
    {
        $locale = $request->input('locale');

        return is_string($locale) ? $locale : Locales::default();
    }
}
