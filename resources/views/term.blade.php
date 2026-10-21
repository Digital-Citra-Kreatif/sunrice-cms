{{-- The CMS's plain term page, until the app has its own: resources/views/cms/taxonomy-{handle}.blade.php or cms/term.blade.php. --}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo />
    <style>body{font:16px/1.6 system-ui,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1rem;color:#1a1a1a}h1{line-height:1.2}nav a{margin-right:1rem}</style>
    <x-sunrice-cms::code place="head" />
</head>
<body class="{{ \Sunrice\Cms\Content::bodyClass() }}">
    <x-sunrice-cms::code place="body-start" />
    <p>{{ $taxonomy->titleIn($locale) }}</p>
    <article{{ \Sunrice\Cms\Content::page()?->langAttribute() }}><h1>{{ $title }}</h1>
    @foreach ($values as $handle => $value)
        @if ($handle !== 'seo' && is_string($value) && $value !== '')
            @if (in_array($handle, $richText, true))
                <div>{!! $value !!}</div>
            @else
                <p>{{ $value }}</p>
            @endif
        @endif
    @endforeach
    </article>
    <ul>
        @foreach ($entries as $entry)
            <li><a href="{{ $entry->url() }}">{{ $entry->title }}</a></li>
        @endforeach
    </ul>
    <nav>
        @if ($entries->previousPageUrl())<a href="{{ $entries->previousPageUrl() }}" rel="prev">{{ __('sunrice-cms::site.newer') }}</a>@endif
        @if ($entries->nextPageUrl())<a href="{{ $entries->nextPageUrl() }}" rel="next">{{ __('sunrice-cms::site.older') }}</a>@endif
    </nav>
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
