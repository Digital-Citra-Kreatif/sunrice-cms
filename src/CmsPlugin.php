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
use Sunrice\Cms\Http\Controllers\CommentController;
use Sunrice\Cms\Http\Controllers\EntryController;
use Sunrice\Cms\Http\Controllers\EntryManageController;
use Sunrice\Cms\Http\Controllers\FieldsetController;
use Sunrice\Cms\Http\Controllers\GlobalsController;
use Sunrice\Cms\Http\Controllers\ListingController;
use Sunrice\Cms\Http\Controllers\MenuController;
use Sunrice\Cms\Http\Controllers\SubmissionController;
use Sunrice\Cms\Http\Controllers\TermController;
use Sunrice\Cms\Http\Middleware\AuthorizeContent;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Settings\CodeSettings;
use Sunrice\Cms\Settings\CommentSettings;
use Sunrice\Cms\Settings\LocaleSettings;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Access;

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
        $panel->settings(SiteSettings::class, LocaleSettings::class, CodeSettings::class, CommentSettings::class);
        // Each permission for one collection, taxonomy or form too (see Support\Access).
        $panel->permissionsUsing(fn (): array => Support\ScopedPermissions::all());
        // sunrice:roles: people who write and look after the content, not the structure or the people.
        $panel->defaultRole('editor', [Panel::ACCESS, 'sunrice.media.*', 'cms.entries.*', 'cms.terms.*', 'cms.globals.*', 'cms.menus.view', 'cms.menus.update', 'cms.comments.*', 'cms.submissions.view', 'cms.submissions.export', 'cms.homepage']);
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
            Permission::make('cms.entries.translate', 'Edit entries\' other languages (not the main one)', 'Content'),
            Permission::make('cms.entries.view-drafts', 'See unpublished changes on the site while signed in', 'Content'),
            Permission::make('cms.terms.manage', 'Manage terms', 'Content'),
            Permission::make('cms.globals.view', 'View globals', 'Content'),
            Permission::make('cms.globals.update', 'Edit globals', 'Content'),
            Permission::make('cms.comments.view', 'View comments', 'Content'),
            Permission::make('cms.comments.moderate', 'Approve, answer and edit comments, mark spam', 'Content'),
            Permission::make('cms.comments.delete', 'Trash and delete comments', 'Content'),
            Permission::make('cms.submissions.view', 'View form submissions', 'Content'),
            Permission::make('cms.submissions.export', 'Export form submissions as CSV', 'Content'),
            Permission::make('cms.submissions.delete', 'Delete form submissions', 'Content'),
            Permission::make('cms.homepage', 'Choose the homepage (from a live page\'s editor)', 'Content'),
            Permission::make('cms.blueprints.manage', 'Manage blueprints and fieldsets', 'Content structure'),
        );
        $panel->navigation(
            NavigationItem::make('cms-entries')->label('Entries')->url('cms/entries')->icon('file-text')
                ->group('Content')->sort(10)->visible(fn (Authorizable $user): bool => Access::entries($user, 'view')),
            NavigationItem::make('cms-terms')->label('Terms')->url('cms/terms')->icon('tags')
                ->group('Content')->sort(20)->visible(fn (Authorizable $user): bool => Access::terms($user)),
            NavigationItem::make('cms-globals')->label('Globals')->url('cms/globals')->icon('globe')
                ->group('Content')->sort(30)->permission('cms.globals.view'),
            NavigationItem::make('cms-menus')->label('Menus')->url('cms/menus')->icon('list-tree')
                ->group('Content')->sort(40)->permission('cms.menus.view'),
            NavigationItem::make('cms-comments')->label('Comments')->url('cms/comments')->icon('message-square')
                ->group('Content')->sort(45)->permission('cms.comments.view'),
            NavigationItem::make('cms-submissions')->label('Submissions')->url('cms/submissions')->icon('inbox')
                ->group('Content')->sort(50)->visible(fn (Authorizable $user): bool => Access::submissions($user, 'view')),
            NavigationItem::make('cms-blueprints')->label('Blueprints')->url('cms/blueprints')->icon('layout-template')
                ->group('Structure')->sort(91)->permission('cms.blueprints.manage'),
            NavigationItem::make('cms-fieldsets')->label('Fieldsets')->url('cms/fieldsets')->icon('blocks')
                ->group('Structure')->sort(92)->permission('cms.blueprints.manage'),
        );
        $panel->routes(function (): void {
            Route::middleware('can:cms.blueprints.manage')->prefix('cms')->name('cms.')->group(function (): void {
                Route::resource('blueprints', BlueprintController::class)->except('show');
                Route::resource('fieldsets', FieldsetController::class)->except('show');
            });
            Route::prefix('cms')->name('cms.menus.')->controller(MenuController::class)->group(function (): void {
                Route::get('menus', 'index')->name('index')->middleware('can:cms.menus.view');
                Route::get('menus/{menu:handle}', 'edit')->name('edit')->middleware('can:cms.menus.view');
                Route::put('menus/{menu:handle}', 'update')->name('update')->middleware('can:cms.menus.update');
            });
            Route::prefix('cms')->name('cms.comments.')->controller(CommentController::class)->group(function (): void {
                Route::get('comments', 'index')->name('index')->middleware('can:cms.comments.view');
                Route::post('comments/bulk', 'bulk')->name('bulk')->middleware('can:cms.comments.view');
                Route::post('comments/{comment}/status', 'status')->name('status')->middleware('can:cms.comments.moderate');
                Route::post('comments/{comment}/reply', 'reply')->name('reply')->middleware('can:cms.comments.moderate');
                Route::put('comments/{comment}', 'update')->name('update')->middleware('can:cms.comments.moderate');
                Route::delete('comments/{comment}', 'destroy')->name('destroy')->middleware('can:cms.comments.delete');
                Route::post('comments/{comment}/restore', 'restore')->name('restore')->middleware('can:cms.comments.delete')->withTrashed();
                Route::delete('comments/{comment}/force', 'forceDelete')->name('force')->middleware('can:cms.comments.delete')->withTrashed();
            });
            Route::prefix('cms')->name('cms.submissions.')->controller(SubmissionController::class)->group(function (): void {
                Route::get('submissions', 'home')->name('home')->middleware(AuthorizeContent::class.':submissions,view');
                Route::get('forms/{form:handle}/submissions', 'index')->name('index')->middleware(AuthorizeContent::class.':submissions,view');
                Route::get('forms/{form:handle}/submissions/export', 'export')->name('export')->middleware(AuthorizeContent::class.':submissions,export');
                Route::delete('submissions/{submission}', 'destroy')->name('destroy')->middleware(AuthorizeContent::class.':submissions,delete');
                Route::get('submissions/{submission}/files/{field}', 'file')->name('file')->middleware(AuthorizeContent::class.':submissions,view');
            });
            Route::prefix('cms')->name('cms.globals.')->controller(GlobalsController::class)->group(function (): void {
                Route::get('globals', 'index')->name('index')->middleware('can:cms.globals.view');
                Route::get('globals/{set:handle}', 'edit')->name('edit')->middleware('can:cms.globals.view');
                Route::put('globals/{set:handle}', 'update')->name('update')->middleware('can:cms.globals.update');
            });
            Route::prefix('cms')->name('cms.terms.')->controller(TermController::class)->middleware(AuthorizeContent::class.':terms')->group(function (): void {
                Route::get('terms', 'home')->name('home');
                Route::get('taxonomies/{taxonomy:handle}/terms', 'index')->name('index');
                Route::post('taxonomies/{taxonomy:handle}/terms', 'store')->name('store');
                Route::put('terms/{term}', 'update')->name('update');
                Route::post('terms/{term}/move', 'move')->name('move');
                Route::post('terms/reorder', 'reorder')->name('reorder');
                Route::delete('terms/{term}', 'destroy')->name('destroy');
                Route::post('terms/{term}/restore', 'restore')->name('restore')->withTrashed();
                Route::delete('terms/{term}/force', 'forceDelete')->name('force-delete')->withTrashed();
                Route::get('terms/{term}/edit', 'edit')->name('edit');
                Route::put('terms/{term}/content', 'content')->name('content');
            });
            Route::prefix('cms')->name('cms.entries.')->controller(EntryController::class)->group(function (): void {
                Route::get('entries', 'home')->name('home')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('entry-picker', 'picker')->name('picker')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('entry-search', 'search')->name('search')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('term-picker', 'termPicker')->name('term-picker')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('collections/{collection:handle}/entries', 'index')->name('index')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('collections/{collection:handle}/entries/create', 'create')->name('create')->middleware(AuthorizeContent::class.':entries,create');
                Route::post('collections/{collection:handle}/entries', 'store')->name('store')->middleware(AuthorizeContent::class.':entries,create');
                Route::get('entries/{entry}/edit', 'edit')->name('edit')->middleware(AuthorizeContent::class.':entries,view')->withTrashed();
                Route::put('entries/{entry}', 'update')->name('update')->middleware(AuthorizeContent::class.':entries,update');
                Route::post('entries/{entry}/publish', 'publish')->name('publish')->middleware(AuthorizeContent::class.':entries,publish');
                Route::post('entries/{entry}/review', 'requestReview')->name('review')->middleware(AuthorizeContent::class.':entries,update');
                Route::post('entries/{entry}/unpublish', 'unpublish')->name('unpublish')->middleware(AuthorizeContent::class.':entries,publish');
                Route::post('entries/{entry}/homepage', 'homepage')->name('homepage')->middleware(['can:cms.homepage', AuthorizeContent::class.':entries,view']);
                Route::post('entries/{entry}/date', 'date')->name('date')->middleware(AuthorizeContent::class.':entries,publish');
                Route::delete('entries/{entry}', 'destroy')->name('destroy')->middleware(AuthorizeContent::class.':entries,delete');
                Route::post('entries/{translation}/translate', 'translate')->name('translate')->middleware(AuthorizeContent::class.':entries,update');
                Route::post('entries/{entry}/translations', 'addTranslation')->name('translations.store')->middleware(AuthorizeContent::class.':entries,create');
                Route::delete('entries/{entry}/translations/{locale}', 'removeTranslation')->name('translations.destroy')->middleware(AuthorizeContent::class.':entries,delete');
                Route::post('entries/{entry}/restore', 'restore')->name('restore')->middleware(AuthorizeContent::class.':entries,delete')->withTrashed();
                Route::get('revisions/{revision}/compare', 'compareRevision')->name('revisions.compare')->middleware(AuthorizeContent::class.':entries,view');
                Route::post('revisions/{revision}/restore', 'restoreRevision')->name('revisions.restore')->middleware(AuthorizeContent::class.':entries,update');
            });
            Route::prefix('cms')->name('cms.listings.')->controller(ListingController::class)->group(function (): void {
                Route::get('collections/{collection:handle}/listing', 'edit')->name('edit')->middleware(AuthorizeContent::class.':entries,view');
                Route::put('collections/{collection:handle}/listing', 'update')->name('update')->middleware(AuthorizeContent::class.':entries,update');
            });
            Route::prefix('cms')->name('cms.entries.')->controller(EntryManageController::class)->group(function (): void {
                Route::post('collections/{collection:handle}/entries/bulk', 'bulk')->name('bulk')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('collections/{collection:handle}/entries/export', 'export')->name('export')->middleware(AuthorizeContent::class.':entries,export');
                Route::post('entries/{entry}/duplicate', 'duplicate')->name('duplicate')->middleware(AuthorizeContent::class.':entries,create');
                Route::put('entries/{entry}/settings', 'settings')->name('settings')->middleware(AuthorizeContent::class.':entries,update');
                Route::post('entries/{entry}/move', 'move')->name('move')->middleware(AuthorizeContent::class.':entries,update');
                Route::post('entries/reorder', 'reorder')->name('reorder')->middleware(AuthorizeContent::class.':entries,update');
                Route::delete('entries/{entry}/force', 'forceDelete')->name('force-delete')->middleware(AuthorizeContent::class.':entries,delete')->withTrashed();
                Route::post('entry-translations/{translation}/undo-restore', 'undoRestore')->name('undo-restore')->middleware(AuthorizeContent::class.':entries,update');
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
            - Lifecycle: cms_trash_entry, then cms_manage_entry (delete for good, duplicate, set as the homepage); cms_entry_revisions lists, shows and restores published versions.
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
            && Access::terms($user, $term->taxonomy));
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
        $panel->privilegedPermissions('cms.settings.code', 'cms.blueprints.manage');
        // Cmd/Ctrl+K finds entries on every panel page, not only where the CMS's bundle has loaded.
        $panel->commandSearch('cms.entries', fn (): string => route('sunrice.admin.cms.entries.search'));
        $panel->bundle(PluginBundle::make('cms')->module(self::asset('admin.js'))->style(self::asset('admin.css'))->pages('Cms/'));
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
