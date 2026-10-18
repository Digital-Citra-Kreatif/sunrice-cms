<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Admin\Navigation;
use Sunrice\Database\Seeders\RolesSeeder;
use Sunrice\Http\Controllers\Admin\GuideController;
use Sunrice\Permissions\SyncPermissions;
use Sunrice\Support\MarkdownPages;
use Workbench\App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

/** A signed-in admin user with these permissions on top of admin access. */
function guideUser(array $permissions = []): User
{
    app(SyncPermissions::class)->handle();
    $user = User::query()->create(['name' => 'Ed', 'email' => uniqid().'@x.com', 'password' => bcrypt('password')]);
    $user->givePermissionTo(['sunrice.access-admin', ...$permissions]);
    app(PermissionRegistrar::class)->forgetCachedPermissions();
    actingAs($user);

    return $user;
}

it('has every guide page in English and Indonesian', function () {
    foreach (GuideController::slugs() as $slug) {
        foreach (array_keys(GuideController::LOCALES) as $locale) {
            $file = dirname(__DIR__, 2)."/guide/{$locale}/{$slug}.md";
            expect($file)->toBeFile()
                ->and(MarkdownPages::title((string) file_get_contents($file)))->not->toBeNull();
        }
    }
});

it('links only to guide pages and developer docs that exist', function () {
    foreach (glob(dirname(__DIR__, 2).'/guide/*/*.md') as $file) {
        $markdown = (string) file_get_contents($file);
        preg_match_all('/\]\((docs:)?([a-z0-9-]+)\.md(?:#[^)]*)?\)/', $markdown, $links, PREG_SET_ORDER);
        foreach ($links as [, $docs, $slug]) {
            $docs === 'docs:'
                ? expect(dirname(__DIR__, 2)."/docs/{$slug}.md")->toBeFile()
                : expect(GuideController::slugs())->toContain($slug);
        }
    }
});

it('shows only screenshots that exist, with a description', function () {
    $dir = dirname(__DIR__, 2).'/guide';
    $used = [];
    foreach (glob($dir.'/*/*.md') as $file) {
        preg_match_all('/!\[([^\]]*)\]\(([^)]+)\)/', (string) file_get_contents($file), $images, PREG_SET_ORDER);
        foreach ($images as [, $alt, $src]) {
            expect($src)->toMatch('#^images/[a-z0-9-]+\.webp$#')
                ->and("{$dir}/{$src}")->toBeFile()
                ->and(trim($alt))->not->toBe('', "{$file}: {$src} needs a description");
            $used[] = basename($src);
        }
    }

    // No leftover screenshots that no page shows.
    $files = array_map('basename', glob($dir.'/images/*') ?: []);
    expect(array_values(array_diff($files, $used)))->toBe([]);
});

it('renders screenshots as links to the full-size image', function () {
    $html = MarkdownPages::render("# T\n\n![The entries list](images/entries-list.webp)\n", fn (string $slug) => "/cms/guide/{$slug}", null, 'en', fn (string $file) => "/cms/guide/images/{$file}");

    expect($html)->toContain('<a href="/cms/guide/images/entries-list.webp" target="_blank" rel="noopener" class="sunrice-shot"><img src="/cms/guide/images/entries-list.webp" alt="The entries list" loading="lazy" /></a>');
});

it('serves guide screenshots to readers of the guide', function () {
    $file = basename((string) collect(glob(dirname(__DIR__, 2).'/guide/images/*.webp'))->first());
    expect($file)->not->toBe('');

    guideUser();
    get("/cms/guide/images/{$file}")->assertForbidden();

    guideUser(['sunrice.guide.view']);
    get("/cms/guide/images/{$file}")->assertOk()->assertHeader('Content-Type', 'image/webp');
    get('/cms/guide/images/nope.webp')->assertNotFound();
    get('/cms/guide/images/..%2F..%2Fcomposer.json')->assertNotFound();
});

it('calls the panel by its branded name', function () {
    guideUser(['sunrice.guide.view']);

    get('/cms/guide/welcome?lang=en')->assertInertia(fn (Assert $page) => $page
        ->where('title', 'Welcome to Sunrice')
        ->where('sections.0.pages.0.title', 'Welcome to Sunrice'));

    config(['sunrice.branding.name' => 'Acme <Studio>']);
    get('/cms/guide/welcome')->assertInertia(fn (Assert $page) => $page
        ->where('title', 'Welcome to Acme <Studio>')
        ->where('sections.0.pages.0.title', 'Welcome to Acme <Studio>')
        ->where('html', fn (string $html) => str_contains($html, 'Welcome to Acme &lt;Studio&gt;') && ! str_contains($html, '{panel}')));
    get('/cms/guide/seo')->assertInertia(fn (Assert $page) => $page->where('html', fn (string $html) => str_contains($html, 'Acme &lt;Studio&gt; fills in')));
});

it('shows a guide page with its sections and headings', function () {
    guideUser(['sunrice.guide.view']);

    get('/cms/guide')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Guide/Show')
        ->where('page', 'welcome')
        ->where('locale', 'en')
        ->has('sections', count(GuideController::SECTIONS))
        ->where('sections.1.label', 'Content')
        ->has('headings')
        ->has('locales', 2));

    get('/cms/guide/nope')->assertNotFound();
});

it('follows the chosen language, then the browser, and remembers the choice', function () {
    guideUser(['sunrice.guide.view']);

    get('/cms/guide/entries', ['Accept-Language' => 'id-ID,id;q=0.9'])->assertInertia(fn (Assert $page) => $page
        ->where('locale', 'id')
        ->where('sections.1.label', 'Konten'));

    get('/cms/guide/entries?lang=en', ['Accept-Language' => 'id'])->assertInertia(fn (Assert $page) => $page->where('locale', 'en'));
    // Remembered over the browser's language.
    get('/cms/guide/media', ['Accept-Language' => 'id'])->assertInertia(fn (Assert $page) => $page->where('locale', 'en'));

    get('/cms/guide/media?lang=xx')->assertInertia(fn (Assert $page) => $page->where('locale', 'en'));
});

it('keeps the guide behind its permission, given to every default role', function () {
    guideUser();
    get('/cms/guide')->assertForbidden();

    app(RolesSeeder::class)->run();
    foreach (['Administrator', 'Editor', 'Author', 'Translator'] as $role) {
        expect(Role::findByName($role, 'web')->hasPermissionTo('sunrice.guide.view'))->toBeTrue();
    }

    $user = guideUser(['sunrice.guide.view']);
    $manage = collect(app(Navigation::class)->for($user))->firstWhere('label', 'Manage');
    expect(collect($manage['items'] ?? [])->pluck('href'))->toContain('guide');
});

it('gives the guide permission to the default roles on upgrade', function () {
    (new RolesSeeder)->run();

    // An install from before the permission existed.
    Permission::findByName('sunrice.guide.view', 'web')->delete();
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    app(SyncPermissions::class)->handle();
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    expect(Role::findByName('Editor', 'web')->hasPermissionTo('sunrice.guide.view'))->toBeTrue()
        ->and(Role::findByName('Translator', 'web')->hasPermissionTo('sunrice.guide.view'))->toBeTrue();
});

it('renders callouts as labelled boxes, in the page language', function () {
    $markdown = "# T\n\n> [!TIP]\n> Save often.\n\n> [!TECHNICAL]\n>\n> Run `php artisan sunrice:seed-roles`.\n\n> A plain quote.\n";
    $page = fn (string $slug) => "/cms/guide/{$slug}";

    $html = MarkdownPages::render($markdown, $page);
    expect($html)->toContain('<aside class="sunrice-callout sunrice-callout-tip" role="note"><p class="sunrice-callout-title">Tip</p><p>Save often.</p></aside>')
        ->toContain('<aside class="sunrice-callout sunrice-callout-technical" role="note"><p class="sunrice-callout-title">For developers</p><p>Run <code>php artisan sunrice:seed-roles</code>.</p></aside>')
        ->toContain('<blockquote>')
        ->not->toContain('[!TIP]');

    expect(MarkdownPages::render($markdown, $page, null, 'id'))->toContain('>Untuk developer</p>')->toContain('>Tips</p>');
});

it('links technical notes to the developer docs only for readers who may open them', function () {
    $markdown = "# T\n\nSee [entries](entries.md#drafts) and [templates](docs:templates.md#layouts).\n";
    $page = fn (string $slug) => "/cms/guide/{$slug}";

    expect(MarkdownPages::render($markdown, $page, fn (string $slug) => "/cms/docs/{$slug}"))
        ->toContain('href="/cms/guide/entries#drafts"')
        ->toContain('<a href="/cms/docs/templates#layouts">templates</a>');

    expect(MarkdownPages::render($markdown, $page, fn () => null))
        ->toContain('and templates.')
        ->not->toContain('docs:');

    // Through the page: a reader without the docs permission gets plain text.
    guideUser(['sunrice.guide.view']);
    get('/cms/guide/appearance')->assertInertia(fn (Assert $p) => $p->where('html', fn (string $html) => ! str_contains($html, 'docs:') && ! str_contains($html, '/cms/docs/')));

    guideUser(['sunrice.guide.view', 'sunrice.docs.view']);
    get('/cms/guide/appearance')->assertInertia(fn (Assert $p) => $p->where('html', fn (string $html) => ! str_contains($html, 'docs:')));
});
