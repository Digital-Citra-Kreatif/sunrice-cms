<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use ArrayAccess;
use LogicException;

/**
 * One block of a flexible field: its type (a fieldset's handle) and its
 * hydrated values, readable as properties or array keys:
 *
 *     {{ $block->text }} — {{ $block['author'] }}
 *
 * @implements ArrayAccess<string, mixed>
 *
 * @api
 */
final readonly class Block implements ArrayAccess
{
    /** @param array<string, mixed> $values */
    public function __construct(
        public string $type,
        public string $id,
        public array $values = [],
        public ?string $key = null,
    ) {}

    public function get(string $handle, mixed $default = null): mixed
    {
        return $this->values[$handle] ?? $default;
    }

    public function __get(string $name): mixed
    {
        return $this->values[$name] ?? null;
    }

    public function __isset(string $name): bool
    {
        return isset($this->values[$name]);
    }

    public function offsetExists(mixed $offset): bool
    {
        return isset($this->values[$offset]);
    }

    public function offsetGet(mixed $offset): mixed
    {
        return $this->values[$offset] ?? null;
    }

    public function offsetSet(mixed $offset, mixed $value): void
    {
        throw new LogicException('Block values are read-only.');
    }

    public function offsetUnset(mixed $offset): void
    {
        throw new LogicException('Block values are read-only.');
    }
}
