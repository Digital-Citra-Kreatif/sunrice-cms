<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Structure → Taxonomies, guarded by the cms.taxonomies.* permissions.
 * Their terms are edited under Content → Terms. Deleting a taxonomy keeps
 * its terms.
 *
 * @internal
 */
final class TaxonomyResource extends Resource
{
    protected static string $model = Taxonomy::class;

    public static function navigationGroup(): string
    {
        return 'Structure';
    }

    public static function navigationIcon(): string
    {
        return 'tags';
    }

    public static function navigationSort(): int
    {
        return 93;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')->required(),
            TextInput::make('handle')->required()->maxLength(64)->unique()->onlyOnCreate()
                ->rules(['regex:/^[a-z][a-z0-9_]*$/'])
                ->help('Lowercase letters, digits and underscores, like "categories". It can\'t change later.'),
            Toggle::make('hierarchical')->label('Nested terms')->help('Terms can go under other terms, like categories and subcategories.'),
            CheckboxList::make('collections')
                ->help('The collections whose entries it groups.')
                ->options(fn () => Collection::query()->orderBy('title')->get()->mapWithKeys(fn (Collection $c): array => [(string) $c->id => $c->title])->all())
                ->loadUsing(fn (Model $taxonomy): array => $taxonomy instanceof Taxonomy
                    ? $taxonomy->collections()->get(['sunrice_collections.id'])->map(fn (Collection $c): string => (string) $c->id)->all()
                    : [])
                ->saveUsing(function (Model $taxonomy, mixed $ids): void {
                    if ($taxonomy instanceof Taxonomy) {
                        $taxonomy->collections()->sync(array_map(intval(...), array_filter(is_array($ids) ? $ids : [], is_numeric(...))));
                    }
                }),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Column::make('title')->searchable()->sortable(),
                Column::make('handle')->searchable(),
                Column::make('hierarchical')->label('Nested')->boolean(),
                Column::make('collections.title')->label('Collections'),
            ])
            ->defaultSort('title');
    }
}
