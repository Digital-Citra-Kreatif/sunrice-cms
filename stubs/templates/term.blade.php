{{--
    A term's page (starter template). For one taxonomy only, copy it to cms/taxonomy-{taxonomy}.blade.php.
    Gets $term (TermTranslation), $taxonomy, $title, $entries (a paginator of the live entries with the term),
    $values and $richText (the term's fields), $locale and $fallback.
--}}
@extends('cms.layout')

@section('content')
    <header class="page-header">
        <p class="eyebrow">{{ $taxonomy->title }}</p>
        <h1>{{ $title }}</h1>
        @if ($fallback)
            <p class="notice" role="note">{{ __('This page isn\'t translated yet: it\'s shown in its original language.') }}</p>
        @endif
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
