<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Comments\DeleteComment;
use Sunrice\Cms\Actions\Comments\EditComment;
use Sunrice\Cms\Actions\Comments\ReplyToComment;
use Sunrice\Cms\Actions\Comments\SetCommentStatus;
use Sunrice\Cms\Actions\Comments\TrashComment;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Comment;

/**
 * Content → Comments: every comment, newest first, by status, to
 * approve, answer, edit, mark as spam, trash and delete. Behind
 * cms.comments.view, .moderate and .delete (see CmsPlugin).
 *
 * @internal
 */
final class CommentController
{
    private const PER_PAGE = 25;

    /** Tabs and the statuses they show (all: what isn't spam). */
    private const TABS = ['all' => [Comment::PENDING, Comment::APPROVED], 'pending' => [Comment::PENDING], 'approved' => [Comment::APPROVED], 'spam' => [Comment::SPAM], 'trash' => []];

    public function index(Request $request): Response
    {
        $tab = $request->query('status');
        $tab = is_string($tab) && isset(self::TABS[$tab]) ? $tab : 'all';
        $search = $request->query('search');
        $search = is_string($search) ? trim(mb_substr($search, 0, 100)) : '';
        $collection = $request->query('collection');
        $collection = is_string($collection) ? Collection::query()->where('handle', $collection)->first() : null;
        $entry = $request->query('entry');
        $entry = is_numeric($entry) ? (int) $entry : null;

        $filtered = fn (): Builder => Comment::query()
            ->when($collection !== null, fn (Builder $q) => $q->whereHas('entry', fn (Builder $e) => $e->where('collection_id', $collection?->id)))
            ->when($entry !== null, fn (Builder $q) => $q->where('entry_id', $entry))
            ->when($search !== '', function (Builder $q) use ($search): void {
                $like = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], mb_strtolower($search)).'%';
                $q->where(fn (Builder $w) => $w->whereRaw("LOWER(body) LIKE ? ESCAPE '!'", [$like])
                    ->orWhereRaw("LOWER(author_name) LIKE ? ESCAPE '!'", [$like])->orWhereRaw("LOWER(author_email) LIKE ? ESCAPE '!'", [$like]));
            });
        // One query for every tab's count: by status, the trash apart.
        $byStatus = ['trash' => 0];
        foreach ($filtered()->withTrashed()->toBase()->selectRaw('status, case when deleted_at is null then 1 else 0 end as live, count(*) as total')->groupByRaw('status, case when deleted_at is null then 1 else 0 end')->get() as $row) {
            $key = is_numeric($row->live) && (int) $row->live === 1 && is_string($row->status) ? $row->status : 'trash';
            $byStatus[$key] = ($byStatus[$key] ?? 0) + (is_numeric($row->total) ? (int) $row->total : 0);
        }
        $counts = [];
        foreach (self::TABS as $name => $statuses) {
            $counts[$name] = $name === 'trash' ? $byStatus['trash'] : array_sum(array_map(fn (string $status): int => $byStatus[$status] ?? 0, $statuses));
        }
        $comments = ($tab === 'trash' ? $filtered()->onlyTrashed() : $filtered()->whereIn('status', self::TABS[$tab]))
            ->with(['entry.translations', 'parent'])->latest()->orderByDesc('id')->paginate(self::PER_PAGE)->withQueryString();
        Comment::withAuthors([...$comments->items(), ...array_filter(array_map(fn (Comment $c): ?Comment => $c->parent, $comments->items()))]);

        return Inertia::render('Cms/Comments/Index', [
            'tab' => $tab,
            'counts' => $counts,
            'filters' => ['search' => $search, 'collection' => $collection?->handle, 'entry' => $entry],
            'collections' => Collection::query()->where('comments', true)->orderBy('title')->get(['handle', 'title'])->map(fn (Collection $c): array => ['handle' => $c->handle, 'title' => $c->title])->all(),
            'comments' => $comments->through(fn (Comment $comment): array => self::row($comment)),
            'can' => ['moderate' => $request->user()?->can('cms.comments.moderate') ?? false, 'delete' => $request->user()?->can('cms.comments.delete') ?? false],
        ]);
    }

    public function status(Request $request, Comment $comment, SetCommentStatus $status): RedirectResponse
    {
        $value = $request->input('status');
        abort_unless(is_string($value) && in_array($value, [Comment::PENDING, Comment::APPROVED, Comment::SPAM], true), 422);
        $status->handle($comment, $value);

        return back()->with('success', match ($value) {
            Comment::APPROVED => 'Approved.',
            Comment::SPAM => 'Marked as spam.',
            default => 'Held for approval.',
        });
    }

    public function reply(Request $request, Comment $comment, ReplyToComment $reply): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user instanceof Model, 403);
        $body = $request->input('body');
        $reply->handle($comment, is_string($body) ? $body : '', $user);

        return back()->with('success', 'Reply posted.');
    }

    public function update(Request $request, Comment $comment, EditComment $edit): RedirectResponse
    {
        $body = $request->input('body');
        $edit->handle($comment, is_string($body) ? $body : '');

        return back()->with('success', 'Saved.');
    }

    public function destroy(Comment $comment, TrashComment $trash): RedirectResponse
    {
        $trash->handle($comment);

        return back()->with('success', 'Moved to the trash.');
    }

    public function restore(Comment $comment, TrashComment $trash): RedirectResponse
    {
        $trash->restore($comment);

        return back()->with('success', 'Restored.');
    }

    public function forceDelete(Comment $comment, DeleteComment $delete): RedirectResponse
    {
        $delete->handle($comment);

        return back()->with('success', 'Deleted for good.');
    }

    /** Several at once: approve, unapprove, spam (moderate); trash, restore, delete (delete). */
    public function bulk(Request $request, SetCommentStatus $status, TrashComment $trash, DeleteComment $delete): RedirectResponse
    {
        $action = $request->input('action');
        $ids = array_values(array_filter((array) $request->input('ids', []), 'is_numeric'));
        $moderating = in_array($action, ['approve', 'unapprove', 'spam'], true);
        if (! $moderating && ! in_array($action, ['trash', 'restore', 'delete'], true)) {
            throw ValidationException::withMessages(['action' => 'Choose what to do.']);
        }
        abort_unless($request->user()?->can($moderating ? 'cms.comments.moderate' : 'cms.comments.delete') ?? false, 403);
        $done = 0;
        foreach (Comment::query()->withTrashed()->whereKey(array_slice($ids, 0, 200))->get() as $comment) {
            match ($action) {
                'approve' => $status->handle($comment, Comment::APPROVED),
                'unapprove' => $status->handle($comment, Comment::PENDING),
                'spam' => $status->handle($comment, Comment::SPAM),
                'trash' => $trash->handle($comment),
                'restore' => $trash->restore($comment),
                default => $comment->trashed() ? $delete->handle($comment) : null,
            };
            $done++;
        }

        return back()->with('success', $done === 1 ? '1 comment done.' : "{$done} comments done.");
    }

    /** @return array<string, mixed> */
    private static function row(Comment $comment): array
    {
        $entry = $comment->entry;
        $translation = $entry->translation($comment->locale) ?? $entry->mainTranslation();

        return [
            'id' => $comment->id,
            'body' => $comment->body,
            'status' => $comment->status,
            'trashed' => $comment->trashed(),
            'locale' => $comment->locale,
            'author' => $comment->authorName(),
            'email' => $comment->author_email,
            'member' => $comment->user_id !== null,
            'createdAt' => $comment->created_at?->toIso8601String(),
            'entry' => ['id' => $entry->id, 'title' => $translation->title ?? $translation->draft_title ?? '', 'url' => $translation?->url()],
            'parent' => $comment->parent === null ? null : ['id' => $comment->parent->id, 'author' => $comment->parent->authorName(), 'excerpt' => Str::limit($comment->parent->body, 80)],
        ];
    }
}
