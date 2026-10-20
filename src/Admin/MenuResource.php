<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Admin\Support\Card;
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

    /** Content → Menus is at cms/menus. */
    public static function path(): string
    {
        return 'menu-settings';
    }

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

    /** Its links are edited elsewhere (Content → Menus): say so, with the way there. */
    public static function aside(Model $record, Authorizable $user): array
    {
        $card = Card::make('Links')->description('This page holds the menu\'s name and handle. Its links are edited under Content → Menus.');
        if ($record instanceof Menu && $user->can('cms.menus.view')) {
            $card->link('Edit the links', route('sunrice.admin.cms.menus.edit', $record->handle, false));
        }

        return [$card];
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')->required(),
            TextInput::make('handle')->required()->maxLength(64)->unique()->onlyOnCreate()->slugFrom('title')
                ->rules([HandleField::rule()])
                ->help('How templates read it, like "main" or "footer". Filled in from the title; it can\'t change later.'),
            TextInput::make('handle')->onlyOnEdit()->disabled()
                ->help('How templates read it: <x-sunrice-cms::menu handle="…" />. It can\'t change.'),
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
