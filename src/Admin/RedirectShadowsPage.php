<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

/**
 * The redirects on a page of Structure → Redirects, whose badges
 * RedirectShadows works out together the first time one is asked for.
 *
 * @internal
 */
final class RedirectShadowsPage
{
    /** @var array<int, list<string>> each redirect's addresses, by id */
    public array $paths = [];

    /** @var array<int, string|null>|null the badges, by id, once worked out */
    public ?array $badges = null;
}
