<?php

declare(strict_types=1);

namespace Sunrice\Cms\Structure;

/**
 * What StructureImporter did (or, in a dry run, would do), a line per
 * item: created, updated, unchanged, or refused (it would remove fields;
 * import with force to allow it), with notes.
 *
 * @api
 */
final class ImportReport
{
    public const CREATED = 'created';

    public const UPDATED = 'updated';

    public const UNCHANGED = 'unchanged';

    /** Left as it is: saving it would remove fields (see the notes). */
    public const REFUSED = 'refused';

    /** @var list<array{type: string, handle: string, status: string, notes: list<string>}> */
    private array $items = [];

    public function __construct(public readonly bool $dryRun = false) {}

    /** @param list<string> $notes */
    public function add(string $type, string $handle, string $status, array $notes = []): void
    {
        $this->items[] = ['type' => $type, 'handle' => $handle, 'status' => $status, 'notes' => $notes];
    }

    /** @return list<array{type: string, handle: string, status: string, notes: list<string>}> */
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

    /**
     * How many items have each status.
     *
     * @return array<string, int>
     */
    public function counts(): array
    {
        $counts = array_fill_keys([self::CREATED, self::UPDATED, self::UNCHANGED, self::REFUSED], 0);
        foreach ($this->items as $item) {
            $counts[$item['status']] = ($counts[$item['status']] ?? 0) + 1;
        }

        return $counts;
    }
}
