<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use InvalidArgumentException;

/** @api */
final class UnknownFieldType extends InvalidArgumentException
{
    public static function named(string $type): self
    {
        return new self("There is no field type \"{$type}\". Register it with CmsPlugin::make()->fieldTypes().");
    }
}
