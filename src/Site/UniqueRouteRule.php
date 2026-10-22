<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Support\Locales;

/**
 * No other collection (or taxonomy) may have the same URL pattern in a
 * language (RouteConflicts); a listing or index page's address no other
 * fixed page's either. For a language's own pattern ($locale),
 * that language; for the main one, each language that uses it: those
 * whose own field in the form (`route_id`) is empty.
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

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $record = $this->record;
        if (! is_string($value) || $value === '' || ! ($record instanceof Collection || $record instanceof Taxonomy)) {
            return;
        }
        $locales = $this->locale !== null ? [$this->locale] : array_values(array_filter(array_slice(Locales::all(), 1), function (string $locale) use ($record): bool {
            $field = self::field($this->attribute, $locale);
            $own = array_key_exists($field, $this->data) ? $this->data[$field] : $record->ownRoute($locale, $this->attribute);

            return ! is_string($own) || trim($own) === '';
        }));
        // A fixed address (a listing or index page) against the other kind's in the main language too (the same kind's is a unique column).
        if ($this->locale === null && $this->attribute !== 'route') {
            array_unshift($locales, Locales::default());
        }
        foreach ($locales as $locale) {
            $other = RouteConflicts::find($record, $this->attribute, $locale, $value);
            if ($other !== null) {
                $fail(__(':title has this URL in :language already.', ['title' => $other, 'language' => Locales::name($locale)]));

                return;
            }
        }
    }
}
