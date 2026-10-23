<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;

/**
 * Two versions of an entry's terms compared by taxonomy (those attached to
 * its collection, in their order), as the editor's compare dialogs and
 * "Changed" markers read them: the terms' titles in a language.
 *
 * @internal
 */
final class TermsCompared
{
    /** @var array<int, Term> */
    private array $terms = [];

    /**
     * @param  Collection<int, Taxonomy>  $taxonomies
     * @param  list<Term>  $terms  the terms of both versions
     */
    public function __construct(private readonly Collection $taxonomies, array $terms, private readonly string $locale)
    {
        foreach ($terms as $term) {
            $this->terms[$term->id] = $term;
        }
    }

    /**
     * The taxonomies whose terms differ: "terms.{handle}", its title, and each version's terms' titles.
     *
     * @param  list<int>  $old
     * @param  list<int>  $new
     * @return list<array{key: string, label: string, old: string, new: string}>
     */
    public function compare(array $old, array $new): array
    {
        $out = [];
        foreach ($this->taxonomies as $taxonomy) {
            $before = $this->of($taxonomy, $old);
            $after = $this->of($taxonomy, $new);
            if (array_keys($before) != array_keys($after)) {
                $out[] = ['key' => 'terms.'.$taxonomy->handle, 'label' => $taxonomy->title, 'old' => implode(', ', $before), 'new' => implode(', ', $after)];
            }
        }

        return $out;
    }

    /**
     * A version's terms of a taxonomy, by id, sorted, with their titles.
     *
     * @param  list<int>  $ids
     * @return array<int, string>
     */
    private function of(Taxonomy $taxonomy, array $ids): array
    {
        $titles = [];
        foreach ($ids as $id) {
            $term = $this->terms[$id] ?? null;
            if ($term !== null && $term->taxonomy_id === $taxonomy->id) {
                $titles[$id] = $term->title($this->locale);
            }
        }
        ksort($titles);

        return $titles;
    }
}
