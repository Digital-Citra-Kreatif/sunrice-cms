<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Forms\Warning;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Site\RedirectRule;
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
                ->rules([new RedirectRule])
                ->help('A path on this site, starting with /. End it with /* for every address under it: /blog/* takes /blog/2024/hello. A live page at the address wins over a redirect from it.')
                // What answers its addresses first (a live page, the app's own route), said once it's saved.
                ->warning(fn (Model $redirect): ?Warning => $redirect instanceof Redirect ? RedirectShadows::warning($redirect, self::user()) : null),
            TextInput::make('to_url')->label('To')->required()->maxLength(2048)->placeholder('/new-page')
                ->rules([SafeUrl::rule(), new RedirectRule('from_path')])
                ->help('A path on this site, or a web address. With a From ending in /*, a * here is the rest of the address: /blog/* → /journal/* sends /blog/2024/hello to /journal/2024/hello; without a *, all of them go to one page.'),
            Select::make('status')->label('Type')->options(self::TYPES)->required()->default('301')
                ->help('Browsers remember a permanent redirect and stop asking the site, so a change to it may not show in a browser that followed it: try a temporary one while setting it up, then make it permanent.'),
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
                Column::make('match')->label('Match')->badge()
                    ->state(fn (Model $redirect): string => $redirect instanceof Redirect && $redirect->isWildcard() ? __('Everything under it') : __('This address')),
                Column::make('to_url')->label('To')->searchable(),
                Column::make('status')->label('Type')->format(fn (string|int|float|bool|null $status): string => __(self::TYPES[(int) $status] ?? (string) $status)),
                // What answers its address first, worked out for the whole page at once (query()).
                Column::make('shadowed')->label('Warning')->badge()
                    ->state(fn (Model $redirect): ?string => $redirect instanceof Redirect ? RedirectShadows::badge($redirect) : null),
                ...(count(Locales::all()) > 1 ? [Column::make('every_language')->label('Every language')->boolean()] : []),
                Column::make('updated_at')->label('Updated')->date('d/m/Y')->sortable(),
            ])
            ->defaultSort('from_path');
    }

    /** @return Builder<Model> */
    public static function query(): Builder
    {
        // The list's page of redirects, remembered together for their badges.
        return self::model()::query()->afterQuery(fn (iterable $redirects) => RedirectShadows::listed($redirects));
    }

    private static function user(): ?Authorizable
    {
        $user = auth(app(Panel::class)->getGuard())->user();

        return $user instanceof Authorizable ? $user : null;
    }

    public static function title(Model $record): string
    {
        return $record instanceof Redirect ? $record->from_path : parent::title($record);
    }
}
