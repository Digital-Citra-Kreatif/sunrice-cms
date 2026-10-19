<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Fields\Types;

/**
 * Boots the CMS. The CMS is added to a panel as a plugin (CmsPlugin);
 * this provider registers what exists without the panel: content, its
 * field types and the site side.
 *
 * @api
 */
final class CmsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(dirname(__DIR__).'/config/sunrice-cms.php', 'sunrice-cms');
        $this->app->singleton(FieldTypes::class, fn (): FieldTypes => (new FieldTypes)->register(
            Types\Text::class,
            Types\Textarea::class,
            Types\RichText::class,
            Types\Number::class,
            Types\Toggle::class,
            Types\Select::class,
            Types\Date::class,
            Types\Link::class,
            Types\MediaField::class,
            Types\Group::class,
            Types\Repeater::class,
            Types\Flexible::class,
            Types\FieldsetInclude::class,
            Types\TermsField::class,
            Types\EntriesField::class,
        ));
        // Loaded once per request (or job).
        $this->app->scoped(Fieldsets::class);
        $this->app->scoped(Globals::class);
        $this->app->scoped(Menus::class);
        $this->app->scoped(Site\Site::class);
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(dirname(__DIR__).'/database/migrations');
        $this->loadViewsFrom(dirname(__DIR__).'/resources/views', 'sunrice-cms');
        if (! class_exists('Cms')) {
            AliasLoader::getInstance()->alias('Cms', Content::class);
        }
        if (! $this->app->routesAreCached()) {
            $this->siteRoutes();
        }
        if ($this->app->runningInConsole()) {
            $this->publishes([dirname(__DIR__).'/config/sunrice-cms.php' => config_path('sunrice-cms.php')], 'sunrice-cms-config');
            // Also "laravel-assets", which Laravel apps publish on every composer update.
            $this->publishes([dirname(__DIR__).'/dist' => public_path(CmsPlugin::ASSETS)], ['sunrice-cms-assets', 'laravel-assets']);
        }
    }

    private function siteRoutes(): void
    {
        $middleware = config('sunrice-cms.site.middleware', ['web']);
        $middleware = is_array($middleware) ? array_values(array_filter($middleware, is_string(...))) : ['web'];
        Route::middleware([...$middleware, 'signed'])->get('cms-preview/{translation}', [Site\SiteController::class, 'preview'])->name('sunrice.cms.preview');
        if (config('sunrice-cms.site.enabled', true) === true) {
            Route::middleware($middleware)->get('sitemap.xml', Site\SitemapController::class)->name('sunrice.cms.sitemap');
            // The fallback: matched after every other route, so the app's own come first.
            Route::fallback([Site\SiteController::class, 'show'])->middleware($middleware)->name('sunrice.cms.page');
        }
    }
}
