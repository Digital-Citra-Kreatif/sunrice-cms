<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SafeUrl;

/**
 * Structure → Redirects, guarded by cms.redirects.*: the addresses that
 * moved. Publishing an entry with a new slug adds one.
 *
 * @internal
 */
final class RedirectResource extends Resource
{
    protected static string $model = Redirect::class;

    /** The redirect types, by HTTP status. */
    private const TYPES = [301 => 'Permanent (301)', 302 => 'Temporary (302)'];

    public static function navigationGroup(): string
    {
        return 'Structure';
    }

    public static function navigationIcon(): string
    {
        return 'external-link';
    }

    public static function navigationSort(): int
    {
        return 96;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('from_path')->label('From')->required()->maxLength(512)->unique()->placeholder('/old-page')
                ->rules(['regex:#^/[^\s?\#]*$#'])
                ->help('A path on this site, starting with /.'),
            TextInput::make('to_url')->label('To')->required()->maxLength(2048)->placeholder('/new-page')
                ->rules([SafeUrl::rule()])
                ->help('A path on this site, or a web address.'),
            Select::make('status')->label('Type')->options(self::TYPES)->required()->default('301'),
            ...(count(Locales::all()) > 1 ? [
                Toggle::make('every_language')->label('In every language')
                    ->help('Also from the same path in each language: /id/old-page goes to /id/new-page.'),
            ] : []),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::make('from_path')->label('From')->searchable()->sortable(),
                Column::make('to_url')->label('To')->searchable(),
                Column::make('status')->label('Type')->format(fn (string|int|float|bool|null $status): string => __(self::TYPES[(int) $status] ?? (string) $status)),
                ...(count(Locales::all()) > 1 ? [Column::make('every_language')->label('Every language')->boolean()] : []),
                Column::make('updated_at')->label('Updated')->date('d/m/Y')->sortable(),
            ])
            ->defaultSort('from_path');
    }

    public static function title(Model $record): string
    {
        return $record instanceof Redirect ? $record->from_path : parent::title($record);
    }
}
