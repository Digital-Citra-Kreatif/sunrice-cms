{{--
    A collection's listing page (starter template). For one collection only, copy it to cms/{collection}-listing.blade.php.
    Gets $collection, $title, $entries (a paginator of EntryTranslations), $values and $richText (the listing page's
    own fields), $locale and $url.
--}}
@extends('cms.layout')

@section('content')
    <header class="page-header">
        <h1>{{ $title }}</h1>
        @include('cms.partials.fields', ['values' => $values, 'richText' => $richText])
    </header>

    @if ($entries->isEmpty())
        <p class="muted">{{ __('Nothing here yet.') }}</p>
    @else
        <ul class="cards">
            @foreach ($entries as $item)
                @include('cms.partials.card', ['item' => $item])
            @endforeach
        </ul>
        @include('cms.partials.pagination', ['paginator' => $entries])
    @endif
@endsection
