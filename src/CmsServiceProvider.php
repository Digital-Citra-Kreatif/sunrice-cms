<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Translation\Loader;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Translation\Translator;
use Illuminate\View\Compilers\BladeCompiler;
use RuntimeException;
use Spatie\Honeypot\ProtectAgainstSpam;
use Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests;
use Spatie\ResponseCache\Hasher\DefaultHasher;
use Spatie\ResponseCache\Middlewares\CacheResponse;
use Spatie\ResponseCache\Replacers\CsrfTokenReplacer;
use Spatie\ResponseCache\Serializers\JsonSerializer;
use Sunrice\Admin\Events\SettingsSaved;
use Sunrice\Admin\Exceptions\PanelMisconfigured;
use Sunrice\Admin\Media\MediaUsages;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Fields\Types;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Models\TermTranslation;

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
        // Read by Locales all the time: once per request.
        $this->app->scoped(Settings\LocaleSettings::class);
        $this->app->singleton(Site\PageCache::class);
        $this->app->singleton(Site\SiteHooks::class);
        // Indonesian for Laravel's own lines the app hasn't got, read as they're needed.
        $this->app->extend('translation.loader', fn (Loader $loader, Application $app): Loader => Support\CoreTranslations::loader($loader, $app->make(Filesystem::class)));
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(dirname(__DIR__).'/database/migrations');
        $this->loadViewsFrom(dirname(__DIR__).'/resources/views', 'sunrice-cms');
        // What visitors read (sunrice-cms::site.*); with another loader than Laravel's, Indonesian for its own lines too.
        $this->loadTranslationsFrom(dirname(__DIR__).'/resources/lang', 'sunrice-cms');
        // The CMS's admin words in other languages (lang/{code}.json, English text as keys).
        $this->loadJsonTranslationsFrom(dirname(__DIR__).'/lang');
        $this->callAfterResolving('translator', function (mixed $translator): void {
            if ($translator instanceof Translator) {
                Support\CoreTranslations::register($translator);
            }
        });
        // The class components (seo and code are anonymous views).
        $this->callAfterResolving('blade.compiler', function (BladeCompiler $blade): void {
            $blade->component(View\Components\Entries::class, 'sunrice-cms::entries');
            $blade->component(View\Components\Terms::class, 'sunrice-cms::terms');
            $blade->component(View\Components\Search::class, 'sunrice-cms::search');
            $blade->component(View\Components\EntryFilter::class, 'sunrice-cms::entry-filter');
            $blade->component(View\Components\Form::class, 'sunrice-cms::form');
            $blade->component(View\Components\Comments::class, 'sunrice-cms::comments');
            // <body @bodyClass> or <body @bodyClass('dark')>: the whole class="…" attribute.
            $blade->directive('bodyClass', fn (string $extra): string => '<?php echo \'class="\'.e(\Sunrice\Cms\Content::bodyClass('.($extra === '' ? '[]' : $extra).')).\'"\'; ?>');
        });
        if (! class_exists('Cms')) {
            AliasLoader::getInstance()->alias('Cms', Content::class);
        }
        // The media library's "Used by" (MediaUsages), kept on every save.
        EntryTranslation::saved(fn (EntryTranslation $translation) => Support\MediaUsage::entry($translation));
        EntryTranslation::deleted(fn (EntryTranslation $translation) => app(MediaUsages::class)->forget('cms.entry', (string) $translation->entry_id, $translation->locale));
        GlobalValue::saved(fn (GlobalValue $value) => Support\MediaUsage::global($value));
        // Which entries and terms content points at (Support\References), kept on every save.
        EntryTranslation::saved(fn (EntryTranslation $translation) => Support\References::entry($translation));
        EntryTranslation::deleted(fn (EntryTranslation $translation) => Support\References::forget(Models\ContentReference::ENTRY, $translation->entry_id, $translation->locale));
        TermTranslation::saved(fn (TermTranslation $translation) => Support\References::term($translation));
        GlobalValue::saved(fn (GlobalValue $value) => Support\References::global($value));
        $this->pageCache();
        // ?page= past the last page of a site page's list: a 404, never a page of its own.
        Site\PageNumberWatch::pastLast();
        // An error page (the app's errors::404 and the like): <x-sunrice-cms::seo> leaves it out of search results.
        Event::listen('composing: errors::*', fn () => Support\Seo::markErrorPage());
        // A collection, taxonomy or form came or went: so do its permissions.
        foreach ([Models\Collection::class, Models\Taxonomy::class, Models\Form::class] as $class) {
            foreach (['created', 'forceDeleted', 'deleted'] as $event) {
                Event::listen("eloquent.{$event}: {$class}", fn () => Support\ScopedPermissions::sync());
            }
            // Changed or restored: the cached handles and permission labels.
            foreach (['updated', 'restored'] as $event) {
                Event::listen("eloquent.{$event}: {$class}", fn () => Support\ScopedPermissions::flush());
            }
        }
        // Changes to what the site shows clear its caches.
        Support\ContentWatch::register();
        // A new homepage: forget the one read.
        Event::listen(SettingsSaved::class, function (SettingsSaved $event): void {
            if ($event->section === Settings\SiteSettings::key() && app()->resolved(Site\Site::class)) {
                app(Site\Site::class)->flush();
            }
        });
        // Other languages: every address may have changed.
        Event::listen(SettingsSaved::class, function (SettingsSaved $event): void {
            if ($event->section === Settings\LocaleSettings::key()) {
                app()->forgetInstance(Settings\LocaleSettings::class);
                app()->forgetInstance(Site\Site::class);
                app(Support\SiteCache::class)->changed('languages');
            }
        });
        // Code on every page is a way in: changing it is a security event, and alerts.
        Event::listen(SettingsSaved::class, function (SettingsSaved $event): void {
            if ($event->section === Settings\CodeSettings::key() && $event->changed !== []) {
                Support\SiteCode::changed($event->changed);
            }
        });
        if (! $this->app->routesAreCached()) {
            $this->siteRoutes();
        }
        if ($this->app->runningInConsole()) {
            $this->commands([
                Console\PublishScheduledCommand::class, Console\RenameFieldCommand::class, Console\ExportStructureCommand::class, Console\ImportStructureCommand::class,
                Console\OrphansCommand::class, Console\ReferencesCommand::class, Console\DemoContentCommand::class, Console\SwitchMainLanguageCommand::class, Console\TranslateCommand::class,
            ]);
            $this->callAfterResolving(Schedule::class, function (Schedule $schedule): void {
                $schedule->command('sunrice:publish-scheduled')->everyMinute()->withoutOverlapping();
                // Old form submissions and their files (sunrice-cms.forms.prune_after_days).
                $schedule->command('model:prune', ['--model' => [Models\Submission::class, Models\Comment::class]])->daily();
            });
            $this->publishes([dirname(__DIR__).'/config/sunrice-cms.php' => config_path('sunrice-cms.php')], 'sunrice-cms-config');
            // Starter templates for the site, to edit freely: layout, pages, partials, error pages and a stylesheet.
            $this->publishes([
                dirname(__DIR__).'/stubs/templates' => resource_path('views/cms'),
                dirname(__DIR__).'/stubs/errors' => resource_path('views/errors'),
                dirname(__DIR__).'/stubs/public/site.css' => public_path('cms/site.css'),
            ], 'sunrice-cms-templates');
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
        // Which pages paginate: only they are kept apart by ?page=.
        Site\PageNumberWatch::register();
        if (config('responsecache.cache_profile', CacheAllSuccessfulGetRequests::class) === CacheAllSuccessfulGetRequests::class) {
            config(['responsecache.cache_profile' => Site\PageCacheProfile::class]);
        }
        if (config('responsecache.serializer', JsonSerializer::class) === JsonSerializer::class) {
            config(['responsecache.serializer' => Site\PageCacheSerializer::class]);
        }
        if (config('responsecache.hasher', DefaultHasher::class) === DefaultHasher::class) {
            config(['responsecache.hasher' => Site\PageCacheHasher::class]);
        }
        // A kept page is served to every visitor: without the replacer, they'd all get the first one's CSRF token and no form would work.
        $replacers = config('responsecache.replacers', []);
        // And their own honeypot fields: else the "sent too fast" check would count from when the page was kept.
        if (is_array($replacers) && ! in_array(Site\HoneypotReplacer::class, $replacers, true)) {
            config(['responsecache.replacers' => [...$replacers, Site\HoneypotReplacer::class]]);
        }
        if (Site\PageCache::enabled() && (! is_array($replacers) || ! in_array(CsrfTokenReplacer::class, $replacers, true))) {
            throw new PanelMisconfigured('sunrice-cms.cache.pages needs '.CsrfTokenReplacer::class.' in responsecache.replacers (config/responsecache.php): kept pages must give each visitor their own CSRF token.');
        }
    }

    private function siteRoutes(): void
    {
        $middleware = config('sunrice-cms.site.middleware', ['web']);
        $middleware = is_array($middleware) ? array_values(array_filter($middleware, is_string(...))) : ['web'];
        Route::middleware([...$middleware, ProtectAgainstSpam::class, Site\RequireHoneypot::class])
            ->post('forms/{form:handle}', Site\FormController::class)->name('sunrice.cms.forms.submit');
        Route::middleware([...$middleware, ProtectAgainstSpam::class, Site\RequireHoneypot::class])
            ->post('comments/{entry}', [Site\CommentController::class, 'store'])->name('sunrice.cms.comments.store');
        Route::middleware([...$middleware, 'signed'])->get('comments/{comment}/unsubscribe', [Site\CommentController::class, 'unsubscribe'])->name('sunrice.cms.comments.unsubscribe');
        Route::middleware([...$middleware, 'signed'])->post('comments/{comment}/unsubscribe', [Site\CommentController::class, 'confirmUnsubscribe'])->name('sunrice.cms.comments.unsubscribe.confirm');
        Route::middleware([...$middleware, 'signed'])->get('cms-preview/{translation}', [Site\SiteController::class, 'preview'])->name('sunrice.cms.preview');
        if (config('sunrice-cms.site.enabled', true) === true) {
            Route::middleware($middleware)->get('sitemap.xml', Site\SitemapController::class)->name('sunrice.cms.sitemap');
            Route::middleware($middleware)->get('sitemap-{part}.xml', [Site\SitemapController::class, 'part'])->where('part', '[1-9][0-9]{0,5}')->name('sunrice.cms.sitemap.part');
            // The homepage: the fallback doesn't match /. An app's own / route, loaded later, replaces it.
            // The whole-page cache, when spatie/laravel-responsecache is installed (on with cache.pages).
            $pages = [Site\SetSiteLocale::class, ...(class_exists(CacheResponse::class) ? [CacheResponse::class] : [])];
            Route::get('/', [Site\SiteController::class, 'show'])->middleware([...$middleware, ...$pages])->name('sunrice.cms.home');
            // The fallback: matched after every other route, so the app's own come first.
            Route::fallback([Site\SiteController::class, 'show'])->middleware([...$middleware, ...$pages])->name('sunrice.cms.page');
        }
    }
}
