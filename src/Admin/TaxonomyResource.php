<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
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
use Sunrice\Cms\Site\TemplateLookup;
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

    /** @var \WeakMap<Taxonomy, list<int>>|null the collections a save just ticked, by taxonomy, for savePivots() */
    private static ?\WeakMap $attached = null;

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

    /** The collections it groups, with their entries' filter by it, and its terms. */
    public static function aside(Model $record, Authorizable $user): array
    {
        if (! $record instanceof Taxonomy) {
            return [];
        }
        $collections = $record->loadMissing('collections')->collections->sortBy('title');

        return [Card::make('Collections')->description('Their entries get its terms in the entry editor\'s Taxonomies card.')
            ->list('Collections', array_values($collections->map(fn (Collection $collection): array => [
                'label' => $collection->title,
                'meta' => self::pivot($record, $collection)?->single === true ? __('One term only') : __('Several terms'),
            ])->all()), 'None yet: tick the collections whose entries it groups.')
            ->link('Terms', route('sunrice.admin.cms.taxonomies.terms.index', $record->handle, false))];
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('General')->columns(2)->schema([
                TextInput::make('title')->required(),
                ...HandleField::make('taxonomy', 'A short name for this taxonomy, used by the site\'s templates.'),
                ...TranslatedFields::make('title', fn (string $name, string $language) => TextInput::make($name)->label(__('Title in :language', ['language' => $language]))->maxLength(255)
                    ->placeholder('As the title')->help(__('What visitors read in :language on its term pages.', ['language' => $language]))),
                Select::make('blueprint')->span(2)
                    ->verbatim()->options(BlueprintChoices::options(BlueprintChoices::CONTENT))
                    ->help('The fields its terms have, like a description or an image. Blueprints of forms and global sets aren\'t offered.')
                    ->links(BlueprintLinks::field('blueprint')),
                Toggle::make('hierarchical')->label('Nested terms')->span(2)->help('Terms can sit under other terms, like subcategories.'),
            ]),
            // Like the collection form's Taxonomies: which collections, and each one's own settings under it.
            Section::make('Collections')->description('The collections whose entries it groups: editors choose its terms in the entry editor\'s Taxonomies card, and the entries list filters by them. Under each one ticked: whether an entry has one term only, and its own term pages and index page, like /books/tags/featured and /books/tags.')->columns(2)
                ->schema([
                    CheckboxList::make('collections')->label('Collections it groups')->span(2)
                        ->verbatim()->options(fn () => self::collections()->mapWithKeys(fn (Collection $c): array => [(string) $c->id => $c->title])->all())
                        ->loadUsing(fn (Model $taxonomy): array => $taxonomy instanceof Taxonomy && $taxonomy->exists
                            ? $taxonomy->loadMissing('collections')->collections->map(fn (Collection $c): string => (string) $c->id)->values()->all()
                            : [])
                        ->saveUsing(function (Model $taxonomy, mixed $ids): void {
                            if ($taxonomy instanceof Taxonomy) {
                                // Their URLs are checked with the form's values for them (savePivots()).
                                $result = app(AttachCollections::class)->handle($taxonomy, array_values(array_map(intval(...), array_filter(is_array($ids) ? $ids : [], is_numeric(...)))), checkRoutes: false);
                                self::$attached ??= new \WeakMap;
                                self::$attached[$taxonomy] = $result['attached'];
                                $taxonomy->unsetRelation('collections');
                            }
                        }),
                    ...self::collectionTermFields(),
                ]),
            Section::make('Term pages')->description('A page per term listing its entries. The shared ones list every collection\'s, like /tags/featured; each collection\'s own are set under Collections.')->columns(2)
                // Like the collection form's View entries.
                ->links(fn (?Model $taxonomy): array => $taxonomy instanceof Taxonomy
                    ? [Link::make('View terms', route('sunrice.admin.cms.taxonomies.terms.index', $taxonomy->handle, false))]
                    : [])
                ->schema([
                    Toggle::make('pages')->label('Shared term pages')->default(false)->span(2)
                        ->help('Worth it when several collections share this taxonomy. With one, its collection\'s term pages list the same entries.')
                        ->loadUsing(fn (Model $taxonomy): bool => $taxonomy->getAttribute('route') !== null)
                        // Saved after the collections' term and index page fields, which it writes (savePivots()).
                        ->saveUsing(function (Model $taxonomy, mixed $on): void {
                            self::savePivots($taxonomy);
                            CollectionResource::switchPage($taxonomy, 'route', $on, '/{handle}/{slug}');
                        }),
                    RouteInput::make('route')->language(null, 'route')->label('Shared term page URL')->placeholder('/{handle}/{slug}')->unique()->span(2)->showWhen('pages')
                        ->rules([new RoutePatternRule(parameters: false)])
                        ->help('Like /topics/{slug}. Empty: /{handle}/{slug}.'),
                    ...TranslatedFields::routes('route', fn (RouteInput $input, string $code, string $language) => $input
                        ->label(__('Shared term page URL in :language', ['language' => $language]))->placeholderFrom('route', '/{handle}/{slug}')->span(2)->showWhen('pages')
                        ->rules([new RoutePatternRule(parameters: false)])
                        ->help(__('Its own address in :language, like /topik/{slug}. Empty: the term page URL under :prefix.', ['language' => $language, 'prefix' => Locales::prefix($code) ?: '/']))),
                    TemplateHelp::select('template', 'cms.topic', 'For shared and collections\' term pages. Automatic: the first template that exists. A term can choose its own on its page.')
                        ->label('Term page template')->span(2)
                        ->helpDetails('Which file?', TemplateHelp::files(['cms.taxonomies.{handle}.show', 'cms.taxonomies.show'], 'cms.topic')."\n".__('Before this template, :file is tried for the term with that slug in the main language.', ['file' => '`cms/taxonomies/{handle}/{slug}.blade.php`'])."\n".__('In a collection, :slug and then :file are tried first.', ['slug' => '`cms/collections/{collection}/{handle}/{slug}.blade.php`', 'file' => '`cms/collections/{collection}/{handle}/show.blade.php`'])),
                ]),
            // Like the collection form's Listing page: its URL, fields and template, and its editor.
            Section::make('Index pages')->description('A page listing its terms. The shared one lists all of them, like /tags; each collection\'s own are set under Collections. Their fields and template are for both.')->columns(2)
                ->links(fn (?Model $taxonomy): array => $taxonomy instanceof Taxonomy && $taxonomy->index_route !== null ? array_values(array_filter([
                    ($index = $taxonomy->indexUrl(Locales::default())) !== null ? Link::make('View the index page', $index)->newTab()->showWhen('index') : null,
                    // Its fields (with an index page blueprint), SEO and template, per language.
                    Link::make('Edit index page', route('sunrice.admin.cms.taxonomies.index-page.edit', $taxonomy->handle, false))->showWhen('index'),
                ])) : [])
                ->schema([
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
                    Select::make('index_blueprint')->label('Index page blueprint')->span(2)->placeholder('None (no editable fields)')
                        ->verbatim()->options(BlueprintChoices::options(BlueprintChoices::CONTENT, 'index_blueprint'))
                        ->help('Gives its index pages (the shared one, and each collection\'s) their own fields, such as an intro. Editors fill them in under Terms → ⋮ → Index page.')
                        ->links(BlueprintLinks::field('index_blueprint')),
                    TemplateHelp::select('index_template', 'cms.tag-cloud', 'For its index pages, the shared one and each collection\'s. Automatic: the first template that exists.', fn (Model $taxonomy): array => $taxonomy instanceof Taxonomy ? TemplateLookup::index($taxonomy, null) : [])
                        ->label('Index page template')->span(2)
                        ->helpDetails('Which file?', TemplateHelp::files(['cms.taxonomies.{handle}.index', 'cms.taxonomies.index'], 'cms.tag-cloud')."\n".__('In a collection, :file is tried first.', ['file' => '`cms/collections/{collection}/{handle}/index.blade.php`'])),
                ]),
        ]);
    }

    /**
     * For each collection, shown while it's ticked: whether this
     * taxonomy's terms have pages in it, and their URL (and each other
     * language's), stored on the attachment (CollectionTaxonomy). Read
     * from the attachments as loaded; saving sets the values there, and
     * the shared term pages' switch, saved after them, writes each
     * attachment once (savePivots()).
     *
     * @return list<Field>
     */
    private static function collectionTermFields(): array
    {
        $fields = [];
        foreach (self::collections() as $collection) {
            $id = (string) $collection->id;
            $fields[] = Toggle::make("single_{$id}")->label('One term only')->group($collection->title)->span(2)->showWhen('collections', $id)
                ->help(__('An entry of :collection has one term of this taxonomy at most, chosen from a list.', ['collection' => $collection->title]))
                ->loadUsing(fn (Model $taxonomy): bool => self::pivot($taxonomy, $collection)->single ?? false)
                ->saveUsing(function (Model $taxonomy, mixed $on) use ($collection): void {
                    if ($on !== null) {
                        self::pivot($taxonomy, $collection)?->setAttribute('single', filter_var($on, FILTER_VALIDATE_BOOL));
                    }
                });
            $fields[] = Toggle::make("term_pages_{$id}")->label('Term pages')->group($collection->title)->span(2)->showWhen('collections', $id)
                ->help(fn (?Model $taxonomy): string => __('A page per term with only :collection\'s entries, like :url.', ['collection' => $collection->title, 'url' => str_replace('{slug}', 'featured', CollectionTaxonomy::defaultPattern($collection, self::exampleTaxonomy($taxonomy)))]))
                // On for a collection ticked when creating, as when attaching from the collection's form.
                ->default(true)
                ->loadUsing(fn (Model $taxonomy): bool => self::pivot($taxonomy, $collection)->term_pages ?? true)
                ->saveUsing(function (Model $taxonomy, mixed $on) use ($collection): void {
                    if ($on !== null) {
                        self::pivot($taxonomy, $collection)?->setAttribute('term_pages', filter_var($on, FILTER_VALIDATE_BOOL));
                    }
                });
            foreach (Locales::names() as $code => $language) {
                $main = $code === Locales::default();
                $fields[] = TextInput::make(self::pivotField('term', $collection, $code))->group($collection->title)->span(2)->showWhen('collections', $id)
                    ->label($main ? __('Term page URL') : __('Term page URL in :language', ['language' => $language]))
                    ->placeholder($main ? '{listing}/{handle}/{slug}' : '')
                    ->rules(['nullable', 'string', 'max:255', new RoutePatternRule(parameters: false)])
                    ->help(fn (?Model $taxonomy): string => $main ? __('Empty: under :collection\'s listing page, like :url.', ['collection' => $collection->title, 'url' => CollectionTaxonomy::defaultPattern($collection, self::exampleTaxonomy($taxonomy))])
                        : __('Its own address in :language. Empty: the one above, else under :collection\'s listing page there.', ['language' => $language, 'collection' => $collection->title]))
                    ->loadUsing(fn (Model $taxonomy): ?string => self::pivotRoute(self::pivot($taxonomy, $collection), 'term', $code))
                    ->saveUsing(fn (Model $taxonomy, mixed $value) => self::setPivotRoute(self::pivot($taxonomy, $collection), 'term', $code, $value));
            }
            array_push($fields, ...self::collectionIndexFields($collection));
        }

        return $fields;
    }

    /**
     * For a collection, shown while it's ticked: whether this taxonomy has
     * an index page in it, and its URL (and each other language's),
     * stored on the attachment (CollectionTaxonomy), as term pages are.
     *
     * @return list<Field>
     */
    private static function collectionIndexFields(Collection $collection): array
    {
        $id = (string) $collection->id;
        $example = fn (?Model $taxonomy): string => CollectionTaxonomy::defaultIndexPath($collection, self::exampleTaxonomy($taxonomy));
        $fields = [Toggle::make("index_page_{$id}")->label('Index page')->group($collection->title)->span(2)->showWhen('collections', $id)
            ->help(fn (?Model $taxonomy): string => __('A page listing the terms :collection\'s entries have, like :url.', ['collection' => $collection->title, 'url' => $example($taxonomy)]))
            ->default(true)
            ->loadUsing(fn (Model $taxonomy): bool => self::pivot($taxonomy, $collection)->index_page ?? true)
            ->saveUsing(function (Model $taxonomy, mixed $on) use ($collection): void {
                if ($on !== null) {
                    self::pivot($taxonomy, $collection)?->setAttribute('index_page', filter_var($on, FILTER_VALIDATE_BOOL));
                }
            })];
        foreach (Locales::names() as $code => $language) {
            $main = $code === Locales::default();
            $fields[] = TextInput::make(self::pivotField('index', $collection, $code))->group($collection->title)->span(2)->showWhen('collections', $id)
                ->label($main ? __('Index page URL') : __('Index page URL in :language', ['language' => $language]))
                ->placeholder($main ? '{listing}/{handle}' : '')
                ->rules(['nullable', 'string', 'max:255', CollectionResource::LISTING_ROUTE])
                ->help(fn (?Model $taxonomy): string => $main ? __('Empty: under :collection\'s listing page, like :url.', ['collection' => $collection->title, 'url' => $example($taxonomy)])
                    : __('Its own address in :language. Empty: the one above, else under :collection\'s listing page there.', ['language' => $language, 'collection' => $collection->title]))
                ->links(function (?Model $taxonomy) use ($collection, $code): array {
                    // From the attachment as stored (the site's routes may be cached).
                    $p = $taxonomy instanceof Taxonomy ? self::pivot($taxonomy, $collection) : null;
                    $url = $taxonomy instanceof Taxonomy && $p !== null && $p->index_page ? url(Locales::prefix($code).$p->indexPath($collection, $taxonomy, $code)) : null;

                    return array_values(array_filter([
                        $url !== null ? Link::make('View on site', $url)->newTab() : null,
                        $taxonomy instanceof Taxonomy && $url !== null && $code === Locales::default()
                            ? Link::make('Edit index page', route('sunrice.admin.cms.taxonomies.index-page.edit', ['taxonomy' => $taxonomy->handle, 'collection' => $collection->handle], false)) : null,
                    ]));
                })
                ->loadUsing(fn (Model $taxonomy): ?string => self::pivotRoute(self::pivot($taxonomy, $collection), 'index', $code))
                ->saveUsing(fn (Model $taxonomy, mixed $value) => self::setPivotRoute(self::pivot($taxonomy, $collection), 'index', $code, $value));
        }

        return $fields;
    }

    /** The taxonomy the help's example URLs are for: the one being edited, else {handle} while creating one. */
    private static function exampleTaxonomy(?Model $taxonomy): Taxonomy
    {
        return $taxonomy instanceof Taxonomy && $taxonomy->exists ? $taxonomy : new Taxonomy(['handle' => '{handle}']);
    }

    /**
     * Every collection, by title: read once per request, however many
     * times the form is built.
     *
     * @return EloquentCollection<int, Collection>
     */
    private static function collections(): EloquentCollection
    {
        $request = request();
        $collections = $request->attributes->get(self::class.'.collections');
        if (! $collections instanceof EloquentCollection) {
            $collections = Collection::query()->orderBy('title')->get();
            $request->attributes->set(self::class.'.collections', $collections);
        }

        /** @var EloquentCollection<int, Collection> $collections */
        return $collections;
    }

    /** A taxonomy's attachment to a collection, from its collections as loaded (one query for all); null when not attached. */
    private static function pivot(Model $taxonomy, Collection $collection): ?CollectionTaxonomy
    {
        if (! $taxonomy instanceof Taxonomy || ! $taxonomy->exists) {
            return null;
        }
        $pivot = $taxonomy->loadMissing('collections')->collections->firstWhere('id', $collection->id)?->getRelation('pivot');

        return $pivot instanceof CollectionTaxonomy ? $pivot : null;
    }

    /**
     * The form field of a collection's term page pattern (`term`) or index
     * page URL (`index`) in a language: term_route_3, index_route_3_id.
     *
     * @param  'term'|'index'  $page
     */
    private static function pivotField(string $page, Collection $collection, string $locale): string
    {
        $field = "{$page}_route_{$collection->id}";

        return $locale === Locales::default() ? $field : $field.'_'.preg_replace('/[^A-Za-z0-9]/', '_', $locale);
    }

    /**
     * An attachment's own term page pattern or index page URL in a language.
     *
     * @param  'term'|'index'  $page
     */
    private static function pivotRoute(?CollectionTaxonomy $pivot, string $page, string $locale): ?string
    {
        if ($pivot === null) {
            return null;
        }
        $main = $locale === Locales::default();

        return $page === 'term'
            ? ($main ? $pivot->term_route : ($pivot->term_routes[$locale] ?? null))
            : ($main ? $pivot->index_route : ($pivot->index_routes[$locale] ?? null));
    }

    /**
     * Sets an attachment's own term page pattern or index page URL in a
     * language, as loaded (savePivots() writes it): another language's
     * goes into term_routes or index_routes with the others'.
     *
     * @param  'term'|'index'  $page
     */
    private static function setPivotRoute(?CollectionTaxonomy $pivot, string $page, string $locale, mixed $value): void
    {
        if ($pivot === null) {
            return;
        }
        $value = is_string($value) && trim($value) !== '' ? trim($value) : null;
        if ($locale === Locales::default()) {
            $pivot->setAttribute("{$page}_route", $value);

            return;
        }
        $own = ($page === 'term' ? $pivot->term_routes : $pivot->index_routes) ?? [];
        if ($value === null) {
            unset($own[$locale]);
        } else {
            $own[$locale] = $value;
        }
        $pivot->setAttribute("{$page}_routes", $own === [] ? null : $own);
    }

    /**
     * Writes what the form changed on the taxonomy's attachments, one
     * update per attachment and none when nothing changed, then refuses
     * term or index pages (switched on) whose URL, as set or by default,
     * something else has in a language, when they changed or the
     * collection was just ticked. The site's routes start again once.
     *
     * @throws ValidationException
     */
    private static function savePivots(Model $taxonomy): void
    {
        if (! $taxonomy instanceof Taxonomy || ! $taxonomy->relationLoaded('collections')) {
            return;
        }
        $attached = self::$attached[$taxonomy] ?? [];
        self::$attached?->offsetUnset($taxonomy);
        $check = [];
        foreach ($taxonomy->collections as $collection) {
            $pivot = $collection->getRelation('pivot');
            if (! $pivot instanceof CollectionTaxonomy) {
                continue;
            }
            if ($pivot->isDirty()) {
                $pivot->save();
                $check[] = $collection;
            } elseif (in_array($collection->id, $attached, true)) {
                $check[] = $collection;
            }
        }
        if ($check === []) {
            return;
        }
        app(SiteCache::class)->changed('term pages');
        // Once all are written, so two swapping their URLs don't clash with each other.
        $errors = [];
        foreach ($check as $collection) {
            $pivot = $collection->getRelation('pivot');
            if ($pivot instanceof CollectionTaxonomy && ($clash = RouteConflicts::forAttachment($collection, $taxonomy, $pivot)) !== null) {
                $errors[self::pivotField($clash['page'], $collection, $clash['locale'])] = __(':title has this URL in :language already.', ['title' => $clash['title'], 'language' => Locales::name($clash['locale'])]);
            }
        }
        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
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
