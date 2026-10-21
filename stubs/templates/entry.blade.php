{{--
    Any entry (starter template). For one collection only, copy it to cms/{collection}.blade.php.
    Gets $entry (EntryTranslation), $title, $values (its fields), $richText (the rich text fields' handles),
    $collection, $locale, $preview, $draft, $fallback (the main language's content in another language) and
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
        </header>

        @include('cms.partials.fields', ['values' => $values, 'richText' => $richText])
    </article>

    @unless ($preview)
        <x-sunrice-cms::comments :entry="$entry" />
    @endunless
@endsection
