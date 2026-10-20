<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Validation\ValidationException;
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
use Sunrice\Cms\Site\RoutePattern;
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
            TextInput::make('handle')->required()->maxLength(64)->unique()->onlyOnCreate()
                ->rules(['regex:/^[a-z][a-z0-9_]*$/'])
                ->help('Lowercase letters, digits and underscores, like "articles". It can\'t change later.'),
            Select::make('blueprint')
                ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                ->help('The fields its entries have. Changing it keeps what entries already hold.'),
            Toggle::make('dated')->label('Dated entries')->help('Entries show a date and list newest first, like articles.'),
            Toggle::make('ordered')->label('Manual order')->help('Editors put entries in order (Move up, Move down), instead of by date or title.'),
            Toggle::make('hierarchical')->label('Hierarchical')->help('Entries may have a parent entry, like pages under pages (for breadcrumbs and sub-menus; their URLs stay the same).'),
            TextInput::make('route')->label('URL')->placeholder('/blog/{slug}')->unique()
                ->rules([function (string $attribute, mixed $value, \Closure $fail): void {
                    if (is_string($value) && $value !== '' && ! RoutePattern::isValid($value)) {
                        $fail('Use a path with {slug} once, like /blog/{slug} or /{slug} for pages: lowercase letters, digits, dashes.');
                    }
                }])
                ->help('Where entries are on the site. Empty: they have no page of their own.'),
            TextInput::make('listing_route')->label('Listing page URL')->placeholder('/blog')->unique()->maxLength(255)
                ->rules(['regex:#^(/[a-z0-9\-_]+)+$#'])
                ->help('A page listing the entries, like /blog (template cms.{handle}-listing, else cms.listing). Empty: none.'),
            Select::make('listing_blueprint')->label('Listing page fields')
                ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                ->help('Fields of the listing page itself, like an intro, edited from the entries list.'),
            NumberInput::make('per_page')->label('Entries per listing page')->integer()->min(1)->max(100)->default(10),
            Toggle::make('comments')->label('Allow comments')->help('Visitors may comment on its entries (it needs a URL). Settings → Comments says how they\'re moderated.'),
            Select::make('schema_type')->label('Structured data type')->options(StructuredData::ENTRY_TYPES)
                ->help('What search engines are told its entries are. Empty: Article when entries are dated, else Web page.'),
            TextInput::make('template')->placeholder('cms.article')
                ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                ->help('The Blade view for its entries. Empty: cms.{handle}, else cms.entry.'),
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
