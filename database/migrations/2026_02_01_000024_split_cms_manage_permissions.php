<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Permissions renamed to one convention (view, create, update, delete per
 * area): whoever had the old one gets the new ones.
 *
 *   cms.terms.manage, cms.terms.{taxonomy}.manage  → .view .create .update .delete
 *   cms.blueprints.manage                           → cms.blueprints.* and cms.fieldsets.*
 *   cms.global-sets.{action}                        → cms.globals.{action}
 */
return new class extends Migration
{
    public function up(): void
    {
        $tables = config('permission.table_names');
        $permissions = is_array($tables) && is_string($tables['permissions'] ?? null) ? $tables['permissions'] : 'permissions';
        if (! Schema::hasTable($permissions)) {
            return;
        }
        $roles = is_string($tables['role_has_permissions'] ?? null) ? $tables['role_has_permissions'] : 'role_has_permissions';
        $models = is_string($tables['model_has_permissions'] ?? null) ? $tables['model_has_permissions'] : 'model_has_permissions';
        $key = config('permission.column_names.permission_pivot_key');
        $key = is_string($key) ? $key : 'permission_id';
        $crud = ['view', 'create', 'update', 'delete'];

        foreach (DB::table($permissions)->get(['id', 'name', 'guard_name']) as $old) {
            $name = (string) $old->name;
            $new = match (true) {
                $name === 'cms.blueprints.manage' => [...array_map(fn ($a) => "cms.blueprints.{$a}", $crud), ...array_map(fn ($a) => "cms.fieldsets.{$a}", $crud)],
                preg_match('/^cms\.terms(\.[a-z0-9_]+)?\.manage$/', $name, $m) === 1 => array_map(fn ($a) => 'cms.terms'.($m[1] ?? '').".{$a}", $crud),
                str_starts_with($name, 'cms.global-sets.') => ['cms.globals.'.substr($name, strlen('cms.global-sets.'))],
                default => null,
            };
            if ($new === null) {
                continue;
            }
            foreach ($new as $newName) {
                $id = DB::table($permissions)->where('name', $newName)->where('guard_name', $old->guard_name)->value('id')
                    ?? DB::table($permissions)->insertGetId(['name' => $newName, 'guard_name' => $old->guard_name, 'created_at' => now(), 'updated_at' => now()]);
                foreach ([$roles, $models] as $pivot) {
                    $rows = DB::table($pivot)->where($key, $old->id)->get()->map(fn ($row) => [...(array) $row, $key => $id])->all();
                    if ($rows !== []) {
                        DB::table($pivot)->insertOrIgnore($rows);
                    }
                }
            }
            DB::table($roles)->where($key, $old->id)->delete();
            DB::table($models)->where($key, $old->id)->delete();
            DB::table($permissions)->where('id', $old->id)->delete();
        }
        app('cache')->forget(config('permission.cache.key', 'spatie.permission.cache'));
    }

    public function down(): void
    {
        // The old names aren't registered any more: nothing to put back.
    }
};
