<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Collections;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\RouteConflicts;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * The taxonomies a collection's entries have (the collection form's
 * Taxonomies list), each with "One term only" or not: the entry editor's
 * Taxonomies card offers them. Blueprints are left as they are. A
 * taxonomy newly attached gets its term pages and index page in the
 * collection (on by default), unless one would have a URL something else
 * has: then nothing is saved. Attachments kept keep their pages' settings.
 * AttachCollections does the same from a taxonomy.
 *
 * @api
 */
final class AttachTaxonomies
{
    /**
     * @param  array<int, bool>  $taxonomies  all the taxonomies to attach: id => one term only
     * @return array{attached: list<int>, detached: list<int>} the taxonomies newly attached and detached
     *
     * @throws ValidationException when a newly attached taxonomy's term or index page would have a URL something else has
     */
    public function handle(Collection $collection, array $taxonomies): array
    {
        return DB::transaction(function () use ($collection, $taxonomies): array {
            $before = $collection->taxonomies()->get()->mapWithKeys(fn ($taxonomy): array => [$taxonomy->id => $taxonomy->getRelation('pivot')])->all();
            $attached = array_values(array_diff(array_keys($taxonomies), array_keys($before)));
            $detached = array_values(array_diff(array_keys($before), array_keys($taxonomies)));
            if ($detached !== []) {
                $collection->taxonomies()->detach($detached);
            }
            foreach ($taxonomies as $id => $single) {
                $pivot = $before[$id] ?? null;
                if (! $pivot instanceof CollectionTaxonomy) {
                    $collection->taxonomies()->attach($id, ['single' => $single]);
                } elseif ($pivot->single !== $single) {
                    $collection->taxonomies()->updateExistingPivot($id, ['single' => $single]);
                }
            }
            if ($attached !== [] || $detached !== []) {
                app(SiteCache::class)->changed('term pages');
            }
            if ($attached !== []) {
                foreach ($collection->taxonomies()->whereIn('sunrice_taxonomies.id', $attached)->get() as $taxonomy) {
                    $pivot = $taxonomy->getRelation('pivot');
                    if ($pivot instanceof CollectionTaxonomy && ($clash = RouteConflicts::forAttachment($collection, $taxonomy, $pivot)) !== null) {
                        throw ValidationException::withMessages(['taxonomies' => $clash['message'] ?? __(':taxonomy\'s pages in this collection would have the URL :url, which :title has in :language already.', [
                            'taxonomy' => $taxonomy->title, 'url' => $clash['url'], 'title' => $clash['title'], 'language' => Locales::name($clash['locale']),
                        ])]);
                    }
                }
            }
            $collection->unsetRelation('taxonomies');

            return ['attached' => $attached, 'detached' => $detached];
        });
    }

    /** Whether a taxonomy, loaded through a collection (null: not attached), takes one term at most there. */
    public static function single(?Taxonomy $taxonomy): bool
    {
        $pivot = $taxonomy !== null && $taxonomy->relationLoaded('pivot') ? $taxonomy->getRelation('pivot') : null;

        return $pivot instanceof CollectionTaxonomy && $pivot->single;
    }
}
