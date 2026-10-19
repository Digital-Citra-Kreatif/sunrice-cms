<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * An entry translation was published: it's live on the site, or will be
 * at its future `published_at`. When that time comes, it fires again with
 * `$scheduled` true (from `sunrice:publish-scheduled`, every minute).
 *
 * @api
 */
final class EntryPublished
{
    use Dispatchable;

    public function __construct(
        public readonly EntryTranslation $translation,
        public readonly bool $scheduled = false,
    ) {}
}
