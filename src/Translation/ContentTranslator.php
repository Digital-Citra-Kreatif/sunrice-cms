<?php

declare(strict_types=1);

namespace Sunrice\Cms\Translation;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Actions\Collections\SaveListing;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Actions\Globals\SaveGlobals;
use Sunrice\Cms\Actions\Taxonomies\SaveIndexPage;
use Sunrice\Cms\Actions\Terms\SaveTermContent;
use Sunrice\Cms\Actions\Translations\SaveVisitorTranslations;
use Sunrice\Cms\Admin\VisitorTexts;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;
use Throwable;

/**
 * Machine-translates content from one language into another with a
 * Translator. Only what isn't translated yet (missing, empty, or still
 * the source's text) unless `$force`.
 *
 * - Entries: into the translation's draft, through SaveDraft (validated,
 *   rich text cleaned), never published; a missing translation is added
 *   first (CreateTranslation). Editors check it, then publish. The
 *   entry's terms (every language's) aren't touched.
 * - Terms (title, fields and SEO), globals, listing and index pages,
 *   menu labels and the site's texts (Content → Translations): saved as
 *   they are, through SaveTermContent, SaveGlobals, SaveListing,
 *   SaveIndexPage and SaveVisitorTranslations.
 *
 * Each save is refused, and told as failed, when someone saved the same
 * thing while it was being translated.
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
            // A collection that isn't translatable has its main language only.
            ->whereHas('collection', fn ($q) => ($collections === [] ? $q : $q->whereIn('handle', $collections))->where('translatable', true))
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
        if ($source === null || $entry->trashed() || ! $entry->collection->translatable) {
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
        $strings += self::seoStrings($sourceSeo, $targetSeo);

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
                    $this->term($term);
                }
            });
    }

    /** A term's title, fields and SEO title and description, saved through SaveTermContent (refused over a newer save). */
    private function term(Term $term): void
    {
        $source = $term->translations->firstWhere('locale', $this->from);
        if ($source === null) {
            return;
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
        $strings += self::seoStrings($sourceSeo, $targetSeo);
        $label = $term->taxonomy->title.' “'.$source->title.'”';
        $work = $this->translateInto(['title' => $target->title ?? $source->title, 'data' => $data, 'seo' => $targetSeo + $sourceSeo], $strings, $label);
        if ($work === null) {
            return;
        }
        $input = ['title' => $work['title'], 'data' => $work['data'], 'version' => $target?->version];
        // A slug of its own stays; one still the source's is made from the translated title (none: SaveTerm makes it).
        if ($target !== null) {
            $input['slug'] = $target->slug === $source->slug && is_string($work['title']) && $work['title'] !== $source->title
                ? self::freeTermSlug(Str::slug($work['title']), $target)
                : $target->slug;
        }
        if ($work['seo'] !== []) {
            $input[Seo::KEY] = $work['seo'];
        }
        try {
            app(SaveTermContent::class)->handle($term, $input, $this->to);
        } catch (ValidationException $e) {
            $this->failed($label, implode(' ', $e->validator->errors()->all()));
        }
    }

    /**
     * Collections' listing pages and taxonomies' index pages (shared, or a
     * collection's): their fields and SEO title and description, through
     * SaveListing and SaveIndexPage (refused over a newer save). Pages
     * switched off, or of deleted collections and taxonomies, are left alone.
     */
    public function pages(): void
    {
        $targets = CollectionListing::query()->where('locale', $this->to)->get()->keyBy('collection_id');
        foreach (CollectionListing::query()->where('locale', $this->from)->with('collection')->get() as $source) {
            $collection = $source->collection;
            if ($collection->trashed()) {
                continue;
            }
            $target = $targets->get($collection->id);
            $work = $this->page($collection->listingSchema(), $source->data, $target->data ?? [], 'Listing page “'.$collection->title.'”');
            if ($work !== null) {
                $this->saving('Listing page “'.$collection->title.'”', fn () => app(SaveListing::class)->handle($collection, $work['data'], $this->to, $target?->version, $work['seo']));
            }
        }

        $targets = TaxonomyListing::query()->where('locale', $this->to)->get()->keyBy(fn (TaxonomyListing $page): string => $page->taxonomy_id.':'.$page->collection_id);
        foreach (TaxonomyListing::query()->where('locale', $this->from)->with(['taxonomy', 'collection'])->get() as $source) {
            $taxonomy = $source->taxonomy;
            $collection = $source->collection;
            if ($taxonomy->trashed() || $collection?->trashed() === true || ! $taxonomy->hasIndexPage($collection)) {
                continue;
            }
            $target = $targets->get($taxonomy->id.':'.$source->collection_id);
            $label = 'Index page “'.($collection === null ? '' : $collection->title.' · ').$taxonomy->title.'”';
            $work = $this->page($taxonomy->indexSchema(), $source->data, $target->data ?? [], $label);
            if ($work !== null) {
                $this->saving($label, fn () => app(SaveIndexPage::class)->handle($taxonomy, $collection, $work['data'], $this->to, $target?->version, $work['seo']));
            }
        }
    }

    /**
     * A listing or index page's fields and SEO translated; null when nothing was.
     *
     * @param  array<mixed>  $sourceData
     * @param  array<mixed>  $targetData
     * @return array{data: array<mixed>, seo: array<mixed>|null}|null
     */
    private function page(Schema $schema, array $sourceData, array $targetData, string $label): ?array
    {
        $sourceSeo = is_array($sourceData[Seo::KEY] ?? null) ? $sourceData[Seo::KEY] : [];
        $targetSeo = is_array($targetData[Seo::KEY] ?? null) ? $targetData[Seo::KEY] : [];
        [$data, $fieldStrings] = TranslatableStrings::pairs($schema, $targetData, $sourceData);
        unset($data[Seo::KEY]);
        $strings = [];
        foreach ($fieldStrings as $path => $string) {
            $strings["data.{$path}"] = $string;
        }
        $strings += self::seoStrings($sourceSeo, $targetSeo);
        $work = $this->translateInto(['data' => $data, 'seo' => $targetSeo + $sourceSeo], $strings, $label);
        if ($work === null || ! is_array($work['data']) || ! is_array($work['seo'])) {
            return null;
        }

        return ['data' => $work['data'], 'seo' => $work['seo'] === [] ? null : $work['seo']];
    }

    /**
     * What visitors read outside entries, as Content → Translations lists
     * it (VisitorTexts): the site's description, listing and term page
     * titles, forms' thank-you messages and their fields' labels, helper
     * texts and choices; saved through SaveVisitorTranslations. Menu labels
     * are menus()'. From the main language into another only: those texts
     * are the main language's.
     */
    public function texts(): void
    {
        if ($this->from !== Locales::default() || $this->to === Locales::default()) {
            return;
        }
        $keys = [];
        $strings = [];
        $work = [];
        foreach (VisitorTexts::sections($this->to) as $section) {
            foreach ($section['texts'] as $text) {
                if (str_starts_with($text['key'], 'menu|')) {
                    continue;
                }
                // Keys hold dots and bars: sent as t0, t1…
                $id = 't'.count($keys);
                $keys[$id] = $text['key'];
                $strings[$id] = ['source' => $text['source'], 'current' => $text['value'], 'rich' => false];
                $work[$id] = $text['value'];
            }
        }
        $work = $this->translateInto($work, $strings, 'Site texts (Content → Translations)');
        if ($work === null) {
            return;
        }
        $texts = [];
        foreach ($keys as $id => $key) {
            if (is_string($work[$id] ?? null) && $work[$id] !== $strings[$id]['current']) {
                $texts[$key] = $work[$id];
            }
        }
        $this->saving('Site texts', fn () => app(SaveVisitorTranslations::class)->handle($this->to, $texts));
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
                app(SaveGlobals::class)->handle($set, $work['data'], $this->to, $target?->version);
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

    /**
     * The SEO title and description to translate.
     *
     * @param  array<mixed>  $source
     * @param  array<mixed>  $target
     * @return array<string, array{source: string, current: string|null, rich: bool}>
     */
    private static function seoStrings(array $source, array $target): array
    {
        $strings = [];
        foreach (['title', 'description'] as $key) {
            if (is_string($source[$key] ?? null) && trim($source[$key]) !== '') {
                $strings["seo.{$key}"] = ['source' => $source[$key], 'current' => is_string($target[$key] ?? null) ? $target[$key] : null, 'rich' => false];
            }
        }

        return $strings;
    }

    /** Runs a save, telling of what it refused. */
    private function saving(string $label, Closure $save): void
    {
        try {
            $save();
        } catch (ValidationException $e) {
            $this->failed($label, implode(' ', $e->validator->errors()->all()));
        }
    }

    private static function freeTermSlug(string $slug, TermTranslation $target): string
    {
        $slug = $slug !== '' ? Str::limit($slug, 190, '') : $target->slug;
        $candidate = $slug;
        for ($i = 2; TermTranslation::query()->where('taxonomy_id', $target->taxonomy_id)->where('locale', $target->locale)
            ->where('slug', $candidate)->whereKeyNot($target->id)->exists(); $i++) {
            $candidate = "{$slug}-{$i}";
        }

        return $candidate;
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
