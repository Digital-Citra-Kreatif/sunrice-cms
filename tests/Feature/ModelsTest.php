<?php

declare(strict_types=1);

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Sunrice\Models\Asset;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Form;
use Sunrice\Models\FormSubmission;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\Setting;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;

it('gets and sets settings', function () {
    expect(Setting::get('missing'))->toBeNull()
        ->and(Setting::get('missing', 'd'))->toBe('d');

    Setting::set('homepage_entry_id', 7);
    expect(Setting::get('homepage_entry_id'))->toBe(7);

    Setting::set('arr', ['a' => 1]);
    expect(Setting::get('arr'))->toBe(['a' => 1]);
});

it('creates an entry with a main translation via factories', function () {
    $entry = Entry::factory()->create();
    EntryTranslation::factory()->create(['entry_id' => $entry->id]);

    expect($entry->mainTranslation())->not->toBeNull()
        ->and($entry->activeBlueprint())->not->toBeNull();
});

it('enforces slug uniqueness per collection and locale', function () {
    $collection = createCollection();
    createEntry($collection, 'Hello World');

    // Nested savepoint so the expected violation doesn't poison the
    // test transaction on PostgreSQL.
    expect(fn () => DB::transaction(fn () => $collection->entries()->create(['status' => 'published'])
        ->translations()->create([
            'collection_id' => $collection->id,
            'locale' => 'id',
            'title' => 'Other',
            'slug' => 'hello-world',
            'data' => [],
        ])))->toThrow(QueryException::class);

    // Same slug allowed in a different locale and a different collection.
    $entry = createEntry($collection, 'Hola');
    $entry->translations()->create([
        'collection_id' => $collection->id,
        'locale' => 'en',
        'title' => 'Hello World',
        'slug' => 'hello-world',
        'data' => [],
    ]);
    expect($entry->translations)->toHaveCount(2);
});

it('scopes published entries correctly', function () {
    $collection = createCollection();
    Entry::factory()->create(['collection_id' => $collection->id]); // published now
    Entry::factory()->scheduled()->create(['collection_id' => $collection->id]);
    Entry::factory()->draft()->create(['collection_id' => $collection->id]);

    expect(Entry::published()->count())->toBe(1)
        ->and(Entry::scheduled()->count())->toBe(1)
        ->and(Entry::inCollection($collection->handle)->count())->toBe(3);
});

it('attaches terms to entries and builds a term tree', function () {
    $taxonomy = Taxonomy::factory()->create(['hierarchical' => true]);
    $parent = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $child = Term::factory()->create(['taxonomy_id' => $taxonomy->id, 'parent_id' => $parent->id]);
    $second = Term::factory()->create(['taxonomy_id' => $taxonomy->id, 'sort_order' => 5]);

    $entry = Entry::factory()->create();
    $entry->terms()->sync([$parent->id, $child->id]);
    expect($entry->terms)->toHaveCount(2);

    $tree = Term::tree($taxonomy->id);
    expect($tree)->toHaveCount(2) // parent + second (child nested)
        ->and($tree->firstWhere('id', $parent->id)->children)->toHaveCount(1);
});

it('creates menus, globals and taxonomies via factories', function () {
    $menu = Menu::factory()->create();
    $menu->items()->create(['type' => 'url', 'url' => 'https://x.test', 'labels' => ['id' => 'X'], 'sort_order' => 0]);
    expect($menu->rootItems)->toHaveCount(1);

    $global = GlobalSet::factory()->create();
    $global->values()->create(['locale' => 'id', 'data' => ['name' => 'Situs']]);
    expect($global->valueFor('id')->data)->toBe(['name' => 'Situs']);

    expect(Taxonomy::factory()->create()->terms())->toBeInstanceOf(HasMany::class);
});

it('stores assets with urls and version cache busting', function () {
    Storage::fake('public');
    $disk = Storage::disk('public');
    $disk->put('sunrice/2025/01/pic.jpg', 'x');
    $asset = Asset::factory()->create(['path' => 'sunrice/2025/01/pic.jpg', 'version' => 3]);

    expect($asset->url())->toContain('pic.jpg')->toContain('v=3')
        ->and($asset->isImage())->toBeTrue();

    $asset->update(['sizes' => ['thumbnail' => 'sunrice/2025/01/pic-thumbnail.jpg']]);
    expect($asset->url('thumbnail'))->toContain('pic-thumbnail.jpg');
});

it('prunes only old submissions when configured', function () {
    $form = Form::factory()->create();
    $old = FormSubmission::factory()->create(['form_id' => $form->id, 'created_at' => now()->subDays(40)]);
    $new = FormSubmission::factory()->create(['form_id' => $form->id, 'created_at' => now()]);

    config()->set('sunrice.forms.prune_after_days', null);
    expect((new FormSubmission)->prunable()->count())->toBe(0);

    config()->set('sunrice.forms.prune_after_days', 30);
    expect((new FormSubmission)->prunable()->pluck('id')->all())->toBe([$old->id]);
});
