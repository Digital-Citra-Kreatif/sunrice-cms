<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\FieldType;

/**
 * Stands in for a type that is no longer registered (its plugin was
 * removed): the value is kept as it is.
 *
 * @internal
 */
final class Missing extends FieldType
{
    public function __construct(private readonly string $type) {}

    public function type(): string
    {
        return $this->type;
    }
}
