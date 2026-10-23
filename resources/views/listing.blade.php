{{-- The CMS's plain listing page, until the app has its own: resources/views/cms/collections/{collection}/index.blade.php or cms/collections/index.blade.php. --}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo />
    <style>body{font:16px/1.6 system-ui,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1rem;color:#1a1a1a}h1{line-height:1.2}nav a{margin-right:1rem}.sunrice-img{display:block;max-width:100%;height:auto}.sunrice-img-w-25{width:25%}.sunrice-img-w-50{width:50%}.sunrice-img-w-75{width:75%}.sunrice-img-w-100,.sunrice-img-full{width:100%}.sunrice-img-center{margin-inline:auto}.sunrice-img-left{float:left;margin:.3rem 1.5rem 1rem 0}.sunrice-img-right{float:right;margin:.3rem 0 1rem 1.5rem}.sunrice-img-left:not([class*=sunrice-img-w-]),.sunrice-img-right:not([class*=sunrice-img-w-]){max-width:50%}article::after,body>div::after{content:"";display:block;clear:both}@media(max-width:40em){.sunrice-img-left,.sunrice-img-right{float:none;width:100%;max-width:100%;margin:1.5rem 0}}</style>
    <x-sunrice-cms::code place="head" />
</head>
<body class="{{ \Sunrice\Cms\Content::bodyClass() }}">
    <x-sunrice-cms::code place="body-start" />
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
        @if ($entries->previousPageUrl())<a href="{{ $entries->previousPageUrl() }}" rel="prev">{{ __('sunrice-cms::site.newer') }}</a>@endif
        @if ($entries->nextPageUrl())<a href="{{ $entries->nextPageUrl() }}" rel="next">{{ __('sunrice-cms::site.older') }}</a>@endif
    </nav>
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
