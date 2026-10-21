<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Support\Str;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Locales;

/**
 * What visitors read outside entries, for Content → Translations: the
 * site's description, collections' and taxonomies' titles, forms'
 * thank-you messages and their fields' labels, instructions and option
 * labels, and menus' labels. Each text has a key (SaveVisitorTranslations
 * writes it back), the main language's text and its text in a language.
 *
 *     site|description
 *     collection|{id}|title    taxonomy|{id}|title    form|{id}|message
 *     field|{blueprint id}|{path}|label    field|…|instructions    field|…|option|{value}
 *     menu|{item id}|label
 *
 * @internal
 */
final class VisitorTexts
{
    /**
     * The texts, in sections, with their translation in `$locale`.
     *
     * @return list<array{key: string, title: string, texts: list<array{key: string, label: string, source: string, value: string, multiline: bool}>}>
     */
    public static function sections(string $locale): array
    {
        $sections = [];
        $site = app(SiteSettings::class);
        $sections[] = ['key' => 'site', 'title' => self::say('The site'), 'texts' => [
            self::text('site|description', self::say('Description'), $site->description, self::siteDescription($site, $locale), true),
        ]];

        $titles = [];
        foreach (Collection::query()->orderBy('title')->get() as $collection) {
            $titles[] = self::text("collection|{$collection->id}|title", self::say('Collection: :title', ['title' => $collection->title]), $collection->title, self::own($collection->translations, $locale, 'title'));
        }
        foreach (Taxonomy::query()->orderBy('title')->get() as $taxonomy) {
            $titles[] = self::text("taxonomy|{$taxonomy->id}|title", self::say('Taxonomy: :title', ['title' => $taxonomy->title]), $taxonomy->title, self::own($taxonomy->translations, $locale, 'title'));
        }
        if ($titles !== []) {
            $sections[] = ['key' => 'titles', 'title' => self::say('Titles of listing pages'), 'texts' => $titles];
        }

        $forms = Form::query()->orderBy('title')->get();
        $blueprints = Blueprint::query()->whereIn('handle', $forms->pluck('blueprint')->filter()->unique()->values())->get()->keyBy('handle');
        $shown = [];
        foreach ($forms as $form) {
            $texts = [self::text("form|{$form->id}|message", self::say('Thank-you message'), (string) $form->message, self::own($form->translations, $locale, 'message'), true)];
            $blueprint = $form->blueprint === null ? null : $blueprints->get($form->blueprint);
            // A blueprint two forms share: its fields once, with the first.
            if ($blueprint !== null && ! isset($shown[$blueprint->id])) {
                $shown[$blueprint->id] = true;
                array_push($texts, ...self::fieldTexts($blueprint, $blueprint->fields, '', $locale));
            }
            $sections[] = ['key' => "form-{$form->id}", 'title' => self::say('Form: :title', ['title' => $form->title]), 'texts' => $texts];
        }

        $menus = Menu::query()->orderBy('title')->with(['items.entry.translations', 'items.term.translations', 'items.collection'])->get();
        foreach ($menus as $menu) {
            // As the menu shows them: each link followed by those under it, named "Parent › Link to …".
            $children = [];
            foreach ($menu->items as $item) {
                $children[$item->parent_id ?? 0][] = $item;
            }
            $texts = self::menuTexts($children, 0, [], $locale);
            if ($texts !== []) {
                $sections[] = ['key' => "menu-{$menu->id}", 'title' => self::say('Menu: :title', ['title' => $menu->title]), 'texts' => $texts];
            }
        }

        return $sections;
    }

    /**
     * A blueprint's fields' texts for visitors, nested ones too (a fieldset's
     * included fields are its own: they aren't listed).
     *
     * @param  list<array<string, mixed>>  $fields
     * @return list<array{key: string, label: string, source: string, value: string, multiline: bool}>
     */
    private static function fieldTexts(Blueprint $blueprint, array $fields, string $prefix, string $locale): array
    {
        $texts = [];
        foreach ($fields as $field) {
            $handle = self::string($field['handle'] ?? null);
            $type = self::string($field['type'] ?? null);
            if ($handle === '' || $type === 'fieldset') {
                continue;
            }
            $path = $prefix === '' ? $handle : "{$prefix}.{$handle}";
            $label = self::string($field['label'] ?? null);
            $label = $label !== '' ? $label : Str::headline($handle);
            $own = is_array($field['translations'] ?? null) && is_array($field['translations'][$locale] ?? null) ? $field['translations'][$locale] : [];
            $key = "field|{$blueprint->id}|{$path}";
            $texts[] = self::text("{$key}|label", self::say('Field: :label', ['label' => $label]), $label, self::string($own['label'] ?? null));
            $instructions = self::string($field['instructions'] ?? null);
            if ($instructions !== '') {
                $texts[] = self::text("{$key}|instructions", self::say(':label: instructions', ['label' => $label]), $instructions, self::string($own['instructions'] ?? null), true);
            }
            $options = is_array($field['config'] ?? null) && is_array($field['config']['options'] ?? null) ? $field['config']['options'] : [];
            $ownOptions = is_array($own['options'] ?? null) ? $own['options'] : [];
            foreach ($options as $option) {
                if (is_array($option) && is_scalar($option['value'] ?? null)) {
                    $value = (string) $option['value'];
                    $optionLabel = is_scalar($option['label'] ?? null) && (string) $option['label'] !== '' ? (string) $option['label'] : $value;
                    $texts[] = self::text("{$key}|option|{$value}", self::say(':label: choice ":option"', ['label' => $label, 'option' => $optionLabel]), $optionLabel, self::string($ownOptions[$value] ?? null));
                }
            }
            if (is_array($field['fields'] ?? null)) {
                /** @var list<array<string, mixed>> $children */
                $children = array_values(array_filter($field['fields'], 'is_array'));
                array_push($texts, ...self::fieldTexts($blueprint, $children, $path, $locale));
            }
        }

        return $texts;
    }

    /** The site's description in a language: its own line in `descriptions`, or empty. */
    public static function siteDescription(SiteSettings $site, string $locale): string
    {
        foreach (preg_split('/\R/', $site->descriptions) ?: [] as $line) {
            [$code, $text] = array_pad(array_map(trim(...), explode(':', $line, 2)), 2, '');
            if ($code === $locale) {
                return $text;
            }
        }

        return '';
    }

    /**
     * A menu's links under a parent, each followed by those under it.
     *
     * @param  array<int, list<MenuItem>>  $children  the links by their parent's id (0: the top)
     * @param  list<string>  $trail  the labels of the links above
     * @return list<array{key: string, label: string, source: string, value: string, multiline: bool}>
     */
    private static function menuTexts(array $children, int $parent, array $trail, string $locale): array
    {
        $texts = [];
        foreach ($children[$parent] ?? [] as $item) {
            $label = self::itemLabel($item);
            $query = $item->query_string ?? '';
            $target = self::itemTarget($item).($query !== '' ? ' · '.urldecode($query) : '');
            $texts[] = self::text("menu|{$item->id}|label", implode(' › ', [...$trail, $target]), $label, self::string($item->labels[$locale] ?? null));
            array_push($texts, ...self::menuTexts($children, $item->id, [...$trail, $label !== '' ? $label : $target], $locale));
        }

        return $texts;
    }

    /** What a menu item links to, in words. */
    private static function itemTarget(MenuItem $item): string
    {
        return match (true) {
            $item->entry_id !== null => self::say('Link to :title', ['title' => (string) ($item->entry?->mainTranslation()->draft_title ?? '#'.$item->entry_id)]),
            $item->term_id !== null => self::say('Link to :title', ['title' => $item->term?->title(Locales::default()) ?? '#'.$item->term_id]),
            $item->collection_id !== null => self::say('Link to :title', ['title' => $item->collection->title ?? '#'.$item->collection_id]),
            default => self::say('Link to :title', ['title' => (string) $item->url]),
        };
    }

    /** A menu item's label in the main language: its own, or the target's title. */
    private static function itemLabel(MenuItem $item): string
    {
        $own = self::string($item->labels[Locales::default()] ?? null);
        if ($own !== '') {
            return $own;
        }

        return match (true) {
            $item->entry_id !== null => (string) ($item->entry?->mainTranslation()->title ?? $item->entry?->mainTranslation()->draft_title ?? ''),
            $item->term_id !== null => $item->term?->title(Locales::default()) ?? '',
            $item->collection_id !== null => $item->collection->title ?? '',
            default => (string) $item->url,
        };
    }

    /**
     * @param  array<string, array<string, string>>|null  $translations
     */
    private static function own(?array $translations, string $locale, string $attribute): string
    {
        return self::string(($translations ?? [])[$locale][$attribute] ?? null);
    }

    /** @return array{key: string, label: string, source: string, value: string, multiline: bool} */
    private static function text(string $key, string $label, string $source, string $value, bool $multiline = false): array
    {
        return ['key' => $key, 'label' => $label, 'source' => $source, 'value' => $value, 'multiline' => $multiline];
    }

    private static function string(mixed $value): string
    {
        return is_string($value) ? $value : '';
    }

    /** @param array<string, string> $replace */
    private static function say(string $english, array $replace = []): string
    {
        $said = __($english, $replace);

        return is_string($said) ? $said : strtr($english, array_combine(array_map(fn (string $k): string => ':'.$k, array_keys($replace)), $replace));
    }
}
