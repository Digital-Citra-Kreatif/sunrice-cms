<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

/**
 * EntryQuery::paginate()'s pages: the first page's link is the address
 * without ?page=1 (the page's own, canonical address), so "previous" from
 * page 2 doesn't lead to a copy of it.
 *
 * @template TKey of array-key
 * @template TValue
 *
 * @extends LengthAwarePaginator<TKey, TValue>
 *
 * @api
 */
class EntryPaginator extends LengthAwarePaginator
{
    /**
     * The same page as one of Laravel's paginators.
     *
     * @template TFromKey of array-key
     * @template TFromValue
     *
     * @param  LengthAwarePaginator<TFromKey, TFromValue>  $paginator
     * @return self<TFromKey, TFromValue>
     */
    public static function from(LengthAwarePaginator $paginator): self
    {
        return new self($paginator->getCollection(), $paginator->total(), $paginator->perPage(), $paginator->currentPage(), $paginator->getOptions());
    }

    /**
     * @param  int  $page
     */
    public function url($page): string
    {
        if ($page > 1) {
            return parent::url($page);
        }
        $query = Arr::except($this->query, [$this->pageName]);
        $path = $this->path() ?? '';

        return $path.($query === [] ? '' : (str_contains($path, '?') ? '&' : '?').Arr::query($query)).$this->buildFragment();
    }
}
