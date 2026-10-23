{{--
    Settings → Site code, as is: <x-sunrice-cms::code place="head" /> before </head>,
    place="body-start" after <body>, place="body-end" before </body>.
    Its <script> and <style> tags get the request's CSP nonce, when there is one (SiteCsp::withNonce()).
--}}
@props(['place' => 'head'])
{!! \Sunrice\Cms\Site\SiteCsp::withNonce(app(\Sunrice\Cms\Settings\CodeSettings::class)->at($place)) !!}
