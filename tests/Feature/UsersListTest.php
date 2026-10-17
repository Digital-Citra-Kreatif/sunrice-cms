<?php

declare(strict_types=1);

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Sunrice\Facades\Sunrice;
use Workbench\App\Models\User;

use function Pest\Laravel\get;

function makeUsers(int $count, string $prefix, ?string $role = null): void
{
    for ($i = 1; $i <= $count; $i++) {
        $user = User::query()->create(['name' => "{$prefix} {$i}", 'email' => strtolower($prefix)."{$i}@example.com", 'password' => 'x']);
        if ($role !== null) {
            $user->assignRole($role);
        }
    }
}

it('pages, searches and filters the users list by role', function () {
    actingAsSuperAdmin();
    Role::findOrCreate('Editor', 'web');
    makeUsers(30, 'Staff');
    makeUsers(2, 'Writer', 'Editor');

    get('/cms/users')->assertInertia(fn (Assert $page) => $page
        ->component('Users/Index')
        ->where('rows.total', 33)
        ->has('rows.data', 25)
        ->where('filters.0.key', 'role'));

    get('/cms/users?search=writer')->assertInertia(fn (Assert $page) => $page->where('rows.total', 2));
    get('/cms/users?filters[role]=Editor')->assertInertia(fn (Assert $page) => $page
        ->where('rows.total', 2)
        ->where('rows.data.0.roles', ['Editor']));
    get('/cms/users?filters[role]=none')->assertInertia(fn (Assert $page) => $page->where('rows.total', 30));
});

it('hides the accounts a package scopes out, everywhere users are listed', function () {
    $admin = actingAsSuperAdmin();
    Role::findOrCreate('Customer', 'web');
    makeUsers(3, 'Buyer', 'Customer');
    Sunrice::usersQueryUsing(fn (Builder $query) => $query->whereDoesntHave('roles', fn (Builder $r) => $r->where('name', 'Customer')));

    get('/cms/users')->assertInertia(fn (Assert $page) => $page
        ->where('rows.total', 1)
        ->where('others', fn ($others) => collect($others)->pluck('email')->all() === [$admin->email]));

    $staff = User::query()->create(['name' => 'Staff', 'email' => 'staff@example.com', 'password' => 'x']);
    get("/cms/users/{$staff->id}/edit")->assertInertia(fn (Assert $page) => $page
        ->where('others', fn ($others) => collect($others)->pluck('email')->all() === [$admin->email]));

    // A hidden account can't receive a deleted user's content.
    $buyer = User::query()->where('email', 'buyer1@example.com')->firstOrFail();
    $this->delete("/cms/users/{$staff->id}", ['content' => 'reassign', 'reassign_to' => $buyer->id])
        ->assertSessionHasErrors('reassign_to');

    // It can still be opened by its address.
    get("/cms/users/{$buyer->id}/edit")->assertOk();
});

it('lists many users in a bounded number of queries', function () {
    actingAsSuperAdmin();
    makeUsers(200, 'Bulk');

    DB::enableQueryLog();
    get('/cms/users')->assertOk();
    $queries = count(DB::getQueryLog());
    DB::disableQueryLog();

    expect($queries)->toBeLessThan(30);
});
