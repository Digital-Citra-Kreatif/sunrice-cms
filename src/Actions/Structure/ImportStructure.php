<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Structure;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Cms\Actions\Blueprints\SaveBlueprint;
use Sunrice\Cms\Actions\Entries\CreateEntry;
use Sunrice\Cms\Actions\Entries\PublishEntry;
use Sunrice\Cms\Actions\Fieldsets\SaveFieldset;
use Sunrice\Cms\Actions\Menus\SaveMenu;
use Sunrice\Cms\Admin\CollectionResource;
use Sunrice\Cms\Admin\FormResource;
use Sunrice\Cms\Admin\GlobalSetResource;
use Sunrice\Cms\Admin\MenuResource;
use Sunrice\Cms\Admin\TaxonomyResource;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Fieldset;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\ImportReport;
use Sunrice\Cms\Support\Locales;
use Throwable;

/**
 * Makes the structure a definition describes (sunrice:import-structure):
 * fieldsets, blueprints, collections, taxonomies, globals, forms, entries
 * and menus, by handle, through the admin's own actions and forms, so
 * they're validated the same way. See docs/cms/commands.md for the format.
 *
 * Importing again is safe: what is there and matches stays; what is
 * there but differs is reported, and overwritten only with $force.
 * Entries and menus are only ever created. One invalid item stops it all
 * and nothing is saved; a dry run saves nothing either.
 *
 * @api
 */
final class ImportStructure
{
    /** The sections, in the order they're made (later ones use earlier ones). */
    public const SECTIONS = ['fieldsets', 'blueprints', 'collections', 'taxonomies', 'globals', 'forms', 'entries', 'menus'];

    /** What the definition may say of each, besides handle. */
    private const ATTRIBUTES = [
        'collections' => ['title', 'blueprint', 'dated', 'ordered', 'hierarchical', 'route', 'listing_route', 'listing_blueprint', 'per_page', 'comments', 'schema_type', 'template'],
        'taxonomies' => ['title', 'hierarchical', 'route', 'blueprint', 'template'],
        'globals' => ['title', 'blueprint'],
        'forms' => ['title', 'blueprint', 'notify', 'message', 'redirect_url', 'per_minute', 'captcha'],
    ];

    private ImportReport $report;

    private bool $force = false;

    /**
     * @param  array<mixed>  $definition
     *
     * @throws InvalidArgumentException naming the item that's wrong
     */
    public function handle(array $definition, bool $dryRun = false, bool $force = false): ImportReport
    {
        $unknown = array_diff(array_keys($definition), self::SECTIONS);
        if ($unknown !== []) {
            throw new InvalidArgumentException('Unknown sections: '.implode(', ', $unknown).'. Use '.implode(', ', self::SECTIONS).'.');
        }
        $this->report = new ImportReport($dryRun);
        $this->force = $force;

        DB::beginTransaction();
        try {
            foreach (self::SECTIONS as $section) {
                $items = $definition[$section] ?? [];
                foreach (is_array($items) ? $items : [] as $index => $item) {
                    $this->item($section, $index, is_array($item) ? $item : []);
                }
            }
            $dryRun ? DB::rollBack() : DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();

            throw $e;
        } finally {
            app(PermissionRegistrar::class)->forgetCachedPermissions();
        }

        return $this->report;
    }

    /** @param array<mixed> $item */
    private function item(string $section, int|string $index, array $item): void
    {
        $handle = is_string($item['handle'] ?? null) ? $item['handle'] : (is_string($item['slug'] ?? null) ? $item['slug'] : (string) $index);
        try {
            match ($section) {
                'fieldsets' => $this->upsert('fieldset', $handle, Fieldset::query()->where('handle', $handle)->first(),
                    fn (?Model $record) => app(SaveFieldset::class)->handle(self::input($item, ['title', 'fields'], $record), $record instanceof Fieldset ? $record : null),
                    fn (Model $record) => $record->only('title', 'fields')),
                'blueprints' => $this->upsert('blueprint', $handle, Blueprint::query()->where('handle', $handle)->first(),
                    fn (?Model $record) => app(SaveBlueprint::class)->handle(self::input($item, ['title', 'fields'], $record), $record instanceof Blueprint ? $record : null),
                    fn (Model $record) => $record->only('title', 'fields')),
                'collections' => $this->upsert('collection', $handle, Collection::withTrashed()->where('handle', $handle)->first(),
                    fn (?Model $record) => CollectionResource::saveRecord(self::input($item, self::ATTRIBUTES['collections'], $record), $record),
                    fn (Model $record) => $record->only(self::ATTRIBUTES['collections'])),
                'taxonomies' => $this->taxonomy($handle, $item),
                'globals' => $this->upsert('global', $handle, GlobalSet::query()->where('handle', $handle)->first(),
                    fn (?Model $record) => GlobalSetResource::saveRecord(self::input($item, self::ATTRIBUTES['globals'], $record), $record),
                    fn (Model $record) => $record->only(self::ATTRIBUTES['globals'])),
                'forms' => $this->form($handle, $item),
                'entries' => $this->entry($item),
                'menus' => $this->menu($handle, $item),
                default => throw new InvalidArgumentException("Unknown section \"{$section}\"."),
            };
        } catch (ValidationException $e) {
            throw new InvalidArgumentException("{$section}.{$handle}: ".$e->validator->errors()->first(), 0, $e);
        } catch (InvalidArgumentException $e) {
            throw new InvalidArgumentException("{$section}.{$handle}: {$e->getMessage()}", 0, $e);
        }
    }

    /**
     * The form's input: the record's values (so what the definition leaves
     * out stays) with the definition's over them.
     *
     * @param  array<mixed>  $item
     * @param  list<string>  $attributes
     * @return array<mixed>
     */
    private static function input(array $item, array $attributes, ?Model $record): array
    {
        $input = $record === null ? ['handle' => $item['handle'] ?? null] : $record->only($attributes);

        return array_replace($input, array_intersect_key($item, array_flip($attributes)));
    }

    /** @param array<mixed> $item */
    private function taxonomy(string $handle, array $item): void
    {
        $collections = array_key_exists('collections', $item) ? array_map(fn (mixed $handle): string => (string) $this->collection($handle)->id, is_array($item['collections']) ? $item['collections'] : []) : null;
        $ids = fn (Model $record): array => $record instanceof Taxonomy ? $record->collections()->pluck('sunrice_collections.id')->map(fn (mixed $id): string => is_scalar($id) ? (string) $id : '')->sort()->values()->all() : [];
        $this->upsert('taxonomy', $handle, Taxonomy::withTrashed()->where('handle', $handle)->first(),
            fn (?Model $record) => TaxonomyResource::saveRecord(self::input($item, self::ATTRIBUTES['taxonomies'], $record) + ['collections' => $collections ?? ($record === null ? [] : $ids($record))], $record),
            fn (Model $record) => $record->only(self::ATTRIBUTES['taxonomies']) + ['collections' => $ids($record)]);
    }

    /** @param array<mixed> $item */
    private function form(string $handle, array $item): void
    {
        if (is_array($item['notify'] ?? null)) {
            $item['notify'] = implode("\n", array_filter($item['notify'], is_string(...)));
        }
        $values = fn (Model $record): array => ['notify' => $record instanceof Form ? implode("\n", $record->notify ?? []) : ''] + $record->only(self::ATTRIBUTES['forms']);
        $this->upsert('form', $handle, Form::query()->where('handle', $handle)->first(),
            fn (?Model $record) => FormResource::saveRecord(array_replace($record === null ? ['handle' => $handle] : $values($record), array_intersect_key($item, array_flip(self::ATTRIBUTES['forms']))), $record),
            $values);
    }

    /**
     * A draft entry in the main language (published with `publish`), by
     * collection and slug; one that's there (trashed too) never changes.
     *
     * @param  array<mixed>  $item
     */
    private function entry(array $item): void
    {
        $collection = $this->collection($item['collection'] ?? null);
        $slug = is_string($item['slug'] ?? null) ? $item['slug'] : throw new InvalidArgumentException('An entry needs a slug.');
        $label = "{$collection->handle}/{$slug}";
        if (EntryTranslation::query()->where('collection_id', $collection->id)->where('locale', Locales::default())->where(fn ($query) => $query->where('slug', $slug)->orWhere('draft_slug', $slug))->exists()) {
            $this->report->add('entry', $label, ImportReport::UNCHANGED);

            return;
        }
        $translation = app(CreateEntry::class)->handle($collection, ['title' => $item['title'] ?? $slug, 'slug' => $slug] + Arr::only($item, ['data', 'seo']));
        if (($item['publish'] ?? false) === true) {
            app(PublishEntry::class)->handle($translation);
        }
        $this->report->add('entry', $label, ImportReport::CREATED);
    }

    /** @param array<mixed> $item */
    private function menu(string $handle, array $item): void
    {
        if (Menu::query()->where('handle', $handle)->exists()) {
            $this->report->add('menu', $handle, ImportReport::UNCHANGED);

            return;
        }
        $menu = MenuResource::saveRecord(Arr::only($item, ['handle', 'title']));
        if ($menu instanceof Menu) {
            app(SaveMenu::class)->handle($menu, $this->menuItems(is_array($item['items'] ?? null) ? $item['items'] : []));
        }
        $this->report->add('menu', $handle, ImportReport::CREATED);
    }

    /**
     * Menu items as SaveMenu takes them, from `url`, `entry` ("pages/about"),
     * `term` ("tags/news") or `listing` ("blog").
     *
     * @param  array<mixed>  $items
     * @return list<array<mixed>>
     */
    private function menuItems(array $items): array
    {
        $tree = [];
        foreach ($items as $item) {
            $item = is_array($item) ? $item : [];
            $saved = Arr::only($item, ['url', 'labels', 'new_tab']);
            if (isset($item['entry'])) {
                [$collection, $slug] = array_pad(explode('/', (string) (is_string($item['entry']) ? $item['entry'] : ''), 2), 2, '');
                $saved['entry_id'] = EntryTranslation::query()->where('collection_id', $this->collection($collection)->id)->where('locale', Locales::default())
                    ->where('draft_slug', $slug)->value('entry_id') ?? throw new InvalidArgumentException("No entry \"{$collection}/{$slug}\" for the menu.");
            }
            if (isset($item['term'])) {
                [$taxonomy, $slug] = array_pad(explode('/', (string) (is_string($item['term']) ? $item['term'] : ''), 2), 2, '');
                $id = Taxonomy::query()->where('handle', $taxonomy)->value('id') ?? throw new InvalidArgumentException("No taxonomy \"{$taxonomy}\".");
                $saved['term_id'] = TermTranslation::query()->where('taxonomy_id', $id)->where('locale', Locales::default())->where('slug', $slug)->value('term_id')
                    ?? throw new InvalidArgumentException("No term \"{$taxonomy}/{$slug}\" for the menu.");
            }
            if (isset($item['listing'])) {
                $saved['collection_id'] = $this->collection($item['listing'])->id;
            }
            $saved['children'] = $this->menuItems(is_array($item['children'] ?? null) ? $item['children'] : []);
            $tree[] = $saved;
        }

        return $tree;
    }

    /**
     * Creates the record, or compares it with what saving the definition
     * would make (saved, then rolled back) and reports or overwrites what
     * differs.
     *
     * @param  Closure(Model|null): Model  $save
     * @param  Closure(Model): array<mixed>  $snapshot
     */
    private function upsert(string $type, string $handle, ?Model $existing, Closure $save, Closure $snapshot): void
    {
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
        $differences = self::differences($before, $after);
        if ($differences === []) {
            $this->report->add($type, $handle, ImportReport::UNCHANGED);
        } elseif ($this->force) {
            $save($existing->fresh());
            $this->report->add($type, $handle, ImportReport::UPDATED, $differences);
        } else {
            $this->report->add($type, $handle, ImportReport::CHANGED, $differences);
        }
    }

    /**
     * @param  array<mixed>  $before
     * @param  array<mixed>  $after
     * @return list<string>
     */
    private static function differences(array $before, array $after): array
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

    private function collection(mixed $handle): Collection
    {
        return Collection::query()->where('handle', is_string($handle) ? $handle : '')->first()
            ?? throw new InvalidArgumentException('No collection "'.(is_string($handle) ? $handle : '').'".');
    }
}
