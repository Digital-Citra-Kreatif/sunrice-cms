<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Closure;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Pairs;
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

    /** Languages offered when adding one: code => name. */
    public const KNOWN = [
        'en' => 'English', 'id' => 'Bahasa Indonesia', 'ms' => 'Bahasa Melayu', 'jv' => 'Basa Jawa', 'su' => 'Basa Sunda',
        'zh' => '中文', 'zh-Hant' => '繁體中文', 'ja' => '日本語', 'ko' => '한국어', 'th' => 'ไทย', 'vi' => 'Tiếng Việt', 'tl' => 'Filipino',
        'hi' => 'हिन्दी', 'ar' => 'العربية', 'tr' => 'Türkçe', 'nl' => 'Nederlands', 'de' => 'Deutsch', 'fr' => 'Français',
        'es' => 'Español', 'pt' => 'Português', 'pt_BR' => 'Português (Brasil)', 'it' => 'Italiano', 'ru' => 'Русский', 'pl' => 'Polski',
    ];

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
        return $form->schema([
            Pairs::make('languages')->label('Content languages')->labels('Code', 'Name')->maxLength(2000)->required()
                ->suggest(self::KNOWN + Locales::names())->firstBadge('Main')->addLabel('Add a language')
                ->rules([fn (string $attribute, mixed $value, Closure $fail) => self::check($value, $fail)])
                ->extra('Address', '/{key}', '/')
                ->help('The first is the main language. Address: what its URLs start with (/ for plain ones). Once there is content, change the main one with php artisan sunrice:switch-main-language.'),
        ]);
    }

    /** Unsaved (config applies): the form shows the languages in use. */
    public function toArray(): array
    {
        $values = parent::toArray();
        if (trim($this->languages) === '') {
            $set = config('sunrice-cms.locale_prefixes', []);
            $prefixes = [];
            foreach (is_array($set) ? $set : [] as $code => $prefix) {
                if (is_string($code) && is_string($prefix) && $prefix !== '') {
                    $prefixes[$code] = $prefix;
                }
            }
            $values['languages'] = self::lines(Locales::names(), $prefixes);
        }

        return $values;
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
            $name = trim(explode('|', $name, 2)[0]);
            if (preg_match(self::CODE, $code) === 1 && ! array_key_exists($code, $locales)) {
                $locales[$code] = $name !== '' ? $name : Locales::displayName($code);
            }
        }

        return $locales;
    }

    /** An address prefix: lowercase letters, numbers and dashes, one segment ("en", "pt-br"). */
    public const PREFIX = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';

    /**
     * The address prefixes set here, by code (without slashes); a language
     * without one has the default (none for the main one, its code for the
     * others: Locales::segmentsFor()).
     *
     * @return array<string, string>
     */
    public function prefixes(): array
    {
        return self::parsePrefixes($this->languages);
    }

    /** @return array<string, string> */
    public static function parsePrefixes(string $lines): array
    {
        $prefixes = [];
        foreach (preg_split('/\R/', $lines) ?: [] as $line) {
            $code = trim(explode(':', $line, 2)[0]);
            $prefix = str_contains($line, '|') ? trim(explode('|', $line, 2)[1], " /\t") : '';
            if (preg_match(self::CODE, $code) === 1 && $prefix !== '' && ! array_key_exists($code, $prefixes)) {
                $prefixes[$code] = $prefix;
            }
        }

        return $prefixes;
    }

    /**
     * Lines for a list of languages, to save: ['en' => 'English'] → "en: English".
     *
     * @param  array<string, string>  $locales
     * @param  array<string, string>  $prefixes  address prefixes set, by code
     */
    public static function lines(array $locales, array $prefixes = []): string
    {
        return implode("\n", array_map(fn (string $code, string $name): string => "{$code}: {$name}".(isset($prefixes[$code]) ? " | {$prefixes[$code]}" : ''), array_keys($locales), $locales));
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
        $set = self::parsePrefixes(is_string($value) ? $value : '');
        foreach (preg_split('/\R/', is_string($value) ? $value : '') ?: [] as $line) {
            $prefix = str_contains($line, '|') ? trim(explode('|', $line, 2)[1], " /\t") : '';
            if ($prefix !== '' && preg_match(self::PREFIX, $prefix) !== 1) {
                $fail("\"{$prefix}\" can't be an address: use lowercase letters, numbers and dashes, like en or pt-br.");

                return;
            }
        }
        $segments = Locales::segmentsFor($codes, $set);
        if (count(array_unique($segments)) !== count($segments)) {
            $fail('Two languages have the same address. Give each its own.');

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
