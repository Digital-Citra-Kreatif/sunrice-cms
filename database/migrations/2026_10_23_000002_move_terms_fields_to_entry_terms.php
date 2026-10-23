<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Support\Locales;

/*
 * Data only. Entries' terms used to come from the terms fields of their
 * blueprint (the main translation's, copied to sunrice_entry_term on
 * publish); now they're the entry's own, for the taxonomies attached to
 * its collection. The live terms (sunrice_entry_term) stay as they are,
 * so the site shows the same; an entry whose main translation's draft
 * chose other terms in its top-level terms fields (of an attached
 * taxonomy) gets them as its terms not published yet (draft_terms). The
 * fields stay in the blueprints, with their values. In chunks; entries
 * that have draft terms already are left alone, so running it again
 * changes nothing.
 */
return new class extends Migration
{
    public function up(): void
    {
        $collections = Collection::withTrashed()->get()->keyBy('id');
        // Attached taxonomies by collection, and each taxonomy's handle.
        $taxonomies = DB::table('sunrice_taxonomies')->pluck('id', 'handle')->map(fn (mixed $id): int => is_numeric($id) ? (int) $id : 0)->all();
        $attached = [];
        foreach (DB::table('sunrice_collection_taxonomy')->get(['collection_id', 'taxonomy_id']) as $row) {
            $attached[(int) $row->collection_id][(int) $row->taxonomy_id] = true;
        }
        if ($attached === []) {
            return;
        }
        $main = Locales::default();

        DB::table('sunrice_entries')->whereNull('draft_terms')->whereIn('collection_id', array_keys($attached))->orderBy('id')
            ->chunkById(500, function ($rows) use ($collections, $taxonomies, $attached, $main): void {
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
                // The terms they chose, by entry.
                $chosen = [];
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
                        if ($taxonomy !== null && isset($attached[(int) $row->collection_id][$taxonomy])) {
                            $value = $data[$field->handle] ?? null;
                            foreach (is_array($value) ? $value : [$value] as $id) {
                                if (is_int($id) || (is_string($id) && ctype_digit($id))) {
                                    $chosen[(int) $row->id][] = ['term' => (int) $id, 'taxonomy' => $taxonomy];
                                }
                            }
                        }
                    }
                }
                // Which taxonomy the terms are of (deleted ones left out), and the live terms of the attached taxonomies.
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
                    $own = $attached[(int) $row->collection_id] ?? [];
                    $draft = [];
                    foreach ($chosen[$entryId] ?? [] as $picked) {
                        if (($termTaxonomy[$picked['term']] ?? null) === $picked['taxonomy']) {
                            $draft[] = $picked['term'];
                        }
                    }
                    $published = array_column(array_filter($live[$entryId] ?? [], fn (array $pair): bool => isset($own[$pair['taxonomy']])), 'term');
                    $draft = array_values(array_unique($draft));
                    sort($draft);
                    $published = array_values(array_unique($published));
                    sort($published);
                    // The same as live: nothing pending, nothing to write.
                    if ($draft !== $published) {
                        DB::table('sunrice_entries')->where('id', $entryId)->update(['draft_terms' => json_encode($draft, JSON_THROW_ON_ERROR)]);
                    }
                }
            });
    }

    public function down(): void
    {
        DB::table('sunrice_entries')->whereNotNull('draft_terms')->update(['draft_terms' => null]);
    }
};
