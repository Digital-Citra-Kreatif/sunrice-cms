<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Illuminate\Database\Eloquent\Builder;

/**
 * SQL that reads a JSON field as text, a number or a date, per database:
 * how EntryQuery and the admin's entries list sort and compare fields.
 * Wrap the result in Sql to use it where a column goes.
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
        $value = self::value($query, $column);
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

    /**
     * The field as text, and SQL NULL where it holds JSON null, as SQLite
     * and Postgres read it: MySQL's json_unquote() turns JSON null into the
     * string 'null', which would compare, sort and cast as a value.
     *
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @param  string  $column  "data->price", "main.data->price"
     */
    public static function value(Builder $query, string $column): string
    {
        $value = $query->getQuery()->getGrammar()->wrap($column);
        if ($query->getModel()->getConnection()->getDriverName() === 'mysql' && str_starts_with($value, 'json_unquote(') && str_ends_with($value, ')')) {
            $json = substr($value, strlen('json_unquote('), -1);

            return "(case when json_type({$json}) = 'NULL' then null else {$value} end)";
        }

        return $value;
    }
}
