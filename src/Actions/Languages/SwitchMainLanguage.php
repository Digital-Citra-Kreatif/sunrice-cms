<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Languages;

use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * Gets content ready for another language to be the main one (the first
 * in sunrice-cms.locales):
 *
 * - the fields shared by all languages move to that language's
 *   entries, terms, globals and listing pages, which then hold them;
 * - addresses that change get redirects: the main language's pages move
 *   under /<old>/…, and /<new>/… pages lose their prefix.
 *
 * Content without that language blocks the switch, unless $copyMissing:
 * it then gets a copy of the main language's. Nothing changes on the
 * site until the config does, so convert first, then change the config.
 *
 * @api
 */
final class SwitchMainLanguage
{
    public function __construct(private readonly Site $site, private readonly SiteCache $cache) {}

    /**
     * What stands in the way and what changes.
     *
     * @return array{missing_entries: list<string>, missing_terms: list<string>, unpublished: list<string>, entries: int}
     *
     * @throws InvalidArgumentException
     */
    public function report(string $to): array
    {
        $this->check($to);
        $from = Locales::default();
        $report = ['missing_entries' => [], 'missing_terms' => [], 'unpublished' => [], 'entries' => 0];
        Entry::query()->with(['translations', 'collection'])->whereHas('collection')->chunkById(200, function ($entries) use ($from, $to, &$report): void {
            foreach ($entries as $entry) {
                $main = $entry->translation($from);
                $new = $entry->translation($to);
                $name = "#{$entry->id} ".($main ?? $entry->mainTranslation())?->draft_title." ({$entry->collection->title})";
                if ($new === null) {
                    $report['missing_entries'][] = $name;
                } elseif ($main?->isPublished() === true && ! $new->isPublished()) {
                    $report['unpublished'][] = $name;
                }
                $report['entries']++;
            }
        });
        Term::query()->with(['translations', 'taxonomy'])->whereHas('taxonomy')->chunkById(200, function ($terms) use ($to, &$report): void {
            foreach ($terms as $term) {
                if ($term->translations->firstWhere('locale', $to) === null) {
                    $report['missing_terms'][] = "#{$term->id} {$term->title()} ({$term->taxonomy->title})";
                }
            }
        });

        return $report;
    }

    /**
     * @return array{entries: int, copied_entries: int, copied_terms: int, redirects: int}
     *
     * @throws InvalidArgumentException when content has no version in the language and $copyMissing is off
     */
    public function handle(string $to, bool $copyMissing = false): array
    {
        $report = $this->report($to);
        $missing = count($report['missing_entries']) + count($report['missing_terms']);
        if ($missing > 0 && ! $copyMissing) {
            throw new InvalidArgumentException("{$missing} entries and terms have no {$to} version: translate them first, or copy the main language's into them.");
        }
        $from = Locales::default();
        $stats = ['entries' => 0, 'copied_entries' => 0, 'copied_terms' => 0, 'redirects' => 0];

        DB::transaction(function () use ($from, $to, &$stats): void {
            $old = $this->paths();
            $this->entries($from, $to, $stats);
            $this->terms($from, $to, $stats);
            $this->globals($from, $to);
            $this->listings($from, $to);

            // The addresses once the config changes.
            $locales = Locales::all();
            config(['sunrice-cms.locales' => [$to, ...array_values(array_diff($locales, [$to]))]]);
            try {
                $new = $this->paths();
            } finally {
                config(['sunrice-cms.locales' => $locales]);
            }
            // The old main language's pages first: a page that now has its
            // address keeps no redirect away from it.
            uksort($old, fn (string $a, string $b): int => (int) str_starts_with($a, "{$to}:") <=> (int) str_starts_with($b, "{$to}:"));
            foreach ($old as $key => $path) {
                if (isset($new[$key]) && $new[$key] !== $path) {
                    $this->site->moved($path, $new[$key]);
                    $stats['redirects']++;
                }
            }
        });
        $this->cache->changed("main language {$to}");

        return $stats;
    }

    /** @throws InvalidArgumentException */
    private function check(string $to): void
    {
        if (! Locales::has($to)) {
            throw new InvalidArgumentException("\"{$to}\" isn't one of the site's languages: ".implode(', ', Locales::all()).'.');
        }
        if ($to === Locales::default()) {
            throw new InvalidArgumentException("\"{$to}\" is the main language already.");
        }
    }

    /** @param array{entries: int, copied_entries: int, copied_terms: int, redirects: int} $stats */
    private function entries(string $from, string $to, array &$stats): void
    {
        Entry::query()->with(['translations', 'collection'])->whereHas('collection')->chunkById(200, function ($entries) use ($from, $to, &$stats): void {
            foreach ($entries as $entry) {
                $main = $entry->translation($from) ?? $entry->mainTranslation();
                if ($main === null) {
                    continue;
                }
                $new = $entry->translation($to);
                if ($new === null) {
                    $copy = $main->replicate(['search_text']);
                    $copy->locale = $to;
                    $copy->version = 1;
                    $copy->slug = $main->slug === null ? null : $this->freeSlug($main->slug, $main, $to);
                    $copy->draft_slug = $copy->slug ?? $this->freeSlug($main->draft_slug, $main, $to);
                    $copy->save();
                    $stats['copied_entries']++;
                } else {
                    $shared = array_flip($entry->collection->schema()->shared());
                    $new->forceFill([
                        'data' => $new->data === null ? null : array_replace($new->data, array_intersect_key($main->data ?? [], $shared)),
                        'draft_data' => array_replace($new->draft_data, array_intersect_key($main->draft_data, $shared)),
                    ])->save();
                }
                $stats['entries']++;
            }
        });
    }

    private function freeSlug(string $slug, EntryTranslation $main, string $locale): string
    {
        $free = $slug;
        for ($i = 2; EntryTranslation::query()->where('collection_id', $main->collection_id)->where('locale', $locale)
            ->where(fn ($query) => $query->where('slug', $free)->orWhere('draft_slug', $free))->exists(); $i++) {
            $free = "{$slug}-{$i}";
        }

        return $free;
    }

    /** @param array{entries: int, copied_entries: int, copied_terms: int, redirects: int} $stats */
    private function terms(string $from, string $to, array &$stats): void
    {
        Term::query()->with(['translations', 'taxonomy'])->whereHas('taxonomy')->chunkById(200, function ($terms) use ($from, $to, &$stats): void {
            foreach ($terms as $term) {
                $main = $term->translations->firstWhere('locale', $from);
                if ($main === null) {
                    continue;
                }
                $new = $term->translations->firstWhere('locale', $to);
                if ($new === null) {
                    $slug = $main->slug;
                    for ($i = 2; TermTranslation::query()->where('taxonomy_id', $term->taxonomy_id)->where('locale', $to)->where('slug', $slug)->exists(); $i++) {
                        $slug = "{$main->slug}-{$i}";
                    }
                    $copy = $main->replicate();
                    $copy->forceFill(['locale' => $to, 'slug' => $slug])->save();
                    $stats['copied_terms']++;
                } else {
                    $new->forceFill(['data' => self::share($term->taxonomy->schema(), $main->data ?? [], $new->data ?? [])])->save();
                }
            }
        });
    }

    private function globals(string $from, string $to): void
    {
        GlobalSet::query()->with('values')->get()->each(function (GlobalSet $set) use ($from, $to): void {
            $main = $set->values->firstWhere('locale', $from);
            if ($main !== null) {
                $new = $set->values()->firstOrNew(['locale' => $to], ['data' => []]);
                $new->forceFill(['data' => $new->exists ? self::share($set->schema(), $main->data, $new->data) : $main->data])->save();
            }
        });
    }

    private function listings(string $from, string $to): void
    {
        Collection::query()->with('listings')->get()->each(function (Collection $collection) use ($from, $to): void {
            $main = $collection->listings->firstWhere('locale', $from);
            if ($main !== null) {
                $new = $collection->listings()->firstOrNew(['locale' => $to], ['data' => []]);
                $new->forceFill(['data' => $new->exists ? self::share($collection->listingSchema(), $main->data, $new->data) : $main->data])->save();
            }
        });
    }

    /**
     * @param  array<string, mixed>  $main
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private static function share(Schema $schema, array $main, array $data): array
    {
        return array_replace($data, array_intersect_key($main, array_flip($schema->shared())));
    }

    /**
     * The live pages' paths in each language, keyed "<locale>:<kind>:<id>".
     *
     * @return array<string, string>
     */
    private function paths(): array
    {
        $paths = [];
        EntryTranslation::query()->live()->with('entry.collection')->chunkById(500, function ($translations) use (&$paths): void {
            foreach ($translations as $translation) {
                if (($path = $this->site->path($translation, $translation->slug)) !== null) {
                    $paths["{$translation->locale}:entry:{$translation->id}"] = $path;
                }
            }
        });
        TermTranslation::query()->with('term.taxonomy')->whereHas('term.taxonomy', fn ($query) => $query->whereNotNull('route'))->chunkById(500, function ($translations) use (&$paths): void {
            foreach ($translations as $translation) {
                if (($url = $this->site->termUrl($translation)) !== null) {
                    $paths["{$translation->locale}:term:{$translation->id}"] = self::path($url);
                }
            }
        });
        foreach (Collection::query()->whereNotNull('listing_route')->get() as $collection) {
            foreach (Locales::all() as $locale) {
                if (($url = $collection->listingUrl($locale)) !== null) {
                    $paths["{$locale}:listing:{$collection->id}"] = self::path($url);
                }
            }
        }

        return $paths;
    }

    /** A URL of the site as a path from its root. */
    private static function path(string $url): string
    {
        return '/'.ltrim(substr($url, strlen(rtrim(url('/'), '/'))), '/');
    }
}
