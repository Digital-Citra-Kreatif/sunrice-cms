<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Entries\CreateEntry;
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
            ]);

        return Inertia::render('Cms/Entries/Index', [
            'collection' => self::collection($collection),
            'collections' => Collection::query()->orderBy('title')->get()->map(fn (Collection $c): array => ['handle' => $c->handle, 'title' => $c->title])->all(),
            'entries' => $entries,
            'query' => ['search' => $search, 'trashed' => $trashed],
            'can' => self::can($request),
        ]);
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
        $translation = self::translation($entry);
        $collection = $entry->collection;

        return Inertia::render('Cms/Entries/Editor', [
            'collection' => self::collection($collection),
            'fields' => $collection->schema()->toAdmin(),
            'entry' => [
                'id' => $entry->id,
                'locale' => $translation->locale,
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
        $translation = $save->handle(self::translation($entry), $request->only(['title', 'slug', 'data', 'version']));
        if ($publishing) {
            $publish->handle($translation, $publishAt);

            return back()->with('success', self::published($translation));
        }

        return back()->with('success', 'Draft saved.');
    }

    public function publish(Request $request, Entry $entry, PublishEntry $publish): RedirectResponse
    {
        $translation = $publish->handle(self::translation($entry), self::publishAt($request));

        return back()->with('success', self::published($translation));
    }

    public function unpublish(Entry $entry, UnpublishEntry $unpublish): RedirectResponse
    {
        $unpublish->handle(self::translation($entry));

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

    public function restoreRevision(Revision $revision, RestoreRevision $restore): RedirectResponse
    {
        abort_if($revision->translation->entry->collection->trashed(), 404);
        $restore->handle($revision);

        return back()->with('success', 'The revision is in the draft now. Publish it to put it on the site.');
    }

    /** The translation edited here: the main language's (other languages come with the multilingual editor). */
    private static function translation(Entry $entry): EntryTranslation
    {
        abort_if($entry->collection->trashed(), 404);
        $entry->loadMissing('translations');

        return $entry->translation(Locales::default()) ?? $entry->translations->sortBy('id')->first() ?? abort(404);
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
