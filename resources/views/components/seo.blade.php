{{--
    The page head's SEO tags. On the CMS's pages: <x-sunrice-cms::seo /> (the page shown),
    or name it: :entry="$entry" :preview="$preview", :term="$term", :collection="$collection" (its listing page).
    On the app's own pages: title="Contact". Any page: title (instead of the page's), default-title (when the
    page has no SEO title of its own), description, noindex.
    Structured data (JSON-LD) follows; :schema="[[ '@type' => 'Event', … ]]" adds nodes of the template's own.
--}}
@props(['entry' => null, 'term' => null, 'collection' => null, 'preview' => false, 'title' => null, 'defaultTitle' => null, 'description' => null, 'noindex' => false, 'schema' => []])
@php
    $listing = is_string($collection) ? \Sunrice\Cms\Models\Collection::query()->where('handle', $collection)->first() : $collection;
    $seo = \Sunrice\Cms\Support\Seo::adjust(match (true) {
        $term !== null => \Sunrice\Cms\Support\Seo::forTerm($term),
        $entry !== null => \Sunrice\Cms\Support\Seo::for($entry, $preview),
        $listing !== null => \Sunrice\Cms\Support\Seo::forListing($listing, \Sunrice\Cms\Support\Locales::current()),
        default => \Sunrice\Cms\Support\Seo::forPage(\Sunrice\Cms\Site\Page::current(), $title),
    }, $title, $description, $defaultTitle, (bool) $noindex);
@endphp
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
<meta property="og:type" content="{{ $seo['type'] }}">
<meta property="og:site_name" content="{{ $seo['site_name'] }}">
<meta property="og:locale" content="{{ str_replace('-', '_', $seo['locale']) }}">
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
<meta name="twitter:card" content="{{ $seo['image'] ? 'summary_large_image' : 'summary' }}">
@if ($seo['twitter'])
<meta name="twitter:site" content="{{ $seo['twitter'] }}">
@endif
@if (app(\Sunrice\Cms\Settings\SiteSettings::class)->structuredData)
<script type="application/ld+json">{!! \Sunrice\Cms\Support\StructuredData::json(\Sunrice\Cms\Support\StructuredData::graph(\Sunrice\Cms\Site\Page::current(), array_values($schema))) !!}</script>
@endif
