<?php

declare(strict_types=1);

use Illuminate\Support\Facades\URL;
use Sunrice\Actions\Entries\PublishTranslation;
use Sunrice\Actions\Entries\SaveDraft;
use Sunrice\Fields\Block;
use Sunrice\Fields\BlueprintSchema;
use Sunrice\Fields\HydrationContext;
use Sunrice\Fields\Items;
use Sunrice\Fields\TranslationOverlay;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Fieldset;
use Sunrice\Support\Locales;

use function Pest\Laravel\get;

beforeEach(function () {
    actingAsSuperAdmin();

    // Unique handles: Fieldset::schemaForHandle() memoizes per process.
    Fieldset::create(['handle' => 'tl_hero', 'title' => 'Hero', 'fields' => [
        ['handle' => 'heading', 'type' => 'text'],
        ['handle' => 'image', 'type' => 'asset'],
    ]]);

    $this->blueprint = Blueprint::create(['handle' => 'landing', 'title' => 'Landing', 'fields' => [
        ['handle' => 'intro', 'type' => 'text'],
        ['handle' => 'code', 'type' => 'text', 'translatable' => false],
        ['handle' => 'featured', 'type' => 'toggle'],
        ['handle' => 'features', 'type' => 'repeater', 'config' => ['fields' => [
            ['handle' => 'title', 'type' => 'text'],
            ['handle' => 'icon', 'type' => 'text', 'translatable' => false],
        ]]],
        ['handle' => 'sections', 'type' => 'flexible', 'config' => ['fieldsets' => ['tl_hero']]],
    ]]);
    $this->pages = createCollection('landing', ['route' => '/landing/{slug}', 'translatable' => true], $this->blueprint);
});

/** A main-language entry saved through SaveDraft + publish (so rows get ids). */
function landingEntry(array $data): Entry
{
    $entry = createEntry(test()->pages, 'Beranda');
    $main = $entry->mainTranslation();
    app(SaveDraft::class)->handle($main, ['title' => 'Beranda', 'slug' => 'beranda', 'data' => $data]);
    app(PublishTranslation::class)->handle($main->refresh());

    return Entry::query()->with('translations')->findOrFail($entry->id);
}

function mainLanding(): array
{
    return [
        'intro' => 'Selamat datang',
        'code' => 'SKU-1',
        'featured' => true,
        'features' => [
            ['title' => 'Cepat', 'icon' => 'bolt', '_key' => 'speed'],
            ['title' => 'Aman', 'icon' => 'lock', '_hidden' => true],
        ],
        'sections' => [
            ['type' => 'tl_hero', 'key' => 'hero', 'values' => ['heading' => 'Halo', 'image' => 5]],
        ],
    ];
}

it('gives repeater rows ids, keys and visibility, and blocks keys and visibility', function () {
    $data = BlueprintSchema::make($this->blueprint->fields)->normalize(mainLanding());

    expect($data['features'][0]['_id'])->toBeString()->not->toBeEmpty()
        ->and($data['features'][0]['_key'])->toBe('speed')
        ->and($data['features'][0]['_hidden'])->toBeFalse()
        ->and($data['features'][1]['_key'])->toBeNull()
        ->and($data['features'][1]['_hidden'])->toBeTrue()
        ->and($data['sections'][0]['key'])->toBe('hero')
        ->and($data['sections'][0]['hidden'])->toBeFalse();

    // Ids are kept on later saves.
    $again = BlueprintSchema::make($this->blueprint->fields)->normalize($data);
    expect($again['features'][0]['_id'])->toBe($data['features'][0]['_id'])
        ->and($again['sections'][0]['id'])->toBe($data['sections'][0]['id']);
});

it('skips hidden items and finds keyed ones when hydrating', function () {
    $schema = BlueprintSchema::make($this->blueprint->fields);
    $data = $schema->normalize(mainLanding());
    $data['sections'][] = ['id' => 'b2', 'type' => 'tl_hero', 'key' => 'off', 'hidden' => true, 'values' => ['heading' => 'x']];

    $out = $schema->hydrate($data, new HydrationContext('id'));

    expect($out['features'])->toBeInstanceOf(Items::class)->toHaveCount(1)
        ->and($out['features']->byKey('speed')['title'])->toBe('Cepat')
        ->and($out['features']->first())->not->toHaveKey('_hidden')
        ->and($out['sections'])->toHaveCount(1)
        ->and($out['sections']->byKey('hero'))->toBeInstanceOf(Block::class)
        ->and($out['sections']->byKey('hero')->heading)->toBe('Halo')
        ->and($out['sections']->byKey('off'))->toBeNull()
        ->and($out['sections']->hasKey('hero'))->toBeTrue();
});

it('sends the resolved translatable flag and block fieldsets to the editor', function () {
    $admin = collect(BlueprintSchema::make($this->blueprint->fields)->toAdminSchema())->keyBy('handle');

    expect($admin['intro']['translatable'])->toBeTrue()
        ->and($admin['code']['translatable'])->toBeFalse()
        ->and($admin['featured']['translatable'])->toBeFalse()
        ->and($admin['features']['fields'][0]['translatable'])->toBeTrue()
        ->and($admin['features']['fields'][1]['translatable'])->toBeFalse()
        ->and($admin['sections']['fieldsets'][0]['handle'])->toBe('tl_hero')
        ->and($admin['sections']['fieldsets'][0]['fields'][1]['translatable'])->toBeFalse();
});

it('stores only translated text for a secondary language', function () {
    $entry = landingEntry(mainLanding());
    $main = $entry->mainTranslation()->data;

    // The editor posts the full layout with some text changed.
    $edited = $main;
    $edited['intro'] = 'Welcome';
    $edited['code'] = 'TAMPERED';
    $edited['features'][0]['title'] = 'Fast';
    $edited['sections'][0]['values']['heading'] = 'Hello';

    $en = EntryTranslation::query()->create([
        'entry_id' => $entry->id, 'collection_id' => $entry->collection_id, 'locale' => 'en',
        'title' => 'Home', 'slug' => 'home', 'data' => [],
    ]);
    app(SaveDraft::class)->handle($en, ['title' => 'Home', 'slug' => 'home', 'data' => $edited]);

    $rowId = $main['features'][0]['_id'];
    $blockId = $main['sections'][0]['id'];

    expect($en->refresh()->draft['data'])->toEqual([
        'intro' => 'Welcome',
        'features' => [$rowId => ['title' => 'Fast']],
        'sections' => [$blockId => ['values' => ['heading' => 'Hello']]],
    ]);
});

it('renders a translation inside the main layout, following later layout changes', function () {
    $entry = landingEntry(mainLanding());
    $main = $entry->mainTranslation();
    $rowId = $main->data['features'][0]['_id'];
    $blockId = $main->data['sections'][0]['id'];

    $entry->translations()->create([
        'collection_id' => $entry->collection_id, 'locale' => 'en', 'title' => 'Home', 'slug' => 'home',
        'is_ready' => true, 'content_published_at' => now(),
        'data' => [
            'intro' => 'Welcome',
            'code' => 'ignored',
            'features' => [$rowId => ['title' => 'Fast', 'icon' => 'ignored']],
            'sections' => [$blockId => ['values' => ['heading' => 'Hello']]],
        ],
    ]);

    // The main language reorders rows, shows the hidden one and swaps the image.
    $data = $main->data;
    $data['features'] = array_reverse($data['features']);
    $data['features'][0]['_hidden'] = false;
    $data['sections'][0]['values']['image'] = 9;
    $main->forceFill(['data' => $data])->save();

    $entry = Entry::query()->with('translations')->findOrFail($entry->id);
    $entry->resolveFor('en');

    expect($entry->data['intro'])->toBe('Welcome')
        ->and($entry->data['code'])->toBe('SKU-1')
        ->and($entry->data['featured'])->toBeTrue()
        ->and($entry->data['features'][0]['title'])->toBe('Aman') // untranslated row keeps main text
        ->and($entry->data['features'][1]['title'])->toBe('Fast')
        ->and($entry->data['features'][1]['icon'])->toBe('bolt')
        ->and($entry->data['sections'][0]['values'])->toEqual(['heading' => 'Hello', 'image' => 9]);

    $features = $entry->get('features');
    expect($features)->toHaveCount(2)->and($features->byKey('speed')['title'])->toBe('Fast');
});

it('previews an unready translation from its draft over the main draft layout', function () {
    $entry = landingEntry(mainLanding());
    $en = EntryTranslation::query()->create([
        'entry_id' => $entry->id, 'collection_id' => $entry->collection_id, 'locale' => 'en',
        'title' => 'Home', 'slug' => 'home', 'data' => [],
        'draft' => ['title' => 'Home draft', 'slug' => 'home', 'data' => ['intro' => 'Welcome draft'], 'seo' => []],
    ]);

    view()->addNamespace('testviews', __DIR__.'/../fixtures/views');
    $this->pages->update(['settings' => $this->pages->settings + ['template' => 'testviews::landing']]);

    $url = URL::temporarySignedRoute('sunrice.frontend.preview', now()->addMinutes(30), [
        'entry' => $entry->id, 'locale' => 'en',
    ]);

    get($url)->assertOk()
        ->assertSee('TITLE[Home draft]', false)
        ->assertSee('INTRO[Welcome draft]', false)
        ->assertSee('CODE[SKU-1]', false)
        ->assertSee('HERO[Halo]', false);
    expect($en->refresh()->is_ready)->toBeFalse();
});

it('merges with the overlay helper directly', function () {
    $fields = $this->blueprint->fields;
    $main = BlueprintSchema::make($fields)->normalize(mainLanding());
    $overlay = TranslationOverlay::extract($fields, array_replace($main, ['intro' => 'Welcome']), $main);

    expect($overlay)->toBe(['intro' => 'Welcome'])
        ->and(TranslationOverlay::merge($fields, $main, $overlay))->toBe(array_replace($main, ['intro' => 'Welcome']))
        ->and(Locales::isMain('id'))->toBeTrue();
});
