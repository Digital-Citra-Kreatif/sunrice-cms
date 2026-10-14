<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Actions\Support\Reorder;
use Sunrice\Actions\Taxonomies\SaveTerm;
use Sunrice\Actions\Taxonomies\TrashTerm;
use Sunrice\Activity\ActivityLogger;
use Sunrice\Admin\AdminUrls;
use Sunrice\Admin\RelatedLinks;
use Sunrice\Admin\Table\Column;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Locks\Versions;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Models\TermTranslation;
use Sunrice\Support\Locales;

class TermsController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request, Taxonomy $taxonomy): Response
    {
        $this->authorize('viewAny', [Term::class, $taxonomy->id]);

        $main = Locales::main();
        $locales = Locales::available();
        $all = Term::query()
            ->where('taxonomy_id', $taxonomy->id)
            ->with('translations')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
        Term::loadEntryCounts($all);
        $ordered = $this->treeOrder($all);
        $titleOf = fn (?Term $t) => $t === null ? null : ($t->translations->firstWhere('locale', $main)->name ?? $t->translations->first()->name ?? '#'.$t->id);
        $byId = $all->keyBy('id');

        // Search, filter and sort in PHP: the tree order (parents before
        // their children) isn't expressible in SQL, and terms are few.
        $search = trim((string) $request->query('search', '')) ?: null;
        $filters = array_filter((array) $request->query('filters', []), fn ($v) => $v !== null && $v !== '');
        $sort = trim((string) $request->query('sort', '')) ?: null;

        $rows = $ordered->filter(function (array $item) use ($search, $filters): bool {
            /** @var Term $term */
            $term = $item['term'];
            if ($search !== null && ! $term->translations->contains(
                fn (TermTranslation $t) => str_contains(mb_strtolower($t->name.' '.$t->slug), mb_strtolower($search)),
            )) {
                return false;
            }
            $parent = $filters['parent'] ?? null;
            if ($parent === 'root' && $term->parent_id !== null) {
                return false;
            }
            if ($parent !== null && $parent !== 'root' && (int) $term->parent_id !== (int) $parent) {
                return false;
            }
            $missing = $filters['missing'] ?? null;
            if ($missing !== null && $term->translations->contains('locale', $missing)) {
                return false;
            }

            return true;
        });

        if ($sort !== null) {
            $direction = str_starts_with($sort, '-') ? -1 : 1;
            $key = ltrim($sort, '-');
            $value = fn (array $item) => match ($key) {
                'entries' => $item['term']->entries_count,
                'created_at' => $item['term']->created_at?->getTimestamp() ?? 0,
                default => mb_strtolower((string) $titleOf($item['term'])),
            };
            $rows = $rows->sort(fn ($a, $b) => $direction * ($value($a) <=> $value($b)));
        }

        $perPage = TablePreferencesController::perPageFor($request, "terms-{$taxonomy->handle}", 25);
        $page = max(1, (int) $request->query('page', 1));
        $urls = app(UrlGenerator::class);
        $hasPages = (bool) $taxonomy->setting('has_archive');
        $paginator = new LengthAwarePaginator(
            $rows->values()->forPage($page, $perPage)->map(function (array $item) use ($titleOf, $byId, $taxonomy, $hasPages, $urls, $main, $locales): array {
                /** @var Term $t */
                $t = $item['term'];

                return [
                    'id' => $t->id,
                    'title' => $titleOf($t),
                    'depth' => $item['depth'],
                    'slug' => $t->translations->firstWhere('locale', $main)->slug ?? '',
                    'parent' => $titleOf($byId->get($t->parent_id)) ?? '—',
                    'entries' => $t->entries_count,
                    'languages' => $t->translations->sortBy(fn (TermTranslation $tr) => array_search($tr->locale, $locales, true))->map(fn (TermTranslation $tr) => strtoupper($tr->locale).(Locales::isMain($tr->locale) || $tr->is_ready ? '' : ' (not ready)'))->implode(', '),
                    'created_at' => $t->created_at?->format('j M Y'),
                    // The term's page, when the taxonomy has term pages.
                    'url' => $hasPages ? $urls->term($t->setRelation('taxonomy', $taxonomy), $main) : null,
                ];
            })->values(),
            $rows->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()],
        );

        $columns = array_values(array_filter([
            new Column('title', 'Title', sortable: true),
            new Column('slug', 'Slug'),
            $taxonomy->hierarchical ? new Column('parent', 'Parent') : null,
            new Column('entries', 'Entries', sortable: true, type: 'number'),
            count($locales) > 1 ? new Column('languages', 'Languages') : null,
            new Column('created_at', 'Created', sortable: true, type: 'date'),
        ]));

        $reorderable = $search === null && $filters === [] && $sort === null
            && $request->user()->can('reorder', [Term::class, $taxonomy->id]);

        return Inertia::render('Taxonomies/Terms', [
            'taxonomy' => $taxonomy->only('id', 'handle', 'title', 'hierarchical', 'blueprint_id') + ['template' => $taxonomy->setting('template')],
            // The ⋮ menu: collections using it, settings, blueprint.
            'related' => RelatedLinks::forTermList($taxonomy->loadMissing(['collections', 'blueprint'])),
            'columns' => $columns,
            'rows' => $paginator,
            'meta' => ['search' => $search, 'filters' => $filters, 'sort' => $sort],
            'parents' => $taxonomy->hierarchical
                ? $ordered->filter(fn (array $i) => $all->contains('parent_id', $i['term']->id))
                    ->map(fn (array $i) => ['value' => (string) $i['term']->id, 'label' => str_repeat('— ', $i['depth']).$titleOf($i['term'])])->values()
                : [],
            'reorderable' => $reorderable,
            'locales' => $locales,
            'mainLocale' => $main,
            'blueprint' => $taxonomy->blueprint?->schema()->toAdminTabs(),
        ]);
    }

    /**
     * Terms in tree order: each parent followed by its children, siblings
     * by sort_order. Orphans (parent missing) count as top level.
     *
     * @param  EloquentCollection<int, Term>  $terms
     * @return Collection<int, array{term: Term, depth: int}>
     */
    protected function treeOrder(EloquentCollection $terms): Collection
    {
        $ids = $terms->pluck('id')->all();
        $children = $terms->groupBy(fn (Term $t) => $t->parent_id !== null && in_array($t->parent_id, $ids, true) ? $t->parent_id : 0);
        $out = collect();
        $walk = function (int $parent, int $depth) use (&$walk, $children, $out): void {
            foreach ($children->get($parent, []) as $term) {
                $out->push(['term' => $term, 'depth' => $depth]);
                $walk($term->id, $depth + 1);
            }
        };
        $walk(0, 0);

        return $out;
    }

    public function bulk(Request $request, Taxonomy $taxonomy): RedirectResponse
    {
        $validated = $request->validate([
            'action' => ['required', 'in:delete'],
            'ids' => ['required', 'array'],
            'ids.*' => ['integer'],
        ]);
        $terms = Term::query()->where('taxonomy_id', $taxonomy->id)->whereIn('id', $validated['ids'])->get();
        foreach ($terms as $term) {
            $this->authorize('delete', $term);
        }
        foreach ($terms as $term) {
            if ($term->exists && Term::query()->whereKey($term->id)->exists()) {
                app(TrashTerm::class)->handle($term);
            }
        }

        return back()->with('success', $terms->count() === 1 ? 'Term deleted.' : "{$terms->count()} terms deleted.");
    }

    public function create(Taxonomy $taxonomy): Response
    {
        $this->authorize('create', [Term::class, $taxonomy->id]);

        return $this->editor($taxonomy, null);
    }

    public function edit(Taxonomy $taxonomy, Term $term): Response|RedirectResponse
    {
        $this->authorize('update', $term);
        // A term opened under another taxonomy's address: go to its own.
        if ($term->taxonomy_id !== $taxonomy->id) {
            return redirect()->to(AdminUrls::term($term));
        }

        return $this->editor($term->taxonomy, $term);
    }

    /** The editor's older addresses (/terms/{id}/edit, …/terms/{id} without /edit). */
    public function legacyEdit(Request $request): RedirectResponse
    {
        $term = Term::query()->findOrFail((int) $request->route('term'));

        return redirect()->to(AdminUrls::term($term), 301);
    }

    /** The terms list's older address (/taxonomies/{handle}). */
    public function legacyIndex(Taxonomy $taxonomy): RedirectResponse
    {
        return redirect()->route('sunrice.admin.terms.index', [$taxonomy, ...request()->query()], 301);
    }

    /** The term editor page (create and edit). */
    protected function editor(Taxonomy $taxonomy, ?Term $term): Response
    {
        $main = Locales::main();
        $term?->load('translations');
        $all = Term::query()->where('taxonomy_id', $taxonomy->id)->with('translations')->orderBy('sort_order')->orderBy('id')->get();
        // A term can't sit under itself or one of its children.
        $excluded = $term === null ? [] : $term->descendantIds();
        $titleOf = fn (Term $t) => $t->translations->firstWhere('locale', $main)->name ?? $t->translations->first()->name ?? '#'.$t->id;
        $hasPages = (bool) $taxonomy->setting('has_archive');
        $user = request()->user();

        return Inertia::render('Taxonomies/TermEdit', [
            'taxonomy' => $taxonomy->only('id', 'handle', 'title', 'hierarchical') + [
                'template' => $taxonomy->setting('template'),
                'has_pages' => $hasPages,
            ],
            'term' => $term === null ? null : [
                'id' => $term->id,
                'version' => Versions::term($term),
                'parent_id' => $term->parent_id,
                'template' => $term->template,
                // Other languages get the main language's values with their
                // own translated text laid over, as the editor shows them.
                'translations' => $term->setRelation('taxonomy', $taxonomy)->translations->keyBy('locale')->map(fn (TermTranslation $tr) => [
                    'title' => $tr->name,
                    'slug' => $tr->slug,
                    'data' => (object) $term->dataFor($tr),
                    'seo' => (object) ($tr->seo ?? []),
                    'is_ready' => Locales::isMain($tr->locale) || $tr->is_ready,
                ]),
                'urls' => $hasPages
                    ? collect(Locales::available())->mapWithKeys(fn (string $l) => [$l => app(UrlGenerator::class)->term($term->setRelation('taxonomy', $taxonomy), $l)])
                    : null,
                'entries' => $term->entries()->count(),
            ],
            'parents' => $taxonomy->hierarchical
                ? $this->treeOrder($all)
                    ->reject(fn (array $i) => in_array($i['term']->id, $excluded, true))
                    ->map(fn (array $i) => ['value' => (string) $i['term']->id, 'label' => str_repeat('— ', $i['depth']).$titleOf($i['term'])])
                    ->values()
                : [],
            'locales' => Locales::available(),
            'mainLocale' => $main,
            'blueprint' => $taxonomy->blueprint?->schema()->toAdminTabs(),
            'can' => [
                'edit' => $term === null || $user->can('update', $term),
                'delete' => $term !== null && $user->can('delete', $term),
            ],
        ]);
    }

    public function store(Request $request, Taxonomy $taxonomy, SaveTerm $save): RedirectResponse
    {
        $this->authorize('create', [Term::class, $taxonomy->id]);

        $term = $save->handle($taxonomy, $request->all());

        return redirect()->to(AdminUrls::term($term))->with('success', 'Term created.');
    }

    public function update(Request $request, Term $term, SaveTerm $save): RedirectResponse
    {
        $this->authorize('update', $term);
        Versions::ensureUnchanged($request->input('version'), Versions::term($term), $request->boolean('overwrite'));

        $save->handle($term->taxonomy, $request->except(['version', 'overwrite']), $term);

        return back()->with('success', 'Term saved.');
    }

    public function destroy(Term $term): RedirectResponse
    {
        $this->authorize('delete', $term);

        app(TrashTerm::class)->handle($term);

        // The editor can't show a deleted term: back to the list.
        return redirect()->route('sunrice.admin.terms.index', $term->taxonomy)->with('success', 'Term deleted.');
    }

    public function reorder(Request $request, Taxonomy $taxonomy, Reorder $reorder): RedirectResponse
    {
        $this->authorize('reorder', [Term::class, $taxonomy->id]);

        $validated = $request->validate([
            'items' => ['required', 'array'],
            'items.*' => ['integer'],
        ]);
        // The posted ids may be one page of the list: they take the
        // positions those terms hold in the full order, in the new order.
        $full = $this->treeOrder(Term::query()->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->get())
            ->map(fn (array $i) => $i['term']->id)->all();
        $posted = array_values(array_intersect(array_map('intval', $validated['items']), $full));
        $slots = array_values(array_intersect($full, $posted));
        $order = $full;
        foreach ($slots as $n => $id) {
            $order[array_search($id, $full, true)] = $posted[$n];
        }
        $reorder->handle(Term::class, array_values($order));
        app(ActivityLogger::class)->record('reordered', $taxonomy, ['note' => 'terms']);

        return back();
    }
}
