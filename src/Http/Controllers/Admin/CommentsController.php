<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Actions\Comments\ModerateComment;
use Sunrice\Actions\Comments\PostComment;
use Sunrice\Admin\AdminUrls;
use Sunrice\Events\ContentChanged;
use Sunrice\Models\Collection;
use Sunrice\Models\Comment;
use Sunrice\Models\Entry;
use Sunrice\Support\Locales;

/**
 * Admin → Comments: every comment, filtered by status, collection,
 * entry and text, with moderation one by one or in bulk. The entry
 * editor's Comments card reads the same list as JSON (?entry=id) and
 * posts the same actions with Accept: application/json.
 */
class CommentsController extends Controller
{
    public const FILTERS = ['all', 'pending', 'approved', 'spam', 'trash'];

    public function index(Request $request): Response|JsonResponse
    {
        Gate::authorize('sunrice.comments.view');

        $status = in_array($request->string('status')->toString(), self::FILTERS, true) ? $request->string('status')->toString() : 'all';
        $entry = $request->integer('entry') ?: null;
        $collection = $request->string('collection')->toString() ?: null;
        $search = trim($request->string('search')->toString());

        $base = Comment::query()
            ->when($entry !== null, fn (Builder $q) => $q->where('entry_id', $entry))
            ->when($collection !== null, fn (Builder $q) => $q->whereHas('entry.collection', fn (Builder $q) => $q->where('handle', $collection)))
            ->when($search !== '', fn (Builder $q) => $q->where(fn (Builder $q) => $q
                ->whereLike('body', "%{$search}%")
                ->orWhereLike('author_name', "%{$search}%")
                ->orWhereLike('author_email', "%{$search}%")));

        $counts = [
            'all' => (clone $base)->whereIn('status', [Comment::PENDING, Comment::APPROVED])->count(),
            'pending' => (clone $base)->pending()->count(),
            'approved' => (clone $base)->approved()->count(),
            'spam' => (clone $base)->where('status', Comment::SPAM)->count(),
            'trash' => (clone $base)->onlyTrashed()->count(),
        ];

        $query = match ($status) {
            'trash' => (clone $base)->onlyTrashed(),
            'all' => (clone $base)->whereIn('status', [Comment::PENDING, Comment::APPROVED]),
            default => (clone $base)->where('status', $status),
        };
        $comments = $query->with(['entry.collection', 'entry.translations', 'parent'])
            ->orderByDesc('created_at')->orderByDesc('id')
            ->paginate(TablePreferencesController::perPageFor($request, 'comments', 25))
            ->withQueryString()
            ->through(fn (Comment $comment) => static::present($comment));

        if ($request->wantsJson()) {
            return response()->json(['comments' => $comments, 'counts' => $counts]);
        }

        return Inertia::render('Comments/Index', [
            'comments' => $comments,
            'counts' => $counts,
            'filters' => ['status' => $status, 'entry' => $entry, 'collection' => $collection, 'search' => $search],
            'entry' => $entry === null ? null : static::entryLabel(Entry::query()->with('translations')->find($entry)),
            'collections' => Collection::query()->orderBy('title')->get()
                ->filter(fn (Collection $c) => $c->allowsComments())
                ->map(fn (Collection $c) => ['handle' => $c->handle, 'title' => $c->title])->values(),
        ]);
    }

    /** One comment's action: approve, pending, spam, trash, restore or delete. */
    public function moderate(Request $request, int $comment, ModerateComment $moderate): RedirectResponse|JsonResponse
    {
        $action = $request->string('action')->toString();
        Gate::authorize(in_array($action, ['trash', 'restore', 'delete'], true) ? 'sunrice.comments.delete' : 'sunrice.comments.moderate');

        $moderate->handle(Comment::withTrashed()->findOrFail($comment), $action);

        return $this->done($request, static::message($action, 1));
    }

    /** The same actions for several comments at once. */
    public function bulk(Request $request, ModerateComment $moderate): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'action' => ['required', Rule::in(ModerateComment::ACTIONS)],
            'ids' => ['required', 'array', 'max:500'],
            'ids.*' => ['integer'],
        ]);
        Gate::authorize(in_array($validated['action'], ['trash', 'restore', 'delete'], true) ? 'sunrice.comments.delete' : 'sunrice.comments.moderate');

        $comments = Comment::withTrashed()->whereKey($validated['ids'])->get();
        foreach ($comments as $comment) {
            $moderate->handle($comment, $validated['action']);
        }

        return $this->done($request, static::message($validated['action'], $comments->count()));
    }

    public function update(Request $request, Comment $comment, ModerateComment $moderate): RedirectResponse|JsonResponse
    {
        Gate::authorize('sunrice.comments.moderate');

        $moderate->edit($comment, $request->string('body')->toString());

        return $this->done($request, 'Comment updated.');
    }

    /** A moderator's reply, published under their name. */
    public function reply(Request $request, Comment $comment, PostComment $post): RedirectResponse|JsonResponse
    {
        Gate::authorize('sunrice.comments.moderate');

        $entry = $comment->entry;
        abort_if($entry === null, 404);

        $post->handle($entry, ['body' => $request->string('body')->toString(), 'parent_id' => $comment->id], $request->user(), [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'locale' => Locales::isAvailable($comment->locale) ? $comment->locale : Locales::main(),
            'admin' => true,
        ]);

        return $this->done($request, 'Reply posted.');
    }

    /** The entry editor's switch: close or reopen one entry's comments. */
    public function close(Request $request, Entry $entry): RedirectResponse|JsonResponse
    {
        Gate::authorize('sunrice.comments.moderate');
        $validated = $request->validate(['closed' => ['required', 'boolean']]);

        $entry->update(['comments_closed' => (bool) $validated['closed']]);
        ContentChanged::dispatch('comment_saved');

        return $this->done($request, $validated['closed'] ? 'Comments closed for this entry.' : 'Comments open for this entry.');
    }

    /** @return array<string, mixed> */
    public static function present(Comment $comment): array
    {
        return [
            'id' => $comment->id,
            'body' => $comment->body,
            'status' => $comment->status,
            'trashed' => $comment->trashed(),
            'author_name' => $comment->author_name,
            'author_email' => $comment->author_email,
            'user_id' => $comment->user_id,
            'locale' => $comment->locale,
            'created_at' => $comment->created_at?->toIso8601String(),
            'parent' => $comment->parent === null ? null : ['id' => $comment->parent->id, 'author_name' => $comment->parent->author_name],
            'entry' => static::entryLabel($comment->entry),
        ];
    }

    /** @return array{id: int, title: string, collection: string|null, edit_url: string, url: string|null}|null */
    protected static function entryLabel(?Entry $entry): ?array
    {
        if ($entry === null) {
            return null;
        }
        $path = $entry->url;

        return [
            'id' => $entry->id,
            'title' => $entry->mainTranslation()->title ?? "Entry #{$entry->id}",
            'collection' => $entry->collection?->title,
            'edit_url' => AdminUrls::entry($entry),
            'url' => $path === null ? null : url($path),
        ];
    }

    protected static function message(string $action, int $count): string
    {
        $what = $count === 1 ? 'Comment' : "{$count} comments";

        return match ($action) {
            'approve' => "{$what} approved.",
            'pending' => "{$what} held for approval.",
            'spam' => "{$what} marked as spam.",
            'trash' => "{$what} moved to the trash.",
            'restore' => "{$what} restored.",
            default => "{$what} deleted.",
        };
    }

    protected function done(Request $request, string $message): RedirectResponse|JsonResponse
    {
        return $request->wantsJson()
            ? response()->json(['message' => $message])
            : back()->with('success', $message);
    }
}
