<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\Compilers\BladeCompiler;
use Spatie\Honeypot\ProtectAgainstSpam;
use Sunrice\Admin\Events\SettingsSaved;
use Sunrice\Admin\Media\MediaUsages;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Fields\Types;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalValue;

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
        $this->app->scoped(Support\SiteCache::class);
        $this->app->singleton(Site\PageCache::class);
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(dirname(__DIR__).'/database/migrations');
        $this->loadViewsFrom(dirname(__DIR__).'/resources/views', 'sunrice-cms');
        // <x-sunrice-cms::entries> and <x-sunrice-cms::terms> (the others are anonymous views).
        $this->callAfterResolving('blade.compiler', function (BladeCompiler $blade): void {
            $blade->component(View\Components\Entries::class, 'sunrice-cms::entries');
            $blade->component(View\Components\Terms::class, 'sunrice-cms::terms');
        });
        if (! class_exists('Cms')) {
            AliasLoader::getInstance()->alias('Cms', Content::class);
        }
        // The media library's "Used by" (MediaUsages), kept on every save.
        EntryTranslation::saved(fn (EntryTranslation $translation) => Support\MediaUsage::entry($translation));
        EntryTranslation::deleted(fn (EntryTranslation $translation) => app(MediaUsages::class)->forget('cms.entry', (string) $translation->entry_id, $translation->locale));
        GlobalValue::saved(fn (GlobalValue $value) => Support\MediaUsage::global($value));
        // Changes to what the site shows clear its caches.
        Support\ContentWatch::register();
        // A new homepage: forget the one read.
        Event::listen(SettingsSaved::class, function (SettingsSaved $event): void {
            if ($event->section === Settings\SiteSettings::key() && app()->resolved(Site\Site::class)) {
                app(Site\Site::class)->flush();
            }
        });
        // Code on every page is a way in: changing it is a security event, and alerts.
        Event::listen(SettingsSaved::class, function (SettingsSaved $event): void {
            if ($event->section === Settings\CodeSettings::key() && $event->changed !== []) {
                Support\SiteCode::changed($event->changed);
            }
        });
        RateLimiter::for('sunrice-forms', function (Request $request): Limit {
            $perMinute = config('sunrice-cms.forms.per_minute', 5);

            return Limit::perMinute(is_int($perMinute) ? $perMinute : 5)->by('sunrice-forms|'.$request->ip());
        });
        if (! $this->app->routesAreCached()) {
            $this->siteRoutes();
        }
        if ($this->app->runningInConsole()) {
            $this->commands([Console\PublishScheduledCommand::class]);
            $this->callAfterResolving(Schedule::class, function (Schedule $schedule): void {
                $schedule->command('sunrice:publish-scheduled')->everyMinute()->withoutOverlapping();
            });
            $this->publishes([dirname(__DIR__).'/config/sunrice-cms.php' => config_path('sunrice-cms.php')], 'sunrice-cms-config');
            // Also "laravel-assets", which Laravel apps publish on every composer update.
            $this->publishes([dirname(__DIR__).'/dist' => public_path(CmsPlugin::ASSETS)], ['sunrice-cms-assets', 'laravel-assets']);
        }
    }

    private function siteRoutes(): void
    {
        $middleware = config('sunrice-cms.site.middleware', ['web']);
        $middleware = is_array($middleware) ? array_values(array_filter($middleware, is_string(...))) : ['web'];
        Route::middleware([...$middleware, 'throttle:sunrice-forms', ProtectAgainstSpam::class, Site\RequireHoneypot::class])
            ->post('forms/{form:handle}', Site\FormController::class)->name('sunrice.cms.forms.submit');
        Route::middleware([...$middleware, 'signed'])->get('cms-preview/{translation}', [Site\SiteController::class, 'preview'])->name('sunrice.cms.preview');
        if (config('sunrice-cms.site.enabled', true) === true) {
            Route::middleware($middleware)->get('sitemap.xml', Site\SitemapController::class)->name('sunrice.cms.sitemap');
            // The homepage: the fallback doesn't match /. An app's own / route, loaded later, replaces it.
            Route::get('/', [Site\SiteController::class, 'show'])->middleware([...$middleware, Site\PageCache::class])->name('sunrice.cms.home');
            // The fallback: matched after every other route, so the app's own come first.
            Route::fallback([Site\SiteController::class, 'show'])->middleware([...$middleware, Site\PageCache::class])->name('sunrice.cms.page');
        }
    }
}
