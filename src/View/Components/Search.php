<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\View\Component;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Site\Search as SiteSearch;

/**
 * Site search for templates: a search box anywhere, or results of your
 * own (searching some collections only, say):
 *
 *     <x-sunrice-cms::search>
 *         <form action="{{ $component->action }}" role="search"><input type="search" name="{{ $component->name }}" value="{{ $component->query }}"></form>
 *     </x-sunrice-cms::search>
 *
 *     <x-sunrice-cms::search results collection="help" :per-page="20">
 *         <ul>@foreach ($component->results as $entry)<li><a href="{{ $entry->url() }}">{{ $entry->title }}</a></li>@endforeach</ul>
 *     </x-sunrice-cms::search>
 *
 * `action` is the search page in the page's language, `name` the query
 * string's name (q), `query` what was searched.
 *
 * @api
 */
final class Search extends Component
{
    public string $action;

    public string $name = SiteSearch::NAME;

    public string $query;

    /** @var LengthAwarePaginator<int, EntryTranslation>|null */
    public ?LengthAwarePaginator $results = null;

    /** @param string|list<string>|null $collection handles, or "help,faq"; null: what the search page covers */
    public function __construct(bool $results = false, string|array|null $collection = null, ?int $perPage = null)
    {
        $this->action = SiteSearch::url();
        $query = request()->query(SiteSearch::NAME);
        $this->query = is_string($query) ? trim(mb_substr($query, 0, 100)) : '';
        if ($results) {
            $handles = is_string($collection) ? array_values(array_filter(array_map('trim', explode(',', $collection)))) : $collection;
            $this->results = app(SiteSearch::class)->entries($this->query, $handles, $perPage);
        }
    }

    public function render(): string
    {
        return '{{ $slot }}';
    }
}
