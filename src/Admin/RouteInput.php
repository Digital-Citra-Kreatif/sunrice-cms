<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Field;
use Sunrice\Cms\Site\UniqueRouteRule;

/**
 * A collection's or taxonomy's URL pattern input: a text input that also
 * checks no other one has the pattern in a language (UniqueRouteRule),
 * for the main pattern (->language(null, 'route')) or a language's own.
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

    protected function props(): array
    {
        return ['inputType' => 'text', 'maxLength' => 255];
    }
}
