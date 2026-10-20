<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Admin\Preferences\Preferences;
use Sunrice\Cms\Actions\Entries\CreateEntry;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\DeleteTranslation;
use Sunrice\Cms\Actions\Entries\PublishEntry;
use Sunrice\Cms\Actions\Entries\RestoreEntry;
use Sunrice\Cms\Actions\Entries\RestoreRevision;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Actions\Entries\TrashEntry;
use Sunrice\Cms\Actions\Entries\UnpublishEntry;
use Sunrice\Cms\Admin\EntryList;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

/**
 * Content → Entries: the list per collection and the editor. Each route
 * is behind its cms.entries.* permission (see CmsPlugin).
 *
 * @internal
 */
final class EntryController
{
    /** The sidebar's Entries item: the first collection's list. */
    public function home(Request $request): RedirectResponse|Response
    {
        $first = Access::collections($request->user())->first();

        return $first === null
            ? Inertia::render('Cms/Entries/Index', ['collection' => null, 'collections' => [], 'entries' => null, 'query' => null])
            : redirect()->route('sunrice.admin.cms.entries.index', $first->handle);
    }

    public function index(Request $request, Collection $collection, Preferences $preferences): Response
    {
        $user = $request->user();
        $list = new EntryList($collection, $request, $user instanceof Authenticatable ? $user : null, $preferences);
        $page = $list->query()->paginate($list->perPage)->withQueryString();

        return Inertia::render('Cms/Entries/Index', [
            'collection' => self::collection($collection),
            'collections' => Access::collections($request->user())->map(fn (Collection $c): array => ['handle' => $c->handle, 'title' => $c->title])->all(),
            'entries' => [
                'data' => $list->rows($page->items()),
                'total' => $page->total(),
                'from' => $page->firstItem(),
                'to' => $page->lastItem(),
                'currentPage' => $page->currentPage(),
                'lastPage' => $page->lastPage(),
                'prev_page_url' => $page->previousPageUrl(),
                'next_page_url' => $page->nextPageUrl(),
            ],
            'query' => $list->state(),
            'columns' => array_values($list->columnList()),
            'filters' => $list->filterOptions(),
            'links' => $list->links(),
            'manualOrder' => $list->inManualOrder(),
            'perPageOptions' => EntryList::PER_PAGE,
            'preferencesKey' => EntryList::preferenceKey($collection),
            'can' => self::can($request, $collection),
        ]);
    }

    /**
     * For the entries field's picker: entries by id (in that order), or a
     * search of titles, within some collections. Main-language titles.
     */
    public function picker(Request $request): JsonResponse
    {
        /** @var array{ids?: list<int>, search?: string|null, collections?: list<string>} $input */
        $input = $request->validate([
            'ids' => ['nullable', 'array', 'max:100'],
            'ids.*' => ['integer'],
            'search' => ['nullable', 'string', 'max:200'],
            'collections' => ['nullable', 'array', 'max:50'],
            'collections.*' => ['string'],
        ]);
        $query = EntryTranslation::query()
            ->with('entry.collection')
            ->where('locale', Locales::default())
            ->whereIn('collection_id', Access::collections($request->user())->pluck('id'))
            ->whereHas('entry', fn ($entry) => $entry->withoutTrashed()->whereHas('collection', fn ($collection) => $collection->withoutTrashed()
                ->when(($input['collections'] ?? []) !== [], fn ($c) => $c->whereIn('handle', $input['collections'] ?? []))));

        if (isset($input['ids'])) {
            $found = $query->whereIn('entry_id', $input['ids'])->get()->keyBy('entry_id');
            $items = array_values(array_filter(array_map(fn (int $id): ?EntryTranslation => $found->get($id), $input['ids'])));
        } else {
            $search = trim($input['search'] ?? '');
            $items = $query->when($search !== '', fn ($q) => $q->whereLike('draft_title', '%'.addcslashes($search, '%_\\').'%'))
                ->orderByDesc('updated_at')->limit(20)->get()->all();
        }

        return response()->json(['items' => array_map(fn (EntryTranslation $translation): array => [
            'id' => $translation->entry_id,
            'title' => $translation->draft_title,
            'collection' => $translation->entry->collection->title,
            'status' => $translation->status(),
        ], $items)]);
    }

    public function create(Request $request, Collection $collection): Response
    {
        $schema = $collection->schema();

        return Inertia::render('Cms/Entries/Editor', [
            'collection' => self::collection($collection),
            'fields' => $schema->toAdmin(),
            'entry' => null,
            'values' => ['title' => '', 'slug' => '', 'data' => $schema->defaults(), 'seo' => null],
            'revisions' => [],
            'can' => self::can($request, $collection),
        ]);
    }

    public function store(Request $request, Collection $collection, CreateEntry $create): RedirectResponse
    {
        $translation = $create->handle($collection, $request->only(['title', 'slug', 'data', 'seo']));

        return redirect()->route('sunrice.admin.cms.entries.edit', $translation->entry_id)->with('success', "\"{$translation->draft_title}\" created as a draft.");
    }

    public function edit(Request $request, Entry $entry): Response
    {
        $translation = self::translation($entry, $request->query('locale'));
        $collection = $entry->collection;
        $main = $entry->mainTranslation();
        $shared = $translation->isMain() ? [] : $collection->schema()->shared();

        return Inertia::render('Cms/Entries/Editor', [
            'collection' => self::collection($collection),
            'fields' => $collection->schema()->toAdmin(),
            'locales' => EntryList::locales($entry),
            // Shared fields are edited in the main language; the others show its values.
            'shared' => $shared,
            'sharedValues' => $main === null ? [] : array_intersect_key($main->draft_data, array_flip($shared)),
            'entry' => [
                'id' => $entry->id,
                'locale' => $translation->locale,
                'isMain' => $translation->isMain(),
                'status' => $translation->status(),
                'publishedAt' => $translation->published_at?->toIso8601String(),
                'hasUnpublishedChanges' => $translation->hasUnpublishedChanges(),
                'trashed' => $entry->trashed(),
                'version' => $translation->version,
                // The live page, and a signed link to preview the draft (30 minutes).
                'url' => $translation->isLive() && ! $entry->trashed() ? $translation->url() : null,
                'previewUrl' => URL::temporarySignedRoute('sunrice.cms.preview', now()->addMinutes(30), ['translation' => $translation->id]),
            ],
            'values' => ['title' => $translation->draft_title, 'slug' => $translation->draft_slug, 'data' => $translation->draft_data, 'seo' => $translation->draft_data[Seo::KEY] ?? null],
            // Every language's: the parent and its own Blade view.
            'settings' => ['parentId' => $entry->parent_id, 'template' => $entry->template, 'commentsClosed' => $entry->comments_closed],
            'revisions' => $translation->revisions()->limit(20)->get()->map(fn (Revision $revision): array => [
                'id' => $revision->id,
                'title' => $revision->title,
                'createdAt' => $revision->created_at?->toIso8601String(),
            ])->all(),
            // A revision restore this session can be undone.
            'undoRestore' => $request->session()->has(EntryManageController::undoKey($translation)) ? $translation->id : null,
            'can' => self::can($request, $collection, $entry, $translation->locale),
        ]);
    }

    /** Saves the draft; with "publish", publishes it too (needs cms.entries.publish). */
    public function update(Request $request, Entry $entry, SaveDraft $save, PublishEntry $publish): RedirectResponse
    {
        $publishing = $request->boolean('publish');
        if ($publishing) {
            // Before saving, so a refused publish doesn't leave a half-done request.
            abort_unless(Access::entries($request->user(), 'publish', $entry->collection), 403);
        }
        $publishAt = $publishing ? self::publishAt($request) : null;
        $translation = $save->handle(self::translation($entry, $request->input('locale')), $request->only(['title', 'slug', 'data', 'seo', 'version']));
        if ($publishing) {
            $publish->handle($translation, $publishAt);

            return back()->with('success', self::published($translation));
        }

        return back()->with('success', 'Draft saved.');
    }

    public function publish(Request $request, Entry $entry, PublishEntry $publish): RedirectResponse
    {
        $translation = $publish->handle(self::translation($entry, $request->input('locale')), self::publishAt($request));

        return back()->with('success', self::published($translation));
    }

    public function unpublish(Request $request, Entry $entry, UnpublishEntry $unpublish): RedirectResponse
    {
        $unpublish->handle(self::translation($entry, $request->input('locale')));

        return back()->with('success', 'Taken off the site. The draft is kept.');
    }

    public function destroy(Entry $entry, TrashEntry $trash): RedirectResponse
    {
        $trash->handle($entry);

        return redirect()->route('sunrice.admin.cms.entries.index', $entry->collection->handle)->with('success', 'Moved to the trash.');
    }

    public function restore(Entry $entry, RestoreEntry $restore): RedirectResponse
    {
        $restore->handle($entry);

        return back()->with('success', 'Restored.');
    }

    public function addTranslation(Request $request, Entry $entry, CreateTranslation $create): RedirectResponse
    {
        $locale = $request->input('locale');
        $translation = $create->handle($entry, is_string($locale) ? $locale : '');

        return redirect()->route('sunrice.admin.cms.entries.edit', [$entry->id, 'locale' => $translation->locale])
            ->with('success', 'Added as a draft, copied from the main language. Translate it, then publish.');
    }

    public function removeTranslation(Entry $entry, string $locale, DeleteTranslation $delete): RedirectResponse
    {
        $entry->loadMissing('translations');
        $delete->handle($entry->translation($locale) ?? abort(404));

        return redirect()->route('sunrice.admin.cms.entries.edit', $entry->id)->with('success', 'The translation was removed.');
    }

    public function restoreRevision(Request $request, Revision $revision, RestoreRevision $restore): RedirectResponse
    {
        $translation = $revision->translation;
        abort_if($translation->entry->collection->trashed(), 404);
        // The draft it replaces, so the restore can be undone (this session).
        $request->session()->put(EntryManageController::undoKey($translation), [
            'title' => $translation->draft_title, 'slug' => $translation->draft_slug, 'data' => $translation->draft_data,
        ]);
        $restore->handle($revision);

        return back()->with('success', 'The revision is in the draft now. Publish it to put it on the site.');
    }

    /** The translation in a language, or the main one when none is asked for. */
    private static function translation(Entry $entry, mixed $locale = null): EntryTranslation
    {
        abort_if($entry->collection->trashed(), 404);
        $entry->loadMissing('translations');
        if (is_string($locale) && $locale !== '') {
            return $entry->translation($locale) ?? abort(404);
        }

        return $entry->mainTranslation() ?? abort(404);
    }

    private static function publishAt(Request $request): ?\DateTimeInterface
    {
        /** @var array{published_at?: string|null} $validated */
        $validated = Validator::make($request->only('published_at'), ['published_at' => ['nullable', 'date']])->validate();

        return isset($validated['published_at']) ? new \DateTimeImmutable($validated['published_at']) : null;
    }

    private static function published(EntryTranslation $translation): string
    {
        return $translation->isLive() ? 'Published.' : 'Scheduled for '.$translation->published_at?->toDayDateTimeString().'.';
    }

    /** @return array{handle: string, title: string, dated: bool, hierarchical: bool, ordered: bool, listing: bool} */
    private static function collection(Collection $collection): array
    {
        return ['handle' => $collection->handle, 'title' => $collection->title, 'dated' => $collection->dated, 'hierarchical' => $collection->hierarchical, 'comments' => $collection->comments,
            'ordered' => $collection->ordered, 'listing' => $collection->listing_route !== null];
    }

    /** @return array<string, bool> what the user may do here: in the collection, with the entry in this language */
    private static function can(Request $request, Collection $collection, ?Entry $entry = null, ?string $locale = null): array
    {
        $can = [];
        foreach (['create', 'update', 'publish', 'delete'] as $ability) {
            $can[$ability] = Access::entries($request->user(), $ability, $collection, $entry, $locale);
        }

        return $can;
    }
}
