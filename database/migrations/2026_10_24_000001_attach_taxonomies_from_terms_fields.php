<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Support\Locales;

/*
 * Data only, after 2026_10_23_000002. An entry's terms are those of the
 * taxonomies attached to its collection; on 0.1 they came from terms
 * fields, whose taxonomy needn't be attached. So nothing stays out of
 * sight: each taxonomy a collection's terms field uses (a top-level field
 * of any blueprint it allows) is attached to it when it isn't, without
 * term or index pages in the collection (no new addresses), "One term
 * only" when the field takes one term. Then, as 000002 does for the
 * taxonomies attached before, an entry whose main translation's draft
 * chose other terms of such a taxonomy than its live ones gets them as
 * its terms not published yet. In chunks; once attached, a taxonomy
 * isn't looked at again, so running it again changes nothing.
 */
return new class extends Migration
{
    public function up(): void
    {
        $taxonomies = DB::table('sunrice_taxonomies')->whereNull('deleted_at')->pluck('id', 'handle')->map(fn (mixed $id): int => is_numeric($id) ? (int) $id : 0)->all();
        $attached = [];
        foreach (DB::table('sunrice_collection_taxonomy')->get(['collection_id', 'taxonomy_id']) as $row) {
            $attached[(int) $row->collection_id][(int) $row->taxonomy_id] = true;
        }
        $collections = Collection::withTrashed()->get()->keyBy('id');

        // The taxonomies to attach, by collection: taxonomy id => one term only.
        $added = [];
        foreach ($collections as $collection) {
            foreach ($collection->allSchemas() as $schema) {
                foreach ($schema->fields() as $field) {
                    $taxonomy = $field->type === 'terms' ? ($taxonomies[$field->configString('taxonomy') ?? ''] ?? null) : null;
                    if ($taxonomy === null || isset($attached[$collection->id][$taxonomy])) {
                        continue;
                    }
                    // One term only when every field of it takes one.
                    $added[$collection->id][$taxonomy] = ($added[$collection->id][$taxonomy] ?? true) && ! $field->configBool('multiple');
                }
            }
        }
        if ($added === []) {
            return;
        }
        foreach ($added as $collectionId => $new) {
            foreach ($new as $taxonomyId => $single) {
                DB::table('sunrice_collection_taxonomy')->insert([
                    'collection_id' => $collectionId, 'taxonomy_id' => $taxonomyId, 'single' => $single, 'term_pages' => false, 'index_page' => false,
                ]);
                $attached[$collectionId][$taxonomyId] = true;
            }
        }
        $main = Locales::default();

        DB::table('sunrice_entries')->whereIn('collection_id', array_keys($added))->orderBy('id')
            ->chunkById(500, function ($rows) use ($collections, $taxonomies, $attached, $added, $main): void {
                $ids = $rows->pluck('id')->map(fn (mixed $id): int => (int) $id)->all();
                // Each entry's main translation's draft: the one in the main language, else its oldest.
                $drafts = [];
                foreach (DB::table('sunrice_entry_translations')->whereIn('entry_id', $ids)->orderBy('id')->get(['entry_id', 'locale', 'draft_data']) as $translation) {
                    $entryId = (int) $translation->entry_id;
                    if (! isset($drafts[$entryId]) || $translation->locale === $main) {
                        $data = is_string($translation->draft_data) ? json_decode($translation->draft_data, true) : null;
                        $drafts[$entryId] = is_array($data) ? $data : [];
                    }
                }
                // The terms they chose of the taxonomies just attached, by entry, and which of those their fields have.
                $chosen = [];
                $covered = [];
                foreach ($rows as $row) {
                    $collection = $collections->get($row->collection_id);
                    if (! $collection instanceof Collection || ! isset($drafts[(int) $row->id])) {
                        continue;
                    }
                    $entry = (new Entry)->forceFill(['blueprint' => $row->blueprint, 'collection_id' => $row->collection_id]);
                    $entry->setRelation('collection', $collection);
                    $data = $drafts[(int) $row->id];
                    foreach ($entry->schema()->fields() as $field) {
                        $taxonomy = $field->type === 'terms' ? ($taxonomies[$field->configString('taxonomy') ?? ''] ?? null) : null;
                        if ($taxonomy !== null && isset($added[(int) $row->collection_id][$taxonomy])) {
                            $covered[(int) $row->id][$taxonomy] = true;
                            $value = $data[$field->handle] ?? null;
                            foreach (is_array($value) ? $value : [$value] as $id) {
                                if (is_int($id) || (is_string($id) && ctype_digit($id))) {
                                    $chosen[(int) $row->id][] = ['term' => (int) $id, 'taxonomy' => $taxonomy];
                                }
                            }
                        }
                    }
                }
                $termIds = [];
                foreach ($chosen as $picked) {
                    array_push($termIds, ...array_column($picked, 'term'));
                }
                $termIds = array_values(array_unique($termIds));
                $termTaxonomy = $termIds === [] ? [] : DB::table('sunrice_terms')->whereIn('id', $termIds)->whereNull('deleted_at')->pluck('taxonomy_id', 'id')->map(fn (mixed $id): int => (int) $id)->all();
                $live = [];
                foreach (DB::table('sunrice_entry_term')->join('sunrice_terms', 'sunrice_terms.id', '=', 'sunrice_entry_term.term_id')->whereNull('sunrice_terms.deleted_at')
                    ->whereIn('sunrice_entry_term.entry_id', $ids)->get(['sunrice_entry_term.entry_id', 'sunrice_entry_term.term_id', 'sunrice_terms.taxonomy_id']) as $pair) {
                    $live[(int) $pair->entry_id][] = ['term' => (int) $pair->term_id, 'taxonomy' => (int) $pair->taxonomy_id];
                }
                foreach ($rows as $row) {
                    $entryId = (int) $row->id;
                    $new = $added[(int) $row->collection_id] ?? [];
                    $own = $attached[(int) $row->collection_id] ?? [];
                    $liveOwn = array_filter($live[$entryId] ?? [], fn (array $pair): bool => isset($own[$pair['taxonomy']]));
                    // The draft as it was (pending terms, else the live ones of the taxonomies attached before), with the new taxonomies' chosen terms.
                    $stored = is_string($row->draft_terms) ? json_decode($row->draft_terms, true) : null;
                    $before = is_array($stored)
                        ? array_values(array_filter(array_map(fn (mixed $id): int => is_numeric($id) ? (int) $id : 0, $stored)))
                        : array_column(array_filter($liveOwn, fn (array $pair): bool => ! isset($new[$pair['taxonomy']])), 'term');
                    // A new taxonomy its fields don't have (another blueprint's): its live terms stay.
                    $draft = [...$before, ...array_column(array_filter($liveOwn, fn (array $pair): bool => isset($new[$pair['taxonomy']]) && ! isset($covered[$entryId][$pair['taxonomy']])), 'term')];
                    foreach ($chosen[$entryId] ?? [] as $picked) {
                        if (($termTaxonomy[$picked['term']] ?? null) === $picked['taxonomy']) {
                            $draft[] = $picked['term'];
                        }
                    }
                    $draft = array_values(array_unique($draft));
                    sort($draft);
                    $published = array_values(array_unique(array_column($liveOwn, 'term')));
                    sort($published);
                    // The same as live: nothing pending.
                    $next = $draft === $published ? null : json_encode($draft, JSON_THROW_ON_ERROR);
                    if ($next !== $row->draft_terms) {
                        DB::table('sunrice_entries')->where('id', $entryId)->update(['draft_terms' => $next]);
                    }
                }
            });
    }

    public function down(): void
    {
        // Attachments and terms not published yet are content now: left as they are.
    }
};
