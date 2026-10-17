<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Spatie\Honeypot\ProtectAgainstSpam;
use Sunrice\Http\Controllers\Frontend\CommentController;
use Sunrice\Http\Controllers\Frontend\FormSubmitController;
use Sunrice\Http\Controllers\Frontend\PageController;
use Sunrice\Http\Controllers\Frontend\PreviewController;
use Sunrice\Http\Controllers\Frontend\SearchController;
use Sunrice\Http\Controllers\Frontend\SitemapController;
use Sunrice\Http\Middleware\SetFrontendLocale;
use Sunrice\Support\Locales;

// Registered after the host application's routes (see
// SunriceServiceProvider::registerRouteMacro) so app routes win.
// Everything here runs through the frontend locale middleware.

// Public form submissions — before the catch-all, inside the locale group.
Route::post('sunrice/forms/{form:handle}', FormSubmitController::class)
    ->middleware([ProtectAgainstSpam::class, 'throttle:sunrice-forms'])
    ->name('sunrice.frontend.forms.submit');

// Comments and replies (<x-sunrice::comments>), and the link in reply emails.
Route::post('sunrice/comments/{entry}', [CommentController::class, 'store'])
    ->whereNumber('entry')
    ->middleware([ProtectAgainstSpam::class, 'throttle:sunrice-comments'])
    ->name('sunrice.frontend.comments.store');
Route::get('sunrice/comments/unsubscribe/{comment}', [CommentController::class, 'unsubscribe'])
    ->middleware('signed')
    ->name('sunrice.frontend.comments.unsubscribe');

// Signed editor preview — lives under the admin path prefix.
Route::get(config('sunrice.admin.path', 'cms').'/preview/{entry}/{locale}', PreviewController::class)
    ->middleware('signed')
    ->name('sunrice.frontend.preview');

Route::middleware(SetFrontendLocale::class)->group(function (): void {
    Route::get('/sitemap.xml', SitemapController::class)->name('sunrice.frontend.sitemap');

    Route::get('/', PageController::class)->name('sunrice.frontend.home');

    // Non-main locale homepage, e.g. /en.
    $locales = collect(Locales::available())
        ->reject(fn (string $l) => Locales::isMain($l))
        ->implode('|');
    if ($locales !== '') {
        Route::get('/{locale}', PageController::class)
            ->where('locale', '^(?:'.$locales.')$')
            ->name('sunrice.frontend.home.locale');
    }

    // Site search: /search and /{locale}/search.
    if (config('sunrice.search.enabled', true)) {
        $searchPath = trim((string) config('sunrice.search.path', 'search'), '/');
        Route::get('/'.$searchPath, SearchController::class)->name('sunrice.frontend.search');
        if ($locales !== '') {
            Route::get('/{locale}/'.$searchPath, SearchController::class)
                ->where('locale', '^(?:'.$locales.')$')
                ->name('sunrice.frontend.search.locale');
        }
    }

    // Catch-all: a fallback route so routes defined later (host app,
    // packages, tests) always win over the CMS.
    Route::fallback(PageController::class)->name('sunrice.frontend.show');
});
