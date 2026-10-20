<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components\Filter;

/**
 * A value an <x-sunrice-cms::entry-filter> filter is applied with, and the
 * address of the same list without it (for a "remove" chip).
 *
 * @api
 */
final readonly class ActiveFilter
{
    public function __construct(
        /** The filter's query string name. */
        public string $filter,
        public string $label,
        /** The value as visitors read it: an option's label, "from 2026-01-01". */
        public string $value,
        public string $removeUrl,
    ) {}
}
