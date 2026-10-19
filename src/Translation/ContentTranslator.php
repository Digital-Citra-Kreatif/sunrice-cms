<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Actions\Globals\SaveGlobals;
use Sunrice\Cms\Actions\Terms\SaveTerm;
use Sunrice\Cms\Actions\Terms\SaveTermContent;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Seo;
use Throwable;

/**
 * Machine-translates content from one language into another, through the
 * same actions editors use, so it's validated and sanitised like their
 * input:
 *
 * - entries: into the translation's draft (created when missing); what
 *   the site shows changes only when someone publishes it;
 * - terms, globals and menu labels: saved as they are (they have no drafts).
 *
 * Only what isn't translated yet is sent: a value that's empty or still
 * the same as in the source language. With $force everything is.
 *
 * @internal
 */
final class ContentTranslator
{
    /** @var Closure(string): void|null */
    private ?Closure $report = null;

    /** Strings the last translate() wrote in. */
    private int $written = 0;

    public function __construct(
        private readonly Translator $translator,
        private readonly string $from,
        private readonly string $to,
        private readonly bool $force = false,
        private readonly bool $dryRun = false,
        public readonly TranslationStats $stats = new TranslationStats,
    ) {}

    /** @param Closure(string): void $report */
    public function onProgress(Closure $report): self
    {
        $this->report = $report;

        return $this;
    }

    /** @param list<string> $collections handles to limit to (none: all) */
    public function entries(array $collections = []): void
    {
        Entry::query()->with(['translations', 'collection'])
            ->whereHas('collection', fn ($query) => $query->when($collections !== [], fn ($query) => $query->whereIn('handle', $collections)))
            ->chunkById(50, function ($entries): void {
                foreach ($entries as $entry) {
                    $this->entry($entry);
                }
            });
    }

    public function entry(Entry $entry): void
    {
        $source = $entry->translation($this->from);
        if ($source === null) {
            return;
        }
        // What was published, else the draft of an entry never published.
        $title = $source->isPublished() && $source->title !== null ? $source->title : $source->draft_title;
        $data = $source->isPublished() ? $source->data ?? [] : $source->draft_data;
        $target = $entry->translation($this->to);
        $targetData = $target->draft_data ?? [];
        $schema = $entry->collection->schema();

        $items = ['title' => self::item($title, $target?->draft_title)]
            + $this->fieldItems($schema, $data, $targetData)
            + $this->seoItems($data, $targetData);
        $label = $entry->collection->title.' “'.$title.'”';
        $translated = $this->translate($items, $label);
        if ($translated === null) {
            return;
        }

        try {
            $created = $target === null;
            $target ??= app(CreateTranslation::class)->handle($entry, $this->to);
            $input = ['data' => $this->fieldValues($translated), 'version' => $target->version];
            if (isset($translated['title']) && is_string($translated['title'])) {
                $input['title'] = $translated['title'];
                // A slug still copied from the source follows the new title.
                if ($created || $target->draft_slug === $source->draft_slug || $target->draft_slug === $source->slug) {
                    $input['slug'] = '';
                }
            }
            if ($seo = $this->seoValues($translated, $target->draft_data)) {
                $input[Seo::KEY] = $seo;
            }
            app(SaveDraft::class)->handle($target, $input);
        } catch (ValidationException $e) {
            $this->failed($label, $e->validator->errors()->first());
        }
    }

    public function terms(): void
    {
        Term::query()->with(['translations', 'taxonomy'])->whereHas('taxonomy')->chunkById(100, function ($terms): void {
            foreach ($terms as $term) {
                $source = $term->translations->firstWhere('locale', $this->from);
                if ($source === null) {
                    continue;
                }
                $target = $term->translations->firstWhere('locale', $this->to);
                $targetData = $target->data ?? [];
                $data = $source->data ?? [];
                $items = ['title' => self::item($source->title, $target?->title)]
                    + $this->fieldItems($term->taxonomy->schema(), $data, $targetData)
                    + $this->seoItems($data, $targetData);
                $label = $term->taxonomy->title.' “'.$source->title.'”';
                $translated = $this->translate($items, $label);
                if ($translated === null) {
                    continue;
                }

                try {
                    if ($target === null || isset($translated['title'])) {
                        $title = $translated['title'] ?? $source->title;
                        app(SaveTerm::class)->handle($term->taxonomy, ['title' => $title, 'locale' => $this->to] + ($target !== null ? ['slug' => $target->slug] : []), $term);
                    }
                    $content = ['data' => $this->fieldValues($translated)];
                    if ($seo = $this->seoValues($translated, $targetData)) {
                        $content[Seo::KEY] = $seo;
                    }
                    if ($content['data'] !== [] || isset($content[Seo::KEY])) {
                        app(SaveTermContent::class)->handle($term->fresh() ?? $term, $content, $this->to);
                    }
                } catch (ValidationException $e) {
                    $this->failed($label, $e->validator->errors()->first());
                }
            }
        });
    }

    public function globals(): void
    {
        GlobalSet::query()->with('values')->get()->each(function (GlobalSet $set): void {
            $source = $set->values->firstWhere('locale', $this->from);
            if ($source === null) {
                return;
            }
            $label = 'Globals “'.$set->title.'”';
            $items = $this->fieldItems($set->schema(), $source->data, $set->values->firstWhere('locale', $this->to)->data ?? []);
            $translated = $this->translate($items, $label);
            if ($translated === null) {
                return;
            }

            try {
                app(SaveGlobals::class)->handle($set, $this->fieldValues($translated), $this->to);
            } catch (ValidationException $e) {
                $this->failed($label, $e->validator->errors()->first());
            }
        });
    }

    public function menus(): void
    {
        Menu::query()->with('items')->get()->each(function (Menu $menu): void {
            $labels = [];
            foreach ($menu->items as $item) {
                $label = $item->labels[$this->from] ?? null;
                if (is_string($label) && trim($label) !== '') {
                    $labels["i{$item->id}"] = self::item($label, $item->labels[$this->to] ?? null);
                }
            }
            $translated = $this->translate($labels, 'Menu “'.$menu->title.'”');
            foreach ($menu->items as $item) {
                $label = $translated["i{$item->id}"] ?? null;
                if (is_string($label) && $label !== '') {
                    $item->forceFill(['labels' => [...$item->labels, $this->to => $label]])->save();
                }
            }
        });
    }

    /**
     * A plain value to translate as a whole.
     *
     * @return array{source: mixed, target: mixed, strings: array<string, array{text: string, rich: bool}>}
     */
    private static function item(string $source, ?string $target): array
    {
        return ['source' => $source, 'target' => $target, 'strings' => trim($source) === '' ? [] : ['' => ['text' => $source, 'rich' => false]]];
    }

    /**
     * The fields that differ per language, keyed "data.<handle>".
     *
     * @param  array<mixed>  $data
     * @param  array<mixed>  $target
     * @return array<string, array{source: mixed, target: mixed, strings: array<string, array{text: string, rich: bool}>}>
     */
    private function fieldItems(Schema $schema, array $data, array $target): array
    {
        $items = [];
        foreach (array_filter($schema->fields(), fn (Field $field): bool => $schema->isTranslatable($field)) as $field) {
            $value = $data[$field->handle] ?? null;
            $items["data.{$field->handle}"] = ['source' => $value, 'target' => $target[$field->handle] ?? null, 'strings' => TranslatableText::of($field, $value)];
        }

        return $items;
    }

    /**
     * The SEO title and description, keyed "seo.<key>".
     *
     * @param  array<mixed>  $data
     * @param  array<mixed>  $target
     * @return array<string, array{source: mixed, target: mixed, strings: array<string, array{text: string, rich: bool}>}>
     */
    private function seoItems(array $data, array $target): array
    {
        $items = [];
        foreach (['title', 'description'] as $key) {
            $value = Arr::get($data, Seo::KEY.'.'.$key);
            $theirs = Arr::get($target, Seo::KEY.'.'.$key);
            if (is_string($value)) {
                $items["seo.{$key}"] = self::item($value, is_string($theirs) ? $theirs : null);
            }
        }

        return $items;
    }

    /**
     * @param  array<string, mixed>  $translated
     * @return array<string, mixed>
     */
    private function fieldValues(array $translated): array
    {
        $values = [];
        foreach ($translated as $key => $value) {
            if (str_starts_with($key, 'data.')) {
                $values[substr($key, 5)] = $value;
            }
        }

        return $values;
    }

    /**
     * The target's SEO with the translated title and description, or null when neither was.
     *
     * @param  array<string, mixed>  $translated
     * @param  array<mixed>  $target
     * @return array<mixed>|null
     */
    private function seoValues(array $translated, array $target): ?array
    {
        if (! isset($translated['seo.title']) && ! isset($translated['seo.description'])) {
            return null;
        }
        $seo = is_array($target[Seo::KEY] ?? null) ? $target[Seo::KEY] : [];
        foreach (['title', 'description'] as $key) {
            if (isset($translated["seo.{$key}"])) {
                $seo[$key] = $translated["seo.{$key}"];
            }
        }

        return $seo;
    }

    /**
     * Sends the strings of the items not translated yet and returns those
     * items' values with the translations written in (null: nothing to save).
     *
     * @param  array<string, array{source: mixed, target: mixed, strings: array<string, array{text: string, rich: bool}>}>  $items
     * @return array<string, mixed>|null
     */
    private function translate(array $items, string $label): ?array
    {
        $pending = [];
        foreach ($items as $key => $item) {
            if ($item['strings'] === []) {
                continue;
            }
            $target = $item['target'];
            if (! $this->force && $target !== null && $target !== '' && $target != $item['source']) {
                $this->stats->skipped += count($item['strings']);

                continue;
            }
            foreach ($item['strings'] as $path => $string) {
                $pending["{$key}|{$path}"] = $string['text'];
            }
        }
        if ($pending === []) {
            return null;
        }
        if ($this->dryRun) {
            $this->stats->pending += count($pending);
            $this->say("{$label}: ".count($pending).' to translate');

            return null;
        }

        try {
            $answer = $this->translator->translate($pending, $this->from, $this->to, $label);
        } catch (Throwable $e) {
            $this->stats->failed += count($pending);
            $this->say("{$label}: failed ({$e->getMessage()})");

            return null;
        }

        $values = [];
        $written = 0;
        foreach ($pending as $id => $text) {
            [$key, $path] = explode('|', $id, 2);
            if (! isset($answer[$id])) {
                $this->stats->failed++;

                continue;
            }
            $value = $values[$key] ?? $items[$key]['source'];
            if ($path === '') {
                $value = $answer[$id];
            } elseif (is_array($value)) {
                Arr::set($value, $path, $answer[$id]);
            }
            $values[$key] = $value;
            $written++;
        }
        $this->stats->translated += $written;
        $this->written = $written;
        $this->say("{$label}: {$written} translated");

        return $values === [] ? null : $values;
    }

    /** The translations of the last translate() couldn't be saved. */
    private function failed(string $label, ?string $reason): void
    {
        $this->stats->translated -= $this->written;
        $this->stats->failed += $this->written;
        $this->say("{$label}: not saved ({$reason})");
    }

    private function say(string $line): void
    {
        if ($this->report !== null) {
            ($this->report)($line);
        }
    }
}
