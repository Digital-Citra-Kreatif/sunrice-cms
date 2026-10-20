<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;
use Sunrice\Admin\Assets\PluginBundle;
use Sunrice\Admin\BasePlugin;
use Sunrice\Admin\Help\HelpSection;
use Sunrice\Admin\Navigation\NavigationItem;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Permissions\Permission;
use Sunrice\Admin\Users\OwnedContent;
use Sunrice\Cms\Admin\CollectionResource;
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
use Sunrice\Cms\Settings\CodeSettings;
use Sunrice\Cms\Settings\CommentSettings;
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
        $panel->settings(SiteSettings::class, CodeSettings::class, CommentSettings::class);
        // Each permission for one collection, taxonomy or form too (see Support\Access).
        $panel->permissionsUsing(fn (): array => Support\ScopedPermissions::all());
        // sunrice:roles: people who write and look after the content, not the structure or the people.
        $panel->defaultRole('editor', [Panel::ACCESS, 'sunrice.media.*', 'cms.entries.*', 'cms.terms.*', 'cms.globals.*', 'cms.menus.*', 'cms.comments.*', 'cms.submissions.view']);
        // Writes entries, publishes nothing, and edits only their own.
        $panel->defaultRole('author', [Panel::ACCESS, 'sunrice.media.view', 'sunrice.media.upload', 'cms.entries.view', 'cms.entries.create', 'cms.entries.update-own', 'cms.entries.delete-own']);
        // Writes the other languages of every entry.
        $panel->defaultRole('translator', [Panel::ACCESS, 'sunrice.media.view', 'cms.entries.view', 'cms.entries.translate']);
        $panel->resources(CollectionResource::class, TaxonomyResource::class, GlobalSetResource::class, MenuResource::class, RedirectResource::class, FormResource::class);
        $panel->permissions(
            Permission::make('cms.entries.view', 'View entries', 'Content'),
            Permission::make('cms.entries.create', 'Create entries', 'Content'),
            Permission::make('cms.entries.update', 'Edit drafts', 'Content'),
            Permission::make('cms.entries.publish', 'Publish and unpublish entries', 'Content'),
            Permission::make('cms.entries.delete', 'Trash and restore entries', 'Content'),
            Permission::make('cms.entries.update-own', 'Edit drafts of their own entries', 'Content'),
            Permission::make('cms.entries.delete-own', 'Trash their own entries', 'Content'),
            Permission::make('cms.entries.translate', 'Edit entries\' other languages (not the main one)', 'Content'),
            Permission::make('cms.terms.manage', 'Manage terms', 'Content'),
            Permission::make('cms.globals.view', 'View globals', 'Content'),
            Permission::make('cms.globals.update', 'Edit globals', 'Content'),
            Permission::make('cms.comments.view', 'View comments', 'Content'),
            Permission::make('cms.comments.moderate', 'Approve, answer and edit comments, mark spam', 'Content'),
            Permission::make('cms.comments.delete', 'Trash and delete comments', 'Content'),
            Permission::make('cms.submissions.view', 'View and export form submissions', 'Content'),
            Permission::make('cms.submissions.delete', 'Delete form submissions', 'Content'),
            Permission::make('cms.blueprints.manage', 'Manage blueprints and fieldsets', 'Content structure'),
        );
        $panel->dashboardCards(...Admin\DashboardCards::all());
        $panel->help(HelpSection::make('content', 'Content', dirname(__DIR__).'/guide', 20));
        // Entries people wrote go to whoever deletes their account.
        $panel->ownedContent(OwnedContent::make('cms.entries')->label('entries', 'entry')
            ->count(fn (Model $user): int => Entry::withTrashed()->where('author_id', $user->getKey())->count())
            ->handOver(function (Model $from, Model $to): void {
                Entry::withTrashed()->where('author_id', $from->getKey())->update(['author_id' => $to->getKey()]);
            }));
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
                Route::get('forms/{form:handle}/submissions/export', 'export')->name('export')->middleware(AuthorizeContent::class.':submissions,view');
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
                Route::delete('terms/{term}', 'destroy')->name('destroy');
                Route::post('terms/{term}/restore', 'restore')->name('restore')->withTrashed();
                Route::delete('terms/{term}/force', 'forceDelete')->name('force-delete')->withTrashed();
                Route::get('terms/{term}/edit', 'edit')->name('edit');
                Route::put('terms/{term}/content', 'content')->name('content');
            });
            Route::prefix('cms')->name('cms.entries.')->controller(EntryController::class)->group(function (): void {
                Route::get('entries', 'home')->name('home')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('entry-picker', 'picker')->name('picker')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('collections/{collection:handle}/entries', 'index')->name('index')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('collections/{collection:handle}/entries/create', 'create')->name('create')->middleware(AuthorizeContent::class.':entries,create');
                Route::post('collections/{collection:handle}/entries', 'store')->name('store')->middleware(AuthorizeContent::class.':entries,create');
                Route::get('entries/{entry}/edit', 'edit')->name('edit')->middleware(AuthorizeContent::class.':entries,view')->withTrashed();
                Route::put('entries/{entry}', 'update')->name('update')->middleware(AuthorizeContent::class.':entries,update');
                Route::post('entries/{entry}/publish', 'publish')->name('publish')->middleware(AuthorizeContent::class.':entries,publish');
                Route::post('entries/{entry}/unpublish', 'unpublish')->name('unpublish')->middleware(AuthorizeContent::class.':entries,publish');
                Route::delete('entries/{entry}', 'destroy')->name('destroy')->middleware(AuthorizeContent::class.':entries,delete');
                Route::post('entries/{entry}/translations', 'addTranslation')->name('translations.store')->middleware(AuthorizeContent::class.':entries,create');
                Route::delete('entries/{entry}/translations/{locale}', 'removeTranslation')->name('translations.destroy')->middleware(AuthorizeContent::class.':entries,delete');
                Route::post('entries/{entry}/restore', 'restore')->name('restore')->middleware(AuthorizeContent::class.':entries,delete')->withTrashed();
                Route::post('revisions/{revision}/restore', 'restoreRevision')->name('revisions.restore')->middleware(AuthorizeContent::class.':entries,update');
            });
            Route::prefix('cms')->name('cms.listings.')->controller(ListingController::class)->group(function (): void {
                Route::get('collections/{collection:handle}/listing', 'edit')->name('edit')->middleware(AuthorizeContent::class.':entries,view');
                Route::put('collections/{collection:handle}/listing', 'update')->name('update')->middleware(AuthorizeContent::class.':entries,update');
            });
            Route::prefix('cms')->name('cms.entries.')->controller(EntryManageController::class)->group(function (): void {
                Route::post('collections/{collection:handle}/entries/bulk', 'bulk')->name('bulk')->middleware(AuthorizeContent::class.':entries,view');
                Route::get('collections/{collection:handle}/entries/export', 'export')->name('export')->middleware(AuthorizeContent::class.':entries,view');
                Route::post('entries/{entry}/duplicate', 'duplicate')->name('duplicate')->middleware(AuthorizeContent::class.':entries,create');
                Route::put('entries/{entry}/settings', 'settings')->name('settings')->middleware(AuthorizeContent::class.':entries,update');
                Route::post('entries/{entry}/move', 'move')->name('move')->middleware(AuthorizeContent::class.':entries,update');
                Route::delete('entries/{entry}/force', 'forceDelete')->name('force-delete')->middleware(AuthorizeContent::class.':entries,delete')->withTrashed();
                Route::post('entry-translations/{translation}/undo-restore', 'undoRestore')->name('undo-restore')->middleware(AuthorizeContent::class.':entries,update');
            });
        });
        $panel->tools(
            Ai\ListEntries::class, Ai\GetEntry::class, Ai\SaveEntry::class, Ai\PublishEntry::class, Ai\UnpublishEntry::class,
            Ai\TranslateEntry::class, Ai\TrashEntry::class, Ai\ListTerms::class, Ai\SaveTerm::class,
            Ai\GetGlobals::class, Ai\SaveGlobals::class, Ai\ListSubmissions::class, Ai\DeleteSubmissions::class,
            Ai\GetSiteInfo::class, Ai\SeoAudit::class, Ai\EntryRevisions::class, Ai\MoveEntry::class,
            Ai\GetBlueprint::class, Ai\SaveBlueprint::class, Ai\GetMenu::class, Ai\SaveMenu::class, Ai\GetListing::class, Ai\SaveListing::class,
        )->aiInstructions(<<<'MD'
            Content (the CMS): collections hold entries, written per language as drafts and published to the site.
            - Start with cms_get_site_info: the languages, collections, taxonomies, menus and forms.
            - Find entries with cms_list_entries (no arguments lists the collections), read one with cms_get_entry, which shows its fields.
            - Write with cms_save_entry: it saves the draft; the site changes only when it's published (cms_publish_entry, or "publish": true). Ask before publishing, unpublishing or trashing.
            - Other languages: cms_translate_entry copies the main language into a new draft; then save it with "locale".
            - Media fields take ids from list_media; terms fields ids from cms_list_terms; entries fields entry ids.
            - Site-wide values: cms_get_globals and cms_save_globals. Form submissions: cms_list_submissions, cms_delete_submissions.
            - Menu links: cms_get_menu and cms_save_menu. Listing pages: cms_get_listing and cms_save_listing.
            - Published versions: cms_entry_revisions (and "restore"). Manual order: cms_move_entry. SEO problems: cms_seo_audit.
            - Fields of collections and fieldsets: cms_get_blueprint and cms_save_blueprint.
            - Collections, taxonomies, global sets, menus, redirects and forms themselves are resources (list_records, save_record).
            - Templates, if you have the view tools (list_views): an entry's page uses its own or its collection's template, else the view cms.{collection handle}, else cms.entry; listing pages cms.{handle}-listing or cms.listing; term pages cms.taxonomy-{handle} or cms.term; search cms.search. They get $entry, $title, $values (the fields), $collection, $locale and $preview; print rich text with {!! $values['body'] !!} and everything else with {{ }}. Put <x-sunrice-cms::seo /> in the layout's <head>. Fields' handles come from cms_get_blueprint.
            MD);
        // One editor at a time per entry or global set, per language (useEditLock).
        $panel->lockable('cms.entry', fn (string $id, string $locale, Authorizable $user): bool => ($entry = Entry::query()->whereHas('collection')->find($id)) !== null
            && Access::entries($user, 'update', $entry->collection, $entry, $locale));
        $panel->lockable('cms.global', fn (string $id, string $locale, Authorizable $user): bool => $user->can('cms.globals.update')
            && GlobalSet::query()->whereKey($id)->exists());
        $panel->bundle(PluginBundle::make('cms')->module(self::asset('admin.js'))->style(self::asset('admin.css'))->pages('Cms/'));
        if ($this->fieldTypes !== []) {
            $types = $this->fieldTypes;
            // Only when something needs field types.
            app()->resolved(FieldTypes::class)
                ? app(FieldTypes::class)->register(...$types)
                : app()->afterResolving(FieldTypes::class, fn (FieldTypes $registry) => $registry->register(...$types));
        }
    }

    /** A published asset's URL, versioned by the built file so browsers fetch a new one after an update. */
    private static function asset(string $file): string
    {
        $built = dirname(__DIR__)."/dist/{$file}";
        $version = is_file($built) ? substr(md5((string) filemtime($built).filesize($built)), 0, 12) : null;

        return asset(self::ASSETS."/{$file}").($version === null ? '' : "?v={$version}");
    }
}
