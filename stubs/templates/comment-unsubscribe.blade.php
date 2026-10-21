{{--
    A reply email's "stop these emails" link, in the site's layout (starter template: edit freely). It asks first
    ($action: the signed link to POST to), then says it's done ($done). Gets $locale, $title, $url, $done and $action.
--}}
@extends('cms.layout', ['seoTitle' => $done ? __('sunrice-cms::site.comments.unsubscribed_title') : __('sunrice-cms::site.comments.unsubscribe_title')])

@push('head')
    <meta name="robots" content="noindex">
@endpush

@section('content')
    <header class="page-header">
        @if ($done)
            <h1>{{ __('sunrice-cms::site.comments.unsubscribed_title') }}</h1>
            <p>{{ __('sunrice-cms::site.comments.unsubscribed') }}</p>
        @else
            <h1>{{ __('sunrice-cms::site.comments.unsubscribe_title') }}</h1>
            <p>{{ __('sunrice-cms::site.comments.unsubscribe_text', ['title' => $title]) }}</p>
        @endif
    </header>
    @unless ($done)
        <form method="POST" action="{{ $action }}">
            @csrf
            <button type="submit">{{ __('sunrice-cms::site.comments.unsubscribe_button') }}</button>
        </form>
    @endunless
    <p><a href="{{ $url ?? url('/') }}">{{ $url !== null ? __('sunrice-cms::site.comments.back') : __('sunrice-cms::site.comments.home') }}</a></p>
@endsection
