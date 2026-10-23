{{--
    <x-sunrice-cms::language-switcher />: the page shown in each language (Sunrice\Cms\View\Components\LanguageSwitcher).
    The current language isn't a link (it's this page) but says so with aria-current="true"; each link has hreflang
    and lang, so search engines and screen readers know which language it leads to and how to read its name.
--}}
@if ($slot->isEmpty())
<nav {{ $attributes->merge(['aria-label' => $label ?? __('sunrice-cms::site.languages.label')]) }}>
@if ($variant === 'dropdown')
    <details>
        <summary>@if ($current())<span lang="{{ $current()->tag }}">@if ($labels === 'code')<abbr title="{{ $current()->name }}">{{ $text($current()) }}</abbr>@else{{ $text($current()) }}@endif</span>@endif</summary>
@endif
    <ul>
@foreach ($languages as $language)
        <li>@if ($language->current)<span aria-current="true" lang="{{ $language->tag }}"{!! $language->fallback ? ' data-fallback' : '' !!}>@if ($labels === 'code')<abbr title="{{ $language->name }}">{{ $text($language) }}</abbr>@else{{ $text($language) }}@endif</span>@else<a href="{{ $language->url }}" hreflang="{{ $language->tag }}" lang="{{ $language->tag }}"@if ($labels === 'code') title="{{ $language->name }}" aria-label="{{ $language->name }}"@endif{!! ($language->fallback ? ' data-fallback' : '').($language->home ? ' data-home' : '') !!}>{{ $text($language) }}@if ($fallbackNote && $language->fallback)<span class="visually-hidden" lang="{{ $current()?->tag }}"> {{ __('sunrice-cms::site.languages.not_translated') }}</span>@endif</a>@endif</li>
@endforeach
    </ul>
@if ($variant === 'dropdown')
    </details>
@endif
</nav>
@else
{{ $slot }}
@endif
