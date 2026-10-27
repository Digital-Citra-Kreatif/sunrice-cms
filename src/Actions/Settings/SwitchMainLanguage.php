<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Settings;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Actions\Settings\SaveSettings;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Settings\LocaleSettings;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Site\RoutePattern;
use Sunrice\Cms\Support\Locales;
use Throwable;

/**
 * Makes another content language the main one once content exists
 * (`php artisan sunrice:switch-main-language`), so nothing is lost:
 *
 * - Entries (live and draft), terms, globals, listing pages and taxonomy index pages: the
 *   values all languages share move from the old main language to the
 *   new one, which then holds them (shared fields in translated rows and
 *   blocks too, for entries); the old main language keeps only its text.
 * - Entries and terms without the new main language stop the switch,
 *   unless `$copyMissing`: they get a copy of the old main language.
 * - Menu labels the new main language left empty take the old one's.
 * - Collections' and taxonomies' titles, forms' thank-you messages and
 *   the site's description in the new main language become their own,
 *   and the old ones the old main language's translations.
 * - Addresses: the new main language's lose their prefix (/id/about →
 *   /about) and the old one's get it (/about → /en/about). Redirects are
 *   rewritten to match, and the old main language's pages redirect from
 *   their old addresses, without chains.
 * - Settings → Languages lists the new main language first.
 *
 * @api
 */
final class SwitchMainLanguage
{
    /** @var array{entries: int, copied_entries: int, terms: int, copied_terms: int, globals: int, listings: int, menu_items: int, redirects: int} */
    private array $counts = ['entries' => 0, 'copied_entries' => 0, 'terms' => 0, 'copied_terms' => 0, 'globals' => 0, 'listings' => 0, 'menu_items' => 0, 'redirects' => 0];

    public function __construct(private readonly SaveSettings $settings, private readonly ActivityLog $activity) {}

    /**
     * What a switch would change, without changing anything.
     *
     * @return array{entries: int, missing_entries: int, terms: int, missing_terms: int, globals: int, listings: int}
     *
     * @throws ValidationException when the language can't become the main one
     */
    public function report(string $to): array
    {
        $from = $this->check($to);

        return [
            'entries' => EntryTranslation::query()->where('locale', $from)->count(),
            'missing_entries' => EntryTranslation::query()->where('locale', $from)
                ->whereNotIn('entry_id', EntryTranslation::query()->select('entry_id')->where('locale', $to))->count(),
            'terms' => TermTranslation::query()->where('locale', $from)->count(),
            'missing_terms' => TermTranslation::query()->where('locale', $from)
                ->whereNotIn('term_id', TermTranslation::query()->select('term_id')->where('locale', $to))->count(),
            'globals' => GlobalValue::query()->where('locale', $from)->count(),
            'listings' => CollectionListing::query()->where('locale', $from)->count() + TaxonomyListing::query()->where('locale', $from)->count(),
        ];
    }

    /**
     * @return array{entries: int, copied_entries: int, terms: int, copied_terms: int, globals: int, listings: int, menu_items: int, redirects: int}
     *
     * @throws ValidationException when the language can't become the main one, or content has no translation in it (and not $copyMissing)
     */
    public function handle(string $to, bool $copyMissing = false): array
    {
        $report = $this->report($to);
        $from = Locales::default();
        if (! $copyMissing && ($report['missing_entries'] > 0 || $report['missing_terms'] > 0)) {
            throw ValidationException::withMessages(['locale' => __(':entries entries and :terms terms have no :language translation. Translate them first, or copy the :from ones into it (--copy-missing).', ['entries' => $report['missing_entries'], 'terms' => $report['missing_terms'], 'language' => Locales::name($to), 'from' => $from])]);
        }

        $locales = Locales::names();
        $prefixes = app(LocaleSettings::class)->locales() !== [] ? app(LocaleSettings::class)->prefixes() : [];
        // The addresses' first segments before and after: set ones stay, the default ones follow the main language.
        $this->segments = [Locales::segments(), Locales::segmentsFor(array_keys([$to => $locales[$to]] + $locales), $prefixes)];
        $before = app(LocaleSettings::class)->languages;
        $this->counts = ['entries' => 0, 'copied_entries' => 0, 'terms' => 0, 'copied_terms' => 0, 'globals' => 0, 'listings' => 0, 'menu_items' => 0, 'redirects' => 0];

        try {
            DB::transaction(function () use ($from, $to, $locales, $prefixes): void {
                // First, so what's saved below (search text) reads the new main language.
                $this->settings->handle(app(LocaleSettings::class), ['languages' => LocaleSettings::lines([$to => $locales[$to]] + $locales, $prefixes)]);
                $this->entries($from, $to);
                $this->terms($from, $to);
                $this->counts['globals'] = $this->values(GlobalValue::query()->where('locale', $from)->with('globalSet')->get()->all(), $to,
                    fn (GlobalValue $value): Schema => $value->globalSet->schema(),
                    fn (GlobalValue $value): GlobalValue => GlobalValue::query()->firstOrNew(['global_set_id' => $value->global_set_id, 'locale' => $to], ['data' => []]));
                $this->counts['listings'] = $this->values(CollectionListing::query()->where('locale', $from)->with('collection')->get()->all(), $to,
                    fn (CollectionListing $listing): Schema => $listing->collection->listingSchema(),
                    fn (CollectionListing $listing): CollectionListing => CollectionListing::query()->firstOrNew(['collection_id' => $listing->collection_id, 'locale' => $to], ['data' => []]));
                // Taxonomy index pages count as listing pages.
                $this->counts['listings'] += $this->values(TaxonomyListing::query()->where('locale', $from)->with('taxonomy')->get()->all(), $to,
                    fn (TaxonomyListing $page): Schema => $page->taxonomy->indexSchema(),
                    fn (TaxonomyListing $page): TaxonomyListing => TaxonomyListing::query()->firstOrNew(['taxonomy_id' => $page->taxonomy_id, 'collection_id' => $page->collection_id, 'locale' => $to], ['data' => []]));
                $this->counts['menu_items'] = $this->menus($from, $to);
                $this->texts($from, $to);
                $this->counts['redirects'] = $this->redirects($from, $to);
                $this->activity->record('switched the main language', 'settings', LocaleSettings::key(), 'Languages', ['from' => $from, 'to' => $to]);
            });
        } catch (Throwable $e) {
            // The transaction is undone; so is what the settings cache read meanwhile.
            try {
                app(LocaleSettings::class)->fill(['languages' => $before])->save();
            } catch (Throwable $restoring) {
                // What stopped the switch is what to see, not this.
                report($restoring);
            } finally {
                app()->forgetInstance(LocaleSettings::class);
            }

            throw $e;
        }

        return $this->counts;
    }

    /** @return string the current main language */
    private function check(string $to): string
    {
        if (! Locales::has($to)) {
            throw ValidationException::withMessages(['locale' => __('":code" isn\'t one of the site\'s languages (:languages). Add it in Settings → Languages first.', ['code' => $to, 'languages' => implode(', ', Locales::all())])]);
        }
        if ($to === Locales::default()) {
            throw ValidationException::withMessages(['locale' => __(':name (:code) is the main language already.', ['name' => Locales::name($to), 'code' => $to])]);
        }

        return Locales::default();
    }

    private function entries(string $from, string $to): void
    {
        Entry::query()->withTrashed()->whereHas('translations', fn ($q) => $q->where('locale', $from))->with(['translations', 'collection'])
            ->chunkById(100, function ($entries) use ($from, $to): void {
                foreach ($entries as $entry) {
                    $old = $entry->translation($from);
                    if ($old === null) {
                        continue;
                    }
                    $new = $entry->translation($to);
                    if ($new === null) {
                        $new = $this->copyEntry($entry, $old, $to);
                        $entry->setRelation('translations', $entry->translations->push($new));
                        $this->counts['copied_entries']++;
                    }
                    $schema = $entry->schema();
                    $this->switchEntry($entry, $schema, $old, $new);
                    $this->counts['entries']++;
                }
            });
    }

    /** A copy of the old main translation in the new main language (slugs kept where free). */
    private function copyEntry(Entry $entry, EntryTranslation $old, string $to): EntryTranslation
    {
        $free = function (?string $slug) use ($old, $to): ?string {
            if ($slug === null) {
                return null;
            }
            $candidate = $slug;
            for ($i = 2; EntryInput::taken($candidate, $old->collection_id, $to, null); $i++) {
                $candidate = "{$slug}-{$i}";
            }

            return $candidate;
        };
        $copy = $old->replicate(['search_text']);
        $copy->locale = $to;
        $copy->slug = $free($old->slug);
        $copy->draft_slug = $old->draft_slug === $old->slug && $copy->slug !== null ? $copy->slug : (string) $free($old->draft_slug);
        $copy->version = 1;
        $copy->setRelation('entry', $entry);
        $copy->save();

        return $copy;
    }

    /**
     * The new main translation gets the shared values (it holds them from
     * now on); every other one, the old main one too, keeps its own.
     */
    private function switchEntry(Entry $entry, Schema $schema, EntryTranslation $old, EntryTranslation $new): void
    {
        $oldLive = $old->data;
        $oldDraft = $old->draft_data;
        $new->data = $new->data === null ? null : self::fields($schema->withShared($new->data, $oldLive ?? []));
        $new->draft_data = self::fields($schema->withShared($new->draft_data, $oldDraft));

        $others = $entry->translations->reject(fn (EntryTranslation $t): bool => $t->is($new));
        foreach ($others as $translation) {
            // The values they keep of shared fields, out of sight (EntryTranslation::ownData()), stay; the old main one's are the new one's now.
            $keep = $translation->is($old) ? [null, null] : [$translation->data, $translation->draft_data];
            if ($translation->data !== null) {
                $complete = $schema->withShared($translation->data, $oldLive ?? []);
                // Without a live main version, the others keep their own copies.
                $translation->data = self::fields($new->data === null ? $complete : $schema->withoutShared($complete, $new->data, $keep[0]));
            }
            $translation->draft_data = self::fields($schema->withoutShared($schema->withShared($translation->draft_data, $oldDraft), $new->draft_data, $keep[1]));
        }
        // Saved with the entry and its translations at hand, the new main one first, so search text reads it.
        foreach ([$new, ...$others->all()] as $translation) {
            $translation->setRelation('entry', $entry);
            if ($translation->isDirty()) {
                $translation->version++;
                $translation->save();
            }
        }
    }

    private function terms(string $from, string $to): void
    {
        Term::query()->withTrashed()->whereHas('translations', fn ($q) => $q->where('locale', $from))->with(['translations', 'taxonomy'])
            ->chunkById(200, function ($terms) use ($from, $to): void {
                foreach ($terms as $term) {
                    $old = $term->translations->firstWhere('locale', $from);
                    if ($old === null) {
                        continue;
                    }
                    $new = $term->translations->firstWhere('locale', $to);
                    if ($new === null) {
                        $slug = $old->slug;
                        for ($i = 2; TermTranslation::query()->where('taxonomy_id', $old->taxonomy_id)->where('locale', $to)->where('slug', $slug)->exists(); $i++) {
                            $slug = "{$old->slug}-{$i}";
                        }
                        $new = $old->replicate();
                        $new->forceFill(['locale' => $to, 'slug' => $slug, 'version' => 1]);
                        $this->counts['copied_terms']++;
                    }
                    $this->moveShared($term->taxonomy->schema(), $old, $new);
                    $this->counts['terms']++;
                }
            });
    }

    /**
     * Globals, listing pages or taxonomy index pages: the shared values move to the new main language's row.
     *
     * @template T of GlobalValue|CollectionListing|TaxonomyListing
     *
     * @param  array<int, T>  $rows  the old main language's
     * @param  \Closure(T): Schema  $schema
     * @param  \Closure(T): T  $target
     */
    private function values(array $rows, string $to, \Closure $schema, \Closure $target): int
    {
        foreach ($rows as $row) {
            $this->moveShared($schema($row), $row, $target($row));
        }

        return count($rows);
    }

    /**
     * Shared values from the old main language's row to the new one's
     * (terms, globals, listing pages): the shared fields, and those inside
     * translated groups, rows and blocks (Schema::withShared()).
     */
    private function moveShared(Schema $schema, TermTranslation|GlobalValue|CollectionListing|TaxonomyListing $old, TermTranslation|GlobalValue|CollectionListing|TaxonomyListing $new): void
    {
        $oldData = $old->data ?? [];
        $new->data = self::fields($schema->withShared($new->data ?? [], $oldData));
        $old->data = self::fields($schema->withoutShared($oldData, $new->data));
        foreach ([$new, $old] as $row) {
            if ($row->isDirty() || ! $row->exists) {
                $row->version = $row->exists ? $row->version + 1 : 1;
                $row->save();
            }
        }
    }

    /** Labels the new main language left empty take the old one's, so other languages keep what they showed. */
    private function menus(string $from, string $to): int
    {
        $count = 0;
        foreach (MenuItem::query()->get() as $item) {
            $labels = $item->labels;
            if (($labels[$to] ?? '') === '' && ($labels[$from] ?? '') !== '') {
                $labels[$to] = $labels[$from];
                $item->labels = $labels;
                $item->save();
                $count++;
            }
        }

        return $count;
    }

    /** Titles, thank-you messages and the site's description: the new main language's become the text itself, the old one's its translation. */
    private function texts(string $from, string $to): void
    {
        $site = app(SiteSettings::class);
        $new = null;
        $lines = [];
        foreach (preg_split('/\R/', $site->descriptions) ?: [] as $line) {
            [$code, $text] = array_pad(array_map(trim(...), explode(':', $line, 2)), 2, '');
            if ($code === $to && $text !== '') {
                $new = $text;
            } elseif ($code !== '' && $text !== '') {
                $lines[] = "{$code}: {$text}";
            }
        }
        if ($new !== null) {
            if (trim($site->description) !== '') {
                $lines[] = "{$from}: ".trim($site->description);
            }
            $this->settings->handle($site, ['description' => $new, 'descriptions' => implode("\n", $lines)]);
        }
        foreach ([[Collection::query()->withTrashed(), 'title'], [Taxonomy::query()->withTrashed(), 'title'], [Form::query(), 'message']] as [$query, $attribute]) {
            foreach ($query->whereNotNull('translations')->get() as $record) {
                $translations = is_array($record->translations) ? $record->translations : [];
                $new = $translations[$to][$attribute] ?? null;
                if (! is_string($new) || trim($new) === '') {
                    continue;
                }
                unset($translations[$to][$attribute]);
                $old = $record->getAttribute($attribute);
                if (is_string($old) && trim($old) !== '') {
                    $translations[$from][$attribute] = $old;
                }
                $translations = array_filter($translations, fn (array $texts): bool => $texts !== []);
                $record->forceFill([$attribute => $new, 'translations' => $translations === [] ? null : $translations])->save();
            }
        }
        $this->patterns($from, $to);
    }

    /**
     * URL patterns: the new main language's own become the main ones, and
     * the old main ones the old main language's own, so no address
     * changes but for the prefixes (HasLanguageRoutes).
     */
    private function patterns(string $from, string $to): void
    {
        $this->pivotPatterns($from, $to);
        $changes = [];
        foreach ([Collection::query()->withTrashed(), Taxonomy::query()->withTrashed()] as $query) {
            foreach ($query->whereNotNull('routes')->get() as $record) {
                $main = [];
                foreach ($record::routeAttributes() as $attribute) {
                    // Read as stored: the new main language is the main one already, which has no own patterns.
                    $own = ($record->routes ?? [])[$to][$attribute] ?? null;
                    $old = $record->getAttribute($attribute);
                    if (is_string($own) && $own !== '' && is_string($old) && $old !== '') {
                        $main[$attribute] = [$old, $own];
                    }
                }
                if ($main !== []) {
                    $changes[] = [$record, $main];
                }
            }
        }
        // Listing and term page addresses are unique: out of the way first, so none clash on the way.
        foreach ($changes as [$record, $main]) {
            $record->newQueryWithoutScopes()->whereKey($record->getKey())->toBase()
                ->update(array_map(fn (array $pair): string => '/~switching~'.$record->id, $main));
        }
        foreach ($changes as [$record, $main]) {
            foreach ($main as $attribute => [$old, $own]) {
                $record->setAttribute($attribute, $own);
                $record->setOwnRoute($to, null, $attribute)->setOwnRoute($from, $old, $attribute);
            }
            $record->save();
        }
    }

    /**
     * Taxonomies' term page patterns and index page addresses in
     * collections (CollectionTaxonomy): the new main language's own become
     * the ones set, and the old main language keeps what it had as its
     * own (the default worked out now, before the collections' patterns
     * swap, when none was set).
     */
    private function pivotPatterns(string $from, string $to): void
    {
        foreach (Taxonomy::query()->withTrashed()->with(['collections' => fn ($q) => $q->withTrashed()])->get() as $taxonomy) {
            foreach ($taxonomy->collections as $collection) {
                $pivot = $collection->getRelation('pivot');
                if (! $pivot instanceof CollectionTaxonomy) {
                    continue;
                }
                $changes = [];
                foreach ([['term_route', 'term_routes'], ['index_route', 'index_routes']] as [$main, $own]) {
                    $routes = $pivot->getAttribute($own);
                    $routes = is_array($routes) ? $routes : [];
                    $new = $routes[$to] ?? null;
                    if (! is_string($new) || $new === '') {
                        continue;
                    }
                    $old = $pivot->getAttribute($main);
                    $old = is_string($old) && $old !== '' ? $old
                        : ($main === 'term_route' ? CollectionTaxonomy::defaultPattern($collection, $taxonomy, $from) : CollectionTaxonomy::defaultIndexPath($collection, $taxonomy, $from));
                    unset($routes[$to]);
                    $routes[$from] = $old;
                    $changes[$main] = $new;
                    $changes[$own] = $routes;
                }
                if ($changes !== []) {
                    $taxonomy->collections()->updateExistingPivot($collection->id, $changes);
                }
            }
        }
    }

    /** @var array{0: array<string, string>, 1: array<string, string>} the languages' address segments before and after */
    private array $segments = [[], []];

    /**
     * Rewrites redirects for the new addresses (/id/x → /x, /x → /en/x),
     * then sends the old main language's pages' old addresses to their new
     * ones, unless the new main language's page is there.
     */
    private function redirects(string $from, string $to): int
    {
        $count = 0;
        [$old, $new] = $this->segments;
        $move = function (string $path) use ($old, $new): string {
            if (! str_starts_with($path, '/')) {
                return $path; // a web address elsewhere
            }
            [$locale, $rest] = Locales::split($path, $old);
            $segment = $new[$locale] ?? $locale;

            return $segment === '' ? $rest : '/'.$segment.($rest === '/' ? '' : $rest);
        };
        $taken = [];
        foreach (Redirect::query()->orderBy('id')->get() as $redirect) {
            $fromPath = $move($redirect->from_path);
            if (isset($taken[$fromPath])) {
                $redirect->delete();

                continue;
            }
            $taken[$fromPath] = true;
            $redirect->forceFill(['from_path' => '/~switching~'.$redirect->id.'~'.$fromPath, 'to_url' => $move($redirect->to_url)])->save();
            $count++;
        }
        // Unique paths: written in two steps so none clash on the way.
        foreach (Redirect::query()->where('from_path', 'like', '/~switching~%')->get() as $redirect) {
            $redirect->from_path = (string) preg_replace('#^/~switching~\d+~#', '', $redirect->from_path);
            $redirect->save();
        }

        // The old main language's pages: from its old prefix (none, by default) to its new one.
        if (self::at($old, $from, '/x') === self::at($new, $from, '/x')) {
            return $count;
        }
        $homepage = app(SiteSettings::class)->homepage;
        $pages = EntryTranslation::query()->live()->where('locale', $from)->with('entry.collection', 'entry.translations')->get();
        foreach ($pages as $page) {
            $route = $page->entry->collection->routeIn($from);
            if ($route === null || $page->slug === null || $page->entry_id === $homepage) {
                continue;
            }
            $path = (new RoutePattern($route))->path($page->slug);
            $there = $page->entry->translation($to);
            $thereRoute = $page->entry->collection->routeIn($to);
            // The new main language's page is at the old address now.
            if ($there !== null && $there->isLive() && $there->slug !== null && $thereRoute !== null
                && self::at($new, $to, (new RoutePattern($thereRoute))->path($there->slug)) === self::at($old, $from, $path)) {
                continue;
            }
            $count += $this->moved(self::at($old, $from, $path), self::at($new, $from, $path));
        }
        $terms = TermTranslation::query()->where('locale', $from)->with('term.taxonomy', 'term.translations')->get();
        foreach ($terms as $term) {
            $route = $term->term->taxonomy->routeIn($from);
            $thereRoute = $term->term->taxonomy->routeIn($to);
            if ($route === null || $term->term->trashed()) {
                continue;
            }
            $path = (new RoutePattern($route))->path($term->slug);
            if ($thereRoute !== null && $term->term->translations->contains(fn (TermTranslation $t): bool => $t->locale === $to
                && self::at($new, $to, (new RoutePattern($thereRoute))->path($t->slug)) === self::at($old, $from, $path))) {
                continue;
            }
            $count += $this->moved(self::at($old, $from, $path), self::at($new, $from, $path));
        }

        return $count;
    }

    /**
     * A language's address of a path, by its segment.
     *
     * @param  array<string, string>  $segments
     */
    private static function at(array $segments, string $locale, string $path): string
    {
        $segment = $segments[$locale] ?? $locale;

        return $segment === '' ? $path : "/{$segment}{$path}";
    }

    /** A redirect from an old address to a new one, with redirects to the old one sent straight there. */
    private function moved(string $old, string $new): int
    {
        if (Redirect::query()->where('from_path', $old)->exists()) {
            return 0;
        }
        Redirect::query()->where('to_url', $old)->update(['to_url' => $new]);
        Redirect::query()->where('from_path', $new)->delete();
        Redirect::query()->create(['from_path' => $old, 'to_url' => $new, 'status' => 301]);

        return 1;
    }

    /**
     * Stored fields are keyed by handle.
     *
     * @param  array<mixed>  $data
     * @return array<string, mixed>
     */
    private static function fields(array $data): array
    {
        return array_filter($data, is_string(...), ARRAY_FILTER_USE_KEY);
    }
}
