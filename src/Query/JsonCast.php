<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Illuminate\Database\Eloquent\Builder;

/**
 * SQL that reads a JSON field as a number or a date, per database: how
 * EntryQuery and the admin's entries list sort and compare number and
 * date fields. Wrap the result in Sql to use it where a column goes.
 *
 * @internal
 */
final class JsonCast
{
    /**
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @param  string  $column  "data->price", "main.data->price"
     * @param  string  $cast  "number" or "date"
     */
    public static function expression(Builder $query, string $column, string $cast): string
    {
        $value = $query->getQuery()->getGrammar()->wrap($column);
        $driver = $query->getModel()->getConnection()->getDriverName();
        if ($cast === 'date') {
            return match ($driver) {
                'sqlite' => "datetime({$value})",
                'pgsql' => "CAST({$value} AS TIMESTAMP)",
                default => "CAST({$value} AS DATETIME)",
            };
        }

        return match ($driver) {
            'sqlite' => "CAST({$value} AS REAL)",
            'pgsql' => "CAST({$value} AS DOUBLE PRECISION)",
            default => "CAST({$value} AS DECIMAL(20, 6))",
        };
    }
}
