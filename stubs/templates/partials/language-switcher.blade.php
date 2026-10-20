{{--
    Links to the page shown in each language it's in (cms_locale_urls()); nothing with only one.
    Keep hreflang and lang on the links: they tell search engines and screen readers which language each one is.
--}}
@php($languages = cms_locale_urls())
@if (count($languages) > 1)
    <nav class="language-switcher" aria-label="{{ __('Languages') }}">
        <ul>
            @foreach ($languages as $code => $href)
                <li>
                    <a href="{{ $href }}" hreflang="{{ str_replace('_', '-', $code) }}" lang="{{ str_replace('_', '-', $code) }}"
                       @if ($code === app()->getLocale()) aria-current="true" @endif>{{ class_exists(\Locale::class) ? ucfirst((string) \Locale::getDisplayLanguage($code, $code)) : strtoupper($code) }}</a>
                </li>
            @endforeach
        </ul>
    </nav>
@endif
