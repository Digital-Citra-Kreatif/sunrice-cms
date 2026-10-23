<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

/*
 * Data only. A global set's Settings (title, handle, blueprint) now take
 * cms.globals.configure besides cms.globals.update, which is left for its
 * values (editors). The roles and people that could look after the sets
 * themselves, with cms.globals.update and cms.globals.create or .delete
 * (the administrator role, a developer's), are given it so they keep
 * doing so; the editor role (view and update only) isn't. A new site has
 * none of these permissions yet: nothing to do. Running it again changes
 * nothing.
 */
return new class extends Migration
{
    private const CONFIGURE = 'cms.globals.configure';

    public function up(): void
    {
        if (DB::connection()->pretending()) {
            return; // data only: nothing to show
        }
        /** @var array<string, string> $tables */
        $tables = config('permission.table_names', []);
        /** @var array<string, string> $columns */
        $columns = config('permission.column_names', []);
        $permissions = $tables['permissions'] ?? 'permissions';
        $roles = $tables['role_has_permissions'] ?? 'role_has_permissions';
        $models = $tables['model_has_permissions'] ?? 'model_has_permissions';
        $key = $columns['permission_pivot_key'] ?? 'permission_id';
        $role = $columns['role_pivot_key'] ?? 'role_id';
        $morph = $columns['model_morph_key'] ?? 'model_id';
        if (! Schema::hasTable($permissions) || ! Schema::hasTable($roles) || ! Schema::hasTable($models)) {
            return;
        }
        $team = config('permission.teams') === true ? ($columns['team_foreign_key'] ?? 'team_id') : null;

        foreach (DB::table($permissions)->where('name', 'cms.globals.update')->get(['id', 'guard_name']) as $update) {
            $structure = DB::table($permissions)->where('guard_name', $update->guard_name)
                ->whereIn('name', ['cms.globals.create', 'cms.globals.delete'])->pluck('id')->all();
            if ($structure === []) {
                continue;
            }
            $roleIds = DB::table($roles)->where($key, $update->id)
                ->whereIn($role, DB::table($roles)->whereIn($key, $structure)->select($role))
                ->pluck($role)->all();
            $holders = DB::table($models)->where($key, $update->id)->get()
                ->filter(function (object $row) use ($models, $key, $morph, $structure, $team): bool {
                    $query = DB::table($models)->whereIn($key, $structure)
                        ->where('model_type', $row->model_type)->where($morph, $row->{$morph});

                    return ($team !== null ? $query->where($team, $row->{$team}) : $query)->exists();
                });
            if ($roleIds === [] && $holders->isEmpty()) {
                continue;
            }
            $configure = DB::table($permissions)->where('name', self::CONFIGURE)->where('guard_name', $update->guard_name)->value('id');
            if ($configure === null) {
                $now = now();
                $configure = DB::table($permissions)->insertGetId(['name' => self::CONFIGURE, 'guard_name' => $update->guard_name, 'created_at' => $now, 'updated_at' => $now]);
            }
            DB::table($roles)->insertOrIgnore(array_map(fn (mixed $id): array => [$key => $configure, $role => $id], $roleIds));
            DB::table($models)->insertOrIgnore($holders->map(fn (object $row): array => [...(array) $row, $key => $configure])->values()->all());
        }
        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        // Kept: who has it is the site's choice by now (sunrice:sync-permissions deletes it with an older CMS).
    }
};
