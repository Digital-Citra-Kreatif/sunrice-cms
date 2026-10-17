<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>{{ __('sunrice::frontend.comment_unsubscribed') }}</title>
    <style>body{font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 1rem;line-height:1.5;color:#222}a{color:inherit}</style>
</head>
<body>
    <p>{{ __('sunrice::frontend.comment_unsubscribed') }}</p>
    @if ($url)
        <p><a href="{{ $url }}">{{ __('sunrice::frontend.comment_back') }}</a></p>
    @endif
</body>
</html>
