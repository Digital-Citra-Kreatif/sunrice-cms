<?php

declare(strict_types=1);

use Spatie\Permission\Models\Role;
use Sunrice\Locks\Versions;
use Sunrice\Models\Blueprint;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\KeptEdit;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Permissions\SyncPermissions;
use Sunrice\Support\Locales;
use Workbench\App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\put;

beforeEach(function () {
    $this->ana = actingAsSuperAdmin();
    $this->budi = User::query()->create(['name' => 'Budi', 'email' => 'budi@example.com', 'password' => bcrypt('x')]);
    $this->budi->assignRole(Role::findByName(config('sunrice.super_admin_role'), config('sunrice.auth.guard', 'web')));
    $this->collection = createCollection('pages');
    $this->entry = createEntry($this->collection, 'About');
    $this->url = "/cms/locks/entry/{$this->entry->id}";
});

it('lets one editor at a time hold an entry language', function () {
    actingAs($this->ana);
    postJson($this->url, ['editor' => 'tab-ana', 'locale' => 'id'])->assertJsonPath('status', 'ok');
    // Renewing from the same tab keeps it.
    postJson($this->url, ['editor' => 'tab-ana', 'locale' => 'id'])->assertJsonPath('status', 'ok');

    actingAs($this->budi);
    postJson($this->url, ['editor' => 'tab-budi', 'locale' => 'id'])
        ->assertJsonPath('status', 'locked')->assertJsonPath('by', 'Admin');
    // Another language is free.
    postJson($this->url, ['editor' => 'tab-budi', 'locale' => 'en'])->assertJsonPath('status', 'ok');
});

it('never locks a person out by their own other tab', function () {
    actingAs($this->ana);
    postJson($this->url, ['editor' => 'tab-1', 'locale' => 'id'])->assertJsonPath('status', 'ok');
    postJson($this->url, ['editor' => 'tab-2', 'locale' => 'id'])->assertJsonPath('status', 'ok');
    postJson($this->url, ['editor' => 'tab-1', 'locale' => 'id'])->assertJsonPath('status', 'ok');

    actingAs($this->budi);
    postJson($this->url, ['editor' => 'tab-budi', 'locale' => 'id'])->assertJsonPath('status', 'locked');
});

it('hands over on take over, keeps the unsaved changes, and frees released locks', function () {
    actingAs($this->ana);
    postJson($this->url, ['editor' => 'tab-ana', 'locale' => 'id']);

    actingAs($this->budi);
    postJson("{$this->url}/take", ['editor' => 'tab-budi', 'locale' => 'id'])->assertOk();
    postJson($this->url, ['editor' => 'tab-budi', 'locale' => 'id'])->assertJsonPath('status', 'ok');

    // Ana learns it on her next renewal, once, and keeps her edits.
    actingAs($this->ana);
    postJson($this->url, ['editor' => 'tab-ana', 'locale' => 'id'])->assertJsonPath('status', 'taken')->assertJsonPath('by', 'Budi');
    postJson("{$this->url}/keep", ['editor' => 'tab-ana', 'locale' => 'id', 'content' => ['title' => 'Unsaved'], 'taken_by' => 'Budi'])->assertOk();
    postJson($this->url, ['editor' => 'tab-ana', 'locale' => 'id'])->assertJsonPath('status', 'locked');

    // Budi sees the kept changes and can load them.
    actingAs($this->budi);
    $kept = postJson($this->url, ['editor' => 'tab-budi', 'locale' => 'id'])->json('kept');
    expect($kept)->toHaveCount(1)->and($kept[0]['by'])->toBe('Admin')->and($kept[0]['taken_by'])->toBe('Budi');
    getJson("/cms/kept-edits/{$kept[0]['id']}")->assertJsonPath('content.title', 'Unsaved');
    deleteJson("/cms/kept-edits/{$kept[0]['id']}")->assertOk();
    expect(KeptEdit::query()->count())->toBe(0);

    postJson("{$this->url}/release", ['editor' => 'tab-budi', 'locale' => 'id']);
    actingAs($this->ana);
    postJson($this->url, ['editor' => 'tab-ana', 'locale' => 'id'])->assertJsonPath('status', 'ok');
});

it('refuses locks on things the user may not edit', function () {
    app(SyncPermissions::class)->handle();
    $viewer = User::query()->create(['name' => 'Vi', 'email' => 'vi@example.com', 'password' => bcrypt('x')]);
    $viewer->givePermissionTo(['sunrice.access-admin', "sunrice.entries.{$this->collection->id}.view"]);

    actingAs($viewer);
    postJson($this->url, ['editor' => 'tab-vi', 'locale' => 'id'])->assertForbidden();
    postJson('/cms/locks/entry/999999', ['editor' => 'x'])->assertNotFound();
});

it('refuses to save over changes saved since the editor loaded them', function () {
    $translation = $this->entry->translations()->first();
    $save = fn (string $title, ?string $version, bool $overwrite = false) => put("/cms/entries/{$this->entry->id}", [
        'locale' => 'id', 'title' => $title, 'slug' => $translation->slug, 'version' => $version, 'overwrite' => $overwrite,
    ]);
    $loaded = Versions::entry($translation->fresh());

    $save('Ana', $loaded)->assertSessionHasNoErrors();
    // Budi still has the old version.
    $save('Budi', $loaded)->assertSessionHasErrors('version');
    expect($translation->fresh()->draft['title'])->toBe('Ana');
    $save('Budi', $loaded, overwrite: true)->assertSessionHasNoErrors();
    expect($translation->fresh()->draft['title'])->toBe('Budi');
});

it('checks versions for terms and globals too', function () {
    $tax = Taxonomy::factory()->create(['handle' => 'tags']);
    $term = Term::factory()->create(['taxonomy_id' => $tax->id]);
    $loaded = Versions::term($term);
    $payload = fn (string $name, string $version) => ['translations' => ['id' => ['title' => $name]], 'version' => $version];

    put("/cms/terms/{$term->id}", $payload('One', $loaded))->assertSessionHasNoErrors();
    put("/cms/terms/{$term->id}", $payload('Two', $loaded))->assertSessionHasErrors('version');

    $set = GlobalSet::create(['handle' => 'site', 'title' => 'Site', 'group' => 'global', 'blueprint_id' => Blueprint::factory()->create()->id]);
    $set->values()->create(['locale' => Locales::main(), 'data' => ['a' => 1]]);
    $old = Versions::global($set->values()->first());
    put("/cms/globals/{$set->id}", ['values' => ['a' => 2], 'version' => $old])->assertSessionHasNoErrors();
    put("/cms/globals/{$set->id}", ['values' => ['a' => 3], 'version' => $old])->assertSessionHasErrors('version');
});
