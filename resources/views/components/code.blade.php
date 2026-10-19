{{--
    Settings → Site code, as is: <x-sunrice-cms::code place="head" /> before </head>,
    place="body-start" after <body>, place="body-end" before </body>.
--}}
@props(['place' => 'head'])
{!! app(\Sunrice\Cms\Settings\CodeSettings::class)->at($place) !!}
