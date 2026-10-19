<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;

#[IsReadOnly]
#[Description('An overview of the site, to start with: its name and address, the languages (the first is the main one), the homepage, and the collections (URL patterns, listing pages, blueprints, number of entries), taxonomies, global sets, menus and forms you may see.')]
final class GetSiteInfo extends CmsTool
{
    protected string $name = 'cms_get_site_info';

    public function handle(Request $request): Response
    {
        $user = $this->user();
        $settings = app(SiteSettings::class);
        $collections = Access::collections($user);
        $counts = Entry::query()->whereIn('collection_id', $collections->modelKeys())->selectRaw('collection_id, count(*) as aggregate')->groupBy('collection_id')->pluck('aggregate', 'collection_id');

        return $this->json([
            'name' => $settings->name(),
            'url' => url('/'),
            'languages' => Locales::all(),
            'homepage_entry_id' => $settings->homepage,
            'collections' => $collections->map(fn (Collection $collection): array => [
                'handle' => $collection->handle, 'title' => $collection->title, 'route' => $collection->route, 'listing_route' => $collection->listing_route,
                'blueprint' => $collection->blueprint, 'entries' => is_numeric($counts[$collection->id] ?? null) ? (int) $counts[$collection->id] : 0,
            ])->values()->all(),
            'taxonomies' => Taxonomy::query()->orderBy('title')->get()->filter(fn (Taxonomy $taxonomy): bool => Access::terms($user, $taxonomy))
                ->map(fn (Taxonomy $taxonomy): array => ['handle' => $taxonomy->handle, 'title' => $taxonomy->title, 'route' => $taxonomy->route])->values()->all(),
            'globals' => $this->can('cms.globals.view') ? GlobalSet::query()->orderBy('title')->pluck('title', 'handle')->all() : [],
            'menus' => $this->can('cms.menus.view') ? Menu::query()->orderBy('title')->pluck('title', 'handle')->all() : [],
            'forms' => Form::query()->orderBy('title')->get()->filter(fn (Form $form): bool => Access::submissions($user, 'view', $form))
                ->mapWithKeys(fn (Form $form): array => [$form->handle => $form->title])->all(),
        ]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [];
    }
}
