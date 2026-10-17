<?php

declare(strict_types=1);

namespace Sunrice\Structure;

/**
 * What Sunrice::importStructure() did (or, in a dry run, would do), one
 * line per definition item.
 */
class ImportReport
{
    /** Created from the definition. */
    public const CREATED = 'created';

    /** Already there and matching the definition. */
    public const UNCHANGED = 'unchanged';

    /** Already there but different; left as it is (see differences). */
    public const CHANGED = 'changed';

    /** Already there, different, and overwritten (force). */
    public const UPDATED = 'updated';

    /** @var array<int, array{type: string, handle: string, status: string, differences: array<int, string>}> */
    protected array $items = [];

    public function __construct(public readonly bool $dryRun = false) {}

    /** @param  array<int, string>  $differences  dot paths of what differs */
    public function add(string $type, string $handle, string $status, array $differences = []): void
    {
        $this->items[] = ['type' => $type, 'handle' => $handle, 'status' => $status, 'differences' => array_values($differences)];
    }

    /** @return array<int, array{type: string, handle: string, status: string, differences: array<int, string>}> */
    public function items(?string $status = null): array
    {
        return $status === null
            ? $this->items
            : array_values(array_filter($this->items, fn (array $item) => $item['status'] === $status));
    }

    public function status(string $type, string $handle): ?string
    {
        foreach ($this->items as $item) {
            if ($item['type'] === $type && $item['handle'] === $handle) {
                return $item['status'];
            }
        }

        return null;
    }

    /** Anything created or overwritten. */
    public function wroteAnything(): bool
    {
        return $this->items(self::CREATED) !== [] || $this->items(self::UPDATED) !== [];
    }

    /** @return array{dry_run: bool, items: array<int, array{type: string, handle: string, status: string, differences: array<int, string>}>} */
    public function toArray(): array
    {
        return ['dry_run' => $this->dryRun, 'items' => $this->items];
    }
}
