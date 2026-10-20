<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #111;">
    <p>{{ __('sunrice-cms::site.comments.replied', ['name' => $reply->authorName(), 'title' => $title]) }}</p>
    <blockquote style="margin: 0 0 1em; padding: .5em 1em; border-left: 3px solid #ddd;">{{ $reply->html() }}</blockquote>
    @if ($url)<p><a href="{{ $url }}">{{ __('sunrice-cms::site.comments.read') }}</a></p>@endif
    <p style="color: #666; font-size: 12px;"><a href="{{ $unsubscribe }}" style="color: #666;">{{ __('sunrice-cms::site.comments.stop') }}</a></p>
</body>
</html>
