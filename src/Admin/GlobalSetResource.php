<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\GlobalSet;

/**
 * Structure → Global sets, guarded by the cms.global-sets.* permissions.
 * Their values are edited under Content → Globals.
 *
 * @internal
 */
final class GlobalSetResource extends Resource
{
    protected static string $model = GlobalSet::class;

    public static function navigationGroup(): string
    {
        return 'Structure';
    }

    public static function navigationIcon(): string
    {
        return 'globe';
    }

    public static function navigationSort(): int
    {
        return 94;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')->required(),
            ...HandleField::make('global', 'How templates read it, like "contact".', 'Careful: templates that read it (Cms::global(\'…\')) need the new handle too.'),
            Select::make('blueprint')
                ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                ->help('Its fields. Changing it keeps the values already saved.'),
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
