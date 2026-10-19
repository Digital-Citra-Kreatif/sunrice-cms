<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

/**
 * What ImportStructure did (or, in a dry run, would do): a line per item.
 *
 * @api
 */
final class ImportReport
{
    /** Made from the definition. */
    public const CREATED = 'created';

    /** There already, as the definition says. */
    public const UNCHANGED = 'unchanged';

    /** There already but different, and left as it is (see differences). */
    public const CHANGED = 'changed';

    /** There already, different, and overwritten (force). */
    public const UPDATED = 'updated';

    /** @var list<array{type: string, handle: string, status: string, differences: list<string>}> */
    private array $items = [];

    public function __construct(public readonly bool $dryRun = false) {}

    /** @param list<string> $differences what differs, as dot paths */
    public function add(string $type, string $handle, string $status, array $differences = []): void
    {
        $this->items[] = ['type' => $type, 'handle' => $handle, 'status' => $status, 'differences' => $differences];
    }

    /** @return list<array{type: string, handle: string, status: string, differences: list<string>}> */
    public function items(?string $status = null): array
    {
        return $status === null ? $this->items : array_values(array_filter($this->items, fn (array $item): bool => $item['status'] === $status));
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
}
