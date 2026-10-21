<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * A new term from the full term editor, in one language: its title, slug
 * and parent (SaveTerm), then its fields, SEO and template
 * (SaveTermContent), all or nothing.
 *
 * @api
 */
final class CreateTerm
{
    public function __construct(private readonly SaveTerm $term, private readonly SaveTermContent $content) {}

    /**
     * @param  array<mixed>  $input  title, slug, parent_id; data, seo, template
     *
     * @throws ValidationException
     */
    public function handle(Taxonomy $taxonomy, array $input, ?string $locale = null): Term
    {
        $locale ??= Locales::default();

        return DB::transaction(function () use ($taxonomy, $input, $locale): Term {
            $term = $this->term->handle($taxonomy, ['title' => $input['title'] ?? null, 'slug' => $input['slug'] ?? null, 'parent_id' => $input['parent_id'] ?? null, 'locale' => $locale]);
            $term->setRelation('taxonomy', $taxonomy);
            $content = array_intersect_key($input, array_flip(['data', 'seo', 'template']));
            if ($content !== []) {
                $this->content->handle($term, $content, $locale);
            }

            return $term;
        });
    }
}
