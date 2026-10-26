<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Install;

use Sunrice\Admin\Console\InstallOutput;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Structure\StructureImporter;
use Sunrice\Cms\Structure\StructureImportFailed;

/**
 * Pages and Posts collections for a site that starts empty: Pages
 * (nested, ordered, at /{slug}) with the "page" blueprint, Posts (dated,
 * at /blog/{slug}, listed at /blog, with comments) with the "post"
 * blueprint. Made with StructureImporter, so through the admin's
 * actions. A collection whose handle is taken (in the trash too) is left
 * out, and a blueprint that exists is used as it is. The handles are the
 * blog starter's, which adds to them when it's installed later.
 *
 * sunrice:install offers each (the "cms.collections" step);
 * sunrice:scaffold-collections makes them at any time.
 *
 * @internal
 */
final class ScaffoldCollections
{
    public const PAGES = 'pages';

    public const POSTS = 'posts';

    /** What the install step asks, by handle. */
    public const QUESTIONS = [
        self::PAGES => 'Create a Pages collection (nested pages at /{slug})?',
        self::POSTS => 'Create a Posts collection (dated posts at /blog/{slug}, listed at /blog)?',
    ];

    public function __construct(private readonly StructureImporter $importer) {}

    /**
     * Those of $handles (PAGES, POSTS) no collection has yet.
     *
     * @param  list<string>  $handles
     * @return list<string>
     */
    public function missing(array $handles = [self::PAGES, self::POSTS]): array
    {
        $taken = Collection::withTrashed()->whereIn('handle', $handles)->pluck('handle')->all();

        return array_values(array_filter($handles, fn (string $handle): bool => ! in_array($handle, $taken, true)));
    }

    /**
     * Makes the collections of $handles that are missing. The handles of
     * the collections it made.
     *
     * @param  list<string>  $handles
     * @return list<string>
     *
     * @throws StructureImportFailed
     */
    public function handle(array $handles): array
    {
        $handles = $this->missing(array_values(array_intersect([self::PAGES, self::POSTS], $handles)));
        if ($handles === []) {
            return [];
        }
        $structure = ['blueprints' => [], 'collections' => []];
        $blueprints = Blueprint::query()->pluck('handle')->all();
        foreach ($handles as $handle) {
            [$blueprint, $collection] = $handle === self::PAGES ? $this->pages() : $this->posts();
            if (! in_array($blueprint['handle'], $blueprints, true)) {
                $structure['blueprints'][] = $blueprint;
            }
            $structure['collections'][] = $collection;
        }
        $this->importer->import($structure);

        return $handles;
    }

    /** The install step: asks about each collection the site doesn't have. */
    public function install(InstallOutput $output): void
    {
        $chosen = array_values(array_filter($this->missing(), fn (string $handle): bool => $output->confirm(self::QUESTIONS[$handle], true)));
        if ($chosen === []) {
            return;
        }
        try {
            $made = $this->handle($chosen);
        } catch (StructureImportFailed $e) {
            $output->warn('The collections weren\'t made: '.$e->getMessage());

            return;
        }
        foreach ($made as $handle) {
            $output->detail('Collection', ucfirst($handle));
        }
    }

    /** @return array{array<string, mixed>, array<string, mixed>} */
    private function pages(): array
    {
        return [
            ['handle' => 'page', 'title' => 'Page', 'fields' => [
                ['handle' => 'intro', 'type' => 'textarea', 'label' => 'Intro'],
                ['handle' => 'image', 'type' => 'media', 'label' => 'Image', 'config' => ['types' => ['image']]],
                ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Text'],
            ]],
            ['handle' => self::PAGES, 'title' => 'Pages', 'blueprint' => 'page', 'ordered' => true, 'hierarchical' => true, 'route' => '/{slug}', 'comments' => false,
                'seo_description_field' => 'intro', 'seo_image_field' => 'image'],
        ];
    }

    /** @return array{array<string, mixed>, array<string, mixed>} */
    private function posts(): array
    {
        return [
            ['handle' => 'post', 'title' => 'Post', 'fields' => [
                ['handle' => 'excerpt', 'type' => 'textarea', 'label' => 'Excerpt', 'instructions' => 'One or two sentences for lists and search results.'],
                ['handle' => 'image', 'type' => 'media', 'label' => 'Image', 'config' => ['types' => ['image']]],
                ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Text'],
            ]],
            ['handle' => self::POSTS, 'title' => 'Posts', 'blueprint' => 'post', 'dated' => true, 'route' => '/blog/{slug}', 'listing_route' => '/blog', 'per_page' => 10, 'comments' => true,
                'schema_type' => 'BlogPosting', 'seo_description_field' => 'excerpt', 'seo_image_field' => 'image'],
        ];
    }
}
