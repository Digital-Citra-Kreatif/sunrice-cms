<?php

declare(strict_types=1);

namespace Sunrice\View\Components;

use Illuminate\Contracts\Support\MessageBag as MessageBagContract;
use Illuminate\Contracts\View\View;
use Illuminate\Support\HtmlString;
use Illuminate\Support\MessageBag;
use Illuminate\Support\ViewErrorBag;
use Illuminate\View\Component;
use Sunrice\Http\Controllers\Frontend\CommentController;
use Sunrice\Models\Comment;
use Sunrice\Models\Entry;
use Sunrice\Support\Captcha;
use Sunrice\Support\Locales;

/**
 * <x-sunrice::comments :entry="$entry" /> — the entry's approved
 * comments as a thread, with a form for comments and replies. Works
 * without JavaScript: "Reply" opens the form under that comment
 * (?reply_to=id). Replies deeper than sunrice.comments.max_depth (or
 * the `depth` attribute) line up at the last level. Renders nothing
 * when the collection doesn't allow comments.
 *
 * Override the markup by publishing the views (sunrice::components.comments
 * and its comments/ partials).
 */
class Comments extends Component
{
    /** @var array<int, array{comment: Comment, replies: array<int, mixed>}> */
    public array $thread = [];

    public int $count = 0;

    public bool $open;

    public bool $loginRequired;

    public ?int $replyTo = null;

    public ?string $status;

    public string $locale;

    public string $action;

    public bool $offerReplyEmails;

    public function __construct(public Entry $entry, ?int $depth = null)
    {
        $this->locale = Locales::current();
        $this->open = $entry->acceptsComments();
        $guest = auth(config('sunrice.auth.guard', 'web'))->guest();
        $this->loginRequired = $guest && (bool) config('sunrice.comments.require_login');
        $this->offerReplyEmails = (bool) config('sunrice.comments.reply_notifications');
        $this->action = route('sunrice.frontend.comments.store', $entry->id);
        $this->status = session('sunrice_comment_status');

        if (! $entry->collection?->allowsComments()) {
            return;
        }

        $comments = $entry->comments()->approved()->orderBy('created_at')->orderBy('id')->get();
        $this->count = $comments->count();
        $this->thread = static::tree($comments->all(), max(1, $depth ?? (int) config('sunrice.comments.max_depth', 3)));

        $replyTo = request()->integer('reply_to') ?: (int) session()->getOldInput('parent_id', 0);
        $this->replyTo = $replyTo > 0 && $comments->contains('id', $replyTo) ? $replyTo : null;
    }

    /**
     * Nested comments: [{comment, replies: [...]}]. Below $maxDepth,
     * replies (and their replies) are listed under the last level in
     * time order.
     *
     * @param  array<int, Comment>  $comments  oldest first
     * @return array<int, array{comment: Comment, replies: array<int, mixed>}>
     */
    public static function tree(array $comments, int $maxDepth): array
    {
        $byParent = [];
        $ids = [];
        foreach ($comments as $comment) {
            $ids[$comment->id] = true;
        }
        foreach ($comments as $comment) {
            // A reply whose parent isn't shown (pending, spam, deleted) starts its own thread.
            $parent = $comment->parent_id !== null && isset($ids[$comment->parent_id]) ? $comment->parent_id : 0;
            $byParent[$parent][] = $comment;
        }

        $build = function (int $parent, int $depth) use (&$build, $byParent, $maxDepth): array {
            $nodes = [];
            foreach ($byParent[$parent] ?? [] as $comment) {
                $replies = $depth < $maxDepth ? $build($comment->id, $depth + 1) : [];
                $nodes[] = ['comment' => $comment, 'replies' => $replies];
                if ($depth >= $maxDepth) {
                    // The deepest level: this comment's own replies follow it.
                    array_push($nodes, ...$build($comment->id, $depth));
                }
            }

            return $nodes;
        };

        return $build(0, 1);
    }

    /** A comment's text: escaped, links clickable (nofollow), line breaks kept. */
    public function body(Comment $comment): HtmlString
    {
        $html = e($comment->body);
        $html = (string) preg_replace_callback(
            '~\bhttps?://[^\s<>"\']+[^\s<>"\'.,;:!?)\]]~i',
            fn (array $m) => '<a href="'.$m[0].'" rel="nofollow ugc noopener" target="_blank">'.$m[0].'</a>',
            $html,
        );

        return new HtmlString(nl2br($html, false));
    }

    /** The current page with ?reply_to= for a comment, to open the form under it. */
    public function replyUrl(Comment $comment): string
    {
        return request()->fullUrlWithQuery(['reply_to' => $comment->id]).'#comment-form';
    }

    public function cancelReplyUrl(): string
    {
        return request()->fullUrlWithoutQuery(['reply_to']).'#comment-form';
    }

    public function commentErrors(): MessageBagContract
    {
        /** @var ViewErrorBag|null $errors */
        $errors = session('errors');

        return $errors?->getBag('comments') ?? new MessageBag;
    }

    public function old(string $field, mixed $default = null): mixed
    {
        return session()->getOldInput($field, $default);
    }

    /**
     * @return array{provider: string, class: string, site_key: string, script: string, field: string}|null
     */
    public function captcha(): ?array
    {
        return CommentController::captchaRequired() ? Captcha::widget($this->locale) : null;
    }

    public function user(): mixed
    {
        return auth(config('sunrice.auth.guard', 'web'))->user();
    }

    public function shouldRender(): bool
    {
        return (bool) $this->entry->collection?->allowsComments();
    }

    public function render(): View
    {
        return view('sunrice::components.comments');
    }
}
