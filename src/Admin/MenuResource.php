<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Models\Menu;

/**
 * Structure → Menu settings (the menus themselves: title and handle),
 * guarded by the cms.menus.* permissions. Their links are edited under
 * Content → Menus.
 *
 * @internal
 */
final class MenuResource extends Resource
{
    protected static string $model = Menu::class;

    public static function navigationLabel(): string
    {
        return 'Menu settings';
    }

    public static function navigationGroup(): string
    {
        return 'Structure';
    }

    public static function navigationIcon(): string
    {
        return 'list-tree';
    }

    public static function navigationSort(): int
    {
        return 95;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')->required(),
            ...HandleField::make('menu', 'How templates read it, like "main" or "footer".', 'Careful: templates that read it (Cms::menu(\'…\')) need the new handle too.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::make('title')->searchable()->sortable(),
                Column::make('handle')->searchable(),
            ])
            ->defaultSort('title');
    }
}
