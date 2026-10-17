<?php

declare(strict_types=1);

namespace Sunrice\Structure;

use RuntimeException;
use Throwable;

/** A definition item that couldn't be saved; nothing was imported. */
class StructureImportFailed extends RuntimeException
{
    /** @param  array<string, array<int, string>>  $errors */
    public function __construct(public readonly string $item, public readonly array $errors, ?Throwable $previous = null)
    {
        $first = collect($errors)->flatten()->first();
        parent::__construct("Structure import failed at {$item}".($first ? ": {$first}" : '.'), 0, $previous);
    }
}
