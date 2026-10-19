<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #111;">
    <p><strong>{{ $comment->authorName() }}</strong> commented on <strong>{{ $title }}</strong>{{ $comment->isApproved() ? '' : ', waiting for approval' }}:</p>
    <blockquote style="margin: 0 0 1em; padding: .5em 1em; border-left: 3px solid #ddd;">{{ $comment->html() }}</blockquote>
    <p>
        <a href="{{ $moderate }}">Moderate it</a>
        @if ($url) · <a href="{{ $url }}#comments">See the page</a>@endif
    </p>
</body>
</html>
