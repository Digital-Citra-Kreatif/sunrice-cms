<?php

declare(strict_types=1);

return [

    /*
     * The languages content is written in, the first being the main one.
     * Codes as Laravel's app.locale uses them ("en", "id", "pt_BR").
     */
    'locales' => array_values(array_filter(explode(',', (string) env('SUNRICE_LOCALES', (string) env('APP_LOCALE', 'en'))))),

    'revisions' => [
        // Published versions kept per entry and language; older ones are deleted on publish.
        'keep' => 50,
    ],

];
