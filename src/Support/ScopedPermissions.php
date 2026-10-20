<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Sunrice\Admin\Actions\Permissions\SyncPermissions;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Permissions\Permission;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Taxonomy;
use Throwable;

/**
 * The permissions for one collection, taxonomy or form (see Access),
 * kept in step with them: created when one is, deleted with it.
 *
 * @internal
 */
final class ScopedPermissions
{
    private const ENTRY_LABELS = ['view' => 'View', 'create' => 'Create', 'update' => 'Edit drafts', 'publish' => 'Publish and unpublish', 'delete' => 'Trash and restore'];

    private const KEY = 'sunrice-cms:scoped-permissions';

    /**
     * Cached (as plain values) until a collection, taxonomy or form changes.
     *
     * @return list<Permission>
     */
    public static function all(): array
    {
        try {
            $cached = Cache::remember(self::KEY, SiteCache::ttl(), fn (): array => self::read());
        } catch (Throwable) {
            // No database yet (a fresh install, config:cache).
            return [];
        }

        return array_map(fn (array $row): Permission => Permission::make($row['name'], $row['label'], $row['group']), $cached);
    }

    /** @return list<array{name: string, label: string, group: string}> */
    private static function read(): array
    {
        if (! Schema::hasTable('sunrice_collections')) {
            return [];
        }
        $permissions = [];
        $make = function (string $name, string $label, string $group) use (&$permissions): void {
            try {
                $permission = Permission::make($name, $label, $group);
                $permissions[] = ['name' => $permission->name, 'label' => $permission->label, 'group' => $permission->group];
            } catch (\InvalidArgumentException) {
                // A handle permissions can't hold (a double or trailing underscore): no scoped permission.
            }
        };
        foreach (Collection::query()->withTrashed()->orderBy('title')->get(['handle', 'title']) as $collection) {
            foreach (self::ENTRY_LABELS as $action => $label) {
                $make("cms.entries.{$collection->handle}.{$action}", $label, "Entries: {$collection->title}");
            }
        }
        foreach (Taxonomy::query()->orderBy('title')->get(['handle', 'title']) as $taxonomy) {
            $make("cms.terms.{$taxonomy->handle}.manage", 'Manage terms', "Terms: {$taxonomy->title}");
        }
        foreach (Form::query()->orderBy('title')->get(['handle', 'title']) as $form) {
            $make("cms.submissions.{$form->handle}.view", 'View and export submissions', "Submissions: {$form->title}");
            $make("cms.submissions.{$form->handle}.delete", 'Delete submissions', "Submissions: {$form->title}");
        }

        return $permissions;
    }

    /** Forget what's cached, after a collection, taxonomy or form changed (with the handles Access reads). */
    public static function flush(): void
    {
        Cache::forget(self::KEY);
        Handles::flush();
        app(Panel::class)->flushPermissions();
    }

    /** After a collection, taxonomy or form came or went: its permissions too. */
    public static function sync(): void
    {
        self::flush();
        app(SyncPermissions::class)->handle();
    }
}
