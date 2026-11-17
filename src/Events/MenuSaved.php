<?php

declare(strict_types=1);

namespace Sunrice\Cms\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Sunrice\Admin\Events\RecordsActor;
use Sunrice\Cms\Models\Menu;

/**
 * A menu's links were saved (SaveMenu) or put in another order
 * (ReorderMenuItems).
 *
 * Fired once the database transaction it's part of commits (never for
 * one rolled back, like an import's dry run).
 *
 * @api
 */
final class MenuSaved implements ShouldDispatchAfterCommit
{
    use Dispatchable, RecordsActor;

    public function __construct(
        public readonly Menu $menu,
    ) {
        $this->recordActor();
    }
}
