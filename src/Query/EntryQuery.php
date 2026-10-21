<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Closure;
use DateTimeInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection as Items;
use InvalidArgumentException;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * Live entries for templates, in one language:
 *
 *     Cms::entries('articles')->whereTerm($news)->latest()->limit(5)->get()
 *     Cms::entries('articles')->whereTerm('topics', 'news', includeChildren: true)->get()
 *     Cms::entries('articles')->where('featured', true)->except($entry)->limit(3)->get()
 *     Cms::entries('articles')->where('price', '<', 100)->orderBy('price')->get()
 *     Cms::entries('articles')->whereEntry('related', $entry)->get()   // pointing at $entry
 *     Cms::entries('articles')->search('coffee')->paginate(10)
 *
 * Only published entries past their date, of collections not deleted
 * (preview() takes every entry's draft instead). Field filters read the
 * main language's published values (shared fields live there); number and
 * date fields compare and sort as such, the others as text. A result's
 * entries share one HydrationContext, so their values() load each media
 * file, entry and term once for the whole list. remember() keeps the
 * matched ids in the site's cache until the content changes.
 *
 * @api
 */
final class EntryQuery
{
    private const OPERATORS = ['=', '!=', '<', '>', '<=', '>=', 'in', 'not in'];

    private const COLUMNS = ['title', 'slug', 'published_at'];

    private const TABLE = 'sunrice_entry_translations';

    /** Longer searches are cut, as in Site\Search. */
    private const SEARCH_MAX = 100;

    private string $locale;

    private bool $preview = false;

    private bool $remember = false;

    private ?int $limit = null;

    /** @var list<Closure(Builder<EntryTranslation>): mixed> in the order they were asked for */
    private array $constraints = [];

    /** @var Closure(Builder<EntryTranslation>): mixed|null the order search() puts first */
    private ?Closure $searchOrder = null;

    /** @var list<array<mixed>> what was asked for, as plain values, for the cache key */
    private array $calls = [];

    /** @var list<Schema>|null the collections' fields, once needed */
    private ?array $schemas = null;

    /** @param list<string> $collections handles; none for all */
    public function __construct(private array $collections = [], ?string $locale = null)
    {
        $this->locale = $locale ?? Locales::current();
    }

    /** The language whose translations are found (the current one unless told). */
    public function locale(string $locale): self
    {
        $this->locale = $locale;

        return $this;
    }

    /**
     * Drafts too: every entry not in the trash, by its draft title, slug and
     * fields (and values() give the draft's), as the site's preview shows
     * them. Never cached.
     */
    public function preview(bool $preview = true): self
    {
        $this->preview = $preview;

        return $this;
    }

    /**
     * Keep the matched ids in the site's cache (SiteCache: until the
     * content changes, when the cache is on), so the query itself runs
     * once. The entries are always read fresh.
     */
    public function remember(bool $remember = true): self
    {
        $this->remember = $remember;

        return $this;
    }

    /**
     * Entries with this term (or any of these): Term models or ids, or a
     * taxonomy handle and a slug (or a list of slugs, ids and terms):
     *
     *     ->whereTerm($news)                      ->whereTerm($news, $tips)
     *     ->whereTerm('topics', 'news')           ->whereTerm('topics', ['news', 'tips'], includeChildren: true)
     *
     * `includeChildren` takes the terms under them too. A slug matches in
     * any language.
     *
     * @param  Term|int|string|list<Term|int|string>  $term  a term, or a taxonomy handle
     * @param  Term|int|string|list<Term|int|string>|null  $terms  more terms, or the slug(s) in that taxonomy
     */
    public function whereTerm(Term|int|string|array $term, Term|int|string|array|null $terms = null, bool $includeChildren = false, Term|int ...$more): self
    {
        $taxonomy = is_string($term) ? $term : null;
        $given = [...($taxonomy !== null ? [] : (is_array($term) ? $term : [$term])), ...(is_array($terms) ? $terms : ($terms === null ? [] : [$terms])), ...array_values($more)];
        $plain = array_map(fn (Term|int|string $t): int|string => $t instanceof Term ? $t->id : $t, $given);
        $this->add(['whereTerm', $taxonomy, $plain, $includeChildren], function (Builder $q) use ($taxonomy, $plain, $includeChildren): void {
            $ids = $this->termIds($taxonomy, $plain, $includeChildren);
            $q->whereHas('entry.terms', fn (Builder $terms) => $terms->whereIn('sunrice_terms.id', $ids));
        });

        return $this;
    }

    /**
     * Entries whose terms field holds this term (or any of these): Term
     * models, ids, or slugs (looked up in the field's taxonomy); with
     * `includeChildren`, the terms under them too. Unlike whereTerm(), which
     * looks at every terms field, this reads one field.
     *
     * @param  Term|int|string|list<Term|int|string>  $terms
     */
    public function whereFieldTerm(string $field, Term|int|string|array $terms, bool $includeChildren = false): self
    {
        $field = self::handle($field);
        $plain = array_map(fn (Term|int|string $t): int|string => $t instanceof Term ? $t->id : $t, is_array($terms) ? $terms : [$terms]);
        $this->add(['whereFieldTerm', $field, $plain, $includeChildren], function (Builder $q) use ($field, $plain, $includeChildren): void {
            $taxonomy = null;
            foreach ($this->schemas() as $schema) {
                $taxonomy ??= $schema->field($field)?->configString('taxonomy');
            }
            $this->whereFieldHolds($q, $field, $this->termIds($taxonomy, $plain, $includeChildren));
        });

        return $this;
    }

    /** Entries directly under this one (null: the top-level ones), in a hierarchical collection. */
    public function childrenOf(Entry|int|null $parent): self
    {
        $id = $parent instanceof Entry ? $parent->id : $parent;
        $this->add(['childrenOf', $id], fn (Builder $q) => $q->whereHas('entry', fn (Builder $e) => $id === null ? $e->whereNull('parent_id') : $e->where('parent_id', $id)));

        return $this;
    }

    /** In the order editors put them in (collections with Manual order). */
    public function ordered(): self
    {
        $this->add(['ordered'], fn (Builder $q) => $q->orderBy(Entry::query()->select('sort_order')->whereColumn('sunrice_entries.id', self::TABLE.'.entry_id'))->orderBy('id'));

        return $this;
    }

    /**
     * Entries whose field (or column: title, slug, published_at, parent_id)
     * has a value: where('featured', true), where('city', '!=', 'Jakarta'),
     * where('price', '<=', 100), where('event_date', '>=', '2026-01-01'),
     * where('subtitle', null), where('city', 'in', ['Jakarta', 'Bandung']).
     * Number and date fields compare as such; the others as text.
     */
    public function where(string $field, mixed $operator, mixed $value = null): self
    {
        if (func_num_args() === 2) {
            [$operator, $value] = ['=', $operator];
        }
        $operator = is_string($operator) ? strtolower($operator) : $operator;
        if (! is_string($operator) || ! in_array($operator, self::OPERATORS, true)) {
            throw new InvalidArgumentException('Use one of '.implode(' ', self::OPERATORS).' to compare.');
        }
        if (in_array($operator, ['in', 'not in'], true) && ! is_array($value)) {
            throw new InvalidArgumentException("\"{$operator}\" takes a list of values.");
        }
        $column = in_array($field, self::COLUMNS, true) || $field === 'parent_id' ? $field : self::handle($field);
        $this->add(['where', $column, $operator, $value], function (Builder $q) use ($column, $operator, $value): void {
            if ($column === 'published_at') {
                $this->compare($q, 'published_at', $operator, $value);
            } elseif ($column === 'title' || $column === 'slug') {
                $this->compare($q, $this->column($column), $operator, $value);
            } elseif ($column === 'parent_id') {
                $q->whereHas('entry', fn (Builder $e) => $this->compare($e, 'parent_id', $operator, $value));
            } else {
                $this->onMain($q, fn (Builder $main) => $this->compare($main, $this->dataColumn().'->'.$column, $operator, $value, $this->cast($column)));
            }
        });

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
        $field = self::handle($field);
        $ids = self::ids(is_array($entries) ? $entries : [$entries]);
        $this->add(['whereEntry', $field, $ids], fn (Builder $q) => $this->whereFieldHolds($q, $field, $ids));

        return $this;
    }

    /**
     * Entries whose list field (a select with several choices, say) holds
     * any of these values: whereContains('features', ['wifi', 'parking']).
     *
     * @param  list<int|string>  $values
     */
    public function whereContains(string $field, array $values): self
    {
        $field = self::handle($field);
        $this->add(['whereContains', $field, $values], fn (Builder $q) => $this->whereFieldHolds($q, $field, $values));

        return $this;
    }

    /** Leave out these entries (the one shown, in a "related" list). */
    public function except(Entry|EntryTranslation|int ...$entries): self
    {
        $ids = self::ids(array_values($entries));
        $this->add(['except', $ids], fn (Builder $q) => $q->whereNotIn('entry_id', $ids));

        return $this;
    }

    /**
     * Entries whose title or field text holds the words (as typed: % and _
     * aren't wildcards), title matches first, then in the query's order;
     * the same matching as the site's search (Site\Search).
     */
    public function search(string $text): self
    {
        $text = trim(mb_substr($text, 0, self::SEARCH_MAX));
        if ($text === '') {
            $this->add(['search', ''], fn (Builder $q) => $q->whereRaw('1 = 0'));

            return $this;
        }
        // What's typed is matched literally: ! escapes % and _.
        $like = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $text).'%';
        $operator = (new EntryTranslation)->getConnection()->getDriverName() === 'pgsql' ? 'ILIKE' : 'LIKE';
        $this->add(['search', $text], function (Builder $q) use ($like, $operator): void {
            $title = $this->column('title');
            $q->where(fn (Builder $w) => $w->whereRaw("{$title} {$operator} ? ESCAPE '!'", [$like])->orWhereRaw("search_text {$operator} ? ESCAPE '!'", [$like]));
        });
        $this->searchOrder = fn (Builder $q) => $q->orderByRaw("CASE WHEN {$this->column('title')} {$operator} ? ESCAPE '!' THEN 0 ELSE 1 END", [$like]);

        return $this;
    }

    /** By a column (title, slug, published_at) or a field: numbers and dates as such, the others as text. */
    public function orderBy(string $field, string $direction = 'asc'): self
    {
        $direction = strtolower($direction) === 'desc' ? 'desc' : 'asc';
        $column = in_array($field, self::COLUMNS, true) ? $field : self::handle($field);
        $this->add(['orderBy', $column, $direction], function (Builder $q) use ($column, $direction): void {
            if ($column === 'published_at') {
                $q->orderByRaw($this->publishedAt().' '.$direction);
            } elseif ($column === 'title' || $column === 'slug') {
                $q->orderBy($this->column($column), $direction);
            } else {
                // The main language's value, cast when the field sorts as a number or date.
                $cast = $this->cast($column);
                $value = $cast === null ? JsonCast::value($q, 'main.'.$this->dataColumn().'->'.$column) : $this->castExpression($q, 'main.'.$this->dataColumn().'->'.$column, $cast);
                $q->orderBy(EntryTranslation::query()->from(self::TABLE.' as main')->select(new Sql($value))
                    ->whereColumn('main.entry_id', self::TABLE.'.entry_id')->where('main.locale', Locales::default())->limit(1), $direction);
            }
            $q->orderBy('id');
        });

        return $this;
    }

    public function whereSlug(string $slug): self
    {
        $this->add(['whereSlug', $slug], fn (Builder $q) => $q->where($this->column('slug'), $slug));

        return $this;
    }

    /** Newest first by publish date. */
    public function latest(): self
    {
        $this->add(['latest'], fn (Builder $q) => $q->orderByRaw($this->publishedAt().' desc')->orderByDesc('id'));

        return $this;
    }

    public function oldest(): self
    {
        $this->add(['oldest'], fn (Builder $q) => $q->orderByRaw($this->publishedAt().' asc')->orderBy('id'));

        return $this;
    }

    /** By title, A to Z. */
    public function alphabetical(): self
    {
        $this->add(['alphabetical'], fn (Builder $q) => $q->orderBy($this->column('title')));

        return $this;
    }

    public function limit(int $count): self
    {
        $this->limit = $count;

        return $this;
    }

    /** @return Items<int, EntryTranslation> */
    public function get(): Items
    {
        if (! $this->cached()) {
            return $this->hydrate($this->builder()->get()->toBase());
        }
        /** @var list<int> $ids */
        $ids = $this->remembered('get', fn (): array => $this->builder()->pluck('id')->all());

        return $this->hydrate($this->byIds($ids));
    }

    public function first(): ?EntryTranslation
    {
        if (! $this->cached()) {
            return $this->hydrate($this->builder()->limit(1)->get()->toBase())->first();
        }
        /** @var list<int> $ids */
        $ids = $this->remembered('first', fn (): array => $this->builder()->limit(1)->pluck('id')->all());

        return $this->hydrate($this->byIds($ids))->first();
    }

    public function count(): int
    {
        if (! $this->cached()) {
            return $this->builder()->count();
        }
        $count = $this->remembered('count', fn (): int => $this->builder()->count());

        return is_int($count) ? $count : 0;
    }

    /**
     * A page of entries; `$pageName` is the query string's page number
     * (two lists on one page each take their own). The first page's link
     * has no page number (EntryPaginator).
     *
     * @return LengthAwarePaginator<int, EntryTranslation>
     */
    public function paginate(int $perPage = 10, string $pageName = 'page'): LengthAwarePaginator
    {
        if (! $this->cached()) {
            $paginator = $this->builder()->paginate($perPage, ['*'], $pageName);
            $this->hydrate($paginator->getCollection());

            return EntryPaginator::from($paginator);
        }
        $page = Paginator::resolveCurrentPage($pageName);
        /** @var array{ids: list<int>, total: int} $cached */
        $cached = $this->remembered("page:{$perPage}:{$page}", function () use ($perPage, $page, $pageName): array {
            $paginator = $this->builder()->paginate($perPage, ['*'], $pageName, $page);

            return ['ids' => $paginator->getCollection()->pluck('id')->all(), 'total' => $paginator->total()];
        });

        return new EntryPaginator($this->hydrate($this->byIds($cached['ids'])), $cached['total'], $perPage, $page, ['path' => Paginator::resolveCurrentPath(), 'pageName' => $pageName]);
    }

    /**
     * The Eloquent query behind this one (a new one each time), for what
     * the methods here don't do.
     *
     * @return Builder<EntryTranslation>
     */
    public function toBase(): Builder
    {
        return $this->builder();
    }

    /** @return Builder<EntryTranslation> */
    private function builder(): Builder
    {
        $query = EntryTranslation::query()->with(['entry.collection', 'entry.translations'])->where('locale', $this->locale);
        $this->preview
            ? $query->whereHas('entry', fn (Builder $entry) => $entry->withoutTrashed()->whereHas('collection', fn (Builder $collection) => $collection->withoutTrashed()))
            : $query->live();
        if ($this->collections !== []) {
            $query->whereIn('collection_id', Collection::query()->whereIn('handle', $this->collections)->select('id'));
        }
        if ($this->searchOrder !== null) {
            ($this->searchOrder)($query); // title matches first, before the orders asked for
        }
        foreach ($this->constraints as $constraint) {
            $constraint($query);
        }
        if ($this->limit !== null) {
            $query->limit($this->limit);
        }

        return $query;
    }

    /**
     * @param  array<mixed>  $call  what was asked, as plain values
     * @param  Closure(Builder<EntryTranslation>): mixed  $constraint
     */
    private function add(array $call, Closure $constraint): void
    {
        $this->calls[] = $call;
        $this->constraints[] = $constraint;
    }

    private function cached(): bool
    {
        return $this->remember && ! $this->preview && SiteCache::enabled();
    }

    /** @param  Closure(): mixed  $make */
    private function remembered(string $what, Closure $make): mixed
    {
        return app(SiteCache::class)->remember('entries:'.md5((string) json_encode([$this->collections, $this->locale, $this->calls, $this->limit, $what])), $make);
    }

    /**
     * The translations with these ids, in that order (from a cached result).
     *
     * @param  list<int>  $ids
     * @return Items<int, EntryTranslation>
     */
    private function byIds(array $ids): Items
    {
        if ($ids === []) {
            return new Items;
        }
        $found = EntryTranslation::query()->with(['entry.collection', 'entry.translations'])->whereKey($ids)->get()->keyBy('id');

        return collect($ids)->map(fn (int $id): ?EntryTranslation => $found->get($id))->filter()->values();
    }

    /**
     * One context for the whole result: the first values() loads what all
     * of their fields point at, one query per kind, not per entry.
     *
     * @param  Items<int, EntryTranslation>  $translations
     * @return Items<int, EntryTranslation>
     */
    private function hydrate(Items $translations): Items
    {
        (new HydrationContext($this->locale, $this->preview))->share($translations);

        return $translations;
    }

    /**
     * @param  Builder<EntryTranslation>  $query
     * @param  Closure(Builder<EntryTranslation>): mixed  $where  on the main language's translation
     */
    private function onMain(Builder $query, Closure $where): void
    {
        $query->whereHas('entry.translations', function (Builder $main) use ($where): void {
            $main->where('locale', Locales::default());
            $where($main);
        });
    }

    /**
     * Compares a column (or JSON field) with a value: null checks, lists,
     * and numbers and dates cast as such.
     *
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     */
    private function compare(Builder $query, string $column, string $operator, mixed $value, ?string $cast = null): void
    {
        if ($value === null && in_array($operator, ['=', '!='], true)) {
            $operator === '=' ? $query->whereNull($column) : $query->whereNotNull($column);

            return;
        }
        $values = is_array($value) ? array_values($value) : [$value];
        $castable = $cast === 'number' ? array_all($values, fn (mixed $v): bool => is_numeric($v)) : ($cast === 'date' && array_all($values, fn (mixed $v): bool => is_string($v) || $v instanceof DateTimeInterface));
        $target = match (true) {
            $castable && $cast !== null => new Sql($this->castExpression($query, $column, $cast)),
            // Booleans: Laravel's own JSON boolean comparison.
            str_contains($column, '->') && ! array_any($values, fn (mixed $v): bool => is_bool($v)) => new Sql(JsonCast::value($query, $column)),
            default => $column,
        };
        $values = $castable ? array_map(fn (mixed $v): float|int|string => $cast === 'date' ? self::dateValue($v) : (is_numeric($v) ? $v + 0 : 0), $values) : $values;
        match ($operator) {
            'in' => $query->whereIn($target, $values),
            'not in' => $query->whereNotIn($target, $values),
            default => $query->where($target, $operator, $values[0] ?? null),
        };
    }

    /**
     * Entries whose list field (entries, terms, a select's choices) holds
     * any of these ids or values, in the main language.
     *
     * @param  Builder<EntryTranslation>  $query
     * @param  list<int|string>  $ids
     */
    private function whereFieldHolds(Builder $query, string $field, array $ids): void
    {
        if ($ids === []) {
            $query->whereRaw('1 = 0');

            return;
        }
        $column = $this->dataColumn().'->'.$field;
        $this->onMain($query, fn (Builder $main) => $main->where(function (Builder $any) use ($ids, $column): void {
            foreach ($ids as $id) {
                $any->orWhereJsonContains($column, $id);
            }
        }));
    }

    /**
     * Term ids from terms, ids and slugs (in a taxonomy, else any), with
     * the terms under them when asked.
     *
     * @param  list<int|string>  $terms
     * @return list<int>
     */
    private function termIds(?string $taxonomy, array $terms, bool $includeChildren): array
    {
        $ids = array_values(array_filter($terms, is_int(...)));
        $slugs = array_values(array_filter($terms, is_string(...)));
        if ($slugs !== []) {
            $found = TermTranslation::query()->whereIn('slug', $slugs)
                ->when($taxonomy !== null, fn (Builder $q) => $q->whereIn('taxonomy_id', Taxonomy::query()->where('handle', $taxonomy)->select('id')))
                ->pluck('term_id');
            foreach ($found as $id) {
                $ids[] = is_numeric($id) ? (int) $id : 0;
            }
        }
        $ids = array_values(array_unique($ids));
        // Level by level, one query each, for every term at once.
        for ($level = $ids, $depth = 0; $includeChildren && $level !== [] && $depth < 50; $depth++) {
            $level = [];
            foreach (Term::query()->withTrashed()->whereIn('parent_id', $ids)->whereNotIn('id', $ids)->pluck('id') as $id) {
                $level[] = is_numeric($id) ? (int) $id : 0;
            }
            array_push($ids, ...$level);
        }

        return $ids;
    }

    /** How a field sorts and compares ("number", "date", else null: as text), from the collections' blueprints. */
    private function cast(string $field): ?string
    {
        foreach ($this->schemas() as $schema) {
            $definition = $schema->field($field);
            if ($definition !== null) {
                $cast = $schema->type($definition)->sortCast();

                return in_array($cast, ['number', 'date'], true) ? $cast : null;
            }
        }

        return null;
    }

    /** @return list<Schema> */
    private function schemas(): array
    {
        return $this->schemas ??= array_values(Collection::query()->when($this->collections !== [], fn (Builder $q) => $q->whereIn('handle', $this->collections))
            ->get()->flatMap(fn (Collection $collection): array => $collection->allSchemas())->all());
    }

    /**
     * SQL that reads a JSON field as a number or date, per database.
     *
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @param  string  $column  "data->price", "main.data->price"
     */
    private function castExpression(Builder $query, string $column, string $cast): string
    {
        return JsonCast::expression($query, $column, $cast);
    }

    /** A date to compare with a cast date field: "2026-01-01 00:00:00". */
    private static function dateValue(mixed $value): string
    {
        if ($value instanceof DateTimeInterface) {
            return $value->format('Y-m-d H:i:s');
        }
        $value = is_scalar($value) ? (string) $value : '';

        return strlen($value) <= 10 ? $value.' 00:00:00' : str_replace('T', ' ', substr($value, 0, 19));
    }

    /**
     * The live column, or the draft's in a preview: "title", "draft_title".
     *
     * @param  'title'|'slug'|'data'  $column
     * @return literal-string
     */
    private function column(string $column): string
    {
        return match ($column) {
            'title' => $this->preview ? 'draft_title' : 'title',
            'slug' => $this->preview ? 'draft_slug' : 'slug',
            'data' => $this->preview ? 'draft_data' : 'data',
        };
    }

    /** @return literal-string */
    private function dataColumn(): string
    {
        return $this->column('data');
    }

    /**
     * The date entries sort by: when published, or (in a preview, for drafts never published) created.
     *
     * @return literal-string
     */
    private function publishedAt(): string
    {
        return $this->preview ? 'coalesce(published_at, created_at)' : 'published_at';
    }

    /** A field handle, checked before it goes into a JSON path. */
    private static function handle(string $field): string
    {
        if (preg_match('/^[a-z][a-z0-9_]*$/', $field) !== 1) {
            throw new InvalidArgumentException("\"{$field}\" isn't a field handle.");
        }

        return $field;
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
}
