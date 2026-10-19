<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Terms\SaveTerm as Save;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;

#[Description('Add a term to a taxonomy (no "id"), or rename one or give it another language (with "id" and "locale"). The slug is made from the title when left out.')]
final class SaveTerm extends CmsTool
{
    protected string $name = 'cms_save_term';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.terms.manage')) {
            return $this->denied('manage terms');
        }
        $handle = $request->get('taxonomy');
        $taxonomy = is_string($handle) ? Taxonomy::query()->where('handle', $handle)->first() : null;
        if ($taxonomy === null) {
            return Response::error('Give the "taxonomy" handle (cms_list_terms lists them).');
        }
        $id = $request->get('id');
        $term = is_int($id) ? Term::query()->where('taxonomy_id', $taxonomy->id)->find($id) : null;
        if ($id !== null && $term === null) {
            return Response::error('No such term in this taxonomy.');
        }
        $input = array_intersect_key($request->all(), array_flip(['title', 'slug', 'locale', 'parent_id']));
        try {
            $term = app(Save::class)->handle($taxonomy, $input, $term);
        } catch (ValidationException $e) {
            return self::invalid($e);
        }

        return $this->json(['saved' => true, 'id' => $term->id, 'title' => $term->title(is_string($input['locale'] ?? null) ? $input['locale'] : null)]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'taxonomy' => $schema->string()->required(),
            'id' => $schema->integer()->description('The term to change; leave out to add one.'),
            'title' => $schema->string()->required(),
            'slug' => $schema->string(),
            'locale' => $schema->string()->description('The main language when left out.'),
            'parent_id' => $schema->integer()->description('In nested taxonomies.'),
        ];
    }
}
