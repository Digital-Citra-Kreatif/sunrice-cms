<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Models\Collection as CollectionModel;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Ids;
use WeakMap;

/**
 * What hydrating values needs to know: the language and whether this is a
 * preview. It also remembers the records it loads, so a repeater of fifty
 * images costs one query, not fifty, and shares itself with the entries
 * it loads: a list of entries hydrated together (share()), and the
 * entries their fields point at, load what all their fields point at the
 * first time one of them is hydrated, one query per kind.
 *
 *     $context = new HydrationContext(app()->getLocale());
 *     $context->share($cards);          // then $card->values() for each: no queries in the loop
 *
 * @api
 */
final class HydrationContext
{
    /** @var array<int, Media|null> */
    private array $media = [];

    /** @var array<int, Term|null> */
    private array $terms = [];

    /** @var array<int, EntryTranslation|null> */
    private array $entries = [];

    /** @var WeakMap<EntryTranslation, bool> entries hydrated with this context: whether what they point at is loaded */
    private WeakMap $shared;

    /** @var list<EntryTranslation> shared entries whose references aren't loaded yet */
    private array $pending = [];

    /** @var array<int, CollectionModel> collections seen, so each is read (and its fields loaded) once */
    private array $collections = [];

    /** @var array<int, Taxonomy> taxonomies seen, read once */
    private array $taxonomies = [];

    /** @var array<int, list<int>> entries' own terms (ids), by entry id, read once */
    private array $entryTerms = [];

    public function __construct(
        public readonly string $locale,
        public readonly bool $preview = false,
    ) {
        $this->shared = new WeakMap;
    }

    /**
     * Hydrate these entries with this context (their values() without a
     * context use it), so the first values() of any of them loads what
     * all of them point at together: one query per kind, not per entry.
     *
     * @param  iterable<EntryTranslation>  $translations
     */
    public function share(iterable $translations): static
    {
        foreach ($translations as $translation) {
            $translation->hydrateWith($this);
            if ($translation->relationLoaded('entry')) {
                $entry = $translation->entry;
                if ($entry->relationLoaded('collection')) {
                    $this->collections[$entry->collection_id] ??= $entry->collection;
                }
                // Its entry's translations know their entry (completeData() reads the main one's fields).
                if ($entry->relationLoaded('translations')) {
                    $entry->translations->each(fn (EntryTranslation $other) => $other->setRelation('entry', $entry));
                }
            }
            if (! isset($this->shared[$translation])) {
                $this->shared[$translation] = false;
                $this->pending[] = $translation;
            }
        }

        return $this;
    }

    /**
     * Before an entry is hydrated: loads what it points at, with what every
     * other shared entry not hydrated yet points at.
     *
     * @internal EntryTranslation::values() calls it.
     */
    public function prepare(EntryTranslation $translation): void
    {
        if (($this->shared[$translation] ?? false) === true) {
            return;
        }
        $this->share([$translation]);
        $batch = $this->pending;
        $this->pending = [];
        // completeData() reads each entry's main translation: their translations in one query.
        $entries = [];
        foreach ($batch as $shared) {
            $entries[$shared->entry_id] = $shared->entry;
        }
        $entries = new EloquentCollection(array_values($entries));
        $entries->loadMissing('translations');
        foreach ($entries as $entry) {
            $entry->translations->each(fn (EntryTranslation $other) => $other->setRelation('entry', $entry));
        }
        $references = [];
        foreach ($batch as $shared) {
            $this->shared[$shared] = true;
            array_push($references, ...$shared->entry->schema()->references($shared->completeData($this->preview)));
        }
        $this->preload($references);
    }

    /**
     * Loads what these references point at, one query per kind, so a list
     * of entries costs no more than one (Schema::references()).
     *
     * @param  list<Reference>  $references
     */
    public function preload(array $references): void
    {
        $ids = [Reference::MEDIA => [], Reference::TERM => [], Reference::ENTRY => []];
        foreach ($references as $reference) {
            if (isset($ids[$reference->type])) {
                $ids[$reference->type][] = $reference->id;
            }
        }
        $this->preloadMedia($ids[Reference::MEDIA]);
        $this->preloadTerms($ids[Reference::TERM]);
        $this->preloadEntries($ids[Reference::ENTRY]);
    }

    /**
     * Loads these media files in one query, for media() and mediaMany().
     *
     * @param  list<int>  $ids
     */
    public function preloadMedia(array $ids): void
    {
        $missing = array_values(array_diff(array_unique($ids), array_keys($this->media)));
        if ($missing === []) {
            return;
        }
        $found = Media::query()->whereKey($missing)->get()->keyBy('id');
        foreach ($missing as $id) {
            $this->media[$id] = $found->get($id);
        }
    }

    public function media(int $id): ?Media
    {
        $this->preloadMedia([$id]);

        return $this->media[$id];
    }

    /**
     * In the given order, skipping files that no longer exist.
     *
     * @param  list<int>  $ids
     * @return Collection<int, Media>
     */
    public function mediaMany(array $ids): Collection
    {
        $this->preloadMedia($ids);

        return collect($ids)->map(fn (int $id): ?Media => $this->media[$id] ?? null)->filter()->values();
    }

    /**
     * Loads these terms (with their translations, taxonomy and parent, for
     * their title(), url() and parent's title) in one go, for terms().
     *
     * @param  list<int>  $ids
     */
    public function preloadTerms(array $ids): void
    {
        $this->loadTerms($ids, parents: true);
    }

    /** @param  list<int>  $ids */
    private function loadTerms(array $ids, bool $parents): void
    {
        $missing = array_values(array_diff(array_unique($ids), array_keys($this->terms)));
        if ($missing === []) {
            return;
        }
        $found = Term::query()->with('translations')->whereKey($missing)->get()->keyBy('id');
        $taxonomies = array_values(array_diff(array_unique($found->map(fn (Term $term): int => $term->taxonomy_id)->all()), array_keys($this->taxonomies)));
        if ($taxonomies !== []) {
            foreach (Taxonomy::query()->withTrashed()->whereKey($taxonomies)->get() as $taxonomy) {
                $this->taxonomies[$taxonomy->id] = $taxonomy;
            }
        }
        foreach ($missing as $id) {
            $this->terms[$id] = $found->get($id);
        }
        // Their parents, for $term->parent->title(): one query more, not one per term.
        if ($parents) {
            $this->loadTerms(array_values(array_filter($found->map(fn (Term $term): ?int => $term->parent_id)->all(), is_int(...))), parents: false);
        }
        foreach ($found as $term) {
            if (isset($this->taxonomies[$term->taxonomy_id])) {
                $term->setRelation('taxonomy', $this->taxonomies[$term->taxonomy_id]);
            }
            if ($parents) {
                $term->setRelation('parent', $term->parent_id === null ? null : ($this->terms[$term->parent_id] ?? null));
            }
            // Each translation knows its term (and so its taxonomy) without asking again.
            $term->translations->each(fn (TermTranslation $translation) => $translation->setRelation('term', $term));
        }
    }

    /**
     * Terms with their translations, in the given order, skipping deleted
     * ones; loaded once per context.
     *
     * @param  list<int>  $ids
     * @return Collection<int, Term>
     */
    public function terms(array $ids): Collection
    {
        $this->preloadTerms($ids);

        return collect($ids)->map(fn (int $id): ?Term => $this->terms[$id] ?? null)->filter()->values();
    }

    /**
     * An entry's own terms (every language's, from the editor's Taxonomies
     * card) as its page shows them: the live ones, or in a preview those
     * not published yet. By taxonomy title, then in the editors' order;
     * not those in the trash. Read for every entry sharing this context
     * at once (share()): two queries for a whole list, not two per entry.
     *
     * @return Collection<int, Term>
     */
    public function entryTerms(EntryTranslation $translation): Collection
    {
        if (! array_key_exists($translation->entry_id, $this->entryTerms)) {
            $entries = [$translation->entry_id => $translation];
            foreach ($this->shared as $shared => $hydrated) {
                if (! array_key_exists($shared->entry_id, $this->entryTerms)) {
                    $entries[$shared->entry_id] ??= $shared;
                }
            }
            $live = [];
            foreach (DB::table('sunrice_entry_term')->whereIn('entry_id', array_keys($entries))->orderBy('term_id')->get(['entry_id', 'term_id']) as $row) {
                [$entryId, $termId] = Ids::of([$row->entry_id, $row->term_id]) + [null, null];
                if ($entryId !== null && $termId !== null) {
                    $live[$entryId][] = $termId;
                }
            }
            $all = [];
            foreach ($entries as $id => $shared) {
                $draft = $this->preview ? $shared->entry->draft_terms : null;
                $this->entryTerms[$id] = $draft !== null ? array_values(array_filter($draft, is_int(...))) : ($live[$id] ?? []);
                array_push($all, ...$this->entryTerms[$id]);
            }
            $this->preloadTerms($all);
        }
        $terms = $this->terms($this->entryTerms[$translation->entry_id])
            ->filter(fn (Term $term): bool => ($this->taxonomies[$term->taxonomy_id] ?? null)?->trashed() === false)
            ->all();
        usort($terms, fn (Term $a, Term $b): int => [$this->taxonomies[$a->taxonomy_id]->title, $a->sort_order, $a->id] <=> [$this->taxonomies[$b->taxonomy_id]->title, $b->sort_order, $b->id]);

        return collect($terms);
    }

    /**
     * Loads these entries (with their translations) in one query, for entries().
     *
     * @param  list<int>  $ids  entry ids
     */
    public function preloadEntries(array $ids): void
    {
        $missing = array_values(array_diff(array_unique($ids), array_keys($this->entries)));
        if ($missing === []) {
            return;
        }
        $found = Entry::query()->with('translations')->whereKey($missing)->get()->keyBy('id');
        $collections = array_values(array_diff(array_unique($found->map(fn (Entry $entry): int => $entry->collection_id)->all()), array_keys($this->collections)));
        if ($collections !== []) {
            foreach (CollectionModel::query()->withTrashed()->whereKey($collections)->get() as $collection) {
                $this->collections[$collection->id] = $collection;
            }
        }
        foreach ($found as $key => $entry) {
            if (isset($this->collections[$entry->collection_id])) {
                $entry->setRelation('collection', $this->collections[$entry->collection_id]);
            } else {
                $found->forget($key);
            }
        }
        $loaded = [];
        foreach ($missing as $id) {
            $entry = $found->get($id);
            // Each translation knows its entry (and so its collection and fields) without asking again.
            $entry?->translations->each(fn (EntryTranslation $translation) => $translation->setRelation('entry', $entry));
            $translation = null;
            if ($entry !== null && ! $entry->collection->trashed()) {
                $translation = $entry->translation($this->locale);
                // Not live in this language: the main language's stands in (as its page does).
                if ($translation === null || ! ($this->preview || $translation->isLive())) {
                    $translation = $entry->mainTranslation();
                }
            }
            // Shared below, so its url() gives the page in this language (at its address when it stands in).
            $this->entries[$id] = $translation !== null && ($this->preview || $translation->isLive()) ? $translation : null;
            if ($this->entries[$id] !== null) {
                $loaded[] = $this->entries[$id];
            }
        }
        // Linked entries hydrate with this context too, and together.
        $this->share($loaded);
    }

    /**
     * Linked entries as templates show them: each one's translation in this
     * context's language (else, when that isn't live, its main one), live,
     * or its draft in a preview, whose url() is its page for a visitor
     * reading this language (Site::urlIn()); in the given order, skipping missing, trashed and unpublished
     * ones. Loaded once per context.
     *
     * @param  list<int>  $ids  entry ids
     * @return Collection<int, EntryTranslation>
     */
    public function entries(array $ids): Collection
    {
        $this->preloadEntries($ids);

        return collect($ids)->map(fn (int $id): ?EntryTranslation => $this->entries[$id] ?? null)->filter()->values();
    }
}
