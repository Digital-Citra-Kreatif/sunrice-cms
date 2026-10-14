<?php

declare(strict_types=1);

namespace Sunrice\Mcp\Tools;

use Illuminate\Database\Eloquent\Model;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Facades\Sunrice;
use Sunrice\Fields\FieldRegistry;
use Sunrice\Mcp\Presenter;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\Fieldset;
use Sunrice\Models\Form;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\Setting;
use Sunrice\Models\Taxonomy;
use Sunrice\Support\Locales;
use Sunrice\Support\SiteSettings;

#[IsReadOnly]
#[Description('Overview of the site: name, URL, languages, settings, and every collection, blueprint, fieldset, taxonomy, global set, menu and form (with handles), the field types available, and what the connected user may do. Call this first.')]
class GetSiteInfo extends SunriceTool
{
    protected string $name = 'get_site_info';

    public function handle(Request $request): Response
    {
        $user = $request->user();
        $settings = SiteSettings::current();
        unset($settings['code']); // tracking scripts: not needed to manage content

        return $this->json([
            'site' => [
                'name' => config('app.name'),
                'url' => url('/'),
                'admin_url' => url(config('sunrice.admin.path', 'cms')),
                'sunrice_version' => Sunrice::version(),
                'homepage_entry_id' => Setting::get('homepage_entry_id'),
                'settings' => $settings,
            ],
            'languages' => [
                'main' => Locales::main(),
                'available' => Locales::available(),
                'names' => Locales::names(),
            ],
            'collections' => Collection::query()->with(['blueprint', 'taxonomies'])->orderBy('title')->get()
                ->map(fn (Collection $c) => Presenter::collection($c) + [
                    'entries' => Entry::query()->where('collection_id', $c->id)->count(),
                ])->all(),
            'blueprints' => Blueprint::query()->orderBy('title')->get(['id', 'handle', 'title'])->toArray(),
            'fieldsets' => Fieldset::query()->orderBy('title')->get(['id', 'handle', 'title'])->toArray(),
            'taxonomies' => Taxonomy::query()->with('collections')->orderBy('title')->get()->map(fn (Taxonomy $t) => [
                'id' => $t->id,
                'handle' => $t->handle,
                'title' => $t->title,
                'hierarchical' => (bool) $t->hierarchical,
                'collections' => $t->collections->pluck('handle')->all(),
                'terms' => $t->terms()->count(),
            ])->all(),
            'globals' => GlobalSet::query()->orderBy('title')->get(['id', 'handle', 'title', 'group'])->toArray(),
            'menus' => Menu::query()->orderBy('title')->get(['id', 'handle', 'title'])->toArray(),
            'forms' => Form::query()->orderBy('title')->get(['id', 'handle', 'title'])->toArray(),
            'field_types' => array_keys(app(FieldRegistry::class)->all()),
            'user' => [
                'id' => $user?->getAuthIdentifier(),
                'name' => $user instanceof Model ? $user->getAttribute('name') : null,
                'email' => $user instanceof Model ? $user->getAttribute('email') : null,
                'permissions' => $user !== null && method_exists($user, 'getAllPermissions')
                    ? $user->getAllPermissions()->pluck('name')->values()->all()
                    : [],
                'super_admin' => $user !== null && method_exists($user, 'hasRole') && $user->hasRole(config('sunrice.super_admin_role')),
            ],
        ]);
    }
}
