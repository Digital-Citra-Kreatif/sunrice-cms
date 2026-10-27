<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Collections;

use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Entries\SyncEntryTerms;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Brings back a deleted collection or taxonomy with the entries or terms
 * it kept, unless another one took its address meanwhile; the terms of
 * its entries whose scheduled time came meanwhile go on the site
 * (SyncEntryTerms::cameDue()). (The Restore
 * action in their lists runs it; the panel logs the action.)
 *
 * @api
 */
final class RestoreDeleted
{
    public function __construct(private readonly SyncEntryTerms $terms) {}

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
        $trashedAt = $collection->deleted_at;
        $collection->restore();
        if ($trashedAt !== null) {
            $this->terms->cameDue(EntryTranslation::query()->where('collection_id', $collection->id), $trashedAt);
        }
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
        if (is_string($taxonomy->index_route) && $taxonomy->index_route !== '' && Taxonomy::query()->where('index_route', $taxonomy->index_route)->exists()) {
            throw ValidationException::withMessages(['index_route' => __('Another taxonomy has its index page URL (:address) now: change that one first.', ['address' => $taxonomy->index_route])]);
        }
        $taxonomy->restore();
    }
}
