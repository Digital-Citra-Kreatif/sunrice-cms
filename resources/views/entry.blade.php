{{-- The CMS's plain page, until the app has its own: resources/views/cms/{collection}.blade.php or cms/entry.blade.php. --}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo />
    <style>body{font:16px/1.6 system-ui,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1rem;color:#1a1a1a}h1{line-height:1.2}img{max-width:100%;height:auto}</style>
    <x-sunrice-cms::code place="head" />
</head>
<body class="{{ \Sunrice\Cms\Content::bodyClass() }}">
    <x-sunrice-cms::code place="body-start" />
    {{-- On an untranslated page ($fallback) the content is the main language's: lang says so. --}}
    <article{{ \Sunrice\Cms\Content::page()?->langAttribute() }}><h1>{{ $title }}</h1>
    @foreach ($values as $handle => $value)
        @if ($handle !== 'seo' && is_string($value) && $value !== '')
            {{-- Only rich text is HTML (cleaned when saved); every other string is escaped. --}}
            @if (in_array($handle, $richText, true))
                <div>{!! $value !!}</div>
            @else
                <p>{{ $value }}</p>
            @endif
        @endif
    @endforeach
    </article>
    @unless ($preview)
        <x-sunrice-cms::comments :entry="$entry" />
    @endunless
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
