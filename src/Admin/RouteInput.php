<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Sunrice\Admin\Resources\Forms\Field;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\UniqueRouteRule;

/**
 * A collection's or taxonomy's URL pattern input: a text input that also
 * checks no other one has the pattern in a language (UniqueRouteRule),
 * for the main pattern (->language(null, 'route')) or a language's own.
 * {handle} in it is written as the handle on saving, so it's checked so
 * (UniqueRouteRule::written()), and its hints show the handle: the saved
 * one when editing, the one typed (lib/live-help) when creating.
 *
 * @internal
 */
final class RouteInput extends Field
{
    private ?string $locale = null;

    private string $attribute = 'route';

    /** Which pattern it is: a language's own (null: the main one), of route or listing_route. */
    public function language(?string $locale, string $attribute): static
    {
        $this->locale = $locale;
        $this->attribute = $attribute;

        return $this;
    }

    public function type(): string
    {
        return 'text';
    }

    protected function typeRules(): array
    {
        return ['string', 'max:255'];
    }

    public function validationRules(?Model $record): array
    {
        return [...parent::validationRules($record), new UniqueRouteRule($record, $this->attribute, $this->locale)];
    }

    /** ->unique(), with {handle} as it will be written. */
    protected function uniqueRule(?Model $record): array
    {
        $rules = parent::uniqueRule($record);
        if ($rules === [] || ! ($record instanceof Collection || $record instanceof Taxonomy)) {
            return $rules;
        }
        $column = $this->name;

        return [new class($record, $column) implements DataAwareRule, ValidationRule
        {
            /** @var array<mixed> */
            private array $data = [];

            public function __construct(private readonly Collection|Taxonomy $record, private readonly string $column) {}

            /** @param array<mixed> $data */
            public function setData(array $data): static
            {
                $this->data = $data;

                return $this;
            }

            public function validate(string $attribute, mixed $value, Closure $fail): void
            {
                if (! is_string($value) || $value === '') {
                    return;
                }
                $taken = DB::table($this->record->getTable())->where($this->column, UniqueRouteRule::written($this->record, $this->column, $value, $this->data))
                    ->when($this->record->exists, fn ($query) => $query->where($this->record->getKeyName(), '!=', $this->record->getKey()))
                    ->exists();
                if ($taken) {
                    $fail('validation.unique')->translate();
                }
            }
        }];
    }

    /** Its hints with the handle in them when editing: "Empty: /units/{slug}." */
    public function toArray(?Model $record = null): array
    {
        $array = parent::toArray($record);
        $handle = $record instanceof Collection || $record instanceof Taxonomy ? ($record->exists ? $record->handle : null) : null;
        if ($handle === null) {
            return $array;
        }
        $write = fn (mixed $text): mixed => is_string($text) ? str_replace('{handle}', $handle, $text) : $text;
        $array['placeholder'] = $write($array['placeholder'] ?? null);
        $from = $array['placeholderFrom'] ?? null;
        if (is_array($from)) {
            $array['placeholderFrom'] = ['field' => $from['field'] ?? null, 'fallback' => $write($from['fallback'] ?? null)];
        }
        $values = $array['helpValues'] ?? null;
        if (is_array($values)) {
            $array['helpValues'] = array_map(fn (mixed $value): mixed => is_array($value) ? ['field' => $value['field'] ?? null, 'fallback' => $write($value['fallback'] ?? null)] : $value, $values);
        }

        return $array;
    }

    protected function props(): array
    {
        return ['inputType' => 'text', 'maxLength' => 255];
    }
}
