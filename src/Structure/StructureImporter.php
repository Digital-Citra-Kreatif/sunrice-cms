<?php

declare(strict_types=1);

namespace Sunrice\Cms\Structure;

use Closure;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;
use ReflectionClass;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Admin\Actions\Media\UploadMedia;
use Sunrice\Admin\Actions\Settings\SaveSettings;
use Sunrice\Admin\Media\Media;
use Sunrice\Admin\Resources\Forms\Form as SettingsForm;
use Sunrice\Cms\Actions\Blueprints\SaveBlueprint;
use Sunrice\Cms\Actions\Collections\SaveCollection;
use Sunrice\Cms\Actions\Collections\SaveListing;
use Sunrice\Cms\Actions\Entries\ChangeBlueprint;
use Sunrice\Cms\Actions\Entries\CreateEntry;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\PublishEntry;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Actions\Entries\SaveEntryTerms;
use Sunrice\Cms\Actions\Fieldsets\SaveFieldset;
use Sunrice\Cms\Actions\Globals\SaveGlobals;
use Sunrice\Cms\Actions\Menus\SaveMenu;
use Sunrice\Cms\Actions\Taxonomies\SaveIndexPage;
use Sunrice\Cms\Actions\Terms\SaveTerm;
use Sunrice\Cms\Actions\Terms\SaveTermContent;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\Types\EntriesField;
use Sunrice\Cms\Fields\Types\TermsField;
use Sunrice\Cms\Globals;
use Sunrice\Cms\Menus;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Fieldset;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TaxonomyListing;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Settings\LocaleSettings;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Site\RedirectRule;
use Sunrice\Cms\Site\RouteConflicts;
use Sunrice\Cms\Site\RoutePattern;
use Sunrice\Cms\Site\RoutePatternRule;
use Sunrice\Cms\Site\TemplateRule;
use Sunrice\Cms\Support\Ids;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SafeUrl;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\StructuredData;
use Throwable;

/**
 * Creates or updates, by handle, the structure a file describes (the
 * shape StructureExporter writes): fieldsets, blueprints, collections
 * with their listing pages, taxonomies with their index pages, global sets, forms, menus and
 * redirects, and terms, entries (with their drafts), global values and
 * Settings → Site (only values the site left as the defaults) when it has them,
 * through the same actions and checks as the admin (field definitions by
 * DefinitionValidator).
 *
 * Content is only ever added: an entry or term that exists (by slug in
 * the main language), global values already saved and a menu's links are
 * left alone (a menu that exists gets the file's links it lacks added;
 * with $replaceMenus its links become the file's). An
 * update that would remove fields of a fieldset or blueprint is refused
 * unless $force. Any invalid item stops the import and nothing is saved;
 * a dry run saves nothing either and reports what would happen.
 *
 *     $report = app(StructureImporter::class)->import(json_decode($json, true), dryRun: true);
 *
 * @api
 */
final class StructureImporter
{
    public const SECTIONS = ['fieldsets', 'blueprints', 'collections', 'taxonomies', 'globals', 'forms', 'terms', 'entries', 'menus', 'redirects', 'settings'];

    /**
     * Settings → Site's and SEO's values (SiteSettings) a file carries (`settings.site`): what
     * describes the site. Not `noindex`, which is where the site runs (a
     * staging copy), nor other sections (languages, comments, cache, code),
     * which are the app's own or hold addresses and keys.
     */
    public const SITE_SETTINGS = ['homepage', 'name', 'description', 'descriptions', 'separator', 'appendName', 'image', 'twitter',
        'fallback', 'structuredData', 'publisher', 'logo', 'publisherName', 'publisherType', 'telephone', 'address', 'sameAs'];

    /** A collection's settings in the file. */
    public const COLLECTION = ['handle', 'title', 'blueprint', 'blueprints', 'dated', 'translatable', 'ordered', 'hierarchical', 'route', 'listing_route', 'listing_blueprint', 'per_page', 'comments', 'schema_type', 'template', 'listing_template', 'translations', 'routes', ...self::SEO_FIELDS];

    public const TAXONOMY = ['handle', 'title', 'hierarchical', 'route', 'index_route', 'blueprint', 'index_blueprint', 'template', 'index_template', 'translations', 'routes', ...self::SEO_FIELDS];

    /** Which fields fill in what an entry's or term's SEO card leaves empty. */
    public const SEO_FIELDS = ['seo_title_field', 'seo_description_field', 'seo_image_field'];

    public const GLOBAL_SET = ['handle', 'title', 'blueprint'];

    /** What visitors read in the other languages: {"id": {"title": "Properti"}}. */
    private const TRANSLATIONS = [
        'translations' => ['sometimes', 'nullable', 'array'],
        'translations.*' => ['array'],
        'translations.*.*' => ['nullable', 'string', 'max:1000'],
    ];

    /** Not carried: the patterns this site's languages had before, which redirect here (HasLanguageRoutes). */
    public const NOT_CARRIED = ['previous_routes'];

    public const FORM = ['handle', 'title', 'blueprint', 'notify', 'notify_roles', 'message', 'redirect_url', 'per_minute', 'captcha', 'translations'];

    private const HANDLE = ['required', 'string', 'max:64', 'regex:/^[a-z][a-z0-9_]*$/'];

    private const FIELD_HANDLE = ['nullable', 'string', 'max:64', 'regex:/^[a-z][a-z0-9_]*$/'];

    private const TEMPLATE = ['nullable', 'string', 'max:255', 'regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'];

    private ImportReport $report;

    private bool $force = false;

    /** @var array<string, array<mixed>> the file's blueprints by handle, as written there */
    private array $blueprintsInFile = [];

    private bool $replaceMenus = false;

    private ContentReferences $references;

    /** @var array<string, true> the file's entries not imported yet, by "collection/slug" */
    private array $toCome = [];

    /**
     * @param  array<mixed>  $structure
     * @param  array<string, string>  $mediaToCome  a dry run only: files (name => local path) that count as in the media library, as they'll be uploaded before the real import (content may point at them by name)
     *
     * @throws StructureImportFailed
     * @throws InvalidArgumentException with $mediaToCome on a real import
     */
    public function import(array $structure, bool $dryRun = false, bool $force = false, bool $replaceMenus = false, bool $skipOtherLanguages = false, array $mediaToCome = []): ImportReport
    {
        if ($mediaToCome !== [] && ! $dryRun) {
            throw new InvalidArgumentException('Files to come are for a dry run: upload them before the real import.');
        }
        $unknown = array_diff(array_keys($structure), ['sunrice', 'locales', ...self::SECTIONS]);
        if ($unknown !== []) {
            throw new StructureImportFailed('the file', ['sections' => ['Unknown sections: '.implode(', ', array_map(strval(...), $unknown)).'.']]);
        }
        if (($structure['sunrice'] ?? StructureExporter::VERSION) !== StructureExporter::VERSION) {
            throw new StructureImportFailed('the file', ['sunrice' => ['It was written for another version of the format ('.StructureExporter::VERSION.' is read).']]);
        }
        $this->report = new ImportReport($dryRun);
        $this->references = new ContentReferences;
        // Texts in languages this site doesn't have: stop before anything is saved, or leave them out when asked.
        $others = array_values(array_diff(self::languages($structure), Locales::all()));
        if ($others !== [] && ! $skipOtherLanguages) {
            $names = implode(', ', array_map(fn (string $code): string => Locales::displayName($code)." ({$code})", $others));
            $site = implode(', ', Locales::all());
            throw new StructureImportFailed('the file', ['locales' => [
                "It has texts in {$names}, which ".(count($others) === 1 ? "isn't one" : "aren't")." of this site's languages ({$site}). Add ".(count($others) === 1 ? 'it' : 'them')
                .' in Settings → Languages or set SUNRICE_LOCALES='.implode(',', [...Locales::all(), ...$others]).', then import again (or run with --skip-other-languages to leave those texts out).',
            ]]);
        }
        if ($others !== []) {
            $structure = self::withoutLanguages($structure, $others);
            $this->report->add('languages', implode(', ', $others), ImportReport::UNCHANGED, ['Left out: the texts in '.implode(', ', $others).", which this site doesn't have."]);
        }
        $this->force = $force;
        $this->replaceMenus = $replaceMenus;
        $section = fn (string $name): array => array_values(array_filter(is_array($structure[$name] ?? null) ? $structure[$name] : [], 'is_array'));

        DB::beginTransaction();
        try {
            self::standIns($mediaToCome);
            // Definitions point at collections and taxonomies (entries and terms
            // fields) and those at blueprints: create what's missing empty first.
            $newFieldsets = $this->placeholders(Fieldset::class, $section('fieldsets'));
            $newBlueprints = $this->placeholders(Blueprint::class, $section('blueprints'));
            app(Fieldsets::class)->flush();
            $this->blueprintsInFile = array_column(array_filter($section('blueprints'), fn (array $item): bool => is_string($item['handle'] ?? null)), null, 'handle');
            $this->each('collection', $section('collections'), fn (array $item) => $this->collection($item));
            $this->each('taxonomy', $section('taxonomies'), fn (array $item) => $this->taxonomy($item));
            $this->each('fieldset', $section('fieldsets'), fn (array $item) => $this->definition(Fieldset::class, $item, $newFieldsets));
            $this->each('blueprint', $section('blueprints'), fn (array $item) => $this->definition(Blueprint::class, $item, $newBlueprints));
            $this->each('global set', $section('globals'), fn (array $item) => $this->globalSet($item));
            $this->each('form', $section('forms'), fn (array $item) => $this->form($item));
            $this->each('term', $section('terms'), fn (array $item) => $this->term($item));
            // Entries that link to others in the file come after them; links in a loop are filled in afterwards.
            $entries = self::linkedFirst($section('entries'));
            $this->toCome = [];
            foreach ($entries as $item) {
                $this->toCome[self::text($item['collection'] ?? null).'/'.self::text($item['slug'] ?? null)] = true;
            }
            $created = [];
            $later = [];
            $this->each('entry', $entries, function (array $item) use (&$created, &$later): void {
                $this->entry($item, $created, $later);
            });
            $this->each('entry', $entries, fn (array $item) => $this->entryLinks($item, $created, $later));
            $this->each('entry', $entries, fn (array $item) => $this->entrySettings($item, $created));
            // Listing pages and global values may link to entries: after them.
            $this->each('listing', $section('collections'), fn (array $item) => $this->listings($item));
            $this->each('index page', $section('taxonomies'), fn (array $item) => $this->indexPages($item));
            $this->each('global set', $section('globals'), fn (array $item) => $this->globalValues($item));
            $this->each('menu', $section('menus'), fn (array $item) => $this->menu($item));
            $this->each('redirect', $section('redirects'), fn (array $item) => $this->redirect($item));
            // After the entries and media it points at (the homepage, the logo).
            $settings = is_array($structure['settings'] ?? null) ? $structure['settings'] : [];
            if (array_diff(array_keys($settings), ['site']) !== []) {
                throw new StructureImportFailed('the file', ['settings' => ['Only the site\'s settings (settings.site) are read.']]);
            }
            $this->each('settings', is_array($settings['site'] ?? null) ? [$settings['site']] : [], fn (array $item) => $this->siteSettings($item, $dryRun));
            $dryRun ? DB::rollBack() : DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            $this->forget();

            throw $e;
        }
        $this->forget();

        return $this->report;
    }

    /**
     * A dry run's files to come, in the library as an upload would name
     * and type them (no file on disk), rolled back with the rest.
     *
     * @param  array<string, string>  $files  name => local path
     */
    private static function standIns(array $files): void
    {
        $disk = config('sunrice-admin.media.disk');
        foreach ($files as $name => $path) {
            $file = new UploadedFile($path, $name, null, null, true);
            [$width, $height] = UploadMedia::dimensions($file);
            Media::query()->create([
                'disk' => is_string($disk) && $disk !== '' ? $disk : 'public',
                'path' => 'to-come/'.$name,
                'filename' => $name,
                'mime_type' => UploadMedia::mimeType($file),
                'size' => $file->getSize() ?: 0,
                'width' => $width,
                'height' => $height,
            ]);
        }
    }

    /**
     * Runs an item, turning refusals into StructureImportFailed.
     *
     * @param  list<array<mixed>>  $items
     * @param  Closure(array<mixed>): void  $import
     */
    private function each(string $type, array $items, Closure $import): void
    {
        foreach ($items as $index => $item) {
            try {
                $import($item);
            } catch (ValidationException $e) {
                $label = $item['handle'] ?? $item['slug'] ?? $item['from'] ?? '#'.($index + 1);
                /** @var array<string, list<string>> $errors */
                $errors = $e->errors();
                throw new StructureImportFailed($type.' "'.(is_scalar($label) ? $label : '').'"', $errors, $e);
            }
        }
    }

    /** Caches that may hold what was rolled back or written. */
    private function forget(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();
        app(Fieldsets::class)->flush();
        app(Globals::class)->flush();
        app(Menus::class)->flush();
    }

    /**
     * Creates the missing fieldsets or blueprints without fields.
     *
     * @param  class-string<Fieldset|Blueprint>  $class
     * @param  list<array<mixed>>  $items
     * @return array<string, true> the handles created
     */
    private function placeholders(string $class, array $items): array
    {
        $created = [];
        foreach ($items as $item) {
            $handle = $item['handle'] ?? null;
            if (is_string($handle) && preg_match('/^[a-z][a-z0-9_]*$/', $handle) === 1 && ! $class::query()->where('handle', $handle)->exists()) {
                $class::query()->create(['handle' => $handle, 'title' => is_string($item['title'] ?? null) ? $item['title'] : $handle, 'fields' => []]);
                $created[$handle] = true;
            }
        }

        return $created;
    }

    /**
     * @param  class-string<Fieldset|Blueprint>  $class
     * @param  array<mixed>  $item
     * @param  array<string, true>  $new
     */
    private function definition(string $class, array $item, array $new): void
    {
        $type = $class === Fieldset::class ? 'fieldset' : 'blueprint';
        Validator::make($item, ['handle' => self::HANDLE, 'fields' => ['present', 'array']])->validate();
        /** @var string $handle */
        $handle = $item['handle'];
        $model = $class::query()->where('handle', $handle)->firstOrFail();
        $before = [$model->title, $model->fields];
        $removed = isset($new[$handle]) ? [] : array_values(array_diff(self::paths($model->fields), self::paths(is_array($item['fields']) ? $item['fields'] : [])));
        if ($removed !== [] && ! $this->force) {
            $this->report->add($type, $handle, ImportReport::REFUSED, ['It would remove: '.implode(', ', $removed).'.']);

            return;
        }
        $input = ['title' => $item['title'] ?? null, 'fields' => $item['fields']];
        $saved = $model instanceof Fieldset ? app(SaveFieldset::class)->handle($input, $model) : app(SaveBlueprint::class)->handle($input, $model);
        $this->report->add($type, $handle, match (true) {
            isset($new[$handle]) => ImportReport::CREATED,
            [$saved->title, $saved->fields] == $before => ImportReport::UNCHANGED,
            default => ImportReport::UPDATED,
        }, $removed === [] ? [] : ['Removed: '.implode(', ', $removed).'.']);
    }

    /**
     * Fields' dot paths, through groups and repeaters.
     *
     * @param  array<mixed>  $fields
     * @return list<string>
     */
    private static function paths(array $fields, string $prefix = ''): array
    {
        $paths = [];
        foreach ($fields as $field) {
            if (is_array($field) && is_string($field['handle'] ?? null)) {
                $paths[] = $prefix.$field['handle'];
                array_push($paths, ...self::paths(is_array($field['fields'] ?? null) ? $field['fields'] : [], $prefix.$field['handle'].'.'));
            }
        }

        return $paths;
    }

    /** @param array<mixed> $item */
    private function collection(array $item): void
    {
        $item = self::withoutNulls($item, ['dated', 'translatable', 'ordered', 'hierarchical', 'comments', 'per_page']);
        $item = self::writeHandle($item, ['route', 'listing_route'], $this->handleIsField($item['blueprint'] ?? null));
        $existing = Collection::query()->where('handle', $item['handle'] ?? null)->first();
        $id = $existing->id ?? 0;
        $validated = Validator::make($item, [
            'handle' => self::HANDLE,
            'blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'listing_blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'dated' => ['sometimes', 'boolean'], 'translatable' => ['sometimes', 'boolean'], 'ordered' => ['sometimes', 'boolean'], 'hierarchical' => ['sometimes', 'boolean'], 'comments' => ['sometimes', 'boolean'],
            'route' => ['nullable', 'string', 'max:255', Rule::unique((new Collection)->getTable(), 'route')->ignore($id), new RoutePatternRule],
            'listing_route' => ['nullable', 'string', 'max:255', 'regex:#^(/[a-z0-9\-_]+)+$#', Rule::unique((new Collection)->getTable(), 'listing_route')->ignore($id)],
            ...self::routesRules(['route' => new RoutePatternRule, 'listing_route' => 'regex:#^(/[a-z0-9\-_]+)+$#']),
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'schema_type' => ['nullable', 'string', Rule::in(array_keys(StructuredData::ENTRY_TYPES))],
            'template' => [...self::TEMPLATE, new TemplateRule('cms.article')],
            'listing_template' => [...self::TEMPLATE, new TemplateRule('cms.blog-home')],
            ...array_fill_keys(self::SEO_FIELDS, self::FIELD_HANDLE),
            ...self::TRANSLATIONS,
        ])->validate();
        self::checkRoutes($existing ?? new Collection, $validated, ['route', 'listing_route']);
        $before = $existing?->only(self::COLLECTION);
        $collection = app(SaveCollection::class)->handle(array_intersect_key($item, array_flip(['title', 'blueprint', 'blueprints', 'dated', 'translatable'])) + ($existing === null ? ['handle' => $item['handle']] : []), $existing);
        $collection->forceFill(array_intersect_key($validated, array_flip(['ordered', 'hierarchical', 'route', 'listing_route', 'listing_blueprint', 'per_page', 'comments', 'schema_type', 'template', 'listing_template', 'translations', ...self::SEO_FIELDS])));
        self::fillRoutes($collection, $validated, ['route', 'listing_route']);
        $collection->save();
        $this->report->add('collection', $collection->handle, $this->status($before, $collection->only(self::COLLECTION)));
    }

    /** @param array<mixed> $item */
    private function listings(array $item): void
    {
        $collection = Collection::query()->with('listings')->where('handle', $item['handle'] ?? null)->first();
        $listings = is_array($item['listings'] ?? null) ? $item['listings'] : [];
        if ($collection === null || $listings === []) {
            return;
        }
        $changed = false;
        $notes = [];
        foreach ($listings as $locale => $data) {
            if (! is_string($locale) || ! is_array($data)) {
                continue;
            }
            // Files and links as this site's ids; the SEO card saved as SEO.
            $data = $this->resolved($data, $notes);
            $stored = $collection->listings->firstWhere('locale', $locale);
            if ($stored === null || array_replace($stored->data, $data) != $stored->data) {
                $seo = $data[Seo::KEY] ?? null;
                unset($data[Seo::KEY]);
                app(SaveListing::class)->handle($collection, $data, $locale, seo: is_array($seo) ? $seo : null);
                $changed = true;
            }
        }
        if ($changed) {
            $this->report->add('listing', $collection->handle, ImportReport::UPDATED, $notes);
        }
    }

    /** @param array<mixed> $item */
    private function taxonomy(array $item): void
    {
        $item = self::withoutNulls($item, ['hierarchical']);
        $item = self::writeHandle($item, ['route', 'index_route']);
        $existing = Taxonomy::query()->where('handle', $item['handle'] ?? null)->first();
        $validated = Validator::make($item, [
            'handle' => [...self::HANDLE, ...($existing === null ? [Rule::unique((new Taxonomy)->getTable(), 'handle')] : [])],
            'title' => ['required', 'string', 'max:255'],
            'hierarchical' => ['sometimes', 'boolean'],
            'route' => ['nullable', 'string', 'max:255', Rule::unique((new Taxonomy)->getTable(), 'route')->ignore($existing->id ?? 0), self::routeRule()],
            'index_route' => ['nullable', 'string', 'max:255', 'regex:#^(/[a-z0-9\-_]+)+$#', Rule::unique((new Taxonomy)->getTable(), 'index_route')->ignore($existing->id ?? 0)],
            ...self::routesRules(['route' => self::routeRule(), 'index_route' => 'regex:#^(/[a-z0-9\-_]+)+$#']),
            'blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'index_blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'listings' => ['sometimes', 'nullable', 'array'],
            'template' => [...self::TEMPLATE, new TemplateRule('cms.topic')],
            'index_template' => [...self::TEMPLATE, new TemplateRule('cms.tag-cloud')],
            ...array_fill_keys(self::SEO_FIELDS, self::FIELD_HANDLE),
            'collections' => ['sometimes', 'array'],
            'collections.*' => ['string', Rule::exists((new Collection)->getTable(), 'handle')],
            'collection_pages' => ['sometimes', 'array'],
            'collection_pages.*' => ['array:single,pages,route,routes,index,index_route,index_routes,listings'],
            'collection_pages.*.single' => ['sometimes', 'boolean'],
            'collection_pages.*.pages' => ['sometimes', 'boolean'],
            'collection_pages.*.route' => ['nullable', 'string', 'max:255', self::routeRule()],
            'collection_pages.*.routes' => ['nullable', 'array'],
            'collection_pages.*.routes.*' => ['string', 'max:255', self::routeRule()],
            'collection_pages.*.index' => ['sometimes', 'boolean'],
            'collection_pages.*.index_route' => ['nullable', 'string', 'max:255', 'regex:#^(/[a-z0-9\-_]+)+$#'],
            'collection_pages.*.index_routes' => ['nullable', 'array'],
            'collection_pages.*.index_routes.*' => ['string', 'max:255', 'regex:#^(/[a-z0-9\-_]+)+$#'],
            'collection_pages.*.listings' => ['nullable', 'array'],
            ...self::TRANSLATIONS,
        ])->validate();
        $before = $existing === null ? null : [...$existing->only(self::TAXONOMY), 'collections' => self::collectionPages($existing)];
        $taxonomy = $existing ?? new Taxonomy;
        self::checkRoutes($taxonomy, $validated, ['route', 'index_route']);
        $taxonomy->fill(array_intersect_key($validated, array_flip(array_diff(self::TAXONOMY, ['routes']))));
        self::fillRoutes($taxonomy, $validated, ['route', 'index_route']);
        $taxonomy->save();
        if (array_key_exists('collections', $validated)) {
            $taxonomy->collections()->sync(Collection::query()->whereIn('handle', $validated['collections'])->pluck('id')->all());
        }
        // Each attached collection's term pages; those not named keep theirs.
        if (is_array($validated['collection_pages'] ?? null)) {
            $ids = $taxonomy->collections()->pluck('sunrice_collections.id', 'handle');
            foreach ($validated['collection_pages'] as $handle => $pages) {
                if (isset($ids[$handle]) && is_array($pages)) {
                    $taxonomy->collections()->updateExistingPivot($ids[$handle], [
                        // "One term only" there, when the file says (files written before it leave it as it is).
                        ...(array_key_exists('single', $pages) ? ['single' => (bool) $pages['single']] : []),
                        'term_pages' => (bool) ($pages['pages'] ?? true),
                        'term_route' => is_string($pages['route'] ?? null) && $pages['route'] !== '' ? $pages['route'] : null,
                        'term_routes' => is_array($pages['routes'] ?? null) && $pages['routes'] !== [] ? $pages['routes'] : null,
                        // Its index page, when the file says (files written before index pages leave it as it is).
                        ...(array_key_exists('index', $pages) ? [
                            'index_page' => (bool) $pages['index'],
                            'index_route' => is_string($pages['index_route'] ?? null) && $pages['index_route'] !== '' ? $pages['index_route'] : null,
                            'index_routes' => is_array($pages['index_routes'] ?? null) && $pages['index_routes'] !== [] ? $pages['index_routes'] : null,
                        ] : []),
                    ]);
                }
            }
        }
        // Those just ticked too, at their default URLs.
        if (array_key_exists('collections', $validated) || is_array($validated['collection_pages'] ?? null)) {
            self::checkCollectionPages($taxonomy);
        }
        $this->report->add('taxonomy', $taxonomy->handle, $this->status($before, [...$taxonomy->only(self::TAXONOMY), 'collections' => self::collectionPages($taxonomy)]));
    }

    /**
     * The collections a taxonomy is attached to with their term pages, to
     * tell whether an import changed them.
     *
     * @return array<string, array<string, mixed>>
     */
    private static function collectionPages(Taxonomy $taxonomy): array
    {
        return $taxonomy->collections()->orderBy('handle')->get()
            ->mapWithKeys(fn (Collection $c): array => [$c->handle => $c->getRelation('pivot') instanceof CollectionTaxonomy ? $c->getRelation('pivot')->only(CollectionTaxonomy::COLUMNS) : []])
            ->all();
    }

    /**
     * No collection's term pages or index page of a taxonomy may have an
     * address something else has, in any language (RouteConflicts).
     */
    private static function checkCollectionPages(Taxonomy $taxonomy): void
    {
        $errors = [];
        foreach ($taxonomy->collections()->get() as $collection) {
            $pivot = $collection->getRelation('pivot');
            if ($pivot instanceof CollectionTaxonomy && ($clash = RouteConflicts::forAttachment($collection, $taxonomy, $pivot)) !== null) {
                $errors["collection_pages.{$collection->handle}.".($clash['page'] === 'term' ? 'route' : 'index_route')] = $clash['message'] ?? "{$clash['title']} has the address {$clash['url']} in {$clash['locale']} already.";
            }
        }
        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
        }
    }

    /**
     * A taxonomy's index pages' fields: the shared one's (`listings`) and
     * each collection's (`collection_pages.{handle}.listings`), per
     * language, for the pages that are on.
     *
     * @param  array<mixed>  $item
     */
    private function indexPages(array $item): void
    {
        $taxonomy = Taxonomy::query()->with('listings')->where('handle', $item['handle'] ?? null)->first();
        if ($taxonomy === null) {
            return;
        }
        $pages = [[null, is_array($item['listings'] ?? null) ? $item['listings'] : []]];
        foreach (is_array($item['collection_pages'] ?? null) ? $item['collection_pages'] : [] as $handle => $own) {
            if (is_string($handle) && is_array($own) && is_array($own['listings'] ?? null) && ($collection = Collection::query()->where('handle', $handle)->first()) !== null) {
                $pages[] = [$collection, $own['listings']];
            }
        }
        foreach ($pages as [$collection, $values]) {
            if ($values === [] || ! $taxonomy->hasIndexPage($collection)) {
                continue;
            }
            $changed = false;
            $notes = [];
            foreach ($values as $locale => $data) {
                if (! is_string($locale) || ! is_array($data)) {
                    continue;
                }
                // Files and links as this site's ids; the SEO card saved as SEO.
                $data = $this->resolved($data, $notes);
                $stored = $taxonomy->listings->first(fn (TaxonomyListing $page): bool => $page->locale === $locale && $page->collection_id === $collection?->id);
                if ($stored === null || array_replace($stored->data, $data) != $stored->data) {
                    $seo = $data[Seo::KEY] ?? null;
                    unset($data[Seo::KEY]);
                    app(SaveIndexPage::class)->handle($taxonomy, $collection, $data, $locale, seo: is_array($seo) ? $seo : null);
                    $changed = true;
                }
            }
            if ($changed) {
                $this->report->add('index page', $taxonomy->handle.($collection === null ? '' : ' in '.$collection->handle), ImportReport::UPDATED, $notes);
            }
        }
    }

    /** @param array<mixed> $item */
    private function globalSet(array $item): void
    {
        $existing = GlobalSet::query()->where('handle', $item['handle'] ?? null)->first();
        $validated = Validator::make($item, [
            'handle' => self::HANDLE,
            'title' => ['required', 'string', 'max:255'],
            'blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'values' => ['sometimes', 'array'],
        ])->validate();
        $before = $existing?->only(self::GLOBAL_SET);
        $set = $existing ?? new GlobalSet;
        $set->fill(array_intersect_key($validated, array_flip(self::GLOBAL_SET)))->save();
        $this->report->add('global set', $set->handle, $this->status($before, $set->only(self::GLOBAL_SET)));
    }

    /**
     * A global set's values, after the entries they may link to. Values
     * are content: only where none were saved yet.
     *
     * @param  array<mixed>  $item
     */
    private function globalValues(array $item): void
    {
        $set = GlobalSet::query()->where('handle', $item['handle'] ?? null)->first();
        if ($set === null) {
            return;
        }
        $notes = [];
        foreach (is_array($item['values'] ?? null) ? $item['values'] : [] as $locale => $data) {
            if (is_string($locale) && is_array($data) && ! $set->values()->where('locale', $locale)->exists()) {
                app(SaveGlobals::class)->handle($set, $this->resolved($data, $notes), $locale);
                $notes[] = "Values in {$locale}.";
            }
        }
        if ($notes !== []) {
            $this->report->add('global values', $set->handle, ImportReport::UPDATED, $notes);
        }
    }

    /**
     * Content values with the file's references made this site's ids; those
     * not found here are left empty and named in $notes.
     *
     * @param  array<mixed>  $data
     * @param  list<string>  $notes
     * @param  list<string>|null  $later  entries still to come in this file (filled in after them); without, they count as not found
     * @return array<mixed>
     */
    private function resolved(array $data, array &$notes, ?array &$later = null): array
    {
        $missing = [];
        $toCome = [];
        $data = $this->references->resolve($data, $missing, $toCome, $later === null ? null : fn (string $key): bool => isset($this->toCome[$key]));
        if ($missing !== []) {
            $notes[] = 'Left empty (not on this site): '.implode(', ', array_values(array_unique($missing))).'.';
        }
        if ($later !== null) {
            array_push($later, ...$toCome);
        }

        return $data;
    }

    /**
     * Settings → Site from the file: each value the site still has as the
     * default is set; those the site set itself are kept (and noted).
     * Checked as the admin checks them.
     *
     * @param  array<mixed>  $item
     */
    private function siteSettings(array $item, bool $dryRun): void
    {
        $settings = new SiteSettings;
        $current = $settings->toArray();
        $defaults = (new ReflectionClass(SiteSettings::class))->getDefaultProperties();
        $notes = [];
        $values = $this->resolved(array_intersect_key($item, array_flip(self::SITE_SETTINGS)), $notes);
        // Settings → SEO's, as SaveSeoSettings checks them (its structured data form too), and Settings → Site's form.
        $rules = [
            'separator' => ['nullable', 'string', 'max:5'], 'appendName' => ['boolean'], 'fallback' => ['boolean'],
            'twitter' => ['nullable', 'string', 'max:16', 'regex:/^(@?[A-Za-z0-9_]{1,15})?$/'], 'image' => ['nullable', 'integer', Rule::exists('sunrice_media', 'id')],
        ];
        foreach ([...SiteSettings::form(new SettingsForm)->fields('edit'), ...SiteSettings::structuredDataForm(new SettingsForm)->fields('edit')] as $field) {
            $rules[$field->name] = $field->validationRules(null);
        }
        $validated = Validator::make($values, array_intersect_key($rules, $values))->validate();
        $set = [];
        $kept = [];
        foreach ($validated as $name => $value) {
            $name = (string) $name;
            $value = $value ?? $defaults[$name] ?? null;
            if ($value === ($current[$name] ?? null)) {
                continue;
            }
            if (($current[$name] ?? null) !== ($defaults[$name] ?? null)) {
                $kept[] = $name;

                continue;
            }
            $set[$name] = $value;
        }
        if ($kept !== []) {
            $notes[] = 'Keeps this site\'s own: '.implode(', ', $kept).'.';
        }
        if ($set !== [] && ! $dryRun) {
            app(SaveSettings::class)->handle($settings, $set);
        }
        $this->report->add('settings', 'site', $set === [] ? ImportReport::UNCHANGED : ImportReport::UPDATED, array_values(array_unique($notes)));
    }

    /** @param array<mixed> $item */
    private function form(array $item): void
    {
        $item = self::withoutNulls($item, ['captcha']);
        $existing = Form::query()->where('handle', $item['handle'] ?? null)->first();
        $validated = Validator::make($item, [
            'handle' => self::HANDLE,
            'title' => ['required', 'string', 'max:255'],
            'blueprint' => ['required', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'notify' => ['nullable', 'array', 'max:10'],
            'notify.*' => ['email'],
            'notify_roles' => ['nullable', 'array', 'max:50'],
            'notify_roles.*' => ['string', 'max:255'],
            'message' => ['nullable', 'string', 'max:1000'],
            'redirect_url' => ['nullable', 'string', 'max:2000', SafeUrl::rule()],
            'per_minute' => ['nullable', 'integer', 'min:1', 'max:1000'],
            'captcha' => ['sometimes', 'boolean'],
            ...self::TRANSLATIONS,
        ])->validate();
        $before = $existing?->only(self::FORM);
        $form = $existing ?? new Form;
        $form->forceFill(array_intersect_key($validated, array_flip(self::FORM)))->save();
        $this->report->add('form', $form->handle, $this->status($before, $form->only(self::FORM)));
    }

    /** @param array<mixed> $item */
    private function term(array $item): void
    {
        $validated = Validator::make($item, [
            'taxonomy' => ['required', 'string'], 'slug' => ['required', 'string'], 'parent' => ['nullable', 'string'],
            'template' => self::TEMPLATE, 'translations' => ['required', 'array'],
        ])->validate();
        $handle = self::text($validated['taxonomy']);
        $slug = self::text($validated['slug']);
        $taxonomy = Taxonomy::query()->where('handle', $handle)->first()
            ?? throw ValidationException::withMessages(['taxonomy' => "There is no taxonomy \"{$handle}\"."]);
        $label = $taxonomy->handle.'/'.$slug;
        if (self::termId($taxonomy, $slug) !== null) {
            $this->report->add('term', $label, ImportReport::UNCHANGED);

            return;
        }
        $parentSlug = is_string($validated['parent'] ?? null) ? $validated['parent'] : null;
        $parent = $parentSlug === null ? null : self::termId($taxonomy, $parentSlug)
            ?? throw ValidationException::withMessages(['parent' => "Its parent \"{$parentSlug}\" comes later or is missing."]);
        $term = null;
        $notes = [];
        foreach (self::mainFirst(is_array($validated['translations']) ? $validated['translations'] : []) as $locale => $translation) {
            $term = app(SaveTerm::class)->handle($taxonomy, [
                'title' => $translation['title'] ?? null, 'slug' => $translation['slug'] ?? null, 'locale' => $locale,
                ...($term === null ? ['parent_id' => $parent] : []),
            ], $term);
            $data = $this->resolved(is_array($translation['data'] ?? null) ? $translation['data'] : [], $notes);
            if ($data !== [] || ($term->wasRecentlyCreated && ($validated['template'] ?? null) !== null)) {
                app(SaveTermContent::class)->handle($term, [...self::content($data), 'template' => $validated['template'] ?? null], $locale);
            }
        }
        $this->report->add('term', $label, ImportReport::CREATED, array_values(array_unique($notes)));
    }

    /**
     * @param  array<mixed>  $item
     * @param  array<string, Entry>  $created  by "collection/slug"
     * @param  array<string, true>  $later  entries whose links to others in the file are filled in afterwards
     */
    private function entry(array $item, array &$created, array &$later): void
    {
        $validated = Validator::make($item, [
            'collection' => ['required', 'string'], 'slug' => ['required', 'string'], 'translations' => ['required', 'array'],
            'terms' => ['sometimes', 'nullable', 'array'], 'draft_terms' => ['sometimes', 'nullable', 'array'],
        ])->validate();
        $handle = self::text($validated['collection']);
        $slug = self::text($validated['slug']);
        $collection = Collection::query()->where('handle', $handle)->first()
            ?? throw ValidationException::withMessages(['collection' => "There is no collection \"{$handle}\"."]);
        $label = $collection->handle.'/'.$slug;
        if (self::entryId($collection, $slug) !== null) {
            $this->report->add('entry', $label, ImportReport::UNCHANGED);

            return;
        }
        unset($this->toCome[$label]);
        $entry = null;
        $publish = [];
        $drafts = [];
        $notes = [];
        $toCome = [];
        foreach (self::mainFirst(is_array($validated['translations']) ? $validated['translations'] : []) as $locale => $translation) {
            $data = $this->resolved(is_array($translation['data'] ?? null) ? $translation['data'] : [], $notes, $toCome);
            $input = ['title' => $translation['title'] ?? null, 'slug' => $translation['slug'] ?? null, ...self::content($data)];
            if ($entry === null) {
                $saved = app(CreateEntry::class)->handle($collection, $input + ['locale' => $locale]);
                $entry = $saved->entry;
                // Its own blueprint, if the collection offers it: then its fields are written.
                $blueprint = is_string($item['blueprint'] ?? null) ? $item['blueprint'] : null;
                if ($blueprint !== null && $blueprint !== $collection->blueprint && in_array($blueprint, $collection->allowedBlueprints(), true)) {
                    app(ChangeBlueprint::class)->handle($entry, $blueprint);
                    $saved = app(SaveDraft::class)->handle($saved->fresh() ?? $saved, $input);
                }
                $entry->setRelation('collection', $collection);
                // Its terms (taxonomy => slugs); files written before entries had their own: those of its terms fields.
                $terms = is_array($validated['terms'] ?? null) ? $validated['terms'] : (array_key_exists('draft_terms', $validated) ? null : self::termsFromFields($entry, $data));
                if ($terms !== null && $terms !== []) {
                    app(SaveEntryTerms::class)->handle($entry, $terms);
                }
            } else {
                $saved = app(SaveDraft::class)->handle(app(CreateTranslation::class)->handle($entry, $locale), $input);
            }
            if (($translation['published'] ?? false) === true) {
                $publish[] = [$saved, self::publishDate($translation)];
                if (is_array($translation['draft'] ?? null)) {
                    $drafts[] = [$saved, $translation['draft']];
                }
            }
        }
        foreach ($publish as [$translation, $at]) {
            app(PublishEntry::class)->handle($translation->fresh() ?? $translation, $at);
        }
        // Changes not published yet stay a draft, terms too.
        foreach ($drafts as [$translation, $draft]) {
            $this->draft($translation->fresh() ?? $translation, $draft, $notes, $toCome);
        }
        if ($entry !== null && is_array($validated['draft_terms'] ?? null)) {
            $entry->refresh();
            $entry->setRelation('collection', $collection);
            $none = [];
            foreach (SaveEntryTerms::attached($entry) as $taxonomy) {
                $none[$taxonomy->handle] = [];
            }
            app(SaveEntryTerms::class)->handle($entry, array_merge($none, $validated['draft_terms']));
        }
        if ($entry !== null) {
            $created[$label] = $entry;
            if ($toCome !== []) {
                $later[$label] = true;
            }
        }
        $this->report->add('entry', $label, ImportReport::CREATED, array_values(array_unique($notes)));
    }

    /**
     * An entry's terms in a file written before entries had their own: the
     * values of the top-level terms fields of its main translation for the
     * taxonomies attached to its collection, by taxonomy handle (ids).
     *
     * @param  array<mixed>  $data  the translation's fields, references resolved
     * @return array<string, list<int>>
     */
    private static function termsFromFields(Entry $entry, array $data): array
    {
        $attached = array_map(fn (Taxonomy $taxonomy): string => $taxonomy->handle, array_values(SaveEntryTerms::attached($entry)->all()));
        $terms = [];
        foreach ($entry->schema()->fields() as $field) {
            $taxonomy = $field->type === TermsField::TYPE ? $field->configString('taxonomy') : null;
            if ($taxonomy !== null && in_array($taxonomy, $attached, true)) {
                $value = $data[$field->handle] ?? null;
                $terms[$taxonomy] = [...$terms[$taxonomy] ?? [], ...Ids::of(is_array($value) ? $value : [$value])];
            }
        }

        return $terms;
    }

    /**
     * Fills in the links of an entry just created to entries the file had
     * after it (a loop: two entries that link to each other).
     *
     * @param  array<mixed>  $item
     * @param  array<string, Entry>  $created
     * @param  array<string, true>  $later
     */
    private function entryLinks(array $item, array $created, array $later): void
    {
        $label = self::text($item['collection'] ?? null).'/'.self::text($item['slug'] ?? null);
        $entry = $created[$label] ?? null;
        if ($entry === null || ! isset($later[$label])) {
            return;
        }
        $notes = [];
        // Its terms not published yet stay so, though it's published again.
        $pending = $entry->fresh()?->draft_terms;
        foreach (is_array($item['translations'] ?? null) ? $item['translations'] : [] as $locale => $translation) {
            $saved = is_string($locale) ? $entry->translation($locale) : null;
            if ($saved === null || ! is_array($translation) || ! is_array($translation['data'] ?? null)) {
                continue;
            }
            $saved = app(SaveDraft::class)->handle($saved, ['title' => $translation['title'] ?? null, 'slug' => $translation['slug'] ?? null, ...self::content($this->resolved($translation['data'], $notes))]);
            if (($translation['published'] ?? false) === true) {
                $saved = app(PublishEntry::class)->handle($saved->fresh() ?? $saved, self::publishDate($translation));
                if (is_array($translation['draft'] ?? null)) {
                    $this->draft($saved->fresh() ?? $saved, $translation['draft'], $notes);
                }
            }
        }
        $entry->unsetRelation('translations');
        if ($pending !== null) {
            $entry->refresh();
            app(SaveEntryTerms::class)->setDraft($entry, $pending);
        }
    }

    /**
     * Saves a published translation's changes not published yet (the file's
     * `draft`: title, slug, data) as its draft.
     *
     * @param  array<mixed>  $draft
     * @param  list<string>  $notes
     * @param  list<string>|null  $later
     */
    private function draft(EntryTranslation $translation, array $draft, array &$notes, ?array &$later = null): void
    {
        $data = $this->resolved(is_array($draft['data'] ?? null) ? $draft['data'] : [], $notes, $later);
        app(SaveDraft::class)->handle($translation, ['title' => $draft['title'] ?? $translation->draft_title, 'slug' => $draft['slug'] ?? $translation->draft_slug, ...self::content($data)]);
    }

    /**
     * A translation's `published_at` in the file (a post's date, or the one it's scheduled for); null: published now.
     *
     * @param  array<mixed>  $translation
     *
     * @throws ValidationException when it isn't a date
     */
    private static function publishDate(array $translation): ?Carbon
    {
        $at = $translation['published_at'] ?? null;
        if ($at === null || $at === '') {
            return null;
        }
        try {
            return is_string($at) ? Carbon::parse($at) : throw new InvalidArgumentException;
        } catch (Throwable) {
            throw ValidationException::withMessages(['published_at' => 'published_at must be a date, like 2026-10-21T09:00:00+07:00.']);
        }
    }

    /**
     * Entries in an order where those linked to come first, where they can
     * (links in a loop keep the file's order and are filled in afterwards).
     *
     * @param  list<array<mixed>>  $items
     * @return list<array<mixed>>
     */
    private static function linkedFirst(array $items): array
    {
        $keys = [];
        foreach ($items as $index => $item) {
            $keys[self::text($item['collection'] ?? null).'/'.self::text($item['slug'] ?? null)] = $index;
        }
        $links = [];
        foreach ($items as $index => $item) {
            $links[$index] = array_values(array_filter(array_map(fn (string $key): ?int => $keys[$key] ?? null, ContentReferences::entryKeys(is_array($item['translations'] ?? null) ? $item['translations'] : [])), fn (?int $to): bool => $to !== null && $to !== $index));
        }
        $order = [];
        $placed = [];
        for ($pass = 0; count($order) < count($items) && $pass <= count($items); $pass++) {
            foreach ($items as $index => $item) {
                if (! isset($placed[$index]) && array_diff($links[$index], array_keys($placed)) === []) {
                    $placed[$index] = true;
                    $order[] = $item;
                }
            }
        }
        foreach ($items as $index => $item) {
            if (! isset($placed[$index])) {
                $order[] = $item;
            }
        }

        return $order;
    }

    /**
     * The parent and template of the entries just created.
     *
     * @param  array<mixed>  $item
     * @param  array<string, Entry>  $created
     */
    private function entrySettings(array $item, array $created): void
    {
        $entry = $created[self::text($item['collection'] ?? null).'/'.self::text($item['slug'] ?? null)] ?? null;
        if ($entry === null || (($item['parent'] ?? null) === null && ($item['template'] ?? null) === null)) {
            return;
        }
        $parent = is_string($item['parent'] ?? null) ? self::entryId($entry->collection, $item['parent']) : null;
        app(SaveEntrySettings::class)->handle($entry, ['parent_id' => $parent, 'template' => $item['template'] ?? null]);
    }

    /**
     * A menu that isn't there is created with the file's links. A menu's
     * links are content: those of a menu that exists are kept, and the
     * file's links it doesn't have yet are added among them (next to the
     * ones they follow in the file); with $replaceMenus the menu's links
     * become the file's instead. The notes say which links are added or
     * removed, in a dry run too.
     *
     * @param  array<mixed>  $item
     */
    private function menu(array $item): void
    {
        $validated = Validator::make($item, ['handle' => self::HANDLE, 'title' => ['required', 'string', 'max:255'], 'items' => ['sometimes', 'array']])->validate();
        $existing = Menu::query()->where('handle', $validated['handle'])->first();
        $notes = [];
        $items = self::normalizeItems($this->menuItems(is_array($item['items'] ?? null) ? $item['items'] : [], $notes));
        $before = $existing === null ? null : [$existing->title, self::tree($existing->items()->orderBy('sort_order')->get()->all(), null)];
        $menu = $existing ?? new Menu;
        $menu->fill(['handle' => $validated['handle'], 'title' => $validated['title']])->save();
        if ($before === null) {
            $save = $items;
        } elseif ($this->replaceMenus) {
            $save = $items;
            $kept = array_count_values(array_map(self::linkKey(...), self::flatten($items)));
            foreach (self::flatten($before[1]) as $link) {
                $key = self::linkKey($link);
                if (($kept[$key] ?? 0) > 0) {
                    $kept[$key]--;
                } else {
                    $notes[] = 'Removes the link to '.self::describeLink($link).'.';
                }
            }
            $added = [];
            self::mergeLinks($before[1], $items, $added);
            foreach ($added as $link) {
                $notes[] = 'Adds a link to '.self::describeLink($link).'.';
            }
        } else {
            $added = [];
            $save = self::mergeLinks($before[1], $items, $added);
            foreach ($added as $link) {
                $notes[] = 'Adds a link to '.self::describeLink($link).'.';
            }
        }
        if ($before === null || $before[1] != $save) {
            app(SaveMenu::class)->handle($menu, $save);
        }
        $this->report->add('menu', $menu->handle, $this->status($before, [$menu->title, self::tree($menu->items()->orderBy('sort_order')->get()->all(), null)]), $notes);
    }

    /**
     * The menu's links with the file's added: a link the menu has (same
     * target) is kept as it is, with the file's links under it merged into
     * its own; one it hasn't is put after the link it follows in the file.
     *
     * @param  list<array<mixed>>  $links
     * @param  list<array<mixed>>  $incoming
     * @param  list<array<mixed>>  $added  the links added, children included
     * @return list<array<mixed>>
     */
    private static function mergeLinks(array $links, array $incoming, array &$added): array
    {
        $used = [];
        $after = -1;
        foreach ($incoming as $link) {
            $key = self::linkKey($link);
            $match = null;
            foreach ($links as $index => $own) {
                if (! isset($used[$index]) && self::linkKey($own) === $key) {
                    $match = $index;
                    break;
                }
            }
            if ($match !== null) {
                $links[$match]['children'] = self::mergeLinks(self::children($links[$match]), self::children($link), $added);
                $used[$match] = true;
                $after = $match;

                continue;
            }
            $at = $after + 1;
            array_splice($links, $at, 0, [$link]);
            $shifted = [];
            foreach (array_keys($used) as $index) {
                $shifted[$index >= $at ? $index + 1 : $index] = true;
            }
            $used = $shifted + [$at => true];
            $after = $at;
            foreach (self::flatten([$link]) as $new) {
                $added[] = $new;
            }
        }

        return $links;
    }

    /**
     * What a link points at, to tell links apart: the same entry, term,
     * listing page (with the same filters) or address.
     *
     * @param  array<mixed>  $link
     */
    private static function linkKey(array $link): string
    {
        $id = fn (string $key): string => is_numeric($link[$key] ?? null) ? (string) $link[$key] : '';

        return match (true) {
            $id('entry_id') !== '' => 'entry:'.$id('entry_id'),
            $id('term_id') !== '' => 'term:'.$id('term_id').'/'.$id('collection_id'),
            $id('taxonomy_id') !== '' => 'index:'.$id('taxonomy_id').'/'.$id('collection_id'),
            $id('collection_id') !== '' => 'collection:'.$id('collection_id').'?'.self::text($link['query'] ?? null),
            default => 'url:'.trim(self::text($link['url'] ?? null)),
        };
    }

    /**
     * @param  array<mixed>  $link
     * @return list<array<mixed>>
     */
    private static function children(array $link): array
    {
        return is_array($link['children'] ?? null) ? array_values(array_filter($link['children'], 'is_array')) : [];
    }

    /**
     * The links and those under them, in order.
     *
     * @param  list<array<mixed>>  $links
     * @return list<array<mixed>>
     */
    private static function flatten(array $links): array
    {
        $flat = [];
        foreach ($links as $link) {
            $flat[] = $link;
            foreach (self::flatten(self::children($link)) as $child) {
                $flat[] = $child;
            }
        }

        return $flat;
    }

    /**
     * A link as the file names it: "pages/about", "topics/news", a
     * collection's handle or the address.
     *
     * @param  array<mixed>  $link
     */
    private static function describeLink(array $link): string
    {
        $described = match (true) {
            is_numeric($link['entry_id'] ?? null) => ($entry = Entry::withTrashed()->with('collection')->find((int) $link['entry_id'])) === null ? null : $entry->collection->handle.'/'.($entry->translation(Locales::default())->draft_slug ?? $entry->id),
            is_numeric($link['term_id'] ?? null) => ($term = Term::withTrashed()->with('taxonomy')->find((int) $link['term_id'])) === null ? null : $term->taxonomy->handle.'/'.self::text($term->translations()->where('locale', Locales::default())->value('slug') ?? (string) $term->id),
            is_numeric($link['taxonomy_id'] ?? null) => ($handle = Taxonomy::withTrashed()->whereKey((int) $link['taxonomy_id'])->value('handle')) === null ? null
                : 'the index of '.self::text($handle).(is_numeric($link['collection_id'] ?? null) ? ' in '.self::text(Collection::withTrashed()->whereKey((int) $link['collection_id'])->value('handle')) : ''),
            is_numeric($link['collection_id'] ?? null) => Collection::withTrashed()->whereKey((int) $link['collection_id'])->value('handle'),
            default => trim(self::text($link['url'] ?? null)),
        };

        return is_string($described) && $described !== '' ? $described : '?';
    }

    /**
     * Menu items from the file, targets found by handle and slug; links to
     * what isn't there are left out (and noted).
     *
     * @param  array<mixed>  $items
     * @param  list<string>  $notes
     * @return list<array<string, mixed>>
     */
    private function menuItems(array $items, array &$notes): array
    {
        $resolved = [];
        foreach ($items as $item) {
            if (! is_array($item)) {
                continue;
            }
            $to = self::text($item['entry'] ?? $item['term'] ?? $item['index'] ?? $item['collection'] ?? null);
            [$parent, $slug] = array_pad(explode('/', $to, 2), 2, '');
            // A term's page or a taxonomy's index page in a collection names it too.
            $in = is_string($item['collection'] ?? null) && (is_string($item['term'] ?? null) || is_string($item['index'] ?? null))
                ? ['collection_id' => Collection::query()->where('handle', $item['collection'])->value('id')] : [];
            $target = match (true) {
                is_string($item['entry'] ?? null) => ['entry_id' => ($c = Collection::query()->where('handle', $parent)->first()) === null ? null : self::entryId($c, $slug)],
                is_string($item['term'] ?? null) => ['term_id' => ($t = Taxonomy::query()->where('handle', $parent)->first()) === null ? null : self::termId($t, $slug), ...$in],
                is_string($item['index'] ?? null) => ['taxonomy_id' => Taxonomy::query()->where('handle', $to)->value('id'), ...$in],
                is_string($item['collection'] ?? null) => ['collection_id' => Collection::query()->where('handle', $to)->value('id')],
                default => ['url' => $item['url'] ?? null],
            };
            if (in_array(null, $target, true) && ! array_key_exists('url', $target)) {
                $notes[] = "Left out a link to {$to}, which isn't there.";

                continue;
            }
            $resolved[] = [...$target, 'labels' => is_array($item['labels'] ?? null) ? $item['labels'] : [], 'new_tab' => ($item['new_tab'] ?? false) === true,
                'query' => isset($target['collection_id']) && $in === [] ? SaveMenu::queryString($item['query'] ?? null) : null,
                'children' => $this->menuItems(is_array($item['children'] ?? null) ? $item['children'] : [], $notes)];
        }

        return $resolved;
    }

    /**
     * Stored items as SaveMenu takes them, to compare.
     *
     * @param  array<int, MenuItem>  $items
     * @return list<array<string, mixed>>
     */
    private static function tree(array $items, ?int $parent): array
    {
        $tree = [];
        foreach ($items as $item) {
            if ($item->parent_id === $parent) {
                $tree[] = ['entry_id' => $item->entry_id, 'term_id' => $item->term_id, 'taxonomy_id' => $item->taxonomy_id, 'collection_id' => $item->collection_id, 'url' => $item->url,
                    'labels' => $item->labels, 'new_tab' => $item->new_tab, 'query' => $item->query_string, 'children' => self::tree($items, $item->id)];
            }
        }

        return $tree;
    }

    /**
     * @param  list<array<mixed>>  $items
     * @return list<array<string, mixed>>
     */
    private static function normalizeItems(array $items): array
    {
        return array_map(fn (array $item): array => [
            'entry_id' => $item['entry_id'] ?? null, 'term_id' => $item['term_id'] ?? null, 'taxonomy_id' => $item['taxonomy_id'] ?? null, 'collection_id' => $item['collection_id'] ?? null,
            'url' => trim(self::text($item['url'] ?? null)) === '' ? null : trim(self::text($item['url'] ?? null)),
            'labels' => array_filter(array_map(fn (mixed $l): string => trim(self::text($l)), is_array($item['labels'] ?? null) ? $item['labels'] : []), fn (string $l): bool => $l !== ''),
            'new_tab' => ($item['new_tab'] ?? false) === true,
            'query' => SaveMenu::queryString($item['query'] ?? null),
            'children' => self::normalizeItems(is_array($item['children'] ?? null) ? array_values(array_filter($item['children'], 'is_array')) : []),
        ], $items);
    }

    /** @param array<mixed> $item */
    private function redirect(array $item): void
    {
        $validated = Validator::make($item, [
            'from' => ['required', 'string', 'max:512', new RedirectRule],
            'to' => ['required', 'string', 'max:2048', SafeUrl::rule(), new RedirectRule('from')],
            'status' => ['sometimes', 'integer', Rule::in([301, 302])],
            'every_language' => ['sometimes', 'boolean'],
        ])->validate();
        $existing = Redirect::query()->where('from_path', $validated['from'])->first();
        $before = $existing?->only(['to_url', 'status', 'every_language']);
        $redirect = $existing ?? new Redirect(['from_path' => $validated['from']]);
        $redirect->fill(['to_url' => $validated['to'], 'status' => $validated['status'] ?? 301, 'every_language' => (bool) ($validated['every_language'] ?? false)])->save();
        $this->report->add('redirect', $redirect->from_path, $this->status($before, $redirect->only(['to_url', 'status', 'every_language'])));
    }

    /**
     * @param  array<mixed>|null  $before  null: it was created
     * @param  array<mixed>  $after
     */
    private function status(?array $before, array $after): string
    {
        return match (true) {
            $before === null => ImportReport::CREATED,
            $before == $after => ImportReport::UNCHANGED,
            default => ImportReport::UPDATED,
        };
    }

    /**
     * Translations keyed by language, the main one first; others the site doesn't have are skipped.
     *
     * @param  array<mixed>  $translations
     * @return array<string, array<mixed>>
     */
    private static function mainFirst(array $translations): array
    {
        $sorted = [];
        foreach ([Locales::default(), ...Locales::all()] as $locale) {
            if (! isset($sorted[$locale]) && is_array($translations[$locale] ?? null)) {
                $sorted[$locale] = $translations[$locale];
            }
        }

        return $sorted;
    }

    /**
     * The languages the file has texts in: listing pages, translated titles
     * and labels, fields' translations, menus' labels, global values, and
     * terms' and entries' translations.
     *
     * @param  array<mixed>  $structure
     * @return list<string>
     */
    private static function languages(array $structure): array
    {
        $codes = [];
        self::localeMaps($structure, function (array $map) use (&$codes): array {
            foreach (array_keys($map) as $code) {
                if (is_string($code) && preg_match(LocaleSettings::CODE, $code) === 1) {
                    $codes[$code] = true;
                }
            }

            return $map;
        });

        return array_keys($codes);
    }

    /**
     * The file without its texts in the given languages.
     *
     * @param  array<mixed>  $structure
     * @param  list<string>  $codes
     * @return array<mixed>
     */
    private static function withoutLanguages(array $structure, array $codes): array
    {
        return self::localeMaps($structure, fn (array $map): array => array_diff_key($map, array_flip($codes)));
    }

    /**
     * Passes each part of the file keyed by language through $visit.
     *
     * @param  array<mixed>  $structure
     * @param  Closure(array<mixed>): array<mixed>  $visit
     * @return array<mixed>
     */
    private static function localeMaps(array $structure, Closure $visit): array
    {
        $map = fn (mixed $value): mixed => is_array($value) ? $visit($value) : $value;
        $fields = function (mixed $list) use (&$fields, $map): mixed {
            if (! is_array($list)) {
                return $list;
            }
            foreach ($list as $i => $field) {
                if (is_array($field)) {
                    if (array_key_exists('translations', $field)) {
                        $field['translations'] = $map($field['translations']);
                    }
                    if (array_key_exists('fields', $field)) {
                        $field['fields'] = $fields($field['fields']);
                    }
                    $list[$i] = $field;
                }
            }

            return $list;
        };
        $items = function (mixed $list) use (&$items, $map): mixed {
            if (! is_array($list)) {
                return $list;
            }
            foreach ($list as $i => $item) {
                if (is_array($item)) {
                    if (array_key_exists('labels', $item)) {
                        $item['labels'] = $map($item['labels']);
                    }
                    if (array_key_exists('children', $item)) {
                        $item['children'] = $items($item['children']);
                    }
                    $list[$i] = $item;
                }
            }

            return $list;
        };
        $each = function (string $section, array $keys, ?Closure $also = null) use (&$structure, $map): void {
            if (! is_array($structure[$section] ?? null)) {
                return;
            }
            foreach ($structure[$section] as $i => $item) {
                if (! is_array($item)) {
                    continue;
                }
                foreach ($keys as $key) {
                    if (is_string($key) && array_key_exists($key, $item)) {
                        $item[$key] = $map($item[$key]);
                    }
                }
                $structure[$section][$i] = $also === null ? $item : $also($item);
            }
        };
        $each('collections', ['listings', 'translations', 'routes']);
        $each('taxonomies', ['listings', 'translations', 'routes'], function (array $item) use ($map): array {
            // Each collection's own term page and index page addresses, and its index page's fields.
            if (is_array($item['collection_pages'] ?? null)) {
                foreach ($item['collection_pages'] as $handle => $pages) {
                    if (! is_array($pages)) {
                        continue;
                    }
                    foreach (['routes', 'index_routes', 'listings'] as $key) {
                        if (array_key_exists($key, $pages)) {
                            $pages[$key] = $map($pages[$key]);
                        }
                    }
                    $item['collection_pages'][$handle] = $pages;
                }
            }

            return $item;
        });
        $each('forms', ['translations']);
        $each('globals', ['values']);
        $each('terms', ['translations']);
        $each('entries', ['translations']);
        $each('fieldsets', [], fn (array $item): array => array_key_exists('fields', $item) ? ['fields' => $fields($item['fields'])] + $item : $item);
        $each('blueprints', [], fn (array $item): array => array_key_exists('fields', $item) ? ['fields' => $fields($item['fields'])] + $item : $item);
        $each('menus', [], fn (array $item): array => array_key_exists('items', $item) ? ['items' => $items($item['items'])] + $item : $item);

        return $structure;
    }

    private static function entryId(Collection $collection, string $slug): ?int
    {
        $id = EntryTranslation::query()->where('collection_id', $collection->id)->where('locale', Locales::default())->where('draft_slug', $slug)
            ->whereHas('entry', fn ($query) => $query->withTrashed())->value('entry_id');

        return is_numeric($id) ? (int) $id : null;
    }

    private static function termId(Taxonomy $taxonomy, string $slug): ?int
    {
        $id = TermTranslation::query()->where('taxonomy_id', $taxonomy->id)->where('locale', Locales::default())->where('slug', $slug)->value('term_id');

        return is_numeric($id) && Term::withTrashed()->whereKey($id)->exists() ? (int) $id : null;
    }

    /**
     * The item without the given keys where they're null (left as they are, or the defaults).
     *
     * @param  array<mixed>  $item
     * @param  list<string>  $keys
     * @return array<mixed>
     */
    private static function withoutNulls(array $item, array $keys): array
    {
        foreach ($keys as $key) {
            if (array_key_exists($key, $item) && $item[$key] === null) {
                unset($item[$key]);
            }
        }

        return $item;
    }

    /**
     * Input for the content actions: the fields, and the SEO apart when there is some.
     *
     * @param  array<mixed>  $data
     * @return array<string, mixed>
     */
    private static function content(array $data): array
    {
        return ['data' => array_diff_key($data, [Seo::KEY => true]), ...(is_array($data[Seo::KEY] ?? null) ? [Seo::KEY => $data[Seo::KEY]] : [])];
    }

    private static function text(mixed $value): string
    {
        return is_string($value) ? $value : '';
    }

    /**
     * The rules for the other languages' own patterns: {"id": {"route": "/buku/{slug}"}}.
     *
     * @param  array<string, mixed>  $rules  each attribute's pattern rule
     * @return array<string, list<mixed>>
     */
    private static function routesRules(array $rules): array
    {
        $all = ['routes' => ['sometimes', 'nullable', 'array'], 'routes.*' => ['array:'.implode(',', array_keys($rules))]];
        foreach ($rules as $attribute => $rule) {
            $all["routes.*.{$attribute}"] = ['nullable', 'string', 'max:255', $rule];
        }

        return $all;
    }

    /**
     * No other collection (or taxonomy) may have a pattern in a language
     * the file gives this one there, own or main (RouteConflicts).
     *
     * @param  array<mixed>  $validated
     * @param  list<string>  $attributes
     */
    private static function checkRoutes(Collection|Taxonomy $record, array $validated, array $attributes): void
    {
        $routes = is_array($validated['routes'] ?? null) ? $validated['routes'] : (array_key_exists('routes', $validated) ? [] : ($record->routes ?? []));
        $errors = [];
        foreach (Locales::all() as $locale) {
            foreach ($attributes as $attribute) {
                $main = array_key_exists($attribute, $validated) ? $validated[$attribute] : $record->getAttribute($attribute);
                $own = is_array($routes[$locale] ?? null) ? ($routes[$locale][$attribute] ?? null) : null;
                $pattern = is_string($own) && $own !== '' ? $own : $main;
                if (! is_string($main) || $main === '' || ! is_string($pattern)) {
                    continue;
                }
                // The main language's: a unique column for its own kind, so only fixed pages (listing, index) against the other kind.
                if (! ($locale === Locales::default() && $attribute === 'route') && ($other = RouteConflicts::find($record, $attribute, $locale, $pattern)) !== null) {
                    $errors["routes.{$locale}.{$attribute}"] = "{$other} has the address {$pattern} in {$locale} already.";
                } elseif ($attribute === 'route' && ($landing = RouteConflicts::landing($record, $locale, $pattern)) !== null) {
                    $errors[$locale === Locales::default() ? 'route' : "routes.{$locale}.route"] = $landing;
                }
            }
        }
        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
        }
    }

    /**
     * The file's own patterns of the other languages, when it has them.
     *
     * @param  array<mixed>  $validated
     * @param  list<string>  $attributes
     */
    private static function fillRoutes(Collection|Taxonomy $record, array $validated, array $attributes): void
    {
        if (! array_key_exists('routes', $validated)) {
            return;
        }
        $routes = is_array($validated['routes']) ? $validated['routes'] : [];
        $record->routes = null;
        foreach ($routes as $locale => $own) {
            foreach ($attributes as $attribute) {
                $pattern = is_array($own) ? ($own[$attribute] ?? null) : null;
                $record->setOwnRoute((string) $locale, is_string($pattern) ? $pattern : null, $attribute);
            }
        }
    }

    /**
     * {handle} in an item's patterns written as its handle, as saving
     * would (RoutePattern::withHandle()), so they're checked as they'll be
     * stored; in a taxonomy's pages in each collection (`collection_pages`)
     * also {listing}, as that collection's listing page URL there.
     *
     * @param  array<mixed>  $item
     * @param  list<string>  $attributes
     * @return array<mixed>
     */
    private static function writeHandle(array $item, array $attributes, bool $handleIsField = false): array
    {
        $handle = $item['handle'] ?? null;
        if (! is_string($handle) || ! str_contains((string) json_encode($item), '{')) {
            return $item;
        }
        $write = fn (mixed $pattern, string $attribute, ?string $listing = null): mixed => is_string($pattern)
            ? RoutePattern::withHandle($pattern, $handle, $listing, $handleIsField && $attribute === 'route') : $pattern;
        foreach ($attributes as $attribute) {
            if (array_key_exists($attribute, $item)) {
                $item[$attribute] = $write($item[$attribute], $attribute);
            }
        }
        if (is_array($item['routes'] ?? null)) {
            $routes = [];
            foreach ($item['routes'] as $locale => $own) {
                $routes[$locale] = is_array($own) ? array_combine(array_keys($own), array_map(fn (mixed $pattern, int|string $attribute): mixed => $write($pattern, (string) $attribute), $own, array_keys($own))) : $own;
            }
            $item['routes'] = $routes;
        }
        if (is_array($item['collection_pages'] ?? null)) {
            $all = [];
            foreach ($item['collection_pages'] as $collection => $pages) {
                $model = is_array($pages) ? Collection::query()->where('handle', $collection)->first() : null;
                if (is_array($pages) && $model !== null) {
                    foreach (['route', 'index_route'] as $key) {
                        if (array_key_exists($key, $pages)) {
                            $pages[$key] = $write($pages[$key], $key, CollectionTaxonomy::listingPath($model));
                        }
                        if (is_array($pages[$key.'s'] ?? null)) {
                            $own = [];
                            foreach ($pages[$key.'s'] as $locale => $pattern) {
                                $own[$locale] = $write($pattern, $key, CollectionTaxonomy::listingPath($model, (string) $locale));
                            }
                            $pages[$key.'s'] = $own;
                        }
                    }
                }
                $all[$collection] = $pages;
            }
            $item['collection_pages'] = $all;
        }

        return $item;
    }

    /**
     * Whether a blueprint, as the file has it (else as stored), has an
     * Entries field named handle, which blueprints made before {handle}
     * meant the handle may have: a collection's {handle} is that field.
     */
    private function handleIsField(mixed $blueprint): bool
    {
        if (! is_string($blueprint)) {
            return false;
        }
        $fields = $this->blueprintsInFile[$blueprint]['fields'] ?? null;
        if (is_array($fields)) {
            foreach ($fields as $field) {
                if (is_array($field) && ($field['handle'] ?? null) === 'handle') {
                    return ($field['type'] ?? null) === EntriesField::TYPE && ! (is_array($field['config'] ?? null) && ($field['config']['multiple'] ?? false));
                }
            }

            return false;
        }

        return RoutePatternRule::isField(Blueprint::query()->where('handle', $blueprint)->first()?->schema()->field('handle'));
    }

    private static function routeRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            if (is_string($value) && $value !== '' && ! RoutePattern::isValid($value)) {
                $fail('Use a path with {slug} once, like /blog/{slug}.');
            }
        };
    }
}
