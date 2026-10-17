<?php

declare(strict_types=1);

use Spatie\Permission\Models\Permission;
use Sunrice\Facades\Sunrice;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\Form;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\Taxonomy;
use Sunrice\Structure\ImportReport;
use Sunrice\Structure\StructureImportFailed;

function shopDefinition(): array
{
    return [
        'fieldsets' => [
            ['handle' => 'specs', 'title' => 'Specs', 'fields' => [['handle' => 'label', 'type' => 'text', 'label' => 'Label']]],
        ],
        'blueprints' => [
            ['handle' => 'product', 'title' => 'Product', 'fields' => [
                ['handle' => 'excerpt', 'type' => 'textarea', 'label' => 'Excerpt'],
                ['handle' => 'specs', 'type' => 'fieldset', 'label' => 'Specs', 'config' => ['fieldset' => 'specs']],
            ]],
            ['handle' => 'brand', 'title' => 'Brand', 'fields' => [['handle' => 'website', 'type' => 'text', 'label' => 'Website']]],
            ['handle' => 'store', 'title' => 'Store', 'fields' => [['handle' => 'phone', 'type' => 'text', 'label' => 'Phone']]],
        ],
        'taxonomies' => [
            ['handle' => 'brands', 'title' => 'Brands', 'blueprint' => 'brand', 'settings' => ['has_archive' => true, 'route' => '/brands/{slug}']],
            ['handle' => 'product_categories', 'title' => 'Categories', 'hierarchical' => true],
        ],
        'collections' => [
            ['handle' => 'products', 'title' => 'Products', 'blueprint' => 'product', 'taxonomies' => ['brands', 'product_categories'],
                'settings' => ['route' => 'products', 'has_archive' => true, 'archive_route' => '/products', 'icon' => 'shopping-bag']],
            ['handle' => 'pages', 'title' => 'Pages', 'settings' => ['route' => '/{slug}']],
        ],
        'globals' => [
            ['handle' => 'store', 'title' => 'Store', 'blueprint' => 'store'],
        ],
        'forms' => [
            ['handle' => 'product_inquiry', 'title' => 'Product inquiry', 'fields' => [['handle' => 'email', 'type' => 'text', 'label' => 'Email', 'required' => true]]],
        ],
        'entries' => [
            ['collection' => 'pages', 'slug' => 'terms', 'title' => 'Terms & Conditions'],
        ],
        'menus' => [
            ['handle' => 'shop', 'title' => 'Shop', 'items' => [
                ['type' => 'collection', 'target' => 'products', 'labels' => ['id' => 'Toko'], 'children' => [
                    ['type' => 'entry', 'target' => 'pages/terms'],
                ]],
                ['type' => 'url', 'url' => '/cart', 'labels' => ['id' => 'Keranjang']],
            ]],
        ],
    ];
}

it('creates every kind of structure, linked by handle', function () {
    $report = Sunrice::importStructure(shopDefinition());

    $products = Collection::query()->where('handle', 'products')->firstOrFail();
    expect($report->items(ImportReport::CREATED))->toHaveCount(12)
        ->and($products->blueprint->handle)->toBe('product')
        // "products" is the default /products/{slug}, so it isn't stored.
        ->and($products->setting('route'))->toBeNull()
        ->and($products->setting('archive_route'))->toBe('/products')
        ->and($products->taxonomies->pluck('handle')->sort()->values()->all())->toBe(['brands', 'product_categories'])
        ->and(Taxonomy::query()->where('handle', 'product_categories')->value('hierarchical'))->toBeTrue()
        ->and(GlobalSet::query()->where('handle', 'store')->firstOrFail()->blueprint->handle)->toBe('store')
        ->and(Form::query()->where('handle', 'product_inquiry')->exists())->toBeTrue();

    $entry = Entry::query()->where('collection_id', Collection::query()->where('handle', 'pages')->value('id'))->firstOrFail();
    expect($entry->status)->toBe('draft')->and($entry->mainTranslation()->slug)->toBe('terms');

    $menu = Menu::query()->where('handle', 'shop')->firstOrFail();
    $items = $menu->items()->orderBy('sort_order')->get();
    expect($items)->toHaveCount(3)
        ->and($items->firstWhere('type', 'entry')->parent_id)->toBe($items->firstWhere('type', 'collection')->id);

    // Permissions for the new collections and taxonomies exist.
    expect(Permission::query()->where('name', "sunrice.entries.{$products->id}.edit")->exists())->toBeTrue();
});

it('is idempotent', function () {
    Sunrice::importStructure(shopDefinition());
    $report = Sunrice::importStructure(shopDefinition());

    expect($report->items(ImportReport::UNCHANGED))->toHaveCount(12)
        ->and($report->wroteAnything())->toBeFalse()
        ->and(Blueprint::query()->count())->toBe(3)
        ->and(Menu::query()->first()->items()->count())->toBe(3);
});

it('reports what an admin changed and only overwrites it when forced', function () {
    Sunrice::importStructure(shopDefinition());
    $blueprint = Blueprint::query()->where('handle', 'product')->firstOrFail();
    $blueprint->update(['title' => 'Our products']);
    $collection = Collection::query()->where('handle', 'products')->firstOrFail();
    $collection->update(['settings' => [...$collection->settings, 'icon' => 'package', 'per_page' => 48]]);

    $report = Sunrice::importStructure(shopDefinition());
    expect($report->status('blueprint', 'product'))->toBe(ImportReport::CHANGED)
        ->and($report->items(ImportReport::CHANGED)[0]['differences'])->toBe(['title'])
        ->and($blueprint->fresh()->title)->toBe('Our products')
        ->and($report->status('collection', 'products'))->toBe(ImportReport::CHANGED);

    $forced = Sunrice::importStructure(shopDefinition(), force: true);
    expect($forced->status('blueprint', 'product'))->toBe(ImportReport::UPDATED)
        ->and($blueprint->fresh()->title)->toBe('Product')
        // Settings the definition doesn't name are kept.
        ->and($collection->fresh()->setting('icon'))->toBe('shopping-bag')
        ->and($collection->fresh()->setting('per_page'))->toBe(48);
});

it('writes nothing in a dry run', function () {
    $report = Sunrice::importStructure(shopDefinition(), dryRun: true);

    expect($report->dryRun)->toBeTrue()
        ->and($report->items(ImportReport::CREATED))->toHaveCount(12)
        ->and(Collection::query()->count())->toBe(0)
        ->and(Blueprint::query()->count())->toBe(0)
        ->and(Permission::query()->where('name', 'like', 'sunrice.entries.%')->count())->toBe(0);
});

it('saves nothing when an item is invalid, and names it', function () {
    $definition = shopDefinition();
    $definition['collections'][] = ['handle' => 'Bad Handle', 'title' => 'Bad'];

    expect(fn () => Sunrice::importStructure($definition))
        ->toThrow(StructureImportFailed::class, 'collections.Bad Handle');
    expect(Blueprint::query()->count())->toBe(0);
});

it('refuses unknown references and sections', function () {
    expect(fn () => Sunrice::importStructure(['collections' => [['handle' => 'x', 'title' => 'X', 'blueprint' => 'missing']]]))
        ->toThrow(StructureImportFailed::class, 'No blueprint "missing"');
    expect(fn () => Sunrice::importStructure(['widgets' => []]))
        ->toThrow(StructureImportFailed::class, 'Unknown sections: widgets');
});

it('imports from a file with the command', function () {
    $file = tempnam(sys_get_temp_dir(), 'structure').'.json';
    file_put_contents($file, json_encode(['blueprints' => [['handle' => 'page', 'title' => 'Page', 'fields' => []]]]));

    $this->artisan('sunrice:import-structure', ['file' => $file, '--dry-run' => true])
        ->expectsOutputToContain('Dry run')
        ->assertSuccessful();
    expect(Blueprint::query()->count())->toBe(0);

    $this->artisan('sunrice:import-structure', ['file' => $file])->assertSuccessful();
    expect(Blueprint::query()->where('handle', 'page')->exists())->toBeTrue();

    @unlink($file);
});
