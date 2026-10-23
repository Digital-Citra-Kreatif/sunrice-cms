{{--
    A code field's value shown as code: <x-sunrice-cms::code-block :value="$values['snippet']" language="html" />
    prints <pre><code class="language-html">…</code></pre>, the code escaped (shown, never run). Nothing when
    it's empty. Other attributes go on the <pre>. No highlighting is shipped: add Prism or highlight.js,
    which read the language-… class, if you want it.
--}}
@props(['value' => null, 'language' => null])
@php
    $code = is_string($value) || is_int($value) || is_float($value) ? (string) $value : '';
    $language = is_string($language) && preg_match('/^[A-Za-z0-9_+-]{1,30}$/', $language) === 1 ? strtolower($language) : null;
@endphp
@if (trim($code) !== '')
<pre{{ $attributes->isEmpty() ? '' : ' ' }}{{ $attributes }}><code{!! $language !== null ? ' class="language-'.e($language).'"' : '' !!}>{{ $code }}</code></pre>
@endif
