<?php

declare(strict_types=1);

namespace Sunrice\Cms;

use Sunrice\Admin\BasePlugin;

/**
 * The CMS, added to the panel in the app's panel provider:
 * `$panel->plugin(CmsPlugin::make())`.
 *
 * @api
 */
final class CmsPlugin extends BasePlugin
{
    public const ID = 'cms';

    public function id(): string
    {
        return self::ID;
    }
}
