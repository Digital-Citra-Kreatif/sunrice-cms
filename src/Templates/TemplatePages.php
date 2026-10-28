<?php

declare(strict_types=1);

namespace Sunrice\Cms\Templates;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionTaxonomy;
use Sunrice\Cms\Models\Taxonomy;

/**
 * The site's pages a template can be made for, by record: each
 * collection's (its entry and listing pages, and the term and index pages
 * of the taxonomies it groups that are switched on there; their files are
 * in its folder), then each taxonomy's shared term and index pages. Only
 * the pages a record has; collections and taxonomies in the trash are
 * left out.
 *
 * @internal
 */
final class TemplatePages
{
    /**
     * @param  list<string>|null  $collections  only these handles (null: all)
     * @param  list<string>|null  $taxonomies  only these handles (null: all)
     * @return list<array{type: 'collection'|'taxonomy', handle: string, title: string, pages: list<TemplatePage>}>
     */
    public static function groups(?array $collections = null, ?array $taxonomies = null): array
    {
        $groups = [];
        $query = Collection::query()->with('taxonomies')->orderBy('title')->orderBy('handle');
        foreach (($collections === null ? $query : $query->whereIn('handle', $collections))->get() as $collection) {
            $c = $collection->handle;
            $pages = [];
            if ($collection->route !== null && $collection->route !== '') {
                $pages[] = new TemplatePage(TemplatePage::ENTRY, $collection->route, "collections/{$c}/show.blade.php", $collection);
            }
            if ($collection->listing_route !== null && $collection->listing_route !== '') {
                $pages[] = new TemplatePage(TemplatePage::LISTING, $collection->listing_route, "collections/{$c}/index.blade.php", $collection);
            }
            foreach ($collection->taxonomies->sortBy('title') as $taxonomy) {
                $pivot = $taxonomy->getRelation('pivot');
                if (! $pivot instanceof CollectionTaxonomy) {
                    continue;
                }
                $t = $taxonomy->handle;
                if ($pivot->term_pages) {
                    $pages[] = new TemplatePage(TemplatePage::TERM, $pivot->pattern($collection, $taxonomy), "collections/{$c}/{$t}/show.blade.php", $collection, $taxonomy);
                }
                if ($pivot->index_page) {
                    $pages[] = new TemplatePage(TemplatePage::INDEX, $pivot->indexPath($collection, $taxonomy), "collections/{$c}/{$t}/index.blade.php", $collection, $taxonomy);
                }
            }
            if ($pages !== []) {
                $groups[] = ['type' => 'collection', 'handle' => $c, 'title' => $collection->title, 'pages' => $pages];
            }
        }

        $query = Taxonomy::query()->orderBy('title')->orderBy('handle');
        foreach (($taxonomies === null ? $query : $query->whereIn('handle', $taxonomies))->get() as $taxonomy) {
            $t = $taxonomy->handle;
            $pages = [];
            if ($taxonomy->route !== null && $taxonomy->route !== '') {
                $pages[] = new TemplatePage(TemplatePage::TERM, $taxonomy->route, "taxonomies/{$t}/show.blade.php", taxonomy: $taxonomy);
            }
            if ($taxonomy->index_route !== null && $taxonomy->index_route !== '') {
                $pages[] = new TemplatePage(TemplatePage::INDEX, $taxonomy->index_route, "taxonomies/{$t}/index.blade.php", taxonomy: $taxonomy);
            }
            if ($pages !== []) {
                $groups[] = ['type' => 'taxonomy', 'handle' => $t, 'title' => $taxonomy->title, 'pages' => $pages];
            }
        }

        return $groups;
    }
}
