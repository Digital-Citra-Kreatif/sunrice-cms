<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Exists;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;

/**
 * Links to entries (config: collections, multiple, max). Stores entry ids;
 * templates get the linked entries' translations (EntryTranslation) in
 * the page's language, published ones only.
 */
final class EntriesField extends FieldType
{
    public const TYPE = 'entries';

    public function type(): string
    {
        return self::TYPE;
    }

    public function label(): string
    {
        return 'Entries';
    }

    public function rules(Field $field): array
    {
        if (! $field->configBool('multiple')) {
            return ['integer', $this->exists($field)];
        }
        $max = $field->configInt('max');

        return ['array', ...($max === null ? [] : ["max:{$max}"])];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return $field->configBool('multiple') ? ["{$key}.*" => ['integer', 'distinct', $this->exists($field)]] : [];
    }

    public function defaultValue(Field $field): mixed
    {
        return $field->configBool('multiple') ? [] : null;
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        if (! $field->configBool('multiple')) {
            return is_numeric($value) ? (int) $value : null;
        }

        return is_array($value) ? array_values(array_unique(array_map(intval(...), array_filter($value, 'is_numeric')))) : [];
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        if (! $field->configBool('multiple')) {
            return is_int($value) ? $context->entries([$value])->first() : null;
        }

        return $context->entries(is_array($value) ? array_values(array_filter($value, 'is_int')) : []);
    }

    public function references(mixed $value, Field $field): array
    {
        return Reference::many(Reference::ENTRY, is_array($value) ? $value : [$value]);
    }

    public function settings(): array
    {
        return [
            new Field('collections', 'select', 'From collections', required: true, config: [
                'multiple' => true,
                'options' => Collection::query()->orderBy('title')->get()->map(fn (Collection $c): array => ['value' => $c->handle, 'label' => $c->title])->all(),
            ]),
            new Field('multiple', 'toggle', 'Several entries'),
            new Field('max', 'number', 'At most', instructions: 'With several entries.', config: ['min' => 1, 'step' => 1]),
        ];
    }

    public function toAdmin(Field $field, Schema $schema): array
    {
        return ['collections' => $field->configStrings('collections')] + parent::toAdmin($field, $schema);
    }

    /** @return list<int> */
    private function collectionIds(Field $field): array
    {
        $handles = $field->configStrings('collections');

        return $handles === [] ? [] : array_values(Collection::query()->whereIn('handle', $handles)->get(['id'])->map(fn (Collection $c): int => $c->id)->all());
    }

    private function exists(Field $field): Exists
    {
        return Rule::exists((new Entry)->getTable(), 'id')->whereIn('collection_id', $this->collectionIds($field) ?: [0])->whereNull('deleted_at');
    }
}
