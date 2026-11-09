{{--
    A Link field's value as a link: <x-sunrice-cms::link :link="$values['cta']" class="button" />
    prints <a href="…" class="button">…</a> with the address in the page's language (an entry, term or
    listing link follows its page), target="_blank" and rel when the editor asked for them, and the
    editor's text, else the page's title, else the address. A slot replaces the text. Nothing at all
    when there's no address (no link, or a page that isn't live). Other attributes go on the <a>; a rel
    of yours is added to the link's own.
--}}
@props(['link' => null])
@php
    $url = is_array($link) && is_string($link['url'] ?? null) && trim($link['url']) !== '' ? $link['url'] : null;
    $text = null;
    if ($url !== null) {
        foreach (['label', 'title'] as $key) {
            if (is_string($link[$key] ?? null) && trim($link[$key]) !== '') {
                $text = $link[$key];
                break;
            }
        }
        $words = array_merge(
            preg_split('/\s+/', is_string($link['rel'] ?? null) ? $link['rel'] : '', -1, PREG_SPLIT_NO_EMPTY) ?: [],
            preg_split('/\s+/', is_string($attributes->get('rel')) ? $attributes->get('rel') : '', -1, PREG_SPLIT_NO_EMPTY) ?: [],
        );
        $attributes = $attributes->except(['rel', 'href'])->merge(array_filter([
            'href' => $url,
            'target' => ($link['new_tab'] ?? false) === true ? '_blank' : null,
            'rel' => $words === [] ? null : implode(' ', array_values(array_unique($words))),
        ], fn (?string $value): bool => $value !== null));
    }
@endphp
@if ($url !== null)
<a {{ $attributes }}>@if ($slot->isNotEmpty()){{ $slot }}@else{{ $text ?? $url }}@endif</a>
@endif
