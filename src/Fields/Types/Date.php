<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Closure;
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
        if (! $field->configBool('future')) {
            return ['date'];
        }

        // "Today or later" (a booking's preferred day): today in the app's time zone, said in the
        // visitor's language (Laravel's after_or_equal:today puts the English "today" in its line).
        return ['date', function (string $attribute, mixed $value, Closure $fail): void {
            try {
                $date = is_string($value) && $value !== '' ? Carbon::parse($value) : null;
            } catch (Throwable) {
                return; // not a date: the date rule says so
            }
            if ($date !== null && $date->lt(Carbon::today())) {
                $fail(__('sunrice-cms::site.forms.today_or_later'));
            }
        }];
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
        return [
            new Field('time', 'toggle', 'With time of day'),
            new Field('future', 'toggle', 'Today or later only', instructions: 'For a preferred date on a form, say: earlier days are refused.'),
        ];
    }
}
