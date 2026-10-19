<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use Illuminate\Support\Collection;

/**
 * The rows of a repeater or the blocks of a flexible field, as templates
 * get them: hidden ones left out. Rows and blocks given a key in the
 * editor can be picked out directly:
 *
 *     $entry->get('sections')->byKey('hero')
 *
 * @extends Collection<int, mixed>
 *
 * @api
 */
final class Items extends Collection
{
    /** The first shown item with this key, or null. */
    public function byKey(string $key): mixed
    {
        return $this->first(fn (mixed $item): bool => self::keyOf($item) === $key);
    }

    public function hasKey(string $key): bool
    {
        return $this->byKey($key) !== null;
    }

    private static function keyOf(mixed $item): ?string
    {
        if ($item instanceof Block) {
            return $item->key;
        }

        return is_array($item) && is_string($item['_key'] ?? null) ? $item['_key'] : null;
    }
}
