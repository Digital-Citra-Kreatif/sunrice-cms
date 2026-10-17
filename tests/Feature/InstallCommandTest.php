<?php

declare(strict_types=1);

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Workbench\App\Models\User;

use function Pest\Laravel\artisan;

/** A user model without spatie's HasRoles trait. */
class InstallTestUserWithoutRoles extends Authenticatable
{
    protected $table = 'users';

    protected $guarded = [];
}

function publishedPermissionMigrations(): array
{
    return glob(database_path('migrations/*_create_permission_tables.php')) ?: [];
}

afterEach(function () {
    foreach (publishedPermissionMigrations() as $file) {
        @unlink($file);
    }
});

it('publishes and runs the permission migration when the tables are missing', function () {
    // Dropping tables inside the test transaction only rolls back on SQLite.
    if (DB::connection()->getDriverName() !== 'sqlite') {
        $this->markTestSkipped('Needs transactional DDL (SQLite).');
    }

    foreach (['role_has_permissions', 'model_has_roles', 'model_has_permissions', 'roles', 'permissions'] as $table) {
        Schema::drop($table);
    }

    artisan('sunrice:install', ['--no-user' => true])
        ->expectsOutputToContain('migration published')
        ->assertSuccessful();

    expect(publishedPermissionMigrations())->toHaveCount(1)
        ->and(Schema::hasTable('permissions'))->toBeTrue()
        ->and(Schema::hasTable('model_has_roles'))->toBeTrue()
        ->and(Permission::query()->where('name', 'like', 'sunrice.%')->count())->toBeGreaterThan(0)
        ->and(Role::query()->where('name', config('sunrice.super_admin_role'))->exists())->toBeTrue();
});

it('leaves the permission migration alone when the tables exist', function () {
    artisan('sunrice:install', ['--no-user' => true])
        ->doesntExpectOutputToContain('migration published')
        ->assertSuccessful();

    expect(publishedPermissionMigrations())->toBe([]);
});

it('creates a super admin user with the Super Admin role', function () {
    artisan('sunrice:install')
        ->expectsQuestion('Super admin name', 'Ada')
        ->expectsQuestion('Super admin email', 'ada@example.com')
        ->expectsQuestion('Super admin password', 'secret-password')
        ->assertSuccessful();

    $user = User::query()->where('email', 'ada@example.com')->firstOrFail();
    expect($user->hasRole(config('sunrice.super_admin_role')))->toBeTrue();
});

it('does not create a role-less admin when the user model lacks HasRoles', function () {
    config(['sunrice.auth.user_model' => InstallTestUserWithoutRoles::class]);

    // No name/email prompts are expected: the installer must not try to
    // create a user it couldn't make a super admin.
    artisan('sunrice:install')
        ->expectsOutputToContain('HasRoles')
        ->assertSuccessful();

    expect(User::query()->count())->toBe(0);
});

it('adds HasRoles to the app user model and creates the super admin', function () {
    $file = base_path('app/Models/InstallTestAppUser.php');
    @mkdir(dirname($file), 0777, true);
    file_put_contents($file, <<<'PHP'
        <?php

        namespace App\Models;

        use Illuminate\Foundation\Auth\User as Authenticatable;
        use Illuminate\Notifications\Notifiable;

        class InstallTestAppUser extends Authenticatable
        {
            /** @use Notifiable */
            use Notifiable;

            protected $table = 'users';

            protected $guarded = [];
        }
        PHP);

    try {
        require_once $file;
        config(['sunrice.auth.user_model' => 'App\Models\InstallTestAppUser']);

        artisan('sunrice:install')
            ->expectsOutputToContain('HasRoles trait added')
            ->expectsQuestion('Super admin name', 'Ada')
            ->expectsQuestion('Super admin email', 'ada@example.com')
            ->expectsQuestion('Super admin password', 'secret-password')
            ->assertSuccessful();

        $source = file_get_contents($file);
        expect($source)->toContain("use Illuminate\\Notifications\\Notifiable;\nuse Spatie\\Permission\\Traits\\HasRoles;\n")
            ->and($source)->toContain('use Notifiable, HasRoles;');

        // The loaded class still lacks the trait, so check the pivot row.
        $user = User::query()->where('email', 'ada@example.com')->firstOrFail();
        $assigned = DB::table('model_has_roles')
            ->where('role_id', Role::findByName(config('sunrice.super_admin_role'))->getKey())
            ->where('model_type', 'App\Models\InstallTestAppUser')
            ->where('model_id', $user->getKey())
            ->exists();
        expect($assigned)->toBeTrue();
    } finally {
        @unlink($file);
    }
});
