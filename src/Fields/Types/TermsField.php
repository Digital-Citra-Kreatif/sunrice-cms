<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Exists;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * Terms of a taxonomy (config: taxonomy, multiple, max). Stores term ids;
 * templates get Term models. Published entries' terms are kept in a
 * table too (SyncEntryTerms), for "entries with this term" queries.
 */
final class TermsField extends FieldType
{
    public const TYPE = 'terms';

    /**
     * How many terms a taxonomy may have for the admin to list them all
     * in a select (the entries list's filter, a term's parent, a menu's
     * term): a bigger one is searched with the term picker instead.
     */
    public const LISTED = 200;

    public function type(): string
    {
        return self::TYPE;
    }

    public function label(): string
    {
        return 'Terms';
    }

    public function rules(Field $field): array
    {
        if (! $field->configBool('multiple')) {
            return ['integer', $this->exists($field)];
        }
        $max = $field->configInt('max');

        return ['array', ...($max === null ? [] : ["max:{$max}"])];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return $field->configBool('multiple') ? ["{$key}.*" => ['integer', 'distinct', $this->exists($field)]] : [];
    }

    public function defaultValue(Field $field): mixed
    {
        return $field->configBool('multiple') ? [] : null;
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        if (! $field->configBool('multiple')) {
            return is_numeric($value) ? (int) $value : null;
        }

        return is_array($value) ? array_values(array_unique(array_map(intval(...), array_filter($value, 'is_numeric')))) : [];
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        if (! $field->configBool('multiple')) {
            return is_int($value) ? $context->terms([$value])->first() : null;
        }

        return $context->terms(is_array($value) ? array_values(array_filter($value, 'is_int')) : []);
    }

    public function references(mixed $value, Field $field): array
    {
        return Reference::many(Reference::TERM, is_array($value) ? $value : [$value]);
    }

    public function settings(): array
    {
        return [
            new Field('taxonomy', 'select', 'Taxonomy', required: true, config: [
                'options' => Taxonomy::query()->orderBy('title')->get()->map(fn (Taxonomy $t): array => ['value' => $t->handle, 'label' => $t->title])->all(),
            ]),
            new Field('multiple', 'toggle', 'Several terms'),
            // Only with several terms: inline next to the switch in the builder.
            new Field('max', 'number', 'At most', config: ['min' => 1, 'step' => 1, 'placeholder' => 'No limit'], condition: ['field' => 'multiple', 'operator' => 'filled', 'value' => null]),
        ];
    }

    /**
     * The editor gets the taxonomy's handle only: it asks cms/term-picker
     * for the terms to choose from (see options()), and the entry editor
     * sends the chosen terms' titles (labels()).
     */
    public function toAdmin(Field $field, Schema $schema): array
    {
        return ['taxonomy' => $field->configString('taxonomy')] + parent::toAdmin($field, $schema);
    }

    /**
     * Terms to choose from, in tree order with their depth, titles in the
     * main language: all of a taxonomy's, or those whose title holds
     * `$search`, at most `$limit` of them from `$offset` on (`more` says
     * whether others follow). Only the page asked for is read with its
     * titles: a search or a flat taxonomy is paged by the database, a
     * hierarchy's order is worked out from its terms' ids and parents.
     * With `$except` (a term's id), not that term nor the terms under it
     * (the places a term can move to).
     *
     * @return array{items: list<array{id: int, label: string, depth: int}>, more: bool}
     */
    public static function options(Taxonomy $taxonomy, string $search = '', int $limit = 100, int $offset = 0, ?int $except = null): array
    {
        $offset = max(0, $offset);
        $limit = max(1, $limit);
        $excluded = $except === null ? [] : [$except, ...(Term::withTrashed()->find($except)?->descendantIds() ?? [])];
        // A search lists what matches, flat; a flat taxonomy its terms in order.
        if ($search !== '' || ! $taxonomy->hierarchical) {
            $terms = Term::query()->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')
                ->when($excluded !== [], fn ($query) => $query->whereKeyNot($excluded))
                ->when($search !== '', fn ($query) => $query->whereHas('translations', fn ($t) => $t->whereLike('title', '%'.addcslashes($search, '%_\\').'%')))
                ->offset($offset)->limit($limit + 1)->with('translations')->get();
            $items = [];
            foreach ($terms->take($limit) as $term) {
                $items[] = ['id' => $term->id, 'label' => $term->title(Locales::default()), 'depth' => 0];
            }

            return ['items' => $items, 'more' => $terms->count() > $limit];
        }
        // A hierarchy: the order from ids and parents only, then the page's terms with their titles.
        $ordered = self::order(Term::query()->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->toBase()->get(['id', 'parent_id'])->all());
        if ($excluded !== []) {
            $skip = array_flip($excluded);
            $ordered = array_values(array_filter($ordered, fn (array $row): bool => ! isset($skip[$row[0]])));
        }
        $page = array_slice($ordered, $offset, $limit);
        $terms = $page === [] ? collect() : Term::query()->with('translations')->whereKey(array_column($page, 0))->get()->keyBy('id');
        $items = [];
        foreach ($page as [$id, $depth]) {
            $term = $terms->get($id);
            if ($term instanceof Term) {
                $items[] = ['id' => $id, 'label' => $term->title(Locales::default()), 'depth' => $depth];
            }
        }

        return ['items' => $items, 'more' => count($ordered) > $offset + $limit];
    }

    /**
     * Which of these taxonomies have more terms than the admin lists in a
     * select (LISTED), out of the trash: their ids as keys, in one query.
     *
     * @param  array<int>  $taxonomies  their ids
     * @return array<int, true>
     */
    public static function big(array $taxonomies): array
    {
        if ($taxonomies === []) {
            return [];
        }
        $big = [];
        foreach (Term::query()->whereIn('taxonomy_id', array_values($taxonomies))->groupBy('taxonomy_id')->havingRaw('count(*) > ?', [self::LISTED])->pluck('taxonomy_id') as $id) {
            $big[is_numeric($id) ? (int) $id : 0] = true;
        }

        return $big;
    }

    /**
     * Terms' titles in the main language, by id, in one query.
     *
     * @param  array<int>  $ids
     * @return array<int, string>
     */
    public static function labels(array $ids): array
    {
        $ids = array_values(array_unique(array_filter($ids, fn (int $id): bool => $id > 0)));
        if ($ids === []) {
            return [];
        }
        $labels = [];
        foreach (Term::query()->with('translations')->whereKey(array_slice($ids, 0, 500))->get() as $term) {
            $labels[$term->id] = $term->title(Locales::default());
        }

        return $labels;
    }

    /**
     * Terms in tree order, with their depth: those under `$parent` (null:
     * the top-level ones), each followed by the terms under it.
     *
     * @param  list<Term>  $terms
     * @return list<array{0: Term, 1: int}>
     */
    public static function tree(array $terms, ?int $parent, int $depth): array
    {
        $byId = [];
        foreach ($terms as $term) {
            $byId[$term->id] = $term;
        }

        return array_map(fn (array $at): array => [$byId[$at[0]], $at[1]], self::order($terms, $parent, $depth));
    }

    /**
     * Term ids in tree order, with their depth (20 levels deep at most),
     * from rows of id and parent_id in their siblings' order: those under
     * `$parent` (null: the top-level ones), each followed by the terms
     * under it. Each row is looked at once: children are grouped by
     * parent first.
     *
     * @param  array<object>  $rows  with id and parent_id (Term models or plain rows)
     * @return list<array{0: int, 1: int}> term id, depth
     */
    public static function order(array $rows, ?int $parent = null, int $depth = 0): array
    {
        $children = [];
        foreach ($rows as $row) {
            $id = $row->id ?? null;
            $parentId = $row->parent_id ?? null;
            if (is_numeric($id)) {
                $children[is_numeric($parentId) ? (int) $parentId : 0][] = (int) $id;
            }
        }
        $ordered = [];
        // Depth first, without recursion: a stack of the siblings still to list at each level.
        $stack = [[array_reverse($children[$parent ?? 0] ?? []), $depth]];
        while ($stack !== []) {
            $top = count($stack) - 1;
            $id = array_pop($stack[$top][0]);
            if ($id === null) {
                array_pop($stack);

                continue;
            }
            $at = $stack[$top][1];
            $ordered[] = [$id, $at];
            if ($at - $depth < 20 && isset($children[$id])) {
                $stack[] = [array_reverse($children[$id]), $at + 1];
            }
        }

        return $ordered;
    }

    private function taxonomy(Field $field): ?Taxonomy
    {
        $handle = $field->configString('taxonomy');

        return $handle === null ? null : Taxonomy::query()->where('handle', $handle)->first();
    }

    private function exists(Field $field): Exists
    {
        return Rule::exists((new Term)->getTable(), 'id')->where('taxonomy_id', $this->taxonomy($field)->id ?? 0);
    }
}
