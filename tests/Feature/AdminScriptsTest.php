<?php

declare(strict_types=1);

use Illuminate\Foundation\Vite;
use Sunrice\Facades\Sunrice;

beforeEach(function () {
    actingAsSuperAdmin();
});

it('loads site scripts and styles in the admin, after its own bundle', function () {
    config(['sunrice.admin.scripts' => ['js/sunrice-fields.js', 'https://cdn.example.com/map-field.js', ''], 'sunrice.admin.styles' => ['/css/fields.css']]);
    Sunrice::registerAdminScript('vendor/acme/fields.js');
    Sunrice::registerAdminStyle('vendor/acme/fields.css');

    $html = $this->get('/cms')->assertOk()->getContent();

    expect($html)
        ->toContain('<script type="module" src="'.asset('js/sunrice-fields.js').'"></script>')
        ->toContain('<script type="module" src="https://cdn.example.com/map-field.js"></script>')
        ->toContain('<script type="module" src="'.asset('vendor/acme/fields.js').'"></script>')
        ->toContain('<link rel="stylesheet" href="'.asset('css/fields.css').'">')
        ->toContain('<link rel="stylesheet" href="'.asset('vendor/acme/fields.css').'">');

    // In <head>, after the admin bundle (which sets up window.Sunrice) when
    // the built assets are available (they aren't published on CI).
    $script = strpos($html, 'js/sunrice-fields.js');
    expect($script)->toBeLessThan(strpos($html, '</head>'));
    $bundle = strpos($html, '<script type="module" src="'.asset('vendor/sunrice/'));
    if ($bundle !== false) {
        expect($script)->toBeGreaterThan($bundle);
    }
});

it('loads its own built bundle while the site\'s Vite dev server is running', function () {
    // The admin's assets as `sunrice:install` publishes them, and the file `npm run dev` writes for the site.
    $published = public_path('vendor/sunrice');
    $existed = is_dir($published);
    $manifest = $published.'/manifest.json';
    $kept = is_file($manifest) ? file_get_contents($manifest) : null;
    $hot = public_path('hot');
    @mkdir($published, 0755, true);
    file_put_contents($manifest, json_encode(['resources/js/app.tsx' => ['file' => 'assets/app-test.js', 'src' => 'resources/js/app.tsx', 'isEntry' => true, 'css' => ['assets/app-test.css']]]));
    file_put_contents($hot, 'http://localhost:5173');

    // Vite keeps each manifest it reads for the whole run: forget the real
    // one an earlier test may have loaded, and this fake one afterwards.
    $forgetManifests = fn () => (new ReflectionProperty(Vite::class, 'manifests'))->setValue(null, []);
    $forgetManifests();

    try {
        $html = $this->get('/cms')->assertOk()->getContent();
    } finally {
        $forgetManifests();
        @unlink($hot);
        $kept === null ? @unlink($manifest) : file_put_contents($manifest, $kept);
        if (! $existed) {
            @rmdir($published);
        }
    }

    expect($html)
        ->toContain(asset('vendor/sunrice/assets/app-test.js'))
        ->toContain(asset('vendor/sunrice/assets/app-test.css'))
        ->not->toContain('localhost:5173');
});

it('loads nothing extra by default', function () {
    expect(app(\Sunrice\Sunrice::class)->adminScripts())->toBe([])
        ->and(app(\Sunrice\Sunrice::class)->adminStyles())->toBe([]);
});
