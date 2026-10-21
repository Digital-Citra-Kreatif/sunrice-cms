<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;
use Sunrice\Admin\Assets\PluginBundle;
use Sunrice\Admin\BasePlugin;
use Sunrice\Admin\Navigation\NavigationItem;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Permissions\Permission;
use Sunrice\Cms\Actions\Users\ReleaseUserContent;
use Sunrice\Cms\Admin\CollectionResource;
use Sunrice\Cms\Admin\DashboardWidgets;
use Sunrice\Cms\Admin\FormResource;
use Sunrice\Cms\Admin\GlobalSetResource;
use Sunrice\Cms\Admin\MenuResource;
use Sunrice\Cms\Admin\RedirectResource;
use Sunrice\Cms\Admin\TaxonomyResource;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Http\Controllers\BlueprintController;
use Sunrice\Cms\Http\Controllers\CacheController;
use Sunrice\Cms\Http\Controllers\CommentController;
use Sunrice\Cms\Http\Controllers\EntryController;
use Sunrice\Cms\Http\Controllers\EntryManageController;
use Sunrice\Cms\Http\Controllers\FieldsetController;
use Sunrice\Cms\Http\Controllers\GlobalsController;
use Sunrice\Cms\Http\Controllers\LanguageController;
use Sunrice\Cms\Http\Controllers\ListingController;
use Sunrice\Cms\Http\Controllers\MenuController;
use Sunrice\Cms\Http\Controllers\SeoController;
use Sunrice\Cms\Http\Controllers\SubmissionController;
use Sunrice\Cms\Http\Controllers\TermController;
use Sunrice\Cms\Http\Controllers\TranslationController;
use Sunrice\Cms\Http\Middleware\AuthorizeContent;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Settings\CacheSettings;
use Sunrice\Cms\Settings\CodeSettings;
use Sunrice\Cms\Settings\CommentSettings;
use Sunrice\Cms\Settings\LocaleSettings;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;

/**
 * The CMS, added to the panel in the app's panel provider:
 *
 *     $panel->plugin(CmsPlugin::make()->fieldTypes(ColorField::class));
 *
 * @api
 */
final class CmsPlugin extends BasePlugin
{
    public const ID = 'cms';

    /** Where the CMS's admin JavaScript and CSS are published (vendor:publish --tag=sunrice-cms-assets). */
    public const ASSETS = 'vendor/sunrice-cms';

    /** @var list<class-string<FieldType>> */
    private array $fieldTypes = [];

    public function id(): string
    {
        return self::ID;
    }

    /**
     * Field types of the app, besides the built-in ones. Plugins that
     * require the CMS register theirs on FieldTypes in their register().
     *
     * @param  class-string<FieldType>  ...$types
     */
    public function fieldTypes(string ...$types): self
    {
        array_push($this->fieldTypes, ...array_values($types));

        return $this;
    }

    public function register(Panel $panel): void
    {
        $panel->settings(SiteSettings::class, LocaleSettings::class, CodeSettings::class, CommentSettings::class, CacheSettings::class);
        // Each permission for one collection, taxonomy or form too (see Support\Access).
        $panel->permissionsUsing(fn (): array => Support\ScopedPermissions::all());
        // Media files take alt text and captions in each content language.
        $panel->contentLocales(fn (): array => Locales::names());
        // Every screen names the languages as Settings → Languages does.
        $panel->share('cms', fn (): array => ['locales' => Locales::names()]);
        // sunrice:roles: people who write and look after the content, not the structure or the people,
        // nor form submissions (visitors' personal details): those are given per form.
        $panel->defaultRole('editor', [Panel::ACCESS, 'sunrice.media.*', 'cms.entries.*', 'cms.terms.*', 'cms.globals.view', 'cms.globals.update', 'cms.menus.view', 'cms.menus.update', 'cms.comments.*', 'cms.homepage']);
        // Writes entries, publishes nothing, and edits only their own.
        $panel->defaultRole('author', [Panel::ACCESS, 'sunrice.media.view', 'sunrice.media.upload', 'cms.entries.view', 'cms.entries.create', 'cms.entries.update-own', 'cms.entries.delete-own', 'cms.entries.view-drafts']);
        // Writes the other languages of every entry.
        $panel->defaultRole('translator', [Panel::ACCESS, 'sunrice.media.view', 'cms.entries.view', 'cms.entries.translate']);
        $panel->resources(CollectionResource::class, TaxonomyResource::class, GlobalSetResource::class, MenuResource::class, RedirectResource::class, FormResource::class);
        $panel->permissions(
            Permission::make('cms.entries.view', 'View entries', 'Content'),
            Permission::make('cms.entries.create', 'Create entries', 'Content'),
            Permission::make('cms.entries.update', 'Edit drafts', 'Content'),
            Permission::make('cms.entries.publish', 'Publish and unpublish entries', 'Content'),
            Permission::make('cms.entries.delete', 'Trash and restore entries', 'Content'),
            Permission::make('cms.entries.export', 'Export entries as CSV', 'Content'),
            Permission::make('cms.entries.update-own', 'Edit drafts of their own entries (in collections they may view)', 'Content'),
            Permission::make('cms.entries.delete-own', 'Trash their own entries (in collections they may view)', 'Content'),
            Permission::make('cms.entries.translate', 'Translate entries, forms, menus and listing titles (not the main language)', 'Content'),
            Permission::make('cms.entries.view-drafts', 'See unpublished changes on the site while signed in', 'Content'),
            Permission::make('cms.terms.view', 'View terms', 'Content'),
            Permission::make('cms.terms.create', 'Create terms', 'Content'),
            Permission::make('cms.terms.update', 'Edit terms', 'Content'),
            Permission::make('cms.terms.delete', 'Trash and delete terms', 'Content'),
            Permission::make('cms.comments.view', 'View comments', 'Content'),
            Permission::make('cms.comments.moderate', 'Approve, answer and edit comments, mark spam', 'Content'),
            Permission::make('cms.comments.delete', 'Trash and delete comments', 'Content'),
            Permission::make('cms.submissions.view', 'View form submissions', 'Content'),
            Permission::make('cms.submissions.export', 'Export form submissions as CSV', 'Content'),
            Permission::make('cms.submissions.delete', 'Delete form submissions', 'Content'),
            Permission::make('cms.homepage', 'Choose the homepage (from a live page\'s editor)', 'Content'),
            Permission::make('cms.blueprints.view', 'View blueprints', 'Content structure'),
            Permission::make('cms.blueprints.create', 'Create blueprints', 'Content structure'),
            Permission::make('cms.blueprints.update', 'Edit blueprints', 'Content structure'),
            Permission::make('cms.blueprints.delete', 'Delete blueprints', 'Content structure'),
            Permission::make('cms.fieldsets.view', 'View fieldsets', 'Content structure'),
            Permission::make('cms.fieldsets.create', 'Create fieldsets', 'Content structure'),
            Permission::make('cms.fieldsets.update', 'Edit fieldsets', 'Content structure'),
            Permission::make('cms.fieldsets.delete', 'Delete fieldsets', 'Content structure'),
        );
        // Each collection under Content, each taxonomy under Taxonomies (from the cached handles).
        $panel->navigationUsing(fn (): array => [
            ...array_map(fn (string $handle, array $collection): NavigationItem => NavigationItem::make("cms-collection-{$handle}")
                ->label($collection['title'])->verbatim()->url("cms/collections/{$handle}/entries")->icon($collection['listing'] ? 'newspaper' : 'file-text')
                ->group('Content')->sort(10)->visible(fn (Authorizable $user): bool => Access::entries($user, 'view', $handle)),
                array_keys(Support\Handles::collectionTitles()), Support\Handles::collectionTitles()),
            ...array_map(fn (string $handle, string $title): NavigationItem => NavigationItem::make("cms-taxonomy-{$handle}")
                ->label($title)->verbatim()->url("cms/taxonomies/{$handle}/terms")->icon('tag')
                ->group('Taxonomies')->sort(60)->visible(fn (Authorizable $user): bool => Access::terms($user, 'view', $handle)),
                array_keys(Support\Handles::taxonomyTitles()), Support\Handles::taxonomyTitles()),
        ]);
        $panel->navigation(
            NavigationItem::make('cms-comments')->label('Comments')->url('cms/comments')->icon('message-square')
                ->group('Content')->sort(45)->permission('cms.comments.view'),
            // What visitors read outside entries, in the other languages: for translators.
            NavigationItem::make('cms-translations')->label('Translations')->url('cms/translations')->icon('globe')
                ->group('Content')->sort(55)->visible(fn (Authorizable $user): bool => $user->can('cms.entries.translate') && count(Locales::all()) > 1),
            NavigationItem::make('cms-submissions')->label('Submissions')->url('cms/submissions')->icon('inbox')
                ->group('Content')->sort(50)->visible(fn (Authorizable $user): bool => Access::submissions($user, 'view')),
            // In the Settings menu, after Site.
            NavigationItem::make('cms-seo')->label('SEO')->url('cms/seo')->icon('search')
                ->inSettings('site')->permission('cms.settings.site'),
            NavigationItem::make('cms-blueprints')->label('Blueprints')->url('cms/blueprints')->icon('layout-template')
                ->group('Structure')->sort(91)->permission('cms.blueprints.view'),
            NavigationItem::make('cms-fieldsets')->label('Fieldsets')->url('cms/fieldsets')->icon('blocks')
                ->group('Structure')->sort(92)->permission('cms.fieldsets.view'),
        );
        // Names follow the addresses: sunrice.admin.cms.{area}.{action}, and what a
        // collection, taxonomy or form owns under it (cms.collections.entries.*).
        $panel->routes(function (): void {
            $guard = fn (string $area, string $action): string => AuthorizeContent::class.":{$area},{$action}";
            Route::prefix('cms')->name('cms.')->group(function () use ($guard): void {
                foreach (['blueprints' => BlueprintController::class, 'fieldsets' => FieldsetController::class] as $area => $controller) {
                    $model = rtrim($area, 's');
                    Route::name("{$area}.")->controller($controller)->group(function () use ($area, $model): void {
                        Route::get($area, 'index')->name('index')->middleware("can:cms.{$area}.view");
                        Route::get("{$area}/create", 'create')->name('create')->middleware("can:cms.{$area}.create");
                        Route::post($area, 'store')->name('store')->middleware("can:cms.{$area}.create");
                        Route::get("{$area}/{{$model}:handle}/edit", 'edit')->name('edit')->middleware("can:cms.{$area}.update");
                        Route::put("{$area}/{{$model}:handle}", 'update')->name('update')->middleware("can:cms.{$area}.update");
                        Route::delete("{$area}/{{$model}:handle}", 'destroy')->name('destroy')->middleware("can:cms.{$area}.delete");
                    });
                }
                Route::name('seo.')->controller(SeoController::class)->middleware('can:cms.settings.site')->group(function (): void {
                    Route::get('seo', 'edit')->name('edit');
                    Route::put('seo', 'update')->name('update');
                });
                // Settings → Cache's buttons.
                Route::name('cache.')->controller(CacheController::class)->middleware('can:cms.settings.cache')->group(function (): void {
                    Route::post('cache/clear-pages', 'clearPages')->name('clear-pages');
                    Route::post('cache/clear', 'clear')->name('clear');
                    Route::post('cache/preload', 'preload')->name('preload');
                });
                Route::post('languages/{locale}/main', [LanguageController::class, 'main'])->name('languages.main')
                    ->middleware('can:cms.settings.locales')->where('locale', '[A-Za-z0-9_-]{2,20}');
                Route::name('translations.')->controller(TranslationController::class)->middleware('can:cms.entries.translate')->group(function (): void {
                    Route::get('translations', 'edit')->name('edit');
                    Route::put('translations', 'update')->name('update');
                });
                // A menu's links and a global set's values; the menus and sets themselves are resources (MenuResource, GlobalSetResource).
                Route::name('menus.links.')->controller(MenuController::class)->group(function (): void {
                    Route::get('menus/{menu:handle}/links', 'edit')->name('edit')->middleware('can:cms.menus.view');
                    Route::put('menus/{menu:handle}/links', 'update')->name('update')->middleware('can:cms.menus.update');
                });
                Route::name('globals.values.')->controller(GlobalsController::class)->group(function (): void {
                    Route::get('globals/{set:handle}/values', 'edit')->name('edit')->middleware('can:cms.globals.view');
                    Route::put('globals/{set:handle}/values', 'update')->name('update')->middleware('can:cms.globals.update');
                });
                Route::name('comments.')->controller(CommentController::class)->group(function (): void {
                    Route::get('comments', 'index')->name('index')->middleware('can:cms.comments.view');
                    Route::post('comments/bulk', 'bulk')->name('bulk')->middleware('can:cms.comments.view');
                    Route::post('comments/{comment}/status', 'status')->name('status')->middleware('can:cms.comments.moderate');
                    Route::post('comments/{comment}/reply', 'reply')->name('reply')->middleware('can:cms.comments.moderate');
                    Route::put('comments/{comment}', 'update')->name('update')->middleware('can:cms.comments.moderate');
                    Route::delete('comments/{comment}', 'destroy')->name('destroy')->middleware('can:cms.comments.delete');
                    Route::post('comments/{comment}/restore', 'restore')->name('restore')->middleware('can:cms.comments.delete')->withTrashed();
                    Route::delete('comments/{comment}/force', 'forceDelete')->name('force-delete')->middleware('can:cms.comments.delete')->withTrashed();
                });
                Route::controller(SubmissionController::class)->group(function () use ($guard): void {
                    // Every form's: on to the first one's.
                    Route::get('submissions', 'home')->name('submissions.index')->middleware($guard('submissions', 'view'));
                    Route::get('forms/{form:handle}/submissions', 'index')->name('forms.submissions.index')->middleware($guard('submissions', 'view'));
                    Route::get('forms/{form:handle}/submissions/export', 'export')->name('forms.submissions.export')->middleware($guard('submissions', 'export'));
                    Route::delete('submissions/{submission}', 'destroy')->name('submissions.destroy')->middleware($guard('submissions', 'delete'));
                    Route::get('submissions/{submission}/files/{field}', 'file')->name('submissions.file')->middleware($guard('submissions', 'view'));
                });
                Route::controller(TermController::class)->group(function () use ($guard): void {
                    // Every taxonomy's: on to the first one's.
                    Route::get('terms', 'home')->name('terms.index')->middleware($guard('terms', 'view'));
                    Route::get('terms/picker', [EntryController::class, 'termPicker'])->name('terms.picker')->middleware($guard('entries', 'view'));
                    Route::post('terms/reorder', 'reorder')->name('terms.reorder')->middleware($guard('terms', 'update'));
                    Route::get('taxonomies/{taxonomy:handle}/terms', 'index')->name('taxonomies.terms.index')->middleware($guard('terms', 'view'));
                    Route::get('taxonomies/{taxonomy:handle}/terms/create', 'create')->name('taxonomies.terms.create')->middleware($guard('terms', 'create'));
                    Route::post('taxonomies/{taxonomy:handle}/terms', 'store')->name('taxonomies.terms.store')->middleware($guard('terms', 'create'));
                    Route::get('taxonomies/{taxonomy:handle}/terms/{term}/edit', 'edit')->name('taxonomies.terms.edit')->middleware($guard('terms', 'view'));
                    // A term's short address: on to the one under its taxonomy.
                    Route::get('terms/{term}/edit', 'open')->name('terms.edit')->middleware($guard('terms', 'view'));
                    Route::put('terms/{term}', 'update')->name('terms.update')->middleware($guard('terms', 'update'));
                    Route::put('terms/{term}/content', 'content')->name('terms.content')->middleware($guard('terms', 'update'));
                    Route::post('terms/{term}/move', 'move')->name('terms.move')->middleware($guard('terms', 'update'));
                    Route::delete('terms/{term}', 'destroy')->name('terms.destroy')->middleware($guard('terms', 'delete'));
                    Route::post('terms/{term}/restore', 'restore')->name('terms.restore')->middleware($guard('terms', 'delete'))->withTrashed();
                    Route::delete('terms/{term}/force', 'forceDelete')->name('terms.force-delete')->middleware($guard('terms', 'delete'))->withTrashed();
                });
                Route::controller(EntryController::class)->group(function () use ($guard): void {
                    // Every collection's: on to the first one's.
                    Route::get('entries', 'home')->name('entries.index')->middleware($guard('entries', 'view'));
                    Route::get('entries/picker', 'picker')->name('entries.picker')->middleware($guard('entries', 'view'));
                    // The command palette's search ($panel->commandSearch()).
                    Route::get('entries/search', 'search')->name('entries.search')->middleware($guard('entries', 'view'));
                    Route::get('collections/{collection:handle}/entries', 'index')->name('collections.entries.index')->middleware($guard('entries', 'view'));
                    Route::get('collections/{collection:handle}/entries/create', 'create')->name('collections.entries.create')->middleware($guard('entries', 'create'));
                    Route::post('collections/{collection:handle}/entries', 'store')->name('collections.entries.store')->middleware($guard('entries', 'create'));
                    Route::get('collections/{collection:handle}/entries/{entry}/edit', 'edit')->name('collections.entries.edit')->middleware($guard('entries', 'view'))->withTrashed();
                    // An entry's short address: on to the one under its collection.
                    Route::get('entries/{entry}/edit', 'open')->name('entries.edit')->middleware($guard('entries', 'view'))->withTrashed();
                    Route::put('entries/{entry}', 'update')->name('entries.update')->middleware($guard('entries', 'update'));
                    Route::post('entries/{entry}/publish', 'publish')->name('entries.publish')->middleware($guard('entries', 'publish'));
                    Route::post('entries/{entry}/review', 'requestReview')->name('entries.review')->middleware($guard('entries', 'update'));
                    Route::post('entries/{entry}/review/withdraw', 'withdrawReview')->name('entries.review.withdraw')->middleware($guard('entries', 'update'));
                    Route::post('entries/{entry}/review/send-back', 'sendBackReview')->name('entries.review.send-back')->middleware($guard('entries', 'publish'));
                    Route::post('entries/{entry}/homepage', 'homepage')->name('entries.homepage')->middleware(['can:cms.homepage', $guard('entries', 'view')]);
                    Route::post('entries/{entry}/unpublish', 'unpublish')->name('entries.unpublish')->middleware($guard('entries', 'publish'));
                    Route::delete('entries/{entry}', 'destroy')->name('entries.destroy')->middleware($guard('entries', 'delete'));
                    Route::post('entries/{entry}/restore', 'restore')->name('entries.restore')->middleware($guard('entries', 'delete'))->withTrashed();
                    Route::post('entries/{entry}/translations', 'addTranslation')->name('entries.translations.store')->middleware($guard('entries', 'add-translation'));
                    Route::delete('entries/{entry}/translations/{locale}', 'removeTranslation')->name('entries.translations.destroy')->middleware($guard('entries', 'delete'));
                    Route::post('entries/{entry}/translations/{locale}/translate', 'translate')->name('entries.translations.translate')->middleware($guard('entries', 'update'));
                    Route::post('entries/{entry}/revisions/{revision}/restore', 'restoreRevision')->name('entries.revisions.restore')->middleware($guard('entries', 'update'));
                    Route::get('entries/{entry}/revisions/{revision}/compare', 'compareRevision')->name('entries.revisions.compare')->middleware($guard('entries', 'view'));
                });
                Route::name('collections.listing.')->controller(ListingController::class)->group(function () use ($guard): void {
                    Route::get('collections/{collection:handle}/listing/edit', 'edit')->name('edit')->middleware($guard('entries', 'view'));
                    Route::put('collections/{collection:handle}/listing', 'update')->name('update')->middleware($guard('entries', 'update'));
                });
                Route::controller(EntryManageController::class)->group(function () use ($guard): void {
                    Route::post('collections/{collection:handle}/entries/bulk', 'bulk')->name('collections.entries.bulk')->middleware($guard('entries', 'view'));
                    Route::get('collections/{collection:handle}/entries/export', 'export')->name('collections.entries.export')->middleware($guard('entries', 'export'));
                    Route::post('entries/reorder', 'reorder')->name('entries.reorder')->middleware($guard('entries', 'update'));
                    Route::post('entries/{entry}/duplicate', 'duplicate')->name('entries.duplicate')->middleware($guard('entries', 'create'));
                    Route::put('entries/{entry}/settings', 'settings')->name('entries.settings')->middleware($guard('entries', 'update'));
                    Route::post('entries/{entry}/move', 'move')->name('entries.move')->middleware($guard('entries', 'update'));
                    Route::delete('entries/{entry}/force', 'forceDelete')->name('entries.force-delete')->middleware($guard('entries', 'delete'))->withTrashed();
                    Route::post('entries/{entry}/translations/{locale}/undo-restore', 'undoRestore')->name('entries.translations.undo-restore')->middleware($guard('entries', 'update'));
                });
            });
        });
        $panel->tools(
            Ai\ListEntries::class, Ai\GetEntry::class, Ai\SaveEntry::class, Ai\PublishEntry::class, Ai\UnpublishEntry::class,
            Ai\TranslateEntry::class, Ai\TrashEntry::class, Ai\ManageEntry::class, Ai\EntryRevisions::class, Ai\Reorder::class,
            Ai\ListTerms::class, Ai\SaveTerm::class, Ai\GetGlobals::class, Ai\SaveGlobals::class,
            Ai\GetListing::class, Ai\SaveListing::class, Ai\GetMenu::class, Ai\SaveMenu::class,
            Ai\ListSubmissions::class, Ai\DeleteSubmissions::class,
            Ai\GetBlueprint::class, Ai\SaveBlueprint::class, Ai\FieldTypes::class,
            Ai\SeoAudit::class, Ai\RenderPage::class, Ai\GetTemplateGuide::class, Ai\ReadTemplate::class, Ai\WriteTemplate::class,
        )->aiInstructions(<<<'MD'
            Content (the CMS): collections are kinds of content (pages, articles); each has a blueprint (its fields) and entries. An entry has a translation per language (title, slug, fields, SEO), edited as a draft and published to the site. Taxonomies hold terms; globals are site-wide values; menus are navigation; templates are Blade views.
            - Find entries with cms_list_entries (no arguments lists the collections); read one with cms_get_entry, which shows its fields.
            - Write with cms_save_entry (only what you send changes): it saves the draft; the site changes only when it's published (cms_publish_entry, or "publish": true). Ask before publishing, unpublishing, trashing or deleting.
            - Lifecycle: cms_trash_entry, then cms_manage_entry (permanently delete, duplicate, set as the homepage); cms_entry_revisions lists, shows and restores published versions.
            - Order: cms_reorder for entries (collections with Manual order), terms and menu items.
            - Other languages: cms_translate_entry adds one, then save it with "locale". Only translatable fields have a value per language; the rest are shared with the main language. The same for terms, globals and listing pages.
            - Media fields take ids from list_media (upload_media adds files; give images alt text); terms fields ids from cms_list_terms; entries fields entry ids.
            - Live as soon as saved (ask first): globals (cms_get_globals, cms_save_globals), listing pages (cms_get_listing, cms_save_listing), menus (cms_get_menu, cms_save_menu).
            - Structure: cms_field_types, then cms_get_blueprint and cms_save_blueprint; collections, taxonomies, global sets, menus, redirects and forms themselves are resources (list_records, save_record).
            - Forms: cms_list_submissions, cms_delete_submissions (ask first).
            - SEO: cms_seo_audit, then fix with cms_save_entry ("seo") and update_media (alt text).
            - Templates: read cms_get_template_guide first, then cms_read_template / cms_write_template, and check pages with cms_render_page.
            MD);
        // The CMS's developer docs (docs/) for Help → Docs and read_docs, and its user guide (guide/), shipped with the package.
        $panel->docs('CMS', dirname(__DIR__).'/docs');
        $panel->guide('Website', dirname(__DIR__).'/guide');
        // One editor at a time per entry, global set or term page, per language (useEditLock).
        $panel->lockable('cms.entry', fn (string $id, string $locale, Authorizable $user): bool => ($entry = Entry::query()->whereHas('collection')->find($id)) !== null
            && Access::entries($user, 'update', $entry->collection, $entry, $locale));
        $panel->lockable('cms.global', fn (string $id, string $locale, Authorizable $user): bool => $user->can('cms.globals.update')
            && GlobalSet::query()->whereKey($id)->exists());
        $panel->lockable('cms.term', fn (string $id, string $locale, Authorizable $user): bool => ($term = Term::query()->whereHas('taxonomy')->find($id)) !== null
            && Access::terms($user, 'update', $term->taxonomy));
        // Deleting a user: what happens to their entries and comments (DeleteUser).
        $panel->userContent('cms.entries', 'entries',
            fn (Model $user): int => ReleaseUserContent::entries($user),
            fn (Model $user, string $mode, ?Model $heir) => app(ReleaseUserContent::class)->handleEntries($user, $mode, $heir));
        $panel->userContent('cms.comments', 'comments',
            fn (Model $user): int => ReleaseUserContent::comments($user),
            fn (Model $user, string $mode, ?Model $heir) => app(ReleaseUserContent::class)->handleComments($user, $mode, $heir));
        // The dashboard: content per collection, recent edits, comments waiting, what's coming up, submissions.
        $panel->widgets(...DashboardWidgets::all());
        // Getting these is worth an alert: site-wide scripts, and the shape of all content.
        $panel->privilegedPermissions('cms.settings.code', 'cms.blueprints.create', 'cms.blueprints.update', 'cms.blueprints.delete', 'cms.fieldsets.create', 'cms.fieldsets.update', 'cms.fieldsets.delete');
        // Cmd/Ctrl+K finds entries on every panel page, not only where the CMS's bundle has loaded.
        $panel->commandSearch('cms.entries', fn (): string => route('sunrice.admin.cms.entries.search'));
        $panel->bundle(PluginBundle::make('cms')->named('Sunrice CMS')->module(self::asset('admin.js'))->style(self::asset('admin.css'))->pages('Cms/')
            ->publishedFrom(dirname(__DIR__).'/dist', public_path(self::ASSETS)));
        if ($this->fieldTypes !== []) {
            $types = $this->fieldTypes;
            // Only when something needs field types.
            app()->resolved(FieldTypes::class)
                ? app(FieldTypes::class)->register(...$types)
                : app()->afterResolving(FieldTypes::class, fn (FieldTypes $registry) => $registry->register(...$types));
        }
    }

    /** @var array<string, string|null> the built files' versions, once per process */
    private static array $versions = [];

    /** A published asset's URL, versioned by the built file (looked at once per process) so browsers fetch a new one after an update. */
    private static function asset(string $file): string
    {
        if (! array_key_exists($file, self::$versions)) {
            $stat = @stat(dirname(__DIR__)."/dist/{$file}");
            self::$versions[$file] = $stat === false ? null : substr(md5($stat['mtime'].$stat['size']), 0, 12);
        }
        $version = self::$versions[$file];

        return asset(self::ASSETS."/{$file}").($version === null ? '' : "?v={$version}");
    }
}
