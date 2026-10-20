<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components\Filter;

/**
 * One filter of <x-sunrice-cms::entry-filter>, as its form needs it: the
 * label, the input names, the value read from the address and the options.
 *
 * @api
 */
final class FilterControl
{
    public const TYPES = ['search', 'terms', 'select', 'range', 'date_range', 'toggle'];

    /** @var list<array{value: string, label: string, selected: bool, count?: int, depth?: int}> a select's or terms filter's choices */
    public array $options = [];

    /**
     * The value read from the address: a string (search, a single select or
     * terms), a list of strings (multiple), a bool (toggle), or
     * ['min' => ?string, 'max' => ?string] and ['from' => ?string, 'to' => ?string] (ranges).
     *
     * @var string|list<string>|bool|array<string, string|null>|null
     */
    public string|array|bool|null $value = null;

    /** @var array<string, string> input names: ['value' => 'topic[]'], ['min' => 'price_min', 'max' => 'price_max'] */
    public array $inputs;

    /** @var list<string> the query string keys it reads */
    public array $params;

    /** A terms filter's taxonomy handle. */
    public ?string $taxonomy = null;

    /** Whether a select filter's field holds a list of values (a select with several choices). */
    public bool $storesList = false;

    public function __construct(
        /** Its query string name. */
        public readonly string $name,
        /** One of TYPES. */
        public readonly string $type,
        /** The field it filters on. */
        public readonly string $field,
        public readonly string $label,
        /** Several values may be chosen (terms and select filters). */
        public readonly bool $multiple = false,
    ) {
        $this->inputs = ['value' => $multiple ? $name.'[]' : $name];
        $this->params = [$name];
    }

    /** The id of its input for the label's `for` (with a suffix for ranges: "min", "from"). */
    public function id(string $part = ''): string
    {
        return 'filter-'.$this->name.($part !== '' ? '-'.$part : '');
    }

    /** Whether the address applies it. */
    public function applied(): bool
    {
        return match (true) {
            is_bool($this->value) => $this->value,
            is_array($this->value) => array_filter($this->value, fn (mixed $v): bool => $v !== null && $v !== '') !== [],
            default => $this->value !== null && $this->value !== '',
        };
    }
}
