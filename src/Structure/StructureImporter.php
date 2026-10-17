<?php

declare(strict_types=1);

namespace Sunrice\Structure;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Actions\Entries\CreateEntry;
use Sunrice\Actions\Forms\SaveForm;
use Sunrice\Actions\Menus\SaveMenuItem;
use Sunrice\Actions\Structure\SaveBlueprint;
use Sunrice\Actions\Structure\SaveCollection;
use Sunrice\Actions\Structure\SaveFieldset;
use Sunrice\Actions\Taxonomies\SaveTaxonomy;
use Sunrice\Events\ContentChanged;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Collection;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Fieldset;
use Sunrice\Models\Form;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\TermTranslation;
use Sunrice\Permissions\SyncPermissions;
use Sunrice\Support\Locales;

/**
 * Creates the structure a package or starter kit describes — fieldsets,
 * blueprints, taxonomies, collections, globals, forms, draft entries and
 * menus — by handle, through the same actions as the admin.
 *
 * Importing again is safe: what exists and matches is left alone; what
 * exists but differs (an admin changed it, or the definition did) is
 * reported and only overwritten with $force. Entries and menus are only
 * ever created. A dry run reports without writing. Any invalid item stops
 * the import and nothing is saved.
 *
 * See docs/content-modeling.md § Importing structure for the format.
 */
class StructureImporter
{
    /** Sections, in the order they are imported (later ones refer to earlier ones). */
    public const SECTIONS = ['fieldsets', 'blueprints', 'taxonomies', 'collections', 'globals', 'forms', 'entries', 'menus'];

    protected ImportReport $report;

    protected bool $force = false;

    /**
     * @param  array<string, mixed>  $definition
     *
     * @throws StructureImportFailed
     */
    public function import(array $definition, bool $dryRun = false, bool $force = false): ImportReport
    {
        $unknown = array_diff(array_keys($definition), self::SECTIONS);
        if ($unknown !== []) {
            throw new StructureImportFailed('definition', ['sections' => ['Unknown sections: '.implode(', ', $unknown).'.']]);
        }

        $this->report = new ImportReport($dryRun);
        $this->force = $force;

        try {
            DB::beginTransaction();
            foreach (self::SECTIONS as $section) {
                foreach ((array) ($definition[$section] ?? []) as $index => $item) {
                    $this->importItem($section, $index, (array) $item);
                }
            }
            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            app(PermissionRegistrar::class)->forgetCachedPermissions();

            throw $e;
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
        if (! $dryRun && $this->report->wroteAnything()) {
            app(SyncPermissions::class)->handle();
            ContentChanged::dispatch('structure_imported');
        }

        return $this->report;
    }

    /** @param  array<string, mixed>  $item */
    protected function importItem(string $section, int|string $index, array $item): void
    {
        $label = $section.'.'.($item['handle'] ?? $item['slug'] ?? $index);

        try {
            match ($section) {
                'fieldsets' => $this->upsert('fieldset', $item, Fieldset::query()->where('handle', $item['handle'] ?? null)->first(),
                    fn (?Fieldset $m) => app(SaveFieldset::class)->handle(Arr::only($item, ['handle', 'title', 'fields']), $m),
                    fn (Model $m) => $m->only('title', 'fields')),
                'blueprints' => $this->upsert('blueprint', $item, Blueprint::query()->where('handle', $item['handle'] ?? null)->first(),
                    fn (?Blueprint $m) => app(SaveBlueprint::class)->handle(Arr::only($item, ['handle', 'title', 'fields']), $m),
                    fn (Model $m) => $m->only('title', 'fields')),
                'taxonomies' => $this->importTaxonomy($item),
                'collections' => $this->importCollection($item),
                'globals' => $this->importGlobal($item),
                'forms' => $this->upsert('form', $item, Form::query()->where('handle', $item['handle'] ?? null)->first(),
                    fn (?Form $m) => app(SaveForm::class)->handle($m, Arr::only($item, ['handle', 'title', 'fields', 'settings'])),
                    fn (Model $m) => $m->only('title', 'fields', 'settings')),
                'entries' => $this->importEntry($item),
                'menus' => $this->importMenu($item),
                default => throw new \InvalidArgumentException("Unknown section \"{$section}\"."),
            };
        } catch (ValidationException $e) {
            throw new StructureImportFailed($label, $e->errors(), $e);
        } catch (StructureImportFailed $e) {
            throw $e;
        } catch (\InvalidArgumentException $e) {
            throw new StructureImportFailed($label, ['definition' => [$e->getMessage()]], $e);
        }
    }

    /** @param  array<string, mixed>  $item */
    protected function importTaxonomy(array $item): void
    {
        $existing = Taxonomy::query()->where('handle', $item['handle'] ?? null)->first();
        $attributes = Arr::only($item, ['handle', 'title', 'hierarchical', 'settings']);
        if (array_key_exists('blueprint', $item)) {
            $attributes['blueprint_id'] = $this->blueprintId($item['blueprint']);
        }

        $this->upsert('taxonomy', $item, $existing,
            fn (?Taxonomy $m) => app(SaveTaxonomy::class)->handle($attributes, $m),
            fn (Model $m) => $m->only('title', 'hierarchical', 'blueprint_id', 'settings'));
    }

    /** @param  array<string, mixed>  $item */
    protected function importCollection(array $item): void
    {
        $existing = Collection::query()->where('handle', $item['handle'] ?? null)->first();
        $attributes = Arr::only($item, ['handle', 'title', 'settings']);
        if (array_key_exists('blueprint', $item)) {
            $attributes['blueprint_id'] = $this->blueprintId($item['blueprint']);
        }
        if (array_key_exists('archive_blueprint', $item)) {
            $attributes['settings']['archive_blueprint_id'] = $this->blueprintId($item['archive_blueprint']);
        }
        if (array_key_exists('taxonomies', $item)) {
            $attributes['taxonomy_ids'] = array_map(
                fn ($handle) => $this->taxonomy((string) $handle)->id,
                (array) $item['taxonomies'],
            );
        }

        $this->upsert('collection', $item, $existing,
            fn (?Collection $m) => app(SaveCollection::class)->handle($attributes, $m),
            fn (Collection $m) => [
                ...$m->only('title', 'blueprint_id', 'settings'),
                'taxonomies' => $m->taxonomies()->pluck('sunrice_taxonomies.id')->sort()->values()->all(),
            ]);
    }

    /** @param  array<string, mixed>  $item */
    protected function importGlobal(array $item): void
    {
        $existing = GlobalSet::query()->where('handle', $item['handle'] ?? null)->first();
        $attributes = validator([
            'handle' => $item['handle'] ?? null,
            'title' => $item['title'] ?? null,
            'group' => $item['group'] ?? 'global',
            'blueprint_id' => $this->blueprintId($item['blueprint'] ?? null),
        ], [
            'handle' => ['required', 'string', 'max:100', 'regex:/^[a-z][a-z0-9_]*$/'],
            'title' => ['required', 'string', 'max:255'],
            'group' => ['required', 'in:global,template_part'],
            'blueprint_id' => ['required', 'integer'],
        ])->validate();

        $this->upsert('global', $item, $existing, function (?GlobalSet $m) use ($attributes): GlobalSet {
            $m ??= new GlobalSet;
            $m->fill($attributes)->save();

            return $m;
        }, fn (Model $m) => $m->only('title', 'group', 'blueprint_id'));
    }

    /**
     * A draft entry in the main language, by collection and slug. Existing
     * entries (also trashed ones) are never changed.
     *
     * @param  array<string, mixed>  $item
     */
    protected function importEntry(array $item): void
    {
        $collection = $this->collection((string) ($item['collection'] ?? ''));
        $slug = (string) ($item['slug'] ?? '');
        $label = "{$collection->handle}/{$slug}";
        if ($slug === '') {
            throw new \InvalidArgumentException('An entry needs a slug.');
        }

        $exists = EntryTranslation::query()->withoutGlobalScopes()
            ->where('collection_id', $collection->id)->where('locale', Locales::main())->where('slug', $slug)->exists();
        if ($exists) {
            $this->report->add('entry', $label, ImportReport::UNCHANGED);

            return;
        }

        app(CreateEntry::class)->handle($collection, [
            'title' => (string) ($item['title'] ?? $slug),
            'slug' => $slug,
            'data' => (array) ($item['data'] ?? []),
            'seo' => (array) ($item['seo'] ?? []),
        ]);
        $this->report->add('entry', $label, ImportReport::CREATED);
    }

    /**
     * A menu with its items; an existing menu is never changed.
     *
     * @param  array<string, mixed>  $item
     */
    protected function importMenu(array $item): void
    {
        $validated = validator(Arr::only($item, ['handle', 'title']), [
            'handle' => ['required', 'string', 'max:100', 'regex:/^[a-z][a-z0-9_]*$/'],
            'title' => ['required', 'string', 'max:255'],
        ])->validate();

        if (Menu::query()->where('handle', $validated['handle'])->exists()) {
            $this->report->add('menu', $validated['handle'], ImportReport::UNCHANGED);

            return;
        }

        $menu = Menu::create($validated);
        $this->menuItems($menu, (array) ($item['items'] ?? []), null);
        $this->report->add('menu', $validated['handle'], ImportReport::CREATED);
    }

    /** @param  array<int, mixed>  $items */
    protected function menuItems(Menu $menu, array $items, ?int $parentId): void
    {
        foreach ($items as $item) {
            $item = (array) $item;
            $type = (string) ($item['type'] ?? 'url');
            $saved = app(SaveMenuItem::class)->handle($menu, [
                'parent_id' => $parentId,
                'type' => $type,
                'target_id' => $type === 'url' ? null : $this->menuTarget($type, (string) ($item['target'] ?? '')),
                'url' => $type === 'url' ? ($item['url'] ?? null) : null,
                'labels' => (array) ($item['labels'] ?? []),
                'new_tab' => (bool) ($item['new_tab'] ?? false),
            ]);
            $this->menuItems($menu, (array) ($item['children'] ?? []), $saved->id);
        }
    }

    /** Menu item targets: "products" (collection), "pages/about" (entry), "categories/shoes" (term). */
    protected function menuTarget(string $type, string $target): int
    {
        if ($type === 'collection') {
            return $this->collection($target)->id;
        }

        [$parent, $slug] = array_pad(explode('/', $target, 2), 2, '');
        if ($type === 'entry') {
            $translation = EntryTranslation::query()->withoutGlobalScopes()
                ->where('collection_id', $this->collection($parent)->id)->where('locale', Locales::main())->where('slug', $slug)->first();

            return (int) ($translation->entry_id ?? throw new \InvalidArgumentException("No entry \"{$target}\" for the menu item."));
        }
        if ($type === 'term') {
            $translation = TermTranslation::query()->withoutGlobalScopes()
                ->where('taxonomy_id', $this->taxonomy($parent)->id)->where('locale', Locales::main())->where('slug', $slug)->first();

            return (int) ($translation->term_id ?? throw new \InvalidArgumentException("No term \"{$target}\" for the menu item."));
        }

        throw new \InvalidArgumentException("Unknown menu item type \"{$type}\".");
    }

    /**
     * Create the record, or compare it with what saving the definition
     * would store (saved inside a savepoint, then rolled back) and report
     * or overwrite the differences.
     *
     * @template TModel of Model
     *
     * @param  array<string, mixed>  $item
     * @param  TModel|null  $existing
     * @param  Closure(TModel|null): TModel  $save
     * @param  Closure(TModel): array<string, mixed>  $snapshot
     */
    protected function upsert(string $type, array $item, ?Model $existing, Closure $save, Closure $snapshot): void
    {
        $handle = (string) ($item['handle'] ?? '');

        if ($existing === null) {
            $save(null);
            $this->report->add($type, $handle, ImportReport::CREATED);

            return;
        }

        $before = $snapshot($existing);
        DB::beginTransaction();
        try {
            $after = $snapshot($save($existing->fresh()));
        } finally {
            DB::rollBack();
        }

        $differences = static::differences($before, $after);
        if ($differences === []) {
            $this->report->add($type, $handle, ImportReport::UNCHANGED);

            return;
        }

        if ($this->force) {
            $save($existing->fresh());
            $this->report->add($type, $handle, ImportReport::UPDATED, $differences);

            return;
        }

        $this->report->add($type, $handle, ImportReport::CHANGED, $differences);
    }

    /**
     * Dot paths whose values differ between two snapshots.
     *
     * @param  array<string, mixed>  $before
     * @param  array<string, mixed>  $after
     * @return array<int, string>
     */
    public static function differences(array $before, array $after): array
    {
        $a = Arr::dot($before);
        $b = Arr::dot($after);
        $paths = [];
        foreach (array_unique([...array_keys($a), ...array_keys($b)]) as $path) {
            if (! array_key_exists($path, $a) || ! array_key_exists($path, $b) || $a[$path] != $b[$path]) {
                $paths[] = (string) $path;
            }
        }
        sort($paths);

        return $paths;
    }

    protected function blueprintId(mixed $handle): ?int
    {
        if ($handle === null || $handle === '') {
            return null;
        }

        return Blueprint::query()->where('handle', (string) $handle)->value('id')
            ?? throw new \InvalidArgumentException("No blueprint \"{$handle}\" (define it under blueprints).");
    }

    protected function collection(string $handle): Collection
    {
        return Collection::query()->where('handle', $handle)->first()
            ?? throw new \InvalidArgumentException("No collection \"{$handle}\".");
    }

    protected function taxonomy(string $handle): Taxonomy
    {
        return Taxonomy::query()->where('handle', $handle)->first()
            ?? throw new \InvalidArgumentException("No taxonomy \"{$handle}\".");
    }
}
