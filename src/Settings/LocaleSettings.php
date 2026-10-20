<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Closure;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Textarea;
use Sunrice\Admin\Settings\Settings;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Settings → Languages, guarded by cms.settings.locales: the languages
 * content is written in, one per line with its name, the main one first:
 *
 *     en: English
 *     id: Bahasa Indonesia
 *
 * Empty (until saved): config sunrice-cms.locales. Locales reads it. The
 * main language can't be changed or dropped here while content is
 * written in it: `php artisan sunrice:switch-main-language` moves it.
 *
 * @api
 */
final class LocaleSettings extends Settings
{
    /** A language code as Laravel's app.locale uses them: "en", "id", "pt_BR", "zh-Hant". */
    public const CODE = '/^[a-z]{2,3}([_-][A-Za-z0-9]{2,8})?$/';

    /** One language per line, "code: Name", the main one first; empty: config sunrice-cms.locales. */
    public string $languages = '';

    public static function key(): string
    {
        return 'locales';
    }

    public static function label(): string
    {
        return 'Languages';
    }

    public static function description(): string
    {
        return 'The languages content is written in, the main one first.';
    }

    public static function form(Form $form): Form
    {
        $current = implode("\n", array_map(fn (string $code, string $name): string => "{$code}: {$name}", array_keys(Locales::names()), Locales::names()));

        return $form->schema([
            Textarea::make('languages')->label('Content languages')->rows(5)->maxLength(2000)->required()
                ->placeholder($current)->rules([fn (string $attribute, mixed $value, Closure $fail) => self::check($value, $fail)])
                ->help('One per line: its code (as in addresses, /id/…) and its name, "id: Bahasa Indonesia". The first is the main language, at the plain addresses; the others get their own. To change the main language once there is content, run php artisan sunrice:switch-main-language.'),
        ]);
    }

    /**
     * The languages saved here by code, with their names, the main one first;
     * empty when none are (config applies).
     *
     * @return array<string, string>
     */
    public function locales(): array
    {
        return self::parse($this->languages);
    }

    /**
     * Languages from "code: Name" lines (a line with only a code takes its
     * display name). Lines that aren't a language are left out.
     *
     * @return array<string, string>
     */
    public static function parse(string $lines): array
    {
        $locales = [];
        foreach (preg_split('/\R/', $lines) ?: [] as $line) {
            [$code, $name] = array_pad(array_map(trim(...), explode(':', $line, 2)), 2, '');
            if (preg_match(self::CODE, $code) === 1 && ! array_key_exists($code, $locales)) {
                $locales[$code] = $name !== '' ? $name : Locales::displayName($code);
            }
        }

        return $locales;
    }

    /**
     * Lines for a list of languages, to save: ['en' => 'English'] → "en: English".
     *
     * @param  array<string, string>  $locales
     */
    public static function lines(array $locales): string
    {
        return implode("\n", array_map(fn (string $code, string $name): string => "{$code}: {$name}", array_keys($locales), $locales));
    }

    /**
     * Validates the form's value: language codes, no repeats, and the main language kept while it holds content.
     *
     * @param  Closure(string): mixed  $fail
     */
    public static function check(mixed $value, Closure $fail): void
    {
        $codes = [];
        foreach (preg_split('/\R/', is_string($value) ? $value : '') ?: [] as $number => $line) {
            if (trim($line) === '') {
                continue;
            }
            $code = trim(explode(':', $line, 2)[0]);
            if (preg_match(self::CODE, $code) !== 1) {
                $fail('Line '.($number + 1).": \"{$code}\" isn't a language code (two or three lowercase letters, then a region if any: en, id, pt_BR).");

                return;
            }
            if (in_array($code, $codes, true)) {
                $fail("{$code} is listed twice.");

                return;
            }
            $codes[] = $code;
        }
        if ($codes === []) {
            $fail('List at least one language.');

            return;
        }
        $main = Locales::default();
        if ($codes[0] !== $main && self::holdsContent($main)) {
            $fail(Locales::name($main)." ({$main}) is the main language and content is written in it: keep it first. To change the main language, run php artisan sunrice:switch-main-language {$codes[0]}.");
        }
    }

    /** Whether any entry, term, global set or listing page has content in the language. */
    public static function holdsContent(string $locale): bool
    {
        return EntryTranslation::query()->where('locale', $locale)->exists()
            || TermTranslation::query()->where('locale', $locale)->exists()
            || GlobalValue::query()->where('locale', $locale)->exists()
            || CollectionListing::query()->where('locale', $locale)->exists();
    }
}
