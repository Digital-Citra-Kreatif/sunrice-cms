<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Exists;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;

/**
 * Files from the media library. Settings: multiple, max, types (image,
 * video, audio, document). Stores a media id, or a list of ids when
 * multiple; templates get Media models (missing files left out).
 */
final class MediaField extends FieldType
{
    public function type(): string
    {
        return 'media';
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

        return is_array($value) ? array_values(array_map(intval(...), array_filter($value, 'is_numeric'))) : [];
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        if (! $field->configBool('multiple')) {
            return is_int($value) ? $context->media($value) : null;
        }

        return $context->mediaMany(is_array($value) ? array_values(array_filter($value, 'is_int')) : []);
    }

    public function references(mixed $value, Field $field): array
    {
        return Reference::many(Reference::MEDIA, is_array($value) ? $value : [$value]);
    }

    public function settings(): array
    {
        return [
            new Field('multiple', 'toggle', 'Several files'),
            new Field('max', 'number', 'At most', instructions: 'With several files.', config: ['min' => 1, 'step' => 1]),
            new Field('types', 'select', 'Kinds of file', instructions: 'None chosen: any file.', config: [
                'multiple' => true,
                'options' => array_map(fn (string $type): array => ['value' => $type, 'label' => ucfirst($type).'s'], Media::TYPES),
            ]),
        ];
    }

    private function exists(Field $field): Exists
    {
        $types = array_values(array_intersect($field->configStrings('types'), Media::TYPES));

        return Rule::exists((new Media)->getTable(), 'id')->where(function (Builder $query) use ($types): void {
            $query->whereNull('deleted_at');
            Media::whereTypes($query, $types);
        });
    }
}
