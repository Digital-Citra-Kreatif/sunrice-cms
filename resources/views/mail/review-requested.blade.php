<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #111;">
    @if ($changes)
    <p><strong>{{ $requester }}</strong> asks you to review the unpublished changes to <strong>{{ $title }}</strong> ({{ $collection }}) and publish them when they're ready. Visitors see the live page until then.</p>
    @else
    <p><strong>{{ $requester }}</strong> asks you to review <strong>{{ $title }}</strong> ({{ $collection }}) and publish it when it's ready.</p>
    @endif
    <p><a href="{{ $url }}">Open it</a>@if ($liveUrl) · <a href="{{ $liveUrl }}">View the live page</a>@endif</p>
</body>
</html>
