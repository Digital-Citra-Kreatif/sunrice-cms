<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Actions\Globals\SaveGlobals;
use Sunrice\Cms\Actions\Terms\SaveTerm;
use Sunrice\Cms\Actions\Terms\SaveTermContent;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Seo;
use Throwable;

/**
 * Machine-translates content from one language into another with a
 * Translator. Only what isn't translated yet (missing, empty, or still
 * the source's text) unless `$force`.
 *
 * - Entries: into the translation's draft, through SaveDraft (validated,
 *   rich text cleaned), never published; a missing translation is added
 *   first (CreateTranslation). Editors check it, then publish.
 * - Terms (title, fields and SEO), globals and menu labels: saved as they
 *   are, through SaveTerm, SaveTermContent and SaveGlobals.
 *
 * @api
 */
final class ContentTranslator
{
    private ?Closure $reporter = null;

    public function __construct(
        private readonly Translator $translator,
        private readonly string $from,
        private readonly string $to,
        private readonly bool $force = false,
        private readonly bool $dryRun = false,
        private readonly TranslationStats $stats = new TranslationStats,
    ) {}

    /** @param Closure(string): void $reporter told what happens, a line at a time */
    public function onProgress(Closure $reporter): self
    {
        $this->reporter = $reporter;

        return $this;
    }

    public function stats(): TranslationStats
    {
        return $this->stats;
    }

    /** @param list<string> $collections handles to keep to (none: all) */
    public function entries(array $collections = []): void
    {
        Entry::query()->whereHas('translations', fn ($q) => $q->where('locale', $this->from))
            ->whereHas('collection', fn ($q) => $collections === [] ? $q : $q->whereIn('handle', $collections))
            ->with(['translations', 'collection'])
            ->chunkById(50, function ($entries): void {
                foreach ($entries as $entry) {
                    $this->entry($entry);
                }
            });
    }

    /** Translate one entry into its translation's draft (added when missing); null when nothing was written. */
    public function entry(Entry $entry): ?EntryTranslation
    {
        $source = $entry->translation($this->from);
        if ($source === null || $entry->trashed()) {
            return null;
        }
        $schema = $entry->schema();
        $target = $entry->translation($this->to);
        $label = $entry->collection->title.' “'.$source->draft_title.'”';
        $sourceSeo = is_array($source->draft_data[Seo::KEY] ?? null) ? $source->draft_data[Seo::KEY] : [];
        $targetData = $target->draft_data ?? [];
        $targetSeo = is_array($targetData[Seo::KEY] ?? null) ? $targetData[Seo::KEY] : [];

        [$data, $fieldStrings] = TranslatableStrings::pairs($schema, $targetData, $source->completeData(draft: true));
        $work = ['title' => $target->draft_title ?? $source->draft_title, 'data' => $data, 'seo' => $targetSeo + $sourceSeo];
        $strings = ['title' => ['source' => $source->draft_title, 'current' => $target?->draft_title, 'rich' => false]];
        foreach ($fieldStrings as $path => $string) {
            $strings["data.{$path}"] = $string;
        }
        foreach (['title', 'description'] as $key) {
            if (is_string($sourceSeo[$key] ?? null) && trim($sourceSeo[$key]) !== '') {
                $strings["seo.{$key}"] = ['source' => $sourceSeo[$key], 'current' => is_string($targetSeo[$key] ?? null) ? $targetSeo[$key] : null, 'rich' => false];
            }
        }

        $work = $this->translateInto($work, $strings, $label);
        if ($work === null) {
            return null;
        }
        try {
            $target ??= app(CreateTranslation::class)->handle($entry, $this->to);
            $input = ['title' => $work['title'], 'data' => $work['data'], 'version' => $target->version];
            if ($work['seo'] !== []) {
                $input[Seo::KEY] = $work['seo'];
            }
            // Still the source's slug: one from the translated title.
            if ($target->draft_slug === $source->draft_slug && is_string($work['title']) && $work['title'] !== $source->draft_title) {
                $input['slug'] = self::freeSlug(Str::slug($work['title']), $target);
            }

            return app(SaveDraft::class)->handle($target, $input);
        } catch (ValidationException $e) {
            $this->failed($label, implode(' ', $e->validator->errors()->all()));

            return null;
        }
    }

    public function terms(): void
    {
        Term::query()->whereHas('translations', fn ($q) => $q->where('locale', $this->from))->with(['translations', 'taxonomy'])
            ->chunkById(100, function ($terms): void {
                foreach ($terms as $term) {
                    $source = $term->translations->firstWhere('locale', $this->from);
                    if ($source === null) {
                        continue;
                    }
                    $target = $term->translations->firstWhere('locale', $this->to);
                    $sourceData = $source->data ?? [];
                    $sourceSeo = is_array($sourceData[Seo::KEY] ?? null) ? $sourceData[Seo::KEY] : [];
                    $targetData = $target->data ?? [];
                    $targetSeo = is_array($targetData[Seo::KEY] ?? null) ? $targetData[Seo::KEY] : [];
                    [$data, $fieldStrings] = TranslatableStrings::pairs($term->taxonomy->schema(), $targetData, $sourceData);
                    $strings = ['title' => ['source' => $source->title, 'current' => $target?->title, 'rich' => false]];
                    foreach ($fieldStrings as $path => $string) {
                        $strings["data.{$path}"] = $string;
                    }
                    if (is_string($sourceSeo['description'] ?? null) && trim($sourceSeo['description']) !== '') {
                        $strings['seo.description'] = ['source' => $sourceSeo['description'], 'current' => is_string($targetSeo['description'] ?? null) ? $targetSeo['description'] : null, 'rich' => false];
                    }
                    $label = $term->taxonomy->title.' “'.$source->title.'”';
                    $work = $this->translateInto(['title' => $target->title ?? $source->title, 'data' => $data, 'seo' => $targetSeo + $sourceSeo], $strings, $label);
                    if ($work === null) {
                        continue;
                    }
                    try {
                        if ($target === null || $work['title'] !== $target->title) {
                            app(SaveTerm::class)->handle($term->taxonomy, ['title' => $work['title'], 'locale' => $this->to], $term);
                        }
                        $content = ['data' => $work['data']];
                        if ($work['seo'] !== []) {
                            $content[Seo::KEY] = $work['seo'];
                        }
                        app(SaveTermContent::class)->handle($term, $content, $this->to);
                    } catch (ValidationException $e) {
                        $this->failed($label, implode(' ', $e->validator->errors()->all()));
                    }
                }
            });
    }

    public function globals(): void
    {
        foreach (GlobalSet::query()->with('values')->get() as $set) {
            $source = $set->values->firstWhere('locale', $this->from);
            if ($source === null) {
                continue;
            }
            $target = $set->values->firstWhere('locale', $this->to);
            [$data, $fieldStrings] = TranslatableStrings::pairs($set->schema(), $target->data ?? [], $source->data);
            $strings = [];
            foreach ($fieldStrings as $path => $string) {
                $strings["data.{$path}"] = $string;
            }
            $label = 'Globals “'.$set->title.'”';
            $work = $this->translateInto(['data' => $data], $strings, $label);
            if ($work === null || ! is_array($work['data'])) {
                continue;
            }
            try {
                app(SaveGlobals::class)->handle($set, $work['data'], $this->to);
            } catch (ValidationException $e) {
                $this->failed($label, implode(' ', $e->validator->errors()->all()));
            }
        }
    }

    public function menus(): void
    {
        foreach (MenuItem::query()->get()->groupBy('menu_id') as $items) {
            $strings = [];
            $work = [];
            foreach ($items as $item) {
                $label = $item->labels[$this->from] ?? '';
                if ($label !== '') {
                    $strings["i{$item->id}"] = ['source' => $label, 'current' => $item->labels[$this->to] ?? null, 'rich' => false];
                    $work["i{$item->id}"] = $item->labels[$this->to] ?? $label;
                }
            }
            $work = $this->translateInto($work, $strings, 'Menu labels');
            if ($work === null) {
                continue;
            }
            foreach ($items as $item) {
                $label = $work["i{$item->id}"] ?? null;
                if (is_string($label) && $label !== '' && $label !== ($item->labels[$this->to] ?? null)) {
                    $item->labels = [...$item->labels, $this->to => $label];
                    $item->save();
                }
            }
        }
    }

    /**
     * Translate the strings not translated yet (all with $force) and return
     * $work with them written in; null when nothing was.
     *
     * @param  array<array-key, mixed>  $work
     * @param  array<string, array{source: string, current: string|null, rich: bool}>  $strings
     * @return array<array-key, mixed>|null
     */
    private function translateInto(array $work, array $strings, string $label): ?array
    {
        $pending = [];
        foreach ($strings as $path => $string) {
            $current = $string['current'];
            if (! $this->force && $current !== null && trim($current) !== '' && $current !== $string['source']) {
                $this->stats->skipped++;

                continue;
            }
            $pending[$path] = $string['source'];
        }
        if ($pending === []) {
            return null;
        }
        if ($this->dryRun) {
            $this->stats->pending += count($pending);
            $this->report("{$label}: ".count($pending).' to translate');

            return null;
        }

        try {
            $translated = $this->translator->translate($pending, $this->from, $this->to, $label);
        } catch (Throwable $e) {
            $this->stats->failed += count($pending);
            $this->failed($label, $e->getMessage());

            return null;
        }
        $written = 0;
        foreach (array_keys($pending) as $path) {
            if (! isset($translated[$path])) {
                $this->stats->failed++;

                continue;
            }
            Arr::set($work, $path, $translated[$path]);
            $written++;
        }
        $this->stats->translated += $written;
        $this->report("{$label}: {$written} translated");

        return $written > 0 ? $work : null;
    }

    private static function freeSlug(string $slug, EntryTranslation $target): string
    {
        $slug = $slug !== '' ? $slug : $target->draft_slug;
        $candidate = $slug;
        for ($i = 2; EntryInput::taken($candidate, $target->collection_id, $target->locale, $target->id); $i++) {
            $candidate = "{$slug}-{$i}";
        }

        return $candidate;
    }

    private function failed(string $label, string $message): void
    {
        $this->stats->errors[] = "{$label}: {$message}";
        $this->report("{$label}: failed ({$message})");
    }

    private function report(string $line): void
    {
        if ($this->reporter !== null) {
            ($this->reporter)($line);
        }
    }
}
