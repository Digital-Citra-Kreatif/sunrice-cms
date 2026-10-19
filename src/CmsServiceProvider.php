<?php

declare(strict_types=1);

namespace Sunrice\Cms;

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
        ));
        // Loaded once per request (or job).
        $this->app->scoped(Fieldsets::class);
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(dirname(__DIR__).'/database/migrations');
        if ($this->app->runningInConsole()) {
            $this->publishes([dirname(__DIR__).'/config/sunrice-cms.php' => config_path('sunrice-cms.php')], 'sunrice-cms-config');
        }
    }
}
