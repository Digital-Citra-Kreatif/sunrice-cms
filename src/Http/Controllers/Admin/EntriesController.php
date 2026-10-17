<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Actions\Entries\ChangeBlueprint;
use Sunrice\Actions\Entries\CreateEntry;
use Sunrice\Actions\Entries\DuplicateEntry;
use Sunrice\Actions\Entries\EnsureTranslation;
use Sunrice\Actions\Entries\ForceDeleteEntry;
use Sunrice\Actions\Entries\PublishTranslation;
use Sunrice\Actions\Entries\RestoreEntry;
use Sunrice\Actions\Entries\RestoreRevision;
use Sunrice\Actions\Entries\ReturnTranslationToDraft;
use Sunrice\Actions\Entries\SaveDraft;
use Sunrice\Actions\Entries\SetEntryParent;
use Sunrice\Actions\Entries\SyncEntryTerms;
use Sunrice\Actions\Entries\TrashEntry;
use Sunrice\Actions\Entries\UnpublishEntry;
use Sunrice\Actions\Support\Reorder;
use Sunrice\Activity\ActivityLogger;
use Sunrice\Admin\AdminUrls;
use Sunrice\Admin\Export\CsvExporter;
use Sunrice\Admin\RelatedLinks;
use Sunrice\Admin\Table\Column;
use Sunrice\Admin\Table\EntryFieldColumns;
use Sunrice\Admin\Table\TableQuery;
use Sunrice\Events\ContentChanged;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Locks\Versions;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Revision;
use Sunrice\Rules\ValidSlug;
use Sunrice\Support\Locales;
use Symfony\Component\HttpFoundation\StreamedResponse;

class EntriesController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request, Collection $collection): Response
    {
        $this->authorize('viewAny', [Entry::class, $collection->id]);

        $query = Entry::query()
            ->where('collection_id', $collection->id)
            ->with(['translations' => fn ($q) => $q->where('locale', Locales::main()), 'author'])
            ->when($collection->isHierarchical(), fn ($q) => $q->with(['parent.translations' => fn ($q) => $q->where('locale', Locales::main())]));
        $fieldColumns = new EntryFieldColumns($collection);
        $table = $this->entriesTable($request, $collection, $query, $fieldColumns);
        $meta = $table->meta();
        [$defaultColumn] = $collection->defaultSort();

        // Drag-and-drop when the collection is ordered manually and the
        // list shows that order unfiltered.
        $manual = $defaultColumn === 'sort_order';
        $mayReorder = $manual && $request->user()->can('reorder', [Entry::class, $collection->id]);
        $canReorder = $mayReorder
            && in_array($meta['sort'], [null, 'sort_order'], true)
            && $meta['search'] === null
            && $meta['filters'] === [];

        $userId = $request->user()->getAuthIdentifier();
        $columns = [
            new Column('title', 'Title', sortable: true),
            new Column('status', 'Status', type: 'badge'),
            new Column('author', 'Created by'),
            new Column('created_at', 'Created', sortable: true, type: 'date'),
            new Column('updated_at', 'Updated', sortable: true, type: 'date'),
            ...($collection->isHierarchical() ? [new Column('parent', 'Parent')] : []),
        ];
        // The blueprint's fields, hidden until picked under Columns.
        $columns = [...$columns, ...$fieldColumns->columns(array_map(fn (Column $c) => $c->label, $columns))];
        $visible = $this->visibleEntryColumns((int) $userId, $collection, $fieldColumns);
        $rows = $table->defaultPerPage(TablePreferencesController::perPageFor($request, self::columnsKey($collection), 20))->paginate($request);
        $fieldColumns->preload($rows->getCollection(), $visible);

        // People who wrote entries here, for the "Created by" filter.
        $authorIds = Entry::withTrashed()->where('collection_id', $collection->id)->whereNotNull('author_id')->distinct()->pluck('author_id');
        /** @var class-string<Model> $userModel */
        $userModel = config('sunrice.auth.user_model');
        $authors = $authorIds->isEmpty() ? collect() : $userModel::query()->whereKey($authorIds)->get()
            ->map(fn (Model $u) => ['value' => (string) $u->getKey(), 'label' => (string) $u->getAttribute('name')])
            ->sortBy('label')->values();

        return Inertia::render('Entries/Index', [
            'collection' => $collection->only('id', 'handle', 'title', 'settings'),
            // The ⋮ menu: listing page, terms, settings, blueprint.
            'related' => RelatedLinks::forList($collection->loadMissing(['taxonomies', 'blueprint'])),
            'columns' => $columns,
            'rows' => $rows->through(function (Model $e) use ($fieldColumns, $visible, $collection): array {
                /** @var Entry $e */
                $t = $e->translations->first();

                return [
                    'id' => $e->id,
                    'title' => $t === null ? '—' : $t->title,
                    'status' => match (true) {
                        $e->trashed() => 'trashed',
                        $e->status === 'published' && $e->published_at?->isFuture() => 'scheduled',
                        default => $e->status,
                    },
                    'author' => $e->author?->getAttribute('name') ?? '—',
                    'created_at' => $e->created_at?->format('j M Y'),
                    'updated_at' => $e->updated_at?->diffForHumans(),
                    ...($collection->isHierarchical() ? ['parent' => $e->parent === null ? null : $e->parent->translations->first()?->title] : []),
                    ...$fieldColumns->values($e, $visible),
                ];
            }),
            'authors' => $authors,
            'meta' => $meta,
            // Ordered by hand, but a search, filter or column sort hides that order.
            'reorderPaused' => $mayReorder && ! $canReorder,
            'visibleColumns' => $visible,
            'columnsKey' => self::columnsKey($collection),
            'can' => [
                'create' => $request->user()->can('create', [Entry::class, $collection->id]),
                'reorder' => $canReorder,
                // The listing page editor (heading, intro, listing blueprint fields).
                'listing' => $collection->setting('has_archive', false)
                    && ($request->user()->can("sunrice.entries.{$collection->id}.edit") || $request->user()->can("sunrice.entries.{$collection->id}.translate")),
            ],
        ]);
    }

    /**
     * Columns this user shows in this collection. A choice saved before
     * the list gained "Created" and "Created by" (it had an ID column)
     * starts over; one saved before columns were per collection is the
     * starting point.
     *
     * @return array<int, string>
     */
    protected function visibleEntryColumns(int $userId, Collection $collection, EntryFieldColumns $fieldColumns): array
    {
        $default = ['title', 'status', 'author', 'created_at', 'updated_at', ...($collection->isHierarchical() ? ['parent'] : [])];
        $saved = TablePreferencesController::columnsFor($userId, self::columnsKey($collection), [])
            ?: TablePreferencesController::columnsFor($userId, 'entries', $default);
        $known = array_values(array_intersect($saved, [...$default, ...$fieldColumns->keys()]));

        return in_array('id', $saved, true) || $known === [] ? $default : $known;
    }

    /** The saved column choice is per collection: each has its own fields. */
    protected static function columnsKey(Collection $collection): string
    {
        return "entries-{$collection->handle}";
    }

    /**
     * The entries list query: search, status filter and sorting from the
     * request, else the collection's own order. Shared by the list and
     * its CSV export so both show the same entries.
     *
     * @param  Builder<Entry>  $query
     */
    protected function entriesTable(Request $request, Collection $collection, Builder $query, ?EntryFieldColumns $fieldColumns = null): TableQuery
    {
        $main = Locales::main();
        $mainTitle = EntryTranslation::query()
            ->select('title')
            ->whereColumn('entry_id', (new Entry)->qualifyColumn('id'))
            ->where('locale', $main)
            ->limit(1);

        $table = TableQuery::for($query)
            ->searchUsing(function (Builder $q, string $term): void {
                $q->where(function (Builder $q) use ($term): void {
                    $q->whereHas('translations', fn (Builder $t) => $t->whereLike('title', "%{$term}%"));
                    if (ctype_digit($term)) {
                        $q->orWhere('id', (int) $term);
                    }
                });
            })
            // Scheduled = published with a future date; Published = live now.
            ->filter('status', fn (Builder $q, mixed $value) => match ($value) {
                'published' => $q->where('status', 'published')->where(fn (Builder $q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now())),
                'scheduled' => $q->where('status', 'published')->where('published_at', '>', now()),
                default => $q->where('status', $value),
            })
            ->filter('author', fn (Builder $q, mixed $value) => $value === 'none'
                ? $q->whereNull('author_id')
                : $q->where('author_id', $value))
            ->sortUsing('title', fn (Builder $q, string $direction) => $q->orderBy($mainTitle, $direction))
            ->sortable(['id', 'published_at', 'sort_order', 'created_at', 'updated_at']);
        $fieldColumns?->applySorts($table);
        $table->apply($request);

        // No column clicked: the collection's own order (Structure →
        // Collections → Order).
        [$defaultColumn, $defaultDirection] = $collection->defaultSort();
        $meta = $table->meta();
        if ($meta['sort'] === null) {
            $defaultColumn === 'title'
                ? $query->orderBy($mainTitle, $defaultDirection)
                : $query->orderBy($defaultColumn, $defaultDirection);
            $query->orderBy('id', $defaultColumn === 'sort_order' ? 'asc' : 'desc');
        }

        return $table;
    }

    public function export(Request $request, Collection $collection, CsvExporter $csv): StreamedResponse
    {
        $this->authorize('viewAny', [Entry::class, $collection->id]);

        $table = $this->entriesTable($request, $collection, Entry::query()->where('collection_id', $collection->id)->with('translations'), new EntryFieldColumns($collection));

        return $csv->download($table, [
            new Column('id', 'ID'),
            new Column('translations.0.title', 'Title'),
            new Column('status', 'Status'),
            new Column('published_at', 'Published at'),
        ], "{$collection->handle}-entries.csv");
    }

    public function create(Collection $collection): Response
    {
        $this->authorize('create', [Entry::class, $collection->id]);

        return Inertia::render('Entries/Edit', $this->editorProps($collection, null));
    }

    public function store(Request $request, Collection $collection, CreateEntry $create): RedirectResponse
    {
        $this->authorize('create', [Entry::class, $collection->id]);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable', 'string', 'max:255', new ValidSlug,
                Rule::unique('sunrice_entry_translations', 'slug')
                    ->where(fn ($q) => $q->where('collection_id', $collection->id)->where('locale', Locales::main())),
            ],
            'data' => ['array'],
            'seo' => ['array'],
            'blueprint_id' => ['nullable', 'integer', 'exists:sunrice_blueprints,id'],
            'term_ids' => ['sometimes', 'array'],
            'term_ids.*' => ['integer'],
            'parent_id' => ['sometimes', 'nullable', 'integer', SetEntryParent::rule($collection, null)],
        ]);

        $entry = DB::transaction(function () use ($collection, $validated, $request, $create): Entry {
            $entry = $create->handle($collection, $validated, $request->user()->getAuthIdentifier(), $validated['blueprint_id'] ?? null);
            if (($validated['parent_id'] ?? null) !== null) {
                app(SetEntryParent::class)->handle($entry, (int) $validated['parent_id']);
            }
            if (array_key_exists('term_ids', $validated)) {
                app(SyncEntryTerms::class)->handle($entry, $validated['term_ids']);
            }

            return $entry;
        });

        return redirect()->to(AdminUrls::entry($entry))
            ->with('success', 'Entry created.');
    }

    public function edit(Collection $collection, Entry $entry): Response|RedirectResponse
    {
        $this->authorize('view', $entry);
        // An entry opened under another collection's address: go to its own.
        if ($entry->collection_id !== $collection->id) {
            return redirect()->to(AdminUrls::entry($entry));
        }

        return Inertia::render('Entries/Edit', $this->editorProps($entry->collection, $entry));
    }

    /** The editor's older addresses (/entries/{id}, …/entries/{id} without /edit). */
    public function legacyEdit(Request $request): RedirectResponse
    {
        $entry = Entry::withTrashed()->findOrFail((int) $request->route('entry'));

        return redirect()->to(AdminUrls::entry($entry), 301);
    }

    public function update(Request $request, Entry $entry, SaveDraft $saveDraft): RedirectResponse
    {
        // The main language needs edit rights; other languages also accept
        // the translate permission.
        $this->authorize(Locales::isMain((string) $request->input('locale', Locales::main())) ? 'update' : 'translate', $entry);

        $existing = $entry->translations()->where('locale', (string) $request->input('locale', Locales::main()))->first();
        $validated = $request->validate([
            'locale' => ['required', 'string', 'max:10'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable', 'string', 'max:255',
                new ValidSlug([$existing?->slug, $existing?->draft['slug'] ?? null]),
                Rule::unique('sunrice_entry_translations', 'slug')
                    ->where(fn ($q) => $q
                        ->where('collection_id', $entry->collection_id)
                        ->where('locale', $request->input('locale', Locales::main())))
                    ->ignore($entry->id, 'entry_id'),
            ],
            'data' => ['array'],
            'seo' => ['array'],
            'is_ready' => ['nullable', 'boolean'],
            'template' => ['sometimes', 'nullable', 'string', 'max:150', 'regex:/^[A-Za-z0-9_.:\/-]+$/'],
            'term_ids' => ['sometimes', 'array'],
            'term_ids.*' => ['integer'],
            'parent_id' => ['sometimes', 'nullable', 'integer', SetEntryParent::rule($entry->collection, $entry)],
            'version' => ['nullable', 'string', 'max:64'],
            'overwrite' => ['nullable', 'boolean'],
        ]);
        Versions::ensureUnchanged($validated['version'] ?? null, Versions::entry($existing), (bool) ($validated['overwrite'] ?? false));
        unset($validated['version'], $validated['overwrite']);

        // The template belongs to the entry too (editors only, saved now).
        if (array_key_exists('template', $validated) && $request->user()->can('update', $entry)) {
            $entry->update(['template' => $validated['template'] ?: null]);
        }

        // So does the parent page. The URL changes at once (also for its
        // children); the old one redirects.
        if (array_key_exists('parent_id', $validated) && $request->user()->can('update', $entry)) {
            app(SetEntryParent::class)->handle($entry, $validated['parent_id'] === null ? null : (int) $validated['parent_id']);
        }

        // Terms belong to the entry, not a language: editors only (not
        // translate-only users), saved right away rather than as a draft.
        if (array_key_exists('term_ids', $validated) && $request->user()->can('update', $entry)) {
            app(SyncEntryTerms::class)->handle($entry, $validated['term_ids']);
        }

        // Marking a translation Ready puts it live, which translate-only
        // users can't do.
        if (! $request->user()->can('update', $entry)) {
            unset($validated['is_ready']);
        }

        $translation = $this->translationFor($entry, $validated['locale']);
        $saveDraft->handle($translation, $validated);

        return back()->with('success', 'Draft saved.');
    }

    public function destroy(Entry $entry, TrashEntry $trash): RedirectResponse
    {
        $this->authorize('delete', $entry);
        $trash->handle($entry);

        // The editor can't show a trashed entry: go back to the list.
        return redirect()->route('sunrice.admin.entries.index', $entry->collection)->with('success', 'Entry moved to trash.');
    }

    public function restore(Entry $entry, RestoreEntry $restore): RedirectResponse
    {
        $this->authorize('delete', $entry);
        $restore->handle($entry);

        return back()->with('success', 'Entry restored.');
    }

    public function forceDelete(Entry $entry, ForceDeleteEntry $delete): RedirectResponse
    {
        $this->authorize('delete', $entry);
        $delete->handle($entry);

        return redirect()->route('sunrice.admin.entries.index', $entry->collection)->with('success', 'Entry deleted permanently.');
    }

    public function publish(Request $request, Entry $entry, PublishTranslation $publish): RedirectResponse
    {
        $this->authorize('publish', $entry);

        $validated = $request->validate([
            'locale' => ['required', 'string', 'max:10'],
            'published_at' => ['nullable', 'date'],
        ]);

        $translation = $this->translationFor($entry, $validated['locale']);
        $publish->handle($translation, $validated['published_at'] ?? null);

        return back()->with('success', 'Published.');
    }

    /**
     * Change only the publish date of a published entry (reschedule or
     * backdate) without publishing the current draft.
     */
    public function publishDate(Request $request, Entry $entry): RedirectResponse
    {
        $this->authorize('publish', $entry);
        $validated = $request->validate(['published_at' => ['required', 'date']]);

        if ($entry->status !== 'published') {
            return back()->with('error', 'Publish the entry first, then change its date.');
        }

        $entry->published_at = Carbon::parse($validated['published_at']);
        $entry->save();
        ContentChanged::dispatch('entry_saved');

        return back()->with('success', $entry->published_at->isFuture() ? 'Entry scheduled.' : 'Publish date changed.');
    }

    public function unpublish(Entry $entry, UnpublishEntry $unpublish): RedirectResponse
    {
        $this->authorize('publish', $entry);
        $unpublish->handle($entry);

        return back()->with('success', 'Entry unpublished.');
    }

    public function duplicate(Entry $entry, DuplicateEntry $duplicate): RedirectResponse
    {
        $this->authorize('create', [Entry::class, $entry->collection_id]);
        $copy = $duplicate->handle($entry);

        return redirect()->to(AdminUrls::entry($copy))->with('success', 'Entry duplicated.');
    }

    public function changeBlueprint(Request $request, Entry $entry, ChangeBlueprint $change): RedirectResponse
    {
        $this->authorize('update', $entry);

        $validated = $request->validate(['blueprint_id' => ['nullable', 'integer', 'exists:sunrice_blueprints,id']]);
        $blueprint = isset($validated['blueprint_id']) ? Blueprint::find($validated['blueprint_id']) : null;
        $change->handle($entry, $blueprint);

        return back()->with('success', 'Blueprint changed.');
    }

    public function returnToDraft(EntryTranslation $translation, ReturnTranslationToDraft $action): RedirectResponse
    {
        $this->authorize('update', $translation->entry);
        try {
            $action->handle($translation);
        } catch (\DomainException $e) {
            return back()->with('error', $e->getMessage());
        }

        return back()->with('success', 'Translation returned to draft.');
    }

    public function restoreRevision(Revision $revision, RestoreRevision $action): RedirectResponse
    {
        $translation = $revision->translation;
        $this->authorize(Locales::isMain($translation->locale) ? 'update' : 'translate', $translation->entry);

        // Keep the draft being replaced so the restore can be undone.
        session()->put(static::undoKey($translation), ['draft' => $translation->draft]);
        $action->handle($revision);

        return back()->with('success', 'Revision restored to draft.');
    }

    /**
     * Put back the draft a revision restore replaced (this session only).
     */
    public function undoRestore(EntryTranslation $translation): RedirectResponse
    {
        $this->authorize(Locales::isMain($translation->locale) ? 'update' : 'translate', $translation->entry);

        $key = static::undoKey($translation);
        if (! session()->has($key)) {
            return back()->with('error', 'There is no restore to undo.');
        }

        $translation->draft = session()->pull($key)['draft'] ?? null;
        $translation->save();

        return back()->with('success', 'Restore undone: your previous draft is back.');
    }

    protected static function undoKey(EntryTranslation $translation): string
    {
        return "sunrice.undo_restore.{$translation->id}";
    }

    public function reorder(Request $request, Collection $collection, Reorder $reorder): RedirectResponse
    {
        $this->authorize('reorder', [Entry::class, $collection->id]);

        $validated = $request->validate(['items' => ['required', 'array'], 'items.*' => ['integer']]);

        // The list is paginated: `items` is one page in its new order. Keep
        // every other entry where it is and put these in the slots they
        // occupied, then number the whole collection 1..n.
        $moved = array_map('intval', $validated['items']);
        $all = Entry::withTrashed()->where('collection_id', $collection->id)
            ->orderBy('sort_order')->orderBy('id')->pluck('id')->all();
        $moved = array_values(array_intersect($moved, $all));
        $slots = array_keys(array_intersect($all, $moved));
        foreach ($slots as $i => $slot) {
            $all[$slot] = $moved[$i];
        }
        if ($all !== []) {
            $reorder->handle(Entry::class, array_combine(range(1, count($all)), $all));
        }
        ContentChanged::dispatch('entry_saved');
        app(ActivityLogger::class)->record('reordered', $collection, ['note' => 'entries']);

        return back()->with('success', 'Order saved.');
    }

    public function bulk(Request $request, Collection $collection): RedirectResponse
    {
        $validated = $request->validate([
            'action' => ['required', 'string', 'in:trash,restore,delete,publish'],
            'ids' => ['required', 'array'],
            'ids.*' => ['integer'],
        ]);

        $entries = Entry::withTrashed()
            ->where('collection_id', $collection->id)
            ->whereIn('id', $validated['ids'])
            ->get();

        $user = $request->user();

        $done = 0;
        foreach ($entries as $entry) {
            $allowed = match ($validated['action']) {
                'trash' => ! $entry->trashed() && $user->can('delete', $entry),
                'restore', 'delete' => $entry->trashed() && $user->can('delete', $entry),
                'publish' => ! $entry->trashed() && $entry->mainTranslation() !== null && $user->can('publish', $entry),
                default => false,
            };
            if (! $allowed) {
                continue;
            }
            switch ($validated['action']) {
                case 'trash':
                    app(TrashEntry::class)->handle($entry);
                    break;
                case 'restore':
                    app(RestoreEntry::class)->handle($entry);
                    break;
                case 'delete':
                    app(ForceDeleteEntry::class)->handle($entry);
                    break;
                case 'publish':
                    app(PublishTranslation::class)->handle($entry->mainTranslation());
                    break;
            }
            $done++;
        }

        $template = ['trash' => 'Moved %d %s to trash.', 'restore' => 'Restored %d %s.', 'delete' => 'Deleted %d %s permanently.', 'publish' => 'Published %d %s.'][$validated['action']];
        $message = sprintf($template, $done, $done === 1 ? 'entry' : 'entries');
        $skipped = count($validated['ids']) - $done;

        return $done === 0
            ? back()->with('error', 'Nothing changed: you may not have permission for the selected entries.')
            : back()->with('success', $skipped > 0 ? "{$message} {$skipped} skipped." : $message);
    }

    public function preview(Request $request, Entry $entry): RedirectResponse
    {
        $this->authorize('view', $entry);

        $validated = $request->validate(['locale' => ['required', 'string']]);

        $url = URL::temporarySignedRoute(
            'sunrice.frontend.preview',
            now()->addMinutes(30),
            ['entry' => $entry->id, 'locale' => $validated['locale']],
        );

        return back()->with('success', 'Preview link created.')->with('preview_url', $url);
    }

    // ---- internals -----------------------------------------------------------

    /**
     * Standard SEO fields rendered as the `seo` admin tab (stored in the
     * translation's `seo` JSON).
     *
     * @return array<int, array<string, mixed>>
     */
    protected static function seoFields(): array
    {
        return [
            ['handle' => 'title', 'type' => 'text', 'label' => 'Meta title'],
            ['handle' => 'description', 'type' => 'textarea', 'label' => 'Meta description'],
            ['handle' => 'canonical', 'type' => 'text', 'label' => 'Canonical URL'],
            ['handle' => 'image', 'type' => 'asset', 'label' => 'Open Graph image'],
            ['handle' => 'noindex', 'type' => 'toggle', 'label' => 'Hide from search engines (noindex)'],
        ];
    }

    protected function translationFor(Entry $entry, string $locale): EntryTranslation
    {
        return EnsureTranslation::for($entry, $locale);
    }

    /**
     * Entries that can be this entry's parent, as a tree (parents before
     * their children, with their depth for indenting).
     *
     * @return array<int, array{id: int, title: string, depth: int}>
     */
    protected function parentOptions(Collection $collection, ?Entry $entry): array
    {
        $excluded = $entry === null ? [] : [$entry->id, ...$entry->descendantIds()];
        $entries = Entry::query()->where('collection_id', $collection->id)
            ->whereNotIn('id', $excluded)
            ->with(['translations' => fn ($q) => $q->where('locale', Locales::main())])
            ->limit(2000)
            ->get(['id', 'parent_id']);
        $titles = $entries->mapWithKeys(fn (Entry $e) => [$e->id => (string) ($e->translations->first()->title ?? '#'.$e->id)]);
        $byParent = $entries->groupBy(fn (Entry $e) => $e->parent_id !== null && $titles->has($e->parent_id) ? $e->parent_id : 0);

        $out = [];
        $walk = function (int $parentId, int $depth) use (&$walk, &$out, $byParent, $titles): void {
            if ($depth >= Entry::MAX_DEPTH) {
                return;
            }
            foreach ($byParent->get($parentId, collect())->sortBy(fn (Entry $e) => mb_strtolower($titles[$e->id])) as $e) {
                $out[] = ['id' => $e->id, 'title' => $titles[$e->id], 'depth' => $depth];
                $walk($e->id, $depth + 1);
            }
        };
        $walk(0, 0);

        return $out;
    }

    /**
     * @return array<string, mixed>
     */
    protected function editorProps(Collection $collection, ?Entry $entry): array
    {
        $entry?->load(['translations.revisions', 'collection', 'terms']);
        $user = request()->user();

        $blueprint = $entry?->activeBlueprint() ?? $collection->blueprint;
        $translations = [];

        if ($entry !== null) {
            $main = $entry->mainTranslation();
            $mainData = (array) ($main->draft['data'] ?? $main->data ?? []);

            foreach ($entry->translations as $t) {
                $translations[$t->locale] = [
                    'id' => $t->id,
                    'title' => $t->title,
                    'slug' => $t->slug,
                    // Secondary languages edit their text in the main layout.
                    'data' => $entry->dataFor($t, (array) ($t->draft['data'] ?? $t->data ?? []), $mainData),
                    'seo' => $t->draft['seo'] ?? $t->seo ?? [],
                    'is_ready' => (bool) $t->is_ready,
                    'is_outdated' => $t->isOutdated(),
                    'has_draft' => $t->draft !== null,
                    'draft_title' => $t->draft['title'] ?? $t->title,
                    'draft_slug' => $t->draft['slug'] ?? $t->slug,
                    // What this editor loaded, to refuse saving over someone else's changes.
                    'version' => Versions::entry($t),
                    // Public address (null without single pages); live only when
                    // published and Ready, otherwise a signed-in draft view.
                    'url' => app(UrlGenerator::class)->translationUrl($entry, $t),
                    'is_live' => $entry->status === 'published' && $entry->published_at?->isPast() === true
                        && (Locales::isMain($t->locale) || $t->is_ready),
                    'can_undo_restore' => session()->has(static::undoKey($t)),
                    'revisions' => $t->revisions->map(fn (Revision $r) => [
                        'id' => $r->id,
                        'created_at' => $r->created_at?->diffForHumans(),
                        'created_at_iso' => $r->created_at?->toIso8601String(),
                        'user_id' => $r->user_id,
                    ])->values(),
                ];
            }
        }

        return [
            'collection' => $collection->only('id', 'handle', 'title', 'settings', 'blueprint_id'),
            'entry' => $entry === null ? null : [
                'id' => $entry->id,
                'status' => $entry->status,
                'published_at' => $entry->published_at?->toIso8601String(),
                'blueprint_id' => $entry->blueprint_id,
                'author_id' => $entry->author_id,
                'term_ids' => $entry->terms->pluck('id'),
                'template' => $entry->template,
                'parent_id' => $entry->parent_id,
                // The Comments card (loads its list itself, when the collection allows comments).
                'comments_closed' => $entry->comments_closed,
                // {taxonomy id: [term ids]} for the Taxonomies card.
                'terms_by_taxonomy' => (object) $entry->terms->groupBy('taxonomy_id')->map(fn ($terms) => $terms->pluck('id')->values())->all(),
                'translations' => $translations,
            ],
            'blueprint' => $blueprint === null ? null : array_merge(
                $blueprint->schema()->toAdminTabs(),
                [['handle' => 'seo', 'label' => 'SEO', 'fields' => static::seoFields()]],
            ),
            'blueprints' => Blueprint::query()->orderBy('title')->get(['id', 'title', 'handle']),
            // Hierarchical collections: entries this one can be placed under.
            'parentOptions' => $collection->isHierarchical() ? $this->parentOptions($collection, $entry) : null,
            'taxonomies' => $collection->taxonomies->map(fn ($t) => $t->only('id', 'handle', 'title') + [
                'single' => in_array($t->id, array_map('intval', (array) $collection->setting('single_term_taxonomies', [])), true),
            ]),
            'locales' => Locales::available(),
            'mainLocale' => Locales::main(),
            'can' => $entry === null ? null : [
                'update' => $user->can('update', $entry),
                'translate' => $user->can('translate', $entry),
                'publish' => $user->can('publish', $entry),
                'delete' => $user->can('delete', $entry),
                'create' => $user->can('create', [Entry::class, $entry->collection_id]),
                'view_drafts' => $user->can('sunrice.view-drafts'),
            ],
        ];
    }
}
