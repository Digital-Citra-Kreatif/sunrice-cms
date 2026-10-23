<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Admin\Support\Card;
use Sunrice\Cms\Models\GlobalSet;

/**
 * Content → Globals (/admin/cms/globals), guarded by the cms.globals.*
 * permissions: the list opens each set's values (GlobalsController, at
 * /admin/cms/globals/{handle}/values); Settings holds its title, handle
 * and blueprint, which templates rely on: changing them takes
 * cms.globals.configure as well as cms.globals.update (editors have only
 * the latter, for the values).
 *
 * @internal
 */
final class GlobalSetResource extends Resource
{
    protected static string $model = GlobalSet::class;

    public static function key(): string
    {
        return 'globals';
    }

    public static function label(): string
    {
        return 'Globals';
    }

    public static function singularLabel(): string
    {
        return 'Global set';
    }

    public static function navigationGroup(): string
    {
        return 'Content';
    }

    public static function recordKey(): string
    {
        return 'handle';
    }

    /** The permission a set's Settings (title, handle, blueprint) take besides cms.globals.update. */
    public const CONFIGURE = 'cms.globals.configure';

    /**
     * Whether `$user` may change sets' titles, handles and blueprints:
     * templates find a set by its handle, so editing its values isn't enough.
     */
    public static function configures(mixed $user): bool
    {
        return $user instanceof Authorizable && $user->can('cms.globals.update') && $user->can(self::CONFIGURE);
    }

    /** Settings (the edit form, and save_record for agents) take cms.globals.configure too. */
    public static function can(Authorizable $user, string $ability, ?Model $record = null): bool
    {
        return $ability !== 'update' || $user->can(self::CONFIGURE);
    }

    /** The list opens the set's values. */
    public static function recordUrl(Model $record): ?string
    {
        return $record instanceof GlobalSet ? route('sunrice.admin.cms.globals.values.edit', $record->handle) : null;
    }

    /** The way to its values. */
    public static function aside(Model $record, Authorizable $user): array
    {
        $card = Card::make('Values')->description('This page holds the set\'s name, handle and fields.');
        if ($record instanceof GlobalSet) {
            $card->link('Edit the values', route('sunrice.admin.cms.globals.values.edit', $record->handle, false));
        }

        return [$card];
    }

    public static function navigationIcon(): string
    {
        return 'globe';
    }

    public static function navigationSort(): int
    {
        return 30;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')->required(),
            ...HandleField::make('global', 'A short name for this global set, used by the site\'s templates.'),
            Select::make('blueprint')
                ->verbatim()->options(BlueprintChoices::options(BlueprintChoices::GLOBAL))
                ->help('Its fields.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::make('title')->searchable()->sortable(),
                Column::make('handle')->searchable(),
                Column::make('blueprint'),
            ])
            ->defaultSort('title');
    }
}
