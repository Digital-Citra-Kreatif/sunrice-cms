{{--
    Any entry (starter template). For one collection only, copy it to cms/collections/{collection}/show.blade.php;
    for one entry, to cms/collections/{collection}/{slug}.blade.php (its slug in the main language).
    Gets $page (Cms::page()), $entry (EntryTranslation), $title, $values (its fields), $richText (the rich text fields'
    handles), $collection, $locale, $preview, $draft, $fallback (the main language's content in another language) and
    $contentLocale (the language the content is in: lang marks it on untranslated pages, for screen readers, and dir
    when it is written in the other direction, English on an Arabic page).
--}}
@extends('cms.layout')

@section('content')
    <article class="entry"{{ cms_page()?->langAttribute() }}{{ cms_page()?->dirAttribute() }}>
        <header class="entry-header">
            <h1>{{ $title }}</h1>
            @if ($collection->dated && $entry->published_at)
                {{-- The date is in the page's language, also around the main language's content on an untranslated page. --}}
                <p class="muted"><time datetime="{{ $entry->published_at->toAtomString() }}"@if ($fallback) lang="{{ str_replace('_', '-', $locale) }}" dir="{{ cms_dir() }}"@endif>{{ $entry->published_at->translatedFormat('j F Y') }}</time></p>
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
