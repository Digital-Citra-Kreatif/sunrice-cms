{{--
    After a reply email's "unsubscribe" link. Gets $locale and $url (the entry's page, or null).
    Change it by publishing your own as resources/views/vendor/sunrice-cms/comment-unsubscribed.blade.php.
--}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>{{ __('Unsubscribed') }} | {{ \Sunrice\Cms\Content::site()->name() }}</title>
    <style>
        :root { color-scheme: light dark; }
        body { margin: 0; min-height: 100vh; display: grid; place-items: center; font: 1rem/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; background: #fafaf9; color: #1c1917; }
        main { width: min(100% - 2rem, 28rem); padding: 2rem; border: 1px solid #e7e5e4; border-radius: .625rem; background: #fff; }
        h1 { margin-top: 0; font-size: 1.375rem; line-height: 1.25; }
        a { color: #b45309; }
        @media (prefers-color-scheme: dark) { body { background: #1c1917; color: #f5f5f4; } main { background: #292524; border-color: #44403c; } a { color: #f59e0b; } }
    </style>
</head>
<body>
    <main>
        <h1>{{ __('You\'re unsubscribed') }}</h1>
        <p>{{ __('sunrice-cms::site.comments.unsubscribed', [], $locale) }}</p>
        <p><a href="{{ $url ?? url('/') }}">{{ $url !== null ? __('Back to the page') : __('Go to the home page') }}</a></p>
    </main>
</body>
</html>
