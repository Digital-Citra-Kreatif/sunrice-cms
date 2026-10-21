<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\View;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Security\Captcha;
use Sunrice\Cms\Actions\Comments\PostComment;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Settings\CommentSettings;
use Sunrice\Cms\Support\SafeUrl;

/**
 * POST /comments/{entry}: a visitor comments. Behind the honeypot, a
 * per-address limit and, when Settings → Comments asks, the captcha.
 * GET /comments/{comment}/unsubscribe (signed) asks, and a POST to the
 * same signed link stops reply emails.
 *
 * @internal
 */
final class CommentController
{
    /** The session key the "posted" message is flashed under. */
    public const FLASH = 'sunrice-cms.comment';

    /** The error bag comment errors are in. */
    public const BAG = 'comments';

    public function store(Request $request, Entry $entry, PostComment $post, Captcha $captcha, CommentSettings $settings): RedirectResponse|JsonResponse
    {
        $locale = $request->input('locale');
        $locale = is_string($locale) ? $locale : app()->getLocale();
        $user = $request->user(app(Panel::class)->getGuard()) ?? $request->user();
        $limit = new SendLimit('sunrice-comments|'.$request->ip(), max(1, $settings->perMinute));
        // Back to the page the comment was posted from when it's on this site (the Referer could name another), else the entry.
        $back = SafeUrl::previous($entry->shownIn($locale)?->url() ?? '/');
        try {
            $limit->check($locale, self::BAG);
            if ($settings->captcha && ! $captcha->passes($request)) {
                throw ValidationException::withMessages(['_captcha' => Lang::get('sunrice-cms::site.captcha', [], $locale)]);
            }
            $comment = $post->handle($entry, $request->only(['body', 'parent_id', 'author_name', 'author_email', 'notify_replies']),
                $user instanceof Model ? $user : null, $locale, $request->ip());
        } catch (ValidationException $e) {
            throw $e->errorBag(self::BAG)->redirectTo($back.'#comment-form');
        }
        $limit->sent();
        $message = Lang::get($comment->isApproved() ? 'sunrice-cms::site.comments.posted' : 'sunrice-cms::site.comments.held', [], $locale);

        if ($request->expectsJson()) {
            return response()->json(['message' => $message, 'status' => $comment->status, 'id' => $comment->id], 201);
        }

        return redirect()->to($back.($comment->isApproved() ? '#comment-'.$comment->id : '#comments'))->with(self::FLASH, $message);
    }

    /** The signed link from a reply email: asks first, so a mail scanner opening links unsubscribes nobody. */
    public function unsubscribe(Request $request, Comment $comment): Response
    {
        return $this->unsubscribePage($comment, done: ! $comment->notify_replies, action: $request->fullUrl());
    }

    /** The confirm page's button (the same signed link, POSTed): no more reply emails. */
    public function confirmUnsubscribe(Comment $comment): Response
    {
        $comment->forceFill(['notify_replies' => false])->saveQuietly();

        return $this->unsubscribePage($comment, done: true, action: null);
    }

    /** The site's own `cms.comment-unsubscribe` view when it has one, else the CMS's. */
    private function unsubscribePage(Comment $comment, bool $done, ?string $action): Response
    {
        app()->setLocale($comment->locale);
        $translation = $comment->entry->translation($comment->locale) ?? $comment->entry->mainTranslation();
        $url = $translation !== null && $translation->isLive() && ! $comment->entry->trashed() ? $translation->url() : null;
        $view = View::exists('cms.comment-unsubscribe') ? 'cms.comment-unsubscribe' : 'sunrice-cms::comment-unsubscribe';

        return response()->view($view, [
            'locale' => $comment->locale,
            'url' => $url,
            'title' => $translation->title ?? '',
            'done' => $done,
            'action' => $done ? null : $action,
        ])->header('X-Robots-Tag', 'noindex');
    }
}
