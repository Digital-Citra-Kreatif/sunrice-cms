<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Whether another collection (or taxonomy) has a URL pattern in a
 * language already: its own there, else its main one. Two of them with
 * the same pattern in a language would share its addresses.
 *
 * @internal
 */
final class RouteConflicts
{
    /** The title of another record of the same kind with the pattern in the language, or null. */
    public static function find(Collection|Taxonomy $record, string $attribute, string $locale, string $pattern): ?string
    {
        // Deleted ones too: they take their addresses back when restored.
        $query = $record->newQueryWithoutScopes();
        if ($record->exists) {
            $query->whereKeyNot($record->getKey());
        }
        foreach ($query->whereNotNull($attribute)->get() as $other) {
            if ($other->routeIn($locale, $attribute) === $pattern) {
                return $other->title;
            }
        }

        return null;
    }
}
