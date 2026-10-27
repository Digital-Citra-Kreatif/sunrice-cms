<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * A page of a query's rows, read in two steps: the page's ids first, in
 * the query's order, then those rows by id with the query's eager loads.
 * The database sorts and skips narrow rows, not whole ones with their
 * fields (an entry translation's drafts and search text): a deep page of
 * a list in another language, with the main language standing in, sorts
 * every candidate row. The same rows, in the same order, as paginate().
 *
 * @internal
 */
final class IdPage
{
    /**
     * @template TModel of Model
     *
     * @param  Builder<TModel>  $query
     * @return LengthAwarePaginator<int, TModel>
     */
    public static function paginate(Builder $query, int $perPage, string $pageName = 'page', ?int $page = null): LengthAwarePaginator
    {
        $ids = self::ids($query, $perPage, $pageName, $page);
        $keys = $ids->getCollection()->all();
        $model = $query->getModel();
        // Found by the query already: read by id as they are, with what it loads with them.
        $found = $keys === [] ? [] : $model->newQueryWithoutScopes()->setEagerLoads($query->getEagerLoads())->whereKey($keys)->get()->getDictionary();
        $rows = $model->newCollection(array_values(array_filter(array_map(fn (int|string $key): ?Model => $found[$key] ?? null, $keys))));

        /** @var LengthAwarePaginator<int, TModel> */
        return new LengthAwarePaginator($rows, $ids->total(), $ids->perPage(), $ids->currentPage(), $ids->getOptions());
    }

    /**
     * The page's ids, in the query's order, and how many rows there are.
     *
     * @param  Builder<covariant Model>  $query
     * @return LengthAwarePaginator<int, int|string>
     */
    public static function ids(Builder $query, int $perPage, string $pageName = 'page', ?int $page = null): LengthAwarePaginator
    {
        $key = $query->getModel()->getKeyName();
        $paginator = (clone $query)->setEagerLoads([])->paginate($perPage, [$query->qualifyColumn($key)], $pageName, $page);
        $ids = [];
        foreach ($paginator->getCollection() as $row) {
            $id = $row->getAttribute($key);
            if (is_int($id) || is_string($id)) {
                $ids[] = $id;
            }
        }

        /** @var LengthAwarePaginator<int, int|string> */
        return new LengthAwarePaginator($ids, $paginator->total(), $paginator->perPage(), $paginator->currentPage(), $paginator->getOptions());
    }
}
