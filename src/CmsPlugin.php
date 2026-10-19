<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Illuminate\Support\Facades\Route;
use Sunrice\Admin\Assets\PluginBundle;
use Sunrice\Admin\BasePlugin;
use Sunrice\Admin\Navigation\NavigationItem;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Permissions\Permission;
use Sunrice\Cms\Admin\CollectionResource;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Http\Controllers\BlueprintController;
use Sunrice\Cms\Http\Controllers\EntryController;
use Sunrice\Cms\Http\Controllers\FieldsetController;

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
        $panel->resources(CollectionResource::class);
        $panel->permissions(
            Permission::make('cms.entries.view', 'View entries', 'Content'),
            Permission::make('cms.entries.create', 'Create entries', 'Content'),
            Permission::make('cms.entries.update', 'Edit drafts', 'Content'),
            Permission::make('cms.entries.publish', 'Publish and unpublish entries', 'Content'),
            Permission::make('cms.entries.delete', 'Trash and restore entries', 'Content'),
            Permission::make('cms.blueprints.manage', 'Manage blueprints and fieldsets', 'Content structure'),
        );
        $panel->navigation(
            NavigationItem::make('cms-entries')->label('Entries')->url('cms/entries')->icon('file-text')
                ->group('Content')->sort(10)->permission('cms.entries.view'),
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
            Route::prefix('cms')->name('cms.entries.')->controller(EntryController::class)->group(function (): void {
                Route::get('entries', 'home')->name('home')->middleware('can:cms.entries.view');
                Route::get('collections/{collection:handle}/entries', 'index')->name('index')->middleware('can:cms.entries.view');
                Route::get('collections/{collection:handle}/entries/create', 'create')->name('create')->middleware('can:cms.entries.create');
                Route::post('collections/{collection:handle}/entries', 'store')->name('store')->middleware('can:cms.entries.create');
                Route::get('entries/{entry}/edit', 'edit')->name('edit')->middleware('can:cms.entries.view')->withTrashed();
                Route::put('entries/{entry}', 'update')->name('update')->middleware('can:cms.entries.update');
                Route::post('entries/{entry}/publish', 'publish')->name('publish')->middleware('can:cms.entries.publish');
                Route::post('entries/{entry}/unpublish', 'unpublish')->name('unpublish')->middleware('can:cms.entries.publish');
                Route::delete('entries/{entry}', 'destroy')->name('destroy')->middleware('can:cms.entries.delete');
                Route::post('entries/{entry}/restore', 'restore')->name('restore')->middleware('can:cms.entries.delete')->withTrashed();
                Route::post('revisions/{revision}/restore', 'restoreRevision')->name('revisions.restore')->middleware('can:cms.entries.update');
            });
        });
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
