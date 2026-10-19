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
use RuntimeException;
use Spatie\Honeypot\ProtectAgainstSpam;
use Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests;
use Spatie\ResponseCache\Middlewares\CacheResponse;
use Spatie\ResponseCache\Serializers\JsonSerializer;
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
            Types\FileField::class,
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
            $blade->component(View\Components\Search::class, 'sunrice-cms::search');
        });
        if (! class_exists('Cms')) {
            AliasLoader::getInstance()->alias('Cms', Content::class);
        }
        // The media library's "Used by" (MediaUsages), kept on every save.
        EntryTranslation::saved(fn (EntryTranslation $translation) => Support\MediaUsage::entry($translation));
        EntryTranslation::deleted(fn (EntryTranslation $translation) => app(MediaUsages::class)->forget('cms.entry', (string) $translation->entry_id, $translation->locale));
        GlobalValue::saved(fn (GlobalValue $value) => Support\MediaUsage::global($value));
        $this->pageCache();
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
        // Per visitor (IP address) and form, at the form's own limit.
        RateLimiter::for('sunrice-forms', function (Request $request): Limit {
            $form = $request->route('form');
            $form = is_string($form) ? Models\Form::query()->where('handle', $form)->first() : ($form instanceof Models\Form ? $form : null);
            $perMinute = $form?->perMinute() ?? (new Models\Form)->perMinute();

            return Limit::perMinute($perMinute)->by('sunrice-forms|'.($form->handle ?? '').'|'.$request->ip());
        });
        if (! $this->app->routesAreCached()) {
            $this->siteRoutes();
        }
        if ($this->app->runningInConsole()) {
            $this->commands([Console\PublishScheduledCommand::class]);
            $this->callAfterResolving(Schedule::class, function (Schedule $schedule): void {
                $schedule->command('sunrice:publish-scheduled')->everyMinute()->withoutOverlapping();
                // Old form submissions and their files (sunrice-cms.forms.prune_after_days).
                $schedule->command('model:prune', ['--model' => [Models\Submission::class]])->daily();
            });
            $this->publishes([dirname(__DIR__).'/config/sunrice-cms.php' => config_path('sunrice-cms.php')], 'sunrice-cms-config');
            // Also "laravel-assets", which Laravel apps publish on every composer update.
            $this->publishes([dirname(__DIR__).'/dist' => public_path(CmsPlugin::ASSETS)], ['sunrice-cms-assets', 'laravel-assets']);
        }
    }

    /** The whole-page cache's settings for responsecache, unless the app chose its own. */
    private function pageCache(): void
    {
        if (! class_exists(CacheResponse::class)) {
            if (Site\PageCache::enabled()) {
                throw new RuntimeException('sunrice-cms.cache.pages needs spatie/laravel-responsecache: composer require spatie/laravel-responsecache');
            }

            return;
        }
        if (config('responsecache.cache_profile', CacheAllSuccessfulGetRequests::class) === CacheAllSuccessfulGetRequests::class) {
            config(['responsecache.cache_profile' => Site\PageCacheProfile::class]);
        }
        if (config('responsecache.serializer', JsonSerializer::class) === JsonSerializer::class) {
            config(['responsecache.serializer' => Site\PageCacheSerializer::class]);
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
            // The whole-page cache, when spatie/laravel-responsecache is installed (on with cache.pages).
            $pages = class_exists(CacheResponse::class) ? [CacheResponse::class] : [];
            Route::get('/', [Site\SiteController::class, 'show'])->middleware([...$middleware, ...$pages])->name('sunrice.cms.home');
            // The fallback: matched after every other route, so the app's own come first.
            Route::fallback([Site\SiteController::class, 'show'])->middleware([...$middleware, ...$pages])->name('sunrice.cms.page');
        }
    }
}
