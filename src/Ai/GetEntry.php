<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Actions\Collections\AttachTaxonomies;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

#[IsReadOnly]
#[Description('An entry in one language (the main one unless "locale" is given): its status, its fields (handle, type, label, required, settings, options) and the draft\'s values: title, slug, data by field handle, and seo; and its terms (every language\'s), by taxonomy handle: the taxonomies its collection has whose terms you may see (handle, title, single: one term at most) and, for each, the terms as the editor shows them (id, slug, title; not published yet, else live) and the live ones. Without "id", give "collection" to get the fields and taxonomies for cms_save_entry to create one. Media fields hold media ids (list_media), entries fields entry ids, terms fields term ids (cms_list_terms). Shared fields are edited in the main language.')]
final class GetEntry extends CmsTool
{
    protected string $name = 'cms_get_entry';

    public function handle(Request $request): Response
    {
        if (! $this->may('view')) {
            return $this->denied('view entries');
        }
        if ($request->get('id') === null) {
            $handle = $request->get('collection');
            $collection = is_string($handle) ? Collection::query()->where('handle', $handle)->first() : null;
            if ($collection === null || ! $this->may('view', $collection)) {
                return Response::error('Give an entry "id", or a "collection" handle for a new entry\'s fields.');
            }

            return $this->json(['collection' => $collection->handle, 'fields' => $collection->schema()->toAdmin(), 'defaults' => $collection->schema()->defaults(), 'taxonomies' => self::taxonomies($this->shown($collection))]);
        }
        $entry = $this->findEntry($request, withTrashed: true);
        if ($entry instanceof Response) {
            return $entry;
        }
        if (! $this->may('view', $entry->collection)) {
            return $this->denied('view entries of '.$entry->collection->title);
        }
        $translation = $this->findTranslation($request, $entry);
        if ($translation instanceof Response) {
            return $translation;
        }
        $schema = $entry->schema();
        // Without the values another language keeps of shared fields, out of sight.
        $data = $translation->shownData($translation->draft_data) ?? [];
        unset($data[Seo::KEY]);

        return $this->json([
            ...self::describe($translation),
            'fields' => $schema->toAdmin(),
            'shared' => $translation->isMain() ? [] : $schema->shared(),
            'values' => ['title' => $translation->draft_title, 'slug' => $translation->draft_slug, 'data' => $data, 'seo' => $translation->draft_data[Seo::KEY] ?? null],
            'live' => $translation->isPublished() ? ['title' => $translation->title, 'slug' => $translation->slug] : null,
            // Those whose terms the person may see, as the editor's Taxonomies card.
            'taxonomies' => self::taxonomies($shown = $this->shown($entry->collection, $entry)),
            'terms' => self::terms($shown, $entry->draftTermIds()),
            'live_terms' => self::terms($shown, $entry->liveTermIds()),
        ]);
    }

    /**
     * The taxonomies a collection's entries have whose terms the person may
     * see (all of them for those who may change the entry's terms).
     *
     * @return EloquentCollection<int, Taxonomy>
     */
    private function shown(Collection $collection, ?Entry $entry = null): EloquentCollection
    {
        return Access::entryTaxonomies($this->user(), $collection, $entry);
    }

    /**
     * @param  EloquentCollection<int, Taxonomy>  $taxonomies
     * @return list<array{handle: string, title: string, single: bool}>
     */
    private static function taxonomies(EloquentCollection $taxonomies): array
    {
        return array_values($taxonomies
            ->map(fn (Taxonomy $taxonomy): array => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title, 'single' => AttachTaxonomies::single($taxonomy)])->all());
    }

    /**
     * Terms by taxonomy handle (of these taxonomies, each listed, empty or not).
     *
     * @param  EloquentCollection<int, Taxonomy>  $taxonomies
     * @param  list<int>  $ids
     * @return array<string, list<array{id: int, slug: string, title: string}>>
     */
    private static function terms(EloquentCollection $taxonomies, array $ids): array
    {
        $terms = Term::query()->with('translations')->whereKey($ids)->orderBy('sort_order')->orderBy('id')->get();
        $out = [];
        foreach ($taxonomies as $taxonomy) {
            $out[$taxonomy->handle] = array_values($terms->where('taxonomy_id', $taxonomy->id)
                ->map(fn (Term $term): array => ['id' => $term->id, 'slug' => $term->translation(Locales::default())->slug ?? '', 'title' => $term->title(Locales::default())])->all());
        }

        return $out;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'id' => $schema->integer(),
            'locale' => $schema->string()->description('A language code; the main language when left out.'),
            'collection' => $schema->string()->description('Without "id": the collection to get a new entry\'s fields for.'),
        ];
    }
}
