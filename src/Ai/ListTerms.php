<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

#[IsReadOnly]
#[Description('Without "taxonomy": the taxonomies (handle, title, nested or not). With one: its terms (id, parent id, title and slug in each language), in order. Use term ids in entries\' terms fields.')]
final class ListTerms extends CmsTool
{
    protected string $name = 'cms_list_terms';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.terms.manage') && ! $this->can('cms.entries.view')) {
            return $this->denied('view terms');
        }
        $handle = $request->get('taxonomy');
        if (! is_string($handle) || $handle === '') {
            return $this->json(['taxonomies' => Taxonomy::query()->orderBy('title')->get()
                ->map(fn (Taxonomy $t): array => ['handle' => $t->handle, 'title' => $t->title, 'hierarchical' => $t->hierarchical])->all()]);
        }
        $taxonomy = Taxonomy::query()->where('handle', $handle)->first();
        if ($taxonomy === null) {
            return Response::error('No such taxonomy. Leave out "taxonomy" to list them.');
        }
        $terms = Term::query()->where('taxonomy_id', $taxonomy->id)->with('translations')->orderBy('sort_order')->orderBy('id')->limit(1000)->get();

        return $this->json(['taxonomy' => $taxonomy->handle, 'terms' => $terms->map(fn (Term $term): array => [
            'id' => $term->id,
            'parent_id' => $term->parent_id,
            'translations' => array_filter(array_combine(Locales::all(), array_map(
                fn (string $locale): ?array => ($t = $term->translations->firstWhere('locale', $locale)) === null ? null : ['title' => $t->title, 'slug' => $t->slug],
                Locales::all(),
            ))),
        ])->all()]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['taxonomy' => $schema->string()->description('A taxonomy handle.')];
    }
}
