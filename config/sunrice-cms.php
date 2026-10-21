<?php

declare(strict_types=1);

return [

    /*
     * The languages content is written in, the first being the main one.
     * Codes as Laravel's app.locale uses them ("en", "id", "pt_BR").
     */
    'locales' => array_values(array_filter(explode(',', (string) env('SUNRICE_LOCALES', (string) env('APP_LOCALE', 'en'))))),

    // Their names, by code (['id' => 'Bahasa Indonesia']); others are
    // named in English ("Indonesian"). Settings → Languages, once saved,
    // replaces these.
    'locale_names' => [],

    // What a language's addresses start with, by code (['en' => 'en',
    // 'id' => 'indonesia']); unset: the main language at the plain
    // addresses (/about), the others under their code (/id/tentang).
    'locale_prefixes' => [],

    'site' => [
        // Serve entries at their collections' routes. The CMS's route is
        // the app's fallback: the app's own routes always come first.
        'enabled' => true,
        // Middleware for the site's pages.
        'middleware' => ['web'],
        // What the views editors pick for an entry or a term may start
        // with, so no other view of the app can be made a public page.
        'template_prefixes' => ['cms.'],
        // An entry or term not translated into a language (or not live in
        // it) shows the main language's content at that language's address,
        // canonical to the main page. Off: a 404 there.
        'fallback' => env('SUNRICE_FALLBACK', true),
        // Headers sent with every site response (pages, listings, terms,
        // search, the sitemap, previews, form and comment posts); null or
        // '' leaves one out, and a header the response already has is
        // kept. No Content-Security-Policy unless you set one: what it
        // must allow depends on your templates, scripts and site code.
        'headers' => [
            'X-Content-Type-Options' => 'nosniff',
            'X-Frame-Options' => 'SAMEORIGIN',
            'Referrer-Policy' => 'strict-origin-when-cross-origin',
            'Permissions-Policy' => 'camera=(), microphone=(), geolocation=()',
            'Content-Security-Policy' => env('SUNRICE_SITE_CSP'),
        ],
    ],

    'cache' => [
        // Cache what the site reads often (which page is at an address,
        // menus, the sitemap) until the content changes.
        'enabled' => env('SUNRICE_CACHE', true),
        // The cache store (null: the app's default). Use a shared one
        // (redis, database, memcached) with several servers.
        'store' => env('SUNRICE_CACHE_STORE'),
        // Seconds anything is kept at most.
        'ttl' => 3600,
        // Keep whole pages for visitors who aren't signed in. Turn it on
        // when templates show nothing personal (or skip those pages with
        // PageCache::skipWhen()).
        'pages' => env('SUNRICE_PAGE_CACHE', false),
        // Query parameters that make a kept page different, besides `page`
        // and `q`. Any other (?utm_source=…) is ignored, so it can't fill
        // the cache store with copies of one page.
        'query' => [],
    ],

    'search' => [
        // The search page at /search (and /{locale}/search).
        'enabled' => env('SUNRICE_SEARCH', true),
        'path' => 'search',
        // Collection handles it covers; null: every collection with pages.
        'collections' => null,
        'per_page' => 10,
        // Searches one visitor (IP address) may make per minute, and
        // everyone together (then everyone waits a minute).
        'per_minute' => 30,
        'per_minute_global' => 300,
    ],

    'comments' => [
        // Days spam is kept before the daily prune deletes it; null: kept.
        'prune_spam_after_days' => 30,
    ],

    'seo' => [
        // Ask search engines to stay away from the whole site, e.g. on a
        // staging copy (also in Settings → Site).
        'noindex' => env('SUNRICE_NOINDEX', false),
    ],

    'forms' => [
        // Submissions one visitor (IP address) may send per minute to a form,
        // unless the form says otherwise.
        'per_minute' => 5,
        // Files sent with forms: a private disk (never served to the public)
        // and the largest file a file field takes, in KB, unless it says.
        'upload_disk' => env('SUNRICE_FORMS_DISK', 'local'),
        'upload_max_kb' => 10240,
        // Days submissions (and their files) are kept; null: forever.
        'prune_after_days' => env('SUNRICE_FORMS_PRUNE_DAYS'),
        // Keep the sender's IP address, browser (user agent) and the page
        // they came from with each submission (personal data: see the docs).
        'visitor_details' => env('SUNRICE_FORMS_VISITOR_DETAILS', true),
    ],

    'ai' => [
        // Let super admins' AI agents create and change templates in
        // resources/views/cms (cms_write_template). Off unless asked for:
        // Blade runs PHP, so a leaked super admin token could run code on
        // the server.
        'templates' => env('SUNRICE_AI_TEMPLATES', false),
    ],

    'translation' => [
        // Machine translation (sunrice:translate, the editor's "Translate
        // from …" button): gemini, openrouter, or null for none.
        'driver' => env('SUNRICE_TRANSLATE_DRIVER'),
        // null: the driver's default (gemini-2.5-flash, google/gemini-2.5-flash).
        'model' => env('SUNRICE_TRANSLATE_MODEL'),
        'gemini_key' => env('SUNRICE_GEMINI_KEY'),
        'openrouter_key' => env('SUNRICE_OPENROUTER_KEY'),
        // Strings per request, and seconds a request may take.
        'batch_size' => 40,
        'timeout' => 120,
    ],

    'revisions' => [
        // Published versions kept per entry and language; older ones are deleted on publish.
        'keep' => 50,
    ],

];
