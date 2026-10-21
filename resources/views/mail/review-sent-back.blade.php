<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #111;">
    <p><strong>{{ $reviewer }}</strong> sent <strong>{{ $title }}</strong> ({{ $collection }}) back to you without publishing it.</p>
    @if ($note)
    <blockquote style="margin: 0 0 1em; padding: .5em 1em; border-left: 3px solid #ddd; white-space: pre-line;">{{ $note }}</blockquote>
    @endif
    <p>Make the changes, then submit it for review again.</p>
    <p><a href="{{ $url }}">Open it</a></p>
</body>
</html>
