<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Closure;
use Illuminate\Database\DatabaseTransactionsManager;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Sunrice\Cms\Models\Blueprint;

/**
 * Records every page reads (global sets, fieldsets, forms and their
 * blueprints) kept in the site cache's `pages` area as their plain
 * attributes, so they cost no queries until one changes. Read fresh
 * inside a database transaction: what it's changing isn't in the cache
 * until it commits.
 *
 * @internal
 */
final class SiteRecords
{
    /**
     * The records `$query` finds, from the site cache.
     *
     * @template TModel of Model
     *
     * @param  class-string<TModel>  $class
     * @param  Closure(): iterable<TModel>  $query
     * @return Collection<int, TModel>
     */
    public static function many(string $key, string $class, Closure $query): Collection
    {
        if (self::inTransaction()) {
            return new Collection(array_values([...$query()]));
        }
        $rows = app(SiteCache::class)->remember('records:'.$key, function () use ($query): array {
            $rows = [];
            foreach ($query() as $model) {
                $rows[] = $model->getAttributes();
            }

            return $rows;
        });

        /** @var Collection<int, TModel> $models */
        $models = $class::hydrate($rows);

        return $models;
    }

    /**
     * The record `$query` finds, or null, from the site cache.
     *
     * @template TModel of Model
     *
     * @param  class-string<TModel>  $class
     * @param  Closure(): ?TModel  $query
     * @return TModel|null
     */
    public static function one(string $key, string $class, Closure $query): ?Model
    {
        return self::many($key, $class, fn (): array => array_filter([$query()]))->first();
    }

    /** Inside a database transaction (not counting a test's own, as DB::afterCommit()). */
    private static function inTransaction(): bool
    {
        $manager = app()->bound('db.transactions') ? app('db.transactions') : null;

        return $manager instanceof DatabaseTransactionsManager ? $manager->callbackApplicableTransactions()->isNotEmpty() : DB::transactionLevel() > 0;
    }

    /** A blueprint by handle, from the site cache: all of them under one key, as a page reads several. */
    public static function blueprint(?string $handle): ?Blueprint
    {
        if ($handle === null) {
            return null;
        }
        if (self::inTransaction()) {
            return Blueprint::query()->where('handle', $handle)->first();
        }
        /** @var array<string, array<string, mixed>> $rows */
        $rows = app(SiteCache::class)->remember('records:blueprints', fn (): array => Blueprint::query()->get()
            ->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->getAttributes()])->all());

        return isset($rows[$handle]) ? Blueprint::hydrate([$rows[$handle]])->first() : null;
    }
}
