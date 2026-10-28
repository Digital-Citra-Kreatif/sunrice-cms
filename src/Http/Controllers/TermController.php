<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Terms\CreateTerm;
use Sunrice\Cms\Actions\Terms\DeleteTerm;
use Sunrice\Cms\Actions\Terms\MoveTerm;
use Sunrice\Cms\Actions\Terms\ReorderTerms;
use Sunrice\Cms\Actions\Terms\RestoreTerm;
use Sunrice\Cms\Actions\Terms\SaveTerm;
use Sunrice\Cms\Actions\Terms\SaveTermContent;
use Sunrice\Cms\Actions\Terms\TrashTerm;
use Sunrice\Cms\Admin\BlueprintLinks;
use Sunrice\Cms\Admin\TemplateHelp;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Types\TermsField;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Site\TemplateLookup;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\AdminUrls;
use Sunrice\Cms\Support\LanguageValues;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\References;
use Sunrice\Cms\Support\Seo;

/**
 * Content → Terms: a taxonomy's terms, in tree order, each (and a new
 * one) edited in one full editor: title, slug, parent, fields, SEO and
 * template, per language.
 * Behind cms.terms.{view,create,update,delete} (see CmsPlugin).
 *
 * @internal
 */
final class TermController
{
    /** How many of a term's uses the list names; the rest it counts. */
    private const USED_BY_SHOWN = 5;

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
        $terms = Term::query()->when($trashed, fn ($q) => $q->onlyTrashed())->with('translations')->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->get();
        // Counted all at once (one grouped query): the entries out of the trash, as Term::entries() has them.
        Term::countEntries($terms, $taxonomy->id, fn (QueryBuilder $collections) => Entry::query()->whereIn('collection_id', $collections)->select('id'));
        // Where each is used, to warn before trashing or deleting it: the first few, labelled, and how many in all.
        $ids = array_values(array_map(fn (Term $term): int => $term->id, $terms->all()));
        $usedBy = References::usedByMany(Reference::TERM, $ids, self::USED_BY_SHOWN);
        $usedByCount = References::usedByCount(Reference::TERM, $ids);
        $pages = $taxonomy->hasTermPages();

        return Inertia::render('Cms/Terms/Index', [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title, 'hierarchical' => $taxonomy->hierarchical,
                'settings' => $request->user()?->can('cms.taxonomies.update') === true ? route('sunrice.admin.cms.taxonomies.edit', $taxonomy->handle) : null,
                // Its terms' blueprint, for those who may edit blueprints.
                'blueprint' => BlueprintLinks::url($request->user(), $taxonomy->blueprint),
                'collections' => $taxonomy->collections()->orderBy('title')->get(['sunrice_collections.handle', 'sunrice_collections.title'])
                    ->map(fn (Collection $collection): array => ['title' => $collection->title, 'url' => route('sunrice.admin.cms.collections.entries.index', $collection->handle)])->all(),
                // Its index pages' fields: the shared one's, and each collection's.
                'indexPages' => array_map(fn (array $page): array => ['title' => $page['title'], 'collection' => $page['collection'],
                    'url' => route('sunrice.admin.cms.taxonomies.index-page.edit', array_filter(['taxonomy' => $taxonomy->handle, 'collection' => $page['collection']]))], IndexPageController::pages($taxonomy))],
            'trashed' => $trashed,
            // Outside the trash, how many are in it, for an empty list to say so.
            'trashedCount' => $trashed ? 0 : Term::onlyTrashed()->where('taxonomy_id', $taxonomy->id)->count(),
            'taxonomies' => Taxonomy::query()->orderBy('title')->get()->filter(fn (Taxonomy $t): bool => Access::terms($request->user(), 'view', $t))->values()->map(fn (Taxonomy $t): array => ['handle' => $t->handle, 'title' => $t->title])->all(),
            'locales' => Locales::all(),
            'locale' => $locale,
            'terms' => array_map(function (array $item) use ($taxonomy, $locale, $usedBy, $usedByCount, $pages): array {
                [$term, $depth] = $item;
                // Its URL comes from the site's cached routes: no query per term.
                $term->setRelation('taxonomy', $taxonomy);
                $translation = $term->translations->firstWhere('locale', $locale);

                return [
                    'id' => $term->id,
                    'parentId' => $term->parent_id,
                    'depth' => $depth,
                    // Untranslated: the main language's title, to show what it is.
                    'title' => $translation->title ?? null,
                    'slug' => $translation->slug ?? null,
                    'version' => $translation->version ?? null,
                    'fallback' => $term->title(Locales::default()),
                    'entries' => $term->entries_count ?? 0,
                    'createdAt' => $term->created_at?->toIso8601String(),
                    // Its usual page: the shared one, else a collection's.
                    'url' => $translation !== null && $pages ? $term->url($locale) : null,
                    // The first few uses' labels (as the confirmations name them) and how many in all.
                    'usedBy' => array_map(fn (array $use): string => $use['label'], $usedBy[$term->id] ?? []),
                    'usedByCount' => $usedByCount[$term->id] ?? 0,
                ];
            }, $trashed ? array_map(fn (Term $t): array => [$t, 0], array_values($terms->all())) : TermsField::tree(array_values($terms->all()), null, 0)),
        ]);
    }

    /** A new term, in the same editor as an existing one: title, slug, where it goes, its fields, SEO and template. */
    public function create(Request $request, Taxonomy $taxonomy): Response
    {
        $locale = $request->query('locale');
        $locale = is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
        $schema = $taxonomy->schema();
        $parent = $request->integer('parent') ?: null;

        return Inertia::render('Cms/Terms/Edit', [
            ...$this->editorProps($request, $taxonomy, null, $locale),
            'term' => null,
            'parentId' => $parent !== null && Term::query()->whereKey($parent)->where('taxonomy_id', $taxonomy->id)->exists() ? $parent : null,
            'translated' => true,
            'shared' => [],
            'sharedValues' => [],
            'values' => $schema->defaults(),
            'seo' => null,
            'version' => null,
            'usedBy' => [],
        ]);
    }

    /** Created with what the editor holds, then on to its editor. */
    public function store(Request $request, Taxonomy $taxonomy, CreateTerm $create): RedirectResponse
    {
        $locale = $this->locale($request);
        $term = $create->handle($taxonomy, $request->only(['title', 'slug', 'parent_id', 'data', 'seo', 'template']), $locale);

        return redirect()->to((string) AdminUrls::term($term, $locale))->with('success', __('":title" added.', ['title' => $term->title($locale)]));
    }

    /**
     * The views tried for a term's pages, in order: each collection's
     * with term pages first (cms/collections/{c}/{t}/…), then the
     * shared ones.
     *
     * @return list<string>
     */
    private static function termViews(Taxonomy $taxonomy, ?string $slug): array
    {
        $shared = TemplateLookup::term($taxonomy, null, $slug);
        $views = [];
        // Loaded once: hasTermPages() reads them too.
        foreach ($taxonomy->loadMissing('collections')->collections->sortBy('title') as $collection) {
            if (($pivot = $collection->getRelation('pivot')) instanceof CollectionTaxonomy && $pivot->term_pages) {
                array_push($views, ...array_diff(TemplateLookup::term($taxonomy, $collection, $slug), $shared));
            }
        }

        return array_values(array_unique([...$views, ...$shared]));
    }

    /**
     * What the term editor needs either way: the taxonomy, the languages,
     * the fields, where a term can go (never under itself or a term under
     * it; in a big taxonomy, searched with the term picker instead:
     * `terms` null) and the templates tried.
     *
     * @return array<string, mixed>
     */
    private function editorProps(Request $request, Taxonomy $taxonomy, ?Term $term, string $locale): array
    {
        $listed = $taxonomy->hierarchical && TermsField::big([$taxonomy->id]) === [];
        $terms = $listed ? Term::query()->with('translations')->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->get() : null;
        // In tree order, the terms under one follow it, deeper: it and they are no place for it.
        $places = [];
        $skipBelow = null;
        foreach ($terms === null ? [] : TermsField::tree(array_values($terms->all()), null, 0) as [$each, $depth]) {
            if ($skipBelow !== null && $depth > $skipBelow) {
                continue;
            }
            $skipBelow = null;
            if ($term !== null && $each->id === $term->id) {
                $skipBelow = $depth;

                continue;
            }
            $places[] = ['id' => $each->id, 'title' => $each->title($locale), 'depth' => $depth];
        }

        return [
            'taxonomy' => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title, 'hierarchical' => $taxonomy->hierarchical],
            'terms' => $taxonomy->hierarchical && ! $listed ? null : $places,
            // Where to add a redirect by hand, for those who may.
            'redirectsUrl' => $request->user()?->can('cms.redirects.create') === true ? route('sunrice.admin.cms.redirects.create') : null,
            // Its terms' blueprint, for those who may edit blueprints.
            'blueprint' => BlueprintLinks::url($request->user(), $taxonomy->blueprint),
            // The views tried for its page, in order, and which exist (Template, and How is it chosen?).
            'templates' => [
                'own' => $term === null ? null : (TemplateHelp::lookup([$term->template])[0] ?? null),
                'fallbacks' => TemplateHelp::lookup(self::termViews($taxonomy, $term?->translation(Locales::default())?->slug)),
                // A view name to show how names map to files.
                'example' => TemplateHelp::example("{$taxonomy->handle}-special"),
            ],
            // The views that exist under the template prefixes, to pick from: read when the Template choice opens.
            'templateChoices' => Inertia::optional(fn (): array => TemplateHelp::choices()),
            'hasPages' => $taxonomy->hasTermPages(),
            // Shared fields in groups, rows and blocks read-only outside the main language (a term not in it yet has nothing to share).
            'fields' => $locale === Locales::default() || $term?->translations->firstWhere('locale', Locales::default()) === null ? $taxonomy->schema()->toAdmin() : $taxonomy->schema()->toAdminShared(),
            'locale' => $locale,
            'locales' => Locales::all(),
        ];
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

    /** Permanently; one used elsewhere only with "force" (the list asks first). */
    public function forceDelete(Request $request, Term $term, DeleteTerm $delete): RedirectResponse
    {
        abort_unless($term->trashed(), 404);
        $delete->handle($term, $request->boolean('force'));

        return back()->with('success', 'Permanently deleted.');
    }

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
            ...$this->editorProps($request, $taxonomy, $term, $locale),
            'term' => ['id' => $term->id, 'title' => $translation->title ?? $term->title(Locales::default()), 'template' => $term->template, 'url' => $translation?->url(),
                // This language's own title and slug, edited here too (empty: not translated yet).
                'ownTitle' => $translation?->title, 'slug' => $translation?->slug, 'mainTitle' => $main?->title,
                // Whether the term has a page of its own, whose address a new slug moves (nothing redirects from the old one).
                'hasPage' => $translation !== null && ! $term->trashed() && $taxonomy->hasTermPages(),
                // The languages it has a title in, for the language switch.
                'translatedIn' => $term->translations->map(fn (TermTranslation $each): string => $each->locale)->values()->all()],
            'parentId' => $term->parent_id,
            'translated' => $translation !== null,
            // Not in the main language yet: nothing to share.
            'shared' => $locale === Locales::default() || $main === null ? [] : $schema->shared(),
            'sharedValues' => array_intersect_key(array_replace($schema->defaults(), $main->data ?? []), array_flip($schema->shared())),
            // With the main language's values of the shared fields in groups, rows and blocks.
            'values' => LanguageValues::read($schema, $translation->data ?? [], $locale === Locales::default() || $main === null ? null : ($main->data ?? [])),
            'seo' => $translation->data[Seo::KEY] ?? null,
            'version' => $translation?->version,
            'usedBy' => References::usedBy(Reference::TERM, $term->id),
        ]);
    }

    public function content(Request $request, Term $term, SaveTermContent $save): RedirectResponse
    {
        $save->handle($term, $request->only(['data', 'seo', 'template', 'version', 'title', 'slug', 'parent_id']), $this->locale($request));

        return back()->with('success', 'Saved. The site shows it now.');
    }

    private function locale(Request $request): string
    {
        $locale = $request->input('locale');

        return is_string($locale) && Locales::has($locale) ? $locale : Locales::default();
    }
}
