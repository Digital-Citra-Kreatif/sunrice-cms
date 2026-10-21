<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection as Items;
use Illuminate\Support\Str;
use Illuminate\View\Component;
use InvalidArgumentException;
use Sunrice\Cms\Content;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Query\EntryQuery;
use Sunrice\Cms\Site\PageCache;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\View\Components\Filter\ActiveFilter;
use Sunrice\Cms\View\Components\Filter\FilterControl;
use Sunrice\Cms\View\Components\Filter\SortChoice;

/**
 * A collection's entries, filtered, sorted and paginated by the address
 * (?q=coffee&topic[]=news&price_max=100&sort=cheap), so a result can be
 * shared and works without JavaScript:
 *
 *     <x-sunrice-cms::entry-filter collection="shop" :per-page="12"
 *         :filters="['q' => 'search', 'topic' => ['type' => 'terms', 'taxonomy' => 'topics'], 'price' => 'range']"
 *         :sorts="['new' => 'latest', 'cheap' => ['label' => 'Price, low to high', 'order' => 'price']]" />
 *
 * Without a slot it prints an accessible form, the applied filters, the
 * entries and the page links; with one it leaves the markup to you:
 * `$component->entries` (a paginator), `->filters` (FilterControl),
 * `->sorts` (SortChoice), `->active` (ActiveFilter, each with a remove
 * link), `->action`, `->clearUrl()`, `->filtered()`, `->filter($name)`
 * and `->query()` (the filtered EntryQuery). Only the filters declared
 * are read from the address; values not among a filter's options are
 * ignored. A range or date range may offer `options` (the steps of a
 * select): the page cache keeps a filtered page only for values among a
 * filter's terms or options (any number, date or text isn't kept).
 *
 * @api
 */
final class EntryFilter extends Component
{
    /** @var LengthAwarePaginator<int, EntryTranslation> */
    public LengthAwarePaginator $entries;

    /** @var list<FilterControl> */
    public array $filters = [];

    /** @var list<SortChoice> */
    public array $sorts = [];

    /** @var list<ActiveFilter> */
    public array $active = [];

    /** The page the form sends to: this one. */
    public string $action;

    public string $sortName;

    public string $pageName;

    /** @var array<mixed> the query string's other parameters, kept by the form and the links */
    public array $others = [];

    private EntryQuery $query;

    /**
     * @param  array<string, string|array<string, mixed>>  $filters  query string name => type, or [type, field, label, options, multiple, taxonomy, hide_empty]
     * @param  array<string, string|array{label?: string, order?: string}>  $sorts  query string value => order ("-price", "latest"), or [label, order]; the first is the default
     * @param  array<mixed>  $where  fixed conditions, as on <x-sunrice-cms::entries>
     * @param  string|array<string, string|list<string>>  $terms  fixed terms by slug, as on <x-sunrice-cms::entries>
     */
    public function __construct(
        string $collection,
        array $filters = [],
        array $sorts = [],
        ?int $perPage = null,
        string $pageName = 'page',
        string $sortName = 'sort',
        array $where = [],
        string|array $terms = [],
    ) {
        $model = Collection::query()->where('handle', $collection)->first();
        if ($model === null) {
            throw new InvalidArgumentException("There's no collection \"{$collection}\".");
        }
        $request = request();
        $this->pageName = $pageName;
        $this->sortName = $sortName;
        $this->action = $request->url();
        $this->query = Content::entries($model->handle);
        Attributes::where($this->query, $where);
        Attributes::terms($this->query, $terms);

        $owned = [$pageName, $sortName];
        foreach ($filters as $name => $definition) {
            $filter = $this->control((string) $name, is_array($definition) ? $definition : ['type' => $definition], $model);
            $this->apply($filter);
            $this->filters[] = $filter;
            array_push($owned, ...$filter->params);
        }

        $this->sorts = self::sortChoices($sorts, $request->query($sortName), $sortName);
        $sort = Arr::first($this->sorts, fn (SortChoice $choice): bool => $choice->selected);
        // None given: the collection's own order.
        Attributes::order($this->query, $sort->order ?? match (true) {
            $model->ordered => 'ordered',
            $model->dated => 'latest',
            default => 'alphabetical',
        });

        $this->others = Arr::except($request->query(), $owned);
        $this->entries = $this->query->paginate(max(1, min(100, $perPage ?? $model->per_page)), $pageName)
            ->appends(Arr::except($request->query(), [$pageName]));
        $this->active = $this->activeFilters();
    }

    /** The filtered query (with the sort chosen), for more: a count, a map. */
    public function query(): EntryQuery
    {
        return $this->query;
    }

    /** Whether any filter is applied. */
    public function filtered(): bool
    {
        return $this->active !== [];
    }

    /** This page without any filter (the other parameters kept). */
    public function clearUrl(): string
    {
        return $this->url($this->others);
    }

    /** A declared filter, by its query string name. */
    public function filter(string $name): ?FilterControl
    {
        foreach ($this->filters as $filter) {
            if ($filter->name === $name) {
                return $filter;
            }
        }

        return null;
    }

    public function render(): View
    {
        return view('sunrice-cms::components.entry-filter');
    }

    /** @param  array<string, mixed>  $definition */
    private function control(string $name, array $definition, Collection $collection): FilterControl
    {
        if (preg_match('/^[a-z][a-z0-9_]*$/', $name) !== 1) {
            throw new InvalidArgumentException("\"{$name}\" can't name a filter: use lowercase letters, digits and underscores.");
        }
        $type = is_string($definition['type'] ?? null) ? $definition['type'] : 'select';
        if (! in_array($type, FilterControl::TYPES, true)) {
            throw new InvalidArgumentException("\"{$type}\" isn't a filter type: use one of ".implode(', ', FilterControl::TYPES).'.');
        }
        $field = is_string($definition['field'] ?? null) ? $definition['field'] : $name;
        $label = is_string($definition['label'] ?? null) ? $definition['label'] : Str::headline($name);
        $multiple = in_array($type, ['terms', 'select'], true) && (bool) ($definition['multiple'] ?? $type === 'terms');
        $filter = new FilterControl($name, $type, $field, $label, $multiple);
        $raw = request()->query($name);

        switch ($type) {
            case 'search':
                $filter->value = is_string($raw) ? trim(mb_substr($raw, 0, 100)) : '';
                if ($filter->value !== '') {
                    // Any text: as many copies as searches.
                    self::ignored();
                }
                break;
            case 'range':
            case 'date_range':
                [$low, $high] = $type === 'range' ? ['min', 'max'] : ['from', 'to'];
                $filter->inputs = [$low => "{$name}_{$low}", $high => "{$name}_{$high}"];
                $filter->params = array_values($filter->inputs);
                // The values offered (a select of steps): only they make a kept page of their own.
                $options = self::selectOptions($definition['options'] ?? []);
                $offered = array_column($options, 'value');
                $value = [];
                foreach ($filter->inputs as $key => $input) {
                    $given = request()->query($input);
                    $value[$key] = match (true) {
                        $type === 'range' && is_numeric($given) => (string) $given,
                        $type === 'date_range' && is_string($given) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $given) === 1 && strtotime($given) !== false => $given,
                        default => null,
                    };
                    if ($value[$key] !== null && in_array($value[$key], $offered, true)) {
                        self::read($input);
                    } elseif ($given !== null && $given !== '') {
                        self::ignored();
                    }
                }
                $filter->value = $value;
                break;
            case 'toggle':
                $filter->value = in_array($raw, ['1', 'true', 'on', 'yes'], true);
                if ($filter->value || $raw === '0') {
                    self::read($name);
                } elseif (! in_array($raw, [null, ''], true)) {
                    self::ignored();
                }
                break;
            case 'terms':
                $filter->taxonomy = is_string($definition['taxonomy'] ?? null) ? $definition['taxonomy'] : $name;
                [$options, $aliases] = self::termOptions($filter->taxonomy, $collection, (bool) ($definition['hide_empty'] ?? false));
                // A term's slug in another language, or its id, is the same term (a link from another language, or a menu's).
                $raw = is_array($raw) ? array_map(fn (mixed $v): mixed => is_scalar($v) ? ($aliases[(string) $v] ?? $v) : $v, $raw) : (is_scalar($raw) ? ($aliases[(string) $raw] ?? $raw) : $raw);
                $filter->value = self::chosen($raw, array_column($options, 'value'), $multiple);
                if ($filter->applied()) {
                    self::read($name);
                }
                break;
            default:
                // The field as any blueprint the collection offers has it.
                $schemaField = null;
                foreach ($collection->allSchemas() as $schema) {
                    $schemaField ??= $schema->field($field);
                }
                $filter->storesList = $schemaField?->configBool('multiple') ?? false;
                $options = self::selectOptions($definition['options'] ?? $schemaField?->config('options') ?? []);
                $allowed = array_column($options, 'value');
                $filter->value = self::chosen($raw, $allowed, $multiple, $allowed === []);
                if ($filter->applied()) {
                    // Without options, any text: as many copies as values.
                    $allowed === [] ? self::ignored() : self::read($name);
                }
        }
        $chosen = is_array($filter->value) ? $filter->value : [$filter->value];
        $filter->options = array_map(fn (array $option): array => ['selected' => in_array($option['value'], $chosen, true)] + $option, $options ?? []);

        return $filter;
    }

    private function apply(FilterControl $filter): void
    {
        $value = $filter->value;
        switch ($filter->type) {
            case 'search':
                if (is_string($value) && $value !== '') {
                    $this->query->search($value);
                }
                break;
            case 'range':
                $value = is_array($value) ? $value : [];
                if (is_numeric($value['min'] ?? null)) {
                    $this->query->where($filter->field, '>=', $value['min'] + 0);
                }
                if (is_numeric($value['max'] ?? null)) {
                    $this->query->where($filter->field, '<=', $value['max'] + 0);
                }
                break;
            case 'date_range':
                $value = is_array($value) ? $value : [];
                if (is_string($value['from'] ?? null)) {
                    $this->query->where($filter->field, '>=', $value['from'].' 00:00:00');
                }
                if (is_string($value['to'] ?? null)) {
                    $this->query->where($filter->field, '<=', $value['to'].' 23:59:59');
                }
                break;
            case 'toggle':
                if ($value === true) {
                    $this->query->where($filter->field, true);
                }
                break;
            case 'terms':
                $slugs = array_values(array_filter(is_array($value) ? $value : [$value], is_string(...)));
                if ($slugs !== [] && $filter->taxonomy !== null) {
                    $this->query->whereTerm($filter->taxonomy, $slugs, includeChildren: true);
                }
                break;
            default:
                $values = array_values(array_filter(is_array($value) ? $value : [$value], fn (mixed $v): bool => is_string($v) && $v !== ''));
                match (true) {
                    $values === [] => null,
                    $filter->storesList => $this->query->whereContains($filter->field, $values),
                    count($values) === 1 => $this->query->where($filter->field, $values[0]),
                    default => $this->query->where($filter->field, 'in', $values),
                };
        }
    }

    /**
     * The applied filters, each value with the address of the list without it.
     *
     * @return list<ActiveFilter>
     */
    private function activeFilters(): array
    {
        $query = Arr::except(request()->query(), [$this->pageName]);
        $active = [];
        foreach ($this->filters as $filter) {
            if (! $filter->applied()) {
                continue;
            }
            switch ($filter->type) {
                case 'range':
                case 'date_range':
                    foreach ($filter->inputs as $key => $input) {
                        $value = is_array($filter->value) ? ($filter->value[$key] ?? null) : null;
                        if (is_string($value)) {
                            $active[] = new ActiveFilter($filter->name, $filter->label, mb_strtolower(__('sunrice-cms::site.filter.'.$key)).' '.$value, $this->url(Arr::except($query, [$input])));
                        }
                    }
                    break;
                case 'search':
                case 'toggle':
                    $active[] = new ActiveFilter($filter->name, $filter->label, is_string($filter->value) ? $filter->value : $filter->label, $this->url(Arr::except($query, [$filter->name])));
                    break;
                default:
                    $values = is_array($filter->value) ? $filter->value : [(string) $filter->value];
                    foreach ($values as $value) {
                        // The other parameters stay where they were.
                        $rest = $query;
                        $remaining = array_values(array_diff($values, [$value]));
                        if ($remaining !== []) {
                            $rest[$filter->name] = $remaining;
                        } else {
                            unset($rest[$filter->name]);
                        }
                        $option = Arr::first($filter->options, fn (array $o): bool => $o['value'] === $value);
                        $active[] = new ActiveFilter($filter->name, $filter->label, is_array($option) ? $option['label'] : (string) $value, $this->url($rest));
                    }
            }
        }

        return $active;
    }

    /** @param  array<mixed>  $query */
    private function url(array $query): string
    {
        return $this->action.($query === [] ? '' : '?'.Arr::query($query));
    }

    /**
     * The values asked for that are allowed: the first (or all, when several may be chosen).
     *
     * @param  list<string>  $allowed
     * @return string|list<string>|null
     */
    private static function chosen(mixed $raw, array $allowed, bool $multiple, bool $any = false): string|array|null
    {
        $given = array_map(fn (mixed $v): string => is_scalar($v) ? trim(mb_substr((string) $v, 0, 200)) : '', is_array($raw) ? $raw : ($raw === null ? [] : [$raw]));
        $values = array_values(array_unique(array_filter($given, fn (string $v): bool => $v !== '' && ($any || in_array($v, $allowed, true)))));
        if (count(array_filter($given, fn (string $v): bool => $v !== '')) > count($values) || (! $multiple && count($values) > 1)) {
            self::ignored();
        }

        return $multiple ? $values : ($values[0] ?? null);
    }

    /** A value in the address was ignored, or is one of any number: the page isn't kept, so made-up values can't fill the page cache. */
    private static function ignored(): void
    {
        app(PageCache::class)->dontKeep();
    }

    /** A parameter read with a value among the filter's own: the page may be kept under it. */
    private static function read(string $name): void
    {
        app(PageCache::class)->read($name);
    }

    /**
     * A terms filter's choices: the taxonomy's terms in the editors' order,
     * those under others after them, by their slug in the current language
     * (else the main one's), each counting the entries under it too (as the
     * filter finds them); and what else names each: its slugs in the other
     * languages and its id.
     *
     * @return array{0: list<array{value: string, label: string, count: int, depth: int}>, 1: array<int|string, string>}
     */
    private static function termOptions(string $taxonomy, Collection $collection, bool $hideEmpty): array
    {
        $terms = new Terms($taxonomy, $collection->handle, $hideEmpty, tree: true, includeChildren: true);
        $options = [];
        $aliases = [];
        $walk = function (Items $list, int $depth) use (&$walk, &$options, &$aliases): void {
            foreach ($list as $term) {
                if (! $term instanceof Term) {
                    continue;
                }
                $slug = $term->translation(Locales::current())->slug ?? '';
                $count = $term->getAttribute('entries_count');
                if ($slug !== '') {
                    $options[] = ['value' => $slug, 'label' => $term->title(Locales::current()), 'count' => is_numeric($count) ? (int) $count : 0, 'depth' => $depth];
                    $aliases += [(string) $term->id => $slug];
                    foreach ($term->translations as $translation) {
                        if ($translation->slug !== $slug) {
                            $aliases += [$translation->slug => $slug];
                        }
                    }
                }
                $children = $term->relationLoaded('children') ? $term->getRelation('children') : null;
                if ($children instanceof Items && $depth < 20) {
                    $walk($children, $depth + 1);
                }
            }
        };
        $walk($terms->terms, 0);
        // A slug of the page's own language is never another term's alias.
        $aliases = array_diff_key($aliases, array_flip(array_column($options, 'value')));

        return [$options, $aliases];
    }

    /**
     * Choices given (value => label, or [value, label] rows), else the
     * select field's own.
     *
     * @return list<array{value: string, label: string}>
     */
    private static function selectOptions(mixed $options): array
    {
        $normalized = [];
        foreach (is_array($options) ? $options : [] as $key => $option) {
            [$value, $label] = match (true) {
                is_array($option) => [is_scalar($option['value'] ?? null) ? (string) $option['value'] : '', is_scalar($option['label'] ?? null) ? (string) $option['label'] : ''],
                is_string($key) => [$key, is_scalar($option) ? (string) $option : ''],
                default => [is_scalar($option) ? (string) $option : '', ''],
            };
            if ($value !== '') {
                $normalized[] = ['value' => $value, 'label' => $label !== '' ? $label : $value];
            }
        }

        return $normalized;
    }

    /**
     * The sort choices, the one asked for (else the first) selected.
     *
     * @param  array<string, string|array{label?: string, order?: string}>  $sorts
     * @return list<SortChoice>
     */
    private static function sortChoices(array $sorts, mixed $current, string $sortName): array
    {
        $choices = [];
        foreach ($sorts as $value => $sort) {
            $order = is_array($sort) ? ($sort['order'] ?? '') : $sort;
            $label = is_array($sort) && isset($sort['label']) ? $sort['label'] : Str::headline((string) $value);
            $choices[] = new SortChoice((string) $value, $label, $order !== '' ? $order : 'latest');
        }
        if ($choices === []) {
            return [];
        }
        $selected = Arr::first($choices, fn (SortChoice $choice): bool => $choice->value === $current);
        if ($selected === null && $current !== null && $current !== '') {
            self::ignored();
        } elseif ($selected !== null) {
            self::read($sortName);
        }
        $selected ??= $choices[0];
        $selected->selected = true;

        return $choices;
    }
}
