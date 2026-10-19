<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Security\SecurityAlerts;
use Sunrice\Admin\Security\SecurityLog;
use Sunrice\Cms\Settings\CodeSettings;

/**
 * Settings → Code changed: a security event ("site code changed") and an
 * alert, since code on every page can steal visitors' data.
 *
 * @internal
 */
final class SiteCode
{
    /** @param list<string> $changed CodeSettings properties */
    public static function changed(array $changed): void
    {
        $labels = ['head' => 'head', 'bodyStart' => 'start of the body', 'bodyEnd' => 'end of the body'];
        $places = implode(', ', array_map(fn (string $p): string => $labels[$p] ?? $p, $changed));
        $user = auth(app(Panel::class)->getGuard())->user();
        $account = $user instanceof Model ? $user : null;
        $name = $account?->getAttribute('name') ?? $account?->getAttribute('email');
        $who = is_string($name) ? $name : 'Someone';

        app(SecurityLog::class)->record('site code changed', $account, null, ['note' => $places]);
        app(SecurityAlerts::class)->raise('cms-site-code', sha1(serialize(app(CodeSettings::class)->toArray())), 'The site\'s code was changed',
            "{$who} changed the code added to every page of the site ({$places}).",
            'If nobody meant to, empty it in Settings → Site code right away: code there runs in every visitor\'s browser and can steal what they type. Then check who changed it in the activity log.',
            ['Who' => $who, 'Where' => $places]);
    }
}
