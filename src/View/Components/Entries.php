<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection as Items;
use Illuminate\View\Component;
use Sunrice\Cms\Content;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Term;

/**
 * Live entries for a part of a template, without PHP:
 *
 *     <x-sunrice-cms::entries collection="articles" :limit="3" :term="$news" :except="$entry">
 *         <ul>@foreach ($component->entries as $article)<li><a href="{{ $article->url() }}">{{ $article->title }}</a></li>@endforeach</ul>
 *     </x-sunrice-cms::entries>
 *
 * `order`: latest (default), oldest, alphabetical, ordered (as editors
 * put them), or a field ("event_date", "-event_date" for newest first).
 * `:paginate="12"` gives a paginator (`$component->entries->links()`).
 * Everything else is Cms::entries(): see EntryQuery.
 *
 * @api
 */
final class Entries extends Component
{
    /** @var Items<int, EntryTranslation>|LengthAwarePaginator<int, EntryTranslation> */
    public Items|LengthAwarePaginator $entries;

    /**
     * @param  string|list<string>  $collection  handles, or "articles,news"; empty for all
     * @param  Term|int|list<Term|int>|null  $term  with this term (or any of these)
     * @param  Entry|int|'top'|null  $parent  directly under this entry ('top': top-level ones)
     * @param  array<string, mixed>  $where  field => value, like where()
     * @param  Entry|EntryTranslation|int|list<Entry|EntryTranslation|int>|null  $except
     */
    public function __construct(
        string|array $collection = [],
        ?int $limit = null,
        ?int $paginate = null,
        string $order = 'latest',
        Term|int|array|null $term = null,
        Entry|int|string|null $parent = null,
        array $where = [],
        Entry|EntryTranslation|int|array|null $except = null,
    ) {
        $handles = is_string($collection) ? array_values(array_filter(array_map('trim', explode(',', $collection)))) : $collection;
        $query = Content::entries(...$handles);
        if ($term !== null) {
            $query->whereTerm(...(is_array($term) ? $term : [$term]));
        }
        if ($parent !== null) {
            $query->childrenOf($parent === 'top' ? null : $parent);
        }
        foreach ($where as $field => $value) {
            $query->where($field, $value);
        }
        if ($except !== null) {
            $query->except(...(is_array($except) ? $except : [$except]));
        }
        match ($order) {
            'latest' => $query->latest(),
            'oldest' => $query->oldest(),
            'alphabetical' => $query->alphabetical(),
            'ordered' => $query->ordered(),
            default => str_starts_with($order, '-') ? $query->orderBy(substr($order, 1), 'desc') : $query->orderBy($order),
        };
        if ($paginate !== null) {
            $this->entries = $query->paginate(max(1, min(100, $paginate)));

            return;
        }
        if ($limit !== null) {
            $query->limit(max(1, $limit));
        }
        $this->entries = $query->get();
    }

    public function render(): string
    {
        return '{{ $slot }}';
    }
}
