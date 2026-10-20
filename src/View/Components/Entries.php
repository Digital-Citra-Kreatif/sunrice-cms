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
 * put them), or fields ("event_date", "-event_date" for newest first,
 * several comma-separated). `:paginate="12"` gives a paginator
 * (`$component->entries->links()`), on `page-name` (page) in the query
 * string; `:terms="['topics' => ['news']]"` (or terms="topics:news,tips")
 * takes entries with those terms by slug, or the terms under them;
 * `:where` takes field => value or [field, operator, value] rows;
 * `search` finds words; `remember` keeps the matched ids in the site's
 * cache. Everything else is Cms::entries(): see EntryQuery.
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
     * @param  array<mixed>  $where  field => value, or [field, value] and [field, operator, value] rows, like where()
     * @param  string|array<string, string|list<string>>  $terms  taxonomy handle => slug(s), with the terms under them
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
        ?string $search = null,
        bool $remember = false,
        ?string $pageName = null,
        string|array $terms = [],
    ) {
        $query = Content::entries(...Attributes::handles($collection))->remember($remember);
        if ($search !== null) {
            $query->search($search);
        }
        if ($term !== null) {
            $query->whereTerm(...(is_array($term) ? $term : [$term]));
        }
        if ($parent !== null) {
            $query->childrenOf($parent === 'top' ? null : $parent);
        }
        Attributes::terms($query, $terms);
        Attributes::where($query, $where);
        if ($except !== null) {
            $query->except(...(is_array($except) ? $except : [$except]));
        }
        Attributes::order($query, $order);
        if ($paginate !== null) {
            $this->entries = $query->paginate(max(1, min(100, $paginate)), $pageName ?? 'page')->appends(request()->query());

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
