<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Ids;

/**
 * Publishes an entry's terms: its terms not published yet (draft_terms,
 * chosen with SaveEntryTerms) become its live ones in sunrice_entry_term,
 * for the taxonomies attached to its collection; terms of other
 * taxonomies it has are left alone. PublishEntry runs it, whichever
 * language is published (terms are shared by all of them).
 *
 * A language published for a date to come puts the terms it was
 * published with on the site when that date comes (scheduled(): those
 * its revision kept), not those chosen since, which stay waiting.
 *
 * The entry's row is locked while its terms are published, and its
 * terms not published yet read as stored: someone choosing others at the
 * same time is never lost.
 *
 * @internal
 */
final class SyncEntryTerms
{
    /** @return bool whether its live terms changed */
    public function handle(Entry $entry): bool
    {
        return DB::transaction(function () use ($entry): bool {
            $draft = $this->stored($entry);

            return $draft !== null && $this->publish($entry, $draft, null);
        });
    }

    /**
     * A translation published for a date to come went live: the terms it
     * was published with become the entry's live ones, unless another
     * language published since, live now, put its own on the site. Terms
     * chosen since stay waiting for a publish of their own.
     *
     * @return bool whether its live terms changed
     */
    public function scheduled(EntryTranslation $translation): bool
    {
        $revision = $translation->published_at === null ? null : Revision::query()
            ->where('entry_translation_id', $translation->id)
            ->where('created_at', '<', $translation->published_at)
            ->latest('id')->first();
        // Kept before revisions had terms: the terms not published yet, as before.
        if ($revision === null || $revision->terms === null) {
            return $this->handle($translation->entry);
        }
        $since = Revision::query()->where('id', '>', $revision->id)->whereIn('entry_translation_id', EntryTranslation::query()
            ->select('id')->where('entry_id', $translation->entry_id)->whereKeyNot($translation->id)
            ->where('status', EntryTranslation::PUBLISHED)->where('published_at', '<=', now()))->exists();
        if ($since) {
            return false;
        }

        return DB::transaction(fn (): bool => $this->publish($translation->entry, Ids::of($revision->terms), $this->stored($translation->entry)));
    }

    /**
     * The scheduled translations of these that went live since `$since`
     * (their entry or collection was in the trash then): their terms go
     * on the site now (RestoreEntry, RestoreDeleted).
     *
     * @param  Builder<EntryTranslation>  $translations
     */
    public function cameDue(Builder $translations, DateTimeInterface $since): void
    {
        $translations->live()->with('entry.collection')->where('published_at', '>', $since)
            ->whereHas('revisions', fn (Builder $q) => $q->whereColumn('sunrice_revisions.created_at', '<', 'sunrice_entry_translations.published_at'))
            ->orderBy('published_at')
            ->each(fn (EntryTranslation $translation) => $this->scheduled($translation));
    }

    /**
     * The entry's terms not published yet as stored now, its row locked
     * until the transaction ends.
     *
     * @return list<int>|null
     */
    private function stored(Entry $entry): ?array
    {
        $stored = DB::table($entry->getTable())->where('id', $entry->id)->lockForUpdate()->value('draft_terms');
        $decoded = is_string($stored) ? json_decode($stored, true) : null;
        $entry->draft_terms = is_array($decoded) ? Ids::of($decoded) : null;
        $entry->syncOriginalAttribute('draft_terms');

        return $entry->draft_terms;
    }

    /**
     * These terms (of the attached taxonomies) become the live ones; the
     * terms not published yet are `$pending` after, unless they're the
     * same.
     *
     * @param  list<int>  $terms
     * @param  list<int>|null  $pending
     */
    private function publish(Entry $entry, array $terms, ?array $pending): bool
    {
        $taxonomies = Ids::of($entry->collection->taxonomies()->pluck('sunrice_taxonomies.id'));
        $wanted = Ids::of(Term::query()->whereKey($terms)->whereIn('taxonomy_id', $taxonomies)->pluck('id'));
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
        if ($pending !== null) {
            $live = Ids::of($entry->terms()->whereIn('taxonomy_id', $taxonomies)->pluck('sunrice_terms.id'));
            sort($live);
            $next = $pending;
            sort($next);
            $pending = $next === $live ? null : $pending;
        }
        if ($pending !== $entry->draft_terms) {
            DB::table($entry->getTable())->where('id', $entry->id)->update(['draft_terms' => $pending === null ? null : json_encode($pending, JSON_THROW_ON_ERROR)]);
            $entry->draft_terms = $pending;
            $entry->syncOriginalAttribute('draft_terms');
        }

        return $detach !== [] || $attach !== [];
    }
}
