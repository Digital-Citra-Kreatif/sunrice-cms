<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\NumberInput;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\ActionFailed;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Actions\Collections\RestoreDeleted;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Site\RoutePatternRule;
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
            Section::make('Entry pages')->description('Whether each entry is a page on the site, and how.')->columns(2)->schema([
                Toggle::make('pages')->label('Each entry has its own page')->default(true)->span(2)
                    ->help('Off: entries have no address, like FAQs or team members shown by a template.')
                    ->loadUsing(fn (Model $collection): bool => $collection->getAttribute('route') !== null)
                    ->saveUsing(fn (Model $collection, mixed $on) => self::switchPage($collection, 'route', $on, '/{handle}/{slug}')),
                TextInput::make('route')->label('Entry URL')->placeholder('/{handle}/{slug}')->unique()->span(2)->showWhen('pages')
                    ->rules([new RoutePatternRule])
                    ->help('Like /blog/{slug}, or / for the site root. Empty: /{handle}/{slug}.'),
                Toggle::make('hierarchical')->label('Hierarchical')->showWhen('pages')
                    ->help('Entries can sit under a parent entry, like pages under pages.'),
                Toggle::make('comments')->label('Allow comments')->showWhen('pages')
                    ->help('Visitors can comment on its entries.'),
                TextInput::make('template')->label('Entry template')->placeholder('cms.article')->showWhen('pages')
                    ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                    ->help(TemplateHelp::text('cms.article', ['cms.{handle}', 'cms.entry'])."\n".__('An entry can choose its own in its Page settings.')),
                Select::make('schema_type')->label('Structured data type')->options(StructuredData::ENTRY_TYPES)->showWhen('pages')
                    ->help('What search engines are told its entries are. Empty: Article if dated, else Web page.'),
            ]),
            Section::make('Listing page')->description('A page listing its entries, like /blog.')->columns(2)->schema([
                Toggle::make('listing')->label('Has a listing page')->span(2)
                    ->loadUsing(fn (Model $collection): bool => $collection->getAttribute('listing_route') !== null)
                    ->saveUsing(fn (Model $collection, mixed $on) => self::switchPage($collection, 'listing_route', $on, '/{handle}')),
                TextInput::make('listing_route')->label('Listing page URL')->placeholder('/{handle}')->unique()->maxLength(255)->span(2)->showWhen('listing')
                    ->rules(['regex:#^(/[a-z0-9\-_]+)+$#'])
                    ->help(__('Empty: /{handle}. Its template is the first that exists, under resources/views:')."\n1. ".TemplateHelp::shortFile('cms.{handle}-listing')."\n2. ".TemplateHelp::shortFile('cms.listing')."\n3. ".__('the built-in template')),
                Select::make('listing_blueprint')->label('Listing page fields')->verbatim()->options(BlueprintChoices::options(BlueprintChoices::CONTENT, 'listing_blueprint'))->showWhen('listing')
                    ->help('Fields of the listing page itself, like an intro.'),
                NumberInput::make('per_page')->label('Entries per page')->integer()->min(1)->max(100)->default(10)->showWhen('listing'),
            ]),
        ]);
    }

    /**
     * Entry pages or the listing page switched on or off: off clears the
     * address, on without one gives the default (with the handle in it).
     * Not sent (null): the address as given.
     */
    private static function switchPage(Model $collection, string $attribute, mixed $on, string $default): void
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
}
