<?php

declare(strict_types=1);

namespace Sunrice\Cms\Query;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection as Items;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * Live entries for templates, in one language:
 *
 *     Cms::entries('articles')->whereTerm($news)->latest()->limit(5)->get()
 *
 * Only published entries past their date, of collections not deleted.
 *
 * @api
 */
final class EntryQuery
{
    /** @var Builder<EntryTranslation> */
    private Builder $query;

    /** @param list<string> $collections handles; none for all */
    public function __construct(array $collections = [], ?string $locale = null)
    {
        $this->query = EntryTranslation::query()->live()->with('entry.collection')
            ->where('locale', $locale ?? Locales::current())
            ->when($collections !== [], fn (Builder $q) => $q->whereIn('collection_id', Collection::query()->whereIn('handle', $collections)->select('id')));
    }

    /** Entries with this term (or any of these). */
    public function whereTerm(Term|int ...$terms): self
    {
        $ids = array_map(fn (Term|int $term): int => $term instanceof Term ? $term->id : $term, $terms);
        $this->query->whereHas('entry.terms', fn (Builder $q) => $q->whereIn('sunrice_terms.id', $ids));

        return $this;
    }

    public function whereSlug(string $slug): self
    {
        $this->query->where('slug', $slug);

        return $this;
    }

    /** Newest first by publish date. */
    public function latest(): self
    {
        $this->query->orderByDesc('published_at')->orderByDesc('id');

        return $this;
    }

    public function oldest(): self
    {
        $this->query->orderBy('published_at')->orderBy('id');

        return $this;
    }

    /** By title, A to Z. */
    public function alphabetical(): self
    {
        $this->query->orderBy('title');

        return $this;
    }

    public function limit(int $count): self
    {
        $this->query->limit($count);

        return $this;
    }

    /** @return Items<int, EntryTranslation> */
    public function get(): Items
    {
        return $this->query->get()->toBase();
    }

    public function first(): ?EntryTranslation
    {
        return $this->query->first();
    }

    public function count(): int
    {
        return $this->query->count();
    }

    /** @return LengthAwarePaginator<int, EntryTranslation> */
    public function paginate(int $perPage = 10): LengthAwarePaginator
    {
        return $this->query->paginate($perPage);
    }
}
