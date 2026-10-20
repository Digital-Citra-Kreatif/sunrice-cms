<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;

/** Fields kept together under one handle: `$entry->get('hero')['title']`. */
final class Group extends FieldType
{
    public function type(): string
    {
        return 'group';
    }

    public function rules(Field $field): array
    {
        return ['array'];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return Schema::children($field)->rules(is_array($value) ? $value : [], $key);
    }

    public function defaultValue(Field $field): mixed
    {
        return Schema::children($field)->defaults();
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        return Schema::children($field)->normalize(is_array($value) ? $value : []);
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        return Schema::children($field)->hydrate(is_array($value) ? $value : [], $context);
    }

    public function references(mixed $value, Field $field): array
    {
        return is_array($value) ? Schema::children($field)->references($value) : [];
    }

    public function translatableByDefault(): bool
    {
        return true;
    }

    public function hasChildren(): bool
    {
        return true;
    }

    public function toAdmin(Field $field, Schema $schema): array
    {
        return ['fields' => Schema::children($field, $schema->depth())->toAdmin()] + parent::toAdmin($field, $schema);
    }
}
