<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Sunrice\Facades\Sunrice;
use Workbench\App\Models\User;

function dashboardCardsUser(string $email, array $permissions): User
{
    $user = User::query()->create(['name' => 'Staff', 'email' => $email, 'password' => bcrypt('x')]);
    $permissions = ['sunrice.access-admin', ...$permissions];
    foreach ($permissions as $name) {
        Permission::findOrCreate($name, 'web');
    }
    $role = Role::findOrCreate('Role '.$email, 'web');
    $role->syncPermissions($permissions);
    $user->assignRole($role);

    return $user;
}

/** What a fake package registers in its service provider. */
function registerFakePackageCards(): void
{
    Sunrice::addDashboardCard('commerce-sales', fn () => ['total' => 1250, 'currency' => 'IDR'], 'commerce.orders.view', 20);
    Sunrice::addDashboardCard('commerce-tips', fn () => ['tip' => 'Ship fast'], position: 10);
    Sunrice::addDashboardCard('secret', fn () => ['x' => 1], fn ($user) => false);
}

it('defers the props of the cards a user may see, in position order', function () {
    registerFakePackageCards();
    $user = dashboardCardsUser('sales@example.com', ['commerce.orders.view']);

    $this->actingAs($user)->get('/cms')->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard')
        ->missing('cards')
        ->loadDeferredProps(fn (Assert $reload) => $reload
            ->where('cards', [
                ['name' => 'commerce-tips', 'position' => 10, 'props' => ['tip' => 'Ship fast']],
                ['name' => 'commerce-sales', 'position' => 20, 'props' => ['total' => 1250, 'currency' => 'IDR']],
            ])));
});

it('leaves out cards the user may not see', function () {
    registerFakePackageCards();
    $user = dashboardCardsUser('writer@example.com', []);

    $this->actingAs($user)->get('/cms')->assertInertia(fn (Assert $page) => $page
        ->loadDeferredProps(fn (Assert $reload) => $reload
            ->where('cards', [
                ['name' => 'commerce-tips', 'position' => 10, 'props' => ['tip' => 'Ship fast']],
            ])));

    expect(collect(Sunrice::dashboardCards($user))->pluck('name')->all())->toBe(['commerce-tips']);
});

it('computes card props only when they are loaded', function () {
    $calls = 0;
    Sunrice::addDashboardCard('counter', function () use (&$calls) {
        $calls++;

        return ['calls' => $calls];
    });
    actingAsSuperAdmin();

    $this->get('/cms')->assertOk()->assertInertia(fn (Assert $page) => $page->missing('cards'));
    expect($calls)->toBe(0);
});

it('sends an empty list when there are no cards', function () {
    actingAsSuperAdmin();

    $this->get('/cms')->assertInertia(fn (Assert $page) => $page->where('cards', []));
});
