<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;

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
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::make('title')->searchable()->sortable(),
                Column::make('handle')->searchable(),
                Column::make('blueprint'),
                Column::make('dated')->boolean(),
            ])
            ->defaultSort('title');
    }
}
