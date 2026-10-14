<?php

declare(strict_types=1);

namespace Sunrice\Translation;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Sunrice\Fields\TranslationOverlay;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\MenuItem;
use Sunrice\Models\Term;
use Sunrice\Models\TermTranslation;
use Sunrice\Support\HtmlSanitizer;
use Sunrice\Support\Locales;
use Sunrice\Support\SlugValidator;

/**
 * Machine-translates CMS content from one language into another.
 *
 * - Entries: the result is saved as the translation's draft and the
 *   translation is never marked Ready, so editors review it and publish
 *   as usual. Only translated text is stored; the layout and non-text
 *   fields keep coming from the main language (TranslationOverlay).
 * - Terms: a new translation is saved not Ready, so editors review it
 *   and switch it on; an existing one keeps its state. Like entries,
 *   only translated text is stored.
 * - Globals and menu labels are written directly (globals store only
 *   their translated text).
 *
 * Existing translations are kept unless $force is set. A target value that
 * is identical to the source counts as untranslated (the admin pre-fills
 * new translations with the source text).
 */
class ContentTranslator
{
    protected ?Closure $reporter = null;

    public function __construct(
        protected Translator $translator,
        protected string $from,
        protected string $to,
        protected bool $force = false,
        protected bool $dryRun = false,
        protected TranslationStats $stats = new TranslationStats,
    ) {}

    public function onProgress(Closure $reporter): static
    {
        $this->reporter = $reporter;

        return $this;
    }

    public function stats(): TranslationStats
    {
        return $this->stats;
    }

    /** @param array<int, string> $collections handles to limit to (empty = all translatable collections) */
    public function entries(array $collections = []): void
    {
        Entry::query()
            ->with(['translations', 'collection.blueprint', 'blueprint'])
            ->when($collections !== [], fn ($q) => $q->whereHas('collection', fn ($c) => $c->whereIn('handle', $collections)))
            ->chunkById(50, function ($entries): void {
                foreach ($entries as $entry) {
                    if ($entry->collection?->setting('translatable', true) === false) {
                        continue;
                    }
                    $this->entry($entry);
                }
            });
    }

    /** Translate one entry (entries() calls this for each). */
    public function entry(Entry $entry): void
    {
        $source = $entry->translation($this->from);
        if ($source === null) {
            return;
        }

        $fields = $entry->activeBlueprint()?->schema()->fields() ?? [];
        $main = $entry->mainTranslation();
        $mainData = $main === null ? [] : (array) ($this->contentOf($main)['data'] ?? []);

        // The published text, or the draft for entries never published.
        $sourceContent = $this->contentOf($source);
        $sourceData = $entry->dataFor($source, (array) ($sourceContent['data'] ?? []), $mainData);
        $sourceSeo = (array) ($sourceContent['seo'] ?? []);

        $strings = TranslatableStrings::collect($fields, $sourceData, 'data.');
        if (is_string($sourceContent['title'] ?? null) && $sourceContent['title'] !== '') {
            $strings = ['title' => ['value' => $sourceContent['title'], 'rich' => false]] + $strings;
        }
        foreach (['title', 'description'] as $key) {
            if (is_string($sourceSeo[$key] ?? null) && trim($sourceSeo[$key]) !== '') {
                $strings["seo.{$key}"] = ['value' => $sourceSeo[$key], 'rich' => false];
            }
        }

        $target = $entry->translation($this->to);
        $work = $target === null
            ? ['title' => '', 'slug' => '', 'data' => [], 'seo' => []]
            : (is_array($target->draft) ? $target->draft : ['title' => $target->title, 'slug' => $target->slug, 'data' => $target->data, 'seo' => $target->seo]);
        // Work on the target's text laid over the main layout, so every
        // string has a slot at the same path as in the source.
        $work['data'] = $entry->dataFor($target ?? new EntryTranslation(['locale' => $this->to]), (array) ($work['data'] ?? []), $mainData);
        $work['seo'] = (array) ($work['seo'] ?? []) + $sourceSeo;

        $label = ($entry->collection->title ?? 'Entry').' “'.$source->title.'”';
        $work = $this->translateInto($work, $strings, $label);
        if ($work === null) {
            return;
        }

        if (! Locales::isMain($this->to) && $fields !== []) {
            $work['data'] = TranslationOverlay::extract($fields, (array) $work['data'], $mainData);
        }

        $slug = (string) ($work['slug'] ?? '');
        if ($slug === '' || $slug === $source->slug || $this->force) {
            $work['slug'] = SlugValidator::unique(Str::slug((string) $work['title']), $entry->collection_id, $this->to, $entry->id);
        }

        if ($target === null) {
            EntryTranslation::query()->create([
                'entry_id' => $entry->id,
                'collection_id' => $entry->collection_id,
                'locale' => $this->to,
                'title' => $work['title'],
                'slug' => $work['slug'],
                'data' => [],
                'seo' => $source->seo,
                'draft' => $work,
                'is_ready' => false,
            ]);
        } else {
            $target->forceFill(['draft' => $work])->save();
        }
    }

    /**
     * The published content, or the draft for translations never published.
     *
     * @return array<string, mixed>
     */
    protected function contentOf(EntryTranslation $translation): array
    {
        return $translation->content_published_at === null && is_array($translation->draft)
            ? $translation->draft + ['title' => $translation->title, 'data' => [], 'seo' => []]
            : ['title' => $translation->title, 'data' => $translation->data, 'seo' => $translation->seo];
    }

    public function terms(): void
    {
        Term::query()->with(['translations', 'taxonomy.blueprint'])->chunkById(100, function ($terms): void {
            foreach ($terms as $term) {
                $source = $term->translation($this->from);
                if ($source === null) {
                    continue;
                }

                $fields = $term->taxonomy?->blueprint?->schema()->fields() ?? [];
                $strings = ['name' => ['value' => (string) $source->name, 'rich' => false]]
                    + TranslatableStrings::collect($fields, $term->dataFor($source), 'data.');

                // The target's text laid over the main data, so every string has a slot.
                $target = $term->translation($this->to);
                $work = ['name' => $target->name ?? '', 'data' => $term->dataFor($target ?? new TermTranslation(['locale' => $this->to]))];

                $work = $this->translateInto($work, $strings, ($term->taxonomy->title ?? 'Term').' “'.$source->name.'”');
                if ($work === null) {
                    continue;
                }

                if (! Locales::isMain($this->to) && $fields !== []) {
                    $work['data'] = TranslationOverlay::extract($fields, (array) $work['data'], (array) ($term->mainTranslation()->data ?? []));
                }

                if ($target === null) {
                    TermTranslation::query()->create([
                        'term_id' => $term->id,
                        'taxonomy_id' => $term->taxonomy_id,
                        'locale' => $this->to,
                        'name' => $work['name'],
                        'slug' => SlugValidator::uniqueForTerm(Str::slug((string) $work['name']), $term->taxonomy_id, $this->to, $term->id),
                        'data' => $work['data'],
                        // Machine-translated: shown once an editor marks it Ready.
                        'is_ready' => Locales::isMain($this->to),
                    ]);
                } else {
                    $target->forceFill(['name' => $work['name'], 'data' => $work['data']])->save();
                }
            }
        });
    }

    public function globals(): void
    {
        GlobalSet::query()->with(['blueprint', 'values'])->get()
            ->each(function (GlobalSet $set): void {
                if ($set->valueFor($this->from) === null) {
                    return;
                }
                $strings = TranslatableStrings::collect($set->blueprint?->schema()->fields() ?? [], $set->valuesFor($this->from), 'data.');
                $work = ['data' => $set->valuesFor($this->to)];

                $work = $this->translateInto($work, $strings, 'Site content “'.$set->title.'”');
                if ($work === null) {
                    return;
                }

                $set->setValuesFor($this->to, (array) $work['data']);
            });
    }

    public function menus(): void
    {
        MenuItem::query()->with('menu')->get()->groupBy('menu_id')->each(function ($items): void {
            $strings = [];
            $work = [];
            foreach ($items as $item) {
                $label = $item->labels[$this->from] ?? null;
                if (is_string($label) && $label !== '') {
                    $strings["i{$item->id}"] = ['value' => $label, 'rich' => false];
                    $work["i{$item->id}"] = $item->labels[$this->to] ?? '';
                }
            }

            $work = $this->translateInto($work, $strings, 'Navigation menu labels');
            if ($work === null) {
                return;
            }

            foreach ($items as $item) {
                if (isset($work["i{$item->id}"]) && $work["i{$item->id}"] !== '') {
                    $item->forceFill(['labels' => [...(array) $item->labels, $this->to => $work["i{$item->id}"]]])->save();
                }
            }
        });
    }

    /**
     * Translate the strings whose target value is missing (or all of them
     * with --force) and return $work with them written in, or null when
     * nothing was written.
     *
     * @param  array<array-key, mixed>  $work
     * @param  array<string, array{value: string, rich: bool}>  $strings
     * @return array<array-key, mixed>|null
     */
    protected function translateInto(array $work, array $strings, string $label): ?array
    {
        $pending = [];
        foreach ($strings as $path => $string) {
            $existing = Arr::get($work, $path);
            if (! $this->force && is_string($existing) && trim($existing) !== '' && $existing !== $string['value']) {
                $this->stats->skipped++;

                continue;
            }
            $pending[$path] = $string['value'];
        }

        if ($pending === []) {
            return null;
        }

        if ($this->dryRun) {
            $this->stats->pending += count($pending);
            $this->report("{$label}: ".count($pending).' string(s) to translate');

            return null;
        }

        try {
            $translated = $this->translator->translate($pending, $this->from, $this->to, $label);
        } catch (\Throwable $e) {
            $this->stats->failed += count($pending);
            $this->stats->errors[] = "{$label}: {$e->getMessage()}";
            $this->report("{$label}: failed ({$e->getMessage()})");

            return null;
        }

        $written = 0;
        foreach ($pending as $path => $original) {
            if (! isset($translated[$path])) {
                $this->stats->failed++;

                continue;
            }
            // Model output is untrusted HTML: sanitize rich text like editor input.
            Arr::set($work, $path, $strings[$path]['rich'] ? HtmlSanitizer::sanitize($translated[$path]) : $translated[$path]);
            $written++;
        }

        $this->stats->translated += $written;
        $this->report("{$label}: translated {$written} string(s)");

        return $written > 0 ? $work : null;
    }

    protected function report(string $line): void
    {
        if ($this->reporter !== null) {
            ($this->reporter)($line);
        }
    }
}
