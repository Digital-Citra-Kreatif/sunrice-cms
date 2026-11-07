<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;

/**
 * Which collections and taxonomies the CMS lists in the sidebar. The CMS
 * puts each collection under Content and each taxonomy under Taxonomies;
 * a plugin that lists some of them in its own group (a shop's products and
 * product categories under Shop) says so here, in its register(), so they
 * show once:
 *
 *     app(ContentNavigation::class)->listElsewhere(
 *         collections: fn () => ['products'],
 *         taxonomies: fn () => ['product_categories', 'brands'],
 *     );
 *
 * The closures run when the sidebar is built (handles may come from
 * settings). Only the sidebar changes: the collections' and taxonomies'
 * pages, permissions and Structure entries stay as they are, and the
 * plugin's own items should link to the same pages.
 *
 * @api
 */
final class ContentNavigation
{
    /** @var list<Closure(): iterable<string>> */
    private array $collections = [];

    /** @var list<Closure(): iterable<string>> */
    private array $taxonomies = [];

    /**
     * @param  (Closure(): iterable<string>)|null  $collections  handles of collections listed elsewhere
     * @param  (Closure(): iterable<string>)|null  $taxonomies  handles of taxonomies listed elsewhere
     */
    public function listElsewhere(?Closure $collections = null, ?Closure $taxonomies = null): self
    {
        if ($collections !== null) {
            $this->collections[] = $collections;
        }
        if ($taxonomies !== null) {
            $this->taxonomies[] = $taxonomies;
        }

        return $this;
    }

    /** @return list<string> handles of the collections listed elsewhere */
    public function collectionsElsewhere(): array
    {
        return self::handles($this->collections);
    }

    /** @return list<string> handles of the taxonomies listed elsewhere */
    public function taxonomiesElsewhere(): array
    {
        return self::handles($this->taxonomies);
    }

    /**
     * @param  list<Closure(): iterable<string>>  $sources
     * @return list<string>
     */
    private static function handles(array $sources): array
    {
        $handles = [];
        foreach ($sources as $source) {
            foreach ($source() as $handle) {
                $handles[] = $handle;
            }
        }

        return array_values(array_unique($handles));
    }
}
