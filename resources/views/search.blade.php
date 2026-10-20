{{-- The CMS's plain search page, until the app has its own: resources/views/cms/search.blade.php. --}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo :title="$title" />
    <style>body{font:16px/1.6 system-ui,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1rem;color:#1a1a1a}h1{line-height:1.2}nav a{margin-right:1rem}input{font:inherit;padding:.25rem .5rem}</style>
    <x-sunrice-cms::code place="head" />
</head>
<body class="{{ \Sunrice\Cms\Content::bodyClass() }}">
    <x-sunrice-cms::code place="body-start" />
    <h1>{{ __('sunrice-cms::site.search.title') }}</h1>
    <x-sunrice-cms::search>
        <form method="get" action="{{ $component->action }}" role="search">
            <input type="search" name="{{ $component->name }}" value="{{ $component->query }}" aria-label="{{ __('sunrice-cms::site.search.label') }}" required>
            <button>{{ __('sunrice-cms::site.search.button') }}</button>
        </form>
    </x-sunrice-cms::search>
    @if ($query !== '')
        <p>{{ trans_choice('sunrice-cms::site.search.results', $results->total(), ['query' => $query]) }}</p>
        <ul>
            @foreach ($results as $result)
                <li><a href="{{ $result->url() }}">{{ $result->title }}</a></li>
            @endforeach
        </ul>
        <nav>
            @if ($results->previousPageUrl())<a href="{{ $results->previousPageUrl() }}" rel="prev">{{ __('sunrice-cms::site.previous') }}</a>@endif
            @if ($results->nextPageUrl())<a href="{{ $results->nextPageUrl() }}" rel="next">{{ __('sunrice-cms::site.next') }}</a>@endif
        </nav>
    @endif
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
