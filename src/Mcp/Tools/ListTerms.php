<?php

declare(strict_types=1);

namespace Sunrice\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Mcp\Presenter;
use Sunrice\Models\Term;

#[IsReadOnly]
#[Description('List the terms of a taxonomy (in their order), with names, slugs, fields and SEO per language. Optional search by name.')]
class ListTerms extends SunriceTool
{
    protected string $name = 'list_terms';

    public function handle(Request $request): Response
    {
        $args = $request->validate([
            'taxonomy' => ['required'],
            'search' => ['nullable', 'string', 'max:200'],
            'trashed' => ['nullable', 'boolean'],
        ]);
        $taxonomy = $this->taxonomy($args['taxonomy']);
        if ($taxonomy === null) {
            return $this->notFound('Taxonomy');
        }
        $this->authorize('viewAny', [Term::class, $taxonomy->id]);

        $terms = Term::query()->where('taxonomy_id', $taxonomy->id)->with(['translations', 'taxonomy.blueprint'])
            ->when(! empty($args['trashed']), fn (Builder $q) => $q->onlyTrashed())
            ->when($args['search'] ?? null, fn (Builder $q, string $s) => $q->whereHas('translations', fn (Builder $t) => $t->whereLike('name', "%{$s}%")))
            ->orderBy('sort_order')->limit(500)->get();

        return $this->json([
            'taxonomy' => $taxonomy->handle,
            'hierarchical' => (bool) $taxonomy->hierarchical,
            'terms' => $terms->map(fn (Term $t) => Presenter::term($t))->all(),
        ]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'taxonomy' => $schema->string()->description('Taxonomy handle (or id).')->required(),
            'search' => $schema->string(),
            'trashed' => $schema->boolean()->description('List trashed terms instead.'),
        ];
    }
}
