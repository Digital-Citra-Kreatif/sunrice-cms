<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Entries\CreateEntry;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\DeleteTranslation;
use Sunrice\Cms\Actions\Entries\PublishEntry;
use Sunrice\Cms\Actions\Entries\RestoreEntry;
use Sunrice\Cms\Actions\Entries\RestoreRevision;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Actions\Entries\TrashEntry;
use Sunrice\Cms\Actions\Entries\UnpublishEntry;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Support\Locales;

/**
 * Content → Entries: the list per collection and the editor. Each route
 * is behind its cms.entries.* permission (see CmsPlugin).
 *
 * @internal
 */
final class EntryController
{
    public const PER_PAGE = 25;

    /** The sidebar's Entries item: the first collection's list. */
    public function home(): RedirectResponse|Response
    {
        $first = Collection::query()->orderBy('title')->first();

        return $first === null
            ? Inertia::render('Cms/Entries/Index', ['collection' => null, 'collections' => [], 'entries' => null, 'query' => ['search' => '', 'trashed' => false]])
            : redirect()->route('sunrice.admin.cms.entries.index', $first->handle);
    }

    public function index(Request $request, Collection $collection): Response
    {
        $search = trim((string) $request->string('search'));
        $trashed = $request->boolean('trashed');
        $locale = Locales::default();

        $entries = EntryTranslation::query()
            ->with('entry.translations')
            ->where('collection_id', $collection->id)
            ->where('locale', $locale)
            ->whereHas('entry', fn ($query) => $trashed ? $query->onlyTrashed() : $query->withoutTrashed())
            // whereLike: case-insensitive on every database (ILIKE on PostgreSQL).
            ->when($search !== '', fn ($query) => $query->whereLike('draft_title', '%'.addcslashes($search, '%_\\').'%'))
            ->orderBy($collection->dated ? 'published_at' : 'draft_title', $collection->dated ? 'desc' : 'asc')
            ->orderByDesc('id')
            ->paginate(self::PER_PAGE)
            ->withQueryString()
            ->through(fn (EntryTranslation $translation): array => [
                'id' => $translation->entry_id,
                'title' => $translation->draft_title,
                'slug' => $translation->draft_slug,
                'status' => self::status($translation),
                'publishedAt' => $translation->published_at?->toIso8601String(),
                'updatedAt' => $translation->updated_at?->toIso8601String(),
                'locales' => self::locales($translation->entry),
            ]);

        return Inertia::render('Cms/Entries/Index', [
            'collection' => self::collection($collection),
            'collections' => Collection::query()->orderBy('title')->get()->map(fn (Collection $c): array => ['handle' => $c->handle, 'title' => $c->title])->all(),
            'entries' => $entries,
            'query' => ['search' => $search, 'trashed' => $trashed],
            'can' => self::can($request),
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
            'status' => self::status($translation),
        ], $items)]);
    }

    public function create(Request $request, Collection $collection): Response
    {
        $schema = $collection->schema();

        return Inertia::render('Cms/Entries/Editor', [
            'collection' => self::collection($collection),
            'fields' => $schema->toAdmin(),
            'entry' => null,
            'values' => ['title' => '', 'slug' => '', 'data' => $schema->defaults()],
            'revisions' => [],
            'can' => self::can($request),
        ]);
    }

    public function store(Request $request, Collection $collection, CreateEntry $create): RedirectResponse
    {
        $translation = $create->handle($collection, $request->only(['title', 'slug', 'data']));

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
            'locales' => self::locales($entry),
            // Shared fields are edited in the main language; the others show its values.
            'shared' => $shared,
            'sharedValues' => $main === null ? [] : array_intersect_key($main->draft_data, array_flip($shared)),
            'entry' => [
                'id' => $entry->id,
                'locale' => $translation->locale,
                'isMain' => $translation->isMain(),
                'status' => self::status($translation),
                'publishedAt' => $translation->published_at?->toIso8601String(),
                'hasUnpublishedChanges' => $translation->hasUnpublishedChanges(),
                'trashed' => $entry->trashed(),
                'version' => $translation->version,
            ],
            'values' => ['title' => $translation->draft_title, 'slug' => $translation->draft_slug, 'data' => $translation->draft_data],
            'revisions' => $translation->revisions()->limit(20)->get()->map(fn (Revision $revision): array => [
                'id' => $revision->id,
                'title' => $revision->title,
                'createdAt' => $revision->created_at?->toIso8601String(),
            ])->all(),
            'can' => self::can($request),
        ]);
    }

    /** Saves the draft; with "publish", publishes it too (needs cms.entries.publish). */
    public function update(Request $request, Entry $entry, SaveDraft $save, PublishEntry $publish): RedirectResponse
    {
        $publishing = $request->boolean('publish');
        if ($publishing) {
            // Before saving, so a refused publish doesn't leave a half-done request.
            Gate::authorize('cms.entries.publish');
        }
        $publishAt = $publishing ? self::publishAt($request) : null;
        $translation = $save->handle(self::translation($entry, $request->input('locale')), $request->only(['title', 'slug', 'data', 'version']));
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

    public function restoreRevision(Revision $revision, RestoreRevision $restore): RedirectResponse
    {
        abort_if($revision->translation->entry->collection->trashed(), 404);
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

    /**
     * The site's languages with the entry's state in each: its status, or
     * null where it has no translation yet.
     *
     * @return list<array{code: string, main: bool, status: string|null}>
     */
    private static function locales(Entry $entry): array
    {
        $main = $entry->mainTranslation();

        return array_map(fn (string $code): array => [
            'code' => $code,
            'main' => $main?->locale === $code,
            'status' => ($translation = $entry->translation($code)) === null ? null : self::status($translation),
        ], Locales::all());
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

    /** "draft", "scheduled" or "published". */
    private static function status(EntryTranslation $translation): string
    {
        return ! $translation->isPublished() ? 'draft' : ($translation->isLive() ? 'published' : 'scheduled');
    }

    /** @return array{handle: string, title: string, dated: bool} */
    private static function collection(Collection $collection): array
    {
        return ['handle' => $collection->handle, 'title' => $collection->title, 'dated' => $collection->dated];
    }

    /** @return array<string, bool> */
    private static function can(Request $request): array
    {
        $user = $request->user();
        $can = [];
        foreach (['create', 'update', 'publish', 'delete'] as $ability) {
            $can[$ability] = $user !== null && $user->can("cms.entries.{$ability}");
        }

        return $can;
    }
}
