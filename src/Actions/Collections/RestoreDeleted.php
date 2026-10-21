<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Collections;

use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Brings back a deleted collection or taxonomy with the entries or terms
 * it kept, unless another one took its address meanwhile. (The Restore
 * action in their lists runs it; the panel logs the action.)
 *
 * @api
 */
final class RestoreDeleted
{
    /** @throws ValidationException when its address is taken now */
    public function collection(Collection $collection): void
    {
        if (! $collection->trashed()) {
            return;
        }
        foreach (['route', 'listing_route'] as $column) {
            $value = $collection->getAttribute($column);
            if (is_string($value) && $value !== '' && Collection::query()->where($column, $value)->exists()) {
                throw ValidationException::withMessages([$column => $column === 'route'
                    ? __('Another collection has its URL (:address) now: change that one first.', ['address' => $value])
                    : __('Another collection has its listing page URL (:address) now: change that one first.', ['address' => $value])]);
            }
        }
        $collection->restore();
    }

    /** @throws ValidationException when its address is taken now */
    public function taxonomy(Taxonomy $taxonomy): void
    {
        if (! $taxonomy->trashed()) {
            return;
        }
        if (is_string($taxonomy->route) && $taxonomy->route !== '' && Taxonomy::query()->where('route', $taxonomy->route)->exists()) {
            throw ValidationException::withMessages(['route' => __('Another taxonomy has its term pages URL (:address) now: change that one first.', ['address' => $taxonomy->route])]);
        }
        $taxonomy->restore();
    }
}
