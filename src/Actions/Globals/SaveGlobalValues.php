<?php

declare(strict_types=1);

namespace Sunrice\Actions\Globals;

use Sunrice\Events\ContentChanged;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\GlobalValue;
use Sunrice\Support\Locales;

/**
 * Validates and persists one language's values for a global set: all
 * of them for the main language, the translatable ones for another.
 */
class SaveGlobalValues
{
    /**
     * @param  array{values?: array<string, mixed>, locale?: string|null}  $attributes
     */
    public function handle(GlobalSet $set, array $attributes): GlobalValue
    {
        $validated = validator($attributes, [
            'locale' => ['nullable', 'string', 'max:10'],
            'values' => ['array'],
        ])->after(function ($v) {
            $locale = $v->safe()?->toArray()['locale'] ?? null;
            if ($locale !== null && ! Locales::isAvailable($locale)) {
                $v->errors()->add('locale', 'Unknown locale.');
            }
        })->validate();

        $locale = $validated['locale'] ?? Locales::main();

        $values = $validated['values'] ?? [];
        $schema = $set->blueprint?->schema();
        if ($schema !== null) {
            validator(['values' => $values], $schema->rules('values'))->validate();
            $values = $schema->normalize($values);
        }

        $row = $set->setValuesFor($locale, $values);

        ContentChanged::dispatch('global_saved');

        return $row;
    }
}
