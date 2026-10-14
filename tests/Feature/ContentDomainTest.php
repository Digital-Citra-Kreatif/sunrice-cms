<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Sunrice\Actions\Taxonomies\DeleteTaxonomy;
use Sunrice\Actions\Taxonomies\SaveTerm;
use Sunrice\Actions\Taxonomies\TrashTerm;
use Sunrice\Frontend\GlobalsRepository;
use Sunrice\Frontend\MenuBuilder;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Models\Blueprint;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\MenuItem;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Query\EntryQuery;
use Sunrice\Support\Locales;

beforeEach(function () {
    actingAsSuperAdmin();
});

// ---------------- taxonomy domain (T10.1) ----------------

it('resolves a term translation with whole-term fallback', function () {
    $taxonomy = Taxonomy::factory()->create();
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $term->translations()->first()->update(['name' => 'Main', 'slug' => 'main-slug']);

    // No 'en' translation → falls back to main locale.
    expect($term->resolveFor('en')->slug)->toBe('main-slug');

    $english = $term->translations()->create([
        'taxonomy_id' => $taxonomy->id,
        'locale' => 'en',
        'name' => 'English',
        'slug' => 'english-slug',
        'data' => [],
    ]);

    // Not Ready yet → still the main locale.
    expect($term->resolveFor('en')->slug)->toBe('main-slug');

    $english->update(['is_ready' => true]);
    expect($term->resolveFor('en')->slug)->toBe('english-slug')
        ->and($term->resolveFor(Locales::main())->slug)->toBe('main-slug');
});

it('enforces term slug uniqueness per taxonomy and locale including trashed', function () {
    $taxonomy = Taxonomy::factory()->create();
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $term->translations()->first()->update(['name' => 'Taken', 'slug' => 'taken']);
    app(TrashTerm::class)->handle($term);

    // Same slug in a new term of the same taxonomy + locale is rejected.
    try {
        app(SaveTerm::class)->handle($taxonomy, [
            'translations' => [Locales::main() => ['title' => 'Taken2', 'slug' => 'taken']],
        ]);
        $this->fail('expected ValidationException');
    } catch (ValidationException $e) {
        expect($e->errors())->toHaveKey('translations.'.Locales::main().'.slug');
    }
});

it('rejects placing a term under itself or one of its descendants', function () {
    $taxonomy = Taxonomy::factory()->create();
    $parent = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $child = Term::factory()->create(['taxonomy_id' => $taxonomy->id, 'parent_id' => $parent->id]);
    $main = Locales::main();
    $translation = ['title' => 'Parent', 'slug' => $parent->translations()->first()->slug];

    foreach ([$parent->id, $child->id] as $target) {
        try {
            app(SaveTerm::class)->handle($taxonomy, [
                'parent_id' => $target,
                'translations' => [$main => $translation],
            ], $parent);
            $this->fail('expected ValidationException');
        } catch (ValidationException $e) {
            expect($e->errors())->toHaveKey('parent_id');
        }
    }

    expect($parent->fresh()->parent_id)->toBeNull();
});

it('deletes a taxonomy with its terms', function () {
    $taxonomy = Taxonomy::factory()->create();
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);

    app(DeleteTaxonomy::class)->handle($taxonomy);

    expect(Taxonomy::find($taxonomy->id))->toBeNull()
        ->and(Term::withTrashed()->find($term->id))->toBeNull();
});

it('builds term URLs from the taxonomy route', function () {
    $taxonomy = Taxonomy::factory()->create(['settings' => ['route' => '/blog/tags/{slug}']]);
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $term->translations()->first()->update(['slug' => 'laravel']);

    expect(app(UrlGenerator::class)->term($term, Locales::main()))->toBe('/blog/tags/laravel');
});

it('filters entries by term including descendants', function () {
    $collection = createCollection();
    $taxonomy = Taxonomy::factory()->create(['hierarchical' => true]);
    $collection->taxonomies()->attach($taxonomy->id);

    $parent = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $child = Term::factory()->create(['taxonomy_id' => $taxonomy->id, 'parent_id' => $parent->id]);

    $inChild = createEntry($collection, title: 'Tagged');
    $inChild->terms()->attach($child->id);
    $unrelated = createEntry($collection, title: 'Untagged');

    $query = EntryQuery::forCollection($collection)->whereTerm($taxonomy->handle, $parent->id, includeChildren: true);
    expect($query->get()->pluck('id')->all())->toBe([$inChild->id]);

    $query = EntryQuery::forCollection($collection)->whereTerm($taxonomy->handle, $parent->id);
    expect($query->get())->toHaveCount(0);
});

// ---------------- navigation domain (T10.2) ----------------

it('builds menus with locale labels and URLs that follow slug changes', function () {
    $collection = createCollection();
    $entry = createEntry($collection);
    $entry->mainTranslation()->update(['slug' => 'old-slug']);

    $menu = Menu::factory()->create(['handle' => 'main']);
    MenuItem::query()->create([
        'menu_id' => $menu->id,
        'sort_order' => 0,
        'type' => 'entry',
        'target_id' => $entry->id,
        'labels' => [Locales::main() => 'Beranda', 'en' => 'Home'],
        'new_tab' => false,
    ]);

    $nodes = app(MenuBuilder::class)->build('main', 'en');
    expect($nodes)->toHaveCount(1)
        ->and($nodes->first()->label)->toBe('Home');

    // Slug change is reflected in the generated URL.
    $entry->mainTranslation()->update(['slug' => 'new-slug']);
    Cache::flush();
    $nodes = app(MenuBuilder::class)->build('main', 'en');
    expect($nodes->first()->url)->toContain('new-slug');
});

it('skips menu items whose target is unpublished or trashed', function () {
    $collection = createCollection();
    $entry = createEntry($collection, title: 'Live');
    $draft = createEntry($collection, title: 'Draft', status: 'draft');
    $trashed = createEntry($collection, title: 'Trashed');
    $trashed->delete();

    $menu = Menu::factory()->create(['handle' => 'main']);
    foreach ([$entry->id, $draft->id, $trashed->id] as $i => $target) {
        MenuItem::query()->create([
            'menu_id' => $menu->id, 'sort_order' => $i,
            'type' => 'entry', 'target_id' => $target, 'labels' => [],
            'new_tab' => false,
        ]);
    }

    $nodes = app(MenuBuilder::class)->build('main', Locales::main());
    expect($nodes)->toHaveCount(1);
});

it('marks the active menu item per request, not from the cached menu', function () {
    $menu = Menu::factory()->create(['handle' => 'main']);
    foreach (['/' => 'Home', '/en' => 'English home', '/about' => 'About', '/blog' => 'Blog'] as $url => $label) {
        MenuItem::query()->create([
            'menu_id' => $menu->id, 'sort_order' => 0, 'type' => 'url', 'url' => $url,
            'labels' => [Locales::main() => $label], 'new_tab' => false,
        ]);
    }

    $activeOn = function (string $path) {
        app()->instance('request', Request::create($path));

        return app(MenuBuilder::class)->build('main', Locales::main())
            ->filter(fn ($node) => $node->isActive)
            ->pluck('label')
            ->all();
    };

    // The first build is cached; later requests must still get their own active item.
    expect($activeOn('/about'))->toBe(['About'])
        ->and($activeOn('/blog/first-post'))->toBe(['Blog'])
        ->and($activeOn('/'))->toBe(['Home'])
        ->and($activeOn('/en/about'))->toBe([]);
});

// ---------------- globals domain (T10.3) ----------------

it('returns global values, falling back to the main language', function () {
    $blueprint = Blueprint::create(['handle' => 'footer', 'title' => 'Footer', 'fields' => [
        ['handle' => 'tagline', 'type' => 'text', 'label' => 'Tagline', 'config' => []],
    ]]);
    $set = GlobalSet::factory()->create(['blueprint_id' => $blueprint->id]);
    $set->values()->create(['locale' => Locales::main(), 'data' => ['tagline' => 'Halo']]);

    $globals = app(GlobalsRepository::class);

    // No 'en' row: the main language's values.
    expect($globals->get($set->handle, 'en')->get('tagline'))->toBe('Halo');
    expect($globals->get($set->handle)->get('tagline'))->toBe('Halo');
    expect($globals->get($set->handle)->tagline)->toBe('Halo');

    // With an 'en' row, the locale wins.
    $set->values()->create(['locale' => 'en', 'data' => ['tagline' => 'Hello']]);
    Cache::flush();
    expect($globals->get($set->handle, 'en')->get('tagline'))->toBe('Hello');
});

it('shares a global\'s non-translatable fields with every language', function () {
    $blueprint = Blueprint::create(['handle' => 'social', 'title' => 'Social', 'fields' => [
        ['handle' => 'twitter', 'type' => 'text', 'label' => 'Twitter', 'translatable' => false],
        ['handle' => 'tagline', 'type' => 'text', 'label' => 'Tagline'],
    ]]);
    $set = GlobalSet::factory()->create(['blueprint_id' => $blueprint->id]);
    $set->setValuesFor(Locales::main(), ['twitter' => '@sunrice', 'tagline' => 'Halo']);
    $set->setValuesFor('en', ['twitter' => '@other', 'tagline' => 'Hello']);

    // Only the translated text is stored for English.
    expect($set->valueFor('en')->data)->toBe(['tagline' => 'Hello']);

    $en = app(GlobalsRepository::class)->get($set->handle, 'en');
    expect($en->get('twitter'))->toBe('@sunrice')->and($en->get('tagline'))->toBe('Hello')
        ->and(sunrice_global($set->handle)->twitter)->toBe('@sunrice');

    // Changing the shared value once changes it everywhere.
    $set->setValuesFor(Locales::main(), ['twitter' => '@new', 'tagline' => 'Halo']);
    Cache::flush();
    expect(app(GlobalsRepository::class)->get($set->handle, 'en')->get('twitter'))->toBe('@new');
});
