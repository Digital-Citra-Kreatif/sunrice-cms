<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\Fieldset;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\MenuItem;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Permissions\SyncPermissions;
use Workbench\App\Models\User;

use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

beforeEach(function () {
    actingAsSuperAdmin();
});

// ---------------- structure ----------------

it('lists collections in the admin', function () {
    Collection::factory()->create(['title' => 'Pages']);

    get('/cms/structure/collections')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Structure/Collections/Index')
            ->has('collections', 1)
            ->where('collections.0.title', 'Pages'));
});

it('creates, updates and deletes a collection', function () {
    $blueprint = Blueprint::factory()->create();
    $taxonomy = Taxonomy::factory()->create();

    post('/cms/structure/collections', [
        'handle' => 'pages',
        'title' => 'Pages',
        'blueprint_id' => $blueprint->id,
        'taxonomy_ids' => [$taxonomy->id],
        'settings' => ['route' => 'pages', 'dated' => true],
    ])->assertRedirect(route('sunrice.admin.structure.collections.index'));

    $collection = Collection::where('handle', 'pages')->first();
    expect($collection)->not->toBeNull()
        ->and($collection->taxonomies)->toHaveCount(1)
        ->and($collection->settings['dated'])->toBeTrue()
        // 'pages' is the handle default, so it isn't stored and follows the handle.
        ->and($collection->settings)->not->toHaveKey('route')
        ->and($collection->entryRoute())->toBe('/pages/{slug}');

    put("/cms/structure/collections/{$collection->id}", [
        'title' => 'Site pages',
        'blueprint_id' => $blueprint->id,
        'settings' => ['route' => 'site'],
    ])->assertRedirect();

    expect($collection->refresh()->title)->toBe('Site pages')
        ->and($collection->settings['route'])->toBe('/site/{slug}')
        ->and($collection->entryRoute())->toBe('/site/{slug}');

    delete("/cms/structure/collections/{$collection->id}")->assertRedirect();
    expect(Collection::find($collection->id))->toBeNull();
});

it('creates blueprints with a nested field tree', function () {
    post('/cms/structure/blueprints', [
        'title' => 'Article',
        'handle' => 'article',
        'fields' => [
            ['handle' => 'body', 'type' => 'rich_text', 'required' => true],
            ['handle' => 'meta', 'type' => 'group', 'fields' => [
                ['handle' => 'author', 'type' => 'text'],
            ]],
        ],
    ])->assertRedirect();

    $blueprint = Blueprint::where('handle', 'article')->first();
    expect($blueprint->fields)->toHaveCount(2)
        ->and($blueprint->fields[1]['fields'][0]['handle'])->toBe('author');
});

it('rejects blueprints with two fields sharing a handle', function () {
    post('/cms/structure/blueprints', [
        'title' => 'Article',
        'handle' => 'article',
        'fields' => [
            ['handle' => 'body', 'type' => 'text'],
            ['handle' => 'body', 'type' => 'textarea'],
        ],
    ])->assertSessionHasErrors('fields.0.handle');

    expect(Blueprint::where('handle', 'article')->exists())->toBeFalse();
});

it('creates, updates and deletes fieldsets', function () {
    post('/cms/structure/fieldsets', [
        'title' => 'SEO',
        'handle' => 'seo',
        'fields' => [['handle' => 'description', 'type' => 'textarea']],
    ])->assertRedirect();

    $fieldset = Fieldset::where('handle', 'seo')->first();
    expect($fieldset->fields[0]['handle'])->toBe('description');

    put("/cms/structure/fieldsets/{$fieldset->id}", [
        'title' => 'SEO meta',
        'fields' => [['handle' => 'og_image', 'type' => 'asset']],
    ])->assertRedirect();
    expect($fieldset->refresh()->fields[0]['handle'])->toBe('og_image');

    delete("/cms/structure/fieldsets/{$fieldset->id}")->assertRedirect();
    expect(Fieldset::find($fieldset->id))->toBeNull();
});

it('creates taxonomies and terms via admin routes', function () {
    post('/cms/structure/taxonomies', [
        'title' => 'Categories',
        'handle' => 'categories',
        'hierarchical' => true,
        'settings' => ['route' => 'category'],
    ])->assertRedirect();

    $taxonomy = Taxonomy::where('handle', 'categories')->first();
    expect($taxonomy->hierarchical)->toBeTrue();

    post("/cms/taxonomies/{$taxonomy->handle}/terms", [
        'translations' => [
            'id' => ['name' => 'Berita'],
            'en' => ['title' => 'News'],
        ],
    ])->assertRedirect();

    $term = Term::where('taxonomy_id', $taxonomy->id)->first();
    expect($term->translations)->toHaveCount(2)
        ->and($term->mainTranslation()->slug)->toBe('berita');

    put("/cms/terms/{$term->id}", [
        'translations' => ['id' => ['title' => 'Berita Baru']],
    ])->assertRedirect();
    expect($term->refresh()->mainTranslation()->name)->toBe('Berita Baru');

    delete("/cms/terms/{$term->id}")->assertRedirect();
    expect(Term::find($term->id))->toBeNull();
});

it('skips blank optional languages and saves terms all-or-nothing', function () {
    $taxonomy = Taxonomy::create(['handle' => 'tags', 'title' => 'Tags']);

    post("/cms/taxonomies/{$taxonomy->handle}/terms", [
        'translations' => ['id' => ['title' => 'Satu', 'slug' => ''], 'en' => ['title' => '', 'slug' => '']],
    ])->assertSessionHasNoErrors();
    $first = Term::where('taxonomy_id', $taxonomy->id)->first();
    expect($first->translations)->toHaveCount(1);

    post("/cms/taxonomies/{$taxonomy->handle}/terms", [
        'translations' => ['id' => ['title' => '', 'slug' => '']],
    ])->assertSessionHasErrors('translations.id.title');

    // The English slug clashes: nothing of the new term is kept.
    post("/cms/taxonomies/{$taxonomy->handle}/terms", [
        'translations' => ['id' => ['title' => 'Dua'], 'en' => ['title' => 'Two', 'slug' => 'satu']],
    ])->assertSessionHasNoErrors();
    post("/cms/taxonomies/{$taxonomy->handle}/terms", [
        'translations' => ['id' => ['title' => 'Tiga'], 'en' => ['title' => 'Three', 'slug' => 'satu']],
    ])->assertSessionHasErrors('translations.en.slug');
    expect(Term::where('taxonomy_id', $taxonomy->id)->count())->toBe(2);
});

// ---------------- entries ----------------

it('creates, edits, publishes and trashes an entry through the admin', function () {
    $collection = createCollection('pages');

    post("/cms/collections/{$collection->handle}/entries", [
        'title' => 'About',
        'data' => ['body' => 'Hello'],
    ])->assertRedirect();

    $entry = Entry::first();
    expect($entry->mainTranslation()->draft['data']['body'] ?? $entry->mainTranslation()->data['body'])->toBe('Hello');

    put("/cms/entries/{$entry->id}", [
        'locale' => 'id',
        'title' => 'About v2',
        'slug' => 'about-v2',
        'data' => ['body' => 'Updated'],
    ])->assertRedirect();

    $translation = $entry->translations()->where('locale', 'id')->first();
    expect($translation->draft['data']['body'])->toBe('Updated')
        ->and($translation->draft['slug'])->toBe('about-v2');

    post("/cms/entries/{$entry->id}/publish", ['locale' => 'id'])->assertRedirect();
    expect($entry->refresh()->status)->toBe('published')
        ->and($translation->refresh()->data['body'])->toBe('Updated')
        ->and($translation->draft)->toBeNull();

    delete("/cms/entries/{$entry->id}")->assertRedirect();
    expect($entry->fresh()->trashed())->toBeTrue();

    post("/cms/entries/{$entry->id}/restore")->assertRedirect();
    expect($entry->refresh()->deleted_at)->toBeNull();

    delete("/cms/entries/{$entry->id}")->assertRedirect();
    delete("/cms/entries/{$entry->id}/force")->assertRedirect();
    expect(Entry::withTrashed()->find($entry->id))->toBeNull();
});

it('rejects a duplicate slug on create without leaving an orphaned entry', function () {
    $collection = createCollection('pages');
    createEntry($collection, 'About'); // slug 'about'

    post("/cms/collections/{$collection->handle}/entries", [
        'title' => 'Again',
        'slug' => 'about',
    ])->assertSessionHasErrors('slug');

    expect(Entry::count())->toBe(1);
});

it('rejects a slug on update that collides with another entry', function () {
    $collection = createCollection('pages');
    $first = createEntry($collection, 'About');
    $second = createEntry($collection, 'Contact');

    put("/cms/entries/{$second->id}", [
        'locale' => 'id',
        'title' => 'Contact',
        'slug' => 'about',
    ])->assertSessionHasErrors('slug');

    expect($second->mainTranslation()->slug)->toBe('contact');
});

it('duplicates an entry', function () {
    $collection = Collection::factory()->create(['handle' => 'pages']);
    $entry = createEntry($collection, 'Home', ['x' => 1]);

    post("/cms/entries/{$entry->id}/duplicate")->assertRedirect();

    expect(Entry::count())->toBe(2);
    $copy = Entry::orderByDesc('id')->first();
    expect($copy->id)->not->toBe($entry->id)
        ->and($copy->mainTranslation()->draft['data'] ?? $copy->mainTranslation()->data)->toEqual(['x' => 1])
        ->and($copy->mainTranslation()->slug)->not->toBe('home');
});

it('saves a secondary translation and marks it ready', function () {
    $collection = Collection::factory()->create();
    $entry = createEntry($collection, 'Beranda');

    put("/cms/entries/{$entry->id}", [
        'locale' => 'en',
        'title' => 'Home',
        'slug' => 'home',
        'data' => [],
        'is_ready' => true,
    ])->assertRedirect();

    $en = $entry->translations()->where('locale', 'en')->first();
    expect($en)->not->toBeNull()
        ->and($en->is_ready)->toBeTrue()
        ->and($en->draft['title'])->toBe('Home');

    put("/cms/entry-translations/{$en->id}/return-to-draft")->assertRedirect();
    expect($en->refresh()->is_ready)->toBeFalse();
});

it('exports entries as csv honoring filters', function () {
    $collection = Collection::factory()->create(['handle' => 'pages']);
    createEntry($collection, 'Satu');
    createEntry($collection, 'Dua', [], 'draft');

    $response = get("/cms/collections/{$collection->handle}/entries/export?filters[status]=draft");
    $response->assertOk();
    $content = $response->streamedContent();
    expect($content)->toContain('Dua')
        ->and($content)->not->toContain('Satu');
});

// ---------------- menus / globals ----------------

it('builds a menu with nested items', function () {
    post('/cms/menus', ['handle' => 'main', 'title' => 'Main'])->assertRedirect();
    $menu = Menu::where('handle', 'main')->first();

    post("/cms/menus/{$menu->id}/items", [
        'type' => 'url', 'url' => '/about', 'labels' => ['id' => 'Tentang'],
    ])->assertRedirect();
    post("/cms/menus/{$menu->id}/items", [
        'type' => 'url', 'url' => '/blog', 'labels' => ['id' => 'Blog'],
    ])->assertRedirect();

    $parent = MenuItem::where('menu_id', $menu->id)->orderBy('id')->first();
    post("/cms/menus/{$menu->id}/items", [
        'parent_id' => $parent->id, 'type' => 'url', 'url' => '/child', 'labels' => ['id' => 'Child'],
    ])->assertRedirect();

    $other = MenuItem::where('menu_id', $menu->id)->whereNull('parent_id')->orderByDesc('id')->first();
    post("/cms/menus/{$menu->id}/items/reorder", [
        'items' => [
            ['id' => $other->id],
            ['id' => $parent->id],
            ['id' => $parent->children()->first()->id, 'parent_id' => $parent->id],
        ],
    ])->assertRedirect();

    expect($other->refresh()->sort_order)->toBe(1);

    $item = MenuItem::where('url', '/child')->first();
    delete("/cms/menu-items/{$item->id}")->assertRedirect();
    expect(MenuItem::find($item->id))->toBeNull();
});

it('creates a global set and saves values per locale', function () {
    $blueprint = Blueprint::factory()->create(['fields' => [
        ['handle' => 'text', 'type' => 'text'],
        ['handle' => 'year', 'type' => 'number'],
    ]]);

    post('/cms/globals', [
        'handle' => 'footer', 'title' => 'Footer', 'group' => 'global',
        'blueprint_id' => $blueprint->id,
    ])->assertRedirect();

    $set = GlobalSet::where('handle', 'footer')->first();

    put("/cms/globals/{$set->id}", ['locale' => 'id', 'values' => ['text' => 'Hak cipta', 'year' => 7]])->assertRedirect();
    // The editor posts every field; English keeps only its text.
    put("/cms/globals/{$set->id}", ['locale' => 'en', 'values' => ['text' => 'Copyright', 'year' => 8]])->assertRedirect();

    expect($set->valueFor('en')->data)->toBe(['text' => 'Copyright'])
        ->and($set->valuesFor('en'))->toEqual(['text' => 'Copyright', 'year' => 7])
        ->and($set->valuesFor('id'))->toEqual(['text' => 'Hak cipta', 'year' => 7]);

    get("/cms/globals/{$set->id}/edit")->assertInertia(fn (Assert $page) => $page
        ->where('values.en.year', 7)
        ->where('values.en.text', 'Copyright')
        ->where('translated', ['en']));
});

// ---------------- users / roles ----------------

it('manages users and roles', function () {
    app(SyncPermissions::class)->handle();
    post('/cms/roles', ['name' => 'editor'])->assertRedirect();
    $role = Role::where('name', 'editor')->first();
    expect($role)->not->toBeNull();

    put("/cms/roles/{$role->id}", ['name' => 'editor', 'permissions' => ['sunrice.access-admin']])->assertRedirect();
    expect($role->fresh()->permissions->pluck('name')->all())->toContain('sunrice.access-admin');

    post('/cms/users', [
        'name' => 'Ed', 'email' => 'ed@x.com',
        'password' => 'secret-pw-123', 'password_confirmation' => 'secret-pw-123',
        'roles' => ['editor'],
    ])->assertRedirect();

    $user = User::where('email', 'ed@x.com')->first();
    expect($user->roles->pluck('name')->all())->toContain('editor');

    put("/cms/users/{$user->id}", ['roles' => []])->assertRedirect();
    expect($user->roles()->count())->toBe(0);

    delete("/cms/users/{$user->id}")->assertRedirect();
    expect(User::find($user->id))->toBeNull();

    // role can be deleted once unassigned
    delete("/cms/roles/{$role->id}")->assertRedirect();
    expect(Role::find($role->id))->toBeNull();
});

it('serves entry and term search endpoints for pickers', function () {
    $collection = Collection::factory()->create(['handle' => 'pages']);
    createEntry($collection, 'Kontak Kami');

    $taxonomy = Taxonomy::factory()->create(['handle' => 'cats']);
    $term = Term::factory()->for($taxonomy)->create();
    $term->translations->first()->update(['name' => 'Berita', 'slug' => 'berita']);

    get('/cms/api/entries?q=kontak')
        ->assertOk()
        ->assertJsonPath('data.0.title', 'Kontak Kami');

    get('/cms/api/terms?taxonomy=cats&q=beri')
        ->assertOk()
        ->assertJsonPath('data.0.title', 'Berita');
});

it('limits term search to taxonomies the user may use', function () {
    $collection = Collection::factory()->create(['handle' => 'posts']);
    $taxonomy = Taxonomy::factory()->create(['handle' => 'cats']);
    $collection->taxonomies()->attach($taxonomy);
    $term = Term::factory()->for($taxonomy)->create();
    $term->translations->first()->update(['name' => 'Berita', 'slug' => 'berita']);
    app(SyncPermissions::class)->handle();

    $user = User::query()->create(['name' => 'Author', 'email' => 'author@x.com', 'password' => bcrypt('password')]);
    $user->givePermissionTo('sunrice.access-admin');
    test()->actingAs($user);

    get('/cms/api/terms?taxonomy=cats')->assertOk()->assertJsonCount(0, 'data');

    $user->givePermissionTo("sunrice.entries.{$collection->id}.edit-own");
    $user->unsetRelation('permissions');
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    get('/cms/api/terms?taxonomy=cats')->assertOk()->assertJsonPath('data.0.title', 'Berita');
});

it('searches entries by title, sorts by title and filters scheduled entries', function () {
    $collection = createCollection('posts');
    createEntry($collection, 'Banana');
    createEntry($collection, 'Apple');
    $later = createEntry($collection, 'Cherry');
    $later->update(['published_at' => now()->addWeek()]);

    get('/cms/collections/posts/entries?search=ban')->assertInertia(fn (Assert $page) => $page
        ->has('rows.data', 1)->where('rows.data.0.title', 'Banana'));

    get('/cms/collections/posts/entries?sort=title')->assertInertia(fn (Assert $page) => $page
        ->where('rows.data.0.title', 'Apple')->where('meta.sort', 'title'));

    get('/cms/collections/posts/entries?filters[status]=scheduled')->assertInertia(fn (Assert $page) => $page
        ->has('rows.data', 1)->where('rows.data.0.title', 'Cherry')->where('rows.data.0.status', 'scheduled'));

    get('/cms/collections/posts/entries?filters[status]=published')->assertInertia(fn (Assert $page) => $page
        ->has('rows.data', 2));
});

it('updates global settings through the meta route', function () {
    $blueprint = Blueprint::factory()->create();
    $set = GlobalSet::create(['handle' => 'site', 'title' => 'Site', 'group' => 'global', 'blueprint_id' => $blueprint->id]);

    put("/cms/globals/{$set->id}/meta", ['title' => 'Site info', 'blueprint_id' => $blueprint->id])
        ->assertSessionHas('success');
    expect($set->fresh()->title)->toBe('Site info');
});

it('saves a global set\'s values and settings with one save', function () {
    $blueprint = Blueprint::factory()->create(['fields' => [['handle' => 'text', 'type' => 'text']]]);
    $other = Blueprint::factory()->create(['title' => 'Footer']);
    $set = GlobalSet::create(['handle' => 'site', 'title' => 'Site', 'group' => 'global', 'blueprint_id' => $blueprint->id]);

    put("/cms/globals/{$set->id}", [
        'values' => ['text' => 'Hello'],
        'meta' => ['title' => 'Site info', 'blueprint_id' => $other->id],
    ])->assertSessionHasNoErrors()->assertSessionHas('success');

    $set->refresh();
    expect($set->title)->toBe('Site info')->and($set->blueprint_id)->toBe($other->id)
        ->and($set->values()->first()->data)->toBe(['text' => 'Hello']);

    // Settings errors come back under meta.*.
    put("/cms/globals/{$set->id}", ['values' => [], 'meta' => ['title' => '', 'blueprint_id' => $other->id]])
        ->assertSessionHasErrors('meta.title');

    get("/cms/globals/{$set->id}/edit")->assertInertia(fn (Assert $page) => $page->where('related.0.label', 'All globals'));
});

it('lists everything a blueprint is used by', function () {
    $blueprint = Blueprint::factory()->create(['title' => 'Category']);
    Taxonomy::create(['handle' => 'topics', 'title' => 'Topics', 'blueprint_id' => $blueprint->id]);
    createCollection('news', ['has_archive' => true, 'archive_blueprint_id' => $blueprint->id]);

    get('/cms/structure/blueprints')->assertInertia(fn (Assert $page) => $page
        ->where('blueprints.0.used_by', [
            ['type' => 'Taxonomy', 'title' => 'Topics'],
            ['type' => 'Archive/listing page', 'title' => 'News'],
        ]));
});

it('renders unknown admin URLs as a 404 inside the admin layout', function () {
    get('/cms/does-not-exist')->assertNotFound()->assertInertia(fn (Assert $page) => $page
        ->component('Error')
        ->where('status', 404)
        ->has('auth.user')
        ->has('navigation'));
});
