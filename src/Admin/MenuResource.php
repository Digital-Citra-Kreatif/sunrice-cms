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
 * Content → Menus (/admin/cms/menus), guarded by the cms.menus.*
 * permissions: the list opens each menu's links (MenuController, at
 * /admin/cms/menus/{handle}/links); Settings holds its title and handle,
 * which templates rely on: changing them takes cms.menus.configure as
 * well as cms.menus.update (editors have only the latter, for the links).
 *
 * @internal
 */
final class MenuResource extends Resource
{
    protected static string $model = Menu::class;

    public static function navigationGroup(): string
    {
        return 'Content';
    }

    public static function recordKey(): string
    {
        return 'handle';
    }

    /** The permission a menu's Settings (title, handle) take besides cms.menus.update. */
    public const CONFIGURE = 'cms.menus.configure';

    /**
     * Whether `$user` may change menus' titles and handles: templates find
     * a menu by its handle, so editing its links isn't enough.
     */
    public static function configures(mixed $user): bool
    {
        return $user instanceof Authorizable && $user->can('cms.menus.update') && $user->can(self::CONFIGURE);
    }

    /** Settings (the edit form, and save_record for agents) take cms.menus.configure too. */
    public static function can(Authorizable $user, string $ability, ?Model $record = null): bool
    {
        return $ability !== 'update' || $user->can(self::CONFIGURE);
    }

    /** The list opens the menu's links. */
    public static function recordUrl(Model $record): ?string
    {
        return $record instanceof Menu ? route('sunrice.admin.cms.menus.links.edit', $record->handle) : null;
    }

    public static function navigationIcon(): string
    {
        return 'list-tree';
    }

    public static function navigationSort(): int
    {
        return 40;
    }

    /** The way to its links. */
    public static function aside(Model $record, Authorizable $user): array
    {
        $card = Card::make('Links')->description('This page holds the menu\'s name and handle.');
        if ($record instanceof Menu) {
            $card->link('Edit the links', route('sunrice.admin.cms.menus.links.edit', $record->handle, false));
        }

        return [$card];
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')->required(),
            ...HandleField::make('menu', 'A short name for this menu, used by the site\'s templates.'),
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
