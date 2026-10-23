<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Ids;

/**
 * Publishes an entry's terms: its terms not published yet (draft_terms,
 * chosen with SaveEntryTerms) become its live ones in sunrice_entry_term,
 * for the taxonomies attached to its collection; terms of other
 * taxonomies it has are left alone. PublishEntry runs it, whichever
 * language is published (terms are shared by all of them).
 *
 * @internal
 */
final class SyncEntryTerms
{
    /** @return bool whether its live terms changed */
    public function handle(Entry $entry): bool
    {
        $draft = $entry->draft_terms;
        if ($draft === null) {
            return false;
        }
        $taxonomies = Ids::of($entry->collection->taxonomies()->pluck('sunrice_taxonomies.id'));
        $wanted = Ids::of(Term::query()->whereKey(Ids::of($draft))->whereIn('taxonomy_id', $taxonomies)->pluck('id'));
        // Live ones in the trash stay: restoring the term brings them back.
        $current = Ids::of($entry->terms()->whereIn('taxonomy_id', $taxonomies)->pluck('sunrice_terms.id'));
        $detach = array_values(array_diff($current, $wanted));
        $attach = array_values(array_diff($wanted, $current));
        if ($detach !== []) {
            $entry->terms()->detach($detach);
        }
        if ($attach !== []) {
            $entry->terms()->attach($attach);
        }
        DB::table($entry->getTable())->where('id', $entry->id)->update(['draft_terms' => null]);
        $entry->draft_terms = null;
        $entry->syncOriginalAttribute('draft_terms');

        return $detach !== [] || $attach !== [];
    }
}
