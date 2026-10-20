{{--
    The search page, /search?q=… (starter template). Gets $query, $results (a paginator of EntryTranslations),
    $title and $locale. Search pages are never indexed.
--}}
@extends('cms.layout', ['seoTitle' => $title])

@section('content')
    <header class="page-header">
        <h1>{{ __('Search') }}</h1>
        <x-sunrice-cms::search>
            <form class="search-form" method="get" action="{{ $component->action }}" role="search">
                <label for="search-query" class="visually-hidden">{{ __('Search the site') }}</label>
                <input id="search-query" type="search" name="{{ $component->name }}" value="{{ $component->query }}" required>
                <button type="submit">{{ __('Search') }}</button>
            </form>
        </x-sunrice-cms::search>
    </header>

    @if ($query !== '')
        <p role="status">{{ trans_choice(':count result for “:query”|:count results for “:query”', $results->total(), ['count' => $results->total(), 'query' => $query]) }}</p>
        @if ($results->isNotEmpty())
            <ul class="cards">
                @foreach ($results as $item)
                    @include('cms.partials.card', ['item' => $item])
                @endforeach
            </ul>
            @include('cms.partials.pagination', ['paginator' => $results])
        @endif
    @endif
@endsection
