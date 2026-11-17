<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Events\TermSaved;
use Sunrice\Cms\Events\TermSaving;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;

/**
 * A new term from the full term editor, in one language: its title, slug
 * and parent (SaveTerm), then its fields, SEO and template
 * (SaveTermContent), all or nothing. TermSaving and TermSaved fire once
 * for all of it.
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
        // Listeners may change the title, slug and fields, or refuse; what they leave is validated as usual.
        $data = array_key_exists('data', $input) ? (is_array($input['data']) ? $input['data'] : []) : null;
        event($saving = new TermSaving($taxonomy, $locale, null, $input['title'] ?? null, $input['slug'] ?? null, $data));
        if ($saving->data !== null) {
            $input['data'] = $saving->data;
        }

        $term = DB::transaction(function () use ($taxonomy, $input, $locale, $saving): Term {
            $term = $this->term->save($taxonomy, ['title' => $saving->title, 'slug' => $saving->slug, 'parent_id' => $input['parent_id'] ?? null, 'locale' => $locale]);
            $term->setRelation('taxonomy', $taxonomy);
            $content = array_intersect_key($input, array_flip(['data', 'seo', 'template']));
            if ($content !== []) {
                $this->content->save($term, $content, $locale);
            }

            return $term;
        });
        TermSaved::dispatch($term, $locale, true);

        return $term;
    }
}
