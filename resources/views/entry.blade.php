{{-- The CMS's plain page, until the app has its own: resources/views/cms/collections/{collection}/show.blade.php or cms/collections/show.blade.php (see the docs' Templates). --}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo />
    <style>body{font:16px/1.6 system-ui,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1rem;color:#1a1a1a}h1{line-height:1.2}img{max-width:100%;height:auto}.sunrice-img{display:block;max-width:100%;height:auto}.sunrice-img-w-25{width:25%}.sunrice-img-w-50{width:50%}.sunrice-img-w-75{width:75%}.sunrice-img-w-100,.sunrice-img-full{width:100%}.sunrice-img-center{margin-inline:auto}.sunrice-img-left{float:left;margin:.3rem 1.5rem 1.5rem 0}.sunrice-img-right{float:right;margin:.3rem 0 1.5rem 1.5rem}.sunrice-img-left:not([class*=sunrice-img-w-]),.sunrice-img-right:not([class*=sunrice-img-w-]){max-width:50%}article::after,body>div::after{content:"";display:block;clear:both}:is(h2,h3,h4,hr,pre,blockquote,figure){clear:both}@media(max-width:40em){.sunrice-img-left,.sunrice-img-right,.sunrice-img-left:not([class*=sunrice-img-w-]),.sunrice-img-right:not([class*=sunrice-img-w-]){float:none;width:100%;max-width:100%;margin:1.5rem 0}}</style>
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
            @elseif (isset($code[$handle]))
                <x-sunrice-cms::code-block :value="$value" :language="$code[$handle] === 'plain' ? null : $code[$handle]" />
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
