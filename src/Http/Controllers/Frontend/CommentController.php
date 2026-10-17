<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Frontend;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Sunrice\Actions\Comments\PostComment;
use Sunrice\Models\Comment;
use Sunrice\Models\Entry;
use Sunrice\Support\Captcha;
use Sunrice\Support\Locales;

/**
 * POST /sunrice/comments/{entry} — a visitor's comment or reply, from
 * <x-sunrice::comments>. Honeypot and rate limit are route middleware;
 * the captcha is checked when Settings → Comments asks for it.
 * The form posts the page's language (`_locale`) for the messages and
 * the comment. Both outcomes return to the thread (#comments, or the
 * new comment when it's already visible).
 *
 * AJAX posts (`Accept: application/json`) get `{errors}` with 422, or
 * `{success: true, status, message, id}`.
 */
class CommentController extends Controller
{
    public function store(Request $request, int $entry, PostComment $post): RedirectResponse|JsonResponse
    {
        $locale = (string) $request->input('_locale', '');
        $locale = Locales::isAvailable($locale) ? $locale : Locales::main();
        app()->setLocale($locale);

        $model = Entry::query()->published()->findOrFail($entry);
        $back = strtok(url()->previous(), '#');

        try {
            if (static::captchaRequired() && ! Captcha::verify((string) $request->input((string) Captcha::field()), $request->ip())) {
                throw ValidationException::withMessages(['_captcha' => __('sunrice::frontend.captcha_failed')]);
            }

            $comment = $post->handle($model, $request->only(['body', 'parent_id', 'author_name', 'author_email', 'notify_replies']), auth(config('sunrice.auth.guard', 'web'))->user(), [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'locale' => $locale,
            ]);
        } catch (ValidationException $e) {
            if ($request->expectsJson()) {
                return response()->json(['errors' => $e->errors()], 422);
            }

            return redirect($back.'#comment-form')
                ->withErrors($e->errors(), 'comments')
                ->withInput($request->except(array_filter(['_token', Captcha::field()])));
        }

        $message = $comment->isApproved() ? __('sunrice::frontend.comment_posted') : __('sunrice::frontend.comment_pending');

        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'status' => $comment->status, 'message' => $message, 'id' => $comment->id]);
        }

        return redirect($back.($comment->isApproved() ? '#comment-'.$comment->id : '#comments'))
            ->with('sunrice_comment_status', $message);
    }

    /** GET (signed) from a reply email: stop emails about replies to this comment. */
    public function unsubscribe(Comment $comment): Response
    {
        $comment->update(['notify_replies' => false]);
        app()->setLocale(Locales::isAvailable($comment->locale) ? $comment->locale : Locales::main());

        return response(view('sunrice::defaults.comment-unsubscribed', ['url' => $comment->entry?->url]));
    }

    public static function captchaRequired(): bool
    {
        return (bool) config('sunrice.comments.captcha') && Captcha::configured();
    }
}
