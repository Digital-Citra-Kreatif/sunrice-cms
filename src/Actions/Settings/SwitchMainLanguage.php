<?php

declare(strict_types=1);

namespace Sunrice\Actions\Settings;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Sunrice\Events\ContentChanged;
use Sunrice\Fields\TranslationOverlay;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\MenuItem;
use Sunrice\Models\Redirect;
use Sunrice\Models\Revision;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Support\Locales;
use Sunrice\Support\SiteSettings;

/**
 * Makes another available language the main one, converting stored
 * content so nothing is lost:
 *
 * - Entries: the main language owns the full field data and secondary
 *   languages store only translated text (TranslationOverlay). The new
 *   main gets its translation laid over the old main data; the old main
 *   keeps only what differs. Drafts and revisions are converted too.
 *   Entries of non-translatable collections are relabeled.
 * - Listing pages convert like entries; collection/taxonomy titles and
 *   menu labels swap so every language shows what it showed before.
 * - Terms and globals convert like entries (overlay data); a missing
 *   new-main term is filled from the old one.
 * - Redirects recorded for unprefixed URLs move to the new main language.
 *   Old URLs keep working: /{new-main}/… redirects to the unprefixed URL
 *   and an old main-language slug redirects to its prefixed page.
 */
class SwitchMainLanguage
{
    /**
     * What blocks or affects a switch to $to.
     *
     * @return array{
     *     missing_entries: array<int, array{id: int, collection: string, title: string}>,
     *     unready_entries: array<int, array{id: int, collection: string, title: string}>,
     *     missing_terms: array<int, array{id: int, taxonomy: string, name: string}>,
     *     missing_globals: array<int, string>,
     *     entries: int,
     * }
     */
    public function report(string $to): array
    {
        $this->assertSwitchable($to);
        $from = Locales::main();

        $report = ['missing_entries' => [], 'unready_entries' => [], 'missing_terms' => [], 'missing_globals' => [], 'entries' => 0];

        Entry::withTrashed()->with(['translations', 'collection'])->chunkById(200, function ($entries) use (&$report, $from, $to): void {
            foreach ($entries as $entry) {
                $report['entries']++;
                $old = $entry->translations->firstWhere('locale', $from);
                $new = $entry->translations->firstWhere('locale', $to);
                if ($old === null || ! $this->translatable($entry)) {
                    continue;
                }
                $row = ['id' => (int) $entry->id, 'collection' => (string) $entry->collection?->title, 'title' => (string) $old->title];
                if ($new === null) {
                    $report['missing_entries'][] = $row;
                } elseif (! $new->is_ready) {
                    $report['unready_entries'][] = $row;
                }
            }
        });

        Term::withTrashed()->with(['translations', 'taxonomy'])->chunkById(200, function ($terms) use (&$report, $from, $to): void {
            foreach ($terms as $term) {
                $old = $term->translations->firstWhere('locale', $from);
                if ($old !== null && $term->translations->firstWhere('locale', $to) === null) {
                    $report['missing_terms'][] = ['id' => (int) $term->id, 'taxonomy' => (string) $term->taxonomy?->title, 'name' => (string) $old->name];
                }
            }
        });

        foreach (GlobalSet::query()->with('values')->get() as $set) {
            if ($set->values->firstWhere('locale', $from) !== null && $set->values->firstWhere('locale', $to) === null) {
                $report['missing_globals'][] = (string) $set->title;
            }
        }

        return $report;
    }

    /**
     * Switch the main language. Entries and terms without a version in
     * $to block the switch unless $copyMissing, which copies the old main
     * language's content (so those pages keep showing it).
     *
     * @return array{entries: int, copied_entries: int, copied_terms: int, copied_globals: int}
     */
    public function handle(string $to, bool $copyMissing = false): array
    {
        $report = $this->report($to);
        if (! $copyMissing && ($report['missing_entries'] !== [] || $report['missing_terms'] !== [])) {
            throw new InvalidArgumentException('Some entries or terms have no '.$to.' version. Translate them first, or copy the current main language into them.');
        }

        $from = Locales::main();
        $stats = ['entries' => 0, 'copied_entries' => 0, 'copied_terms' => 0, 'copied_globals' => 0];

        DB::transaction(function () use ($from, $to, &$stats): void {
            Entry::withTrashed()->with(['translations.revisions', 'collection.blueprint', 'blueprint'])->chunkById(100, function ($entries) use ($from, $to, &$stats): void {
                foreach ($entries as $entry) {
                    $stats['entries'] += $this->switchEntry($entry, $from, $to, $stats) ? 1 : 0;
                }
            });

            $stats['copied_terms'] = $this->switchTerms($from, $to);
            $stats['copied_globals'] = $this->switchGlobals($from, $to);
            $this->switchListings($from, $to);
            $this->switchTitles($from, $to);
            $this->switchMenuLabels($from, $to);
            $this->switchRedirects($from, $to);

            $values = SiteSettings::current();
            Arr::set($values, 'locales.main', $to);
            $available = (array) Arr::get($values, 'locales.available', []);
            Arr::set($values, 'locales.available', array_values(array_unique([$to, ...$available])));
            SiteSettings::save($values);
        });

        ContentChanged::dispatch('main_language_switched');

        return $stats;
    }

    protected function assertSwitchable(string $to): void
    {
        if (! Locales::isAvailable($to)) {
            throw new InvalidArgumentException("\"{$to}\" is not one of the site's languages. Add it in Settings first.");
        }
        if (Locales::isMain($to)) {
            throw new InvalidArgumentException("\"{$to}\" is already the main language.");
        }
    }

    protected function translatable(Entry $entry): bool
    {
        return $entry->collection?->setting('translatable', true) !== false
            || $entry->translations->count() > 1;
    }

    /**
     * @param  array<string, int>  $stats
     */
    protected function switchEntry(Entry $entry, string $from, string $to, array &$stats): bool
    {
        $old = $entry->translations->firstWhere('locale', $from);
        if (! $old instanceof EntryTranslation) {
            return false;
        }
        $new = $entry->translations->firstWhere('locale', $to);

        // Single-language content: the row simply becomes the new language.
        if ($new === null && ! $this->translatable($entry)) {
            $old->locale = $to;
            $old->save();

            return true;
        }

        if ($new === null) {
            // --copy-missing: the old main content, as an untranslated copy.
            $new = $entry->translations()->create([
                'collection_id' => $entry->collection_id,
                'locale' => $to,
                'title' => $old->title,
                'slug' => $old->slug,
                'data' => [],
                'seo' => $old->seo ?? [],
                'is_ready' => true,
                'content_published_at' => $old->content_published_at,
            ]);
            $new->setRelation('revisions', collect());
            $stats['copied_entries']++;
        }

        $fields = $entry->activeBlueprint()?->schema()->fields();
        $merge = fn (array $main, array $overlay): array => $fields === null ? ($overlay ?: $main) : TranslationOverlay::merge($fields, $main, $overlay);
        $extract = fn (array $data, array $main): array => $fields === null ? $data : TranslationOverlay::extract($fields, $data, $main);

        $oldData = (array) ($old->data ?? []);
        $newData = $merge($oldData, (array) ($new->data ?? []));

        // Drafts: a translation's draft overlay is relative to the main
        // draft (or live data). If either side has a draft, the new main
        // gets one so the old main's unpublished layout changes survive.
        $oldDraft = is_array($old->draft) ? $old->draft : null;
        $newDraft = is_array($new->draft) ? $new->draft : null;
        if ($oldDraft !== null || $newDraft !== null) {
            $baseMain = (array) ($oldDraft['data'] ?? $oldData);
            $newDraft = [
                'title' => $newDraft['title'] ?? $new->title,
                'slug' => $newDraft['slug'] ?? $new->slug,
                'data' => $merge($baseMain, (array) ($newDraft['data'] ?? $new->data ?? [])),
                'seo' => $newDraft['seo'] ?? $new->seo ?? [],
            ];
        }
        if ($oldDraft !== null) {
            $oldDraft['data'] = $extract((array) ($oldDraft['data'] ?? []), (array) $newDraft['data']);
        }

        // Revisions: old-main snapshots become overlays, new-main ones
        // full data (against today's main data: the best reference left).
        foreach ($old->revisions as $revision) {
            $this->convertRevision($revision, fn (array $data) => $extract($data, $newData));
        }
        foreach ($new->revisions as $revision) {
            $this->convertRevision($revision, fn (array $data) => $merge($oldData, $data));
        }

        $new->data = $newData;
        $new->draft = $newDraft;
        $new->is_ready = true;
        $new->save();

        $old->data = $extract($oldData, $newData);
        $old->draft = $oldDraft;
        // The old main language was the original: keep it published.
        $old->is_ready = true;
        $old->save();

        return true;
    }

    protected function convertRevision(Revision $revision, callable $convert): void
    {
        $content = (array) $revision->content;
        $content['data'] = $convert((array) ($content['data'] ?? []));
        $revision->content = $content;
        $revision->save();
    }

    protected function switchTerms(string $from, string $to): int
    {
        $copied = 0;
        Term::withTrashed()->with(['translations', 'taxonomy.blueprint'])->chunkById(200, function ($terms) use ($from, $to, &$copied): void {
            foreach ($terms as $term) {
                $old = $term->translations->firstWhere('locale', $from);
                if ($old === null) {
                    continue;
                }
                $new = $term->translations->firstWhere('locale', $to);
                if ($new === null) {
                    // --copy-missing: the old main term, as an untranslated copy.
                    $new = $term->translations()->make([
                        'taxonomy_id' => $term->taxonomy_id,
                        'locale' => $to,
                        'name' => $old->name,
                        'slug' => $old->slug,
                        'data' => [],
                        'seo' => $old->seo,
                    ]);
                    $copied++;
                }

                $fields = $term->taxonomy?->blueprint?->schema()->fields();
                [$newData, $oldData] = $this->swapData($fields, (array) ($old->data ?? []), (array) ($new->data ?? []));
                $new->data = $newData;
                $new->is_ready = true;
                $new->save();
                $old->data = $oldData;
                // The old main language was the original: keep it shown.
                $old->is_ready = true;
                $old->save();
            }
        });

        return $copied;
    }

    protected function switchGlobals(string $from, string $to): int
    {
        $copied = 0;
        foreach (GlobalSet::query()->with(['values', 'blueprint'])->get() as $set) {
            $old = $set->values->firstWhere('locale', $from);
            if ($old === null) {
                continue;
            }
            $new = $set->values->firstWhere('locale', $to) ?? $set->values()->make(['locale' => $to, 'data' => []]);
            $copied += $new->exists ? 0 : 1;

            [$newData, $oldData] = $this->swapData($set->blueprint?->schema()->fields(), (array) ($old->data ?? []), (array) ($new->data ?? []));
            $new->data = $newData;
            $new->save();
            $old->data = $oldData;
            $old->save();
        }

        return $copied;
    }

    /**
     * The new main language's full data and the old main language's
     * overlay, from the old full data and the new language's overlay.
     *
     * @param  array<int, array<string, mixed>>|null  $fields
     * @param  array<string, mixed>  $oldData
     * @param  array<string, mixed>  $newOverlay
     * @return array{0: array<string, mixed>, 1: array<string, mixed>}
     */
    protected function swapData(?array $fields, array $oldData, array $newOverlay): array
    {
        if ($fields === null) {
            return [$newOverlay ?: $oldData, $oldData];
        }
        $newData = TranslationOverlay::merge($fields, $oldData, $newOverlay);

        return [$newData, TranslationOverlay::extract($fields, $oldData, $newData)];
    }

    /** Listing pages: like entries (overlay data), heading/intro fall back. */
    protected function switchListings(string $from, string $to): void
    {
        foreach (Collection::query()->get() as $collection) {
            $byLocale = Collection::archiveByLocale($collection->archive_data);
            if ($byLocale === []) {
                continue;
            }
            $old = (array) ($byLocale[$from] ?? []);
            $new = (array) ($byLocale[$to] ?? []);
            $fields = $collection->archiveSchema()?->fields();

            $oldData = (array) ($old['data'] ?? []);
            $newData = $fields === null ? ((array) ($new['data'] ?? []) ?: $oldData) : TranslationOverlay::merge($fields, $oldData, (array) ($new['data'] ?? []));

            $byLocale[$to] = array_filter([
                'title' => ($new['title'] ?? null) ?: ($old['title'] ?? null),
                'intro' => ($new['intro'] ?? null) ?: ($old['intro'] ?? null),
                'data' => $newData ?: null,
                'seo' => $new['seo'] ?? null,
            ], fn ($v) => $v !== null);
            if ($old !== []) {
                $overlay = $fields === null ? $oldData : TranslationOverlay::extract($fields, $oldData, $newData);
                $byLocale[$from] = array_filter([
                    'title' => $old['title'] ?? null,
                    'intro' => $old['intro'] ?? null,
                    'data' => $overlay ?: null,
                    'seo' => $old['seo'] ?? null,
                ], fn ($v) => $v !== null);
            }

            $collection->archive_data = array_filter($byLocale);
            $collection->save();
        }
    }

    /** Collection and taxonomy titles: the `title` column is the main one. */
    protected function switchTitles(string $from, string $to): void
    {
        foreach ([Collection::query()->get(), Taxonomy::query()->get()] as $models) {
            foreach ($models as $model) {
                $settings = (array) ($model->settings ?? []);
                $titles = (array) ($settings['titles'] ?? []);
                $translated = $titles[$to] ?? null;
                if (! is_string($translated) || $translated === '') {
                    continue; // The new main language already showed this title.
                }
                $titles[$from] = $model->title;
                unset($titles[$to]);
                $settings['titles'] = $titles;
                $model->title = $translated;
                $model->settings = $settings;
                $model->save();
            }
        }
    }

    /** Labels fall back to the main language: keep what each one showed. */
    protected function switchMenuLabels(string $from, string $to): void
    {
        foreach (MenuItem::query()->get() as $item) {
            $labels = (array) ($item->labels ?? []);
            if (($labels[$to] ?? '') === '' && ($labels[$from] ?? '') !== '') {
                $labels[$to] = $labels[$from];
                $item->labels = $labels;
                $item->save();
            }
        }
    }

    /**
     * Unprefixed paths now belong to the new main language; its old
     * /{to}/… paths are reached without the prefix.
     */
    protected function switchRedirects(string $from, string $to): void
    {
        $prefix = '/'.$to;
        foreach (Redirect::query()->where('locale', $to)->get() as $redirect) {
            if (str_starts_with($redirect->old_path, $prefix.'/') || $redirect->old_path === $prefix) {
                $path = substr($redirect->old_path, strlen($prefix)) ?: '/';
                $taken = Redirect::query()->where('old_path', $path)->where('locale', $to)->exists();
                $taken ? $redirect->delete() : $redirect->update(['old_path' => $path]);
            }
        }

        foreach (Redirect::query()->where('locale', $from)->get() as $redirect) {
            $taken = Redirect::query()->where('old_path', $redirect->old_path)->where('locale', $to)->exists();
            $taken ? $redirect->delete() : $redirect->update(['locale' => $to]);
        }
    }
}
