<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\ActionFailed;
use Sunrice\Admin\Resources\Tables\Column;
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

    public static function recordKey(): string
    {
        return 'handle';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('General')->columns(2)->schema([
                TextInput::make('title')->required(),
                ...HandleField::make('taxonomy', 'Used in templates and code, like "categories".', HandleField::WARNING),
                Toggle::make('hierarchical')->label('Nested terms')->span(2)->help('Terms can sit under other terms, like subcategories.'),
                CheckboxList::make('collections')->span(2)
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
                Select::make('blueprint')->label('Term fields')->span(2)
                    ->options(Blueprint::query()->orderBy('title')->get()->mapWithKeys(fn (Blueprint $blueprint): array => [$blueprint->handle => $blueprint->title])->all())
                    ->help('Extra fields for each term, like a description or an image.'),
            ]),
            Section::make('Term pages')->description('Whether each term has a page on the site listing its entries.')->columns(2)->schema([
                TextInput::make('route')->label('Term pages URL')->span(2)->placeholder('/topics/{slug}')->unique()->maxLength(255)
                    ->rules([function (string $attribute, mixed $value, \Closure $fail): void {
                        if (is_string($value) && $value !== '' && ! RoutePattern::isValid($value)) {
                            $fail('Use a path with {slug} once, like /topics/{slug}: lowercase letters, digits, dashes.');
                        }
                    }])
                    ->help('Empty: terms have no pages.'),
                TextInput::make('template')->label('Term page template')->placeholder('cms.topic')->showWhen('route')->span(2)
                    ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                    ->help(TemplateHelp::text('cms.topic', ['cms.taxonomy-{handle}', 'cms.term'])."\nA term can choose its own on its page."),
            ]),
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

    /** Deleted ones keep their terms: the list's trash brings them back. */
    public static function restoreRecord(Model $record): void
    {
        if ($record instanceof Taxonomy) {
            try {
                app(RestoreDeleted::class)->taxonomy($record);
            } catch (ValidationException $e) {
                throw new ActionFailed(implode(' ', $e->validator->errors()->all()));
            }
        }
    }
}
