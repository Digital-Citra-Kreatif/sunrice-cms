{{--
    The site's layout (starter template: edit freely). Pages @extends('cms.layout') and fill @section('content');
    @push('head') adds to the <head>. On the app's own pages pass a title: @extends('cms.layout', ['seoTitle' => 'Contact']).

    It reads the page shown from cms_page() (Sunrice\Cms\Site\Page: ->entry, ->term, ->collection, ->locale), never
    from $entry or $term: a page's own @foreach ($entries as $entry) would leave those set to its last card.

    Expects (all optional; missing ones render nothing): the menus "main" and "footer", and a global set "footer"
    with a text field "text".
--}}
@php($page = cms_page())
@php($home = url(app()->getLocale() === \Sunrice\Cms\Support\Locales::default() ? '/' : '/'.app()->getLocale()))
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo :title="$seoTitle ?? null" />
    {{-- public/cms/site.css, published with these templates: replace it with your own build (Vite, Tailwind…). --}}
    <link rel="stylesheet" href="{{ asset('cms/site.css') }}">
    @stack('head')
    <x-sunrice-cms::code place="head" />
</head>
<body @bodyClass>
    <x-sunrice-cms::code place="body-start" />
    <a class="skip-link" href="#main">{{ __('Skip to content') }}</a>

    <header class="site-header">
        <div class="container site-header-inner">
            <a class="site-name" href="{{ $home }}" @if ($page?->home) aria-current="page" @endif>{{ \Sunrice\Cms\Content::site()->name() }}</a>
            @if (($menu = cms_menu('main')) !== [])
                <nav class="site-menu" aria-label="{{ __('Main') }}">
                    @include('cms.partials.menu', ['items' => $menu])
                </nav>
            @endif
            @include('cms.partials.language-switcher')
        </div>
    </header>

    <main id="main" class="container" tabindex="-1">
        @yield('content')
    </main>

    <footer class="site-footer">
        <div class="container">
            @if (($menu = cms_menu('footer')) !== [])
                <nav aria-label="{{ __('Footer') }}">
                    @include('cms.partials.menu', ['items' => $menu])
                </nav>
            @endif
            @if (is_string($text = cms_global('footer')['text'] ?? null) && $text !== '')
                <p>{{ $text }}</p>
            @endif
            <p class="muted">&copy; {{ now()->year }} {{ \Sunrice\Cms\Content::site()->name() }}</p>
        </div>
    </footer>
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
