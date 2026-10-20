<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use InvalidArgumentException;
use Sunrice\Cms\Query\EntryQuery;

/**
 * Reads the attributes `entries` and `entry-filter` share, and applies
 * them to an EntryQuery.
 *
 * @internal
 */
final class Attributes
{
    /**
     * Collection handles from "blog,news" or a list.
     *
     * @param  string|list<string>  $collection
     * @return list<string>
     */
    public static function handles(string|array $collection): array
    {
        return is_string($collection) ? array_values(array_filter(array_map('trim', explode(',', $collection)))) : $collection;
    }

    /**
     * `where`: field => value, or [field, value] and [field, operator, value]
     * rows (operators as EntryQuery::where()).
     *
     * @param  array<mixed>  $where
     */
    public static function where(EntryQuery $query, array $where): void
    {
        foreach ($where as $key => $value) {
            if (is_string($key)) {
                $query->where($key, $value);

                continue;
            }
            $row = is_array($value) ? array_values($value) : [];
            if (! is_string($row[0] ?? null) || ! in_array(count($row), [2, 3], true)) {
                throw new InvalidArgumentException('Give "where" rows as [field, value] or [field, operator, value].');
            }
            count($row) === 2 ? $query->where($row[0], $row[1]) : $query->where($row[0], $row[1], $row[2]);
        }
    }

    /**
     * `terms`: taxonomy handle => slug or slugs (["topics" => ["news", "tips"]]),
     * or "topics:news,tips"; each taxonomy narrows the list further, and a
     * slug takes the terms under it too.
     *
     * @param  string|array<mixed>  $terms
     */
    public static function terms(EntryQuery $query, string|array $terms): void
    {
        if (is_string($terms)) {
            if (trim($terms) === '') {
                return;
            }
            [$taxonomy, $slugs] = array_pad(explode(':', $terms, 2), 2, '');
            $terms = [trim($taxonomy) => array_values(array_filter(array_map('trim', explode(',', $slugs))))];
        }
        foreach ($terms as $taxonomy => $slugs) {
            $list = array_values(array_filter(array_map(fn (mixed $slug): string => is_scalar($slug) ? trim((string) $slug) : '', is_array($slugs) ? $slugs : [$slugs]), fn (string $slug): bool => $slug !== ''));
            if (! is_string($taxonomy) || $taxonomy === '' || $list === []) {
                continue;
            }
            $query->whereTerm($taxonomy, $list, includeChildren: true);
        }
    }

    /**
     * `order`: latest, oldest, alphabetical, ordered, or fields ("price",
     * "-price" for descending; several comma-separated).
     */
    public static function order(EntryQuery $query, string $order): void
    {
        match ($order) {
            'latest' => $query->latest(),
            'oldest' => $query->oldest(),
            'alphabetical' => $query->alphabetical(),
            'ordered' => $query->ordered(),
            default => self::orderBy($query, $order),
        };
    }

    /** Fields to sort by: "price", "-price", "-date,title". */
    public static function orderBy(EntryQuery $query, string $order): void
    {
        foreach (array_filter(array_map('trim', explode(',', $order))) as $field) {
            str_starts_with($field, '-') ? $query->orderBy(substr($field, 1), 'desc') : $query->orderBy($field);
        }
    }
}
