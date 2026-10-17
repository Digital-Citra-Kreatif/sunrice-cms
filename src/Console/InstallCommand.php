<?php

declare(strict_types=1);

namespace Sunrice\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use ReflectionClass;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Traits\HasRoles;
use Sunrice\Actions\Assets\UploadAsset;
use Sunrice\Database\Seeders\RolesSeeder;
use Sunrice\Permissions\SyncPermissions;

/**
 * sunrice:install — publishes config and assets, publishes the
 * spatie/laravel-permission migration when the app doesn't have it yet,
 * runs migrations, syncs permissions and creates the Super Admin role.
 * Adds the HasRoles trait to the app's user model when it is missing.
 * Optionally creates a super admin user (interactive or --no-user).
 * Safe to run again.
 */
class InstallCommand extends Command
{
    protected $signature = 'sunrice:install
        {--no-user : Skip creating a super admin user}
        {--roles : Also create the default roles (Administrator, Editor, Author, Translator)}';

    protected $description = 'Install Sunrice CMS';

    public function handle(SyncPermissions $sync): int
    {
        $this->components->info('Installing Sunrice CMS');

        $this->callSilently('vendor:publish', ['--tag' => 'sunrice-config']);
        $this->callSilently('vendor:publish', ['--tag' => 'sunrice-assets', '--force' => true]);
        $this->publishPermissionMigration();
        $this->call('migrate', ['--force' => true]);
        $this->linkStorage();

        $result = $sync->handle();
        $this->components->twoColumnDetail('Permissions', "{$result['created']} created");

        $guard = config('sunrice.auth.guard', 'web');
        /** @var Role $role */
        $role = Role::findOrCreate(config('sunrice.super_admin_role', 'Super Admin'), $guard);
        $this->components->twoColumnDetail('Super admin role', $role->name);

        if ($this->option('roles')) {
            $seeder = new RolesSeeder;
            $seeder->run();
            $this->components->twoColumnDetail('Default roles', implode(', ', array_keys($seeder->roles())));
        }

        $hasRoles = $this->checkUserModel();

        if (! $this->option('no-user')) {
            if ($hasRoles) {
                $this->createUser($role);
            } else {
                $this->components->warn('Skipped creating the super admin user: it could not be given the Super Admin role. Add the HasRoles trait, then run sunrice:install again.');
            }
        }

        $this->components->info('Done. Admin panel: /'.config('sunrice.admin.path', 'cms'));
        $this->components->warn('Remember to add a scheduler entry: * * * * * php artisan schedule:run');

        return self::SUCCESS;
    }

    /**
     * The spatie/laravel-permission tables aren't part of Sunrice's own
     * migrations (an app may already have them), so publish spatie's
     * migration unless the tables exist or the app already published it.
     */
    /**
     * Uploaded assets on the public disk are served through
     * public/storage; without the link every image URL is broken.
     */
    protected function linkStorage(): void
    {
        if (! UploadAsset::needsStorageLink()) {
            return;
        }

        $this->callSilently('storage:link');
        $this->components->twoColumnDetail('Storage link', file_exists(public_path('storage')) ? 'public/storage created' : 'could not be created: run php artisan storage:link');
    }

    protected function publishPermissionMigration(): void
    {
        $table = config('permission.table_names.permissions', 'permissions');
        $published = glob(database_path('migrations/*_create_permission_tables.php')) ?: [];

        if (Schema::hasTable($table) || $published !== []) {
            return;
        }

        $this->callSilently('vendor:publish', ['--tag' => 'permission-migrations']);
        $this->components->twoColumnDetail('Permission tables', 'migration published');
    }

    /**
     * Whether the user model can hold roles (uses HasRoles). When it
     * doesn't, the trait is added to the model's source file; the class
     * already loaded in this process stays without it, so createUser()
     * then writes the role assignment directly.
     */
    protected function checkUserModel(): bool
    {
        $model = config('sunrice.auth.user_model');
        if (! is_string($model) || ! class_exists($model)) {
            return true; // createUser() reports the missing model.
        }

        if (in_array(HasRoles::class, class_uses_recursive($model), true)) {
            return true;
        }

        if ($this->addHasRolesTrait($model)) {
            $this->components->twoColumnDetail('User model', "HasRoles trait added to {$model}");

            return true;
        }

        $this->components->warn("Add `use \\Spatie\\Permission\\Traits\\HasRoles;` to {$model} to use roles and permissions.");

        return false;
    }

    /**
     * Add `use HasRoles;` (and its import) to the model's source file.
     * Only touches writable files inside the application, never vendor.
     */
    protected function addHasRolesTrait(string $model): bool
    {
        $file = (new ReflectionClass($model))->getFileName();
        if ($file === false || ! is_writable($file) || ! str_starts_with($file, base_path())
            || str_starts_with($file, base_path('vendor'))) {
            return false;
        }

        $source = (string) file_get_contents($file);
        $short = class_basename($model);

        // Opening brace of the class body.
        if (preg_match('/^\s*(?:(?:final|abstract|readonly)\s+)*class\s+'.preg_quote($short, '/').'\b[^{]*\{/m', $source, $match, PREG_OFFSET_CAPTURE) !== 1) {
            return false;
        }
        $bodyStart = $match[0][1] + strlen($match[0][0]);

        // Append to the first trait list (`use HasFactory, Notifiable;`), or open one.
        $body = substr($source, $bodyStart);
        if (preg_match('/\A((?:\s*(?:\/\*.*?\*\/|\/\/[^\n]*))*\s*use\s+)([^;{]+);/s', $body, $traits) === 1) {
            $body = substr_replace($body, $traits[1].rtrim($traits[2]).', HasRoles;', 0, strlen($traits[0]));
        } else {
            $body = "\n    use HasRoles;\n".$body;
        }
        $source = substr($source, 0, $bodyStart).$body;

        // Import the trait after the last top-level import, or the namespace.
        $import = 'use '.HasRoles::class.';';
        if (! str_contains($source, $import)) {
            $header = substr($source, 0, $match[0][1]);
            if (preg_match_all('/^use\s+[^;]+;$/m', $header, $uses, PREG_OFFSET_CAPTURE) > 0) {
                $last = end($uses[0]);
                $at = $last[1] + strlen($last[0]);
                $source = substr_replace($source, "\n".$import, $at, 0);
            } elseif (preg_match('/^namespace\s+[^;]+;$/m', $header, $ns, PREG_OFFSET_CAPTURE) === 1) {
                $at = $ns[0][1] + strlen($ns[0][0]);
                $source = substr_replace($source, "\n\n".$import, $at, 0);
            } else {
                return false;
            }
        }

        return file_put_contents($file, $source) !== false;
    }

    protected function createUser(Role $role): void
    {
        $model = config('sunrice.auth.user_model');
        if (! class_exists($model)) {
            $this->components->warn("User model {$model} not found — create the super admin user yourself.");

            return;
        }

        $name = $this->ask('Super admin name', 'Admin');
        $email = $this->ask('Super admin email');
        $password = $this->secret('Super admin password');
        if ($email === null || $password === null || $password === '') {
            $this->components->warn('Skipped user creation (missing email/password).');

            return;
        }

        $user = $model::query()->firstOrCreate(
            ['email' => $email],
            ['name' => $name, 'password' => Hash::make($password)],
        );

        if (method_exists($user, 'assignRole')) {
            $user->assignRole($role);
        } else {
            // The trait was just added to the model file, but this process
            // still has the old class loaded: write the pivot row directly.
            $this->attachRole($user, $role);
        }

        $this->components->twoColumnDetail('Super admin', $email);
    }

    protected function attachRole(Model $user, Role $role): void
    {
        $registrar = app(PermissionRegistrar::class);
        $row = [
            $registrar->pivotRole => $role->getKey(),
            'model_type' => $user->getMorphClass(),
            config('permission.column_names.model_morph_key', 'model_id') => $user->getKey(),
        ];
        if ($registrar->teams) {
            $row[$registrar->teamsKey] = $registrar->getPermissionsTeamId();
        }

        DB::table(config('permission.table_names.model_has_roles', 'model_has_roles'))->insertOrIgnore($row);
        $registrar->forgetCachedPermissions();
    }
}
