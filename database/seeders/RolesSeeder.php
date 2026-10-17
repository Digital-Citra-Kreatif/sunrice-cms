<?php

declare(strict_types=1);

namespace Sunrice\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Permissions\PermissionRegistry;
use Sunrice\Permissions\SyncPermissions;

/**
 * Seeds a starting set of roles. Each role lists permission patterns
 * (`*` matches any part), resolved against the current permissions, so
 * running it again after adding collections, taxonomies or forms gives
 * the roles the new permissions too. Permissions are only ever added:
 * changes made to these roles in the admin are kept.
 *
 *     php artisan sunrice:seed-roles
 *     php artisan db:seed --class="Sunrice\Database\Seeders\RolesSeeder"
 *
 * Extend this class and override roles() to seed your own set.
 */
class RolesSeeder extends Seeder
{
    /**
     * @return array<string, array<int, string>> role name => permission patterns
     */
    public function roles(): array
    {
        return [
            // Everything, without the super-admin bypass.
            'Administrator' => ['sunrice.*'],

            // All content, plus menus, globals and assets; no structure,
            // users or roles.
            'Editor' => [
                'sunrice.access-admin',
                'sunrice.view-drafts',
                'sunrice.guide.view',
                'sunrice.entries.*',
                'sunrice.terms.*',
                'sunrice.menus.*',
                'sunrice.globals.view',
                'sunrice.globals.edit',
                'sunrice.assets.*',
                'sunrice.forms.*.view-submissions',
                'sunrice.forms.*.export-submissions',
                'sunrice.comments.*',
            ],

            // Writes and manages their own entries; an editor publishes.
            'Author' => [
                'sunrice.access-admin',
                'sunrice.view-drafts',
                'sunrice.guide.view',
                'sunrice.entries.*.view',
                'sunrice.entries.*.create',
                'sunrice.entries.*.edit-own',
                'sunrice.entries.*.delete-own',
                'sunrice.terms.*.view',
                'sunrice.assets.view',
                'sunrice.assets.upload',
            ],

            // Edits other-language versions only; an editor publishes.
            'Translator' => [
                'sunrice.access-admin',
                'sunrice.view-drafts',
                'sunrice.guide.view',
                'sunrice.entries.*.view',
                'sunrice.entries.*.translate',
                'sunrice.assets.view',
            ],
        ];
    }

    public function run(): void
    {
        app(SyncPermissions::class)->handle();

        $guard = config('sunrice.auth.guard', 'web');
        $names = app(PermissionRegistry::class)->names();

        foreach ($this->roles() as $roleName => $patterns) {
            $role = Role::findOrCreate($roleName, $guard);
            $role->givePermissionTo(static::match($names, $patterns));
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * @param  array<int, string>  $names
     * @param  array<int, string>  $patterns
     * @return array<int, string>
     */
    public static function match(array $names, array $patterns): array
    {
        return array_values(array_filter($names, fn (string $name) => Str::is($patterns, $name)));
    }
}
