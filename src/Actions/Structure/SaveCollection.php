<?php

declare(strict_types=1);

namespace Sunrice\Actions\Structure;

use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Events\ContentChanged;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Collection;
use Sunrice\Permissions\SyncPermissions;

class SaveCollection
{
    /**
     * @param  array{handle?: string, title: string, blueprint_id?: int, settings?: array, taxonomy_ids?: array}  $attributes
     */
    /** @param array<string, mixed> $attributes */
    public function handle(array $attributes, ?Collection $collection = null): Collection
    {
        // A deleted collection with this handle comes back, with its entries.
        $restoring = $collection === null && is_string($attributes['handle'] ?? null)
            ? Collection::onlyTrashed()->where('handle', $attributes['handle'])->first()
            : null;
        $collection ??= $restoring;

        $validated = validator($attributes, [
            'handle' => [
                $collection === null ? 'required' : 'sometimes',
                'string', 'max:100', 'regex:/^[a-z][a-z0-9_]*$/',
                Rule::unique('sunrice_collections', 'handle')->ignore($collection),
                function (string $attribute, mixed $value, \Closure $fail) use ($collection): void {
                    if ($collection !== null && $value !== $collection->handle
                        && Collection::onlyTrashed()->where('handle', $value)->exists()) {
                        $fail('A deleted collection still uses this handle (its entries are kept). Create a new collection with it to bring them back, or remove them with "php artisan sunrice:orphans --purge".');
                    }
                },
            ],
            'title' => ['required', 'string', 'max:255'],
            'blueprint_id' => ['nullable', 'integer', Rule::exists('sunrice_blueprints', 'id')],
            'settings' => ['array'],
            'settings.dated' => ['boolean'],
            'settings.translatable' => ['boolean'],
            'settings.sluggable' => ['boolean'],
            'settings.archivable' => ['boolean'],
            'settings.has_single' => ['boolean'],
            'settings.hierarchical' => ['boolean'],
            'settings.comments' => ['boolean'],
            'settings.sort' => ['nullable', Rule::in(array_keys(Collection::SORTS))],
            'settings.sort_direction' => ['nullable', Rule::in(['asc', 'desc'])],
            // Fields for the listing page, edited from the collection's entries list.
            'settings.archive_blueprint_id' => ['nullable', 'integer', Rule::exists('sunrice_blueprints', 'id')],
            'settings.titles' => ['nullable', 'array'],
            'settings.titles.*' => ['nullable', 'string', 'max:255'],
            'settings.has_archive' => ['boolean'],
            'settings.route' => ['nullable', 'string', 'max:255', 'regex:#^[A-Za-z0-9/_{}.-]*$#'],
            'settings.archive_route' => ['nullable', 'string', 'max:255', 'regex:#^[A-Za-z0-9/_.-]*$#'],
            'settings.per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'settings.template' => ['nullable', 'string', 'max:150', 'regex:/^[A-Za-z0-9_.:\/-]+$/'],
            'settings.archive_template' => ['nullable', 'string', 'max:150', 'regex:/^[A-Za-z0-9_.:\/-]+$/'],
            'settings.single_term_taxonomies' => ['nullable', 'array'],
            'settings.single_term_taxonomies.*' => ['integer'],
            'settings.seo' => ['nullable', 'array'],
            'settings.seo.description' => ['nullable', 'string', 'max:500'],
            'settings.seo.image' => ['nullable', 'integer'],
            'settings.seo.noindex' => ['nullable', 'boolean'],
            // Which field fills an empty meta title/description/share image (Settings → SEO).
            'settings.seo.title_field' => ['nullable', 'string', 'max:100', 'regex:/^[A-Za-z0-9_-]*$/'],
            'settings.seo.description_field' => ['nullable', 'string', 'max:100', 'regex:/^[A-Za-z0-9_-]*$/'],
            'settings.seo.image_field' => ['nullable', 'string', 'max:100', 'regex:/^[A-Za-z0-9_-]*$/'],
            'settings.icon' => ['nullable', 'string', 'max:50', 'regex:/^[a-z0-9-]+$/'],
            'settings.archive_entries_in' => ['nullable', 'string', 'max:100'],
            'taxonomy_ids' => ['array'],
            'taxonomy_ids.*' => ['integer', Rule::exists('sunrice_taxonomies', 'id')],
        ], [], [
            'settings.route' => 'route prefix',
            'settings.archive_route' => 'archive URL',
            'settings.per_page' => 'entries per page',
            'settings.template' => 'template',
            'settings.archive_template' => 'archive template',
        ])->validate();

        // Merge over the stored settings so keys the form doesn't edit survive.
        $settings = $this->cleanSettings(array_merge($collection->settings ?? [], Arr::get($validated, 'settings', [])));
        $handle = $validated['handle'] ?? $collection?->handle;
        $settings = $this->normalizeRoute($settings, (string) $handle);
        $this->ensureUniqueRoute($settings, (string) $handle, $collection);
        $this->ensureRouteFields($settings, (string) $handle, Arr::get($validated, 'blueprint_id', $collection?->blueprint_id));

        $collection ??= new Collection;
        $collection->fill([
            'handle' => $validated['handle'] ?? $collection->handle,
            'title' => $validated['title'],
            'blueprint_id' => Arr::get($validated, 'blueprint_id', $collection->blueprint_id),
            'settings' => $settings,
        ]);
        if ($restoring !== null) {
            $collection->deleted_at = null;
        }
        $collection->save();

        if (array_key_exists('taxonomy_ids', $validated)) {
            $collection->taxonomies()->sync($validated['taxonomy_ids']);
        }

        app(SyncPermissions::class)->handle();
        ContentChanged::dispatch('collection_saved');

        return $collection->refresh();
    }

    /**
     * Store the route as a URL pattern ('blog' → '/blog/{slug}'). A route
     * equal to the handle default is dropped, so it keeps following the
     * handle if that changes.
     *
     * @param  array<string, mixed>  $settings
     * @return array<string, mixed>
     */
    protected function normalizeRoute(array $settings, string $handle): array
    {
        $route = Collection::normalizeRoute($settings['route'] ?? null);

        if ($route === null || $route === '/'.$handle.'/{slug}') {
            unset($settings['route']);
        } else {
            $settings['route'] = $route;
        }

        return $settings;
    }

    /**
     * Drop blanks (so defaults apply) and tidy the archive URL.
     *
     * @param  array<string, mixed>  $settings
     * @return array<string, mixed>
     */
    protected function cleanSettings(array $settings): array
    {
        if (array_key_exists('seo', $settings)) {
            $settings['seo'] = array_filter((array) $settings['seo'], fn ($v) => $v !== null && $v !== '' && $v !== false);
            if ($settings['seo'] === []) {
                unset($settings['seo']);
            }
        }
        if (array_key_exists('titles', $settings)) {
            $settings['titles'] = Collection::cleanTitles($settings['titles']);
            if ($settings['titles'] === []) {
                unset($settings['titles']);
            }
        }
        foreach (['archive_route', 'template', 'archive_template', 'per_page', 'archive_blueprint_id', 'sort', 'sort_direction'] as $key) {
            if (array_key_exists($key, $settings) && ($settings[$key] === null || $settings[$key] === '')) {
                unset($settings[$key]);
            }
        }
        if (isset($settings['archive_route'])) {
            $settings['archive_route'] = '/'.trim((string) $settings['archive_route'], '/');
        }
        foreach (['per_page', 'archive_blueprint_id'] as $key) {
            if (isset($settings[$key])) {
                $settings[$key] = (int) $settings[$key];
            }
        }

        return $settings;
    }

    /**
     * Two collections can't serve entries from the same URL pattern.
     *
     * @param  array<string, mixed>  $settings
     *
     * @throws ValidationException
     */
    protected function ensureUniqueRoute(array $settings, string $handle, ?Collection $collection): void
    {
        if (($settings['has_single'] ?? true) === false) {
            return;
        }

        $route = (new Collection(['handle' => $handle, 'settings' => $settings]))->entryRoute();

        $taken = Collection::query()
            ->when($collection !== null, fn ($q) => $q->whereKeyNot($collection->getKey()))
            ->get()
            ->first(fn (Collection $other) => $other->setting('has_single', true) !== false && $this->routeShape($other->entryRoute()) === $this->routeShape($route));

        if ($taken !== null) {
            throw ValidationException::withMessages([
                'settings.route' => "The URL {$route} is already used by the \"{$taken->title}\" collection. Choose another route prefix.",
            ]);
        }
    }

    /** '/projects/{project}/{slug}' and '/projects/{site}/{slug}' match the same URLs. */
    protected function routeShape(string $route): string
    {
        return (string) preg_replace('#\{[a-z][a-z0-9_]*\}#', '{}', $route);
    }

    /**
     * Every placeholder besides {slug} must name an `entries` field of
     * the collection's blueprint: its linked entry's slug fills the segment.
     *
     * @param  array<string, mixed>  $settings
     *
     * @throws ValidationException
     */
    protected function ensureRouteFields(array $settings, string $handle, mixed $blueprintId): void
    {
        if (($settings['has_single'] ?? true) === false) {
            return;
        }

        $route = (new Collection(['handle' => $handle, 'settings' => $settings]))->entryRoute();
        $schema = $blueprintId === null ? null : Blueprint::query()->find($blueprintId)?->schema();

        foreach (Collection::parametersOf($route) as $field) {
            if (($schema?->field($field)['type'] ?? null) !== 'entries') {
                throw ValidationException::withMessages([
                    'settings.route' => "{{$field}} in the URL must be the handle of an Entries field in this collection's blueprint.",
                ]);
            }
        }
    }
}
