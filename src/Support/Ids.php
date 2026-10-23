<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

/**
 * Ids read from the database or a request, as a list of integers.
 *
 * @internal
 */
final class Ids
{
    /**
     * The numeric values among these, as integers, in order.
     *
     * @param  iterable<mixed>  $values
     * @return list<int>
     */
    public static function of(iterable $values): array
    {
        $ids = [];
        foreach ($values as $value) {
            if (is_int($value) || (is_string($value) && ctype_digit($value))) {
                $ids[] = (int) $value;
            }
        }

        return $ids;
    }
}
