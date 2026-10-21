<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models\Concerns;

use Sunrice\Cms\Support\Locales;

/**
 * Words of a collection, taxonomy or form that visitors read, in the
 * other languages: `translations` ({"id": {"title": "Properti"}}), each
 * falling back to the attribute itself (the main language's).
 *
 * @property array<string, array<string, string>>|null $translations
 *
 * @api
 */
trait TranslatesText
{
    /** An attribute in a language (null: the page's), else as it is. */
    public function translated(string $attribute, ?string $locale = null): string
    {
        $text = ($this->translations ?? [])[$locale ?? Locales::current()][$attribute] ?? null;
        if (is_string($text) && trim($text) !== '') {
            return $text;
        }
        $own = $this->getAttribute($attribute);

        return is_scalar($own) ? (string) $own : '';
    }

    /** An attribute's text in a language, or null (empty) to forget it. */
    public function translate(string $attribute, string $locale, ?string $text): static
    {
        $translations = $this->translations ?? [];
        $text = $text === null ? '' : trim($text);
        if ($text === '') {
            unset($translations[$locale][$attribute]);
        } else {
            $translations[$locale][$attribute] = $text;
        }
        $translations = array_filter($translations, fn (array $texts): bool => $texts !== []);
        $this->translations = $translations === [] ? null : $translations;

        return $this;
    }
}
