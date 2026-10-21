<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use ArrayAccess;
use Closure;
use Countable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Pagination\LengthAwarePaginator as Paginated;
use IteratorAggregate;
use JsonSerializable;
use LogicException;
use Stringable;
use Sunrice\Cms\Models\EntryTranslation;
use Traversable;

/**
 * The `$entries` of listing and term pages: a paginator whose query runs
 * only when the template first uses it, so a template that lists entries
 * its own way (an entry filter, `Cms::entries()`) costs nothing for it.
 * Everything a paginator does works on it, and anything else is passed
 * to the paginator (`getCollection()`, `onEachSide()`); a page past the
 * last is a 404 then.
 *
 * @implements LengthAwarePaginator<int, EntryTranslation>
 * @implements IteratorAggregate<int, EntryTranslation>
 * @implements ArrayAccess<int, EntryTranslation>
 * @implements Arrayable<array-key, mixed>
 *
 * @mixin Paginated<int, EntryTranslation>
 *
 * @internal
 */
final class LazyEntries implements Arrayable, ArrayAccess, Countable, Htmlable, IteratorAggregate, Jsonable, JsonSerializable, LengthAwarePaginator, Stringable
{
    /** @var Paginated<int, EntryTranslation>|null */
    private ?Paginated $paginator = null;

    /** @param  Closure(): Paginated<int, EntryTranslation>  $query */
    public function __construct(private readonly Closure $query) {}

    /** Whether the query ran. */
    public function loaded(): bool
    {
        return $this->paginator !== null;
    }

    /** @return Paginated<int, EntryTranslation> */
    public function paginator(): Paginated
    {
        if ($this->paginator === null) {
            $this->paginator = ($this->query)();
            abort_if($this->paginator->currentPage() > 1 && $this->paginator->isEmpty(), 404);
        }

        return $this->paginator;
    }

    /** @param  array<mixed>  $arguments */
    public function __call(string $method, array $arguments): mixed
    {
        $result = $this->paginator()->{$method}(...$arguments);

        return $result === $this->paginator ? $this : $result;
    }

    public function __get(string $name): mixed
    {
        return $this->paginator()->{$name};
    }

    public function url($page): string
    {
        return $this->paginator()->url($page);
    }

    /** @param  array<string, mixed>|string|null  $key */
    public function appends($key, $value = null): static
    {
        $this->paginator()->appends($key, $value);

        return $this;
    }

    public function fragment($fragment = null): static|string|null
    {
        if ($fragment === null) {
            return $this->paginator()->fragment();
        }
        $this->paginator()->fragment($fragment);

        return $this;
    }

    public function withQueryString(): static
    {
        $this->paginator()->withQueryString();

        return $this;
    }

    public function nextPageUrl(): ?string
    {
        return $this->paginator()->nextPageUrl();
    }

    public function previousPageUrl(): ?string
    {
        return $this->paginator()->previousPageUrl();
    }

    /** @return array<int, EntryTranslation> */
    public function items(): array
    {
        return $this->paginator()->items();
    }

    public function firstItem(): ?int
    {
        return $this->paginator()->firstItem();
    }

    public function lastItem(): ?int
    {
        return $this->paginator()->lastItem();
    }

    public function perPage(): int
    {
        return $this->paginator()->perPage();
    }

    public function currentPage(): int
    {
        return $this->paginator()->currentPage();
    }

    public function hasPages(): bool
    {
        return $this->paginator()->hasPages();
    }

    public function hasMorePages(): bool
    {
        return $this->paginator()->hasMorePages();
    }

    public function path(): ?string
    {
        return $this->paginator()->path();
    }

    public function isEmpty(): bool
    {
        return $this->paginator()->isEmpty();
    }

    public function isNotEmpty(): bool
    {
        return $this->paginator()->isNotEmpty();
    }

    /** @param  array<mixed>  $data */
    public function render($view = null, $data = []): string
    {
        return $this->paginator()->render(is_string($view) ? $view : null, $data)->toHtml();
    }

    /** @param  array<mixed>  $data */
    public function links(?string $view = null, array $data = []): Htmlable
    {
        return $this->paginator()->links($view, $data);
    }

    /** @return array<int|string, mixed> */
    public function getUrlRange($start, $end): array
    {
        return $this->paginator()->getUrlRange($start, $end);
    }

    public function total(): int
    {
        return $this->paginator()->total();
    }

    public function lastPage(): int
    {
        return $this->paginator()->lastPage();
    }

    /** @return Traversable<int, EntryTranslation> */
    public function getIterator(): Traversable
    {
        return $this->paginator()->getIterator();
    }

    /** @return int<0, max> */
    public function count(): int
    {
        return max(0, $this->paginator()->count());
    }

    public function offsetExists(mixed $offset): bool
    {
        return $this->paginator()->offsetExists($offset);
    }

    public function offsetGet(mixed $offset): mixed
    {
        return $this->paginator()->offsetGet($offset);
    }

    public function offsetSet(mixed $offset, mixed $value): void
    {
        throw new LogicException('A page of entries can\'t be changed.');
    }

    public function offsetUnset(mixed $offset): void
    {
        throw new LogicException('A page of entries can\'t be changed.');
    }

    /** @return array<array-key, mixed> */
    public function toArray(): array
    {
        return $this->paginator()->toArray();
    }

    /** @return array<mixed> */
    public function jsonSerialize(): array
    {
        return $this->paginator()->jsonSerialize();
    }

    public function toJson($options = 0): string
    {
        return $this->paginator()->toJson($options);
    }

    public function toHtml(): string
    {
        return $this->paginator()->toHtml();
    }

    public function __toString(): string
    {
        return (string) $this->paginator();
    }
}
