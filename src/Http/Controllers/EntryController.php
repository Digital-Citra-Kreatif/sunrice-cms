<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Preferences\Preferences;
use Sunrice\Cms\Actions\Entries\CreateEntry;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\DeleteTranslation;
use Sunrice\Cms\Actions\Entries\MachineTranslateEntry;
use Sunrice\Cms\Actions\Entries\PublishEntry;
use Sunrice\Cms\Actions\Entries\RequestReview;
use Sunrice\Cms\Actions\Entries\RestoreEntry;
use Sunrice\Cms\Actions\Entries\RestoreRevision;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Actions\Entries\SetHomepage;
use Sunrice\Cms\Actions\Entries\TrashEntry;
use Sunrice\Cms\Actions\Entries\UnpublishEntry;
use Sunrice\Cms\Admin\EntryList;
use Sunrice\Cms\Admin\RevisionList;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Types\TermsField;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\AdminUrls;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\References;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Translation\TranslatorFactory;

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
            : redirect()->route('sunrice.admin.cms.collections.entries.index', $first->handle);
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
     * For entries fields, the parent and menu links: some entries by id
     * ("ids"), or the 20 most recently edited, or a search of titles,
     * within some collections. Main-language titles: the draft's of the
     * collections the user may view; of collections that the entries
     * fields of their own collections link to (linkable()) and that are
     * asked for, live entries only, with their live titles. "unavailable": the asked-for
     * collections they can't pick from, by title.
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
        $asked = $input['collections'] ?? [];
        $viewable = Access::collections($request->user());
        // Only for fields that name their collections (not the command palette, whose results open the editor).
        $linkable = Collection::query()->whereIn('handle', $asked === [] ? [] : array_diff(array_intersect($asked, self::linkable($request->user())), self::handles($viewable)))->get();
        $query = EntryTranslation::query()
            ->with('entry.collection')
            ->where('locale', Locales::default())
            ->where(fn ($q) => $q->whereIn('collection_id', $viewable->pluck('id'))
                ->orWhere(fn ($live) => $live->whereIn('collection_id', $linkable->pluck('id'))
                    ->where('status', EntryTranslation::PUBLISHED)->where('published_at', '<=', now())))
            ->whereHas('entry', fn ($entry) => $entry->withoutTrashed()->whereHas('collection', fn ($collection) => $collection->withoutTrashed()
                ->when($asked !== [], fn ($c) => $c->whereIn('handle', $asked))));

        if (isset($input['ids'])) {
            $found = $query->whereIn('entry_id', $input['ids'])->get()->keyBy('entry_id');
            $items = array_values(array_filter(array_map(fn (int $id): ?EntryTranslation => $found->get($id), $input['ids'])));
        } else {
            $search = '%'.addcslashes(trim($input['search'] ?? ''), '%_\\').'%';
            $items = $query->when(trim($input['search'] ?? '') !== '', fn ($q) => $q->where(fn ($q) => $q
                ->where(fn ($own) => $own->whereIn('collection_id', $viewable->pluck('id'))->whereLike('draft_title', $search))
                ->orWhere(fn ($live) => $live->whereIn('collection_id', $linkable->pluck('id'))->whereLike('title', $search))))
                ->orderByDesc('updated_at')->limit(20)->get()->all();
        }
        $own = $viewable->pluck('id')->all();
        $pickable = [...self::handles($viewable), ...self::handles($linkable)];

        return response()->json([
            'items' => array_map(fn (EntryTranslation $translation): array => [
                'id' => $translation->entry_id,
                'title' => in_array($translation->collection_id, $own, true) ? $translation->draft_title : (string) $translation->title,
                'collection' => $translation->entry->collection->title,
                'collectionHandle' => $translation->entry->collection->handle,
                'status' => $translation->status(),
            ], $items),
            'unavailable' => $asked === [] ? [] : Collection::query()->whereIn('handle', array_diff($asked, $pickable))->orderBy('title')->pluck('title')->all(),
        ]);
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Collection<int, Collection>  $collections
     * @return list<string>
     */
    private static function handles(\Illuminate\Database\Eloquent\Collection $collections): array
    {
        return array_values(array_map(fn (Collection $collection): string => $collection->handle, $collections->all()));
    }

    /**
     * The collections the entries fields of a user's own collections (those
     * they may create or edit entries in, any of their blueprints, in
     * groups, repeaters and blocks too) link to, by handle.
     *
     * @return list<string>
     */
    private static function linkable(mixed $user): array
    {
        $handles = [];
        $collect = function (array $fields) use (&$collect, &$handles): void {
            foreach ($fields as $field) {
                if (! is_array($field)) {
                    continue;
                }
                if (($field['type'] ?? null) === 'entries' && is_array($field['collections'] ?? null)) {
                    array_push($handles, ...array_filter($field['collections'], is_string(...)));
                }
                foreach (['fields', 'blocks'] as $key) {
                    if (is_array($field[$key] ?? null)) {
                        $collect($field[$key]);
                    }
                }
            }
        };
        $own = $user instanceof Authorizable ? Access::collections($user, 'create')->merge(Access::collections($user, 'update'))->unique('id') : [];
        foreach ($own as $collection) {
            foreach ($collection->allSchemas() as $schema) {
                $collect($schema->toAdmin());
            }
        }

        return array_values(array_unique($handles));
    }

    /**
     * The command palette's entry search ($panel->commandSearch('cms.entries')):
     * entries whose title in any language contains "q", among those the
     * person may view, most recently edited first. A match in another
     * language opens the editor in that language.
     */
    public function search(Request $request): JsonResponse
    {
        /** @var array{q?: string|null} $input */
        $input = $request->validate(['q' => ['nullable', 'string', 'max:200']]);
        $search = trim($input['q'] ?? '');
        if ($search === '') {
            return response()->json(['items' => []]);
        }
        $main = Locales::default();
        $found = EntryTranslation::query()
            ->with('entry.collection')
            ->whereIn('collection_id', Access::collections($request->user())->pluck('id'))
            ->whereHas('entry', fn ($entry) => $entry->withoutTrashed()->whereHas('collection', fn ($collection) => $collection->withoutTrashed()))
            ->whereLike('draft_title', '%'.addcslashes($search, '%_\\').'%')
            ->orderByRaw('case when locale = ? then 0 else 1 end', [$main])
            ->orderByDesc('updated_at')
            ->limit(40)
            ->get()
            // One line per entry: its main language when that matches, else the first language that does.
            ->unique('entry_id')
            ->take(10);

        return response()->json(['items' => $found->values()->map(fn (EntryTranslation $translation): array => [
            'id' => $translation->entry_id,
            'label' => $translation->draft_title,
            'description' => implode(' · ', array_filter([
                $translation->entry->collection->title,
                $translation->locale === $main ? null : strtoupper($translation->locale),
                $translation->status() === 'published' ? null : self::said($translation->status()),
            ])),
            'group' => self::said('Entries'),
            'icon' => 'file-text',
            'url' => route('sunrice.admin.cms.collections.entries.edit', ['collection' => $translation->entry->collection->handle, 'entry' => $translation->entry_id, ...($translation->locale === $main ? [] : ['locale' => $translation->locale])]),
        ])->all()]);
    }

    /** A word in the panel's language. */
    private static function said(string $text): string
    {
        $said = __($text);

        return is_string($said) ? $said : $text;
    }

    /**
     * For terms fields: a taxonomy's terms in tree order (or those whose
     * title matches "q"), or some by id ("ids"), main-language titles.
     */
    public function termPicker(Request $request): JsonResponse
    {
        /** @var array{taxonomy: string, q?: string|null, ids?: list<int>} $input */
        $input = $request->validate([
            'taxonomy' => ['required', 'string', 'max:64'],
            'q' => ['nullable', 'string', 'max:200'],
            'ids' => ['nullable', 'array', 'max:500'],
            'ids.*' => ['integer'],
        ]);
        $taxonomy = Taxonomy::query()->where('handle', $input['taxonomy'])->first() ?? abort(404);
        if (isset($input['ids'])) {
            $ids = array_map(intval(...), $input['ids']);
            $found = Term::query()->whereKey($ids)->where('taxonomy_id', $taxonomy->id)->pluck('id')->all();
            $labels = TermsField::labels(array_values(array_filter($ids, fn (int $id): bool => in_array($id, $found, true))));

            return response()->json(['items' => array_map(fn (int $id, string $label): array => ['id' => $id, 'label' => $label, 'depth' => 0], array_keys($labels), $labels), 'more' => false]);
        }

        return response()->json(TermsField::options($taxonomy, trim($input['q'] ?? '')));
    }

    public function create(Request $request, Collection $collection): Response
    {
        $schema = $collection->schema();

        return Inertia::render('Cms/Entries/Edit', [
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
        $translation = $create->handle($collection, $request->only(['title', 'slug', 'data', 'seo', 'parent_id']));

        return redirect()->to((string) AdminUrls::entry($translation->entry))->with('success', __('":title" created as a draft.', ['title' => $translation->draft_title]));
    }

    /** An entry's old short address: to the one under its collection. */
    public function open(Request $request, Entry $entry): RedirectResponse
    {
        $locale = $request->query('locale');

        return redirect()->to((string) AdminUrls::entry($entry, is_string($locale) ? $locale : null));
    }

    public function edit(Request $request, Collection $collection, Entry $entry): Response|RedirectResponse
    {
        // Under another collection (or its old handle): to its own.
        if ($entry->collection_id !== $collection->id) {
            return $this->open($request, $entry);
        }
        $entry->setRelation('collection', $collection);
        $translation = self::translation($entry, $request->query('locale'));
        $collection = $entry->collection;
        $main = $entry->mainTranslation();
        $schema = $entry->schema();
        $shared = $translation->isMain() ? [] : $schema->shared();

        return Inertia::render('Cms/Entries/Edit', [
            'collection' => self::collection($collection),
            'fields' => $translation->isMain() ? $schema->toAdmin() : self::markShared($schema->toAdmin()),
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
                // "Submit for review": when, and who asked.
                'review' => $translation->review_requested_at === null ? null : [
                    'requestedAt' => $translation->review_requested_at->toIso8601String(),
                    'by' => $translation->review_requested_by === null ? null : self::userName($translation->review_requested_by),
                ],
                'version' => $translation->version,
                // The live page, and a signed link to preview the draft (30 minutes).
                'url' => $translation->isLive() && ! $entry->trashed() ? $translation->url() : null,
                'previewUrl' => URL::temporarySignedRoute('sunrice.cms.preview', now()->addMinutes(30), ['translation' => $translation->id]),
                // The slug in the address visitors have known (published once, a page of its own, not the homepage's /):
                // the editor notes a new one, which publishing redirects from while the entry is published (PublishEntry).
                'publishedSlug' => $translation->published_at !== null && $collection->route !== null && app(SiteSettings::class)->homepage !== $entry->id ? $translation->slug : null,
            ],
            // Where to add a redirect by hand, for those who may.
            'redirectsUrl' => $request->user()?->can('cms.redirects.create') === true ? route('sunrice.admin.cms.redirects.create') : null,
            // Another language's rows and blocks show the main one's shared values.
            'values' => ['title' => $translation->draft_title, 'slug' => $translation->draft_slug, 'data' => $translation->completeData(true), 'seo' => $translation->draft_data[Seo::KEY] ?? null],
            // Every language's: the parent and its own Blade view.
            // Not for translators: they edit their languages' text only.
            'settings' => Access::entries($request->user(), 'update', $collection, $entry)
                ? ['parentId' => $entry->parent_id, 'template' => $entry->template, 'commentsClosed' => $entry->comments_closed, 'blueprint' => $entry->blueprintHandle()]
                : null,
            // The blueprints it may use, when there's a choice (Page settings).
            'blueprints' => self::blueprints($collection),
            // Whether it's the site's homepage, and whether this user may make it so (a page of a collection with a URL).
            'homepage' => [
                'is' => app(SiteSettings::class)->homepage === $entry->id,
                'can' => $collection->route !== null && ($request->user()?->can('cms.homepage') ?? false),
            ],
            // Loaded after the page shows (Inertia's deferred props): the sidebar's lists.
            // Who published each and what it changed from the one before.
            'revisions' => Inertia::defer(fn (): array => RevisionList::summaries($translation)),
            'comments' => $collection->comments && ($request->user()?->can('cms.comments.view') ?? false)
                ? Inertia::defer(fn (): array => self::comments($entry, $request))
                : null,
            // The chosen terms' titles, so terms fields show them without asking (the options come from cms/term-picker).
            'termLabels' => TermsField::labels(array_map(fn (Reference $reference): int => $reference->id, array_filter(
                $schema->references($translation->completeData(true)),
                fn (Reference $reference): bool => $reference->type === Reference::TERM,
            ))),
            // Where other content points at it, to show and to warn before it goes.
            'usedBy' => References::usedBy(Reference::ENTRY, $entry->id),
            // A revision restore this session can be undone.
            'undoRestore' => $request->session()->has(EntryManageController::undoKey($translation)) ? $translation->id : null,
            // "Translate from …": another language, with machine translation set up.
            'machineTranslate' => ! $translation->isMain() && app(TranslatorFactory::class)->configured() ? $translation->id : null,
            // Another language without it set up: say it exists, and what it needs.
            'machineTranslateMissing' => ! $translation->isMain() && ! app(TranslatorFactory::class)->configured(),
            'can' => self::can($request, $collection, $entry, $translation->locale),
        ]);
    }

    /**
     * The entry's comments for the editor's sidebar: counts by status and
     * the latest five (not spam, not in the trash).
     *
     * @return array{counts: array{pending: int, approved: int, spam: int}, latest: list<array<string, mixed>>, canModerate: bool}
     */
    private static function comments(Entry $entry, Request $request): array
    {
        $counts = ['pending' => 0, 'approved' => 0, 'spam' => 0];
        foreach (Comment::query()->where('entry_id', $entry->id)->toBase()->selectRaw('status, count(*) as total')->groupBy('status')->get() as $row) {
            if (is_string($row->status) && isset($counts[$row->status])) {
                $counts[$row->status] = is_numeric($row->total) ? (int) $row->total : 0;
            }
        }
        $latest = Comment::query()->where('entry_id', $entry->id)->whereIn('status', [Comment::PENDING, Comment::APPROVED])
            ->latest()->orderByDesc('id')->limit(5)->get();
        Comment::withAuthors($latest);

        return [
            'counts' => $counts,
            'latest' => array_values(array_map(fn (Comment $comment): array => [
                'id' => $comment->id,
                'author' => $comment->authorName(),
                'excerpt' => Str::limit($comment->body, 160),
                'status' => $comment->status,
                'locale' => $comment->locale,
                'reply' => $comment->parent_id !== null,
                'createdAt' => $comment->created_at?->toIso8601String(),
            ], $latest->all())),
            'canModerate' => $request->user()?->can('cms.comments.moderate') ?? false,
        ];
    }

    /**
     * Saves the draft with the page settings given (parent_id, template,
     * comments_closed), all or nothing; with "publish", publishes it too
     * (needs cms.entries.publish).
     */
    public function update(Request $request, Entry $entry, SaveDraft $save, PublishEntry $publish, SaveEntrySettings $settings): RedirectResponse
    {
        $publishing = $request->boolean('publish');
        if ($publishing) {
            // Before saving, so a refused publish doesn't leave a half-done request.
            abort_unless(Access::entries($request->user(), 'publish', $entry->collection), 403);
        }
        $publishAt = $publishing ? self::publishAt($request) : null;
        $translation = DB::transaction(function () use ($request, $entry, $save, $settings): EntryTranslation {
            EntryManageController::saveSettings($request, $entry, $settings);

            return $save->handle(self::translation($entry, $request->input('locale')), $request->only(['title', 'slug', 'data', 'seo', 'version']));
        });
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

    /** The entry as the site's homepage (cms.homepage). */
    public function homepage(Entry $entry, SetHomepage $set): RedirectResponse
    {
        $set->handle($entry);

        return back()->with('success', 'It\'s the homepage now.');
    }

    public function requestReview(Request $request, Entry $entry, RequestReview $review): RedirectResponse
    {
        $user = $request->user();
        $review->handle(self::translation($entry, $request->input('locale')), $user instanceof Authorizable ? $user : null);

        return back()->with('success', 'Sent for review. Those who can publish it have been told.');
    }

    public function unpublish(Request $request, Entry $entry, UnpublishEntry $unpublish): RedirectResponse
    {
        $unpublish->handle(self::translation($entry, $request->input('locale')));

        return back()->with('success', 'Taken off the site. The draft is kept.');
    }

    public function destroy(Entry $entry, TrashEntry $trash): RedirectResponse
    {
        $trash->handle($entry);

        return redirect()->route('sunrice.admin.cms.collections.entries.index', $entry->collection->handle)->with('success', 'Moved to the trash.')
            ->with('success_action', ['label' => 'Undo', 'url' => route('sunrice.admin.cms.entries.restore', $entry)]);
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

        return redirect()->to((string) AdminUrls::entry($entry, $translation->locale))
            ->with('success', 'Added as a draft, copied from the main language. Translate it, then publish.');
    }

    /** Machine-translates what this language hasn't translated yet from the main one, into its draft. */
    public function translate(Request $request, Entry $entry, string $locale, TranslatorFactory $translators, MachineTranslateEntry $machine): RedirectResponse
    {
        $translation = self::translationOf($entry, $locale);
        abort_unless($translators->configured() && ! $translation->entry->trashed(), 404);
        $version = $request->input('version');
        try {
            $stats = $machine->handle($translation, is_int($version) || is_string($version) ? $version : null);
        } catch (\RuntimeException $e) {
            return back()->with('error', __('The translation service failed: :message', ['message' => $e->getMessage()]));
        }
        if ($stats->errors !== []) {
            return back()->with('error', __('Not translated: :errors', ['errors' => implode(' ', $stats->errors)]));
        }

        return back()->with('success', $stats->translated === 0
            ? 'Everything is translated already.'
            : __('Translated :count texts into the draft. Check them, then publish.', ['count' => $stats->translated]));
    }

    public function removeTranslation(Entry $entry, string $locale, DeleteTranslation $delete): RedirectResponse
    {
        $entry->loadMissing('translations');
        $delete->handle($entry->translation($locale) ?? abort(404));

        return redirect()->to((string) AdminUrls::entry($entry))->with('success', 'The translation was removed.');
    }

    /** A revision compared with the draft: the fields that differ, as text. */
    public function compareRevision(Entry $entry, Revision $revision): JsonResponse
    {
        abort_unless($revision->translation->entry_id === $entry->id, 404);

        return response()->json(['fields' => RevisionList::compare($revision)]);
    }

    public function restoreRevision(Request $request, Entry $entry, Revision $revision, RestoreRevision $restore): RedirectResponse
    {
        $translation = $revision->translation;
        abort_unless($translation->entry_id === $entry->id, 404);
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
        $translation = is_string($locale) && $locale !== '' ? $entry->translation($locale) : $entry->mainTranslation();
        abort_if($translation === null, 404);
        // The entry it belongs to is this one, its languages loaded already (no queries again for isMain(), completeData()…).
        foreach ($entry->translations as $other) {
            $other->setRelation('entry', $entry);
        }

        return $translation;
    }

    /**
     * Field definitions for another language than the main one: the shared
     * fields inside translated groups, repeaters and blocks marked `shared`,
     * so the editor shows them read-only.
     *
     * @param  list<array<string, mixed>>  $fields
     * @return list<array<string, mixed>>
     */
    private static function markShared(array $fields, bool $nested = false): array
    {
        foreach ($fields as $i => $field) {
            if (($field['translatable'] ?? true) === false) {
                if ($nested) {
                    $fields[$i]['shared'] = true;
                }

                continue;
            }
            if (is_array($field['fields'] ?? null)) {
                /** @var list<array<string, mixed>> $children */
                $children = $field['fields'];
                $fields[$i]['fields'] = self::markShared($children, true);
            }
            if (is_array($field['blocks'] ?? null)) {
                $blocks = $field['blocks'];
                foreach ($blocks as $b => $block) {
                    if (is_array($block) && is_array($block['fields'] ?? null)) {
                        /** @var list<array<string, mixed>> $children */
                        $children = $block['fields'];
                        $block['fields'] = self::markShared($children, true);
                        $blocks[$b] = $block;
                    }
                }
                $fields[$i]['blocks'] = $blocks;
            }
        }

        return $fields;
    }

    private static function publishAt(Request $request): ?\DateTimeInterface
    {
        /** @var array{published_at?: string|null} $validated */
        $validated = Validator::make($request->only('published_at'), ['published_at' => ['nullable', 'date']])->validate();

        return isset($validated['published_at']) ? new \DateTimeImmutable($validated['published_at']) : null;
    }

    private static function published(EntryTranslation $translation): string
    {
        return $translation->isLive() ? 'Published.' : __('Scheduled for :date.', ['date' => $translation->published_at?->toDayDateTimeString()]);
    }

    /** @return array{handle: string, title: string, dated: bool, hierarchical: bool, ordered: bool, listing: bool} */
    private static function collection(Collection $collection): array
    {
        return ['handle' => $collection->handle, 'title' => $collection->title, 'dated' => $collection->dated, 'hierarchical' => $collection->hierarchical, 'comments' => $collection->comments,
            'ordered' => $collection->ordered, 'listing' => $collection->listing_route !== null,
            // Its entries have pages on the site (a route), so a preview shows something.
            'pages' => $collection->route !== null];
    }

    /**
     * The blueprints a collection's entries may choose from, by title;
     * none when there's only its own.
     *
     * @return list<array{handle: string, title: string}>
     */
    private static function blueprints(Collection $collection): array
    {
        $handles = $collection->allowedBlueprints();
        if (count($handles) < 2) {
            return [];
        }
        $titles = Blueprint::query()->whereIn('handle', $handles)->pluck('title', 'handle');

        return array_map(fn (string $handle): array => ['handle' => $handle, 'title' => is_string($titles[$handle] ?? null) ? $titles[$handle] : $handle], $handles);
    }

    /** A user's name, for "asked by" lines; null when they're gone. */
    private static function userName(int $id): ?string
    {
        $name = app(Panel::class)->getUserModel()::query()->whereKey($id)->value('name');

        return is_string($name) ? $name : null;
    }

    /** @return array<string, bool> what the user may do here: in the collection, with the entry in this language */
    private static function can(Request $request, Collection $collection, ?Entry $entry = null, ?string $locale = null): array
    {
        $can = [];
        foreach (['create', 'update', 'publish', 'delete', 'export'] as $ability) {
            $can[$ability] = Access::entries($request->user(), $ability, $collection, $entry, $locale);
        }

        return $can;
    }

    /** One language of an entry, from its address (entries/{entry}/translations/{locale}/…). */
    public static function translationOf(Entry $entry, string $locale): EntryTranslation
    {
        $translation = $entry->translations()->where('locale', $locale)->first();
        abort_if($translation === null, 404);

        return $translation;
    }
}
