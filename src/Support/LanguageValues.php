<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Fields\Schema;

/**
 * Field values kept per language outside entries: globals, listing pages,
 * taxonomy index pages and term pages. As for entries (EntryTranslation),
 * another language than the main one shares the main language's values of
 * the fields not translated, at the top level and inside translated
 * groups, repeater rows and flexible blocks (Schema::withShared()), and
 * stores only the rest.
 *
 * @internal
 */
final class LanguageValues
{
    /**
     * The values in a language, over the defaults; for another language
     * than the main one (given the main language's stored values), with
     * the shared values from the main language's.
     *
     * @param  array<mixed>  $own  what the language stores
     * @param  array<mixed>|null  $main  what the main language stores; null: this is the main language
     * @return array<string, mixed>
     */
    public static function read(Schema $schema, array $own, ?array $main): array
    {
        $data = array_replace($schema->defaults(), $own);
        if ($main !== null) {
            $data = $schema->withShared($data, array_replace($schema->defaults(), $main));
        }

        // Fields are keyed by handle.
        return array_filter($data, is_string(...), ARRAY_FILTER_USE_KEY);
    }

    /**
     * The input merged over what a language stores (fields left out keep
     * their values), validated and as it's stored. Another language than
     * the main one is validated with the main language's shared values
     * (a required shared field in a group needn't be sent) and stores none
     * of them: what it sends for them is ignored, and what it stored for
     * them before stays out of sight (Schema::withoutShared()).
     *
     * @param  array<string, mixed>  $stored  what the language stores now
     * @param  array<mixed>|null  $main  what the main language stores; null: this is the main language
     * @return array{before: array<mixed>, data: array<mixed>} before: what it had, over the defaults
     *
     * @throws ValidationException
     */
    public static function save(Schema $schema, array $stored, mixed $input, ?array $main): array
    {
        $editable = $main === null ? $schema : $schema->except($schema->shared());
        $before = array_replace($editable->defaults(), $stored);
        $merged = EntryInput::merge($editable, $before, $input);
        $complete = $main === null ? null : array_replace($schema->defaults(), $main);
        if ($complete !== null) {
            $merged = $schema->withShared($merged, $complete);
        }
        $rules = $editable->rules($merged);
        Validator::make(['data' => $merged], $rules, [], EntryInput::attributes($editable, array_keys($rules)))->validate();
        $data = $editable->normalize($merged);

        return ['before' => $before, 'data' => $complete === null ? $data : $schema->withoutShared($data, $complete, $stored)];
    }
}
