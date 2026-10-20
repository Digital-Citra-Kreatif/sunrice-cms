<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Sunrice\Cms\Fields\Types\EntriesField;
use Sunrice\Cms\Models\Blueprint;

/**
 * Checks a collection's URL pattern when it's saved: {slug} once, and each
 * other {field} a single-value `entries` field of the blueprint chosen in
 * the same form.
 *
 * @internal
 */
final class RoutePatternRule implements DataAwareRule, ValidationRule
{
    /** @var array<mixed> */
    private array $data = [];

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
        if (! RoutePattern::isValid($value, parameters: true)) {
            $fail('Use a path with {slug} once, like /blog/{slug} or /{slug} for pages: lowercase letters, digits, dashes; a related entry\'s field as /projects/{project}/{slug}.');

            return;
        }
        $parameters = (new RoutePattern($value))->parameters();
        if ($parameters === []) {
            return;
        }
        $handle = $this->data['blueprint'] ?? null;
        $schema = is_string($handle) ? Blueprint::query()->where('handle', $handle)->first()?->schema() : null;
        foreach ($parameters as $name) {
            $field = $schema?->field($name);
            if ($field === null || $field->type !== EntriesField::TYPE || $field->configBool('multiple')) {
                $fail("{{$name}} must be a field of the blueprint that links to one entry (an Entries field without Several entries).");

                return;
            }
        }
    }
}
