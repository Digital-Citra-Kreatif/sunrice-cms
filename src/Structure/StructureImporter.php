<?php

declare(strict_types=1);

namespace Sunrice\Cms\Structure;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Cms\Actions\Blueprints\SaveBlueprint;
use Sunrice\Cms\Actions\Collections\SaveCollection;
use Sunrice\Cms\Actions\Collections\SaveListing;
use Sunrice\Cms\Actions\Entries\ChangeBlueprint;
use Sunrice\Cms\Actions\Entries\CreateEntry;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\PublishEntry;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Actions\Fieldsets\SaveFieldset;
use Sunrice\Cms\Actions\Globals\SaveGlobals;
use Sunrice\Cms\Actions\Menus\SaveMenu;
use Sunrice\Cms\Actions\Terms\SaveTerm;
use Sunrice\Cms\Actions\Terms\SaveTermContent;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Globals;
use Sunrice\Cms\Menus;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Fieldset;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Site\RoutePattern;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SafeUrl;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\StructuredData;

/**
 * Creates or updates, by handle, the structure a file describes (the
 * shape StructureExporter writes): fieldsets, blueprints, collections
 * with their listing pages, taxonomies, global sets, forms, menus and
 * redirects, and terms, entries and global values when it has them,
 * through the same actions and checks as the admin (field definitions by
 * DefinitionValidator).
 *
 * Content is only ever added: an entry or term that exists (by slug in
 * the main language) and global values already saved are left alone. An
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
    public const SECTIONS = ['fieldsets', 'blueprints', 'collections', 'taxonomies', 'globals', 'forms', 'terms', 'entries', 'menus', 'redirects'];

    /** A collection's settings in the file. */
    public const COLLECTION = ['handle', 'title', 'blueprint', 'blueprints', 'dated', 'ordered', 'hierarchical', 'route', 'listing_route', 'listing_blueprint', 'per_page', 'comments', 'schema_type', 'template', 'translations', ...self::SEO_FIELDS];

    public const TAXONOMY = ['handle', 'title', 'hierarchical', 'route', 'blueprint', 'template', 'translations', ...self::SEO_FIELDS];

    /** Which fields fill in what an entry's or term's SEO card leaves empty. */
    public const SEO_FIELDS = ['seo_title_field', 'seo_description_field', 'seo_image_field'];

    public const GLOBAL_SET = ['handle', 'title', 'blueprint'];

    /** What visitors read in the other languages: {"id": {"title": "Properti"}}. */
    private const TRANSLATIONS = [
        'translations' => ['sometimes', 'nullable', 'array'],
        'translations.*' => ['array'],
        'translations.*.*' => ['nullable', 'string', 'max:1000'],
    ];

    public const FORM = ['handle', 'title', 'blueprint', 'notify', 'notify_roles', 'message', 'redirect_url', 'per_minute', 'captcha', 'translations'];

    private const HANDLE = ['required', 'string', 'max:64', 'regex:/^[a-z][a-z0-9_]*$/'];

    private const FIELD_HANDLE = ['nullable', 'string', 'max:64', 'regex:/^[a-z][a-z0-9_]*$/'];

    private const TEMPLATE = ['nullable', 'string', 'max:255', 'regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'];

    private ImportReport $report;

    private bool $force = false;

    /**
     * @param  array<mixed>  $structure
     *
     * @throws StructureImportFailed
     */
    public function import(array $structure, bool $dryRun = false, bool $force = false): ImportReport
    {
        $unknown = array_diff(array_keys($structure), ['sunrice', ...self::SECTIONS]);
        if ($unknown !== []) {
            throw new StructureImportFailed('the file', ['sections' => ['Unknown sections: '.implode(', ', array_map(strval(...), $unknown)).'.']]);
        }
        if (($structure['sunrice'] ?? StructureExporter::VERSION) !== StructureExporter::VERSION) {
            throw new StructureImportFailed('the file', ['sunrice' => ['It was written for another version of the format ('.StructureExporter::VERSION.' is read).']]);
        }
        $this->report = new ImportReport($dryRun);
        $this->force = $force;
        $section = fn (string $name): array => array_values(array_filter(is_array($structure[$name] ?? null) ? $structure[$name] : [], 'is_array'));

        DB::beginTransaction();
        try {
            // Definitions point at collections and taxonomies (entries and terms
            // fields) and those at blueprints: create what's missing empty first.
            $newFieldsets = $this->placeholders(Fieldset::class, $section('fieldsets'));
            $newBlueprints = $this->placeholders(Blueprint::class, $section('blueprints'));
            app(Fieldsets::class)->flush();
            $this->each('collection', $section('collections'), fn (array $item) => $this->collection($item));
            $this->each('taxonomy', $section('taxonomies'), fn (array $item) => $this->taxonomy($item));
            $this->each('fieldset', $section('fieldsets'), fn (array $item) => $this->definition(Fieldset::class, $item, $newFieldsets));
            $this->each('blueprint', $section('blueprints'), fn (array $item) => $this->definition(Blueprint::class, $item, $newBlueprints));
            $this->each('listing', $section('collections'), fn (array $item) => $this->listings($item));
            $this->each('global set', $section('globals'), fn (array $item) => $this->globalSet($item));
            $this->each('form', $section('forms'), fn (array $item) => $this->form($item));
            $this->each('term', $section('terms'), fn (array $item) => $this->term($item));
            $created = [];
            $this->each('entry', $section('entries'), function (array $item) use (&$created): void {
                $this->entry($item, $created);
            });
            $this->each('entry', $section('entries'), fn (array $item) => $this->entrySettings($item, $created));
            $this->each('menu', $section('menus'), fn (array $item) => $this->menu($item));
            $this->each('redirect', $section('redirects'), fn (array $item) => $this->redirect($item));
            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->forget();

            throw $e;
        }
        $this->forget();

        return $this->report;
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
        $item = self::withoutNulls($item, ['dated', 'ordered', 'hierarchical', 'comments', 'per_page']);
        $existing = Collection::query()->where('handle', $item['handle'] ?? null)->first();
        $id = $existing->id ?? 0;
        $validated = Validator::make($item, [
            'handle' => self::HANDLE,
            'blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'listing_blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'dated' => ['sometimes', 'boolean'], 'ordered' => ['sometimes', 'boolean'], 'hierarchical' => ['sometimes', 'boolean'], 'comments' => ['sometimes', 'boolean'],
            'route' => ['nullable', 'string', 'max:255', Rule::unique((new Collection)->getTable(), 'route')->ignore($id), self::routeRule()],
            'listing_route' => ['nullable', 'string', 'max:255', 'regex:#^(/[a-z0-9\-_]+)+$#', Rule::unique((new Collection)->getTable(), 'listing_route')->ignore($id)],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'schema_type' => ['nullable', 'string', Rule::in(array_keys(StructuredData::ENTRY_TYPES))],
            'template' => self::TEMPLATE,
            ...array_fill_keys(self::SEO_FIELDS, self::FIELD_HANDLE),
            ...self::TRANSLATIONS,
        ])->validate();
        $before = $existing?->only(self::COLLECTION);
        $collection = app(SaveCollection::class)->handle(array_intersect_key($item, array_flip(['title', 'blueprint', 'blueprints', 'dated'])) + ($existing === null ? ['handle' => $item['handle']] : []), $existing);
        $collection->forceFill(array_intersect_key($validated, array_flip(['ordered', 'hierarchical', 'route', 'listing_route', 'listing_blueprint', 'per_page', 'comments', 'schema_type', 'template', 'translations', ...self::SEO_FIELDS])))->save();
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
        foreach ($listings as $locale => $data) {
            $stored = $collection->listings->firstWhere('locale', $locale);
            if (is_string($locale) && is_array($data) && ($stored === null || array_replace($stored->data, $data) != $stored->data)) {
                app(SaveListing::class)->handle($collection, $data, $locale);
                $changed = true;
            }
        }
        if ($changed) {
            $this->report->add('listing', $collection->handle, ImportReport::UPDATED);
        }
    }

    /** @param array<mixed> $item */
    private function taxonomy(array $item): void
    {
        $item = self::withoutNulls($item, ['hierarchical']);
        $existing = Taxonomy::query()->where('handle', $item['handle'] ?? null)->first();
        $validated = Validator::make($item, [
            'handle' => [...self::HANDLE, ...($existing === null ? [Rule::unique((new Taxonomy)->getTable(), 'handle')] : [])],
            'title' => ['required', 'string', 'max:255'],
            'hierarchical' => ['sometimes', 'boolean'],
            'route' => ['nullable', 'string', 'max:255', Rule::unique((new Taxonomy)->getTable(), 'route')->ignore($existing->id ?? 0), self::routeRule()],
            'blueprint' => ['nullable', 'string', Rule::exists((new Blueprint)->getTable(), 'handle')],
            'template' => self::TEMPLATE,
            ...array_fill_keys(self::SEO_FIELDS, self::FIELD_HANDLE),
            'collections' => ['sometimes', 'array'],
            'collections.*' => ['string', Rule::exists((new Collection)->getTable(), 'handle')],
            ...self::TRANSLATIONS,
        ])->validate();
        $before = $existing === null ? null : [...$existing->only(self::TAXONOMY), 'collections' => $existing->collections()->pluck('handle')->sort()->values()->all()];
        $taxonomy = $existing ?? new Taxonomy;
        $taxonomy->fill(array_intersect_key($validated, array_flip(self::TAXONOMY)))->save();
        if (array_key_exists('collections', $validated)) {
            $taxonomy->collections()->sync(Collection::query()->whereIn('handle', $validated['collections'])->pluck('id')->all());
        }
        $this->report->add('taxonomy', $taxonomy->handle, $this->status($before, [...$taxonomy->only(self::TAXONOMY), 'collections' => $taxonomy->collections()->pluck('handle')->sort()->values()->all()]));
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
        $notes = [];
        // Values are content: only where none were saved yet.
        foreach (is_array($item['values'] ?? null) ? $item['values'] : [] as $locale => $data) {
            if (is_string($locale) && is_array($data) && ! $set->values()->where('locale', $locale)->exists()) {
                app(SaveGlobals::class)->handle($set, $data, $locale);
                $notes[] = "Values in {$locale}.";
            }
        }
        $this->report->add('global set', $set->handle, $notes !== [] && $existing !== null ? ImportReport::UPDATED : $this->status($before, $set->only(self::GLOBAL_SET)), $notes);
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
        foreach (self::mainFirst(is_array($validated['translations']) ? $validated['translations'] : []) as $locale => $translation) {
            $term = app(SaveTerm::class)->handle($taxonomy, [
                'title' => $translation['title'] ?? null, 'slug' => $translation['slug'] ?? null, 'locale' => $locale,
                ...($term === null ? ['parent_id' => $parent] : []),
            ], $term);
            $data = is_array($translation['data'] ?? null) ? $translation['data'] : [];
            if ($data !== [] || ($term->wasRecentlyCreated && ($validated['template'] ?? null) !== null)) {
                app(SaveTermContent::class)->handle($term, [...self::content($data), 'template' => $validated['template'] ?? null], $locale);
            }
        }
        $this->report->add('term', $label, ImportReport::CREATED);
    }

    /**
     * @param  array<mixed>  $item
     * @param  array<string, Entry>  $created  by "collection/slug"
     */
    private function entry(array $item, array &$created): void
    {
        $validated = Validator::make($item, ['collection' => ['required', 'string'], 'slug' => ['required', 'string'], 'translations' => ['required', 'array']])->validate();
        $handle = self::text($validated['collection']);
        $slug = self::text($validated['slug']);
        $collection = Collection::query()->where('handle', $handle)->first()
            ?? throw ValidationException::withMessages(['collection' => "There is no collection \"{$handle}\"."]);
        $label = $collection->handle.'/'.$slug;
        if (self::entryId($collection, $slug) !== null) {
            $this->report->add('entry', $label, ImportReport::UNCHANGED);

            return;
        }
        $entry = null;
        $publish = [];
        foreach (self::mainFirst(is_array($validated['translations']) ? $validated['translations'] : []) as $locale => $translation) {
            $data = is_array($translation['data'] ?? null) ? $translation['data'] : [];
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
            } else {
                $saved = app(SaveDraft::class)->handle(app(CreateTranslation::class)->handle($entry, $locale), $input);
            }
            if (($translation['published'] ?? false) === true) {
                $publish[] = $saved;
            }
        }
        foreach ($publish as $translation) {
            app(PublishEntry::class)->handle($translation->fresh() ?? $translation);
        }
        if ($entry !== null) {
            $created[$label] = $entry;
        }
        $this->report->add('entry', $label, ImportReport::CREATED);
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

    /** @param array<mixed> $item */
    private function menu(array $item): void
    {
        $validated = Validator::make($item, ['handle' => self::HANDLE, 'title' => ['required', 'string', 'max:255'], 'items' => ['sometimes', 'array']])->validate();
        $existing = Menu::query()->where('handle', $validated['handle'])->first();
        $notes = [];
        $items = $this->menuItems(is_array($item['items'] ?? null) ? $item['items'] : [], $notes);
        $before = $existing === null ? null : [$existing->title, self::tree($existing->items()->orderBy('sort_order')->get()->all(), null)];
        $menu = $existing ?? new Menu;
        $menu->fill(['handle' => $validated['handle'], 'title' => $validated['title']])->save();
        if ($before === null || $before[1] != self::normalizeItems($items)) {
            app(SaveMenu::class)->handle($menu, $items);
        }
        $this->report->add('menu', $menu->handle, $this->status($before, [$menu->title, self::tree($menu->items()->orderBy('sort_order')->get()->all(), null)]), $notes);
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
            $to = self::text($item['entry'] ?? $item['term'] ?? $item['collection'] ?? null);
            [$parent, $slug] = array_pad(explode('/', $to, 2), 2, '');
            $target = match (true) {
                is_string($item['entry'] ?? null) => ['entry_id' => ($c = Collection::query()->where('handle', $parent)->first()) === null ? null : self::entryId($c, $slug)],
                is_string($item['term'] ?? null) => ['term_id' => ($t = Taxonomy::query()->where('handle', $parent)->first()) === null ? null : self::termId($t, $slug)],
                is_string($item['collection'] ?? null) => ['collection_id' => Collection::query()->where('handle', $to)->value('id')],
                default => ['url' => $item['url'] ?? null],
            };
            if (in_array(null, $target, true) && ! array_key_exists('url', $target)) {
                $notes[] = "Left out a link to {$to}, which isn't there.";

                continue;
            }
            $resolved[] = [...$target, 'labels' => is_array($item['labels'] ?? null) ? $item['labels'] : [], 'new_tab' => ($item['new_tab'] ?? false) === true,
                'query' => isset($target['collection_id']) ? SaveMenu::queryString($item['query'] ?? null) : null,
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
                $tree[] = ['entry_id' => $item->entry_id, 'term_id' => $item->term_id, 'collection_id' => $item->collection_id, 'url' => $item->url,
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
            'entry_id' => $item['entry_id'] ?? null, 'term_id' => $item['term_id'] ?? null, 'collection_id' => $item['collection_id'] ?? null,
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
            'from' => ['required', 'string', 'max:512', 'regex:#^/[^\s?\#]*$#'],
            'to' => ['required', 'string', 'max:2048', SafeUrl::rule()],
            'status' => ['sometimes', 'integer', Rule::in([301, 302])],
        ])->validate();
        $existing = Redirect::query()->where('from_path', $validated['from'])->first();
        $before = $existing?->only(['to_url', 'status']);
        $redirect = $existing ?? new Redirect(['from_path' => $validated['from']]);
        $redirect->fill(['to_url' => $validated['to'], 'status' => $validated['status'] ?? 301])->save();
        $this->report->add('redirect', $redirect->from_path, $this->status($before, $redirect->only(['to_url', 'status'])));
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

    private static function routeRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            if (is_string($value) && $value !== '' && ! RoutePattern::isValid($value)) {
                $fail('Use a path with {slug} once, like /blog/{slug}.');
            }
        };
    }
}
