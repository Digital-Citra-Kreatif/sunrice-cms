<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;

/**
 * A handle (of a collection, field, blueprint…): lowercase letters,
 * digits and underscores, starting with a letter. Its error suggests the
 * handle meant: "contact-person" → try "contact_person".
 *
 * @api
 */
final class HandleRule implements ValidationRule
{
    public const PATTERN = '/^[a-z][a-z0-9_]*$/';

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (is_string($value) && preg_match(self::PATTERN, $value) === 1) {
            return;
        }
        $suggestion = is_string($value) ? self::suggest($value) : '';
        $fail('Use lowercase letters, digits and underscores, starting with a letter'
            .($suggestion !== '' ? ": try \"{$suggestion}\"." : '.'));
    }

    /** The handle a text suggests: "Contact person" or "contact-person" → "contact_person"; "" when none. */
    public static function suggest(string $text): string
    {
        $handle = trim((string) preg_replace('/[^a-z0-9]+/', '_', Str::lower(Str::ascii($text))), '_');

        return substr((string) preg_replace('/^[0-9_]+/', '', $handle), 0, 64);
    }
}
