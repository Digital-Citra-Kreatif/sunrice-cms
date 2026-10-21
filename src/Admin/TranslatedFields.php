<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Field;
use Sunrice\Cms\Support\Locales;

/**
 * A resource form's fields for what visitors read of an attribute in the
 * other languages (a collection's title, a form's thank-you message):
 * one per language besides the main one, kept in the record's
 * `translations` ({"id": {"title": "Properti"}}, Concerns\TranslatesText).
 *
 * @internal
 */
final class TranslatedFields
{
    /**
     * @param  Closure(string, string): Field  $make  the field for a name and a language's name
     * @return list<Field>
     */
    public static function make(string $attribute, Closure $make): array
    {
        $fields = [];
        foreach (array_slice(Locales::names(), 1, null, true) as $code => $name) {
            $fields[] = $make($attribute.'_'.preg_replace('/[^A-Za-z0-9]/', '_', $code), $name)
                ->loadUsing(fn (Model $record): ?string => self::text($record, $code, $attribute))
                ->saveUsing(function (Model $record, mixed $value) use ($code, $attribute): void {
                    $translations = $record->getAttribute('translations');
                    $translations = is_array($translations) ? $translations : [];
                    $text = is_string($value) ? trim($value) : '';
                    $own = is_array($translations[$code] ?? null) ? $translations[$code] : [];
                    if ($text === '') {
                        unset($own[$attribute]);
                    } else {
                        $own[$attribute] = $text;
                    }
                    $translations[$code] = $own;
                    $translations = array_filter($translations, fn (mixed $texts): bool => is_array($texts) && $texts !== []);
                    $record->forceFill(['translations' => $translations === [] ? null : $translations])->save();
                });
        }

        return $fields;
    }

    private static function text(Model $record, string $code, string $attribute): ?string
    {
        $translations = $record->getAttribute('translations');
        $text = is_array($translations) && is_array($translations[$code] ?? null) ? ($translations[$code][$attribute] ?? null) : null;

        return is_string($text) ? $text : null;
    }
}
