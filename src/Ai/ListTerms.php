<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;

#[IsReadOnly]
#[Description('Without "taxonomy": the taxonomies (id, handle, title, nested or not) and their pages, as URL patterns in the main language (null: switched off): the shared term pages and shared index page, and per collection it groups (id, handle) its term pages and index page there. With one: its terms (id, parent id, and in each language title, slug, URL: its usual page, and collection_urls: its page in each collection where its terms have pages), in order. Use term ids in entries\' terms fields and menus (cms_save_menu); index pages\' fields are read and saved with cms_get_listing / cms_save_listing ("taxonomy").')]
final class ListTerms extends CmsTool
{
    protected string $name = 'cms_list_terms';

    public function handle(Request $request): Response
    {
        if (! Access::terms($this->user(), 'view') && ! $this->may('view')) {
            return $this->denied('view terms');
        }
        $handle = $request->get('taxonomy');
        if (! is_string($handle) || $handle === '') {
            return $this->json(['taxonomies' => Taxonomy::query()->with('collections')->orderBy('title')->get()->map(fn (Taxonomy $t): array => [
                'id' => $t->id,
                'handle' => $t->handle,
                'title' => $t->title,
                'hierarchical' => $t->hierarchical,
                'shared_term_pages' => $t->route,
                'shared_index_page' => $t->index_route,
                'collections' => $t->collections->sortBy('title')->values()->map(function (Collection $c) use ($t): array {
                    $pivot = $c->getRelation('pivot');
                    $pivot = $pivot instanceof CollectionTaxonomy ? $pivot : null;

                    return [
                        'id' => $c->id,
                        'handle' => $c->handle,
                        'term_pages' => $pivot?->term_pages === true ? $pivot->pattern($c, $t) : null,
                        'index_page' => $pivot?->index_page === true ? $pivot->indexPath($c, $t) : null,
                    ];
                })->all(),
            ])->all()]);
        }
        $taxonomy = Taxonomy::query()->where('handle', $handle)->with('collections')->first();
        if ($taxonomy === null) {
            return Response::error('No such taxonomy. Leave out "taxonomy" to list them.');
        }
        // The collections its terms have pages in.
        $inCollections = $taxonomy->collections->filter(fn (Collection $c): bool => ($p = $c->getRelation('pivot')) instanceof CollectionTaxonomy && $p->term_pages)->sortBy('title');
        $terms = Term::query()->where('taxonomy_id', $taxonomy->id)->with('translations')->orderBy('sort_order')->orderBy('id')->limit(1000)->get();

        return $this->json(['taxonomy' => $taxonomy->handle, 'terms' => $terms->map(function (Term $term) use ($taxonomy, $inCollections): array {
            // Its URLs come from the site's cached routes: no query per term.
            $term->setRelation('taxonomy', $taxonomy);
            $term->translations->each(fn (TermTranslation $t) => $t->setRelation('term', $term));

            return [
                'id' => $term->id,
                'parent_id' => $term->parent_id,
                'translations' => array_filter(array_combine(Locales::all(), array_map(
                    fn (string $locale): ?array => ($t = $term->translations->firstWhere('locale', $locale)) === null ? null : [
                        'title' => $t->title,
                        'slug' => $t->slug,
                        'url' => $term->url($locale),
                        'collection_urls' => (object) $inCollections->mapWithKeys(fn (Collection $c): array => [$c->handle => $term->url($locale, $c)])->all(),
                    ],
                    Locales::all(),
                ))),
            ];
        })->all()]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['taxonomy' => $schema->string()->description('A taxonomy handle.')];
    }
}
