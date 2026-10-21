@php
    $bag = ($errors ?? new \Illuminate\Support\ViewErrorBag)->getBag(\Sunrice\Cms\Site\CommentController::BAG);
@endphp
@if ($settings->signedInOnly && ! $signedIn)
    <p class="sunrice-comments-status" id="comment-form">{{ __('sunrice-cms::site.comments.sign_in') }}</p>
@else
<form class="sunrice-comment-form" id="comment-form" method="POST" action="{{ route('sunrice.cms.comments.store', $model->id) }}">
    @csrf
    <x-honeypot />
    <input type="hidden" name="locale" value="{{ app()->getLocale() }}">
    @isset($parent)
        <input type="hidden" name="parent_id" value="{{ $parent->id }}">
        <p>{{ __('sunrice-cms::site.comments.replying_to', ['name' => $parent->authorName()]) }} · <a href="?#comment-form">{{ __('sunrice-cms::site.comments.cancel') }}</a></p>
    @endisset
    @if ($message = $bag->first(\Sunrice\Cms\Site\SendLimit::ERROR))<p role="alert">{{ $message }}</p>@endif
    @if ($message = $bag->first('parent_id'))<p role="alert">{{ $message }}</p>@endif
    <p>
        <label for="comment-body">{{ __('sunrice-cms::site.comments.comment') }}</label>
        <textarea id="comment-body" name="body" rows="5" maxlength="{{ \Sunrice\Cms\Actions\Comments\PostComment::MAX_LENGTH }}" required @if ($bag->has('body')) aria-invalid="true" aria-describedby="comment-body-error" @endif>{{ old('body') }}</textarea>
        @if ($message = $bag->first('body'))<span id="comment-body-error" role="alert">{{ $message }}</span>@endif
    </p>
    @unless ($signedIn)
        <p>
            <label for="comment-name">{{ __('sunrice-cms::site.comments.name') }}</label>
            <input id="comment-name" name="author_name" value="{{ old('author_name') }}" maxlength="100" autocomplete="name" required @if ($bag->has('author_name')) aria-invalid="true" @endif>
            @if ($message = $bag->first('author_name'))<span role="alert">{{ $message }}</span>@endif
        </p>
        <p>
            <label for="comment-email">{{ __('sunrice-cms::site.comments.email') }}</label>
            <input id="comment-email" type="email" name="author_email" value="{{ old('author_email') }}" maxlength="255" autocomplete="email" required @if ($bag->has('author_email')) aria-invalid="true" @endif>
            @if ($message = $bag->first('author_email'))<span role="alert">{{ $message }}</span>@endif
        </p>
    @endunless
    @if ($settings->replyNotifications && ($signedIn || $settings->moderation !== \Sunrice\Cms\Settings\CommentSettings::HOLD_NONE))
        <p><label><input type="checkbox" name="notify_replies" value="1" @checked(old('notify_replies'))> {{ __('sunrice-cms::site.comments.notify') }}</label></p>
    @endif
    @if ($captcha)
        {{ app(\Sunrice\Admin\Security\Captcha::class)->widget() }}
        @if ($message = $bag->first('_captcha'))<p role="alert">{{ $message }}</p>@endif
    @endif
    <button type="submit">{{ isset($parent) ? __('sunrice-cms::site.comments.post_reply') : __('sunrice-cms::site.comments.post') }}</button>
</form>
@endif
