<?php

declare(strict_types=1);

return [

    /*
     * The languages content is written in, the first being the main one.
     * Codes as Laravel's app.locale uses them ("en", "id", "pt_BR").
     */
    'locales' => array_values(array_filter(explode(',', (string) env('SUNRICE_LOCALES', (string) env('APP_LOCALE', 'en'))))),

    'site' => [
        // Serve entries at their collections' routes. The CMS's route is
        // the app's fallback: the app's own routes always come first.
        'enabled' => true,
        // Middleware for the site's pages.
        'middleware' => ['web'],
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
    ],

    'search' => [
        // The search page at /search (and /{locale}/search).
        'enabled' => env('SUNRICE_SEARCH', true),
        'path' => 'search',
        // Collection handles it covers; null: every collection with pages.
        'collections' => null,
        'per_page' => 10,
        // Searches one visitor (IP address) may make per minute.
        'per_minute' => 30,
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

    'translation' => [
        // Machine translation (sunrice:translate): gemini (a Google AI
        // Studio key) or openrouter (any model it hosts).
        'driver' => env('SUNRICE_TRANSLATE_DRIVER', 'gemini'),
        // Overrides the driver's model below.
        'model' => env('SUNRICE_TRANSLATE_MODEL'),
        'gemini' => [
            'key' => env('GEMINI_API_KEY'),
            'model' => 'gemini-3.5-flash-lite',
        ],
        'openrouter' => [
            'key' => env('OPENROUTER_API_KEY'),
            'model' => 'google/gemini-3.5-flash-lite',
        ],
        // Strings sent in one request, and seconds to wait for its answer.
        'batch_size' => 40,
        'timeout' => 120,
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
    ],

    'revisions' => [
        // Published versions kept per entry and language; older ones are deleted on publish.
        'keep' => 50,
    ],

];
