<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;

/**
 * Something the site shows changed: an entry went live or off, a term,
 * menu, global set, collection, taxonomy, blueprint, redirect, media file
 * or site setting was saved or deleted. The CMS's caches are cleared by
 * then. It may fire several times for one save (once per record), so
 * keep listeners cheap or queue them.
 *
 * `$what` names what changed, like "entry 12" or "menu".
 *
 * @api
 */
final class ContentChanged
{
    use Dispatchable;

    public function __construct(public readonly string $what) {}
}
