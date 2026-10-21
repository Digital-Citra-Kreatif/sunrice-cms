{{--
    A reply email's "stop these emails" link: asks first ($action: the signed link to POST to), then says it's
    done ($done). Gets $locale, $title (the entry's), $url (its page, or null), $done and $action.
    The site's own resources/views/cms/comment-unsubscribe.blade.php is used instead when there is one
    (the starter templates have one in the site's layout).
--}}
<!doctype html>
<html lang="{{ str_replace('_', '-', $locale) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>{{ $done ? __('sunrice-cms::site.comments.unsubscribed_title') : __('sunrice-cms::site.comments.unsubscribe_title') }} | {{ \Sunrice\Cms\Content::site()->name() }}</title>
    <style>
        :root { color-scheme: light dark; }
        body { margin: 0; min-height: 100vh; display: grid; place-items: center; font: 1rem/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; background: #fafaf9; color: #1c1917; }
        main { width: min(100% - 2rem, 28rem); padding: 2rem; border: 1px solid #e7e5e4; border-radius: .625rem; background: #fff; }
        .site { margin: 0 0 1rem; font-weight: 600; }
        h1 { margin-top: 0; font-size: 1.375rem; line-height: 1.25; }
        a { color: #b45309; }
        button { font: inherit; padding: .5rem 1rem; border: 0; border-radius: .5rem; background: #1c1917; color: #fff; cursor: pointer; }
        @media (prefers-color-scheme: dark) { body { background: #1c1917; color: #f5f5f4; } main { background: #292524; border-color: #44403c; } a { color: #f59e0b; } button { background: #f5f5f4; color: #1c1917; } }
    </style>
</head>
<body>
    <main>
        <p class="site"><a href="{{ url('/') }}">{{ \Sunrice\Cms\Content::site()->name() }}</a></p>
        @if ($done)
            <h1>{{ __('sunrice-cms::site.comments.unsubscribed_title') }}</h1>
            <p>{{ __('sunrice-cms::site.comments.unsubscribed') }}</p>
        @else
            <h1>{{ __('sunrice-cms::site.comments.unsubscribe_title') }}</h1>
            <p>{{ __('sunrice-cms::site.comments.unsubscribe_text', ['title' => $title]) }}</p>
            <form method="POST" action="{{ $action }}">
                @csrf
                <button type="submit">{{ __('sunrice-cms::site.comments.unsubscribe_button') }}</button>
            </form>
        @endif
        <p><a href="{{ $url ?? url('/') }}">{{ $url !== null ? __('sunrice-cms::site.comments.back') : __('sunrice-cms::site.comments.home') }}</a></p>
    </main>
</body>
</html>
