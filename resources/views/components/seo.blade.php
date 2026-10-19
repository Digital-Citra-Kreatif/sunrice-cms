{{-- The page head's SEO tags for an entry: <x-sunrice-cms::seo :entry="$entry" :preview="$preview" /> --}}
@props(['entry', 'preview' => false])
@php($seo = \Sunrice\Cms\Support\Seo::for($entry, $preview))
<title>{{ $seo['title'] }}</title>
@if ($seo['description'])
<meta name="description" content="{{ $seo['description'] }}">
@endif
@if ($seo['noindex'])
<meta name="robots" content="noindex, nofollow">
@endif
@if ($seo['canonical'])
<link rel="canonical" href="{{ $seo['canonical'] }}">
@endif
@foreach ($seo['alternates'] as $locale => $url)
<link rel="alternate" hreflang="{{ str_replace('_', '-', $locale) }}" href="{{ $url }}">
@endforeach
<meta property="og:title" content="{{ $seo['title'] }}">
@if ($seo['description'])
<meta property="og:description" content="{{ $seo['description'] }}">
@endif
@if ($seo['image'])
<meta property="og:image" content="{{ $seo['image'] }}">
@endif
@if ($seo['canonical'])
<meta property="og:url" content="{{ $seo['canonical'] }}">
@endif
