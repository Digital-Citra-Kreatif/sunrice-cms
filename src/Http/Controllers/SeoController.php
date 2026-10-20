<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Cms\Actions\Seo\SaveSeoSettings;
use Sunrice\Cms\Admin\SeoMapping;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Settings\SiteSettings;

/**
 * Settings → SEO: the site's search and sharing settings, and the fields
 * each collection and taxonomy fills its SEO from. Behind
 * cms.settings.site; a kind's rows only for those who may edit it
 * (cms.collections.update, cms.taxonomies.update).
 *
 * @internal
 */
final class SeoController
{
    public function edit(Request $request): Response
    {
        $site = app(SiteSettings::class);
        $may = self::may($request);
        $blueprints = [];
        foreach (Blueprint::query()->get() as $blueprint) {
            $blueprints[$blueprint->handle] = $blueprint;
        }
        $row = function (Collection|Taxonomy $owner) use ($blueprints): array {
            $options = SeoMapping::options($owner, $blueprints);
            $blueprint = $owner->blueprint !== null ? ($blueprints[$owner->blueprint]->title ?? $owner->blueprint) : null;

            return [
                'kind' => $owner instanceof Collection ? 'collection' : 'taxonomy',
                'id' => $owner->id,
                'title' => $owner->title,
                'blueprint' => $blueprint,
                'options' => ['title' => self::list($options['seo_title_field']), 'description' => self::list($options['seo_description_field']), 'image' => self::list($options['seo_image_field'])],
                'chosen' => ['title' => $owner->seo_title_field, 'description' => $owner->seo_description_field, 'image' => $owner->seo_image_field],
            ];
        };

        return Inertia::render('Cms/Seo/Edit', [
            'site' => ['noindex' => $site->noindex, 'appendName' => $site->appendName, 'separator' => $site->separator, 'twitter' => $site->twitter, 'image' => $site->image],
            'siteName' => $site->name(),
            'collections' => $may['collection'] ? Collection::query()->orderBy('title')->get()->map($row)->all() : null,
            'taxonomies' => $may['taxonomy'] ? Taxonomy::query()->orderBy('title')->get()->map($row)->all() : null,
        ]);
    }

    public function update(Request $request, SaveSeoSettings $save): RedirectResponse
    {
        $save->handle($request->only(['site', 'mappings']), self::may($request));

        return back()->with('success', 'SEO settings saved.');
    }

    /**
     * @param  array<string, string>  $fields  handle => label
     * @return list<array{value: string, label: string}>
     */
    private static function list(array $fields): array
    {
        $list = [];
        foreach ($fields as $handle => $label) {
            $list[] = ['value' => $handle, 'label' => $label];
        }

        return $list;
    }

    /** @return array{collection: bool, taxonomy: bool} */
    private static function may(Request $request): array
    {
        $user = $request->user();

        return ['collection' => $user?->can('cms.collections.update') === true, 'taxonomy' => $user?->can('cms.taxonomies.update') === true];
    }
}
