<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Link;
use Sunrice\Admin\Resources\Forms\NumberInput;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\ActionFailed;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Actions\Collections\PurgeDeleted;
use Sunrice\Cms\Actions\Collections\RestoreDeleted;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Site\RoutePatternRule;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\StructuredData;

/**
 * The Collections screens (Structure → Collections), guarded by the
 * cms.collections.* permissions. Deleting a collection keeps its entries.
 *
 * @internal
 */
final class CollectionResource extends Resource
{
    protected static string $model = Collection::class;

    /** A listing page's URL: a path of lowercase segments, like /blog. */
    public const LISTING_ROUTE = 'regex:#^(/[a-z0-9\-_]+)+$#';

    public static function navigationGroup(): string
    {
        return 'Structure';
    }

    public static function navigationIcon(): string
    {
        return 'library';
    }

    public static function navigationSort(): int
    {
        return 90;
    }

    public static function recordKey(): string
    {
        return 'handle';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('General')->columns(2)->schema([
                TextInput::make('title')->required(),
                ...HandleField::make('collection', 'A short name for this collection, used by the site\'s templates.'),
                ...TranslatedFields::make('title', fn (string $name, string $language) => TextInput::make($name)->label(__('Title in :language', ['language' => $language]))->maxLength(255)
                    ->placeholder('As the title')->help(__('What visitors read in :language: the listing page, breadcrumbs, menus.', ['language' => $language]))),
                Select::make('blueprint')->verbatim()->options(BlueprintChoices::options(BlueprintChoices::CONTENT))
                    ->help('The fields its entries have. Blueprints of forms and global sets aren\'t offered.'),
                CheckboxList::make('blueprints')->label('Other blueprints')->verbatim()->options(BlueprintChoices::options(BlueprintChoices::CONTENT, 'blueprints'))->span(2)
                    ->help('Blueprints an entry can switch to in its Page settings.'),
                Toggle::make('translatable')->label('Translatable')->default(true)->span(2)
                    ->help('Entries can have a version in each language. Off: the main language only.'),
            ]),
            Section::make('Order')->description('How its entries are listed, on the site and in the admin.')->columns(2)->schema([
                Toggle::make('dated')->label('Dated entries')->help('Entries have a date and list newest first.'),
                Toggle::make('ordered')->label('Manual order')->help('Drag entries into order on the entries list.'),
            ]),
            Section::make('Entry pages')->description('Whether each entry is a page on the site, and how.')->columns(2)
                ->links(fn (?Model $collection): array => $collection instanceof Collection
                    ? [Link::make('View entries', route('sunrice.admin.cms.collections.entries.index', $collection->handle, false))]
                    : [])
                ->schema([
                    Toggle::make('pages')->label('Each entry has its own page')->default(true)->span(2)
                        ->help('Off: entries have no address, like FAQs or team members shown by a template.')
                        ->loadUsing(fn (Model $collection): bool => $collection->getAttribute('route') !== null)
                        ->saveUsing(fn (Model $collection, mixed $on) => self::switchPage($collection, 'route', $on, '/{handle}/{slug}')),
                    RouteInput::make('route')->language(null, 'route')->label('Entry URL')->placeholder('/{handle}/{slug}')->unique()->span(2)->showWhen('pages')
                        ->rules([new RoutePatternRule])
                        ->help('Like /blog/{slug}, or / for the site root. Empty: /{handle}/{slug}.'),
                    ...TranslatedFields::routes('route', fn (RouteInput $input, string $code, string $language) => $input
                        ->label(__('Entry URL in :language', ['language' => $language]))->placeholderFrom('route', '/{handle}/{slug}')->span(2)->showWhen('pages')
                        ->rules([new RoutePatternRule])
                        ->help(__('Its own address in :language, like /buku/{slug}. Empty: the entry URL under :prefix.', ['language' => $language, 'prefix' => Locales::prefix($code) ?: '/']))),
                    Toggle::make('hierarchical')->label('Hierarchical')->showWhen('pages')
                        ->help('Entries can sit under a parent entry, like pages under pages.'),
                    Toggle::make('comments')->label('Allow comments')->showWhen('pages')
                        ->help('Visitors can comment on its entries.'),
                    TextInput::make('template')->label('Entry template')->placeholder('cms.article')->showWhen('pages')
                        ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                        ->help('Empty: the first template that exists. An entry can choose its own in its Page settings.')
                        ->helpDetails('Which file?', TemplateHelp::files(['cms.collections.{handle}.show', 'cms.collections.show'], 'cms.article')."\n".__('Before this template, :file is tried for the entry with that slug in the main language.', ['file' => '`cms/collections/{handle}/{slug}.blade.php`'])),
                    Select::make('schema_type')->label('Structured data type')->options(StructuredData::ENTRY_TYPES)->showWhen('pages')
                        ->help('What search engines are told its entries are. Empty: Article if dated, else Web page.'),
                ]),
            Section::make('Listing page')->description('A page listing its entries, like /blog.')->columns(2)
                ->links(fn (?Model $collection): array => $collection instanceof Collection ? array_values(array_filter([
                    ($url = $collection->listingUrl(Locales::default())) !== null ? Link::make('View on site', $url)->newTab()->showWhen('listing') : null,
                    Link::make('Edit listing page', route('sunrice.admin.cms.collections.listing.edit', $collection->handle, false))->showWhen('listing_blueprint'),
                ])) : [])
                ->schema([
                    Toggle::make('listing')->label('Has a listing page')->span(2)
                        ->loadUsing(fn (Model $collection): bool => $collection->getAttribute('listing_route') !== null)
                        ->saveUsing(fn (Model $collection, mixed $on) => self::switchPage($collection, 'listing_route', $on, '/{handle}')),
                    RouteInput::make('listing_route')->language(null, 'listing_route')->label('Listing page URL')->placeholder('/{handle}')->unique()->span(2)->showWhen('listing')
                        ->rules([self::LISTING_ROUTE])
                        ->help('Like /blog. Empty: /{handle}.'),
                    ...TranslatedFields::routes('listing_route', fn (RouteInput $input, string $code, string $language) => $input
                        ->label(__('Listing page URL in :language', ['language' => $language]))->placeholderFrom('listing_route', '/{handle}')->span(2)->showWhen('listing')
                        ->rules([self::LISTING_ROUTE])
                        ->help(__('Its own address in :language, like /buku. Empty: the listing page URL under :prefix.', ['language' => $language, 'prefix' => Locales::prefix($code) ?: '/']))
                        ->links(fn (?Model $collection): array => $collection instanceof Collection && ($url = $collection->listingUrl($code)) !== null
                            ? [Link::make('View on site', $url)->newTab()->showWhen('listing')] : [])),
                    Select::make('listing_blueprint')->label('Listing page blueprint')->placeholder('None (no editable fields)')->verbatim()
                        ->options(BlueprintChoices::options(BlueprintChoices::CONTENT, 'listing_blueprint'))->showWhen('listing')
                        ->help('Gives the listing page (:url) its own fields, such as an intro or a hero image. Editors fill them in under Entries → :collection → Listing page.')
                        ->helpValues(['url' => ['listing_route', '/{handle}'], 'collection' => ['title']])
                        ->links([
                            Link::make('Create blueprint', route('sunrice.admin.cms.blueprints.create', [], false))->showUnless('listing_blueprint'),
                            Link::make('Edit', route('sunrice.admin.cms.blueprints.index', [], false).'/{listing_blueprint}/edit')->showWhen('listing_blueprint'),
                        ]),
                    NumberInput::make('per_page')->label('Entries per page')->integer()->min(1)->max(100)->default(10)->showWhen('listing'),
                    TextInput::make('listing_template')->label('Listing page template')->placeholder('cms.blog-home')->span(2)->showWhen('listing')
                        ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                        ->help('Empty: the first template that exists.')
                        ->helpDetails('Which file?', TemplateHelp::files(['cms.collections.{handle}.index', 'cms.collections.index'], 'cms.blog-home')),
                ]),
        ]);
    }

    /**
     * Entry pages, the listing page or a taxonomy's term pages switched on
     * or off: off clears the address, on without one gives the default
     * (with the handle in it). Not sent (null): the address as given.
     */
    public static function switchPage(Model $collection, string $attribute, mixed $on, string $default): void
    {
        if ($on === null) {
            return;
        }
        $on = filter_var($on, FILTER_VALIDATE_BOOL);
        $address = $collection->getAttribute($attribute);
        $handle = $collection->getAttribute('handle');
        $next = $on ? ($address ?? str_replace('{handle}', is_string($handle) ? $handle : '', $default)) : null;
        if ($next !== $address) {
            $collection->setAttribute($attribute, $next);
            $collection->save();
        }
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::make('title')->searchable()->sortable(),
                Column::make('handle')->searchable(),
                Column::make('blueprint'),
                Column::make('route')->label('URL'),
                Column::make('dated')->boolean(),
            ])
            ->defaultSort('title');
    }

    /** Deleted ones keep their entries: the list's trash brings them back. */
    public static function restoreRecord(Model $record): void
    {
        if ($record instanceof Collection) {
            try {
                app(RestoreDeleted::class)->collection($record);
            } catch (ValidationException $e) {
                throw new ActionFailed(implode(' ', $e->validator->errors()->all()));
            }
        }
    }

    /** Permanently deleted from the trash: with the entries it kept (PurgeDeleted), which frees its handle. */
    public static function forceDeleteRecord(Model $record): void
    {
        if ($record instanceof Collection) {
            app(PurgeDeleted::class)->collection($record);
        }
    }
}
