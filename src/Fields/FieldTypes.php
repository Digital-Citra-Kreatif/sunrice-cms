<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields;

use InvalidArgumentException;

/**
 * The field types blueprints can use: the built-in ones and those
 * registered by the app and plugins. One per app.
 *
 * @api
 */
final class FieldTypes
{
    /** @var array<string, FieldType> */
    private array $types = [];

    /** @param class-string<FieldType>|FieldType ...$types */
    public function register(string|FieldType ...$types): self
    {
        foreach ($types as $type) {
            $type = is_string($type) ? app($type) : $type;
            if (! $type instanceof FieldType) {
                throw new InvalidArgumentException('Field types extend '.FieldType::class.'.');
            }
            $key = $type->type();
            if (preg_match('/^[a-z][a-z0-9_]*$/', $key) !== 1) {
                throw new InvalidArgumentException("Field type \"{$key}\" (".$type::class.'): use lowercase letters, digits and underscores.');
            }
            if (isset($this->types[$key])) {
                throw new InvalidArgumentException("Field type \"{$key}\" is registered twice (".$this->types[$key]::class.' and '.$type::class.').');
            }
            $this->types[$key] = $type;
        }

        return $this;
    }

    /** @throws UnknownFieldType */
    public function get(string $type): FieldType
    {
        return $this->types[$type] ?? throw UnknownFieldType::named($type);
    }

    public function has(string $type): bool
    {
        return isset($this->types[$type]);
    }

    /** @return array<string, FieldType> */
    public function all(): array
    {
        return $this->types;
    }
}
