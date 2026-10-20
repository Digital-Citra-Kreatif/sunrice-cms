<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Preferences\Preferences;
use Sunrice\Cms\Fields\CustomField;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Query\JsonCast;
use Sunrice\Cms\Query\Sql;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\FieldText;
use Sunrice\Cms\Support\Locales;

/**
 * A collection's entries list in the admin, from the request: search
 * (title, slug, or "#12" for an id), filters (status, author, a term per
 * taxonomy, language), sorting by a column or a field, the page size and
 * the columns (the user's saved choice: Preferences, key
 * "table.cms.entries.{handle}"). The CSV export reads the same list.
 *
 * Field columns are the blueprint's top-level text, number, date, select,
 * toggle and entries fields; number and date fields sort as such.
 *
 * @internal
 */
final class EntryList
{
    public const PER_PAGE = [10, 25, 50, 100];

    public const DEFAULT_PER_PAGE = 25;

    public const STATUSES = ['draft', 'published', 'scheduled', 'trashed'];

    /** Field columns' keys: "field.price". */
    public const FIELD = 'field.';

    /** The columns besides the title (always shown), in their order. */
    public const COLUMNS = ['slug' => 'Slug', 'status' => 'Status', 'author' => 'Author', 'published_at' => 'Published', 'updated_at' => 'Updated', 'created_at' => 'Created'];

    /** Cell text of field columns is cut to this many characters. */
    public const CELL_LIMIT = 80;

    /** The built-in types a field column shows, as the kind of cell. */
    private const KINDS = ['text' => 'text', 'textarea' => 'text', 'number' => 'number', 'date' => 'date', 'select' => 'select', 'toggle' => 'toggle', 'entries' => 'entries'];

    private const SORTS = ['title', 'slug', 'status', 'published_at', 'updated_at', 'created_at', 'author'];

    private const TABLE = 'sunrice_entry_translations';

    public string $search = '';

    /** "", or one of STATUSES. */
    public string $status = '';

    public ?int $author = null;

    /** @var array<string, int> a term id by taxonomy handle */
    public array $terms = [];

    public string $locale;

    /** "" for the collection's own order, else a column or field key, "-" first for descending. */
    public string $sort = '';

    public int $perPage;

    /** @var list<string> the visible columns' keys besides the title */
    public array $columns;

    /** @var array<string, array{field: Field, kind: string, label: string, sortable: bool, translatable: bool}> by handle */
    private array $fields = [];

    /** @var array<string, string>|null user names by id, of everyone who wrote entries here */
    private ?array $authors = null;

    public function __construct(private readonly Collection $collection, Request $request, private readonly ?Authenticatable $user, Preferences $preferences)
    {
        $this->fields = $this->fieldColumns();
        $saved = $user === null ? ['columns' => null, 'perPage' => null] : $preferences->table($user, self::preferenceKey($collection));

        $search = $request->query('search');
        $this->search = is_string($search) ? mb_substr(trim($search), 0, 200) : '';
        $status = $request->query('status');
        $this->status = is_string($status) && in_array($status, self::STATUSES, true) ? $status : ($request->boolean('trashed') ? 'trashed' : '');
        $author = $request->query('author');
        $this->author = is_string($author) && ctype_digit($author) ? (int) $author : null;
        $terms = $request->query('terms');
        foreach ($this->taxonomies() as $taxonomy) {
            $term = is_array($terms) ? ($terms[$taxonomy->handle] ?? null) : null;
            if (is_string($term) && ctype_digit($term)) {
                $this->terms[$taxonomy->handle] = (int) $term;
            }
        }
        $locale = $request->query('locale');
        $this->locale = is_string($locale) && in_array($locale, Locales::all(), true) ? $locale : Locales::default();

        $sort = $request->query('sort');
        $this->sort = is_string($sort) && in_array(ltrim($sort, '-'), $this->sortable(), true) ? $sort : '';

        // ?per_page= when it's one offered, else the saved choice, else the default.
        $asked = $request->query('per_page');
        $asked = is_string($asked) && ctype_digit($asked) ? (int) $asked : null;
        $this->perPage = in_array($asked, self::PER_PAGE, true) ? (int) $asked
            : (in_array($saved['perPage'], self::PER_PAGE, true) ? (int) $saved['perPage'] : self::DEFAULT_PER_PAGE);

        $available = array_keys($this->columnList());
        $columns = $saved['columns'] === null ? $this->defaultColumns() : array_values(array_intersect($saved['columns'], $available));
        $this->columns = $columns;
    }

    public static function preferenceKey(Collection $collection): string
    {
        return 'table.cms.entries.'.$collection->handle;
    }

    /** @return Builder<EntryTranslation> the list, filtered, searched and sorted */
    public function query(): Builder
    {
        $query = EntryTranslation::query()
            ->with(['entry.translations', 'entry.parent.translations'])
            ->where('collection_id', $this->collection->id)
            ->where('locale', $this->locale)
            ->whereHas('entry', function (Builder $entry): void {
                $this->status === 'trashed' ? $entry->onlyTrashed() : $entry->withoutTrashed();
                if ($this->author !== null) {
                    $entry->where('author_id', $this->author);
                }
            });

        match ($this->status) {
            'draft' => $query->where('status', EntryTranslation::DRAFT),
            'published' => $query->where('status', EntryTranslation::PUBLISHED)->where('published_at', '<=', now()),
            'scheduled' => $query->where('status', EntryTranslation::PUBLISHED)->where('published_at', '>', now()),
            default => null,
        };
        foreach ($this->terms as $term) {
            $query->whereHas('entry.terms', fn (Builder $terms) => $terms->where('sunrice_terms.id', $term));
        }
        if ($this->search !== '') {
            if (preg_match('/^#(\d{1,18})$/', $this->search, $id) === 1) {
                $query->where('entry_id', (int) $id[1]);
            } else {
                // whereLike: case-insensitive on every database (ILIKE on PostgreSQL).
                $like = '%'.addcslashes($this->search, '%_\\').'%';
                $query->where(fn (Builder $where) => $where->whereLike('draft_title', $like)->orWhereLike('draft_slug', $like));
            }
        }
        $this->applySort($query);

        return $query;
    }

    /** Whether the list is in the collection's manual order, unfiltered: where Move up and Move down make sense. */
    public function inManualOrder(): bool
    {
        return $this->collection->ordered && $this->sort === '' && $this->search === '' && $this->author === null
            && $this->terms === [] && $this->status === '';
    }

    /**
     * A page's rows, with what the visible columns show.
     *
     * @param  iterable<EntryTranslation>  $translations
     * @return list<array<string, mixed>>
     */
    public function rows(iterable $translations): array
    {
        $translations = is_array($translations) ? array_values($translations) : iterator_to_array($translations, false);
        $shown = $this->shownFields();
        $titles = $this->entryTitles($translations, $shown);
        $authors = in_array('author', $this->columns, true) ? $this->authorNames() : [];

        return array_map(function (EntryTranslation $translation) use ($shown, $titles, $authors): array {
            $translation->entry->setRelation('collection', $this->collection);
            $data = $shown === [] ? [] : $translation->completeData(true);
            $cells = [];
            foreach ($shown as $handle => $column) {
                $cells[self::FIELD.$handle] = $this->cell($data[$handle] ?? null, $column, $titles, true);
            }
            $author = $translation->entry->author_id;

            return [
                'id' => $translation->entry_id,
                'title' => $translation->draft_title,
                'slug' => $translation->draft_slug,
                'status' => $translation->status(),
                'publishedAt' => $translation->published_at?->toIso8601String(),
                'updatedAt' => $translation->updated_at?->toIso8601String(),
                'createdAt' => $translation->created_at?->toIso8601String(),
                'author' => $author === null ? null : ($authors['u'.$author] ?? null),
                'locales' => self::locales($translation->entry),
                'parent' => $translation->entry->parent?->mainTranslation()?->draft_title,
                'cells' => $cells,
            ];
        }, $translations);
    }

    /**
     * Writes the list as CSV rows: the columns, the author, and every
     * top-level field (field columns as the list shows them, uncut).
     *
     * @param  Closure(list<bool|float|int|string|null>): void  $write
     */
    public function export(Closure $write): void
    {
        $fields = $this->collection->schema()->fields();
        $write(['ID', 'Title', 'Slug', 'Status', 'Published', 'URL', 'Updated', 'Author', ...array_map(FieldText::label(...), $fields)]);
        $authors = $this->authorNames();
        $this->query()->chunk(500, function ($translations) use ($fields, $authors, $write): void {
            $list = array_values($translations->all());
            $titles = $this->entryTitles($list, $this->fields);
            foreach ($list as $translation) {
                $translation->entry->setRelation('collection', $this->collection);
                $data = $translation->completeData(true);
                $author = $translation->entry->author_id;
                $write([
                    $translation->entry_id, $translation->draft_title, $translation->draft_slug, $translation->entry->trashed() ? 'trashed' : $translation->status(),
                    $translation->published_at?->toDateTimeString(), $translation->isLive() && ! $translation->entry->trashed() ? $translation->url() : null,
                    $translation->updated_at?->toDateTimeString(), $author === null ? null : ($authors['u'.$author] ?? null),
                    ...array_map(fn (Field $field): ?string => isset($this->fields[$field->handle])
                        ? $this->cell($data[$field->handle] ?? null, $this->fields[$field->handle], $titles, false)
                        : FieldText::text($data[$field->handle] ?? null, $field), $fields),
                ]);
            }
        });
    }

    /**
     * Every column the user may show, besides the title.
     *
     * @return array<string, array{key: string, label: string, sortable: bool, field: bool}>
     */
    public function columnList(): array
    {
        $columns = [];
        foreach (self::COLUMNS as $key => $label) {
            $columns[$key] = ['key' => $key, 'label' => $label, 'sortable' => true, 'field' => false];
        }
        foreach ($this->fields as $handle => $column) {
            $columns[self::FIELD.$handle] = ['key' => self::FIELD.$handle, 'label' => $column['label'], 'sortable' => $column['sortable'], 'field' => true];
        }

        return $columns;
    }

    /**
     * What the filter bar offers: authors, terms per taxonomy, languages.
     *
     * @return array{authors: list<array{value: string, label: string}>, taxonomies: list<array{handle: string, title: string, terms: list<array{value: string, label: string, depth: int}>}>, locales: list<string>}
     */
    public function filterOptions(): array
    {
        $authors = [];
        foreach ($this->authorNames() as $id => $name) {
            $authors[] = ['value' => substr($id, 1), 'label' => $name];
        }
        usort($authors, fn (array $a, array $b): int => strcasecmp($a['label'], $b['label']));

        $taxonomies = $this->taxonomies();
        $terms = $taxonomies->isEmpty() ? [] : Term::query()->whereIn('taxonomy_id', $taxonomies->pluck('id'))
            ->with('translations')->orderBy('sort_order')->orderBy('id')->limit(2000)->get()->all();

        return [
            'authors' => $authors,
            'taxonomies' => array_values($taxonomies->map(fn (Taxonomy $taxonomy): array => [
                'handle' => $taxonomy->handle,
                'title' => $taxonomy->title,
                'terms' => self::termTree(array_values(array_filter($terms, fn (Term $term): bool => $term->taxonomy_id === $taxonomy->id))),
            ])->all()),
            'locales' => Locales::all(),
        ];
    }

    /**
     * "Go to": the pages an editor tends to need next, those the user may open.
     *
     * @return list<array{group: string, label: string, href: string, external?: bool}>
     */
    public function links(): array
    {
        $user = $this->user instanceof Authorizable ? $this->user : null;
        $links = [];
        $collection = $this->collection;
        if ($collection->listing_route !== null) {
            $links[] = ['group' => 'Listing page', 'label' => 'Edit the listing page', 'href' => route('sunrice.admin.cms.listings.edit', $collection->handle)];
            $url = $collection->listingUrl(Locales::default());
            if ($url !== null) {
                $links[] = ['group' => 'Listing page', 'label' => 'View the listing page', 'href' => $url, 'external' => true];
            }
        }
        foreach ($this->taxonomies() as $taxonomy) {
            if (Access::terms($user, $taxonomy)) {
                $links[] = ['group' => 'Terms', 'label' => $taxonomy->title, 'href' => route('sunrice.admin.cms.terms.index', $taxonomy->handle)];
            }
        }
        if ($user?->can('cms.collections.update') === true) {
            $links[] = ['group' => 'Structure', 'label' => 'Collection settings', 'href' => route('sunrice.admin.resources.collections.edit', $collection->id)];
        }
        $blueprint = $user?->can('cms.blueprints.manage') === true ? $collection->blueprintModel() : null;
        if ($blueprint !== null) {
            $links[] = ['group' => 'Structure', 'label' => "Blueprint: {$blueprint->title}", 'href' => route('sunrice.admin.cms.blueprints.edit', $blueprint->id)];
        }

        return $links;
    }

    /** @return array{search: string, status: string, author: string, terms: array<string, string>, locale: string, sort: string, perPage: int, columns: list<string>} */
    public function state(): array
    {
        return [
            'search' => $this->search, 'status' => $this->status, 'author' => $this->author === null ? '' : (string) $this->author,
            'terms' => array_map(strval(...), $this->terms), 'locale' => $this->locale, 'sort' => $this->sort,
            'perPage' => $this->perPage, 'columns' => $this->columns,
        ];
    }

    /**
     * The site's languages with the entry's state in each: its status, or
     * null where it has no translation yet.
     *
     * @return list<array{code: string, main: bool, status: string|null}>
     */
    public static function locales(Entry $entry): array
    {
        $main = $entry->mainTranslation();

        return array_map(fn (string $code): array => [
            'code' => $code,
            'main' => $main?->locale === $code,
            'status' => ($translation = $entry->translation($code)) === null ? null : $translation->status(),
        ], Locales::all());
    }

    /** @param Builder<EntryTranslation> $query */
    private function applySort(Builder $query): void
    {
        if ($this->sort === '') {
            $collection = $this->collection;
            $collection->ordered
                ? $query->orderBy(Entry::query()->withTrashed()->select('sort_order')->whereColumn('sunrice_entries.id', self::TABLE.'.entry_id'))
                : $query->orderBy($collection->dated ? 'published_at' : 'draft_title', $collection->dated ? 'desc' : 'asc');
            $query->orderBy('id', $collection->ordered ? 'asc' : 'desc');

            return;
        }
        $direction = str_starts_with($this->sort, '-') ? 'desc' : 'asc';
        $key = ltrim($this->sort, '-');
        match (true) {
            $key === 'title' => $query->orderBy('draft_title', $direction),
            $key === 'slug' => $query->orderBy('draft_slug', $direction),
            $key === 'status' => $query->orderBy('status', $direction)->orderBy('published_at', $direction),
            $key === 'author' => $query->orderBy($this->authorNameQuery(), $direction),
            str_starts_with($key, self::FIELD) => $query->orderBy($this->fieldValue($query, substr($key, strlen(self::FIELD))), $direction),
            default => $query->orderBy($key, $direction),
        };
        $query->orderBy('id', $direction);
    }

    /**
     * A field's value to sort by: this translation's own for translated
     * fields, the main language's for shared ones; numbers and dates cast.
     *
     * @param  Builder<EntryTranslation>  $query
     * @return Sql|Builder<EntryTranslation>
     */
    private function fieldValue(Builder $query, string $handle): Sql|Builder
    {
        $column = $this->fields[$handle];
        $cast = in_array($column['kind'], ['number', 'date'], true) ? $column['kind'] : null;
        $own = $column['translatable'] || $this->locale === Locales::default();
        $path = ($own ? self::TABLE.'.' : 'main.').'draft_data->'.$handle;
        $value = new Sql($cast === null ? $query->getQuery()->getGrammar()->wrap($path) : JsonCast::expression($query, $path, $cast));

        return $own ? $value : EntryTranslation::query()->from(self::TABLE.' as main')->select($value)
            ->whereColumn('main.entry_id', self::TABLE.'.entry_id')->where('main.locale', Locales::default())->limit(1);
    }

    /** @return Builder<Entry> the name of the entry's author, for sorting */
    private function authorNameQuery(): Builder
    {
        $user = $this->userModel();
        $users = $user->getTable();

        return Entry::query()->withTrashed()
            ->leftJoin($users, $users.'.'.$user->getKeyName(), '=', 'sunrice_entries.author_id')
            ->select($users.'.name')
            ->whereColumn('sunrice_entries.id', self::TABLE.'.entry_id')
            ->limit(1);
    }

    /** @return array<string, string> the names of everyone who wrote entries in the collection, by "u" and the user id */
    private function authorNames(): array
    {
        if ($this->authors !== null) {
            return $this->authors;
        }
        $ids = Entry::query()->withTrashed()->where('collection_id', $this->collection->id)->whereNotNull('author_id')->distinct()->pluck('author_id')->all();
        $this->authors = [];
        foreach ($ids === [] ? [] : $this->userModel()->newQuery()->whereKey($ids)->get() as $user) {
            $key = $user->getKey();
            if (! is_scalar($key)) {
                continue;
            }
            $name = $user->getAttribute('name');
            $email = $user->getAttribute('email');
            $this->authors['u'.$key] = is_string($name) && $name !== '' ? $name : (is_string($email) ? $email : '#'.$key);
        }

        return $this->authors;
    }

    private function userModel(): Model
    {
        $class = app(Panel::class)->getUserModel();

        return new $class;
    }

    /**
     * The main-language titles of the entries that shown entries fields point at, one query.
     *
     * @param  list<EntryTranslation>  $translations
     * @param  array<string, array{field: Field, kind: string, label: string, sortable: bool, translatable: bool}>  $shown
     * @return array<int, string>
     */
    private function entryTitles(array $translations, array $shown): array
    {
        $handles = array_keys(array_filter($shown, fn (array $column): bool => $column['kind'] === 'entries'));
        $ids = [];
        foreach ($translations as $translation) {
            $translation->entry->setRelation('collection', $this->collection);
            $data = $handles === [] ? [] : $translation->completeData(true);
            foreach ($handles as $handle) {
                foreach ((array) ($data[$handle] ?? []) as $id) {
                    if (is_int($id) || (is_string($id) && ctype_digit($id))) {
                        $ids[(int) $id] = true;
                    }
                }
            }
        }
        if ($ids === []) {
            return [];
        }
        $titles = [];
        foreach (EntryTranslation::query()->whereIn('entry_id', array_keys($ids))->where('locale', Locales::default())->get(['entry_id', 'draft_title']) as $translation) {
            $titles[$translation->entry_id] = $translation->draft_title;
        }

        return $titles;
    }

    /**
     * A field column's cell: short readable text, or null when empty.
     *
     * @param  array{field: Field, kind: string, label: string, sortable: bool, translatable: bool}  $column
     * @param  array<int, string>  $titles
     */
    private function cell(mixed $value, array $column, array $titles, bool $cut): ?string
    {
        if ($value === null || $value === '' || $value === []) {
            return null;
        }
        $text = match ($column['kind']) {
            'toggle' => $value === true || $value === 1 || $value === '1' ? 'Yes' : 'No',
            'select' => FieldText::text($value, $column['field']),
            'entries' => implode(', ', array_map(fn (mixed $id): string => is_scalar($id) ? ($titles[(int) $id] ?? '#'.$id) : '', (array) $value)),
            'number', 'date' => is_scalar($value) ? (string) $value : '',
            default => is_scalar($value) ? Str::squish(html_entity_decode(strip_tags(str_replace(['<br>', '<br/>', '<br />', '</p>'], ' ', (string) $value)), ENT_QUOTES | ENT_HTML5)) : FieldText::text($value),
        };

        return $text === '' ? null : ($cut ? Str::limit($text, self::CELL_LIMIT, '…') : $text);
    }

    /** @return array<string, array{field: Field, kind: string, label: string, sortable: bool, translatable: bool}> the visible field columns, by handle */
    private function shownFields(): array
    {
        $shown = [];
        foreach ($this->columns as $key) {
            $handle = str_starts_with($key, self::FIELD) ? substr($key, strlen(self::FIELD)) : null;
            if ($handle !== null && isset($this->fields[$handle])) {
                $shown[$handle] = $this->fields[$handle];
            }
        }

        return $shown;
    }

    /** @return array<string, array{field: Field, kind: string, label: string, sortable: bool, translatable: bool}> */
    private function fieldColumns(): array
    {
        $schema = $this->collection->schema();
        $taken = array_map(mb_strtolower(...), ['Title', ...array_values(self::COLUMNS)]);
        $columns = [];
        foreach ($schema->fields() as $field) {
            $type = $schema->type($field);
            $base = $type instanceof CustomField ? $type->baseType() : $type->type();
            $kind = self::KINDS[$base] ?? null;
            if ($kind === null || preg_match('/^[a-z][a-z0-9_]*$/', $field->handle) !== 1 || isset($columns[$field->handle])) {
                continue;
            }
            $config = $type instanceof CustomField ? array_replace($type->preset(), $field->config) : $field->config;
            $label = $field->displayLabel();
            $multiple = ($config['multiple'] ?? false) === true;
            $columns[$field->handle] = [
                // As the base type, with a custom field's preset (a select's options).
                'field' => new Field($field->handle, $base, $field->label, config: $config),
                'kind' => $kind,
                'label' => in_array(mb_strtolower($label), $taken, true) ? "{$label} (field)" : $label,
                'sortable' => $kind !== 'entries' && ! $multiple,
                'translatable' => $schema->isTranslatable($field),
            ];
        }

        return $columns;
    }

    /** @return list<string> */
    private function sortable(): array
    {
        $keys = self::SORTS;
        foreach ($this->fields as $handle => $column) {
            if ($column['sortable']) {
                $keys[] = self::FIELD.$handle;
            }
        }

        return $keys;
    }

    /** @return list<string> */
    private function defaultColumns(): array
    {
        return ['status', $this->collection->dated ? 'published_at' : 'updated_at'];
    }

    /** @return \Illuminate\Database\Eloquent\Collection<int, Taxonomy> */
    private function taxonomies(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->collection->taxonomies;
    }

    /**
     * Terms in tree order with their depth, by main-language title.
     *
     * @param  list<Term>  $terms
     * @return list<array{value: string, label: string, depth: int}>
     */
    private static function termTree(array $terms): array
    {
        $children = [];
        $ids = array_flip(array_map(fn (Term $term): int => $term->id, $terms));
        foreach ($terms as $term) {
            $parent = $term->parent_id !== null && isset($ids[$term->parent_id]) ? $term->parent_id : 0;
            $children[$parent][] = $term;
        }
        $out = [];
        $walk = function (int $parent, int $depth) use (&$walk, &$out, $children): void {
            foreach ($children[$parent] ?? [] as $term) {
                $translation = $term->translations->firstWhere('locale', Locales::default()) ?? $term->translations->first();
                $out[] = ['value' => (string) $term->id, 'label' => $translation->title ?? '#'.$term->id, 'depth' => $depth];
                if ($depth < 20) {
                    $walk($term->id, $depth + 1);
                }
            }
        };
        $walk(0, 0);

        return $out;
    }
}
