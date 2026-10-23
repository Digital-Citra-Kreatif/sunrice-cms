{{--
    Any entry (starter template). For one collection only, copy it to cms/collections/{collection}/show.blade.php;
    for one entry, to cms/collections/{collection}/{slug}.blade.php (its slug in the main language).
    Gets $page (Cms::page()), $entry (EntryTranslation), $title, $values (its fields), $richText (the rich text fields'
    handles), $collection, $locale, $preview, $draft, $fallback (the main language's content in another language) and
    $contentLocale (the language the content is in: lang marks it on untranslated pages, for screen readers).
--}}
@extends('cms.layout')

@section('content')
    <article class="entry"{{ cms_page()?->langAttribute() }}>
        <header class="entry-header">
            @if ($fallback)
                <p class="notice" role="note" lang="{{ str_replace('_', '-', $locale) }}">{{ __('This page isn\'t translated yet: it\'s shown in its original language.') }}</p>
            @endif
            <h1>{{ $title }}</h1>
            @if ($collection->dated && $entry->published_at)
                <p class="muted"><time datetime="{{ $entry->published_at->toAtomString() }}">{{ $entry->published_at->translatedFormat('j F Y') }}</time></p>
            @endif
            @if ($entry->terms->isNotEmpty())
                {{-- Its terms, of every taxonomy (one only: $entry->termsOf('topics')), linking to their pages. --}}
                <p class="muted">
                    @foreach ($entry->terms as $term)
                        @if ($url = $term->url())
                            <a href="{{ $url }}">{{ $term->title() }}</a>
                        @else
                            {{ $term->title() }}
                        @endif
                    @endforeach
                </p>
            @endif
        </header>

        @include('cms.partials.fields', ['values' => $values, 'richText' => $richText])
    </article>

    @unless ($preview)
        <x-sunrice-cms::comments :entry="$entry" />
    @endunless
@endsection
