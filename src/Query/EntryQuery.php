<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Closure;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection as Items;
use InvalidArgumentException;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * Live entries for templates, in one language:
 *
 *     Cms::entries('articles')->whereTerm($news)->latest()->limit(5)->get()
 *     Cms::entries('articles')->where('featured', true)->except($entry)->limit(3)->get()
 *     Cms::entries('articles')->whereEntry('related', $entry)->get()   // pointing at $entry
 *
 * Only published entries past their date, of collections not deleted.
 * Field filters read the main language's published values (shared fields
 * live there).
 *
 * @api
 */
final class EntryQuery
{
    private const OPERATORS = ['=', '!=', '<', '>', '<=', '>='];

    /** @var Builder<EntryTranslation> */
    private Builder $query;

    /** @param list<string> $collections handles; none for all */
    public function __construct(array $collections = [], ?string $locale = null)
    {
        $this->query = EntryTranslation::query()->live()->with('entry.collection')
            ->where('locale', $locale ?? Locales::current())
            ->when($collections !== [], fn (Builder $q) => $q->whereIn('collection_id', Collection::query()->whereIn('handle', $collections)->select('id')));
    }

    /** Entries with this term (or any of these). */
    public function whereTerm(Term|int ...$terms): self
    {
        $ids = array_map(fn (Term|int $term): int => $term instanceof Term ? $term->id : $term, $terms);
        $this->query->whereHas('entry.terms', fn (Builder $q) => $q->whereIn('sunrice_terms.id', $ids));

        return $this;
    }

    /** Entries directly under this one (null: the top-level ones), in a hierarchical collection. */
    public function childrenOf(Entry|int|null $parent): self
    {
        $id = $parent instanceof Entry ? $parent->id : $parent;
        $this->query->whereHas('entry', fn (Builder $q) => $id === null ? $q->whereNull('parent_id') : $q->where('parent_id', $id));

        return $this;
    }

    /** In the order editors put them in (collections with Manual order). */
    public function ordered(): self
    {
        $this->query->orderBy(Entry::query()->select('sort_order')->whereColumn('sunrice_entries.id', 'sunrice_entry_translations.entry_id'))->orderBy('id');

        return $this;
    }

    /**
     * Entries whose field (or column: title, slug, published_at, parent_id)
     * has a value: where('featured', true), where('city', '!=', 'Jakarta'),
     * where('event_date', '>=', '2026-01-01'), where('subtitle', null).
     * Fields are compared as text by <, >, <= and >=: right for dates and
     * times, not for numbers.
     */
    public function where(string $field, mixed $operator, mixed $value = null): self
    {
        if (func_num_args() === 2) {
            [$operator, $value] = ['=', $operator];
        }
        if (! is_string($operator) || ! in_array($operator, self::OPERATORS, true)) {
            throw new InvalidArgumentException('Use one of '.implode(' ', self::OPERATORS).' to compare.');
        }
        if (in_array($field, ['title', 'slug', 'published_at'], true)) {
            $this->query->where($field, $operator, $value);
        } elseif ($field === 'parent_id') {
            $this->query->whereHas('entry', fn (Builder $q) => $q->where('parent_id', $operator, $value));
        } else {
            $column = self::fieldColumn($field);
            $this->onMain(fn (Builder $q) => $value === null && in_array($operator, ['=', '!='], true)
                ? ($operator === '=' ? $q->whereNull($column) : $q->whereNotNull($column))
                : $q->where($column, $operator, $value));
        }

        return $this;
    }

    /**
     * Entries whose entries field links to this entry (or any of these):
     * the other way round from the field.
     *
     * @param  Entry|EntryTranslation|int|list<Entry|EntryTranslation|int>  $entries
     */
    public function whereEntry(string $field, Entry|EntryTranslation|int|array $entries): self
    {
        $ids = self::ids(is_array($entries) ? $entries : [$entries]);
        $column = self::fieldColumn($field);
        $this->onMain(function (Builder $q) use ($ids, $column): void {
            $q->where(function (Builder $any) use ($ids, $column): void {
                foreach ($ids as $id) {
                    $any->orWhereJsonContains($column, $id);
                }
            });
        });

        return $this;
    }

    /** Leave out these entries (the one shown, in a "related" list). */
    public function except(Entry|EntryTranslation|int ...$entries): self
    {
        $this->query->whereNotIn('entry_id', self::ids(array_values($entries)));

        return $this;
    }

    /** By a column (title, slug, published_at) or a field, compared as text. */
    public function orderBy(string $field, string $direction = 'asc'): self
    {
        $direction = strtolower($direction) === 'desc' ? 'desc' : 'asc';
        if (in_array($field, ['title', 'slug', 'published_at'], true)) {
            $this->query->orderBy($field, $direction);
        } else {
            $column = self::fieldColumn($field);
            $this->query->orderBy(EntryTranslation::query()->from('sunrice_entry_translations as main')->select("main.{$column}")
                ->whereColumn('main.entry_id', 'sunrice_entry_translations.entry_id')->where('main.locale', Locales::default())->limit(1), $direction);
        }
        $this->query->orderBy('id');

        return $this;
    }

    public function whereSlug(string $slug): self
    {
        $this->query->where('slug', $slug);

        return $this;
    }

    /** Newest first by publish date. */
    public function latest(): self
    {
        $this->query->orderByDesc('published_at')->orderByDesc('id');

        return $this;
    }

    public function oldest(): self
    {
        $this->query->orderBy('published_at')->orderBy('id');

        return $this;
    }

    /** By title, A to Z. */
    public function alphabetical(): self
    {
        $this->query->orderBy('title');

        return $this;
    }

    /** @param  Closure(Builder<EntryTranslation>): mixed  $where  on the main language's translation */
    private function onMain(Closure $where): void
    {
        $this->query->whereHas('entry.translations', function (Builder $main) use ($where): void {
            $main->where('locale', Locales::default());
            $where($main);
        });
    }

    /** "data->{field}", for a field handle. */
    private static function fieldColumn(string $field): string
    {
        if (preg_match('/^[a-z][a-z0-9_]*$/', $field) !== 1) {
            throw new InvalidArgumentException("\"{$field}\" isn't a field handle.");
        }

        return 'data->'.$field;
    }

    /**
     * @param  list<Entry|EntryTranslation|int>  $entries
     * @return list<int> entry ids
     */
    private static function ids(array $entries): array
    {
        return array_map(fn (Entry|EntryTranslation|int $entry): int => match (true) {
            $entry instanceof Entry => $entry->id,
            $entry instanceof EntryTranslation => $entry->entry_id,
            default => $entry,
        }, $entries);
    }

    public function limit(int $count): self
    {
        $this->query->limit($count);

        return $this;
    }

    /** @return Items<int, EntryTranslation> */
    public function get(): Items
    {
        return $this->query->get()->toBase();
    }

    public function first(): ?EntryTranslation
    {
        return $this->query->first();
    }

    public function count(): int
    {
        return $this->query->count();
    }

    /** @return LengthAwarePaginator<int, EntryTranslation> */
    public function paginate(int $perPage = 10): LengthAwarePaginator
    {
        return $this->query->paginate($perPage);
    }
}
