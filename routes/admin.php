<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Sunrice\Http\Controllers\Admin;
use Sunrice\Http\Middleware;

/**
 * Admin routes. Loaded under prefix config('sunrice.admin.path')
 * with web + HandleSunriceInertiaRequests middleware. Everything in
 * the authenticated group also passes the Sunrice guard's
 * Authenticate + EnsureCanAccessAdmin.
 */

// Guests: login + password reset.
Route::middleware('guest:'.config('sunrice.auth.guard', 'web'))->group(function (): void {
    Route::get('login', [Admin\Auth\LoginController::class, 'create'])->name('login');
    Route::post('login', [Admin\Auth\LoginController::class, 'store'])->name('login.store');
    // Two-factor: the emailed code, after a correct password.
    Route::get('login/code', [Admin\Auth\TwoFactorController::class, 'create'])->name('login.code');
    Route::post('login/code', [Admin\Auth\TwoFactorController::class, 'store'])->name('login.code.verify');
    Route::post('login/code/resend', [Admin\Auth\TwoFactorController::class, 'resend'])->name('login.code.resend');
    Route::get('forgot-password', [Admin\Auth\PasswordResetController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [Admin\Auth\PasswordResetController::class, 'store'])->middleware('throttle:sunrice-password')->name('password.email');
    Route::get('reset-password/{token}', [Admin\Auth\PasswordResetController::class, 'edit'])->name('password.reset');
    Route::post('reset-password', [Admin\Auth\PasswordResetController::class, 'update'])->middleware('throttle:sunrice-password')->name('password.update');
});

Route::post('logout', [Admin\Auth\LoginController::class, 'destroy'])->name('logout');

Route::middleware([Middleware\Authenticate::class, Middleware\EnsureCanAccessAdmin::class])->group(function (): void {
    Route::get('/', Admin\DashboardController::class)->name('dashboard');
    Route::put('table-preferences/{table}', [Admin\TablePreferencesController::class, 'update'])->name('table-preferences.update');

    // Structure (T8.1–T8.2)
    Route::prefix('structure')->name('structure.')->group(function (): void {
        Route::get('collections', [Admin\Structure\CollectionsController::class, 'index'])->name('collections.index');
        Route::get('collections/create', [Admin\Structure\CollectionsController::class, 'create'])->name('collections.create');
        Route::post('collections', [Admin\Structure\CollectionsController::class, 'store'])->name('collections.store');
        Route::get('collections/{collection}/edit', [Admin\Structure\CollectionsController::class, 'edit'])->name('collections.edit');
        Route::put('collections/{collection}', [Admin\Structure\CollectionsController::class, 'update'])->name('collections.update');
        Route::delete('collections/{collection}', [Admin\Structure\CollectionsController::class, 'destroy'])->name('collections.destroy');
        Route::post('collections/reorder', [Admin\Structure\CollectionsController::class, 'reorder'])->name('collections.reorder');

        Route::get('blueprints', [Admin\Structure\BlueprintsController::class, 'index'])->name('blueprints.index');
        Route::get('blueprints/create', [Admin\Structure\BlueprintsController::class, 'create'])->name('blueprints.create');
        Route::post('blueprints', [Admin\Structure\BlueprintsController::class, 'store'])->name('blueprints.store');
        Route::get('blueprints/{blueprint}/edit', [Admin\Structure\BlueprintsController::class, 'edit'])->name('blueprints.edit');
        Route::put('blueprints/{blueprint}', [Admin\Structure\BlueprintsController::class, 'update'])->name('blueprints.update');
        Route::delete('blueprints/{blueprint}', [Admin\Structure\BlueprintsController::class, 'destroy'])->name('blueprints.destroy');

        Route::get('fieldsets', [Admin\Structure\FieldsetsController::class, 'index'])->name('fieldsets.index');
        Route::get('fieldsets/create', [Admin\Structure\FieldsetsController::class, 'create'])->name('fieldsets.create');
        Route::post('fieldsets', [Admin\Structure\FieldsetsController::class, 'store'])->name('fieldsets.store');
        Route::get('fieldsets/{fieldset}/edit', [Admin\Structure\FieldsetsController::class, 'edit'])->name('fieldsets.edit');
        Route::put('fieldsets/{fieldset}', [Admin\Structure\FieldsetsController::class, 'update'])->name('fieldsets.update');
        Route::delete('fieldsets/{fieldset}', [Admin\Structure\FieldsetsController::class, 'destroy'])->name('fieldsets.destroy');

        Route::get('taxonomies', [Admin\Structure\TaxonomiesController::class, 'index'])->name('taxonomies.index');
        Route::get('taxonomies/create', [Admin\Structure\TaxonomiesController::class, 'create'])->name('taxonomies.create');
        Route::post('taxonomies', [Admin\Structure\TaxonomiesController::class, 'store'])->name('taxonomies.store');
        Route::get('taxonomies/{taxonomy}/edit', [Admin\Structure\TaxonomiesController::class, 'edit'])->name('taxonomies.edit');
        Route::put('taxonomies/{taxonomy}', [Admin\Structure\TaxonomiesController::class, 'update'])->name('taxonomies.update');
        Route::delete('taxonomies/{taxonomy}', [Admin\Structure\TaxonomiesController::class, 'destroy'])->name('taxonomies.destroy');
    });

    // Entries (T8.3)
    Route::get('collections/{collection:handle}/entries', [Admin\EntriesController::class, 'index'])->name('entries.index');
    Route::get('collections/{collection:handle}/listing', [Admin\ListingController::class, 'edit'])->name('listing.edit');
    Route::put('collections/{collection:handle}/listing', [Admin\ListingController::class, 'update'])->name('listing.update');
    Route::get('collections/{collection:handle}/entries/export', [Admin\EntriesController::class, 'export'])->name('entries.export');
    Route::get('collections/{collection:handle}/entries/create', [Admin\EntriesController::class, 'create'])->name('entries.create');
    Route::post('collections/{collection:handle}/entries', [Admin\EntriesController::class, 'store'])->name('entries.store');
    Route::post('collections/{collection:handle}/entries/reorder', [Admin\EntriesController::class, 'reorder'])->name('entries.reorder');
    Route::post('collections/{collection:handle}/entries/bulk', [Admin\EntriesController::class, 'bulk'])->name('entries.bulk');
    Route::get('collections/{collection:handle}/entries/{entry}/edit', [Admin\EntriesController::class, 'edit'])->whereNumber('entry')->withoutScopedBindings()->name('entries.edit');
    // Older addresses of the entry editor: sent to the one above.
    Route::get('collections/{collection:handle}/entries/{entry}', [Admin\EntriesController::class, 'legacyEdit'])->whereNumber('entry')->name('entries.legacy-nested-edit');
    Route::get('entries/{entry}', [Admin\EntriesController::class, 'legacyEdit'])->whereNumber('entry')->name('entries.legacy-edit');
    Route::put('entries/{entry}', [Admin\EntriesController::class, 'update'])->name('entries.update');
    Route::delete('entries/{entry}', [Admin\EntriesController::class, 'destroy'])->name('entries.destroy');
    Route::post('entries/{entry}/publish', [Admin\EntriesController::class, 'publish'])->name('entries.publish');
    Route::post('entries/{entry}/unpublish', [Admin\EntriesController::class, 'unpublish'])->name('entries.unpublish');
    Route::put('entries/{entry}/publish-date', [Admin\EntriesController::class, 'publishDate'])->name('entries.publish-date');
    Route::post('entries/{entry}/duplicate', [Admin\EntriesController::class, 'duplicate'])->name('entries.duplicate');
    Route::post('entries/{entry}/restore', [Admin\EntriesController::class, 'restore'])->withTrashed()->name('entries.restore');
    Route::delete('entries/{entry}/force', [Admin\EntriesController::class, 'forceDelete'])->withTrashed()->name('entries.force-delete');
    Route::post('entries/{entry}/blueprint', [Admin\EntriesController::class, 'changeBlueprint'])->name('entries.blueprint');
    Route::post('entries/{entry}/preview', [Admin\EntriesController::class, 'preview'])->name('entries.preview');
    Route::put('entry-translations/{translation}/return-to-draft', [Admin\EntriesController::class, 'returnToDraft'])->name('entry-translations.return-to-draft');
    Route::post('revisions/{revision}/restore', [Admin\EntriesController::class, 'restoreRevision'])->name('revisions.restore');
    Route::post('entry-translations/{translation}/undo-restore', [Admin\EntriesController::class, 'undoRestore'])->name('revisions.undo-restore');

    // Taxonomy terms (T8.4)
    Route::get('taxonomies/{taxonomy:handle}/terms', [Admin\TermsController::class, 'index'])->name('terms.index');
    // Older address of the terms list: sent to the one above.
    Route::get('taxonomies/{taxonomy:handle}', [Admin\TermsController::class, 'legacyIndex'])->name('terms.legacy-index');
    Route::get('taxonomies/{taxonomy:handle}/terms/create', [Admin\TermsController::class, 'create'])->name('terms.create');
    Route::post('taxonomies/{taxonomy:handle}/terms', [Admin\TermsController::class, 'store'])->name('terms.store');
    Route::get('taxonomies/{taxonomy:handle}/terms/{term}/edit', [Admin\TermsController::class, 'edit'])->whereNumber('term')->withoutScopedBindings()->name('terms.edit');
    // Older addresses of the term editor: sent to the one above.
    Route::get('taxonomies/{taxonomy:handle}/terms/{term}', [Admin\TermsController::class, 'legacyEdit'])->whereNumber('term')->name('terms.legacy-nested-edit');
    Route::get('terms/{term}/edit', [Admin\TermsController::class, 'legacyEdit'])->whereNumber('term')->name('terms.legacy-edit');
    Route::put('terms/{term}', [Admin\TermsController::class, 'update'])->name('terms.update');
    Route::delete('terms/{term}', [Admin\TermsController::class, 'destroy'])->name('terms.destroy');
    Route::post('taxonomies/{taxonomy:handle}/terms/reorder', [Admin\TermsController::class, 'reorder'])->name('terms.reorder');
    Route::post('taxonomies/{taxonomy:handle}/terms/bulk', [Admin\TermsController::class, 'bulk'])->name('terms.bulk');

    // Menus (T8.5)
    Route::get('menus', [Admin\MenusController::class, 'index'])->name('menus.index');
    Route::get('menus/create', [Admin\MenusController::class, 'create'])->name('menus.create');
    Route::post('menus', [Admin\MenusController::class, 'store'])->name('menus.store');
    Route::get('menus/{menu}/edit', [Admin\MenusController::class, 'edit'])->name('menus.edit');
    Route::get('menus/{menu}', [Admin\MenusController::class, 'legacyEdit'])->whereNumber('menu')->name('menus.legacy-edit');
    Route::put('menus/{menu}', [Admin\MenusController::class, 'update'])->name('menus.update');
    Route::delete('menus/{menu}', [Admin\MenusController::class, 'destroy'])->name('menus.destroy');
    Route::get('menus/{menu}/items/create', [Admin\MenuItemsController::class, 'create'])->name('menu-items.create');
    Route::post('menus/{menu}/items', [Admin\MenuItemsController::class, 'store'])->name('menu-items.store');
    Route::get('menus/{menu}/items/{item}/edit', [Admin\MenuItemsController::class, 'edit'])->whereNumber('item')->withoutScopedBindings()->name('menu-items.edit');
    Route::get('menu-items/{item}/edit', [Admin\MenuItemsController::class, 'legacyEdit'])->whereNumber('item')->name('menu-items.legacy-edit');
    Route::put('menu-items/{item}', [Admin\MenuItemsController::class, 'update'])->name('menu-items.update');
    Route::delete('menu-items/{item}', [Admin\MenuItemsController::class, 'destroy'])->name('menu-items.destroy');
    Route::post('menus/{menu}/items/reorder', [Admin\MenuItemsController::class, 'reorder'])->name('menu-items.reorder');

    // Globals (T8.6)
    Route::get('globals', [Admin\GlobalsController::class, 'index'])->name('globals.index');
    Route::get('globals/create', [Admin\GlobalsController::class, 'create'])->name('globals.create');
    Route::post('globals', [Admin\GlobalsController::class, 'store'])->name('globals.store');
    Route::get('globals/{globalSet}/edit', [Admin\GlobalsController::class, 'edit'])->name('globals.edit');
    Route::put('globals/{globalSet}', [Admin\GlobalsController::class, 'update'])->name('globals.update');
    Route::put('globals/{globalSet}/meta', [Admin\GlobalsController::class, 'updateMeta'])->name('globals.update-meta');
    Route::delete('globals/{globalSet}', [Admin\GlobalsController::class, 'destroy'])->name('globals.destroy');

    // Site settings
    Route::get('comments', [Admin\CommentsController::class, 'index'])->name('comments.index');
    Route::post('comments/bulk', [Admin\CommentsController::class, 'bulk'])->name('comments.bulk');
    Route::post('comments/{comment}/moderate', [Admin\CommentsController::class, 'moderate'])->whereNumber('comment')->name('comments.moderate');
    Route::put('comments/{comment}', [Admin\CommentsController::class, 'update'])->name('comments.update');
    Route::post('comments/{comment}/reply', [Admin\CommentsController::class, 'reply'])->name('comments.reply');
    Route::put('entries/{entry}/comments-closed', [Admin\CommentsController::class, 'close'])->name('comments.close');
    Route::get('activity', [Admin\ActivityLogController::class, 'index'])->name('activity.index');
    Route::post('activity/prune', [Admin\ActivityLogController::class, 'prune'])->name('activity.prune');
    Route::get('settings', [Admin\SettingsController::class, 'edit'])->name('settings.edit');
    Route::put('settings', [Admin\SettingsController::class, 'update'])->name('settings.update');
    Route::get('settings/seo', [Admin\SettingsController::class, 'seo'])->name('settings.seo');
    Route::put('settings/seo', [Admin\SettingsController::class, 'updateSeo'])->name('settings.seo.update');
    Route::post('settings/test-mail', [Admin\SettingsController::class, 'testMail'])->name('settings.test-mail');

    // Edit locks: who is editing what, take over, kept unsaved changes
    Route::post('locks/{type}/{id}', [Admin\EditLocksController::class, 'renew'])->whereIn('type', ['entry', 'term', 'global'])->whereNumber('id')->name('locks.renew');
    Route::post('locks/{type}/{id}/take', [Admin\EditLocksController::class, 'take'])->whereIn('type', ['entry', 'term', 'global'])->whereNumber('id')->name('locks.take');
    Route::post('locks/{type}/{id}/release', [Admin\EditLocksController::class, 'release'])->whereIn('type', ['entry', 'term', 'global'])->whereNumber('id')->name('locks.release');
    Route::post('locks/{type}/{id}/keep', [Admin\EditLocksController::class, 'keep'])->whereIn('type', ['entry', 'term', 'global'])->whereNumber('id')->name('locks.keep');
    Route::get('kept-edits/{kept}', [Admin\EditLocksController::class, 'show'])->name('kept-edits.show');
    Route::delete('kept-edits/{kept}', [Admin\EditLocksController::class, 'destroy'])->name('kept-edits.destroy');

    // AI agents (MCP) access tokens
    Route::get('ai-access', [Admin\AiAccessController::class, 'index'])->name('ai-access.index');
    Route::post('ai-access', [Admin\AiAccessController::class, 'store'])->name('ai-access.store');
    Route::delete('ai-access/{token}', [Admin\AiAccessController::class, 'destroy'])->name('ai-access.destroy');

    // User guide (the package's guide/{locale}/*.md)
    Route::get('guide/{page?}', [Admin\GuideController::class, 'show'])->where('page', '[a-z0-9-]+')->name('guide.show');
    // Developer docs (the package's docs/*.md)
    Route::get('docs/{page?}', [Admin\DocsController::class, 'show'])->where('page', '[a-z0-9-]+')->name('docs.show');

    // Users & roles (T8.7)
    Route::get('users', [Admin\UsersController::class, 'index'])->name('users.index');
    Route::get('users/create', [Admin\UsersController::class, 'create'])->name('users.create');
    Route::post('users', [Admin\UsersController::class, 'store'])->name('users.store');
    Route::get('users/{user}/edit', [Admin\UsersController::class, 'edit'])->name('users.edit');
    Route::put('users/{user}', [Admin\UsersController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [Admin\UsersController::class, 'destroy'])->name('users.destroy');
    Route::get('roles', [Admin\RolesController::class, 'index'])->name('roles.index');
    Route::get('roles/create', [Admin\RolesController::class, 'create'])->name('roles.create');
    Route::post('roles', [Admin\RolesController::class, 'store'])->name('roles.store');
    Route::get('roles/{role}/edit', [Admin\RolesController::class, 'edit'])->name('roles.edit');
    Route::put('roles/{role}', [Admin\RolesController::class, 'update'])->name('roles.update');
    Route::delete('roles/{role}', [Admin\RolesController::class, 'destroy'])->name('roles.destroy');

    // Assets (T9.3)
    Route::get('assets', [Admin\AssetsController::class, 'index'])->name('assets.index');
    Route::post('assets', [Admin\AssetsController::class, 'store'])->name('assets.store');
    Route::post('assets/bulk-trash', [Admin\AssetsController::class, 'bulkTrash'])->name('assets.bulk-trash');
    Route::get('assets/{asset}', [Admin\AssetsController::class, 'show'])->name('assets.show');
    Route::get('assets/{asset}/edit', [Admin\AssetsController::class, 'edit'])->whereNumber('asset')->name('assets.edit');
    Route::put('assets/{asset}', [Admin\AssetsController::class, 'update'])->name('assets.update');
    Route::post('assets/{asset}/replace', [Admin\AssetsController::class, 'replace'])->name('assets.replace');
    Route::delete('assets/{asset}', [Admin\AssetsController::class, 'destroy'])->name('assets.destroy');
    Route::post('assets/{asset}/restore', [Admin\AssetsController::class, 'restore'])->name('assets.restore');
    Route::delete('assets/{asset}/force', [Admin\AssetsController::class, 'forceDelete'])->name('assets.force-delete');
    Route::get('asset-folders/create', [Admin\AssetFoldersController::class, 'create'])->name('asset-folders.create');
    Route::post('asset-folders', [Admin\AssetFoldersController::class, 'store'])->name('asset-folders.store');
    Route::get('asset-folders/{folder}/edit', [Admin\AssetFoldersController::class, 'edit'])->name('asset-folders.edit');
    Route::put('asset-folders/{folder}', [Admin\AssetFoldersController::class, 'update'])->name('asset-folders.update');
    Route::delete('asset-folders/{folder}', [Admin\AssetFoldersController::class, 'destroy'])->name('asset-folders.destroy');

    // Forms (T13.3)
    Route::get('forms', [Admin\FormsController::class, 'index'])->name('forms.index');
    Route::get('forms/create', [Admin\FormsController::class, 'create'])->name('forms.create');
    Route::post('forms', [Admin\FormsController::class, 'store'])->name('forms.store');
    Route::delete('forms/{form}', [Admin\FormsController::class, 'destroy'])->name('forms.destroy');
    Route::get('forms/{form}/edit', [Admin\FormsController::class, 'edit'])->whereNumber('form')->name('forms.edit');
    // Older address of the form editor (by handle): sent to the one above.
    Route::get('forms/{form:handle}', [Admin\FormsController::class, 'legacyEdit'])->name('forms.legacy-edit');
    Route::put('forms/{form}', [Admin\FormsController::class, 'update'])->name('forms.update');
    Route::get('forms/{form}/submissions', [Admin\FormSubmissionsController::class, 'index'])->name('forms.submissions');
    Route::get('forms/{form}/submissions/export', [Admin\FormSubmissionsController::class, 'export'])->name('forms.submissions.export');
    Route::get('submissions/{submission}', [Admin\FormSubmissionsController::class, 'show'])->name('submissions.show');
    Route::get('submissions/{submission}/download/{field}', [Admin\FormSubmissionsController::class, 'download'])->name('submissions.download');
    Route::delete('submissions/{submission}', [Admin\FormSubmissionsController::class, 'destroy'])->name('submissions.destroy');

    // Resources (T14.2)
    Route::get('resources/{resource}', [Admin\ResourceController::class, 'index'])->name('resources.index');
    Route::get('resources/{resource}/create', [Admin\ResourceController::class, 'create'])->name('resources.create');
    Route::get('resources/{resource}/{id}/edit', [Admin\ResourceController::class, 'edit'])->name('resources.edit');
    Route::get('resources/{resource}/export', [Admin\ResourceController::class, 'export'])->name('resources.export');
    Route::post('resources/{resource}', [Admin\ResourceController::class, 'store'])->name('resources.store');
    Route::put('resources/{resource}/{id}', [Admin\ResourceController::class, 'update'])->name('resources.update');
    Route::delete('resources/{resource}/{id}', [Admin\ResourceController::class, 'destroy'])->name('resources.destroy');
    Route::post('resources/{resource}/bulk', [Admin\ResourceController::class, 'bulk'])->name('resources.bulk');
    Route::post('resources/{resource}/{id}/actions/{action}', [Admin\ResourceController::class, 'action'])->whereNumber('id')->name('resources.action');

    // Field picker APIs (T7.4)
    Route::get('api/entries', [Admin\Api\EntrySearchController::class, 'index'])->name('api.entries');
    Route::get('api/assets', [Admin\Api\AssetSearchController::class, 'index'])->name('api.assets');
    Route::get('api/terms', [Admin\Api\TermSearchController::class, 'index'])->name('api.terms');
    Route::get('api/resources/{resource}/options/{field}', [Admin\Api\ResourceOptionsController::class, 'index'])->name('api.resources.options');
});
