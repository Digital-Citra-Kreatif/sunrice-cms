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
        return $form->schema([
            TextInput::make('title')->required(),
            ...HandleField::make('collection', 'Lowercase letters, digits and underscores, like "articles".',
                'Careful: the site\'s templates and code may use the handle, so ask your developer to change them too (for developers: the cms.{handle} view, Cms::entries(\'…\'), entries fields limited to it). Roles keep their permissions for it.'),
            Select::make('blueprint')
                ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                ->help('The fields its entries have. Changing it keeps what entries already hold.'),
            CheckboxList::make('blueprints')->label('Other blueprints')
                ->options(fn (): array => Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                ->help('Blueprints an entry may switch to instead, in its Page settings (fields both have keep their values).'),
            Toggle::make('dated')->label('Dated entries')->help('Entries show a date and list newest first, like articles.'),
            Toggle::make('ordered')->label('Manual order')->help('Editors put entries in order (Move up, Move down), instead of by date or title.'),
            Toggle::make('hierarchical')->label('Hierarchical')->help('Entries may have a parent entry, like pages under pages (for breadcrumbs and sub-menus; their URLs stay the same).'),
            TextInput::make('route')->label('URL')->placeholder('/blog/{slug}')->unique()
                ->rules([new RoutePatternRule])
                ->help('Where entries are on the site. Empty: they have no page of their own. A related entry\'s slug goes in with its field: /projects/{project}/{slug}.'),
            TextInput::make('listing_route')->label('Listing page URL')->placeholder('/blog')->unique()->maxLength(255)
                ->rules(['regex:#^(/[a-z0-9\-_]+)+$#'])
                ->help('A page listing the entries, like /blog. Empty: none. For developers: its template is cms.{handle}-listing, else cms.listing.'),
            Select::make('listing_blueprint')->label('Listing page fields')
                ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                ->help('Fields of the listing page itself, like an intro, edited from the entries list.'),
            NumberInput::make('per_page')->label('Entries per listing page')->integer()->min(1)->max(100)->default(10),
            Toggle::make('comments')->label('Allow comments')->help('Visitors may comment on its entries (it needs a URL). Settings → Comments says how they\'re moderated.'),
            Select::make('schema_type')->label('Structured data type')->options(StructuredData::ENTRY_TYPES)
                ->help('What search engines are told its entries are. Empty: Article when entries are dated, else Web page.'),
            TextInput::make('template')->placeholder('cms.article')
                ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                ->help('The design its entries are shown with, if your developer made more than one. Empty: the usual one. For developers: a Blade view; empty is cms.{handle}, else cms.entry.'),
            SeoMapping::section('an entry\'s'),
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
