<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\Link;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Resources\Resource;
use Sunrice\Admin\Resources\Tables\ActionFailed;
use Sunrice\Admin\Resources\Tables\Column;
use Sunrice\Admin\Resources\Tables\Table;
use Sunrice\Admin\Support\Card;
use Sunrice\Cms\Actions\Collections\RestoreDeleted;
use Sunrice\Cms\Actions\Taxonomies\AttachCollections;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\RoutePatternRule;
use Sunrice\Cms\Support\Locales;

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

    /** Which blueprints give entries (or anything else) its terms: a terms field for it. */
    public static function aside(Model $record, Authorizable $user): array
    {
        if (! $record instanceof Taxonomy) {
            return [];
        }

        return [Card::make('Terms fields')->description('Editors choose its terms through a terms field. These blueprints have one:')
            ->list('Blueprints', array_map(fn (array $found): array => ['label' => $found['blueprint']->title, 'meta' => $found['field']], AttachCollections::blueprintsWithField($record)),
                'None yet: tick a collection to add one to its blueprints, or add a Terms field in a blueprint.')
            ->link('Blueprints', route('sunrice.admin.cms.blueprints.index', [], false))];
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('General')->columns(2)->schema([
                TextInput::make('title')->required(),
                ...HandleField::make('taxonomy', 'A short name for this taxonomy, used by the site\'s templates.'),
                ...TranslatedFields::make('title', fn (string $name, string $language) => TextInput::make($name)->label(__('Title in :language', ['language' => $language]))->maxLength(255)
                    ->placeholder('As the title')->help(__('What visitors read in :language on its term pages.', ['language' => $language]))),
                Toggle::make('hierarchical')->label('Nested terms')->span(2)->help('Terms can sit under other terms, like subcategories.'),
                CheckboxList::make('collections')->span(2)
                    ->help('Ticking a collection adds a terms field for this taxonomy to its blueprints (when they have none), so editors choose terms on its entries, and its entries list filters by them.')
                    ->verbatim()->options(fn () => Collection::query()->orderBy('title')->get()->mapWithKeys(fn (Collection $c): array => [(string) $c->id => $c->title])->all())
                    ->loadUsing(fn (Model $taxonomy): array => $taxonomy instanceof Taxonomy
                        ? $taxonomy->collections()->get(['sunrice_collections.id'])->map(fn (Collection $c): string => (string) $c->id)->all()
                        : [])
                    ->saveUsing(function (Model $taxonomy, mixed $ids): void {
                        if ($taxonomy instanceof Taxonomy) {
                            app(AttachCollections::class)->handle($taxonomy, array_values(array_map(intval(...), array_filter(is_array($ids) ? $ids : [], is_numeric(...)))), request()->boolean('remove_term_fields'));
                        }
                    }),
                // Asked only once the collections change: read by the collections' saveUsing, never stored.
                Toggle::make('remove_term_fields')->label('Also remove the terms field from collections you untick')->span(2)->onlyOnEdit()->showWhenChanged('collections')
                    ->help('Off: their blueprints keep the field, and entries keep their terms. On: the field goes from blueprints no ticked collection uses; what entries chose stays stored, out of sight.')
                    ->loadUsing(fn (): bool => false)->saveUsing(fn (): null => null),
                Select::make('blueprint')->label('Term fields')->span(2)
                    ->verbatim()->options(BlueprintChoices::options(BlueprintChoices::CONTENT))
                    ->help('Extra fields for each term, like a description or an image.'),
            ]),
            Section::make('Term pages')->description('Whether each term has a page on the site listing its entries.')->columns(2)
                ->links(function (?Model $taxonomy): array {
                    $term = $taxonomy instanceof Taxonomy && $taxonomy->route !== null ? $taxonomy->terms()->with('translations')->orderBy('id')->first() : null;
                    $url = $term?->url(Locales::default());

                    return $url !== null ? [Link::make('View a term page', $url)->newTab()->showWhen('pages')] : [];
                })
                ->schema([
                    Toggle::make('pages')->label('Terms have pages')->default(true)->span(2)
                        ->help('Off: terms only group entries, with no address of their own.')
                        ->loadUsing(fn (Model $taxonomy): bool => $taxonomy->getAttribute('route') !== null)
                        ->saveUsing(fn (Model $taxonomy, mixed $on) => CollectionResource::switchPage($taxonomy, 'route', $on, '/{handle}/{slug}')),
                    TextInput::make('route')->label('Term page URL')->placeholder('/{handle}/{slug}')->unique()->maxLength(255)->span(2)->showWhen('pages')
                        ->rules([new RoutePatternRule(parameters: false)])
                        ->help('Like /topics/{slug}. Empty: /{handle}/{slug}.'),
                    TextInput::make('template')->label('Term page template')->placeholder('cms.topic')->showWhen('pages')->span(2)
                        ->rules(['regex:/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/'])
                        ->help('Empty: the first template that exists. A term can choose its own on its page.')
                        ->helpDetails('Which file?', TemplateHelp::files(['cms.taxonomy-{handle}', 'cms.term'], 'cms.topic')),
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
