{{--
    Default single-entry template for every collection
    (resolved as `sunrice.show`; add `sunrice/{collection}/show.blade.php`
    to override it for one collection, as articles/show.blade.php does).

    Available: $entry, $collection, $locale, $pageType.

    Reading entry data:
      $entry->title, $entry->slug, $entry->url   title/slug/URL in the active language
      $entry->published_at                       Carbon
      $entry->isFallback                         true when showing main-language content
                                                 because this language's translation isn't Ready
      $entry->get('handle')                      a custom field, hydrated:
          text/textarea/select → string, number → number, toggle → bool,
          rich text → sanitized HTML, date → Carbon, asset → Asset (or a collection),
          entries → collection of Entry, terms → collection of Term,
          link → ['url', 'label', 'new_tab'], group → array,
          repeater → collection of arrays, flexible → collection of Block

    Repeater rows and flexible blocks switched off ("Show") in the admin are
    already left out. Give one a key in the admin to fetch it directly:
      $entry->get('sections')->byKey('hero')        a Block, or null
      $entry->get('features')->byKey('pricing')     a row array, or null

    This template assumes these optional fields: `image` (asset),
    `body` (rich text) and `sections` (flexible content).
--}}
@extends('sunrice.layouts.app')

@section('content')
    <article>
        @if ($entry->isFallback)
            <p class="muted"><em>{{ __('sunrice::frontend.not_translated') }}</em></p>
        @endif

        <h1>{{ $entry->title }}</h1>

        @php($image = $entry->get('image'))
        @php($image = $image instanceof \Illuminate\Support\Collection ? $image->first() : $image)
        @if ($image)
            <img src="{{ $image->url('large') }}" alt="{{ $image->alt ?? $entry->title }}">
        @endif

        @if ($body = $entry->get('body'))
            <div class="prose">{!! $body !!}</div>
        @endif

        {{-- Flexible content: each block is a Sunrice\Fields\Block with ->type, ->id,
             ->key and field values as properties ($block->heading) or ->get('heading').
             A block of type "hero" renders sunrice/blocks/hero.blade.php. --}}
        @foreach ($entry->get('sections') ?? [] as $block)
            @includeFirst(['sunrice.blocks.'.$block->type, 'sunrice.blocks.default'], ['block' => $block])
        @endforeach
    </article>

    {{-- Comments and replies, when the collection has "Allow comments" on. --}}
    <x-sunrice::comments :entry="$entry" />
@endsection
