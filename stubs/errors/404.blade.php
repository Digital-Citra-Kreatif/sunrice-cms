{{-- Not found, in the site's layout (starter template, published to resources/views/errors/). --}}
@extends('cms.layout', ['seoTitle' => __('Page not found')])

@section('content')
    <header class="page-header">
        <h1>{{ __('Page not found') }}</h1>
        <p>{{ __('The page you asked for isn\'t here. It may have moved, or the address may be mistyped.') }}</p>
    </header>
    <x-sunrice-cms::search>
        <form class="search-form" method="get" action="{{ $component->action }}" role="search">
            <label for="search-404" class="visually-hidden">{{ __('Search the site') }}</label>
            <input id="search-404" type="search" name="{{ $component->name }}" required>
            <button type="submit">{{ __('Search') }}</button>
        </form>
    </x-sunrice-cms::search>
    <p><a href="{{ url(app()->getLocale() === \Sunrice\Cms\Support\Locales::default() ? '/' : '/'.app()->getLocale()) }}">{{ __('Go to the home page') }}</a></p>
@endsection
