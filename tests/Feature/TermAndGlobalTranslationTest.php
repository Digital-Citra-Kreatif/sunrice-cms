<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Models\Blueprint;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Support\Locales;

use function Pest\Laravel\artisan;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

beforeEach(function () {
    config(['sunrice.locales.available' => ['id', 'en']]);
    actingAsSuperAdmin();

    $this->blueprint = Blueprint::create(['handle' => 'topic', 'title' => 'Topic', 'fields' => [
        ['handle' => 'description', 'type' => 'text'],
        ['handle' => 'color', 'type' => 'text', 'translatable' => false],
        ['handle' => 'faq', 'type' => 'repeater', 'config' => ['fields' => [
            ['handle' => 'question', 'type' => 'text'],
            ['handle' => 'icon', 'type' => 'text', 'translatable' => false],
        ]]],
    ]]);
    $this->topics = Taxonomy::factory()->create([
        'handle' => 'topics',
        'blueprint_id' => $this->blueprint->id,
        'settings' => ['has_archive' => true, 'route' => '/topics/{slug}'],
    ]);
    RouteMatcher::flush();
});

function topicTerm(array $translations): Term
{
    post('/cms/taxonomies/topics/terms', ['translations' => $translations])->assertSessionHasNoErrors();

    return Term::query()->latest('id')->firstOrFail();
}

it('stores only a term translation\'s translated text, sharing the rest', function () {
    $term = topicTerm([
        'id' => ['title' => 'Berita', 'data' => [
            'description' => 'Kabar terbaru', 'color' => 'red',
            'faq' => [['_id' => 'r1', 'question' => 'Apa?', 'icon' => 'star']],
        ]],
        // The editor posts every field; English differs only in its text.
        'en' => ['title' => 'News', 'data' => [
            'description' => 'Latest news', 'color' => 'blue',
            'faq' => [['_id' => 'r1', 'question' => 'What?', 'icon' => 'moon']],
        ]],
    ]);

    $en = $term->translation('en');
    expect($en->data)->toEqual(['description' => 'Latest news', 'faq' => ['r1' => ['question' => 'What?']]])
        ->and($en->is_ready)->toBeTrue();

    // Shared values come from the main language, wherever they're read.
    $term->resolveFor('en');
    expect($term->get('color'))->toBe('red')
        ->and($term->get('description'))->toBe('Latest news')
        ->and($term->get('faq')[0]['question'])->toBe('What?')
        ->and($term->get('faq')[0]['icon'])->toBe('star');

    get("/cms/taxonomies/topics/terms/{$term->id}/edit")->assertInertia(fn (Assert $page) => $page
        ->where('term.translations.en.data.color', 'red')
        ->where('term.translations.en.data.description', 'Latest news')
        ->where('term.translations.en.is_ready', true));

    // Changing a shared value in the main language changes it everywhere.
    put("/cms/terms/{$term->id}", ['translations' => [
        'id' => ['title' => 'Berita', 'data' => ['description' => 'Kabar terbaru', 'color' => 'green', 'faq' => [['_id' => 'r1', 'question' => 'Apa?', 'icon' => 'star']]]],
    ]])->assertSessionHasNoErrors();
    $term = Term::query()->findOrFail($term->id);
    $term->resolveFor('en');
    expect($term->get('color'))->toBe('green')->and($term->get('description'))->toBe('Latest news');
});

it('shows a term translation on the site only once it is Ready', function () {
    $term = topicTerm([
        'id' => ['title' => 'Berita', 'slug' => 'berita'],
        'en' => ['title' => 'News', 'slug' => 'news', 'is_ready' => false],
    ]);

    expect($term->translation('en')->is_ready)->toBeFalse()
        ->and(app(UrlGenerator::class)->term($term, 'en'))->toBe('/en/topics/berita');
    get('/en/topics/berita')->assertOk()->assertSee('Berita')->assertDontSee('News');
    get('/en/topics/news')->assertNotFound();
    get('/cms/taxonomies/topics/terms')->assertInertia(fn (Assert $page) => $page->where('rows.data.0.languages', 'ID, EN (not ready)'));

    put("/cms/terms/{$term->id}", ['translations' => ['en' => ['title' => 'News', 'slug' => 'news', 'is_ready' => true]] + ['id' => ['title' => 'Berita', 'slug' => 'berita']]])
        ->assertSessionHasNoErrors();
    $term = Term::query()->findOrFail($term->id);
    expect(app(UrlGenerator::class)->term($term, 'en'))->toBe('/en/topics/news');
    get('/en/topics/news')->assertOk()->assertSee('News');
});

it('gives an entry\'s terms in the page language without resolving them', function () {
    $collection = createCollection('posts');
    $entry = createEntry($collection, 'Halo');
    $term = topicTerm([
        'id' => ['title' => 'Berita'],
        'en' => ['title' => 'News'],
    ]);
    $entry->terms()->attach($term);

    app()->setLocale('en');
    $first = $entry->fresh()->terms->first();
    expect($first->name)->toBe('News')->and($first->url)->toBe('/en/topics/news');

    app()->setLocale('id');
    expect($entry->fresh()->terms->first()->name)->toBe('Berita');
});

it('switches the main language for terms and globals like entries', function () {
    $term = topicTerm([
        'id' => ['title' => 'Berita', 'data' => ['description' => 'Kabar', 'color' => 'red']],
        'en' => ['title' => 'News', 'data' => ['description' => 'News', 'color' => 'red']],
    ]);
    $set = GlobalSet::factory()->create(['blueprint_id' => $this->blueprint->id]);
    $set->setValuesFor('id', ['description' => 'Halo', 'color' => 'red']);
    $set->setValuesFor('en', ['description' => 'Hello', 'color' => 'red']);

    artisan('sunrice:switch-main-language', ['locale' => 'en', '--force' => true])->assertSuccessful();
    config(['sunrice.locales.main' => 'en']);

    expect($term->translation('en')->data)->toEqual(['description' => 'News', 'color' => 'red'])
        ->and($term->translation('id')->data)->toBe(['description' => 'Kabar'])
        ->and($set->fresh()->valueFor('en')->data)->toEqual(['description' => 'Hello', 'color' => 'red'])
        ->and($set->fresh()->valueFor('id')->data)->toBe(['description' => 'Halo'])
        ->and($set->fresh()->valuesFor('id'))->toEqual(['description' => 'Halo', 'color' => 'red'])
        ->and(Locales::main())->toBe('en');
});
