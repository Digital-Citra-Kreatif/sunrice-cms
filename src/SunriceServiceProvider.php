<?php

declare(strict_types=1);

namespace Sunrice;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Foundation\Http\Events\RequestHandled;
use Illuminate\Http\Request;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Once;
use Illuminate\Translation\Translator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use Spatie\Permission\Models\Role;
use Spatie\ResponseCache\Middlewares\CacheResponse;
use Sunrice\Activity\ActivityLogger;
use Sunrice\Activity\ActivityObserver;
use Sunrice\Http\Middleware\HandleSunriceInertiaRequests;
use Sunrice\Models\Asset;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Collection;
use Sunrice\Models\Comment;
use Sunrice\Models\Entry;
use Sunrice\Models\Fieldset;
use Sunrice\Models\Form;
use Sunrice\Models\FormSubmission;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Policies\AssetPolicy;
use Sunrice\Policies\BlueprintPolicy;
use Sunrice\Policies\CollectionPolicy;
use Sunrice\Policies\EntryPolicy;
use Sunrice\Policies\FieldsetPolicy;
use Sunrice\Policies\FormPolicy;
use Sunrice\Policies\GlobalSetPolicy;
use Sunrice\Policies\MenuPolicy;
use Sunrice\Policies\RolePolicy;
use Sunrice\Policies\TaxonomyPolicy;
use Sunrice\Policies\TermPolicy;
use Sunrice\Policies\UserPolicy;
use Sunrice\Support\CoreTranslations;
use Sunrice\Support\SiteSettings;
use Sunrice\View\Components\Comments as CommentsComponent;
use Sunrice\View\Components\Entries;
use Sunrice\View\Components\EntryFilter;
use Sunrice\View\Components\Form as FormComponent;
use Sunrice\View\Components\Search;
use Sunrice\View\Components\Seo;
use Sunrice\View\Components\SiteCode;
use Sunrice\View\Components\Terms;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class SunriceServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('sunrice')
            ->hasConfigFile()
            ->hasViews()
            ->hasTranslations()
            ->discoversMigrations()
            ->runsMigrations();
    }

    /**
     * Laravel only merges a package's config one level deep, so an app
     * that published config/sunrice.php before a nested setting existed
     * (e.g. assets.allowed_extensions) would see it as missing — an
     * empty upload allowlist rejects every file. Fill in nested keys the
     * app's file doesn't have; values it sets, lists included, win.
     */
    protected function fillMissingConfig(): void
    {
        $defaults = require __DIR__.'/../config/sunrice.php';
        $current = (array) $this->app['config']->get('sunrice', []);

        $this->app['config']->set('sunrice', static::mergeMissing($defaults, $current));

        // The default App\Models\User may not exist (custom namespaces,
        // Testbench): fall back to the auth provider's model.
        $userModel = $this->app['config']->get('sunrice.auth.user_model');
        $authModel = $this->app['config']->get('auth.providers.users.model');
        if (is_string($userModel) && ! class_exists($userModel) && is_string($authModel) && class_exists($authModel)) {
            $this->app['config']->set('sunrice.auth.user_model', $authModel);
        }
    }

    /**
     * @param  array<array-key, mixed>  $defaults
     * @param  array<array-key, mixed>  $values
     * @return array<array-key, mixed>
     */
    public static function mergeMissing(array $defaults, array $values): array
    {
        foreach ($defaults as $key => $default) {
            if (! array_key_exists($key, $values)) {
                $values[$key] = $default;
            } elseif (is_array($default) && is_array($values[$key]) && ! array_is_list($default) && ! array_is_list($values[$key])) {
                $values[$key] = static::mergeMissing($default, $values[$key]);
            }
        }

        return $values;
    }

    public function packageRegistered(): void
    {
        $this->fillMissingConfig();
        $this->app->singleton(Sunrice::class);
        $this->app->singleton(ActivityLogger::class);
        // Per request: remembers the globals already hydrated for this request.
        $this->app->scoped(Frontend\GlobalsRepository::class);
        $this->app->singleton(Fields\FieldRegistry::class, function (): Fields\FieldRegistry {
            $registry = new Fields\FieldRegistry;

            foreach ($this->builtinFieldTypes() as $type) {
                $registry->register($type);
            }

            return $registry;
        });
    }

    /**
     * @return array<int, class-string<Fields\FieldType>>
     */
    protected function builtinFieldTypes(): array
    {
        return [
            Fields\Types\Text::class,
            Fields\Types\Textarea::class,
            Fields\Types\RichText::class,
            Fields\Types\Number::class,
            Fields\Types\Toggle::class,
            Fields\Types\Select::class,
            Fields\Types\Date::class,
            Fields\Types\Link::class,
            Fields\Types\Asset::class,
            Fields\Types\Entries::class,
            Fields\Types\Terms::class,
            Fields\Types\Group::class,
            Fields\Types\Repeater::class,
            Fields\Types\Flexible::class,
            Fields\Types\FieldsetInclude::class,
            Fields\Types\File::class,
        ];
    }

    public function packageBooted(): void
    {
        $this->registerCommands();
        $this->registerAdminRoutes();
        $this->registerRouteMacro();
        $this->registerSchedule();
        $this->registerPermissions();
        $this->registerExceptionRendering();
        $this->registerAssetPublishing();
        $this->registerBladeComponents();
        $this->registerContentCache();
        $this->registerRateLimiters();
        // Settings are read once per request (Setting::get); a queue worker
        // runs many jobs in one process, so start each job fresh.
        Event::listen(JobProcessing::class, function (): void {
            Once::flush();
            $this->app->make(ActivityLogger::class)->reset();
        });
        // Merging lines is per request: start over after each one (long-lived servers, tests).
        Event::listen(RequestHandled::class, fn () => $this->app->make(ActivityLogger::class)->reset());
        $this->registerActivityLog();
        $this->registerMcpServer();
        $this->callAfterResolving('translator', fn (Translator $translator) => CoreTranslations::register($translator));

        // Site settings saved in the admin override the config defaults.
        $this->app->booted(fn () => SiteSettings::apply());
    }

    /**
     * Global content-version cache + invalidation listeners (T12).
     */
    protected function registerContentCache(): void
    {
        Event::listen(
            [
                Events\EntryPublished::class,
                Events\EntryUnpublished::class,
                Events\EntryDeleted::class,
                Events\EntryRestored::class,
                Events\ContentChanged::class,
            ],
            Cache\BumpContentVersion::class,
        );
    }

    /**
     * Form submissions rate limit: per IP + form from sunrice.forms.rate_limit.
     */
    protected function registerRateLimiters(): void
    {
        RateLimiter::for('sunrice-forms', function (Request $request) {
            $conf = (array) config('sunrice.forms.rate_limit', ['attempts' => 5, 'per_minutes' => 1]);
            $form = $request->route('form');
            $key = $request->ip().'|'.($form instanceof Form ? $form->getKey() : (string) $form);

            return Limit::perMinutes((int) ($conf['per_minutes'] ?? 1), (int) ($conf['attempts'] ?? 5))->by($key);
        });

        // Comments: per IP across the site, from Settings → Comments.
        RateLimiter::for('sunrice-comments', function (Request $request) {
            $conf = (array) config('sunrice.comments.rate_limit', ['attempts' => 3, 'per_minutes' => 1]);

            return Limit::perMinutes(max(1, (int) ($conf['per_minutes'] ?? 1)), max(1, (int) ($conf['attempts'] ?? 3)))->by('comments|'.$request->ip());
        });

        // The forgot / reset password forms: per IP, so they can't be used to
        // flood inboxes or guess reset tokens.
        RateLimiter::for('sunrice-password', fn (Request $request) => Limit::perMinute(
            max(1, (int) config('sunrice.auth.throttle.password_resets_per_minute', 5))
        )->by('sunrice-password|'.$request->ip()));
    }

    /**
     * The MCP server for AI agents: POST {sunrice.mcp.path} with an access
     * token, or `php artisan mcp:start sunrice` on the server itself.
     */
    protected function registerMcpServer(): void
    {
        if (! config('sunrice.mcp.enabled', true) || ! class_exists(\Laravel\Mcp\Facades\Mcp::class)) {
            return;
        }

        RateLimiter::for('sunrice-mcp', fn (Request $request) => Limit::perMinute(300)->by((string) $request->bearerToken() ?: $request->ip()));

        \Laravel\Mcp\Facades\Mcp::web('/'.trim((string) config('sunrice.mcp.path', 'mcp'), '/'), Mcp\SunriceServer::class)
            ->middleware(['throttle:sunrice-mcp', Mcp\AuthenticateToken::class])
            ->name('sunrice.mcp');
        \Laravel\Mcp\Facades\Mcp::local('sunrice', Mcp\SunriceServer::class);
    }

    protected function registerBladeComponents(): void
    {
        // <body @bodyClass> or <body @bodyClass('dark wide')>
        Blade::directive('bodyClass', fn (string $extra) => '<?php echo \'class="\'.e(sunrice_body_class('.($extra === '' ? '[]' : $extra).')).\'"\'; ?>');
        Blade::component(Entries::class, 'sunrice::entries');
        Blade::component(Terms::class, 'sunrice::terms');
        Blade::component(EntryFilter::class, 'sunrice::entry-filter');
        Blade::component(Search::class, 'sunrice::search');
        Blade::component(Seo::class, 'sunrice::seo');
        Blade::component(SiteCode::class, 'sunrice::code');
        Blade::component(FormComponent::class, 'sunrice::form');
        Blade::component(CommentsComponent::class, 'sunrice::comments');
    }

    protected function registerAdminRoutes(): void
    {
        Route::middleware(app(Sunrice::class)->adminMiddleware(authenticated: false))
            ->prefix(config('sunrice.admin.path', 'cms'))
            ->name('sunrice.admin.')
            ->group(__DIR__.'/../routes/admin.php');
    }

    protected function registerAssetPublishing(): void
    {
        if (is_dir(__DIR__.'/../dist')) {
            $this->publishes([__DIR__.'/../dist' => public_path('vendor/sunrice')], 'sunrice-assets');
        }

        // Starter front-end templates: `php artisan vendor:publish --tag=sunrice-templates`
        // copies them to resources/views/sunrice, where the template resolver finds them,
        // their stylesheet and script to public/sunrice-theme, and the 404/500/503
        // pages to resources/views/errors.
        $this->publishes([
            __DIR__.'/../stubs/templates' => resource_path('views/sunrice'),
            __DIR__.'/../stubs/theme' => public_path('sunrice-theme'),
            __DIR__.'/../stubs/errors' => resource_path('views/errors'),
        ], 'sunrice-templates');
    }

    /**
     * Render 403/404/500 through the Inertia Error page — only for
     * requests under the admin path.
     */
    protected function registerExceptionRendering(): void
    {
        $this->callAfterResolving(Handler::class, function ($handler): void {
            // Error pages on the site (404…) render through the site's own
            // views: mark the request so <x-sunrice::seo> keeps them out of
            // search engines (noindex, no canonical or hreflang).
            $handler->renderable(function (\Throwable $e, $request) {
                if ($e instanceof HttpExceptionInterface && $e->getStatusCode() >= 400) {
                    $request->attributes->set('sunrice.error_status', $e->getStatusCode());
                }

                return null;
            });
            $handler->renderable(function (\Throwable $e, $request) {
                $path = config('sunrice.admin.path', 'cms');
                if (! $request->is($path) && ! $request->is($path.'/*')) {
                    return null;
                }

                // Let the framework handle auth redirects and validation.
                if ($e instanceof AuthenticationException
                    || $e instanceof ValidationException) {
                    return null;
                }

                $status = $e instanceof HttpExceptionInterface
                    ? $e->getStatusCode()
                    : 500;

                if (! in_array($status, [403, 404, 500], true)) {
                    return null;
                }

                // An unknown admin URL is answered by the site's catch-all
                // route, outside the admin middleware: add the admin's shared
                // data (user, navigation…) so the page renders in its layout.
                $shared = app(HandleSunriceInertiaRequests::class)->share($request);

                return Inertia::render('Error', ['status' => $status] + $shared)
                    ->rootView('sunrice::app')
                    ->toResponse($request)
                    ->setStatusCode($status);
            });
        });
    }

    protected function registerCommands(): void
    {
        if (! $this->app->runningInConsole()) {
            return;
        }

        $this->commands([
            Console\PublishScheduledCommand::class,
            Console\RenameFieldCommand::class,
            Console\SwitchMainLanguageCommand::class,
            Console\SyncPermissionsCommand::class,
            Console\InstallCommand::class,
            Console\PublishAssetsCommand::class,
            Console\RegenerateImageSizesCommand::class,
            Console\OptimizeImagesCommand::class,
            Console\TranslateCommand::class,
            Console\SeedRolesCommand::class,
            Console\TwoFactorCommand::class,
            Console\OrphansCommand::class,
            Console\McpTokenCommand::class,
            Console\DemoContentCommand::class,
            Console\PruneActivityCommand::class,
            Console\ImportStructureCommand::class,
        ]);
    }

    protected function registerRouteMacro(): void
    {
        // Frontend catch-all is registered after the host application's routes.
        $this->app->booted(function (): void {
            if (! config('sunrice.frontend.enabled', true)) {
                return;
            }

            $middleware = (array) config('sunrice.frontend.middleware', ['web']);
            if (config('sunrice.cache.full_page') && class_exists(CacheResponse::class)) {
                $middleware[] = CacheResponse::class;
                Cache\FullPageCacheProfile::useUnlessConfigured();
            }

            Route::middleware($middleware)
                ->group(__DIR__.'/../routes/frontend.php');
        });
    }

    /** Log changes to Sunrice's models, the user model and roles (Activity log). */
    protected function registerActivityLog(): void
    {
        foreach (array_keys($this->app->make(ActivityLogger::class)->observed()) as $model) {
            $model::observe(ActivityObserver::class);
        }
    }

    protected function registerSchedule(): void
    {
        $this->callAfterResolving(Schedule::class, function ($schedule): void {
            $schedule->command('sunrice:publish-scheduled')->everyMinute();
            $schedule->command('model:prune', ['--model' => [FormSubmission::class, Comment::class]])->daily();
        });
    }

    /**
     * Permission abilities: sunrice.<area>.<id>.<action> plus the
     * wildcard areas the admin middleware checks. The Super Admin
     * role bypasses every ability.
     */
    protected function registerPermissions(): void
    {
        Gate::before(function ($user, string $ability): ?bool {
            $role = config('sunrice.super_admin_role');
            if ($role !== null && method_exists($user, 'hasRole') && $user->hasRole($role)) {
                return true;
            }

            return null;
        });

        foreach ($this->policyMap() as $model => $policy) {
            Gate::policy($model, $policy);
        }

        $userModel = config('sunrice.auth.user_model');
        if (is_string($userModel)) {
            Gate::policy($userModel, UserPolicy::class);
        }
    }

    /**
     * @return array<class-string, class-string>
     */
    protected function policyMap(): array
    {
        return [
            Entry::class => EntryPolicy::class,
            Term::class => TermPolicy::class,
            Asset::class => AssetPolicy::class,
            Form::class => FormPolicy::class,
            Collection::class => CollectionPolicy::class,
            Blueprint::class => BlueprintPolicy::class,
            Fieldset::class => FieldsetPolicy::class,
            Taxonomy::class => TaxonomyPolicy::class,
            Menu::class => MenuPolicy::class,
            GlobalSet::class => GlobalSetPolicy::class,
            Role::class => RolePolicy::class,
        ];
    }
}
