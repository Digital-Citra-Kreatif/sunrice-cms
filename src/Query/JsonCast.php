<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Illuminate\Database\Eloquent\Builder;

/**
 * SQL that reads a JSON field as text, a number or a date, per database:
 * how EntryQuery and the admin's entries list sort and compare fields.
 * Wrap the result in Sql to use it where a column goes. Text that isn't a
 * number (or a date) reads as no value on every database, as do JSON null
 * and a missing key; orderBy() puts no value last, both ways.
 *
 * @internal
 */
final class JsonCast
{
    /** A number written out: "12", "-3.5", ".5", "1e3", with spaces around (no `?`: PDO would take it for a binding). */
    private const NUMBER = '^[[:space:]]*[-+]{0,1}([0-9]+[.]{0,1}[0-9]*|[.][0-9]+)([eE][-+]{0,1}[0-9]+){0,1}[[:space:]]*$';

    /** A date, or a date and time: "2026-10-19", "2026-10-19T14:30:00", "2026-10-19 14:30". */
    private const DATE = '^[0-9]{4}-[0-9]{2}-[0-9]{2}([T ][0-9]{2}:[0-9]{2}(:[0-9]{2}([.][0-9]+){0,1}){0,1}){0,1}$';

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
        // Postgres refuses to cast text that isn't a number or date (the whole query fails), and
        // SQLite and MySQL read it as 0: only what looks like one is cast. Postgres and SQLite read
        // the field once ("offset 0" keeps Postgres from inlining it back: each read parses the JSON).
        if ($cast === 'date') {
            return match ($driver) {
                'sqlite' => "datetime({$value})",
                'pgsql' => "(select case when v ~ '".self::DATE."' then cast(v as timestamp) end from (select {$value} as v offset 0) as json_value)",
                default => "CAST({$value} AS DATETIME)",
            };
        }

        return match ($driver) {
            // The cast outside gives it REAL affinity, so it compares with the number bound as text.
            'sqlite' => "cast((select case when typeof(v) in ('integer', 'real') then v when trim(v) glob '*[0-9]*' and trim(v) not glob '*[^0-9.eE+-]*' then trim(v) end from (select {$value} as v)) as real)",
            'pgsql' => "(select case when v ~ '".self::NUMBER."' then cast(v as double precision) end from (select {$value} as v offset 0) as json_value)",
            default => "(case when {$value} regexp '".self::NUMBER."' then CAST({$value} AS DECIMAL(20, 6)) end)",
        };
    }

    /**
     * Orders by a value (SQL from expression() or value(), or a subquery
     * in brackets), with no value last both ways on every database
     * (SQLite and MySQL put nulls first going up, Postgres going down).
     *
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @param  list<mixed>  $bindings  the value's
     * @param  'asc'|'desc'  $direction
     */
    public static function orderBy(Builder $query, string $value, array $bindings, string $direction): void
    {
        if ($query->getModel()->getConnection()->getDriverName() === 'pgsql') {
            $query->orderByRaw("{$value} {$direction} nulls last", $bindings); // @phpstan-ignore argument.type (SQL built here from grammar-quoted identifiers and a checked handle, as Sql)

            return;
        }
        if ($direction === 'asc') {
            $query->orderByRaw("({$value}) is null", $bindings); // @phpstan-ignore argument.type (SQL built here from grammar-quoted identifiers and a checked handle, as Sql)
        }
        $query->orderByRaw("{$value} {$direction}", $bindings); // @phpstan-ignore argument.type (SQL built here from grammar-quoted identifiers and a checked handle, as Sql)
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
