<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Globals;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Globals;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\MediaUsage;
use Sunrice\Cms\Support\References;
use Sunrice\Cms\Support\Versioned;

/**
 * Saves a global set's values in a language; they're live at once.
 * Fields left out keep their values; another language than the main one
 * leaves the shared fields alone.
 *
 * @api
 */
final class SaveGlobals
{
    public function __construct(
        private readonly ActivityLog $activity,
        private readonly Globals $globals,
    ) {}

    /**
     * @param  array<mixed>  $data
     * @param  int|string|null  $version  the one the editor opened: a save over someone else's newer one is refused
     *
     * @throws ValidationException
     */
    public function handle(GlobalSet $set, array $data, ?string $locale = null, int|string|null $version = null): GlobalValue
    {
        $locale ??= Locales::default();
        if (! Locales::has($locale)) {
            throw ValidationException::withMessages(['locale' => 'Choose one of the site\'s languages: '.implode(', ', Locales::all()).'.']);
        }
        $expected = Versioned::expected($version);
        $schema = $set->editableSchema($locale);
        $value = $set->values()->firstOrNew(['locale' => $locale], ['data' => []]);
        // What the site showed: the stored values over the defaults.
        $before = array_replace($schema->defaults(), $value->data);
        $merged = EntryInput::merge($schema, $before, $data);
        $rules = $schema->rules($merged);
        Validator::make(['data' => $merged], $rules, [], EntryInput::attributes($schema, array_keys($rules)))->validate();
        $normalized = $schema->normalize($merged);

        $changed = array_keys(array_filter($normalized, fn (mixed $v, int|string $k): bool => ! array_key_exists($k, $before) || $before[$k] != $v, ARRAY_FILTER_USE_BOTH));
        /** @var array<string, mixed> $normalized */
        if ($value->exists) {
            // Only if nobody saved in between: the version check and the write are one statement.
            Versioned::update($value, $expected, ['data' => json_encode($normalized, JSON_THROW_ON_ERROR)]);
            // A query update fires no model events: keep "Used by" here.
            MediaUsage::global($value);
            References::global($value);
        } else {
            $value->data = $normalized;
            $value->save();
        }
        $set->unsetRelation('values');
        $this->globals->flush();
        $this->activity->updated('globals', $set, $set->title, array_map(strval(...), $changed));

        return $value;
    }
}
