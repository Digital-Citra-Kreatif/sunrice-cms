<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

/**
 * Saves over a record only if nobody saved in between: the version the
 * editor opened must still be the record's. The check and the write are
 * one statement, and the version counts up. Entry drafts (SaveDraft),
 * globals, term pages and listing pages use it.
 *
 * @internal
 */
final class Versioned
{
    public const CONFLICT = 'Someone else saved this after you opened it. Reload to see their changes.';

    /**
     * The version from input: an integer, a digit string, or null (no check).
     *
     * @throws ValidationException
     */
    public static function expected(mixed $input): ?int
    {
        if ($input === null) {
            return null;
        }
        if (! is_int($input) && ! (is_string($input) && ctype_digit($input))) {
            throw ValidationException::withMessages(['version' => 'The version must be a number.']);
        }

        return (int) $input;
    }

    /**
     * Writes the attributes to the record if its version is still the
     * expected one (the record's own when null), counting it up, and
     * reloads the model. Refused with an error on "version" otherwise.
     * JSON columns take their value encoded (a query update doesn't cast).
     *
     * @param  array<string, mixed>  $attributes
     *
     * @throws ValidationException
     */
    public static function update(Model $model, ?int $expected, array $attributes): void
    {
        $version = $model->getAttribute('version');
        $expected ??= is_int($version) ? $version : 1;
        $saved = $model->newQuery()->whereKey($model->getKey())->where('version', $expected)->update($attributes + ['version' => $expected + 1]);
        if ($saved === 0) {
            throw ValidationException::withMessages(['version' => __(self::CONFLICT)]);
        }
        $model->refresh();
        // A query update fires no model events: the site's cache still hears of it.
        ContentWatch::updated($model);
    }
}
