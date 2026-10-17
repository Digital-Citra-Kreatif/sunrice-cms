@php($errorBag = $commentErrors())
<form method="POST" action="{{ $action }}" class="sunrice-comment-form" id="comment-form">
    @csrf
    <x-honeypot />
    <input type="hidden" name="_locale" value="{{ $locale }}">

    @if ($parent)
        <input type="hidden" name="parent_id" value="{{ $parent->id }}">
        <p class="sunrice-comment-replying">
            {{ __('sunrice::frontend.comment_replying_to', ['name' => $parent->author_name]) }}
            <a href="{{ $cancelReplyUrl() }}">{{ __('sunrice::frontend.comment_cancel_reply') }}</a>
        </p>
    @endif
    @if ($errorBag->has('parent_id'))
        <p class="error">{{ $errorBag->first('parent_id') }}</p>
    @endif

    @if ($signedIn = $user())
        <p class="sunrice-comment-as">{{ __('sunrice::frontend.comment_as', ['name' => $signedIn->name ?? $signedIn->email]) }}</p>
    @else
        <p>
            <label for="comment-name">{{ __('sunrice::frontend.comment_name') }}</label>
            <input type="text" id="comment-name" name="author_name" value="{{ $old('author_name') }}" maxlength="100" required autocomplete="name">
            @if ($errorBag->has('author_name')) <span class="error">{{ $errorBag->first('author_name') }}</span> @endif
        </p>
        <p>
            <label for="comment-email">{{ __('sunrice::frontend.comment_email') }}</label>
            <input type="email" id="comment-email" name="author_email" value="{{ $old('author_email') }}" maxlength="255" required autocomplete="email" aria-describedby="comment-email-hint">
            <small id="comment-email-hint">{{ __('sunrice::frontend.comment_email_hint') }}</small>
            @if ($errorBag->has('author_email')) <span class="error">{{ $errorBag->first('author_email') }}</span> @endif
        </p>
    @endif

    <p>
        <label for="comment-body">{{ __('sunrice::frontend.comment') }}</label>
        <textarea id="comment-body" name="body" rows="5" maxlength="5000" required>{{ $old('body') }}</textarea>
        @if ($errorBag->has('body')) <span class="error">{{ $errorBag->first('body') }}</span> @endif
    </p>

    @if ($offerReplyEmails)
        <p>
            <label><input type="checkbox" name="notify_replies" value="1" @checked($old('notify_replies'))> {{ __('sunrice::frontend.comment_notify') }}</label>
        </p>
    @endif

    @if ($widget = $captcha())
        <div class="sunrice-form-captcha {{ $widget['class'] }}" data-sitekey="{{ $widget['site_key'] }}" @if ($widget['provider'] === 'turnstile') data-language="{{ $locale }}" @endif></div>
        @if ($errorBag->has('_captcha'))
            <p class="error">{{ $errorBag->first('_captcha') }}</p>
        @endif
        @once
            <script src="{{ $widget['script'] }}" async defer></script>
        @endonce
    @endif

    <button type="submit">{{ __('sunrice::frontend.comment_submit') }}</button>
</form>
