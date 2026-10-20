<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\NumberInput;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Action;
use Sunrice\Admin\Resources\Tables\ActionFailed;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Filter;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Actions\Collections\RestoreDeleted;
use Sunrice\Cms\Models\Blueprint;
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

    public static function form(Form $form): Form
    {
        $blueprints = fn (): array => Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all();

        return $form->schema([
            Section::make('General')->columns(2)->schema([
                TextInput::make('title')->required(),
                ...HandleField::make('collection', 'Used in templates and code, like "articles".', HandleField::WARNING),
                Select::make('blueprint')->options($blueprints())
                    ->help('The fields its entries have.'),
                CheckboxList::make('blueprints')->label('Other blueprints')->options($blueprints)->span(2)
                    ->help('Blueprints an entry can switch to in its Page settings.'),
            ]),
            Section::make('Order')->description('How its entries are listed, on the site and in the admin.')->columns(2)->schema([
                Toggle::make('dated')->label('Dated entries')->help('Entries have a date and list newest first.'),
                Toggle::make('ordered')->label('Manual order')->help('Drag entries into order on the entries list.'),
            ]),
            Section::make('Pages and addresses')->description('Whether its entries are pages on the site, and how.')->columns(2)->schema([
                TextInput::make('route')->label('Entry URL')->placeholder('/blog/{slug}')->unique()->span(2)
                    ->rules([new RoutePatternRule])
                    ->help('Empty: entries have no pages of their own (like FAQs shown by a template).'),
                Toggle::make('hierarchical')->label('Hierarchical')->showWhen('route')
                    ->help('Entries can sit under a parent entry, like pages under pages.'),
                Toggle::make('comments')->label('Allow comments')->showWhen('route')
                    ->help('Visitors can comment on its entries.'),
                TextInput::make('template')->label('Entry template')->placeholder('cms.article')->showWhen('route')
                    ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                    ->help(TemplateHelp::text('cms.article', ['cms.{handle}', 'cms.entry'])."\nAn entry can choose its own in its Page settings."),
                Select::make('schema_type')->label('Structured data type')->options(StructuredData::ENTRY_TYPES)->showWhen('route')
                    ->help('What search engines are told its entries are. Empty: Article if dated, else Web page.'),
            ]),
            Section::make('Listing page')->description('A page listing its entries, like /blog.')->columns(2)->schema([
                TextInput::make('listing_route')->label('Listing page URL')->placeholder('/blog')->unique()->maxLength(255)->span(2)
                    ->rules(['regex:#^(/[a-z0-9\-_]+)+$#'])
                    ->help("Empty: no listing page. Its template is the first that exists of\n1. ".TemplateHelp::file('cms.{handle}-listing')."\n2. ".TemplateHelp::file('cms.listing')."\n3. the built-in template"),
                Select::make('listing_blueprint')->label('Listing page fields')->options($blueprints())->showWhen('listing_route')
                    ->help('Fields of the listing page itself, like an intro.'),
                NumberInput::make('per_page')->label('Entries per page')->integer()->min(1)->max(100)->default(10)->showWhen('listing_route'),
            ]),
        ]);
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
            // Deleted ones keep their entries: list them, and bring them back.
            ->filters([Filter::make('trashed')->label('Deleted')->options(['only' => 'Deleted'])->query(fn (Builder $query) => $query->withoutGlobalScope(SoftDeletingScope::class)->whereNotNull($query->qualifyColumn('deleted_at')))])
            ->actions([
                Action::make('restore')->trashed()->ability('delete')->handle(function (Model $collection): string {
                    if ($collection instanceof Collection) {
                        try {
                            app(RestoreDeleted::class)->collection($collection);
                        } catch (ValidationException $e) {
                            throw new ActionFailed(implode(' ', $e->validator->errors()->all()));
                        }
                    }

                    return 'Restored.';
                }),
            ])
            ->defaultSort('title');
    }
}
