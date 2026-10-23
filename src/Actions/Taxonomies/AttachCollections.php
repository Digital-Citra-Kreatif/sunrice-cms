<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Taxonomies;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\RouteConflicts;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * The collections whose entries a taxonomy groups (the taxonomy form's
 * Collections list): their entries get its terms in the editor's
 * Taxonomies card, and its entries lists filter by them. Blueprints are
 * left as they are. A collection detached keeps its entries' live terms
 * of the taxonomy (attaching it again shows them). A collection attached
 * whose term or index page (on by default) would have a URL something
 * else has is refused. AttachTaxonomies does the same from a collection.
 *
 * @api
 */
final class AttachCollections
{
    /**
     * @param  list<int>  $ids  the collections to attach, all of them
     * @param  bool  $checkRoutes  false when the caller checks the new attachments' URLs itself (with its own values for them)
     * @return array{attached: list<int>, detached: list<int>} the collections newly attached and detached
     *
     * @throws ValidationException when a newly attached collection's term or index page (on by default) would have a URL something else has
     */
    public function handle(Taxonomy $taxonomy, array $ids, bool $checkRoutes = true): array
    {
        return DB::transaction(function () use ($taxonomy, $ids, $checkRoutes): array {
            $before = $taxonomy->collections()->pluck('sunrice_collections.id')->map(fn (mixed $id): int => is_numeric($id) ? (int) $id : 0)->all();
            $taxonomy->collections()->sync($ids);
            $attached = array_values(array_diff($ids, $before));
            $detached = array_values(array_diff($before, $ids));
            if ($attached !== [] || $detached !== []) {
                // Its terms have pages in collections it's attached to (CollectionTaxonomy::$term_pages, on for new ones).
                app(SiteCache::class)->changed('term pages');
            }
            if ($checkRoutes && $attached !== []) {
                self::checkRoutes($taxonomy, $attached);
            }

            return ['attached' => $attached, 'detached' => $detached];
        });
    }

    /**
     * Refuses newly attached collections whose term or index pages for
     * the taxonomy would have a URL something else has (RouteConflicts).
     *
     * @param  list<int>  $ids
     *
     * @throws ValidationException
     */
    private static function checkRoutes(Taxonomy $taxonomy, array $ids): void
    {
        foreach ($taxonomy->collections()->whereIn('sunrice_collections.id', $ids)->get() as $collection) {
            $pivot = $collection->getRelation('pivot');
            if ($pivot instanceof CollectionTaxonomy && ($clash = RouteConflicts::forAttachment($collection, $taxonomy, $pivot)) !== null) {
                throw ValidationException::withMessages(['collections' => __(':title has the URL :url in :language already.', ['title' => $clash['title'], 'url' => $clash['url'], 'language' => Locales::name($clash['locale'])])]);
            }
        }
    }
}
