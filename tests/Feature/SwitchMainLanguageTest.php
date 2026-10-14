<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Cache;
use Sunrice\Actions\Entries\PublishTranslation;
use Sunrice\Actions\Entries\SaveDraft;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\MenuItem;
use Sunrice\Models\Redirect;
use Sunrice\Models\Setting;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Support\Locales;
use Sunrice\Support\SiteSettings;

use function Pest\Laravel\artisan;
use function Pest\Laravel\get;

beforeEach(function () {
    // Site settings are read at boot, before the database is reset: on
    // MySQL a switched main language from the previous test can leak in.
    Setting::query()->where('key', 'site')->delete();
    Cache::forget(SiteSettings::CACHE_KEY);
    config(['sunrice.locales.main' => 'id', 'sunrice.locales.available' => ['id', 'en']]);

    actingAsSuperAdmin();
    RouteMatcher::flush();

    $this->blueprint = Blueprint::create(['handle' => 'switch_page', 'title' => 'Page', 'fields' => [
        ['handle' => 'intro', 'type' => 'text'],
        ['handle' => 'code', 'type' => 'text', 'translatable' => false],
        ['handle' => 'features', 'type' => 'repeater', 'config' => ['fields' => [
            ['handle' => 'title', 'type' => 'text'],
            ['handle' => 'icon', 'type' => 'text', 'translatable' => false],
        ]]],
    ]]);
    $this->pages = createCollection('pages', ['route' => '/pages/{slug}', 'translatable' => true], $this->blueprint);
});

/** An Indonesian (main) page with an English translation, both published. */
afterEach(function () {
    Setting::query()->where('key', 'site')->delete();
    Cache::forget(SiteSettings::CACHE_KEY);
});

function bilingualPage(): Entry
{
    $entry = createEntry(test()->pages, 'Beranda');
    $id = $entry->mainTranslation();
    app(SaveDraft::class)->handle($id, ['title' => 'Beranda', 'slug' => 'beranda', 'data' => [
        'intro' => 'Selamat datang',
        'code' => 'SKU-1',
        'features' => [['title' => 'Cepat', 'icon' => 'bolt']],
    ]]);
    app(PublishTranslation::class)->handle($id->refresh());

    $main = $id->refresh()->data;
    $edited = $main;
    $edited['intro'] = 'Welcome';
    $edited['features'][0]['title'] = 'Fast';

    $en = EntryTranslation::query()->create([
        'entry_id' => $entry->id, 'collection_id' => $entry->collection_id, 'locale' => 'en',
        'title' => 'Home', 'slug' => 'home', 'data' => [], 'seo' => [],
    ]);
    app(SaveDraft::class)->handle($en, ['title' => 'Home', 'slug' => 'home', 'data' => $edited]);
    app(PublishTranslation::class)->handle($en->refresh());

    return Entry::query()->with('translations')->findOrFail($entry->id);
}

it('makes another language the main one without losing content', function () {
    $entry = bilingualPage();
    $rowId = $entry->mainTranslation()->data['features'][0]['_id'];

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--force' => true])->assertSuccessful();

    expect(Locales::main())->toBe('en');

    $entry = Entry::query()->with('translations')->findOrFail($entry->id);
    $en = $entry->translation('en');
    $id = $entry->translation('id');

    // English now owns the full data, shared values included.
    expect($en->data['intro'])->toBe('Welcome')
        ->and($en->data['code'])->toBe('SKU-1')
        ->and($en->data['features'][0]['title'])->toBe('Fast')
        ->and($en->data['features'][0]['icon'])->toBe('bolt')
        // Indonesian keeps only its translated text.
        ->and($id->data)->toEqual(['intro' => 'Selamat datang', 'features' => [$rowId => ['title' => 'Cepat']]])
        ->and($id->is_ready)->toBeTrue();

    // Both languages read the same as before.
    $entry->resolveFor('id');
    expect($entry->data['intro'])->toBe('Selamat datang')
        ->and($entry->data['code'])->toBe('SKU-1')
        ->and($entry->data['features'][0]['title'])->toBe('Cepat')
        ->and($entry->data['features'][0]['icon'])->toBe('bolt');
});

it('converts revisions so restoring them keeps shared values', function () {
    $entry = bilingualPage();

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--force' => true])->assertSuccessful();

    $en = EntryTranslation::query()->where('entry_id', $entry->id)->where('locale', 'en')->firstOrFail();
    $revision = $en->revisions()->latest('id')->firstOrFail();

    expect($revision->content['data']['code'])->toBe('SKU-1')
        ->and($revision->content['data']['features'][0]['icon'])->toBe('bolt');
});

it('keeps old addresses working after the switch', function () {
    bilingualPage();

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--force' => true])->assertSuccessful();
    RouteMatcher::flush();

    get('/pages/home')->assertOk()->assertSee('Home');
    get('/id/pages/beranda')->assertOk()->assertSee('Beranda');
    // Old English URL: the prefix is dropped.
    get('/en/pages/home?ref=x')->assertStatus(301)->assertRedirect('/pages/home?ref=x');
    // Old unprefixed Indonesian URL: sent to its new prefixed address.
    get('/pages/beranda')->assertStatus(301)->assertRedirect('/id/pages/beranda');
});

it('refuses while entries or terms have no version in that language', function () {
    bilingualPage();
    createEntry($this->pages, 'Hanya Indonesia');
    $taxonomy = Taxonomy::factory()->create();
    Term::factory()->create(['taxonomy_id' => $taxonomy->id]);

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--force' => true])
        ->expectsOutputToContain('Hanya Indonesia')
        ->assertFailed();

    expect(Locales::main())->toBe('id');
});

it('copies the current content into missing languages with --copy-missing', function () {
    $only = createEntry($this->pages, 'Hanya Indonesia');
    $taxonomy = Taxonomy::factory()->create();
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--force' => true, '--copy-missing' => true])->assertSuccessful();

    $copy = EntryTranslation::query()->where('entry_id', $only->id)->where('locale', 'en')->firstOrFail();
    expect($copy->title)->toBe('Hanya Indonesia')
        ->and($copy->slug)->toBe('hanya-indonesia')
        ->and($term->translations()->where('locale', 'en')->exists())->toBeTrue();
});

it('relabels single-language collections instead of translating them', function () {
    $news = createCollection('news', ['translatable' => false]);
    $entry = createEntry($news, 'Kabar');

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--force' => true])->assertSuccessful();

    expect($entry->translations()->pluck('locale')->all())->toBe(['en']);
});

it('swaps titles and menu labels and fills missing global values', function () {
    $this->pages->update(['title' => 'Halaman', 'settings' => array_merge($this->pages->settings, ['titles' => ['en' => 'Pages']])]);
    $menu = Menu::create(['handle' => 'main', 'title' => 'Main']);
    $item = MenuItem::create(['menu_id' => $menu->id, 'type' => 'url', 'url' => '/', 'labels' => ['id' => 'Beranda']]);
    $set = GlobalSet::factory()->create();
    $set->setValuesFor('id', ['phone' => '123']);

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--force' => true])->assertSuccessful();

    $pages = $this->pages->refresh();
    expect($pages->title)->toBe('Pages')
        ->and($pages->settings['titles'])->toBe(['id' => 'Halaman'])
        ->and($item->refresh()->labels)->toEqual(['id' => 'Beranda', 'en' => 'Beranda'])
        ->and($set->refresh()->valuesFor('en'))->toBe(['phone' => '123']);
});

it('reports without changing anything on a dry run', function () {
    bilingualPage();

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--dry-run' => true])
        ->expectsOutputToContain('Dry run')
        ->assertSuccessful();

    expect(Locales::main())->toBe('id');
});

it('rejects unknown languages and the current main language', function () {
    artisan('sunrice:switch-main-language', ['locale' => 'fr', '--force' => true])->assertFailed();
    artisan('sunrice:switch-main-language', ['locale' => 'id', '--force' => true])->assertFailed();
});

it('follows redirects recorded for a non-main language', function () {
    $entry = bilingualPage();
    Redirect::create(['old_path' => '/en/pages/old-home', 'locale' => 'en', 'entry_id' => $entry->id]);

    get('/en/pages/old-home')->assertStatus(301)->assertRedirect('/en/pages/home');
});
