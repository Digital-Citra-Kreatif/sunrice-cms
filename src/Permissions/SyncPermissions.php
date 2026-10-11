<?php

declare(strict_types=1);

namespace Sunrice\Permissions;

use Spatie\Permission\Contracts\Permission as PermissionContract;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Database\Seeders\RolesSeeder;

/**
 * Creates missing Sunrice permissions and deletes entity-scoped
 * permissions whose collection/taxonomy/form/resource is gone.
 * Permissions replaced by finer ones (PermissionRegistry::LEGACY) are
 * handed on to the roles and users that held them, then removed. Global
 * permissions added by an upgrade go to the default roles whose patterns
 * cover them (e.g. Administrator's `sunrice.*`).
 * Called by the structure actions and `sunrice:sync-permissions`.
 */
class SyncPermissions
{
    public function __construct(protected PermissionRegistry $registry) {}

    /**
     * @return array{created: int, deleted: int}
     */
    public function handle(): array
    {
        $guard = config('sunrice.auth.guard', 'web');
        $wanted = $this->registry->names();

        $existing = Permission::query()
            ->where('guard_name', $guard)
            ->where('name', 'like', 'sunrice.%')
            ->pluck('name')
            ->all();

        // A package's permission ("commerce.orders.refund") is none of the
        // sunrice.% above: without this it would be created again by every
        // sync after the first, which fails, since it is there.
        $ofPackages = array_values(array_filter($wanted, fn (string $name) => ! str_starts_with($name, 'sunrice.')));
        $present = $ofPackages === [] ? $existing : [
            ...$existing,
            ...Permission::query()->where('guard_name', $guard)->whereIn('name', $ofPackages)->pluck('name')->all(),
        ];

        $toCreate = array_diff($wanted, $present);
        // Never delete global permissions — only entity-scoped ones that are gone.
        $globalNames = array_column($this->registry->global(), 'name');
        $toDelete = array_diff(array_diff($existing, $globalNames), $wanted);

        $created = [];
        foreach ($toCreate as $name) {
            $created[$name] = Permission::create(['name' => $name, 'guard_name' => $guard]);
        }
        $this->carryOverLegacy($created, $existing, $guard);
        $this->grantNewGlobalsToDefaultRoles($created, $existing, $guard);
        if ($toDelete !== []) {
            Permission::query()->where('guard_name', $guard)->whereIn('name', $toDelete)->delete();
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        return ['created' => count($toCreate), 'deleted' => count($toDelete)];
    }

    /**
     * Give global permissions added by an upgrade to the existing default
     * roles whose seeder patterns cover them, so e.g. Administrator sees a
     * new admin section without re-running `sunrice:seed-roles`. Skipped on
     * a fresh install (seeding grants everything) and for replacements of
     * legacy permissions (carryOverLegacy follows who actually held those).
     *
     * @param  array<string, PermissionContract>  $created
     * @param  array<int, string>  $existing
     */
    protected function grantNewGlobalsToDefaultRoles(array $created, array $existing, string $guard): void
    {
        if ($existing === []) {
            return;
        }

        $replacements = array_merge(...array_values(PermissionRegistry::LEGACY));
        $new = array_values(array_diff(
            array_intersect(array_keys($created), array_column($this->registry->global(), 'name')),
            $replacements,
        ));
        if ($new === []) {
            return;
        }

        foreach ((new RolesSeeder)->roles() as $roleName => $patterns) {
            $role = Role::query()->where('name', $roleName)->where('guard_name', $guard)->first();
            $names = RolesSeeder::match($new, $patterns);
            if ($role !== null && $names !== []) {
                $role->givePermissionTo($names);
            }
        }
    }

    /**
     * Give each newly created replacement permission to whoever held the
     * permission it replaces.
     *
     * @param  array<string, PermissionContract>  $created
     * @param  array<int, string>  $existing
     */
    protected function carryOverLegacy(array $created, array $existing, string $guard): void
    {
        foreach (PermissionRegistry::LEGACY as $legacyName => $replacements) {
            $new = array_values(array_intersect_key($created, array_flip($replacements)));
            if ($new === [] || ! in_array($legacyName, $existing, true)) {
                continue;
            }

            /** @var Permission $legacy */
            $legacy = Permission::findByName($legacyName, $guard);
            foreach ($legacy->roles as $role) {
                $role->givePermissionTo($new);
            }
            foreach ($legacy->users as $user) {
                if (method_exists($user, 'givePermissionTo')) {
                    $user->givePermissionTo($new);
                }
            }
        }
    }
}
