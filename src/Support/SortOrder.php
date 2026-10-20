<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\DB;

/**
 * Writes new sort_order values for many rows of a table: one UPDATE ...
 * CASE statement per few hundred rows, not one per row. The ids and
 * positions are integers, written as integer literals: Postgres types a
 * bound CASE result as text and refuses to put it in an integer column.
 *
 * @internal
 */
final class SortOrder
{
    /**
     * @param  array<int, int>  $positions  id => sort_order
     */
    public static function write(string $table, array $positions): void
    {
        $wrapped = DB::getQueryGrammar()->wrapTable($table);
        foreach (array_chunk($positions, 300, true) as $chunk) {
            $cases = '';
            foreach ($chunk as $id => $position) {
                $cases .= 'WHEN '.(int) $id.' THEN '.(int) $position.' ';
            }
            $ids = implode(',', array_map(intval(...), array_keys($chunk)));
            DB::update("UPDATE {$wrapped} SET sort_order = CASE id {$cases}END WHERE id IN ({$ids})");
        }
    }
}
