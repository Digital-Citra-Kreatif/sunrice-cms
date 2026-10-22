{{-- The CMS's plain taxonomy index page, until the app has its own: resources/views/cms/taxonomy-{handle}-index.blade.php or cms/taxonomy-index.blade.php. --}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo />
    <style>body{font:16px/1.6 system-ui,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1rem;color:#1a1a1a}h1{line-height:1.2}</style>
    <x-sunrice-cms::code place="head" />
</head>
<body class="{{ \Sunrice\Cms\Content::bodyClass() }}">
    <x-sunrice-cms::code place="body-start" />
    @if ($collection !== null)
        <p>{{ $collection->titleIn($locale) }}</p>
    @endif
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
        @foreach ($terms as $term)
            @php($termUrl = $term->url($locale))
            <li>
                @if ($termUrl !== null)
                    <a href="{{ $termUrl }}">{{ $term->title($locale) }}</a>
                @else
                    {{ $term->title($locale) }}
                @endif
                <span>({{ $term->entries_count }})</span>
            </li>
        @endforeach
    </ul>
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
