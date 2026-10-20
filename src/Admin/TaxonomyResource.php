<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
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
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\RoutePattern;

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
            ...HandleField::make('taxonomy', 'Lowercase letters, digits and underscores, like "categories".',
                'Careful: terms fields and templates that name it (the cms.taxonomy-{handle} view, whereTerm(\'…\')) need the new handle too. Roles keep their permissions for it.'),
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
            TextInput::make('route')->label('Term pages URL')->placeholder('/topics/{slug}')->unique()->maxLength(255)
                ->rules([function (string $attribute, mixed $value, \Closure $fail): void {
                    if (is_string($value) && $value !== '' && ! RoutePattern::isValid($value)) {
                        $fail('Use a path with {slug} once, like /topics/{slug}: lowercase letters, digits, dashes.');
                    }
                }])
                ->help('Each term gets a page listing its entries. Empty: terms have no pages.'),
            Select::make('blueprint')->label('Term fields')
                ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                ->help('Fields of terms\' own, like a description or an image, edited on each term\'s page.'),
            TextInput::make('template')->placeholder('cms.topic')
                ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                ->help('The Blade view term pages render with. Empty: cms.taxonomy-{handle}, else cms.term.'),
            SeoMapping::section('a term page\'s'),
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
            // Deleted ones keep their terms: list them, and bring them back.
            ->filters([Filter::make('trashed')->label('Deleted')->options(['only' => 'Deleted'])->query(fn (Builder $query) => $query->withoutGlobalScope(SoftDeletingScope::class)->whereNotNull($query->qualifyColumn('deleted_at')))])
            ->actions([
                Action::make('restore')->trashed()->ability('delete')->handle(function (Model $taxonomy): string {
                    if ($taxonomy instanceof Taxonomy) {
                        try {
                            app(RestoreDeleted::class)->taxonomy($taxonomy);
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
