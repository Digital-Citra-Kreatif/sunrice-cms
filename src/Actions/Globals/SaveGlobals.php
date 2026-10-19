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
     *
     * @throws ValidationException
     */
    public function handle(GlobalSet $set, array $data, ?string $locale = null): GlobalValue
    {
        $locale ??= Locales::default();
        if (! Locales::has($locale)) {
            throw ValidationException::withMessages(['locale' => 'Choose one of the site\'s languages: '.implode(', ', Locales::all()).'.']);
        }
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
        $value->data = $normalized;
        $value->save();
        $set->unsetRelation('values');
        $this->globals->flush();
        $this->activity->updated('globals', $set, $set->title, array_map(strval(...), $changed));

        return $value;
    }
}
