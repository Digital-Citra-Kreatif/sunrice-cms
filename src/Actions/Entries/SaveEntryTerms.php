<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Collections\AttachTaxonomies;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Ids;

/**
 * Chooses an entry's terms, shared by all its languages, as a draft:
 * publishing the entry (any language, PublishEntry) puts them on the
 * site. Input: by taxonomy handle, the terms of that taxonomy (ids, or
 * slugs in any language; one, a list, or null for none):
 *
 *     app(SaveEntryTerms::class)->handle($entry, ['topics' => [3, 'news'], 'format' => null]);
 *
 * Only the taxonomies attached to the entry's collection are accepted, a
 * taxonomy attached with "One term only" takes one term at most, and the
 * taxonomies not given keep their terms. SaveDraft and CreateEntry call
 * it with their input's `terms`.
 *
 * Terms are the entry's, while each language is saved on its own: with
 * `$base`, the terms the editor loaded (by taxonomy handle, as `$terms`),
 * a save is refused when the terms of a taxonomy given changed since
 * (someone saved them from another language's editor), rather than
 * putting the old ones back unknowingly.
 *
 * @api
 */
final class SaveEntryTerms
{
    /**
     * @param  array<mixed>  $terms  taxonomy handle => term ids or slugs
     * @param  array<mixed>|null  $base  taxonomy handle => the term ids the editor loaded
     * @return bool whether the terms not published yet changed
     *
     * @throws ValidationException
     */
    public function handle(Entry $entry, array $terms, ?array $base = null): bool
    {
        $attached = self::attached($entry);
        $byHandle = $attached->keyBy('handle');
        $given = [];
        $errors = [];
        foreach ($terms as $handle => $value) {
            $taxonomy = is_string($handle) ? $byHandle->get($handle) : null;
            if (! $taxonomy instanceof Taxonomy) {
                $errors["terms.{$handle}"] = Taxonomy::query()->where('handle', (string) $handle)->exists()
                    ? __(':taxonomy isn\'t one of :collection\'s taxonomies.', ['taxonomy' => (string) $handle, 'collection' => $entry->collection->title])
                    : __('There is no taxonomy ":taxonomy".', ['taxonomy' => (string) $handle]);

                continue;
            }
            $values = $value === null || $value === '' ? [] : (is_array($value) ? array_values($value) : [$value]);
            [$ids, $missing] = self::resolve($taxonomy, $values);
            if ($missing !== []) {
                $errors["terms.{$handle}"] = count($missing) === 1
                    ? __(':term isn\'t a term of :taxonomy.', ['term' => $missing[0], 'taxonomy' => $taxonomy->title])
                    : __(':terms aren\'t terms of :taxonomy.', ['terms' => implode(', ', $missing), 'taxonomy' => $taxonomy->title]);
            } elseif (AttachTaxonomies::single($taxonomy) && count($ids) > 1) {
                $errors["terms.{$handle}"] = __('Choose one :taxonomy term: :collection allows only one.', ['taxonomy' => $taxonomy->title, 'collection' => $entry->collection->title]);
            } else {
                $given[$taxonomy->id] = $ids;
            }
        }
        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
        }
        if ($given === []) {
            return false;
        }

        if ($base !== null) {
            // As stored now (locked until the save ends), not as loaded: another language's save may have changed them.
            $stored = DB::table($entry->getTable())->where('id', $entry->id)->lockForUpdate()->value('draft_terms');
            $decoded = is_string($stored) ? json_decode($stored, true) : null;
            $entry->draft_terms = is_array($decoded) ? Ids::of($decoded) : null;
            $entry->syncOriginalAttribute('draft_terms');
        }
        // The draft: the terms chosen of the attached taxonomies not given, and those given.
        $current = $entry->draftTermIds();
        $taxonomyOf = self::taxonomiesOf($current);
        foreach ($given as $taxonomyId => $ids) {
            $handle = $attached->firstWhere('id', $taxonomyId)?->handle;
            if ($base === null || $handle === null || ! array_key_exists($handle, $base)) {
                continue;
            }
            $loaded = $base[$handle] === null ? [] : (is_array($base[$handle]) ? array_values($base[$handle]) : [$base[$handle]]);
            $now = array_values(array_filter($current, fn (int $id): bool => ($taxonomyOf[$id] ?? null) === $taxonomyId));
            if (self::normal($loaded) !== self::normal($now)) {
                throw ValidationException::withMessages(['terms' => __('Someone else changed this entry\'s terms. Reload to see them.')]);
            }
        }
        $keep = array_values(array_filter($current, fn (int $id): bool => isset($taxonomyOf[$id]) && $attached->contains('id', $taxonomyOf[$id]) && ! isset($given[$taxonomyOf[$id]])));

        return $this->setDraft($entry, [...$keep, ...array_merge(...array_values($given))], Ids::of($attached->pluck('id')));
    }

    /**
     * Sets the entry's terms not published yet to these (of the attached
     * taxonomies: others are left out), unchecked: what a revision or the
     * live version had. Null when they're the live ones.
     *
     * @param  list<int>  $ids
     * @param  list<int>|null  $taxonomies  the attached taxonomies' ids, when known
     * @return bool whether they changed
     */
    public function setDraft(Entry $entry, array $ids, ?array $taxonomies = null): bool
    {
        $taxonomies ??= Ids::of(self::attached($entry)->pluck('id'));
        $draft = self::normal(Ids::of(Term::query()->whereKey($ids)->whereIn('taxonomy_id', $taxonomies)->pluck('id')));
        $live = self::normal(Ids::of($entry->terms()->whereIn('taxonomy_id', $taxonomies)->pluck('sunrice_terms.id')));
        $before = self::normal($entry->draftTermIds());
        $next = $draft === $live ? null : $draft;
        if ($next !== $entry->draft_terms) {
            DB::table($entry->getTable())->where('id', $entry->id)->update(['draft_terms' => $next === null ? null : json_encode($next, JSON_THROW_ON_ERROR)]);
            $entry->draft_terms = $next;
            $entry->syncOriginalAttribute('draft_terms');
        }

        return $before !== $draft;
    }

    /** Forgets the terms not published yet: the entry's terms are the live ones again (DiscardChanges). */
    public function discard(Entry $entry): void
    {
        if ($entry->draft_terms !== null) {
            DB::table($entry->getTable())->where('id', $entry->id)->update(['draft_terms' => null]);
            $entry->draft_terms = null;
            $entry->syncOriginalAttribute('draft_terms');
        }
    }

    /**
     * The taxonomies attached to an entry's collection, by title, with the attachment.
     *
     * @return Collection<int, Taxonomy>
     */
    public static function attached(Entry $entry): Collection
    {
        return $entry->collection->taxonomies()->orderBy('title')->get();
    }

    /**
     * Each term's taxonomy, by term id (not those in the trash).
     *
     * @param  list<int>  $ids
     * @return array<int, int>
     */
    public static function taxonomiesOf(array $ids): array
    {
        if ($ids === []) {
            return [];
        }

        $of = [];
        foreach (Term::query()->whereKey($ids)->get(['id', 'taxonomy_id']) as $term) {
            $of[$term->id] = $term->taxonomy_id;
        }

        return $of;
    }

    /**
     * The ids of a taxonomy's terms given by id or slug (in any language),
     * in the given order, and those that aren't its terms.
     *
     * @param  list<mixed>  $values
     * @return array{0: list<int>, 1: list<string>}
     */
    private static function resolve(Taxonomy $taxonomy, array $values): array
    {
        $missing = [];
        $ids = Ids::of($values);
        $slugs = array_values(array_filter($values, fn (mixed $value): bool => is_string($value) && ! ctype_digit($value)));
        $found = $ids === [] ? [] : Ids::of(Term::query()->where('taxonomy_id', $taxonomy->id)->whereKey($ids)->pluck('id'));
        $bySlug = [];
        if ($slugs !== []) {
            foreach (TermTranslation::query()->where('taxonomy_id', $taxonomy->id)->whereIn('slug', $slugs)->whereHas('term')->get(['term_id', 'slug']) as $translation) {
                $bySlug[$translation->slug] ??= $translation->term_id;
            }
        }
        $out = [];
        foreach ($values as $value) {
            $id = match (true) {
                is_int($value) || (is_string($value) && ctype_digit($value)) => in_array((int) $value, $found, true) ? (int) $value : null,
                is_string($value) => $bySlug[$value] ?? null,
                default => null,
            };
            if ($id === null) {
                $missing[] = is_scalar($value) ? (string) $value : gettype($value);
            } elseif (! in_array($id, $out, true)) {
                $out[] = $id;
            }
        }

        return [$out, $missing];
    }

    /**
     * @param  array<mixed>  $ids
     * @return list<int>
     */
    private static function normal(array $ids): array
    {
        $ids = array_values(array_unique(Ids::of($ids)));
        sort($ids);

        return $ids;
    }
}
