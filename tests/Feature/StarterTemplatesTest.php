<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Collection;
use Sunrice\Models\Fieldset;
use Sunrice\Models\Form;
use Sunrice\Models\FormSubmission;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\MenuItem;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Support\Locales;

use function Pest\Laravel\get;

/*
 * Renders real pages through stubs/templates — the files that
 * `vendor:publish --tag=sunrice-templates` copies to resources/views/sunrice.
 */
beforeEach(function () {
    $dir = sys_get_temp_dir().'/sunrice-starter-'.uniqid();
    mkdir($dir);
    symlink(realpath(__DIR__.'/../../stubs/templates'), $dir.'/sunrice');
    View::getFinder()->prependLocation($dir);
    RouteMatcher::flush();
});

it('publishes the starter templates under the sunrice-templates tag', function () {
    $this->artisan('vendor:publish', ['--tag' => 'sunrice-templates', '--force' => true])->assertSuccessful();

    expect(resource_path('views/sunrice/show.blade.php'))->toBeFile()
        ->and(resource_path('views/sunrice/layouts/app.blade.php'))->toBeFile()
        ->and(resource_path('views/sunrice/partials/language-switcher.blade.php'))->toBeFile()
        ->and(public_path('sunrice-theme/app.css'))->toBeFile();

    // The layout links the stylesheet instead of inlining it.
    createEntry(createCollection('pages', ['route' => '/{slug}', 'template' => 'sunrice.show']), 'About');
    RouteMatcher::flush();
    get('/about')->assertOk()
        ->assertSee('<link rel="stylesheet" href="'.asset('sunrice-theme/app.css').'?v=', false)
        ->assertDontSee('<style>', false);
});

it('renders a page with globals, a menu and flexible content blocks', function () {
    Fieldset::create(['handle' => 'hero', 'title' => 'Hero', 'fields' => [
        ['handle' => 'heading', 'type' => 'text', 'label' => 'Heading'],
        ['handle' => 'button', 'type' => 'link', 'label' => 'Button'],
    ]]);
    Fieldset::create(['handle' => 'text', 'title' => 'Text', 'fields' => [
        ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Body'],
    ]]);
    $blueprint = Blueprint::create(['handle' => 'page', 'title' => 'Page', 'fields' => [
        ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Body'],
        ['handle' => 'sections', 'type' => 'flexible', 'label' => 'Sections', 'config' => ['fieldsets' => ['hero', 'text']]],
    ]]);
    $pages = createCollection('pages', ['route' => '/pages/{slug}'], $blueprint);
    createEntry($pages, 'About', [
        'body' => '<p>Intro body</p>',
        'sections' => [
            ['id' => 'b1', 'type' => 'hero', 'values' => [
                'heading' => 'Big hello',
                'button' => ['type' => 'url', 'url' => 'https://example.com/start', 'label' => 'Get started', 'new_tab' => false],
            ]],
            ['id' => 'b2', 'type' => 'text', 'values' => ['body' => '<p>Block text</p>']],
        ],
    ]);

    $siteBlueprint = Blueprint::create(['handle' => 'site', 'title' => 'Site', 'fields' => [
        ['handle' => 'name', 'type' => 'text', 'label' => 'Name'],
    ]]);
    $site = GlobalSet::factory()->create(['handle' => 'site', 'blueprint_id' => $siteBlueprint->id]);
    $site->values()->create(['locale' => Locales::main(), 'data' => ['name' => 'Acme Studio']]);

    $menu = Menu::factory()->create(['handle' => 'main']);
    MenuItem::query()->create([
        'menu_id' => $menu->id, 'sort_order' => 0, 'type' => 'url', 'url' => '/pages/about',
        'labels' => [Locales::main() => 'About us'], 'new_tab' => false,
    ]);

    get('/pages/about')
        ->assertOk()
        ->assertSee('Acme Studio')
        ->assertSee('About us')
        ->assertSee('<p>Intro body</p>', false)
        ->assertSee('Big hello')
        ->assertSee('href="https://example.com/start"', false)
        ->assertSee('<p>Block text</p>', false);
});

it('renders the articles override, archive and term archive', function () {
    $blueprint = Blueprint::create(['handle' => 'article', 'title' => 'Article', 'fields' => [
        ['handle' => 'excerpt', 'type' => 'textarea', 'label' => 'Excerpt'],
        ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Body'],
    ]]);
    $articles = createCollection('articles', [
        'route' => '/articles/{slug}', 'has_archive' => true, 'archive_route' => '/articles',
    ], $blueprint);
    $first = createEntry($articles, 'First post', ['excerpt' => 'A short summary', 'body' => '<p>Hello</p>']);
    createEntry($articles, 'Second post');

    $taxonomy = Taxonomy::factory()->create(['handle' => 'topics', 'title' => 'Topics', 'settings' => ['has_archive' => true, 'route' => '/topics/{slug}']]);
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $term->translations()->first()->update(['name' => 'Laravel', 'slug' => 'laravel']);
    $first->terms()->attach($term);
    RouteMatcher::flush();

    get('/articles/first-post')
        ->assertOk()
        ->assertSee('First post')
        ->assertSee('A short summary')
        ->assertSee('Artikel terbaru')
        ->assertSee('Second post')
        ->assertSee('href="'.$term->fresh()->url.'"', false);

    get('/articles')->assertOk()->assertSee('First post')->assertSee('Second post');

    get('/topics/laravel')->assertOk()->assertSee('Laravel')->assertSee('First post')->assertDontSee('Second post');
});

it('renders a form block with inputs generated from the form fields', function () {
    Fieldset::create(['handle' => 'form', 'title' => 'Form', 'fields' => [
        ['handle' => 'heading', 'type' => 'text', 'label' => 'Heading'],
        ['handle' => 'form', 'type' => 'text', 'label' => 'Form handle'],
    ]]);
    $blueprint = Blueprint::create(['handle' => 'landing', 'title' => 'Landing', 'fields' => [
        ['handle' => 'sections', 'type' => 'flexible', 'label' => 'Sections', 'config' => ['fieldsets' => ['form']]],
    ]]);
    Form::query()->create(['handle' => 'contact', 'title' => 'Contact', 'settings' => [], 'fields' => [
        ['handle' => 'email', 'type' => 'text', 'label' => 'Email', 'required' => true],
        ['handle' => 'topic', 'type' => 'select', 'label' => 'Topic', 'config' => ['options' => [['value' => 'sales', 'label' => 'Sales']]]],
        ['handle' => 'message', 'type' => 'textarea', 'label' => 'Message'],
    ]]);
    $pages = createCollection('pages', ['route' => '/{slug}'], $blueprint);
    createEntry($pages, 'Contact', ['sections' => [
        ['id' => 'f1', 'type' => 'form', 'values' => ['heading' => 'Get in touch', 'form' => 'contact']],
    ]]);

    get('/contact')
        ->assertOk()
        ->assertSee('Get in touch')
        ->assertSee('action="'.route('sunrice.frontend.forms.submit', 'contact').'"', false)
        ->assertSee('name="data[email]"', false)
        ->assertSee('type="email"', false)
        ->assertSee('<option value="sales"', false)
        ->assertSee('name="data[message]"', false);
});

it('serves archives and term pages next to a collection at the site root', function () {
    $pages = createCollection('pages', ['route' => '/']);
    createEntry($pages, 'About');
    $articles = createCollection('articles', ['has_archive' => true]);
    $articles->update(['archive_data' => ['title' => 'All the news', 'intro' => 'Fresh every week']]);
    $old = createEntry($articles, 'Older post');
    $old->update(['published_at' => now()->subDays(3)]);
    createEntry($articles, 'Newest post');
    $taxonomy = Taxonomy::factory()->create(['handle' => 'topics', 'title' => 'Topics', 'settings' => ['has_archive' => true, 'route' => '/topics/{slug}']]);
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $term->translations()->first()->update(['name' => 'Laravel', 'slug' => 'laravel']);
    $old->terms()->attach($term);
    RouteMatcher::flush();

    get('/about')->assertOk()->assertSee('About');
    get('/articles')->assertOk()->assertSee('All the news')->assertSee('Fresh every week')->assertSee('Older post');
    get('/topics/laravel')->assertOk()->assertSee('Older post');

    // "Latest articles" lists the newest first, without the article itself.
    get('/articles/older-post')->assertOk()->assertSeeInOrder(['Artikel terbaru', 'Newest post']);
});

it('links tags only for taxonomies with term pages', function () {
    $articles = createCollection('articles');
    $post = createEntry($articles, 'Post');
    $taxonomy = Taxonomy::factory()->create(['handle' => 'labels', 'title' => 'Labels', 'settings' => []]);
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $term->translations()->first()->update(['name' => 'Internal', 'slug' => 'internal']);
    $post->terms()->attach($term);
    RouteMatcher::flush();

    get('/articles/post')->assertOk()->assertSee('<span>Internal</span>', false)->assertDontSee('/articles/labels/internal');
});

it('defaults entry link text to the entry title and shows a switcher on listings', function () {
    Fieldset::create(['handle' => 'hero', 'title' => 'Hero', 'fields' => [
        ['handle' => 'heading', 'type' => 'text', 'label' => 'Heading'],
        ['handle' => 'button', 'type' => 'link', 'label' => 'Button'],
    ]]);
    $blueprint = Blueprint::create(['handle' => 'page', 'title' => 'Page', 'fields' => [
        ['handle' => 'sections', 'type' => 'flexible', 'label' => 'Sections', 'config' => ['fieldsets' => ['hero']]],
    ]]);
    $pages = createCollection('pages', ['has_archive' => true], $blueprint);
    $pricing = createEntry($pages, 'Pricing plans');
    createEntry($pages, 'Home', ['sections' => [
        ['id' => 'b1', 'type' => 'hero', 'values' => ['heading' => 'Hi', 'button' => ['type' => 'entry', 'entry_id' => $pricing->id]]],
    ]]);
    RouteMatcher::flush();

    get('/pages/home')->assertOk()
        ->assertSee('href="/pages/pricing-plans"', false)
        ->assertSee('Pricing plans');

    get('/pages?page=2')->assertOk()
        ->assertSee('hreflang="en"', false)
        ->assertSee('href="/en/pages"', false)
        ->assertSee('<link rel="canonical" href="'.url('/pages').'?page=2">', false);
});

it('returns form errors to the right form, in the page language, with labels', function () {
    Fieldset::create(['handle' => 'form', 'title' => 'Form', 'fields' => [
        ['handle' => 'form', 'type' => 'text', 'label' => 'Form handle'],
    ]]);
    $blueprint = Blueprint::create(['handle' => 'landing', 'title' => 'Landing', 'fields' => [
        ['handle' => 'sections', 'type' => 'flexible', 'label' => 'Sections', 'config' => ['fieldsets' => ['form']]],
    ]]);
    foreach (['contact', 'newsletter'] as $handle) {
        Form::query()->create(['handle' => $handle, 'title' => ucfirst($handle), 'settings' => [], 'fields' => [
            ['handle' => 'email', 'type' => 'text', 'label' => 'Your email', 'required' => true],
        ]]);
    }
    $pages = createCollection('pages', ['route' => '/{slug}'], $blueprint);
    $page = createEntry($pages, 'Contact', ['sections' => [
        ['id' => 'f1', 'type' => 'form', 'values' => ['form' => 'contact']],
        ['id' => 'f2', 'type' => 'form', 'values' => ['form' => 'newsletter']],
    ]]);
    RouteMatcher::flush();

    $this->from('/contact')
        ->post('/sunrice/forms/contact', ['_form' => 'contact', '_locale' => 'en', 'data' => ['email' => '']])
        ->assertRedirect(url('/contact').'#sunrice-form-contact');

    $html = $this->get('/contact')->assertOk()->getContent();
    // One message, under the contact form only, naming the field by its label.
    expect(substr_count($html, 'class="error"'))->toBe(1)
        ->and($html)->toContain('The Your email field is required.')
        ->and(strpos($html, 'class="error"'))->toBeLessThan(strpos($html, 'id="sunrice-form-newsletter"'));

    $this->from('/contact')
        ->post('/sunrice/forms/contact', ['_form' => 'contact', '_locale' => 'en', 'data' => ['email' => 'a@b.c']])
        ->assertRedirect(url('/contact').'#sunrice-form-contact');
    expect(FormSubmission::query()->first()->locale)->toBe('en');
    $this->get('/contact')->assertSee('sunrice-form-success', false);
});

it('describes listing pages by the page itself, not the last card of the loop', function () {
    config(['sunrice.locales.names' => ['id' => 'Bahasa Indonesia', 'en' => 'English']]);
    $articles = createCollection('articles', ['has_archive' => true]);
    $articles->update(['archive_data' => [
        'id' => ['title' => 'Semua berita', 'intro' => 'Setiap minggu'],
        'en' => ['title' => 'All the news'],
    ]]);
    $post = createEntry($articles, 'Kabar');
    $post->translations()->create([
        'collection_id' => $articles->id, 'locale' => 'en', 'title' => 'News item',
        'slug' => 'news-item', 'data' => [], 'is_ready' => true, 'content_published_at' => now(),
    ]);
    RouteMatcher::flush();

    // Main language: Indonesian text, switcher links to the listing, not to the post.
    get('/articles')->assertOk()
        ->assertSee('<h1>Semua berita</h1>', false)
        ->assertSee('Setiap minggu')
        ->assertSee('<link rel="canonical" href="'.url('/articles').'">', false)
        ->assertSee('<link rel="alternate" hreflang="en" href="'.url('/en/articles').'">', false)
        ->assertSee('href="/en/articles" hreflang="en" lang="en"', false)
        ->assertSee('>English</a>', false)
        ->assertDontSee('/en/articles/news-item" hreflang', false);

    // English: its own heading, the main-language intro, English interface text.
    $empty = createCollection('notes', ['has_archive' => true]);
    RouteMatcher::flush();
    get('/en/articles')->assertOk()->assertSee('<h1>All the news</h1>', false)->assertSee('Setiap minggu');
    get('/en/notes')->assertOk()->assertSee('Nothing here yet.');
    get('/notes')->assertOk()->assertSee('Belum ada konten.');
});

it('previews a translation with that language\'s menus and interface text', function () {
    $articles = createCollection('articles');
    $post = createEntry($articles, 'Kabar');
    $post->translations()->create([
        'collection_id' => $articles->id, 'locale' => 'en', 'title' => 'News item',
        'slug' => 'news-item', 'data' => [], 'is_ready' => false,
    ]);
    $menu = Menu::factory()->create(['handle' => 'main']);
    MenuItem::query()->create([
        'menu_id' => $menu->id, 'sort_order' => 0, 'type' => 'url', 'url' => '/',
        'labels' => ['id' => 'Beranda', 'en' => 'Home'], 'new_tab' => false,
    ]);
    RouteMatcher::flush();

    $url = URL::signedRoute('sunrice.frontend.preview', ['entry' => $post->id, 'locale' => 'en']);

    get($url)->assertOk()->assertSee('News item')->assertSee('>Home</a>', false)
        ->assertSee('Latest articles')->assertDontSee('Beranda');
});

it('shows collection and taxonomy titles in the page language', function () {
    actingAsSuperAdmin();
    $blueprint = Blueprint::factory()->create();
    $this->post('/cms/structure/collections', [
        'handle' => 'berita', 'title' => 'Berita', 'blueprint_id' => $blueprint->id,
        'settings' => ['has_archive' => true, 'titles' => ['en' => 'News', 'id' => 'ignored', 'xx' => 'ignored']],
    ])->assertSessionHasNoErrors();
    $news = Collection::query()->where('handle', 'berita')->firstOrFail();
    expect($news->settings['titles'])->toBe(['en' => 'News']);

    $this->post('/cms/structure/taxonomies', [
        'handle' => 'topik', 'title' => 'Topik', 'collection_ids' => [$news->id],
        'settings' => ['has_archive' => true, 'route' => '/topik/{slug}', 'titles' => ['en' => 'Topics']],
    ])->assertSessionHasNoErrors();
    $taxonomy = Taxonomy::query()->where('handle', 'topik')->firstOrFail();
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $term->translations()->first()->update(['name' => 'Laravel', 'slug' => 'laravel']);
    createEntry($news, 'Kabar')->terms()->attach($term);

    $menu = Menu::factory()->create(['handle' => 'main']);
    MenuItem::query()->create([
        'menu_id' => $menu->id, 'sort_order' => 0, 'type' => 'collection', 'target_id' => $news->id,
        'labels' => [], 'new_tab' => false,
    ]);
    RouteMatcher::flush();
    auth()->logout();

    get('/berita')->assertOk()->assertSee('<h1>Berita</h1>', false)->assertSee('>Berita</a>', false);
    get('/en/berita')->assertOk()->assertSee('<h1>News</h1>', false)->assertSee('>News</a>', false);

    get('/topik/laravel')->assertOk()->assertSee('<title>Laravel — Topik</title>', false);
    get('/en/topik/laravel')->assertOk()->assertSee('<title>Laravel — Topics</title>', false);
});

it('searches the site in the page language and keeps results out of search engines', function () {
    $pages = createCollection('pages', ['route' => '/{slug}']);
    $about = createEntry($pages, 'About the bakery', ['body' => 'Fresh sourdough every morning']);
    createEntry($pages, 'Contact', ['body' => 'Call us']);
    createEntry($pages, 'Secret sourdough', ['body' => 'x'], status: 'draft');
    $other = collect(Locales::available())->first(fn (string $l) => ! Locales::isMain($l));
    $about->translations()->create(['collection_id' => $pages->id, 'locale' => $other, 'title' => 'Translated bakery', 'slug' => 'translated-bakery', 'data' => [], 'seo' => [], 'is_ready' => true]);
    RouteMatcher::flush();

    get('/search?q=SOURDOUGH')->assertOk()
        ->assertSee('About the bakery')
        ->assertDontSee('Secret sourdough')
        ->assertDontSee('Contact</a>', false)
        ->assertSee('<meta name="robots" content="noindex, follow">', false)
        ->assertSee('class="search-results"', false);

    // Other languages search their own text and link their own pages.
    get("/{$other}/search?q=translated")->assertOk()->assertSee('Translated bakery')->assertSee("/{$other}/translated-bakery", false);

    get('/search')->assertOk()->assertSee(__('sunrice::frontend.search_hint'));
    get('/search?q=nothing-like-this')->assertOk()->assertSee('nothing-like-this');
});

it('renders the header with the mobile menu button and the search box', function () {
    Menu::create(['handle' => 'main', 'title' => 'Main']);
    $pages = createCollection('pages', ['route' => '/{slug}', 'template' => 'sunrice.show']);
    createEntry($pages, 'Home page');
    RouteMatcher::flush();

    get('/home-page')->assertOk()
        ->assertSee('aria-controls="site-menu" aria-expanded="false" data-menu-toggle', false)
        ->assertSee('<div class="site-menu" id="site-menu">', false)
        ->assertSee('class="search-form" method="get" action="'.url('/search').'"', false);
});

it('ships error pages that use the site layout for 404', function () {
    $dir = sys_get_temp_dir().'/sunrice-errors-'.uniqid();
    mkdir($dir);
    symlink(realpath(__DIR__.'/../../stubs/errors'), $dir.'/errors');
    View::getFinder()->prependLocation($dir);

    get('/no-such-page')->assertNotFound()
        ->assertSee(__('sunrice::frontend.error_404_title'))
        ->assertSee('class="site-header"', false)
        ->assertSee('<meta name="robots" content="noindex, follow">', false);

    $html = view('errors.500')->render();
    expect($html)->toContain(__('sunrice::frontend.error_500_title'))->not->toContain('site-header');
});

it('renders the entry filter partial', function () {
    $blueprint = Blueprint::create(['handle' => 'product', 'title' => 'Product', 'fields' => [
        ['handle' => 'brand', 'type' => 'select', 'label' => 'Brand', 'config' => ['options' => ['acme', 'zen']]],
        ['handle' => 'price', 'type' => 'number', 'label' => 'Price'],
    ]]);
    $products = createCollection('products', ['route' => '/products/{slug}'], $blueprint);
    createEntry($products, 'Kettle', ['brand' => 'acme', 'price' => 30]);
    createEntry($products, 'Teapot', ['brand' => 'zen', 'price' => 50]);
    $this->app->instance('request', Request::create('/shop', 'GET', ['brand' => 'zen']));

    $html = Blade::render(<<<'BLADE'
        <x-sunrice::entry-filter collection="products" :filters="['q' => 'search', 'brand' => 'select', 'price' => 'range']" :sorts="['newest' => '-published_at', 'cheap' => 'price']">
            @include('sunrice.partials.entry-filter', ['filter' => $component])
            @foreach ($component->entries as $entry)<b>{{ $entry->title }}</b>@endforeach
        </x-sunrice::entry-filter>
        BLADE);

    expect($html)->toContain('<b>Teapot</b>')->not->toContain('<b>Kettle</b>')
        ->toContain('name="brand"')->toContain('<option value="zen" selected>')
        ->toContain('name="price_min"')->toContain('name="sort"')
        ->toContain('Brand: zen ×')->toContain('1 result');
});
