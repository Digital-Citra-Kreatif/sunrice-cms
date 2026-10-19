<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Illuminate\Support\ServiceProvider;

/**
 * Boots the CMS. The CMS is added to a panel as a plugin; this provider
 * only registers what exists outside the panel (the site side).
 *
 * @api
 */
final class CmsServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void {}
}
