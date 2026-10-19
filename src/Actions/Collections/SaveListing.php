<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Collections;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Support\Locales;

/**
 * Saves a collection's listing page fields in a language; fields left out
 * keep their values. Fields not translated are saved in the main language.
 *
 * @api
 */
final class SaveListing
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $data
     *
     * @throws ValidationException
     */
    public function handle(Collection $collection, array $data, ?string $locale = null): CollectionListing
    {
        $locale ??= Locales::default();
        if (! Locales::has($locale)) {
            throw ValidationException::withMessages(['locale' => 'Choose one of the site\'s languages: '.implode(', ', Locales::all()).'.']);
        }
        $schema = $collection->listingSchema();
        if ($locale !== Locales::default()) {
            $schema = $schema->except($schema->shared());
        }
        $listing = $collection->listings()->firstOrNew(['locale' => $locale], ['data' => []]);
        $before = array_replace($schema->defaults(), $listing->data);
        $merged = EntryInput::merge($schema, $before, $data);
        $rules = $schema->rules($merged);
        Validator::make(['data' => $merged], $rules, [], EntryInput::attributes($schema, array_keys($rules)))->validate();
        $normalized = $schema->normalize($merged);

        $changed = array_keys(array_filter($normalized, fn (mixed $v, int|string $k): bool => ! array_key_exists($k, $before) || $before[$k] != $v, ARRAY_FILTER_USE_BOTH));
        /** @var array<string, mixed> $normalized */
        $listing->data = $normalized;
        $listing->save();
        $collection->unsetRelation('listings');
        $this->activity->updated('listing', $collection, $collection->title, array_map(strval(...), $changed));

        return $listing;
    }
}
