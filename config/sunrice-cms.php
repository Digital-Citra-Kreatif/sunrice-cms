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

    'seo' => [
        // Ask search engines to stay away from the whole site, e.g. on a
        // staging copy (also in Settings → Site).
        'noindex' => env('SUNRICE_NOINDEX', false),
    ],

    'forms' => [
        // Submissions one visitor (IP address) may send per minute, to all forms.
        'per_minute' => 5,
    ],

    'revisions' => [
        // Published versions kept per entry and language; older ones are deleted on publish.
        'keep' => 50,
    ],

];
