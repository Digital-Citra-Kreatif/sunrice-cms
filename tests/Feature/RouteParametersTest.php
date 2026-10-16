<?php

declare(strict_types=1);

use Illuminate\Validation\ValidationException;
use Sunrice\Actions\Structure\SaveCollection;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Models\Blueprint;

use function Pest\Laravel\get;

beforeEach(function () {
    $this->unitBlueprint = Blueprint::create(['handle' => 'unit', 'title' => 'Unit', 'fields' => [
        ['handle' => 'project', 'type' => 'entries', 'config' => ['collections' => ['projects'], 'max' => 1]],
        ['handle' => 'body', 'type' => 'textarea'],
    ]]);
    $this->projects = createCollection('projects');
    $this->units = createCollection('units', ['route' => '/projects/{project}/{slug}'], $this->unitBlueprint);

    $this->towerA = createEntry($this->projects, 'Tower A');
    $this->towerB = createEntry($this->projects, 'Tower B');
    $this->unit = createEntry($this->units, 'Unit 1', ['project' => [$this->towerA->id], 'body' => 'Corner unit']);
    RouteMatcher::flush();
});

it('puts the linked entry slug in the URL', function () {
    $urls = app(UrlGenerator::class);

    expect($urls->entryUrl($this->unit->fresh(), 'id'))->toBe('/projects/tower-a/unit-1')
        ->and($urls->entryUrl($this->unit->fresh(), 'en'))->toBe('/en/projects/tower-a/unit-1')
        ->and($urls->entryUrl($this->towerA->fresh(), 'id'))->toBe('/projects/tower-a');

    get('/projects/tower-a/unit-1')->assertOk()->assertSee('Unit 1');
    get('/projects/tower-a')->assertOk()->assertSee('Tower A');
});

it('uses the linked entry translated slug in other languages', function () {
    $this->towerA->translations()->create([
        'collection_id' => $this->projects->id, 'locale' => 'en', 'title' => 'Tower A (en)',
        'slug' => 'tower-a-en', 'data' => [], 'is_ready' => true,
    ]);

    expect(app(UrlGenerator::class)->entryUrl($this->unit->fresh(), 'en'))->toBe('/en/projects/tower-a-en/unit-1');
    get('/en/projects/tower-a-en/unit-1')->assertOk();
});

it('redirects a URL with another or an old project slug to the entry address', function () {
    get('/projects/tower-b/unit-1?ref=x')->assertStatus(301)->assertRedirect('/projects/tower-a/unit-1?ref=x');

    $this->towerA->translations()->first()->update(['slug' => 'tower-alpha']);
    get('/projects/tower-a/unit-1')->assertStatus(301)->assertRedirect('/projects/tower-alpha/unit-1');

    get('/projects/tower-a/missing')->assertNotFound();
});

it('fills a segment with a dash when the field links to nothing', function () {
    $loose = createEntry($this->units, 'Unit 2', ['project' => []]);

    expect(app(UrlGenerator::class)->entryUrl($loose->fresh(), 'id'))->toBe('/projects/-/unit-2');
    get('/projects/-/unit-2')->assertOk()->assertSee('Unit 2');
});

it('only accepts placeholders that name an entries field', function () {
    $save = fn (string $route) => app(SaveCollection::class)->handle([
        'title' => 'Units', 'blueprint_id' => $this->unitBlueprint->id, 'settings' => ['route' => $route],
    ], $this->units);

    expect(fn () => $save('/projects/{body}/{slug}'))->toThrow(ValidationException::class)
        ->and(fn () => $save('/projects/{nope}/{slug}'))->toThrow(ValidationException::class);

    expect($save('/sites/{project}/{slug}')->entryRoute())->toBe('/sites/{project}/{slug}');
});

it('refuses a route with the same shape as another collection', function () {
    $other = Blueprint::create(['handle' => 'flat', 'title' => 'Flat', 'fields' => [
        ['handle' => 'site', 'type' => 'entries'],
    ]]);

    expect(fn () => app(SaveCollection::class)->handle([
        'handle' => 'flats', 'title' => 'Flats', 'blueprint_id' => $other->id,
        'settings' => ['route' => '/projects/{site}/{slug}'],
    ]))->toThrow(ValidationException::class);
});
