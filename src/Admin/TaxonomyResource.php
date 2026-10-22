<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Field;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Link;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\ActionFailed;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Admin\Support\Card;
use Sunrice\Cms\Actions\Collections\PurgeDeleted;
use Sunrice\Cms\Actions\Collections\RestoreDeleted;
use Sunrice\Cms\Actions\Taxonomies\AttachCollections;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\RouteConflicts;
use Sunrice\Cms\Site\RoutePatternRule;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * Structure → Taxonomies, guarded by the cms.taxonomies.* permissions.
 * Their terms are edited under Content → Terms. Deleting a taxonomy keeps
 * its terms.
 *
 * @internal
 */
final class TaxonomyResource extends Resource
{
    protected static string $model = Taxonomy::class;

    public static function navigationGroup(): string
    {
        return 'Structure';
    }

    public static function navigationIcon(): string
    {
        return 'tags';
    }

    public static function navigationSort(): int
    {
        return 93;
    }

    public static function recordKey(): string
    {
        return 'handle';
    }

    /** Which blueprints give entries (or anything else) its terms: a terms field for it. */
    public static function aside(Model $record, Authorizable $user): array
    {
        if (! $record instanceof Taxonomy) {
            return [];
        }

        return [Card::make('Terms fields')->description('Editors choose its terms through a terms field. These blueprints have one:')
            ->list('Blueprints', array_map(fn (array $found): array => ['label' => $found['blueprint']->title, 'meta' => $found['field']], AttachCollections::blueprintsWithField($record)),
                'None yet: tick a collection to add one to its blueprints, or add a Terms field in a blueprint.')
            ->link('Blueprints', route('sunrice.admin.cms.blueprints.index', [], false))];
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('General')->columns(2)->schema([
                TextInput::make('title')->required(),
                ...HandleField::make('taxonomy', 'A short name for this taxonomy, used by the site\'s templates.'),
                ...TranslatedFields::make('title', fn (string $name, string $language) => TextInput::make($name)->label(__('Title in :language', ['language' => $language]))->maxLength(255)
                    ->placeholder('As the title')->help(__('What visitors read in :language on its term pages.', ['language' => $language]))),
                Toggle::make('hierarchical')->label('Nested terms')->span(2)->help('Terms can sit under other terms, like subcategories.'),
                CheckboxList::make('collections')->span(2)
                    ->help('Ticking a collection adds a terms field for this taxonomy to its blueprints (when they have none), so editors choose terms on its entries, and its entries list filters by them.')
                    ->verbatim()->options(fn () => Collection::query()->orderBy('title')->get()->mapWithKeys(fn (Collection $c): array => [(string) $c->id => $c->title])->all())
                    ->loadUsing(fn (Model $taxonomy): array => $taxonomy instanceof Taxonomy
                        ? $taxonomy->collections()->get(['sunrice_collections.id'])->map(fn (Collection $c): string => (string) $c->id)->all()
                        : [])
                    ->saveUsing(function (Model $taxonomy, mixed $ids): void {
                        if ($taxonomy instanceof Taxonomy) {
                            app(AttachCollections::class)->handle($taxonomy, array_values(array_map(intval(...), array_filter(is_array($ids) ? $ids : [], is_numeric(...)))), request()->boolean('remove_term_fields'));
                        }
                    }),
                // Asked only once the collections change: read by the collections' saveUsing, never stored.
                Toggle::make('remove_term_fields')->label('Also remove the terms field from collections you untick')->span(2)->onlyOnEdit()->showWhenChanged('collections')
                    ->help('Off: their blueprints keep the field, and entries keep their terms. On: the field goes from blueprints no ticked collection uses; what entries chose stays stored, out of sight.')
                    ->loadUsing(fn (): bool => false)->saveUsing(fn (): null => null),
                Select::make('blueprint')->label('Term fields')->span(2)
                    ->verbatim()->options(BlueprintChoices::options(BlueprintChoices::CONTENT))
                    ->help('Extra fields for each term, like a description or an image.'),
                Select::make('index_blueprint')->label('Index page fields')->span(2)->placeholder('None (no editable fields)')
                    ->verbatim()->options(BlueprintChoices::options(BlueprintChoices::CONTENT, 'index_blueprint'))
                    ->help('Gives its index pages (the shared one, and each collection\'s) their own fields, such as an intro. Editors fill them in under Terms → ⋮ → Index page.')
                    ->helpDetails('Which file?', TemplateHelp::files(['cms.taxonomy-{handle}-index', 'cms.taxonomy-index'])."\n".__('In a collection, :file is tried first.', ['file' => '`cms/{collection}/{handle}-index.blade.php`']))
                    ->links([
                        Link::make('Create blueprint', route('sunrice.admin.cms.blueprints.create', [], false))->showUnless('index_blueprint'),
                        Link::make('Edit', route('sunrice.admin.cms.blueprints.index', [], false).'/{index_blueprint}/edit')->showWhen('index_blueprint'),
                    ]),
            ]),
            Section::make('Term pages in collections')->description('Each collection it groups can have a page per term listing only that collection\'s entries, like /books/tags/featured, and an index page of the terms its entries have, like /books/tags.')->columns(2)
                ->schema(self::collectionTermFields()),
            Section::make('Shared term pages')->description('A page per term listing its entries from every collection, like /tags/featured, and an index page of all its terms, like /tags.')->columns(2)
                ->links(function (?Model $taxonomy): array {
                    $term = $taxonomy instanceof Taxonomy && $taxonomy->route !== null ? $taxonomy->terms()->with('translations')->orderBy('id')->first() : null;
                    $url = $term?->url(Locales::default());
                    $index = $taxonomy instanceof Taxonomy && $taxonomy->index_route !== null ? $taxonomy->indexUrl(Locales::default()) : null;

                    return array_values(array_filter([
                        $url !== null ? Link::make('View a term page', $url)->newTab()->showWhen('pages') : null,
                        $index !== null ? Link::make('View the index page', $index)->newTab()->showWhen('index') : null,
                        $taxonomy instanceof Taxonomy && $taxonomy->index_route !== null
                            ? Link::make('Edit index page', route('sunrice.admin.cms.taxonomies.index-page.edit', $taxonomy->handle, false))->showWhen('index') : null,
                    ]));
                })
                ->schema([
                    Toggle::make('pages')->label('Shared term pages')->default(false)->span(2)
                        ->help('Worth it when several collections share this taxonomy. With one, its collection\'s term pages list the same entries.')
                        ->loadUsing(fn (Model $taxonomy): bool => $taxonomy->getAttribute('route') !== null)
                        ->saveUsing(fn (Model $taxonomy, mixed $on) => CollectionResource::switchPage($taxonomy, 'route', $on, '/{handle}/{slug}')),
                    RouteInput::make('route')->language(null, 'route')->label('Shared term page URL')->placeholder('/{handle}/{slug}')->unique()->span(2)->showWhen('pages')
                        ->rules([new RoutePatternRule(parameters: false)])
                        ->help('Like /topics/{slug}. Empty: /{handle}/{slug}.'),
                    ...TranslatedFields::routes('route', fn (RouteInput $input, string $code, string $language) => $input
                        ->label(__('Shared term page URL in :language', ['language' => $language]))->placeholderFrom('route', '/{handle}/{slug}')->span(2)->showWhen('pages')
                        ->rules([new RoutePatternRule(parameters: false)])
                        ->help(__('Its own address in :language, like /topik/{slug}. Empty: the term page URL under :prefix.', ['language' => $language, 'prefix' => Locales::prefix($code) ?: '/']))
                        ->links(function (?Model $taxonomy) use ($code): array {
                            $term = $taxonomy instanceof Taxonomy && $taxonomy->route !== null ? $taxonomy->terms()->with('translations')->orderBy('id')->first() : null;
                            $url = $term?->url($code);

                            return $url !== null ? [Link::make('View a term page', $url)->newTab()->showWhen('pages')] : [];
                        })),
                    Toggle::make('index')->label('Shared index page')->default(false)->span(2)
                        ->help('A page listing all its terms, each linking to its page, like /tags.')
                        ->loadUsing(fn (Model $taxonomy): bool => $taxonomy->getAttribute('index_route') !== null)
                        ->saveUsing(fn (Model $taxonomy, mixed $on) => $taxonomy instanceof Taxonomy ? CollectionResource::switchPage($taxonomy, 'index_route', $on, '/'.str_replace('_', '-', $taxonomy->handle)) : null),
                    RouteInput::make('index_route')->language(null, 'index_route')->label('Shared index page URL')->placeholder('/{handle}')->unique()->span(2)->showWhen('index')
                        ->rules([CollectionResource::LISTING_ROUTE])
                        ->help('Like /tags. Empty: /{handle}.'),
                    ...TranslatedFields::routes('index_route', fn (RouteInput $input, string $code, string $language) => $input
                        ->label(__('Shared index page URL in :language', ['language' => $language]))->placeholderFrom('index_route', '/{handle}')->span(2)->showWhen('index')
                        ->rules([CollectionResource::LISTING_ROUTE])
                        ->help(__('Its own address in :language, like /tag. Empty: the index page URL under :prefix.', ['language' => $language, 'prefix' => Locales::prefix($code) ?: '/']))
                        ->links(fn (?Model $taxonomy): array => $taxonomy instanceof Taxonomy && $taxonomy->index_route !== null && ($url = $taxonomy->indexUrl($code)) !== null
                            ? [Link::make('View on site', $url)->newTab()->showWhen('index')] : [])),
                    TextInput::make('template')->label('Term page template')->placeholder('cms.topic')->span(2)
                        ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                        ->help('For shared and collections\' term pages. Empty: the first template that exists. A term can choose its own on its page.')
                        ->helpDetails('Which file?', TemplateHelp::files(['cms.taxonomy-{handle}', 'cms.term'], 'cms.topic')."\n".__('In a collection, :file is tried first.', ['file' => '`cms/{collection}/{handle}.blade.php`'])),
                ]),
        ]);
    }

    /**
     * For each collection, shown while it's ticked: whether this
     * taxonomy's terms have pages in it, and their URL (and each other
     * language's), stored on the attachment (CollectionTaxonomy).
     *
     * @return list<Field>
     */
    private static function collectionTermFields(): array
    {
        $fields = [];
        foreach (Collection::query()->orderBy('title')->get() as $collection) {
            $id = (string) $collection->id;
            $pivot = function (Model $taxonomy) use ($collection): ?CollectionTaxonomy {
                $p = $taxonomy instanceof Taxonomy && $taxonomy->exists ? $taxonomy->collections()->whereKey($collection->id)->first()?->getRelation('pivot') : null;

                return $p instanceof CollectionTaxonomy ? $p : null;
            };
            $fields[] = Toggle::make("term_pages_{$id}")->label(__('Term pages in :collection', ['collection' => $collection->title]))->span(2)->showWhen('collections', $id)
                ->help(__('A page per term with only :collection\'s entries, like :url.', ['collection' => $collection->title, 'url' => str_replace('{slug}', 'featured', CollectionTaxonomy::defaultPattern($collection, new Taxonomy(['handle' => '{handle}'])))]))
                ->loadUsing(fn (Model $taxonomy): bool => ($p = $pivot($taxonomy)) instanceof CollectionTaxonomy ? $p->term_pages : true)
                ->saveUsing(fn (Model $taxonomy, mixed $on) => self::savePivot($taxonomy, $collection, ['term_pages' => filter_var($on, FILTER_VALIDATE_BOOL)]));
            foreach (Locales::names() as $code => $language) {
                $main = $code === Locales::default();
                $field = $main ? "term_route_{$id}" : 'term_route_'.$id.'_'.preg_replace('/[^A-Za-z0-9]/', '_', $code);
                $fields[] = TextInput::make($field)->span(2)->showWhen('collections', $id)
                    ->label($main ? __(':collection: term page URL', ['collection' => $collection->title]) : __(':collection: term page URL in :language', ['collection' => $collection->title, 'language' => $language]))
                    ->placeholder($main ? '{listing}/{handle}/{slug}' : '')
                    ->rules(['nullable', 'string', 'max:255', new RoutePatternRule(parameters: false)])
                    ->help($main ? __('Empty: under :collection\'s listing page, like :url.', ['collection' => $collection->title, 'url' => CollectionTaxonomy::defaultPattern($collection, new Taxonomy(['handle' => '{handle}']))])
                        : __('Its own address in :language. Empty: the one above, else under :collection\'s listing page there.', ['language' => $language, 'collection' => $collection->title]))
                    ->loadUsing(function (Model $taxonomy) use ($pivot, $main, $code): ?string {
                        $p = $pivot($taxonomy);

                        return $p === null ? null : ($main ? $p->term_route : ($p->term_routes[$code] ?? null));
                    })
                    ->saveUsing(function (Model $taxonomy, mixed $value) use ($collection, $main, $code, $field): void {
                        $value = is_string($value) && trim($value) !== '' ? trim($value) : null;
                        if (! $taxonomy instanceof Taxonomy) {
                            return;
                        }
                        $p = $taxonomy->collections()->whereKey($collection->id)->first()?->getRelation('pivot');
                        if (! $p instanceof CollectionTaxonomy) {
                            return;
                        }
                        if ($value !== null && $p->term_pages && ($other = RouteConflicts::forTermPages($collection, $taxonomy, $code, $value)) !== null) {
                            throw ValidationException::withMessages([$field => __(':title has this URL in :language already.', ['title' => $other, 'language' => Locales::name($code)])]);
                        }
                        if ($main) {
                            self::savePivot($taxonomy, $collection, ['term_route' => $value]);
                        } else {
                            $own = $p->term_routes ?? [];
                            if ($value === null) {
                                unset($own[$code]);
                            } else {
                                $own[$code] = $value;
                            }
                            self::savePivot($taxonomy, $collection, ['term_routes' => $own === [] ? null : $own]);
                        }
                    });
            }
            array_push($fields, ...self::collectionIndexFields($collection, $pivot));
        }

        return $fields;
    }

    /**
     * For a collection, shown while it's ticked: whether this taxonomy has
     * an index page in it, and its URL (and each other language's),
     * stored on the attachment (CollectionTaxonomy).
     *
     * @param  \Closure(Model): ?CollectionTaxonomy  $pivot
     * @return list<Field>
     */
    private static function collectionIndexFields(Collection $collection, \Closure $pivot): array
    {
        $id = (string) $collection->id;
        $example = CollectionTaxonomy::defaultIndexPath($collection, new Taxonomy(['handle' => '{handle}']));
        $fields = [Toggle::make("index_page_{$id}")->label(__('Index page in :collection', ['collection' => $collection->title]))->span(2)->showWhen('collections', $id)
            ->help(__('A page listing the terms :collection\'s entries have, like :url.', ['collection' => $collection->title, 'url' => $example]))
            ->loadUsing(fn (Model $taxonomy): bool => ($p = $pivot($taxonomy)) instanceof CollectionTaxonomy ? $p->index_page : true)
            ->saveUsing(fn (Model $taxonomy, mixed $on) => self::savePivot($taxonomy, $collection, ['index_page' => filter_var($on, FILTER_VALIDATE_BOOL)]))];
        foreach (Locales::names() as $code => $language) {
            $main = $code === Locales::default();
            $field = $main ? "index_route_{$id}" : 'index_route_'.$id.'_'.preg_replace('/[^A-Za-z0-9]/', '_', $code);
            $fields[] = TextInput::make($field)->span(2)->showWhen('collections', $id)
                ->label($main ? __(':collection: index page URL', ['collection' => $collection->title]) : __(':collection: index page URL in :language', ['collection' => $collection->title, 'language' => $language]))
                ->placeholder($main ? '{listing}/{handle}' : '')
                ->rules(['nullable', 'string', 'max:255', CollectionResource::LISTING_ROUTE])
                ->help($main ? __('Empty: under :collection\'s listing page, like :url.', ['collection' => $collection->title, 'url' => $example])
                    : __('Its own address in :language. Empty: the one above, else under :collection\'s listing page there.', ['language' => $language, 'collection' => $collection->title]))
                ->links(function (?Model $taxonomy) use ($collection, $code, $pivot): array {
                    // From the attachment as stored (the site's routes may be cached).
                    $p = $taxonomy instanceof Taxonomy ? $pivot($taxonomy) : null;
                    $url = $p !== null && $p->index_page ? url(Locales::prefix($code).$p->indexPath($collection, $taxonomy, $code)) : null;

                    return array_values(array_filter([
                        $url !== null ? Link::make('View on site', $url)->newTab() : null,
                        $url !== null && $code === Locales::default()
                            ? Link::make('Edit index page', route('sunrice.admin.cms.taxonomies.index-page.edit', ['taxonomy' => $taxonomy->handle, 'collection' => $collection->handle], false)) : null,
                    ]));
                })
                ->loadUsing(function (Model $taxonomy) use ($pivot, $main, $code): ?string {
                    $p = $pivot($taxonomy);

                    return $p === null ? null : ($main ? $p->index_route : ($p->index_routes[$code] ?? null));
                })
                ->saveUsing(function (Model $taxonomy, mixed $value) use ($collection, $main, $code, $field): void {
                    $value = is_string($value) && trim($value) !== '' ? trim($value) : null;
                    if (! $taxonomy instanceof Taxonomy) {
                        return;
                    }
                    $p = $taxonomy->collections()->whereKey($collection->id)->first()?->getRelation('pivot');
                    if (! $p instanceof CollectionTaxonomy) {
                        return;
                    }
                    if ($value !== null && $p->index_page && ($other = RouteConflicts::forIndexPage($collection, $taxonomy, $code, $value)) !== null) {
                        throw ValidationException::withMessages([$field => __(':title has this URL in :language already.', ['title' => $other, 'language' => Locales::name($code)])]);
                    }
                    if ($main) {
                        self::savePivot($taxonomy, $collection, ['index_route' => $value]);
                    } else {
                        $own = $p->index_routes ?? [];
                        if ($value === null) {
                            unset($own[$code]);
                        } else {
                            $own[$code] = $value;
                        }
                        self::savePivot($taxonomy, $collection, ['index_routes' => $own === [] ? null : $own]);
                    }
                });
        }

        return $fields;
    }

    /**
     * Writes a taxonomy's attachment to a collection (when attached), and
     * the site's routes start again.
     *
     * @param  array<string, mixed>  $values
     */
    private static function savePivot(Model $taxonomy, Collection $collection, array $values): void
    {
        if ($taxonomy instanceof Taxonomy && $taxonomy->collections()->whereKey($collection->id)->exists()) {
            $taxonomy->collections()->updateExistingPivot($collection->id, $values);
            app(SiteCache::class)->changed('term pages');
        }
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::make('title')->searchable()->sortable(),
                Column::make('handle')->searchable(),
                Column::make('hierarchical')->label('Nested')->boolean(),
                Column::make('collections.title')->label('Collections'),
            ])
            ->defaultSort('title');
    }

    /** Deleted ones keep their terms: the list's trash brings them back. */
    public static function restoreRecord(Model $record): void
    {
        if ($record instanceof Taxonomy) {
            try {
                app(RestoreDeleted::class)->taxonomy($record);
            } catch (ValidationException $e) {
                throw new ActionFailed(implode(' ', $e->validator->errors()->all()));
            }
        }
    }

    /** Permanently deleted from the trash: with the terms it kept (PurgeDeleted), which frees its handle. */
    public static function forceDeleteRecord(Model $record): void
    {
        if ($record instanceof Taxonomy) {
            app(PurgeDeleted::class)->taxonomy($record);
        }
    }
}
