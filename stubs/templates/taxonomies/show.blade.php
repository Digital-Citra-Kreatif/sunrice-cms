{{--
    A term's page (starter template). For one taxonomy only, copy it to cms/taxonomies/{taxonomy}/show.blade.php; for one
    term, to cms/taxonomies/{taxonomy}/{slug}.blade.php; for its pages in one collection, to
    cms/collections/{collection}/{taxonomy}/show.blade.php.
    Gets $page (Cms::page()), $term (TermTranslation), $taxonomy, $collection (null on the shared term page), $title,
    $entries (a paginator of the live entries with the term), $values and $richText (the term's fields), $locale,
    $fallback and $contentLocale (the language of the term's own content: lang marks it on untranslated pages).
--}}
@extends('cms.layout')

@section('content')
    <header class="page-header">
        <p class="eyebrow">{{ $taxonomy->title }}</p>
        <div{{ cms_page()?->langAttribute() }}>
            <h1>{{ $title }}</h1>
            @include('cms.partials.fields', ['values' => $values, 'richText' => $richText])
        </div>
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
