<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components\Filter;

/**
 * A sort choice of <x-sunrice-cms::entry-filter>: its query string value,
 * label and order ("-price", "latest"), and whether it's the one chosen.
 *
 * @api
 */
final class SortChoice
{
    public function __construct(
        public readonly string $value,
        public readonly string $label,
        public readonly string $order,
        public bool $selected = false,
    ) {}
}
