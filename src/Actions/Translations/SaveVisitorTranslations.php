<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Translations;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Admin\VisitorTexts;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Locales;

/**
 * Content → Translations: saves what visitors read outside entries in a
 * language besides the main one, by the keys VisitorTexts gives (the
 * site's description, collections' and taxonomies' titles, forms'
 * thank-you messages and fields' labels, instructions and option labels,
 * menus' labels). Only those texts change: nothing in the main language,
 * no handles, no structure. An empty text forgets the translation (the
 * main language's shows). Unknown keys are ignored.
 *
 * @api
 */
final class SaveVisitorTranslations
{
    public const MAX_LENGTH = 3000;

    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $texts  key => text
     * @return int how many texts changed
     *
     * @throws ValidationException
     */
    public function handle(string $locale, array $texts): int
    {
        if (! Locales::has($locale) || $locale === Locales::default()) {
            throw ValidationException::withMessages(['locale' => __('Choose one of the site\'s other languages: :languages.', ['languages' => implode(', ', array_diff(Locales::all(), [Locales::default()]))])]);
        }
        $clean = [];
        foreach ($texts as $key => $text) {
            if (! is_string($key) || ($text !== null && ! is_string($text))) {
                continue;
            }
            $text = trim((string) $text);
            if (mb_strlen($text) > self::MAX_LENGTH) {
                throw ValidationException::withMessages(["texts.{$key}" => __('Keep each text under :max characters.', ['max' => self::MAX_LENGTH])]);
            }
            $clean[$key] = $text;
        }

        $changed = 0;
        DB::transaction(function () use ($locale, $clean, &$changed): void {
            $changed += $this->site($locale, $clean);
            $changed += $this->titles(Collection::class, 'collection', 'title', $locale, $clean);
            $changed += $this->titles(Taxonomy::class, 'taxonomy', 'title', $locale, $clean);
            $changed += $this->titles(Form::class, 'form', 'message', $locale, $clean);
            $changed += $this->fields($locale, $clean);
            $changed += $this->menus($locale, $clean);
        });
        if ($changed > 0) {
            app(Fieldsets::class)->flush();
            $this->activity->record('translated', 'translations', null, Locales::name($locale), ['locale' => $locale, 'note' => $changed.' '.($changed === 1 ? 'text' : 'texts')]);
        }

        return $changed;
    }

    /** @param array<string, string> $texts */
    private function site(string $locale, array $texts): int
    {
        if (! array_key_exists('site|description', $texts)) {
            return 0;
        }
        $site = app(SiteSettings::class);
        if (VisitorTexts::siteDescription($site, $locale) === $texts['site|description']) {
            return 0;
        }
        $lines = [];
        foreach (preg_split('/\R/', $site->descriptions) ?: [] as $line) {
            $code = trim(explode(':', $line, 2)[0]);
            if (trim($line) !== '' && $code !== $locale) {
                $lines[] = $line;
            }
        }
        if ($texts['site|description'] !== '') {
            $lines[] = $locale.': '.preg_replace('/\s*\R\s*/', ' ', $texts['site|description']);
        }
        $site->fill(['descriptions' => implode("\n", $lines)])->save();

        return 1;
    }

    /**
     * Collections' and taxonomies' titles, forms' thank-you messages.
     *
     * @param  class-string<Collection|Taxonomy|Form>  $class
     * @param  array<string, string>  $texts
     */
    private function titles(string $class, string $kind, string $attribute, string $locale, array $texts): int
    {
        $wanted = $this->ids($texts, $kind, $attribute);
        $changed = 0;
        foreach ($wanted === [] ? [] : $class::query()->whereKey(array_keys($wanted))->get() as $record) {
            $text = $wanted[$record->id];
            $current = ($record->translations ?? [])[$locale][$attribute] ?? '';
            if ($current !== $text) {
                $record->translate($attribute, $locale, $text)->save();
                $changed++;
            }
        }

        return $changed;
    }

    /** @param array<string, string> $texts */
    private function fields(string $locale, array $texts): int
    {
        $byBlueprint = [];
        foreach ($texts as $key => $text) {
            $parts = explode('|', $key, 5);
            if ($parts[0] === 'field' && count($parts) >= 4 && ctype_digit($parts[1])) {
                $byBlueprint[(int) $parts[1]][] = [$parts[2], $parts[3], $parts[4] ?? null, $text];
            }
        }
        $changed = 0;
        foreach ($byBlueprint === [] ? [] : Blueprint::query()->whereKey(array_keys($byBlueprint))->get() as $blueprint) {
            $fields = $blueprint->fields;
            $count = 0;
            foreach ($byBlueprint[$blueprint->id] as [$path, $what, $option, $text]) {
                $count += self::setFieldText($fields, explode('.', $path), $locale, $what, $option, $text) ? 1 : 0;
            }
            if ($count > 0) {
                $blueprint->forceFill(['fields' => $fields])->save();
                $changed += $count;
            }
        }

        return $changed;
    }

    /**
     * Sets a field's label, instructions or option label in a language,
     * found by its path of handles; whether it changed.
     *
     * @param  array<mixed>  $fields
     * @param  list<string>  $path
     */
    private static function setFieldText(array &$fields, array $path, string $locale, string $what, ?string $option, string $text): bool
    {
        $handle = array_shift($path);
        foreach ($fields as &$field) {
            if (! is_array($field) || ($field['handle'] ?? null) !== $handle || ($field['type'] ?? null) === 'fieldset') {
                continue;
            }
            if ($path !== []) {
                if (! is_array($field['fields'] ?? null)) {
                    return false;
                }
                $children = $field['fields'];
                $changed = self::setFieldText($children, $path, $locale, $what, $option, $text);
                $field['fields'] = $children;

                return $changed;
            }
            $translations = is_array($field['translations'] ?? null) ? $field['translations'] : [];
            $own = is_array($translations[$locale] ?? null) ? $translations[$locale] : [];
            $before = $own;
            if ($what === 'option' && $option !== null) {
                $options = is_array($own['options'] ?? null) ? $own['options'] : [];
                if ($text === '') {
                    unset($options[$option]);
                } else {
                    $options[$option] = $text;
                }
                $own['options'] = $options;
                if ($options === []) {
                    unset($own['options']);
                }
            } elseif (in_array($what, ['label', 'instructions'], true)) {
                if ($text === '') {
                    unset($own[$what]);
                } else {
                    $own[$what] = $text;
                }
            } else {
                return false;
            }
            if ($own === $before) {
                return false;
            }
            if ($own === []) {
                unset($translations[$locale]);
            } else {
                $translations[$locale] = $own;
            }
            if ($translations === []) {
                unset($field['translations']);
            } else {
                $field['translations'] = $translations;
            }

            return true;
        }

        return false;
    }

    /** @param array<string, string> $texts */
    private function menus(string $locale, array $texts): int
    {
        $wanted = $this->ids($texts, 'menu', 'label');
        $changed = 0;
        foreach ($wanted === [] ? [] : MenuItem::query()->whereKey(array_keys($wanted))->get() as $item) {
            $labels = $item->labels;
            if (($labels[$locale] ?? '') === $wanted[$item->id]) {
                continue;
            }
            if ($wanted[$item->id] === '') {
                unset($labels[$locale]);
            } else {
                $labels[$locale] = $wanted[$item->id];
            }
            $item->forceFill(['labels' => $labels])->save();
            $changed++;
        }

        return $changed;
    }

    /**
     * The ids and texts of keys "{kind}|{id}|{attribute}".
     *
     * @param  array<string, string>  $texts
     * @return array<int, string>
     */
    private function ids(array $texts, string $kind, string $attribute): array
    {
        $ids = [];
        foreach ($texts as $key => $text) {
            $parts = explode('|', $key);
            if (count($parts) === 3 && $parts[0] === $kind && ctype_digit($parts[1]) && $parts[2] === $attribute) {
                $ids[(int) $parts[1]] = $text;
            }
        }

        return $ids;
    }
}
