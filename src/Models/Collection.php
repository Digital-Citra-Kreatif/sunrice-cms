<?php

declare(strict_types=1);

namespace Sunrice\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Sunrice\Database\Factories\CollectionFactory;
use Sunrice\Fields\BlueprintSchema;
use Sunrice\Fields\HydrationContext;
use Sunrice\Fields\TranslationOverlay;
use Sunrice\Models\Concerns\HasTranslatedTitle;
use Sunrice\Support\Locales;

/**
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property int|null $blueprint_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property array<string, mixed> $settings
 * @property array<string, mixed>|null $archive_data
 *
 * settings keys: route, has_single, has_archive, archive_route,
 * translatable, template, archive_template, archive_blueprint_id,
 * default_sort ('manual'|'published_at_desc'|'title_asc'), per_page,
 * icon, table_columns (array of field handles).
 *
 * @use HasFactory<CollectionFactory>
 */
class Collection extends Model
{
    /** @use HasFactory<CollectionFactory> */
    use HasFactory, SoftDeletes;

    use HasTranslatedTitle;

    protected $table = 'sunrice_collections';

    protected $guarded = [];

    protected $casts = [
        'settings' => 'array',
        'archive_data' => 'array',
    ];

    protected static function newFactory(): CollectionFactory
    {
        return CollectionFactory::new();
    }

    /** @return BelongsTo<Blueprint, $this> */
    public function blueprint(): BelongsTo
    {
        return $this->belongsTo(Blueprint::class);
    }

    /** @return HasMany<Entry, $this> */
    public function entries(): HasMany
    {
        return $this->hasMany(Entry::class);
    }

    /** @return BelongsToMany<Taxonomy, $this> */
    public function taxonomies(): BelongsToMany
    {
        return $this->belongsToMany(Taxonomy::class, 'sunrice_collection_taxonomy');
    }

    public function setting(string $key, mixed $default = null): mixed
    {
        return data_get($this->settings, $key, $default);
    }

    /**
     * URL pattern of single entries, e.g. '/blog/{slug}'. Without a
     * custom route it follows the handle: '/{handle}/{slug}'.
     */
    public function entryRoute(): string
    {
        $route = static::normalizeRoute($this->setting('route'));

        return $route ?? '/'.$this->handle.'/{slug}';
    }

    /**
     * Handles of the `entries` fields named in the entry route besides
     * {slug}: '/projects/{project}/{slug}' → ['project']. Each fills its
     * segment with the slug of the entry that field links to.
     *
     * @return array<int, string>
     */
    public function routeParameters(): array
    {
        return static::parametersOf($this->entryRoute());
    }

    /** @return array<int, string> */
    public static function parametersOf(string $route): array
    {
        preg_match_all('#\{([a-z][a-z0-9_]*)\}#', $route, $m);

        return array_values(array_diff(array_unique($m[1]), ['slug']));
    }

    /**
     * Turns what an editor typed into a URL pattern: 'blog' and '/blog/'
     * become '/blog/{slug}', '/' becomes '/{slug}' (site root), patterns
     * with {slug} are kept. Empty means "follow the handle" (null).
     */
    public static function normalizeRoute(mixed $route): ?string
    {
        if (! is_string($route) || trim($route) === '') {
            return null;
        }

        $route = '/'.trim(preg_replace('#/+#', '/', trim($route)) ?? '', '/');
        if (! str_contains($route, '{slug}')) {
            $route = rtrim($route, '/').'/{slug}';
        }

        return $route;
    }

    /** Sort choices for a collection's entries: setting value => column. */
    public const SORTS = [
        'manual' => 'sort_order',
        'published_at' => 'published_at',
        'created_at' => 'created_at',
        'updated_at' => 'updated_at',
        'title' => 'title',
    ];

    /**
     * How entries are ordered when a query doesn't say: settings.sort
     * (manual | published_at | created_at | updated_at | title) and
     * settings.sort_direction. Manual means the drag-and-drop order.
     *
     * @return array{0: string, 1: 'asc'|'desc'}
     */
    public function defaultSort(): array
    {
        $sort = (string) $this->setting('sort', 'published_at');
        $column = self::SORTS[$sort] ?? 'published_at';
        $direction = $this->setting('sort_direction') ?? ($column === 'sort_order' || $column === 'title' ? 'asc' : 'desc');

        return [$column, $direction === 'asc' ? 'asc' : 'desc'];
    }

    /**
     * Whether entries get their own page (settings.has_single, on by
     * default). Off: the collection is a list of information shown by
     * templates; its entries have no URL.
     */
    /** Entries can have a parent entry; their URLs nest under it. */
    public function isHierarchical(): bool
    {
        return (bool) $this->setting('hierarchical', false) && $this->hasSinglePages();
    }

    public function hasSinglePages(): bool
    {
        return $this->setting('has_single', true) !== false;
    }

    /**
     * The listing page's heading and intro in a language, falling back
     * to the main language: ['title' => ?string, 'intro' => ?string].
     *
     * @return array{title: string|null, intro: string|null}
     */
    public function archiveText(?string $locale = null): array
    {
        $byLocale = static::archiveByLocale($this->archive_data);
        $locale ??= Locales::current();
        $own = $byLocale[$locale] ?? [];
        $main = $byLocale[Locales::main()] ?? [];

        return [
            'title' => ($own['title'] ?? null) ?: ($main['title'] ?? null),
            'intro' => ($own['intro'] ?? null) ?: ($main['intro'] ?? null),
        ];
    }

    /**
     * archive_data as {locale: {title, intro}}. Older data stored one
     * {title, intro} for all languages: it counts as the main language.
     *
     * @param  array<string, mixed>|null  $data
     * @return array<string, array<string, string>>
     */
    public static function archiveByLocale(?array $data): array
    {
        $data ??= [];
        if (array_key_exists('title', $data) || array_key_exists('intro', $data)) {
            $legacy = array_filter(['title' => $data['title'] ?? null, 'intro' => $data['intro'] ?? null], 'is_string');
            $data = array_diff_key($data, ['title' => 1, 'intro' => 1]);
            $data[Locales::main()] = ($data[Locales::main()] ?? []) + $legacy;
        }

        return array_filter($data, 'is_array');
    }

    /**
     * The listing page's custom field values in a language: the main
     * language's values with this language's translatable ones laid over
     * (like entries), raw (not hydrated).
     *
     * @return array<string, mixed>
     */
    public function archiveFields(?string $locale = null): array
    {
        $locale ??= Locales::current();
        $byLocale = static::archiveByLocale($this->archive_data);
        $main = (array) ($byLocale[Locales::main()]['data'] ?? []);
        if (Locales::isMain($locale)) {
            return $main;
        }

        $overlay = (array) ($byLocale[$locale]['data'] ?? []);
        $schema = $this->archiveSchema();

        return $schema === null ? $main : TranslationOverlay::merge($schema->fields(), $main, $overlay);
    }

    /**
     * A listing-page field for templates, hydrated like entry fields
     * (asset → Asset, rich text → HTML, …): $collection->archive('hero_image').
     */
    public function archive(string $handle, ?string $locale = null): mixed
    {
        $locale ??= Locales::current();
        $value = $this->archiveFields($locale)[$handle] ?? null;
        $schema = $this->archiveSchema();

        return $schema === null ? $value : $schema->hydrateField($handle, $value, new HydrationContext($locale));
    }

    /** @var array{0: mixed, 1: BlueprintSchema|null}|null */
    protected ?array $archiveSchemaCache = null;

    /**
     * Fields of the listing page (Structure → Collections → Listing
     * blueprint), or null when none is chosen.
     */
    public function archiveSchema(): ?BlueprintSchema
    {
        $id = $this->setting('archive_blueprint_id');
        if ($this->archiveSchemaCache === null || $this->archiveSchemaCache[0] !== $id) {
            $blueprint = $id ? Blueprint::find($id) : null;
            $this->archiveSchemaCache = [$id, $blueprint?->schema()];
        }

        return $this->archiveSchemaCache[1];
    }
}
