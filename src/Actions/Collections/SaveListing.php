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
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\Versioned;

/**
 * Saves a collection's listing page fields and SEO in a language; fields
 * left out keep their values. Fields not translated are saved in the main
 * language.
 *
 * @api
 */
final class SaveListing
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $data
     * @param  int|string|null  $version  the one the editor opened: a save over someone else's newer one is refused
     * @param  mixed  $seo  its SEO card (title, description, image, noindex, canonical; see Seo::validate()); null keeps it
     *
     * @throws ValidationException
     */
    public function handle(Collection $collection, array $data, ?string $locale = null, int|string|null $version = null, mixed $seo = null): CollectionListing
    {
        $locale ??= Locales::default();
        if (! Locales::has($locale)) {
            throw ValidationException::withMessages(['locale' => 'Choose one of the site\'s languages: '.implode(', ', Locales::all()).'.']);
        }
        $expected = Versioned::expected($version);
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
        if ($seo !== null) {
            $normalized[Seo::KEY] = Seo::validate($seo);
        }

        $changed = array_keys(array_filter($normalized, fn (mixed $v, int|string $k): bool => ! array_key_exists($k, $before) || $before[$k] != $v, ARRAY_FILTER_USE_BOTH));
        /** @var array<string, mixed> $normalized */
        if ($listing->exists) {
            // Only if nobody saved in between: the version check and the write are one statement.
            Versioned::update($listing, $expected, ['data' => json_encode($normalized, JSON_THROW_ON_ERROR)]);
        } else {
            $listing->data = $normalized;
            $listing->save();
        }
        $collection->unsetRelation('listings');
        $this->activity->updated('listing', $collection, $collection->title, array_map(strval(...), $changed));

        return $listing;
    }
}
