<?php

declare(strict_types=1);

namespace Sunrice\Cms\Structure;

use RuntimeException;
use Throwable;

/**
 * An item of a structure file that can't be saved: nothing was imported.
 *
 * @api
 */
final class StructureImportFailed extends RuntimeException
{
    /** @param array<string, list<string>> $errors */
    public function __construct(public readonly string $item, public readonly array $errors, ?Throwable $previous = null)
    {
        $first = null;
        foreach ($errors as $messages) {
            $first ??= $messages[0] ?? null;
        }
        parent::__construct("Can't import {$item}".($first !== null ? ": {$first}" : '.'), 0, $previous);
    }
}
