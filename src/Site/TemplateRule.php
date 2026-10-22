<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;

/**
 * A template setting (a collection's or taxonomy's): a view name under
 * the site's template prefixes, as an entry's or term's own must be, so
 * no other view of the app can be made a public page.
 *
 * @internal
 */
final class TemplateRule implements ValidationRule
{
    public function __construct(private readonly string $example = 'cms.landing') {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        try {
            SaveEntrySettings::template($value, $this->example);
        } catch (ValidationException $e) {
            $fail($e->validator->errors()->first());
        }
    }
}
