<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Str;

/**
 * An entry's field text for site search: the words in its values (rich
 * text without its tags), not field handles, ids, addresses or SEO.
 *
 * @internal
 */
final class SearchText
{
    /** Longer text is cut: enough for any page's words. */
    private const MAX = 60000;

    /** @param array<mixed> $data */
    public static function of(array $data): ?string
    {
        unset($data[Seo::KEY]);
        $words = [];
        self::collect($data, $words);
        $text = Str::squish(implode(' ', $words));

        return $text === '' ? null : mb_substr($text, 0, self::MAX);
    }

    /**
     * @param  array<mixed>  $values
     * @param  list<string>  $words
     */
    private static function collect(array $values, array &$words): void
    {
        foreach ($values as $key => $value) {
            // Rows' own keys (_id, _key, _type) aren't content.
            if (is_string($key) && str_starts_with($key, '_')) {
                continue;
            }
            if (is_array($value)) {
                self::collect($value, $words);
            } elseif (is_string($value) && $value !== '' && ! preg_match('#^(https?://|/|mailto:|tel:)\S*$#i', $value)) {
                $words[] = html_entity_decode(strip_tags(str_replace(['<br', '</p>', '</li>', '</h'], [' <br', ' </p>', ' </li>', ' </h'], $value)), ENT_QUOTES | ENT_HTML5);
            }
        }
    }
}
