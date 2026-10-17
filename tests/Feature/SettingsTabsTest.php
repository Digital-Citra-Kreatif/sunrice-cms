<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Sunrice\Admin\Navigation;
use Sunrice\Facades\Sunrice;
use Workbench\App\Models\User;

function settingsTabsUser(array $permissions): User
{
    $user = User::query()->create(['name' => 'Staff', 'email' => 'staff@example.com', 'password' => bcrypt('x')]);
    foreach ($permissions as $name) {
        Permission::findOrCreate($name, 'web');
    }
    $role = Role::findOrCreate('Staff', 'web');
    $role->syncPermissions($permissions);
    $user->assignRole($role);

    return $user;
}

it('shares the built-in tabs and the registered ones a user may see', function () {
    Sunrice::addSettingsTab('store', 'Store', 'commerce/settings', 'commerce.settings.view');
    Sunrice::addSettingsTab('secret', 'Secret', 'secret/settings', fn ($user) => false);
    actingAsSuperAdmin();

    $this->get('/cms/settings')->assertInertia(fn (Assert $page) => $page
        ->component('Settings/Edit')
        ->where('settingsTabs', [
            ['key' => 'general', 'label' => 'General', 'href' => 'settings'],
            ['key' => 'seo', 'label' => 'SEO', 'href' => 'settings/seo'],
            ['key' => 'store', 'label' => 'Store', 'href' => 'commerce/settings'],
        ]));
});

it('shows a package tab without the site settings permission and points Settings at it', function () {
    Sunrice::addSettingsTab('store', 'Store', 'commerce/settings', 'commerce.settings.view');
    $user = settingsTabsUser(['sunrice.access-admin', 'commerce.settings.view']);

    expect(Sunrice::settingsTabs($user))->toBe([['key' => 'store', 'label' => 'Store', 'href' => 'commerce/settings']]);

    $manage = collect(app(Navigation::class)->for($user))->firstWhere('label', 'Manage');
    expect(collect($manage['items'])->firstWhere('label', 'Settings')['href'])->toBe('commerce/settings');

    $this->actingAs($user)->get('/cms/settings')->assertForbidden();
});

it('hides Settings from users who may see no tab', function () {
    $user = settingsTabsUser(['sunrice.access-admin']);

    expect(Sunrice::settingsTabs($user))->toBe([]);
    $labels = collect(app(Navigation::class)->for($user))->flatMap(fn ($group) => array_column($group['items'], 'label'));
    expect($labels)->not->toContain('Settings');
});

it('refuses the built-in tab keys', function () {
    Sunrice::addSettingsTab('seo', 'Mine', 'mine');
})->throws(InvalidArgumentException::class);
