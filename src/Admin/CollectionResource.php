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
                ...HandleField::make('collection', 'How templates and code name it, like "articles". Filled in from the title.',
                    'Careful: templates and code that name it (the cms.{handle} view, Cms::entries(\'…\'), entries fields limited to it) need the new handle too. Roles keep their permissions for it.'),
                Select::make('blueprint')->options($blueprints())
                    ->help('The fields its entries have. Changing it keeps what entries already hold.'),
                CheckboxList::make('blueprints')->label('Other blueprints')->options($blueprints)->span(2)
                    ->help('Blueprints an entry may switch to instead, in its Page settings (fields both have keep their values).'),
            ]),
            Section::make('Order')->description('How its entries are listed, on the site and in the admin.')->columns(2)->schema([
                Toggle::make('dated')->label('Dated entries')->help('Entries show a date and list newest first, like articles.'),
                Toggle::make('ordered')->label('Manual order')->help('Editors drag entries into order on its entries list, instead of by date or title.'),
            ]),
            Section::make('Pages and addresses')->description('Whether its entries are pages on the site, and how.')->columns(2)->schema([
                TextInput::make('route')->label('Entry URL')->placeholder('/blog/{slug}')->unique()->span(2)
                    ->rules([new RoutePatternRule])
                    ->help('Empty: entries have no page of their own, like team members or FAQs that templates list. A related entry\'s slug goes in with its field: /projects/{project}/{slug}.'),
                Toggle::make('hierarchical')->label('Hierarchical')->showWhen('route')
                    ->help('Entries may have a parent entry, like pages under pages (for breadcrumbs and sub-menus).'),
                Toggle::make('comments')->label('Allow comments')->showWhen('route')
                    ->help('Visitors may comment on its entries. Settings → Comments says how they\'re moderated.'),
                TextInput::make('template')->label('Entry template')->placeholder('cms.article')->showWhen('route')
                    ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                    ->help('The Blade view for its entries. Empty: cms.{handle}, else cms.entry.'),
                Select::make('schema_type')->label('Structured data type')->options(StructuredData::ENTRY_TYPES)->showWhen('route')
                    ->help('What search engines are told its entries are. Empty: Article when entries are dated, else Web page.'),
            ]),
            Section::make('Listing page')->description('A page listing its entries, like /blog.')->columns(2)->schema([
                TextInput::make('listing_route')->label('Listing page URL')->placeholder('/blog')->unique()->maxLength(255)->span(2)
                    ->rules(['regex:#^(/[a-z0-9\-_]+)+$#'])
                    ->help('Empty: none. Its template is cms.{handle}-listing, else cms.listing.'),
                Select::make('listing_blueprint')->label('Listing page fields')->options($blueprints())->showWhen('listing_route')
                    ->help('Fields of the listing page itself, like an intro, edited from the entries list.'),
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
