<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Throwable;

/**
 * A date, or a date and time with the `time` setting. Stored as
 * "2026-10-19" or "2026-10-19T14:30:00"; templates get a Carbon.
 */
final class Date extends FieldType
{
    public function type(): string
    {
        return 'date';
    }

    public function rules(Field $field): array
    {
        return ['date'];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        if (! is_string($value) || $value === '') {
            return null;
        }
        try {
            $date = Carbon::parse($value);
        } catch (Throwable) {
            return null;
        }

        return $date->format($field->configBool('time') ? 'Y-m-d\TH:i:s' : 'Y-m-d');
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        try {
            return is_string($value) ? Carbon::parse($value) : null;
        } catch (Throwable) {
            return null;
        }
    }

    public function sortCast(): string
    {
        return 'date';
    }

    public function settings(): array
    {
        return [new Field('time', 'toggle', 'With time of day')];
    }
}
