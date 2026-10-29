<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Support\Locales;

/**
 * No other collection (or taxonomy) may have the same URL pattern in a
 * language (RouteConflicts); a listing or index page's address no other
 * fixed page's either, and a changed entry or term page pattern may not
 * put an entry or term at a fixed address (RouteConflicts::landing()). For a language's own pattern ($locale),
 * that language; for the main one, the main language and each language
 * that uses it: those whose own field in the form (`route_id`) is empty.
 *
 * @internal
 */
final class UniqueRouteRule implements DataAwareRule, ValidationRule
{
    /** @var array<mixed> */
    private array $data = [];

    public function __construct(private readonly ?Model $record, private readonly string $attribute, private readonly ?string $locale = null) {}

    /** @param array<mixed> $data */
    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }

    /** The name of a language's own field for an attribute: route_id, listing_route_pt_br. */
    public static function field(string $attribute, string $locale): string
    {
        return $attribute.'_'.preg_replace('/[^A-Za-z0-9]/', '_', $locale);
    }

    /**
     * A pattern from a form as it will be stored: {handle} written as the
     * record's handle, or the new one's in the form (RoutePattern::withHandle(),
     * as the model does on saving).
     *
     * @param  array<mixed>  $data  the form's values
     */
    public static function written(Collection|Taxonomy $record, string $attribute, string $pattern, array $data): string
    {
        if (! str_contains($pattern, '{handle}')) {
            return $pattern;
        }
        $handle = $record->exists ? $record->handle : ($data['handle'] ?? null);
        if (! is_string($handle) || $handle === '') {
            return $pattern;
        }
        $isField = false;
        if ($record instanceof Collection && $attribute === 'route') {
            $blueprint = array_key_exists('blueprint', $data) ? $data['blueprint'] : $record->blueprint;
            $isField = is_string($blueprint) && RoutePatternRule::isField(Blueprint::query()->where('handle', $blueprint)->first()?->schema()->field('handle'));
        }

        return RoutePattern::withHandle($pattern, $handle, handleIsField: $isField);
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $record = $this->record;
        if (! is_string($value) || $value === '' || ! ($record instanceof Collection || $record instanceof Taxonomy)) {
            return;
        }
        // The address as it will be stored.
        $value = self::written($record, $this->attribute, $value, $this->data);
        $locales = $this->locale !== null ? [$this->locale] : array_values(array_filter(array_slice(Locales::all(), 1), function (string $locale) use ($record): bool {
            $field = self::field($this->attribute, $locale);
            $own = array_key_exists($field, $this->data) ? $this->data[$field] : $record->ownRoute($locale, $this->attribute);

            return ! is_string($own) || trim($own) === '';
        }));
        // The main language too: a fixed address (a listing or index page) against the other kind's, an
        // entry or shared term page pattern against the other kind's and collections' term pages (the same kind's is a unique column).
        if ($this->locale === null) {
            array_unshift($locales, Locales::default());
        }
        foreach ($locales as $locale) {
            $other = RouteConflicts::find($record, $this->attribute, $locale, $value);
            if ($other !== null) {
                $fail(__(':title has this URL in :language already.', ['title' => $other, 'language' => Locales::name($locale)]));

                return;
            }
            // A changed entry or term page pattern that would put one of its entries (terms) at a fixed address.
            $landing = $this->attribute === 'route' ? RouteConflicts::landing($record, $locale, $value) : null;
            if ($landing !== null) {
                $fail($landing);

                return;
            }
        }
    }
}
