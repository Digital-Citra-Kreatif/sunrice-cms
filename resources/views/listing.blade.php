{{-- The CMS's plain listing page, until the app has its own: resources/views/cms/{collection}-listing.blade.php or cms/listing.blade.php. --}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }}</title>
    @if ($url)<link rel="canonical" href="{{ $url }}">@endif
    <style>body{font:16px/1.6 system-ui,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1rem;color:#1a1a1a}h1{line-height:1.2}nav a{margin-right:1rem}</style>
</head>
<body>
    <h1>{{ $title }}</h1>
    @foreach ($values as $handle => $value)
        @if (is_string($value) && $value !== '')
            @if (in_array($handle, $richText, true))
                <div>{!! $value !!}</div>
            @else
                <p>{{ $value }}</p>
            @endif
        @endif
    @endforeach
    <ul>
        @foreach ($entries as $entry)
            <li><a href="{{ $entry->url() }}">{{ $entry->title }}</a></li>
        @endforeach
    </ul>
    <nav>
        @if ($entries->previousPageUrl())<a href="{{ $entries->previousPageUrl() }}" rel="prev">Newer</a>@endif
        @if ($entries->nextPageUrl())<a href="{{ $entries->nextPageUrl() }}" rel="next">Older</a>@endif
    </nav>
</body>
</html>
