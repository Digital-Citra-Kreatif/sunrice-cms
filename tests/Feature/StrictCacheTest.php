<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Cache;
use Sunrice\Frontend\MenuBuilder;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Models\Blueprint;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\MenuItem;
use Sunrice\Query\EntryQuery;
use Sunrice\Support\Locales;

use function Pest\Laravel\get;

// Laravel 13 sites refuse to unserialize objects from the cache by
// default (cache.serializable_classes = false): Sunrice caches plain
// values only, so a warm cache must keep working.
beforeEach(function () {
    config([
        'cache.serializable_classes' => false,
        'cache.stores.strict' => ['driver' => 'file', 'path' => storage_path('framework/cache/strict-test')],
        'sunrice.cache.enabled' => true,
        'sunrice.cache.store' => 'strict',
    ]);
    Cache::store('strict')->flush();
    RouteMatcher::flush();
});

afterEach(fn () => Cache::store('strict')->flush());

it('serves pages, menus, globals and lists from a warm cache without cached objects', function () {
    $collection = createCollection('blog', ['route' => '/blog/{slug}', 'has_archive' => true, 'archive_route' => '/blog']);
    $first = createEntry($collection, 'First post');
    createEntry($collection, 'Second post');
    $menu = Menu::create(['handle' => 'main', 'title' => 'Main']);
    MenuItem::create(['menu_id' => $menu->id, 'type' => 'url', 'url' => '/blog', 'labels' => [Locales::main() => 'Blog']]);
    $blueprint = Blueprint::create(['handle' => 'site', 'title' => 'Site', 'fields' => [['handle' => 'tagline', 'type' => 'text']]]);
    $set = GlobalSet::create(['handle' => 'site', 'title' => 'Site', 'group' => 'global', 'blueprint_id' => $blueprint->id]);
    $set->values()->create(['locale' => Locales::main(), 'data' => ['tagline' => 'Fresh news']]);

    $slug = $first->translations()->first()->slug;
    foreach ([1, 2] as $pass) {
        // A new request each time: only the cache carries over.
        RouteMatcher::flush(keepCache: true);
        app()->forgetScopedInstances();

        get("/blog/{$slug}")->assertOk()->assertSee('First post');
        expect(app(RouteMatcher::class)->match("/blog/{$slug}")?->collection?->handle)->toBe('blog')
            ->and(app(MenuBuilder::class)->build('main')->first()?->label)->toBe('Blog')
            ->and(sunrice_global('site')?->get('tagline'))->toBe('Fresh news')
            ->and(EntryQuery::forCollection($collection)->get()->pluck('title')->sort()->values()->all())->toBe(['First post', 'Second post']);

        $page = EntryQuery::forCollection($collection)->paginate(1);
        expect($page->total())->toBe(2)->and($page->count())->toBe(1)->and($page->first())->not->toBeNull();
    }
});
