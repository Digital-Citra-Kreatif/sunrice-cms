<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Illuminate\Contracts\Database\Query\Expression;
use Illuminate\Database\Grammar;

/**
 * A piece of SQL EntryQuery built itself (a cast of a JSON field, from
 * grammar-quoted identifiers and a checked handle), where a column goes.
 *
 * @internal
 */
final readonly class Sql implements Expression
{
    public function __construct(private string $sql) {}

    public function getValue(Grammar $grammar): string
    {
        return $this->sql;
    }
}
