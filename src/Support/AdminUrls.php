<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\Route;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Term;

/**
 * Where an entry or term is edited in the admin: under its collection or
 * taxonomy, like its list (/admin/cms/collections/blog/entries/5/edit).
 * Null when the admin's routes aren't there.
 *
 * @internal
 */
final class AdminUrls
{
    public static function entry(Entry $entry, ?string $locale = null): ?string
    {
        if (! Route::has('sunrice.admin.cms.collections.entries.edit')) {
            return null;
        }

        return route('sunrice.admin.cms.collections.entries.edit', ['collection' => $entry->collection->handle, 'entry' => $entry->id, ...($locale !== null && $locale !== '' ? ['locale' => $locale] : [])]);
    }

    public static function term(Term $term, ?string $locale = null): ?string
    {
        if (! Route::has('sunrice.admin.cms.taxonomies.terms.edit')) {
            return null;
        }

        return route('sunrice.admin.cms.taxonomies.terms.edit', ['taxonomy' => $term->taxonomy->handle, 'term' => $term->id, ...($locale !== null && $locale !== '' ? ['locale' => $locale] : [])]);
    }
}
