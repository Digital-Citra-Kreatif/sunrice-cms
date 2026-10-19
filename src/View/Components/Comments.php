<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Security\Captcha;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Settings\CommentSettings;

/**
 * An entry's comments, for its template: the approved ones, oldest first,
 * with their replies nested (up to Settings → Comments' levels), and a
 * form for a new one (each comment's Reply link opens it under that
 * comment: ?reply_to=id, no JavaScript needed).
 *
 *     <x-sunrice-cms::comments :entry="$entry" />
 *
 * Publish the views to change the markup: comments/thread, item and form.
 *
 * @api
 */
final class Comments extends Component
{
    public Entry $model;

    /** @var list<array{comment: Comment, replies: list<mixed>}> */
    public array $thread = [];

    public int $count = 0;

    public bool $open;

    public bool $signedIn;

    public ?Comment $replyTo = null;

    public CommentSettings $settings;

    public bool $captcha;

    public function __construct(Entry|EntryTranslation $entry)
    {
        $this->model = $entry instanceof EntryTranslation ? $entry->entry : $entry;
        $this->settings = app(CommentSettings::class);
        $this->open = $this->model->acceptsComments();
        $this->signedIn = auth(app(Panel::class)->getGuard())->check() || auth()->check();
        $this->captcha = $this->settings->captcha && app(Captcha::class)->enabled();
        if (! $this->model->collection->comments) {
            return;
        }
        $comments = $this->model->comments()->approved()->orderBy('created_at')->orderBy('id')->get();
        Comment::withAuthors($comments);
        $this->count = $comments->count();
        $byParent = $comments->groupBy(fn (Comment $c): int => $c->parent_id !== null && $comments->contains('id', $c->parent_id) ? $c->parent_id : 0);
        $this->thread = $this->branch($byParent, 0, 1);
        $replyTo = request()->query('reply_to');
        $this->replyTo = is_numeric($replyTo) ? $comments->firstWhere('id', (int) $replyTo) : null;
    }

    public function render(): View
    {
        return view('sunrice-cms::comments.thread');
    }

    /**
     * @param  Collection<int, \Illuminate\Database\Eloquent\Collection<int, Comment>>  $byParent
     * @return list<array{comment: Comment, replies: list<mixed>}>
     */
    private function branch($byParent, int $parent, int $depth): array
    {
        $branch = [];
        foreach ($byParent->get($parent) ?? [] as $comment) {
            $replies = $this->branch($byParent, $comment->id, $depth + 1);
            if ($depth >= max(1, $this->settings->depth)) {
                // Deeper replies line up at the last level.
                $branch[] = ['comment' => $comment, 'replies' => []];
                array_push($branch, ...$replies);

                continue;
            }
            $branch[] = ['comment' => $comment, 'replies' => $replies];
        }

        return $branch;
    }
}
