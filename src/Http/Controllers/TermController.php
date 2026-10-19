<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Terms\DeleteTerm;
use Sunrice\Cms\Actions\Terms\MoveTerm;
use Sunrice\Cms\Actions\Terms\RestoreTerm;
use Sunrice\Cms\Actions\Terms\SaveTerm;
use Sunrice\Cms\Actions\Terms\SaveTermContent;
use Sunrice\Cms\Actions\Terms\TrashTerm;
use Sunrice\Cms\Fields\Types\TermsField;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

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
        $trashed = $request->boolean('trashed');
        $terms = Term::query()->when($trashed, fn ($q) => $q->onlyTrashed())->with('translations')->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->get();

        return Inertia::render('Cms/Terms/Index', [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title, 'hierarchical' => $taxonomy->hierarchical,
                // Terms have pages, or fields of their own: edit them on their page.
                'pages' => $taxonomy->route !== null || $taxonomy->blueprint !== null],
            'trashed' => $trashed,
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
            }, $trashed ? array_map(fn (Term $t): array => [$t, 0], array_values($terms->all())) : TermsField::tree(array_values($terms->all()), null, 0)),
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

    public function forceDelete(Term $term, DeleteTerm $delete): RedirectResponse
    {
        abort_unless($term->trashed(), 404);
        $delete->handle($term);

        return back()->with('success', 'Deleted for good.');
    }

    /** A term's page content in a language: fields, SEO and template. */
    public function edit(Request $request, Term $term): Response
    {
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $term->load('translations');
        $taxonomy = $term->taxonomy;
        $schema = $taxonomy->schema();
        $translation = $term->translations->firstWhere('locale', $locale);
        $main = $term->translations->firstWhere('locale', Locales::default());

        return Inertia::render('Cms/Terms/Edit', [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title],
            'term' => ['id' => $term->id, 'title' => $translation->title ?? $term->title(), 'template' => $term->template, 'url' => $translation?->url()],
            'translated' => $translation !== null,
            'fields' => $schema->toAdmin(),
            'locale' => $locale,
            'locales' => Locales::all(),
            'shared' => $locale === Locales::default() ? [] : $schema->shared(),
            'sharedValues' => array_intersect_key(array_replace($schema->defaults(), $main->data ?? []), array_flip($schema->shared())),
            'values' => array_replace($schema->defaults(), $translation->data ?? []),
            'seo' => $translation->data[Seo::KEY] ?? null,
        ]);
    }

    public function content(Request $request, Term $term, SaveTermContent $save): RedirectResponse
    {
        $save->handle($term, $request->only(['data', 'seo', 'template']), $this->locale($request));

        return back()->with('success', 'Saved. The site shows it now.');
    }

    private function locale(Request $request): string
    {
        $locale = $request->input('locale');

        return is_string($locale) ? $locale : Locales::default();
    }
}
