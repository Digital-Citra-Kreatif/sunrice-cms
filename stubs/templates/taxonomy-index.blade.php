{{--
    A taxonomy's index page (starter template): its terms, each linking to its page. For one taxonomy only, copy it to
    cms/taxonomy-{taxonomy}-index.blade.php; for its index page in one collection, to cms/{collection}/{taxonomy}-index.blade.php.
    Gets $taxonomy, $collection (null on the shared index page), $title, $terms (Terms, with entries_count: their live
    entries, in $collection when there is one), $values and $richText (the index page's own fields), $locale and $url.
--}}
@extends('cms.layout')

@section('content')
    <header class="page-header">
        @if ($collection !== null)
            <p class="eyebrow">{{ $collection->titleIn($locale) }}</p>
        @endif
        <h1>{{ $title }}</h1>
        @include('cms.partials.fields', ['values' => $values, 'richText' => $richText])
    </header>

    @if ($terms->isEmpty())
        <p class="muted">{{ __('Nothing here yet.') }}</p>
    @else
        <ul class="terms">
            @foreach ($terms as $term)
                @php($termUrl = $term->url($locale))
                <li>
                    @if ($termUrl !== null)
                        <a href="{{ $termUrl }}">{{ $term->title($locale) }}</a>
                    @else
                        {{ $term->title($locale) }}
                    @endif
                    <span class="muted">({{ $term->entries_count }})</span>
                </li>
            @endforeach
        </ul>
    @endif
@endsection
